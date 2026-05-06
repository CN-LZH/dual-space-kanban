<template>
  <el-dialog
    v-model="visible"
    title="添加新任务"
    width="480px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="任务标题" prop="title">
        <el-input
          v-model="form.title"
          placeholder="请输入任务标题"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="任务描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
          placeholder="请输入任务描述（选填）"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="优先级" prop="priority">
        <el-radio-group v-model="form.priority">
          <el-radio-button value="high">
            <el-tag type="danger" size="small">高</el-tag>
          </el-radio-button>
          <el-radio-button value="medium">
            <el-tag type="warning" size="small">中</el-tag>
          </el-radio-button>
          <el-radio-button value="low">
            <el-tag type="success" size="small">低</el-tag>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  status: {
    type: String,
    default: 'todo'
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const visible = ref(false)
const formRef = ref()

const form = reactive({
  title: '',
  description: '',
  priority: 'medium'
})

const rules = {
  title: [
    { required: true, message: '请输入任务标题', trigger: 'blur' },
    { min: 1, max: 100, message: '标题长度在 1 到 100 个字符', trigger: 'blur' }
  ]
}

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const handleClose = () => {
  visible.value = false
  resetForm()
}

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.priority = 'medium'
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', {
        title: form.title,
        description: form.description,
        priority: form.priority,
        status: props.status
      })
      handleClose()
    }
  })
}
</script>
