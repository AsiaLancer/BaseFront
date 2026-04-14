export const getStarStyle = () => {
    // 随机位置：宽度 0-100%，高度 0-50%（只在上半部分）
    const left = Math.random() * 100
    const top = Math.random() * 50  // 只在上半部分

    // 随机大小：1px 到 4px
    const size = 1 + Math.random() * 3

    // 随机透明度
    const opacity = 0.3 + Math.random() * 0.7

    // 随机动画时长：2s 到 8s
    const duration = 2 + Math.random() * 6

    // 随机延迟
    const delay = Math.random() * 5

    return {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
        '--duration': `${duration}s`,
        '--opacity': opacity,
        animationDelay: `${delay}s`
    }
}