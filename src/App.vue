<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">測試頁面</router-link> |
      <router-link to="/new">新頁面</router-link> |
      <router-link to="/calculator">計算器</router-link> |
      <router-link to="/students">學生列表</router-link>|
      <router-link to="/student-manage">學生管理</router-link> |
      <router-link to="/products">產品管理</router-link>|
      <router-link to="/simple-todo">簡易TODO</router-link> |
      <router-link to="/shopping-cart">購物車</router-link> |
      <router-link to="/item-list">物品列表</router-link> |
      <router-link to="/todo-list">待辦事項列表</router-link> <!-- 新增的鏈接 -->

    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
