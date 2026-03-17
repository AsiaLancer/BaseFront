<script setup>
import { Client } from "@gradio/client";
import { ref, computed } from 'vue'
// 状态
const fileInput = ref(null)
const file = ref(null)
const preview = ref(null)
const progress = ref(0)
const uploading = ref(false)
const error = ref(null)
const result = ref(null)
const controller = ref(null)

// 处理文件选择
const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    // 验证类型
    if (!selectedFile.type.startsWith('video/')) {
        error.value = '请选择视频文件'
        return
    }

    // 验证大小（100MB）
    if (selectedFile.size > 100 * 1024 * 1024) {
        error.value = '视频不能超过100MB'
        return
    }

    // 清理旧预览
    if (preview.value) {
        URL.revokeObjectURL(preview.value)
    }

    // 设置新文件
    file.value = selectedFile
    preview.value = URL.createObjectURL(selectedFile)
    error.value = null
    result.value = null
}

// 处理拖拽
const handleDrop = (e) => {
    const droppedFile = e.dataTransfer.files[0]
    if (!droppedFile) return

    // 模拟文件选择事件
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(droppedFile)
    fileInput.value.files = dataTransfer.files

    // 触发change事件
    const event = new Event('change', { bubbles: true })
    fileInput.value.dispatchEvent(event)
}

// 上传
const upload = async () => {
    if (!file.value || uploading.value) return

    controller.value = new AbortController()
    uploading.value = true
    progress.value = 0
    error.value = null

    const formData = new FormData()
    formData.append('video', file.value)

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
            signal: controller.value.signal
        })

        if (!response.ok) throw new Error('上传失败')

        const data = await response.json()
        result.value = data
        progress.value = 100

    } catch (err) {
        if (err.name === 'AbortError') {
            error.value = '上传已取消'
        } else {
            error.value = err.message
        }
    } finally {
        uploading.value = false
        controller.value = null
    }
}

// 取消上传
const cancel = () => {
    if (controller.value) {
        controller.value.abort()
        controller.value = null
    }
}

// 重置
const reset = () => {
    if (preview.value) {
        URL.revokeObjectURL(preview.value)
    }

    file.value = null
    preview.value = null
    progress.value = 0
    error.value = null
    result.value = null

    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

// 格式化文件大小
const formatSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
}


</script>

<template>
    <div class="video-upload">
        <!-- 上传区域 -->
        <div class="upload-area" @click="fileInput?.click()" @dragover.prevent @drop.prevent="handleDrop">
            <input ref="fileInput" type="file" accept="video/*,audio/*" @change="handleFileChange" hidden>

            <div v-if="!preview" class="upload-placeholder">
                <div class="icon">📹</div>
                <p>点击或拖拽上传视频</p>
                <small>最大 100MB</small>
            </div>

            <video v-else :src="preview" controls class="preview-video"></video>
        </div>

        <!-- 文件信息 -->
        <div v-if="file" class="file-info">
            <p>文件名：{{ file.name }}</p>
            <p>大小：{{ formatSize(file.size) }}</p>
        </div>

        <!-- 上传进度 -->
        <div v-if="progress > 0" class="progress">
            <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                <span>{{ progress }}%</span>
            </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="error">
            {{ error }}
        </div>

        <!-- 操作按钮 -->
        <div class="actions">
            <button @click="upload" :disabled="!file || uploading" class="btn-primary">
                {{ uploading ? '上传中' : '开始上传' }}
            </button>

            <button v-if="file && !uploading" @click="reset" class="btn-secondary">
                重新选择
            </button>

            <button v-if="uploading" @click="cancel" class="btn-danger">
                取消上传
            </button>
        </div>

        <!-- 上传结果 -->
        <div v-if="result" class="result success">
            上传成功！
        </div>
    </div>
</template>

<style scoped>
.video-upload {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

.upload-area {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;
}

.upload-area:hover {
    border-color: #409eff;
    background: #f0f7ff;
}

.upload-placeholder .icon {
    font-size: 48px;
    margin-bottom: 10px;
}

.upload-placeholder small {
    color: #999;
    font-size: 12px;
}

.preview-video {
    width: 100%;
    max-height: 300px;
    border-radius: 4px;
}

.file-info {
    margin-top: 15px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 14px;
}

.file-info p {
    margin: 5px 0;
}

.progress {
    margin-top: 15px;
}

.progress-bar {
    height: 30px;
    background: #f0f0f0;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
}

.progress-fill {
    height: 100%;
    background: #409eff;
    transition: width 0.3s;
}

.progress-bar span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: bold;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.error {
    margin-top: 10px;
    padding: 10px;
    background: #ffebee;
    color: #f44336;
    border-radius: 4px;
    border: 1px solid #ffcdd2;
}

.actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    flex: 1;
}

.btn-primary {
    background: #409eff;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background: #66b1ff;
}

.btn-primary:disabled {
    background: #a0cfff;
    cursor: not-allowed;
}

.btn-secondary {
    background: #909399;
    color: white;
}

.btn-secondary:hover {
    background: #a6a9ad;
}

.btn-danger {
    background: #f56c6c;
    color: white;
}

.btn-danger:hover {
    background: #f78989;
}

.result {
    margin-top: 15px;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
}

.result.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
</style>