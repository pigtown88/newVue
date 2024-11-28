<template>
  <div class="calculator">
    <h1>簡單計算器</h1>
    
    <div class="input-group">
      <input type="number" v-model="num1" placeholder="請輸入第一個數字">
      
      <select v-model="operator">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">×</option>
        <option value="/">÷</option>
      </select>
      
      <input type="number" v-model="num2" placeholder="請輸入第二個數字">
      
      <button @click="calculate">計算</button>
    </div>

    <div class="result">
      結果: {{ result }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorView',
  data() {
    return {
      num1: '',
      num2: '',
      operator: '+',
      result: 0
    }
  },
  methods: {
    calculate() {
      const n1 = Number(this.num1)
      const n2 = Number(this.num2)

      switch(this.operator) {
        case '+':
          this.result = n1 + n2
          break
        case '-':
          this.result = n1 - n2
          break
        case '*':
          this.result = n1 * n2
          break
        case '/':
          this.result = n2 !== 0 ? n1 / n2 : '無法除以0'
          break
      }
    }
  }
}
</script>

<style scoped>
.calculator {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
}

.input-group {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

input, select, button {
  padding: 8px;
  font-size: 16px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 16px;
}

button:hover {
  background-color: #3aa876;
}

.result {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}
</style> 