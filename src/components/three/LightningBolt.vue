<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'

const container = ref(null)
let renderer, scene, camera, animId
let boltGroup, boltTween

function boltPath(segments = 14) {
    const pts = [], startX = -2.8, endX = 2.8
    const dx = (endX - startX) / segments
    for (let i = 0; i <= segments; i++) {
        const t = i / segments, chaos = Math.sin(t * Math.PI) * 3
        pts.push(new THREE.Vector3(
            startX + dx * i,
            (Math.random() - 0.5) * chaos * 2,
            (Math.random() - 0.5) * chaos * 0.5
        ))
    }
    return pts
}

function makeBolt() {
    const g = new THREE.Group()
    const curve = new THREE.CatmullRomCurve3(boltPath(), false, 'catmullrom', 0.5)

    // Tech-cyber layers — cyan primary with magenta/purple accents
    const layers = [
        [0.34, 16, 0x00e5ff, 0.02],   // outer cyan glow
        [0.22, 14, 0xa855f7, 0.025],  // purple ring
        [0.12, 12, 0x00e5ff, 0.06],   // cyan mid
        [0.05, 10, 0xffffff, 0.09],   // white inner
        [0.025, 8,  0xffffff, 0.3],   // core
    ]
    layers.forEach(([r, seg, col, op]) => {
        const geo = new THREE.TubeGeometry(curve, 64, r, seg, false)
        const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false })
        g.add(new THREE.Mesh(geo, mat))
    })

    // Branch bolts — magenta/amber accents
    for (let b = 0; b < 4; b++) {
        const t = 0.2 + Math.random() * 0.6
        const src = curve.getPointAt(t)
        const bPts = [src.clone()]
        const ang = -0.4 + Math.random() * 0.8
        const up = 0.3 + Math.random() * 1.2
        const len = 1.0 + Math.random() * 2.5
        for (let s = 1; s <= 5; s++) {
            const p = bPts[0].clone()
            p.x += Math.cos(ang) * len * s / 5 + (Math.random() - 0.5) * 0.4
            p.y += up * s / 5 + (Math.random() - 0.5) * 0.5
            bPts.push(p)
        }
        const bC = new THREE.CatmullRomCurve3(bPts, false, 'catmullrom', 0.5)
        const bGeo = new THREE.TubeGeometry(bC, 16, 0.03, 6, false)
        const bCol = b % 2 === 0 ? 0xff2d95 : 0xffb800  // magenta / amber
        const bMat = new THREE.MeshBasicMaterial({ color: bCol, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false })
        g.add(new THREE.Mesh(bGeo, bMat))
    }

    return g
}

const nearTop = ref(true)

let scrollTick = 0
function onScroll() {
    if (Date.now() - scrollTick < 100) return  // throttle to 100ms
    scrollTick = Date.now()
    nearTop.value = window.scrollY < 600
    if (!nearTop.value) killBolt()
}

function killBolt() {
    if (boltTween) { boltTween.kill(); boltTween = null }
    if (boltGroup) { disposeGroup(boltGroup); boltGroup = null }
    // Force clear — render empty scene to erase last frame
    renderer?.render(scene, camera)
}

watch(nearTop, (v) => {
    if (v && !boltGroup && !boltTween) setTimeout(fire, 800)
})

function init() {
    const el = container.value; if (!el) return
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    el.appendChild(renderer.domElement)
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 50)
    camera.position.set(0, 0, 8)
    scene = new THREE.Scene()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    setTimeout(fire, 600)
}

function disposeGroup(g) {
    if (!g) return
    g.traverse(c => { c.geometry?.dispose(); c.material?.dispose() })
    scene.remove(g)
}

function fire() {
    if (!nearTop.value) {
        setTimeout(fire, 1000)
        return
    }
    if (boltTween) { boltTween.kill(); boltTween = null }
    if (boltGroup) { disposeGroup(boltGroup); boltGroup = null }

    boltGroup = makeBolt()
    boltGroup.position.set(12, 0, 0)
    scene.add(boltGroup)

    const tl = gsap.timeline({
        onUpdate() { if (!nearTop.value) killBolt() },
        onComplete: () => {
            if (boltGroup) { disposeGroup(boltGroup); boltGroup = null }
            boltTween = null
            if (nearTop.value) setTimeout(fire, 3000 + Math.random() * 4000)
        }
    })

    // 1. Strike: fast snap to center, slight overshoot
    tl.to(boltGroup.position, { x: 0, duration: 0.35, ease: 'power4.in' }, 0)

    // 2. Arc: hold near center with electrical micro-jitter
    const jitter = { x: 0 }
    tl.to(jitter, { x: 0.15, duration: 0.15, yoyo: true, repeat: 4, ease: 'power1.inOut',
        onUpdate() { boltGroup.position.x = jitter.x } }, 0.35)

    // 3. Dissipate: slow drift left + fade out
    tl.to(boltGroup.position, { x: -10, duration: 1.5, ease: 'power2.out' }, 1.55)
    boltGroup.traverse(c => {
        if (c.material && c.material.opacity !== undefined) {
            tl.to(c.material, { opacity: 0, duration: 1.2, ease: 'power2.in' }, 1.85)
        }
    })

    boltTween = tl
}

function animate() {
    animId = requestAnimationFrame(animate)
    if (!nearTop.value) { killBolt() }
    if (boltGroup) renderer.render(scene, camera)
}

function onResize() {
    if (!renderer || !camera) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => { init(); animate() })
onUnmounted(() => {
    cancelAnimationFrame(animId)
    if (boltTween) boltTween.kill()
    if (boltGroup) disposeGroup(boltGroup)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    renderer?.dispose()
})
</script>

<template>
    <div ref="container" class="bolt-canvas" aria-hidden="true"></div>
</template>

<style scoped>
.bolt-canvas { position:fixed; inset:0; z-index:0; pointer-events:none; }
.bolt-canvas :deep(canvas) { display:block; }
</style>
