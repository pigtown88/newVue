<template>
  <div>
    <h1>物品列表</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: '物品一' },
        { id: 2, name: '物品二' },
        { id: 3, name: '物品三' }
      ]
    };
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style> 