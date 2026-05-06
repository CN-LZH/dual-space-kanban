# 双模式个人任务看板系统

一个基于 Vue 3 + Vite + Element Plus 的纯前端任务看板应用，支持工作和学习两种模式，帮助你更好地管理个人任务。

## 功能特性

- **双模式切换**：支持"工作模式"和"学习模式"，不同模式下任务独立管理
- **看板拖拽**：任务卡片可在"待办"、"进行中"、"已完成"三列之间自由拖拽
- **任务管理**：支持添加、删除任务，设置优先级（高/中/低）
- **主题切换**：工作模式偏蓝灰色调，学习模式偏暖绿色调
- **数据持久化**：所有数据自动保存到 localStorage，刷新页面不丢失
- **登录验证**：简单的前端登录验证机制

## 技术栈

- **Vue 3**：使用 Composition API + `<script setup>` 语法
- **Vite**：下一代前端构建工具
- **Element Plus**：Vue 3 组件库
- **Vue Router**：官方路由管理器
- **Pinia**：Vue 状态管理库
- **vue-draggable-plus**：拖拽排序组件

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173/

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 登录

- 用户名：`admin`
- 密码：`123456`

### 模式切换

点击顶部导航栏的"工作模式"或"学习模式"按钮切换不同模式，每个模式下的任务是独立的。

### 任务操作

- **添加任务**：点击每列底部的"+ 添加任务"按钮
- **拖拽任务**：直接拖拽任务卡片到目标列
- **删除任务**：点击任务卡片右上角的删除按钮

## 项目结构

```
dual-space-kanban/
├── index.html              # 入口 HTML 文件
├── package.json            # 项目配置文件
├── vite.config.js          # Vite 配置文件
├── public/                 # 静态资源
│   └── vite.svg
└── src/                    # 源代码
    ├── main.js             # 应用入口
    ├── App.vue             # 根组件
    ├── router/             # 路由配置
    │   └── index.js
    ├── stores/             # 状态管理
    │   └── taskStore.js
    ├── views/              # 页面组件
    │   ├── Login.vue       # 登录页
    │   └── Kanban.vue      # 看板主页
    ├── components/         # 通用组件
    │   ├── AppLayout.vue   # 全局布局
    │   ├── KanbanColumn.vue # 看板列
    │   └── TaskDialog.vue  # 任务对话框
    └── styles/             # 样式文件
        └── global.css
```

## 初始模拟数据

项目内置了以下模拟数据供演示：

### 工作模式
- 评估旧版 C# WinForms 项目向 Web 端的迁移方案（待办）
- 整理本周工作周报（已完成）

### 学习模式
- 完成 HTML/CSS 翻转卡片特效练习（进行中）
- 使用语音工具进行 30 分钟英语口语交流训练（待办）

## 开源协议

MIT License
