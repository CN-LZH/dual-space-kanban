<template>
  <div class="app-layout" :class="modeClass">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-left">
        <el-icon size="24"><Memo /></el-icon>
        <span class="app-title">双模式任务看板</span>
      </div>

      <div class="header-center">
        <el-segmented
          v-model="currentMode"
          :options="modeOptions"
          size="large"
          @change="handleModeChange"
        />
      </div>

      <div class="header-right">
        <el-icon><UserFilled /></el-icon>
        <span class="username">{{ taskStore.user.username }}</span>
        <el-button type="danger" text @click="handleLogout">
          <el-icon><SwitchButton /></el-icon>
          退出登录
        </el-button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="app-main">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Memo, UserFilled, SwitchButton } from '@element-plus/icons-vue'
import { useTaskStore } from '../stores/taskStore'

const router = useRouter()
const taskStore = useTaskStore()

const currentMode = ref(taskStore.currentMode)

const modeOptions = [
  { label: '工作模式', value: 'work' },
  { label: '学习模式', value: 'study' }
]

// 根据当前模式计算样式类
const modeClass = computed(() => ({
  'mode-work': currentMode.value === 'work',
  'mode-study': currentMode.value === 'study'
}))

// 切换模式
const handleModeChange = (mode) => {
  taskStore.switchMode(mode)
}

// 退出登录
const handleLogout = () => {
  taskStore.logout()
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

/* 工作模式主题 - 蓝灰色调 */
.mode-work {
  background-color: #f0f2f5;
}

.mode-work .app-header {
  background: linear-gradient(90deg, #2c3e50 0%, #3498db 100%);
}

/* 学习模式主题 - 暖绿色调 */
.mode-study {
  background-color: #f0f9f0;
}

.mode-study .app-header {
  background: linear-gradient(90deg, #27ae60 0%, #2ecc71 100%);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-title {
  font-size: 18px;
  font-weight: 600;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username {
  font-size: 14px;
}

.app-main {
  padding: 24px;
  height: calc(100vh - 64px);
  box-sizing: border-box;
}
</style>
