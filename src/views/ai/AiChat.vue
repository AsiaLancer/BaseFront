<script setup>
import { ref, nextTick, watch } from 'vue'

const question = ref('你好，好久没做AI项目该如何开始？')
const answer = ref('')
const loading = ref(false)
const chatBodyRef = ref(null)

// 消息更新时自动滚到底部
watch(answer, async () => {
    await nextTick()
    if (chatBodyRef.value) {
        chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
    }
})

async function ask() {
    const prompt = question.value.trim()
    if (!prompt || loading.value) return

    loading.value = true
    answer.value = ''

    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
    if (!apiKey) {
        answer.value = '请配置 VITE_DEEPSEEK_API_KEY 环境变量'
        loading.value = false
        return
    }

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-v4-pro',
                messages: [{ role: 'user', content: prompt }],
                stream: true,
                temperature: 0.7
            })
        })

        if (!response.ok) {
            throw new Error(`请求失败: ${response.status}`)
        }

        question.value = ''

        // 流式解析
        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            // 保留最后一个可能不完整的行
            buffer = lines.pop() || ''

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue
                const jsonStr = line.replace('data: ', '')
                if (jsonStr === '[DONE]') return

                try {
                    const parsed = JSON.parse(jsonStr)
                    const content = parsed.choices?.[0]?.delta?.content || ''
                    if (content) {
                        answer.value += content
                    }
                } catch {
                    // 忽略解析错误（有些空行或心跳）
                }
            }
        }
    } catch (e) {
        console.error(e)
        answer.value = '抱歉，请求出错了，请稍后再试。'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="chat-container">
        <div class="chat-header">
            <span class="title">🤖 DeepSeek 小助手</span>
        </div>

        <!-- 消息展示区 -->
        <div class="chat-body" ref="chatBodyRef">
            <div v-if="answer" class="message assistant">
                <div class="content" v-text="answer"></div>
                <!-- 流式输出时的闪烁光标 -->
                <span v-if="loading" class="cursor-blink">▎</span>
            </div>
            <div v-if="!answer && !loading" class="placeholder">
                有问题尽管问～
            </div>
        </div>

        <!-- 底部输入区 -->
        <div class="chat-footer">
            <textarea v-model="question" placeholder="输入你的问题..." rows="2" @keydown.enter.exact.prevent="ask"
                :disabled="loading"></textarea>
            <button @click="ask" :disabled="loading || !question.trim()">
                {{ loading ? '思考中...' : '发送' }}
            </button>
        </div>
    </div>
</template>

<style lang="css" scoped>
.chat-container {
    max-width: 700px;
    margin: 40px auto;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 80vh;
    background: var(--bg-color);
    font-family: 'Segoe UI', system-ui, sans-serif;
}

.chat-header {
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
    font-size: 18px;
    font-weight: 600;
    color: #333;
}

.chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.message {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.message .content {
    color: var(--text-primary);
    padding: 12px 16px;
    border-radius: 0 12px 12px 12px;
    max-width: 85%;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
}

.cursor-blink {
    display: inline-block;
    font-weight: bold;
    color: #7c3aed;
    animation: blink 0.8s infinite;
    margin-left: 2px;
    font-size: 16px;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.placeholder {
    color: #aaa;
    text-align: center;
    margin-top: 40px;
    font-size: 16px;
}

.chat-footer {
    padding: 12px 20px;
    border-top: 1px solid #eee;
    display: flex;
    gap: 8px;
    align-items: flex-end;
}

textarea {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    resize: none;
    font-size: 14px;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s;
}

textarea:focus {
    border-color: #7c3aed;
}

button {
    background: #7c3aed;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
    white-space: nowrap;
}

button:hover:not(:disabled) {
    background: #6d28d9;
}

button:disabled {
    background: #c4b5fd;
    cursor: not-allowed;
}
</style>