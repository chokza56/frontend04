<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
    <h1 class="mb-6 text-xl font-bold text-gray-800">แก้ไขข้อมูลส่วนตัว</h1>

    <form @submit.prevent="save" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm text-gray-600">ชื่อผู้ใช้</label>
        <input v-model="username" class="input bg-gray-50" readonly />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">ชื่อ-นามสกุล</label>
        <input v-model="fullname" class="input" required />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">อีเมล</label>
        <input v-model="email" type="email" class="input" required />
      </div>

      <button type="submit" class="w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 p-3 mt-4">บันทึกข้อมูล</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'

const api = useApi()
const username = ref('')
const fullname = ref('')
const email = ref('')
const userId = ref('')

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return navigateTo('/')

  try {
    const decoded = jwtDecode(token)
    userId.value = decoded.id
    username.value = decoded.username || localStorage.getItem('username') || ''

    // ดึงข้อมูลโปรไฟล์กรรมการ
    const res = await api.get(`admin/users/${userId.value}`)
    const data = res.data?.data || res.data
    
    fullname.value = data.fullname || ''
    email.value = data.email || ''
  } catch (err) {
    alert(err.response?.data?.message || 'โหลดข้อมูลไม่สำเร็จ')
  }
})

const save = async () => {
  try {
    await api.put(`admin/users/${userId.value}`, {
      fullname: fullname.value,
      email: email.value
    })
    alert('บันทึกข้อมูลสำเร็จ')
  } catch (err) {
    alert(err.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึก')
  }
}
</script>