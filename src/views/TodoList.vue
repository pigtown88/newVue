<!-- src/views/TodoList.vue -->
<template>
  <div>
    <h1>待辦事項列表</h1>
    <input v-model="newTodo" placeholder="新增待辦事項" @keyup.enter="addTodo" /> <!-- 使用 v-model 來綁定輸入框的值 -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }} <!-- 顯示每個待辦事項的文本 -->
        <button @click="removeTodo(todo.id)">刪除</button> <!-- 使用 @click 來綁定刪除事件 -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '', // 用來存儲用戶輸入的新待辦事項
      todos: [] // 用來存儲待辦事項的數組
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) { // 確保輸入不為空
        this.todos.push({ id: Date.now(), text: this.newTodo }); // 將新待辦事項添加到 todos 陣列
        this.newTodo = ''; // 清空輸入框
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id); // 根據 id 刪除待辦事項
    }
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
input {
  margin-bottom: 10px;
}
button {
  margin-left: 10px;
}
</style>