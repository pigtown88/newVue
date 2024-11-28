<template>
  <div class="todo-container">
    <!-- #1 使用 v-model 進行雙向數據綁定 -->
    <div class="input-section">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask"
        placeholder="輸入新任務..."
      >
      <button 
        @click="addTask" 
        :disabled="!newTask.trim()"
      >
        新增
      </button>
    </div>

    <!-- #2 使用 computed 屬性進行過濾 -->
    <div class="filter-section">
      <button 
        v-for="filter in filters" 
        :key="filter"
        @click="currentFilter = filter"
        :class="{ active: currentFilter === filter }"
      >
        {{ filter }}
      </button>
    </div>

    <!-- #3 使用 v-for 進行列表渲染 -->
    <div class="task-list">
      <div 
        v-for="task in filteredTasks" 
        :key="task.id"
        class="task-item"
        :class="{ completed: task.completed }"
      >
        <div class="task-content">
          <!-- #4 使用 v-if/v-else 條件渲染 -->
          <template v-if="task.isEditing">
            <input 
              v-model="task.editText"
              @blur="finishEdit(task)"
              @keyup.enter="finishEdit(task)"
              ref="editInput"
            >
          </template>
          <template v-else>
            <input 
              type="checkbox" 
              v-model="task.completed"
            >
            <span @dblclick="startEdit(task)">
              {{ task.text }}
            </span>
          </template>
        </div>

        <div class="task-actions">
          <button @click="deleteTask(task.id)">刪除</button>
        </div>
      </div>
    </div>

    <!-- #5 使用 computed 屬性顯示統計 -->
    <div class="statistics">
      <p>總計: {{ totalTasks }} 項</p>
      <p>已完成: {{ completedTasks }} 項</p>
      <p>未完成: {{ uncompletedTasks }} 項</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleTodoView',
  
  // #6 使用 data 定義組件的數據
  data() {
    return {
      newTask: '',
      tasks: [],
      currentFilter: '全部',
      filters: ['全部', '進行中', '已完成']
    }
  },

  // #7 使用 computed 計算屬性
  computed: {
    filteredTasks() {
      switch (this.currentFilter) {
        case '進行中':
          return this.tasks.filter(task => !task.completed)
        case '已完成':
          return this.tasks.filter(task => task.completed)
        default:
          return this.tasks
      }
    },
    totalTasks() {
      return this.tasks.length
    },
    completedTasks() {
      return this.tasks.filter(task => task.completed).length
    },
    uncompletedTasks() {
      return this.tasks.filter(task => !task.completed).length
    }
  },

  // #8 使用 methods 定義方法
  methods: {
    addTask() {
      if (!this.newTask.trim()) return
      
      this.tasks.push({
        id: Date.now(),
        text: this.newTask.trim(),
        completed: false,
        isEditing: false,
        editText: ''
      })
      
      this.newTask = ''
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    startEdit(task) {
      task.isEditing = true
      task.editText = task.text
      // #9 使用 nextTick 確保 DOM 更新後執行
      this.$nextTick(() => {
        this.$refs.editInput[0].focus()
      })
    },

    finishEdit(task) {
      if (!task.isEditing) return
      
      task.text = task.editText.trim()
      task.isEditing = false
    }
  },

  // #10 使用生命週期鉤子
  created() {
    // 模擬從本地存儲加載數據
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks)
    }
  },

  // #11 使用 watch 監聽數據變化
  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #a8a8a8;
  cursor: not-allowed;
}

.filter-section {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.filter-section button {
  background-color: #f0f0f0;
  color: #333;
}

.filter-section button.active {
  background-color: #42b983;
  color: white;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.completed {
  opacity: 0.6;
}

.completed span {
  text-decoration: line-through;
}

.statistics {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style> 