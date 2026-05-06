<template>
  <div class="kanban-column">
    <div class="column-header" :class="statusClass">
      <el-icon><component :is="icon" /></el-icon>
      <span class="column-title">{{ title }}</span>
      <el-tag :type="tagType" size="small" round>{{ tasks.length }}</el-tag>
    </div>

    <div class="column-body">
      <VueDraggable
        v-model="localTasks"
        :animation="200"
        group="tasks"
        ghost-class="ghost-card"
        drag-class="drag-card"
        @update="onUpdate"
        @add="onAdd"
      >
        <div v-for="task in localTasks" :key="task.id" class="task-card-wrapper">
          <el-card class="task-card" shadow="hover" :body-style="{ padding: '12px' }">
            <div class="task-header">
              <el-tag :type="getPriorityType(task.priority)" size="small">
                {{ getPriorityLabel(task.priority) }}
              </el-tag>
              <el-button
                type="danger"
                :icon="Delete"
                circle
                size="small"
                @click="$emit('delete-task', task.id)"
              />
            </div>
            <div class="task-title">{{ task.title }}</div>
            <div v-if="task.description" class="task-desc">{{ task.description }}</div>
          </el-card>
        </div>
      </VueDraggable>

      <el-button
        class="add-btn"
        type="primary"
        text
        @click="$emit('add-task', status)"
      >
        <el-icon><Plus /></el-icon>
        添加任务
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { Delete, Plus, Document, Loading, CircleCheck } from '@element-plus/icons-vue'

const props = defineProps({
  title: String,
  status: String,
  tasks: {
    type: Array,
    default: () => []
  },
  icon: {
    type: [Object, String],
    default: Document
  }
})

const emit = defineEmits(['update-tasks', 'add-task', 'delete-task'])

const localTasks = computed({
  get: () => [...props.tasks],
  set: (val) => {
    emit('update-tasks', props.status, val)
  }
})

// 样式类
const statusClass = computed(() => `status-${props.status}`)
const tagType = computed(() => {
  const map = { todo: 'info', progress: 'warning', done: 'success' }
  return map[props.status] || 'info'
})

// 优先级标签
const getPriorityType = (priority) => {
  const map = { high: 'danger', medium: 'warning', low: 'success' }
  return map[priority] || 'info'
}

const getPriorityLabel = (priority) => {
  const map = { high: '高', medium: '中', low: '低' }
  return map[priority] || '中'
}

// 拖拽事件
const onUpdate = () => {
  // 排序更新
}

const onAdd = (evt) => {
  // 新增任务到当前列
}
</script>

<style scoped>
.kanban-column {
  flex: 1;
  min-width: 300px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid #ebeef5;
}

.status-todo {
  border-top: 3px solid #909399;
}

.status-progress {
  border-top: 3px solid #e6a23c;
}

.status-done {
  border-top: 3px solid #67c23a;
}

.column-title {
  font-weight: 600;
  font-size: 16px;
}

.column-body {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  min-height: 200px;
}

.task-card-wrapper {
  margin-bottom: 12px;
}

.task-card {
  cursor: grab;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.task-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  line-height: 1.5;
}

.task-desc {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

.add-btn {
  width: 100%;
  margin-top: 8px;
}

/* 拖拽样式 */
.ghost-card {
  opacity: 0.5;
  background: #e6f7ff;
  border: 2px dashed #1890ff;
  border-radius: 8px;
}

.drag-card {
  transform: rotate(3deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
