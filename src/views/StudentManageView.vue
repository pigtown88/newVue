<template>
  <div class="student-manage">
    <h1>學生管理系統</h1>

    <!-- 新增學生表單 -->
    <div class="add-student-form">
      <h3>新增學生</h3>
      <div class="form-group">
        <input v-model="newStudent.name" placeholder="姓名">
        <select v-model="newStudent.grade">
          <option value="">選擇年級</option>
          <option value="1">一年級</option>
          <option value="2">二年級</option>
          <option value="3">三年級</option>
        </select>
        <input 
          type="number" 
          v-model="newStudent.score" 
          placeholder="分數"
          min="0" 
          max="100"
        >
        <button @click="addStudent" :disabled="!isValidForm">新增學生</button>
      </div>
    </div>

    <!-- 搜尋和過濾 -->
    <div class="filters">
      <input 
        type="text" 
        v-model="searchName" 
        placeholder="搜尋姓名..."
        @input="filterStudents"
      >
      <select v-model="gradeFilter" @change="filterStudents">
        <option value="">所有年級</option>
        <option value="1">一年級</option>
        <option value="2">二年級</option>
        <option value="3">三年級</option>
      </select>
    </div>

    <!-- 學生列表 -->
    <table>
      <thead>
        <tr>
          <th>學號</th>
          <th>姓名</th>
          <th>年級</th>
          <th>分數</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.grade }}年級</td>
          <td>{{ student.score }}</td>
          <td>
            <button 
              @click="deleteStudent(student.id)"
              class="delete-btn"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 統計信息 -->
    <div class="statistics">
      <p>總人數：{{ filteredStudents.length }}</p>
      <p>平均分數：{{ averageScore }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentManageView',
  data() {
    return {
      // 原始數據
      students: [
        { id: 1, name: '張三', grade: 1, score: 85 },
        { id: 2, name: '李四', grade: 2, score: 92 },
        { id: 3, name: '王五', grade: 1, score: 78 }
      ],
      // 新學生表單
      newStudent: {
        name: '',
        grade: '',
        score: ''
      },
      // 過濾條件
      searchName: '',
      gradeFilter: '',
      // 過濾後的數據
      filteredStudents: []
    }
  },
  computed: {
    // 驗證表單
    isValidForm() {
      return this.newStudent.name && 
             this.newStudent.grade && 
             this.newStudent.score >= 0 && 
             this.newStudent.score <= 100
    },
    // 計算平均分數
    averageScore() {
      if (this.filteredStudents.length === 0) return 0
      const total = this.filteredStudents.reduce((sum, student) => sum + student.score, 0)
      return (total / this.filteredStudents.length).toFixed(1)
    }
  },
  created() {
    this.filteredStudents = this.students
  },
  methods: {
    // 新增學生
    addStudent() {
      if (!this.isValidForm) return

      const newId = Math.max(...this.students.map(s => s.id), 0) + 1
      const student = {
        id: newId,
        name: this.newStudent.name,
        grade: parseInt(this.newStudent.grade),
        score: parseInt(this.newStudent.score)
      }

      this.students.push(student)
      this.filterStudents()
      
      // 清空表單
      this.newStudent = {
        name: '',
        grade: '',
        score: ''
      }
    },
    // 刪除學生
    deleteStudent(id) {
      if (confirm('確定要刪除這位學生嗎？')) {
        this.students = this.students.filter(student => student.id !== id)
        this.filterStudents()
      }
    },
    // 過濾學生
    filterStudents() {
      this.filteredStudents = this.students.filter(student => {
        const nameMatch = student.name.toLowerCase().includes(this.searchName.toLowerCase())
        const gradeMatch = this.gradeFilter ? student.grade === parseInt(this.gradeFilter) : true
        return nameMatch && gradeMatch
      })
    }
  }
}
</script>

<style scoped>
.student-manage {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.add-student-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
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

.delete-btn {
  background-color: #ff4444;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
}

.statistics {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
}
</style> 