<template>
  <div class="product-container">
    <h1>{{ pageTitle }}</h1>

    <!-- 產品表單區域 -->
    <div class="product-form">
      <h3>{{ isEditing ? '編輯產品' : '新增產品' }}</h3>
      <div class="form-group">
        <input 
          v-model="productForm.name"
          placeholder="產品名稱"
          @input="validateForm"
        >
        
        <input 
          v-model.number="productForm.price"
          type="number"
          placeholder="價格"
          @input="validateForm"
        >
        
        <!-- 修改分類選擇的部分 -->
        <select v-model="productForm.category">
          <option value="">選擇分類</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>

        <button 
          @click="handleSubmit"
          :disabled="!isFormValid"
        >
          {{ isEditing ? '更新' : '新增' }}
        </button>
      </div>
    </div>

    <!-- 搜尋和過濾區域 -->
    <div class="filters">
      <input 
        v-model="searchQuery"
        placeholder="搜尋產品..."
      >
      
      <select v-model="categoryFilter">
        <option value="">所有分類</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- 產品列表區域 -->
    <div class="product-list">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        class="product-item"
      >
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>價格: {{ formatPrice(product.price) }}</p>
          <p>庫存: {{ product.stock }}</p>
          <p>分類: {{ getCategoryName(product.category) }}</p>
        </div>
        
        <div class="product-actions">
          <button 
            v-if="product.stock > 0"
            @click="decreaseStock(product)"
          >
            售出
          </button>
          <span v-else class="out-of-stock-text">
            缺貨中
          </span>
          
          <button @click="editProduct(product)">編輯</button>
          <button 
            @click="deleteProduct(product.id)"
            class="delete-btn"
          >
            刪除
          </button>
        </div>
      </div>
    </div>

    <!-- 統計信息 -->
    <div class="statistics">
      <p>總產品數: {{ totalProducts }}</p>
      <p>總庫存量: {{ totalStock }}</p>
      <p>平均價格: {{ averagePrice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductView',
  
  data() {
    return {
      // 確保所有數據都有初始值
      pageTitle: '產品管理系統',
      productForm: {
        id: null,
        name: '',
        price: 0,
        stock: 10,
        category: ''
      },
      isEditing: false,
      products: [],
      categories: [
        { id: 1, name: '電子產品' },
        { id: 2, name: '生活用品' },
        { id: 3, name: '食品' }
      ],
      searchQuery: '',
      categoryFilter: '',
      isFormValid: false
    }
  },

  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
        const categoryMatch = !this.categoryFilter || 
          product.category === this.categoryFilter
        return nameMatch && categoryMatch
      })
    },

    totalProducts() {
      return this.products.length
    },
    
    totalStock() {
      return this.products.reduce((sum, product) => sum + product.stock, 0)
    },
    
    averagePrice() {
      if (this.products.length === 0) return 0
      const total = this.products.reduce((sum, product) => sum + product.price, 0)
      return (total / this.products.length).toFixed(2)
    }
  },

  methods: {
    validateForm() {
      this.isFormValid = 
        this.productForm.name.trim() !== '' && 
        this.productForm.price > 0 &&
        this.productForm.category !== ''
    },

    handleSubmit() {
      if (!this.isFormValid) return

      if (this.isEditing) {
        this.updateProduct()
      } else {
        this.addProduct()
      }
    },

    addProduct() {
      const newProduct = {
        id: Date.now(),
        ...this.productForm
      }
      this.products.push(newProduct)
      this.resetForm()
    },

    updateProduct() {
      const index = this.products.findIndex(p => p.id === this.productForm.id)
      if (index !== -1) {
        this.products[index] = { ...this.productForm }
        this.resetForm()
      }
    },

    editProduct(product) {
      this.isEditing = true
      this.productForm = { ...product }
    },

    deleteProduct(id) {
      if (confirm('確定要刪除此產品？')) {
        this.products = this.products.filter(p => p.id !== id)
      }
    },

    resetForm() {
      this.productForm = {
        id: null,
        name: '',
        price: 0,
        stock: 10,
        category: ''
      }
      this.isEditing = false
      this.isFormValid = false
    },

    decreaseStock(product) {
      if (product.stock > 0) {
        product.stock--
      }
    },

    formatPrice(price) {
      return `$${price.toFixed(2)}`
    },

    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId)
      return category ? category.name : '未分類'
    }
  },

  created() {
    // 初始化一些示例數據
    this.products = [
      { id: 1, name: '筆記型電腦', price: 30000, stock: 5, category: 1 },
      { id: 2, name: '咖啡杯', price: 200, stock: 50, category: 2 },
      { id: 3, name: '餅乾', price: 45, stock: 100, category: 3 }
    ]
  }
}
</script>

<style scoped>
.product-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
}

.product-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.filters {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

input, select {
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

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

.product-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.delete-btn {
  background-color: #ff4444;
}

.statistics {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style> 