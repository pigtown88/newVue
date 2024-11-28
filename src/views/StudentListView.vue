<template>
  <div class="student-list">
    <h1>學生列表</h1>
    
    <!-- 搜尋和過濾區 -->
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.grade }}年級</td>
          <td>{{ student.score }}</td>
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
  name: 'StudentListView',
  data() {
    return {
      // 原始數據
      students: [
        { id: 1, name: '張三', grade: 1, score: 85 },
        { id: 2, name: '李四', grade: 2, score: 92 },
        { id: 3, name: '王五', grade: 1, score: 78 },
        { id: 4, name: '趙六', grade: 3, score: 95 },
        { id: 5, name: '孫七', grade: 2, score: 88 }
      ],
      // 過濾條件
      searchName: '',
      gradeFilter: '',
      // 過濾後的數據
      filteredStudents: []
    }
  },
  created() {
    // 初始化過濾後的數據
    this.filteredStudents = this.students
  },
  computed: {
    // 計算平均分數
    averageScore() {
      if (this.filteredStudents.length === 0) return 0
      const total = this.filteredStudents.reduce((sum, student) => sum + student.score, 0)
      return (total / this.filteredStudents.length).toFixed(1)
    }
  },
  methods: {
    filterStudents() {
      this.filteredStudents = this.students.filter(student => {
        // 姓名過濾
        const nameMatch = student.name.toLowerCase().includes(this.searchName.toLowerCase())
        // 年級過濾
        const gradeMatch = this.gradeFilter ? student.grade === parseInt(this.gradeFilter) : true
        
        return nameMatch && gradeMatch
      })
    }
  }
}
</script>

<style scoped>
.student-list {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

input, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
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