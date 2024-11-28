<template>
  <div class="cart-container">
    <h1>購物車示例</h1>

    <!-- #1 使用 v-show 條件顯示 -->
    <div v-show="showAlert" class="alert">
      {{ alertMessage }}
    </div>

    <!-- 商品列表區域 -->
    <div class="product-section">
      <h2>可選商品</h2>
      <!-- #2 使用 v-for 和 key 綁定 -->
      <div class="product-grid">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="product-card"
        >
          <!-- #3 使用 v-bind 綁定圖片 -->
          <img :src="product.image" :alt="product.name">
          <h3>{{ product.name }}</h3>
          <p>價格: ${{ product.price }}</p>
          <p>庫存: {{ product.stock }}</p>
          
          <!-- #4 使用 methods 和條件禁用 -->
          <button 
            @click="addToCart(product)"
            :disabled="product.stock === 0"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>

    <!-- 購物車區域 -->
    <div class="cart-section">
      <h2>購物車</h2>
      <!-- #5 使用 computed 過濾顯示 -->
      <div v-if="cartItems.length" class="cart-items">
        <div 
          v-for="item in cartItems" 
          :key="item.id"
          class="cart-item"
        >
          <span>{{ item.name }}</span>
          
          <!-- #6 使用數量控制 -->
          <div class="quantity-control">
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          
          <!-- #7 使用 computed 計算小計 -->
          <span>${{ calculateItemTotal(item) }}</span>
          
          <button 
            @click="removeFromCart(item)"
            class="remove-btn"
          >
            移除
          </button>
        </div>
      </div>
      
      <!-- #8 使用 v-else 顯示空購物車訊息 -->
      <div v-else class="empty-cart">
        購物車是空的
      </div>

      <!-- #9 使用 computed 顯示總計 -->
      <div class="cart-summary" v-if="cartItems.length">
        <p>總計: ${{ total }}</p>
        <button 
          @click="checkout"
          class="checkout-btn"
        >
          結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartView',
  
  // #10 使用 data 定義數據
  data() {
    return {
      products: [
        { 
          id: 1, 
          name: '商品 A', 
          price: 100, 
          stock: 5,
          image: 'https://via.placeholder.com/150'
        },
        { 
          id: 2, 
          name: '商品 B', 
          price: 200, 
          stock: 3,
          image: 'https://via.placeholder.com/150'
        },
        { 
          id: 3, 
          name: '商品 C', 
          price: 150, 
          stock: 8,
          image: 'https://via.placeholder.com/150'
        }
      ],
      cartItems: [],
      showAlert: false,
      alertMessage: ''
    }
  },

  // #11 使用 computed 計算屬性
  computed: {
    total() {
      return this.cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity)
      }, 0)
    }
  },

  // #12 使用 methods 定義方法
  methods: {
    addToCart(product) {
      if (product.stock === 0) return

      const existingItem = this.cartItems.find(item => item.id === product.id)
      
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity++
          product.stock--
          this.showAlert = true
          this.alertMessage = '已增加商品數量'
          this.hideAlert()
        }
      } else {
        this.cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
        product.stock--
        this.showAlert = true
        this.alertMessage = '已加入購物車'
        this.hideAlert()
      }
    },

    removeFromCart(item) {
      const index = this.cartItems.findIndex(i => i.id === item.id)
      if (index > -1) {
        const product = this.products.find(p => p.id === item.id)
        product.stock += item.quantity
        this.cartItems.splice(index, 1)
      }
    },

    increaseQuantity(item) {
      const product = this.products.find(p => p.id === item.id)
      if (product.stock > 0) {
        item.quantity++
        product.stock--
      }
    },

    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--
        const product = this.products.find(p => p.id === item.id)
        product.stock++
      }
    },

    calculateItemTotal(item) {
      return (item.price * item.quantity).toFixed(2)
    },

    checkout() {
      if (confirm('確定要結帳嗎？')) {
        this.cartItems = []
        this.showAlert = true
        this.alertMessage = '結帳成功！'
        this.hideAlert()
      }
    },

    // #13 使用定時器
    hideAlert() {
      setTimeout(() => {
        this.showAlert = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  z-index: 1000;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.cart-items {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-control button {
  padding: 4px 8px;
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

.remove-btn {
  background-color: #ff4444;
}

.checkout-btn {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  font-size: 1.1em;
}

.empty-cart {
  text-align: center;
  padding: 20px;
  color: #666;
}

.cart-summary {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style> 