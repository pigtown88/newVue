<template>
  <div class="test-page">
    <h1>{{ title }}</h1>
    <div class="content">
      <p>{{ message }}</p>
      <button @click="handleClick">點擊我</button>
      <p>點擊次數：{{ counter }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestView',
  data() {
    return {
      title: '我的測試頁面',
      message: '這是一個簡單的 Vue 頁面',
      counter: 0
    }
  },
  methods: {
    handleClick() {
      this.counter += 1
    }
  }
}
</script>

<style scoped>
.test-page {
  padding: 20px;
}

.content {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 