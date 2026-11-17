<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm my-6">
    <h1 class="mb-6 text-xl font-bold text-gray-800">ข้อมูลของฉัน</h1>

    <form @submit.prevent="save" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm text-gray-600">ชื่อผู้ใช้</label>
        <input v-model="form.username" class="input bg-gray-50" readonly />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">ชื่อ-นามสกุล</label>
        <input v-model="form.fullname" class="input" required />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">อีเมล</label>
        <input v-model="form.email" type="email" class="input" required />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">เบอร์โทรศัพท์</label>
        <input v-model="form.phone" class="input" required />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">เลขประจำตัวประชาชน (czid)</label>
        <input v-model="form.czid" class="input" required />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">เงินเดือน (salary)</label>
        <input v-model="form.salary" type="number" class="input" required />
      </div>
      
      <div>
        <label class="mb-1 block text-sm text-gray-600">แผนก (Department)</label>
        <select v-model="form.department" class="input" required>
          <option disabled value="">-- เลือกแผนก --</option>
          <option value="IT">IT</option>
          <option value="ช่างยนต์">ช่างยนต์</option>
        </select>
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">ระดับ (Level)</label>
        <select v-model="form.level" class="input" required>
          <option disabled value="">-- เลือกระดับ --</option>
          <option value="ชำนาญการ">ชำนาญการ</option>
          <option value="ชำนาญการพิเศษ">ชำนาญการพิเศษ</option>
          <option value="เชี่ยวชาญ">เชี่ยวชาญ</option>
          <option value="เชี่ยวชาญพิเศษ">เชี่ยวชาญพิเศษ</option>
        </select>
      </div>

      <button type="submit" class="w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 p-3 mt-4">บันทึกข้อมูล</button>
    </form>
  </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode'

const api = useApi()
const form = ref({
  username: '',
  fullname: '',
  email: '',
  phone: '',
  czid: '',
  department: '',
  salary: '',
  level: ''
})
const userId = ref('')

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return navigateTo('/')

  try {
    const decoded = jwtDecode(token)
    userId.value = decoded.id

    const res = await api.get('admin/users')
    const users = res.data?.data || res.data || res
    const user = users.find(item => item.id == userId.value)

    if (user) {
      form.value = {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone || '',
        czid: user.czid || '',
        department: user.department || user.departmant || '',
        salary: user.salary || '',
        level: user.level || user.leval || ''
      }
    }
  } catch (err) {
    alert(err.response?.data?.message || 'โหลดข้อมูลไม่สำเร็จ')
  }
})

const save = async () => {
  try {
    await api.put(`admin/users/${userId.value}`, {
      fullname: form.value.fullname,
      email: form.value.email,
      phone: form.value.phone,
      czid: form.value.czid,
      department: form.value.department,
      salary: form.value.salary,
      level: form.value.level
    })
    alert('บันทึกข้อมูลสำเร็จ')
  } catch (err) {
    alert(err.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึก')
  }
}
</script>