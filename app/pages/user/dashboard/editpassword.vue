<template>
  <div class="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-sm">
    <h1 class="mb-2 text-xl font-bold text-gray-800">เปลี่ยนรหัสผ่าน</h1>
    <p class="mb-6 text-sm text-gray-500">กรอกรหัสผ่านเดิมและกำหนดรหัสผ่านใหม่</p>
    <form @submit.prevent="changePassword" class="space-y-4">
      <div><label class="mb-1 block text-sm text-gray-600">รหัสผ่านเดิม</label><input v-model="form.currentPassword" type="password" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">รหัสผ่านใหม่</label><input v-model="form.password" type="password" class="input" required minlength="6"></div>
      <div><label class="mb-1 block text-sm text-gray-600">ยืนยันรหัสผ่านใหม่</label><input v-model="confirmPassword" type="password" class="input" required minlength="6"></div>
      <button type="submit" :disabled="saving" class="btn-blue disabled:opacity-50">{{ saving ? 'กำลังบันทึก...' : 'เปลี่ยนรหัสผ่าน' }}</button>
    </form>
  </div>
</template>
<script setup>
import { jwtDecode } from 'jwt-decode'
const api = useApi()
const form = ref({ currentPassword: '', password: '' })
const confirmPassword = ref('')
const saving = ref(false)
async function changePassword() {
  if (form.value.password !== confirmPassword.value) return alert('รหัสผ่านใหม่ไม่ตรงกัน')
  const token = localStorage.getItem('token')
  const user = jwtDecode(token)
  saving.value = true
  try {
    const res = await api.put(`/user/updatepassword/${user.id}`, form.value)
    alert(res.data.message || 'เปลี่ยนรหัสผ่านสำเร็จ')
    form.value = { currentPassword: '', password: '' }
    confirmPassword.value = ''
  } catch (err) {
    alert(err.response?.data?.message || 'เปลี่ยนรหัสผ่านไม่สำเร็จ')
  } finally { saving.value = false }
}
</script>
