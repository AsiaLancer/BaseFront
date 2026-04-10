<template>
    <div>
        <button :style="{
            backgroundColor: 'green', width: '100px'
            , height: '50px', fontSize: '20px', color: '#fff', border: 'none',
            border: 'none', borderRadius: '5px', cursor: 'pointer', outline: 'none'
        }" @click="count++">count:
            {{ count
            }}</button>
        <button :style="{
            backgroundColor: 'red', width: '100px'
            , height: '50px', fontSize: '20px', color: '#fff', border: 'none',
            border: 'none', borderRadius: '5px', cursor: 'pointer', outline: 'none'
        }" @click="count--">count:
            {{ count
            }}</button>
        <p>{{ alwaysSmall }}</p>
        <span>Message: {{ msg }}</span>
        <p id='add'>Using text interpolation: {{ rawHtml }}</p>
        <p>Using v-html directive: <span v-html="rawHtml"></span></p>
        <p>{{ msg + 1 }}</p>
        <p>{{ formadd(msg) }}</p>
        <p>{{ Date.now().toString() }}</p>
        <p>{{ Math.random() }}</p>
        <p>{{ actuor }}</p>
        <p v-if="seen">Now you see me {{ actuor }}</p>
        <p :id='app'>{{ actuor }}</p>
        <p v-bind:[attribute1]=actuor>{{ app }}</p>
        <p>{{ state.count1 }}</p>
        <p>{{ stateCount.count1 }}</p>
        <p>{{ authorInfo.name }}</p>
        <p>{{ authorInfo.books.length > 0 ? 'Yes' : 'No' }}</p>
        <p>{{ plublishMessage }}</p>
        <p>{{ now }}</p>
        <p>{{ firstName }}</p>
        <p>{{ lastName }}</p>
        <p>{{ fullName }}</p>
        <p :class="{ colorToggle: isActive }">color toggle</p>
        <p :class="classObject">class object</p>
        <p>{{ baba }}</p>
        <p :class="[activeClass, errorClass]">{{ 1232 }}</p>
        <button @click="awesome = !awesome">Toggle</button>
        <h1 v-if="awesome">Vue is awesome!</h1>
        <h1 v-else>Oh no 😢</h1>
        <h1 v-show="awesome">Vue is awesome!</h1>
        <h1 v-show="!awesome">Oh no 😢</h1>
        <p>{{ okuser.name1 }}</p>
    </div>
    <template v-show="true">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </template>
    <ul>
        <li v-for="item in myObject">{{ item }}</li>
    </ul>
    <ul>
        <li v-for="(item, key, index) in myObject">
            {{ index }}: {{ key }} : {{ item }}
        </li>
    </ul>
    <span v-for="n in 10">{{ n }}</span>
    <ul>
        <template v-for="item in items">
            <li>{{ item.msg }}</li>
            <li class="divider" role="presentation"></li>
        </template>
    </ul>
    <NewNeedLearn v-model="text" v-model:title="titleTag" class="baz" @call-me="callMe" message="hello">
        Something bad happened.
        <template #fortest>
            <p>fortest</p>
        </template>
        <template #item="{ body, username, likes }">
            <p>{{ body }}</p>
            <p>{{ username }}</p>
            <p>{{ likes }}</p>
        </template>
    </NewNeedLearn>
    <p>{{ titleTag }}</p>
    <p>{{ count }}</p>
    <button @keyup.left="count++">{{ count }}</button>
    <input type="text" name="gufacode" id="gofacode" :value="text" @input="text = $event.target.value">
    <input type="text" name="vuecode" id="vuecode" v-model="text">
    <input type="checkbox" value="jack" v-model="agreeArr">
    <input type="checkbox" value="mark" v-model="agreeArr">
    <input type="checkbox" value="neko" v-model="agreeArr">
    <p>{{ text }}</p>
    <p>{{ agreeArr }}</p>

    <input type="checkbox" name="selfcheck" id="selfcheck" v-model="selfcheck" true-value="self" false-value="other">
    <p>{{ selfcheck }}</p>
    <input type="text" v-model.lazy="msgnum" ref="msgnumInput" id="msgnumInput">
    <p v-redmade v-highlight v-make-full>{{ msgnum }}</p>
    <button @click="show = !show">Toggle</button>
    <Transition>
        <p v-if="show">hello</p>
    </Transition>
    <Transition name="fade" type="animation">
        <div v-if="showhover" class="box" :class="{ hover: isHover }" @mouseenter="isHover = true"
            @mouseleave="isHover = false">
            what up?
        </div>
    </Transition>
    <button @click="showhover = !showhover">切换</button>
</template>
<script setup>
import { ref, reactive, computed, onMounted, toRefs, useTemplateRef, onUnmounted } from 'vue'
import NewNeedLearn from '../components/NewNeedLearn.vue'
import { useCounterStore } from '../../stores/counter.js'
const titleTag = ref('titletag')
const isHover = ref(false)
const show = ref(false)
const showhover = ref(false)

const text = ref('init')
const agreeArr = ref([])
const selfcheck = ref(false)
const msgnum = ref('asdasdas')
const vRedmade = {
    mounted: (el) => {
        el.classList.add('isRed')
        el.style.backgroundColor = 'red'
    }
}

const vMakeFull = {
    mounted: (el) => {
        el.classList.add('is-full')
    }
}
const count = ref(2)
const alwaysSmall = computed((previous) => {
    if (count.value > 3) {
        return previous
    }
    return count.value;
}
)
const callMe = () => {
    console.log('call Me')
}
const msg = 123
const rawHtml = '<h1>Hello Vue!</h1>'
function formadd(data) {
    data += 1;
    return data;
}
const seen = ref(true);
const app = ref('hello');
const attribute1 = ref('title');
const zero = ref('0');
console.log(zero)
console.log(zero.value)
const state = reactive({ count1: 0 })

// 当解构时，count1 已经与 state.count 断开连接
// let count1 = state.count1
let { count1 } = state
// 不会影响原始的 state
count1++
let stateCount = reactive({ count1: 0 })
console.log(stateCount.count1)
stateCount = reactive({ count1: 100 })

const authorInfo = reactive({
    name: 'John Doe',
    books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
})
const plublishMessage = computed(() => {
    return authorInfo.books.length > 0 ? 'Yes' : 'No'
})
console.log(plublishMessage.value)
const now = computed(() => Date.now())
console.log(now.value)
const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed({
    // getter
    get() {
        return firstName.value + ' ' + lastName.value
    },
    // setter
    set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [firstName.value, lastName.value] = newValue.split(' ')
    }
})
console.log(fullName.value)

const isActive = ref('💩')
const error = ref(null)
const baba = ref('💩')
const activeClass = ref('active')
const errorClass = ref('text-danger')
const classObject = computed(() => ({
    active: isActive.value && !error.value,
    'text-danger': error.value && error.value.type === 'fatal'
}))
const awesome = ref(true)
const okuser = ref({ name1: 'John Doe' })
// let { name1 } = toRefs(okuser.value)
const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
})
const msgnumInput = useTemplateRef('msgnumInput')

console.log('greetings.hello'.split('.'))
console.log('greetings.hello'.split('.').reduce((o, i) => {
    if (o) return o[i]
}, {
    greetings: {
        hello: 'Hello Vue!'
    }
}))
onMounted(() => {
    setTimeout(() => {
        fullName.value = 'Mohn zoe'
        // okuser.value.name1 = 'Mohn zoe'
        okuser.value = { name1: 'Mohn zoe' }
    }, 5000)
    // console.log(window.location)
})
onUnmounted(() => {

})
const items = ref([
    { msg: 'Item 1' },
    { msg: 'Item 2' },
    { msg: 'Item 3' },
    { msg: 'Item 4' }
])
const counter = useCounterStore()
console.log(counter.count)
counter.count++
console.log(counter.count)
counter.increment()
console.log(counter.count)
counter.$patch({ count: counter.count + 1 })
console.log(counter.count)
</script>
<style scoped>
.colorToggle {
    color: red;
}

#msgnumInput {
    width: 200px;
    height: 30px;
    border: none;
    border-radius: 5px;
    padding: 5px;
    outline: none;
    cursor: pointer;
    background-color: #ac5050;
    font-size: 16px;
    display: flex;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

/* 入场/离场动画 */
.fade-enter-active {
    animation: slide 1s;
}

.fade-leave-active {
    animation: slide 1s;
}

/* 悬停过渡效果 */
.box {
    transition: background 0.3s;
}

.box.hover {
    background: rgb(115, 255, 0);
}
</style>