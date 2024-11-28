<template>
  <div class="todo-container">
    <h1>待辦事項清單</h1>

    <!-- 新增待辦事項 -->
    <div class="add-todo">
      <input 
        v-model="newTodo.title" 
        @keyup.enter="addTodo"
        placeholder="輸入待辦事項..."
      >
      <select v-model="newTodo.priority">
        <option value="high">高優先級</option>
        <option value="medium">中優先級</option>
        <option value="low">低優先級</option>
      </select>
      <button @click="addTodo" :disabled="!newTodo.title">新增</button>
    </div>

    <!-- 過濾選項 -->
    <div class="filters">
      <button 
        v-for="status in ['全部', '進行中', '已完成']" 
        :key="status"
        @click="filterStatus = status"
        :class="{ active: filterStatus === status }"
      >
        {{ status }}
      </button>

      <select v-model="filterPriority">
        <option value="">所有優先級</option>
        <option value="high">高優先級</option>
        <option value="medium">中優先級</option>
        <option value="low">低優先級</option>
      </select>
    </div>

    <!-- 待辦事項列表 -->
    <div class="todo-list">
      <div 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        class="todo-item"
        :class="{ 
          completed: todo.completed,
          ['priority-' + todo.priority]: true 
        }"
      >
        <div class="todo-content">
          <input 
            type="checkbox" 
            v-model="todo.completed"
            @change="updateTodo(todo)"
          >
          <span class="todo-title" @dblclick="startEdit(todo)">
            <template v-if="!todo.editing">
              {{ todo.title }}
            </template>
            <input 
              v-else
              v-model="todo.editTitle"
              @blur="finishEdit(todo)"
              @keyup.enter="finishEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              ref="editInput"
            >
          </span>
        </div>
        
        <div class="todo-actions">
          <span class="date">{{ formatDate(todo.date) }}</span>
          <button @click="deleteTodo(todo.id)" class="delete-btn">刪除</button>
        </div>
      </div>
    </div>

    <!-- 統計信息 -->
    <div class="statistics">
      <p>總計: {{ filteredTodos.length }} 項</p>
      <p>已完成: {{ completedCount }} 項</p>
      <p>未完成: {{ uncompletedCount }} 項</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoListView',
  data() {
    return {
      todos: [],
      newTodo: {
        title: '',
        priority: 'medium'
      },
      filterStatus: '全部',
      filterPriority: '',
      nextId: 1
    }
  },
  computed: {
    filteredTodos() {
      return this.todos.filter(todo => {
        const statusMatch = 
          this.filterStatus === '全部' ? true :
          this.filterStatus === '已完成' ? todo.completed :
          !todo.completed

        const priorityMatch = 
          !this.filterPriority || todo.priority === this.filterPriority

        return statusMatch && priorityMatch
      }).sort((a, b) => b.date - a.date)
    },
    completedCount() {
      return this.todos.filter(todo => todo.completed).length
    },
    uncompletedCount() {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    addTodo() {
      if (!this.newTodo.title.trim()) return

      this.todos.push({
        id: this.nextId++,
        title: this.newTodo.title.trim(),
        completed: false,
        priority: this.newTodo.priority,
        date: new Date(),
        editing: false
      })

      this.newTodo.title = ''
      this.saveTodos()
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.saveTodos()
    },
    updateTodo(todo) {
      this.saveTodos()
    },
    startEdit(todo) {
      todo.editing = true
      todo.editTitle = todo.title
      this.$nextTick(() => {
        this.$refs.editInput[0].focus()
      })
    },
    finishEdit(todo) {
      if (!todo.editing) return
      todo.title = todo.editTitle.trim()
      todo.editing = false
      this.saveTodos()
    },
    cancelEdit(todo) {
      todo.editing = false
    },
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    loadTodos() {
      const saved = localStorage.getItem('todos')
      if (saved) {
        this.todos = JSON.parse(saved)
        this.nextId = Math.max(...this.todos.map(t => t.id)) + 1
      }
    }
  },
  created() {
    this.loadTodos()
  }
}
</script>

<style scoped>
.todo-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.filters button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #f0f0f0;
  cursor: pointer;
}

.filters button.active {
  background: #42b983;
  color: white;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.todo-title {
  flex: 1;
}

.completed .todo-title {
  text-decoration: line-through;
  color: #999;
}

.priority-high {
  border-left: 4px solid #ff4444;
}

.priority-medium {
  border-left: 4px solid #ffbb33;
}

.priority-low {
  border-left: 4px solid #00C851;
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date {
  color: #666;
  font-size: 0.9em;
}

.delete-btn {
  padding: 4px 8px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.statistics {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}
</style> 