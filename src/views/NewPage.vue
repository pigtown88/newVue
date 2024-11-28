<template>
  <div class="new-page">
    <h1>{{ title }}</h1>
    <div class="content">
      <p>{{ message }}</p>
      <button @click="handleClick">點擊我</button>
      <p>點擊次數：{{ count }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPage',
  data() {
    return {
      title: '這是新頁面',
      message: '歡迎來到新頁面！',
      count: 0
    }
  },
  methods: {
    handleClick() {
      this.count++
    }
  }
}
</script>

<style scoped>
.new-page {
  padding: 20px;
}
.content {
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 