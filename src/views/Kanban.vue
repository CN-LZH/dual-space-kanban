<template>
  <AppLayout>
    <div class="kanban-board">
      <KanbanColumn
        title="待办"
        status="todo"
        :tasks="taskStore.todoTasks"
        :icon="Document"
        @update-tasks="handleUpdateTasks"
        @add-task="openAddDialog"
        @delete-task="handleDeleteTask"
      />

      <KanbanColumn
        title="进行中"
        status="progress"
        :tasks="taskStore.progressTasks"
        :icon="Loading"
        @update-tasks="handleUpdateTasks"
        @add-task="openAddDialog"
        @delete-task="handleDeleteTask"
      />

      <KanbanColumn
        title="已完成"
        status="done"
        :tasks="taskStore.doneTasks"
        :icon="CircleCheck"
        @update-tasks="handleUpdateTasks"
        @add-task="openAddDialog"
        @delete-task="handleDeleteTask"
      />
    </div>

    <!-- 添加任务对话框 -->
    <TaskDialog
      v-model="dialogVisible"
      :status="currentStatus"
      @submit="handleAddTask"
    />
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Document, Loading, CircleCheck } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import AppLayout from '../components/AppLayout.vue'
import KanbanColumn from '../components/KanbanColumn.vue'
import TaskDialog from '../components/TaskDialog.vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const dialogVisible = ref(false)
const currentStatus = ref('todo')

// 打开添加任务对话框
const openAddDialog = (status) => {
  currentStatus.value = status
  dialogVisible.value = true
}

// 添加任务
const handleAddTask = (taskData) => {
  taskStore.addTask(taskData)
  ElMessage.success('任务添加成功')
}

// 删除任务
const handleDeleteTask = (taskId) => {
  taskStore.deleteTask(taskId)
  ElMessage.success('任务已删除')
}

// 更新任务列表（拖拽后）
const handleUpdateTasks = (status, newTasks) => {
  // 更新拖拽后的任务状态
  newTasks.forEach(task => {
    if (task.status !== status) {
      taskStore.updateTaskStatus(task.id, status)
    }
  })
}
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 24px;
  height: 100%;
  overflow-x: auto;
  padding-bottom: 16px;
}
</style>
