import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// localStorage 工具函数
const STORAGE_KEY = 'task-store'

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

// 初始模拟数据
const defaultTasks = [
  // 工作模式下的初始任务
  {
    id: 1,
    title: '评估旧版 C# WinForms 项目向 Web 端的迁移方案',
    description: '',
    priority: 'high',
    status: 'todo',
    mode: 'work'
  },
  {
    id: 2,
    title: '整理本周工作周报',
    description: '',
    priority: 'medium',
    status: 'done',
    mode: 'work'
  },
  // 学习模式下的初始任务
  {
    id: 3,
    title: '完成 HTML/CSS 翻转卡片特效练习',
    description: '',
    priority: 'medium',
    status: 'progress',
    mode: 'study'
  },
  {
    id: 4,
    title: '使用语音工具进行 30 分钟英语口语交流训练',
    description: '',
    priority: 'low',
    status: 'todo',
    mode: 'study'
  }
]

export const useTaskStore = defineStore('task', () => {
  // 从 localStorage 加载数据
  const stored = loadFromStorage()

  // 用户状态
  const user = ref(stored?.user || {
    isLoggedIn: false,
    username: ''
  })

  // 当前空间模式：work | study
  const currentMode = ref(stored?.currentMode || 'work')

  // 任务列表
  const tasks = ref(stored?.tasks || defaultTasks)

  // 监听变化并自动保存到 localStorage
  watch([user, currentMode, tasks], () => {
    saveToStorage({
      user: user.value,
      currentMode: currentMode.value,
      tasks: tasks.value
    })
  }, { deep: true })

  // 计算属性：根据当前模式过滤任务
  const filteredTasks = computed(() => {
    return tasks.value.filter(task => task.mode === currentMode.value)
  })

  // 计算属性：按状态分组的任务
  const todoTasks = computed(() =>
    filteredTasks.value.filter(task => task.status === 'todo')
  )

  const progressTasks = computed(() =>
    filteredTasks.value.filter(task => task.status === 'progress')
  )

  const doneTasks = computed(() =>
    filteredTasks.value.filter(task => task.status === 'done')
  )

  // 登录
  function login(username, password) {
    if (username === 'admin' && password === '123456') {
      user.value = {
        isLoggedIn: true,
        username: username
      }
      return true
    }
    return false
  }

  // 退出登录
  function logout() {
    user.value = {
      isLoggedIn: false,
      username: ''
    }
  }

  // 切换模式
  function switchMode(mode) {
    currentMode.value = mode
  }

  // 添加任务
  function addTask(task) {
    const newId = Math.max(...tasks.value.map(t => t.id), 0) + 1
    tasks.value.push({
      id: newId,
      ...task,
      mode: currentMode.value
    })
  }

  // 更新任务状态（拖拽时调用）
  function updateTaskStatus(taskId, newStatus) {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.status = newStatus
    }
  }

  // 批量更新任务状态（拖拽排序后）
  function updateTasksStatus(taskIds, newStatus) {
    taskIds.forEach(id => {
      const task = tasks.value.find(t => t.id === id)
      if (task) {
        task.status = newStatus
      }
    })
  }

  // 删除任务
  function deleteTask(taskId) {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index > -1) {
      tasks.value.splice(index, 1)
    }
  }

  return {
    user,
    currentMode,
    tasks,
    filteredTasks,
    todoTasks,
    progressTasks,
    doneTasks,
    login,
    logout,
    switchMode,
    addTask,
    updateTaskStatus,
    updateTasksStatus,
    deleteTask
  }
})
