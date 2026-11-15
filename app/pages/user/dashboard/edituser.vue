<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
    <h1 class="mb-6 text-xl font-bold text-gray-800">ข้อมูลของฉัน</h1>
    <form @submit.prevent="save" class="space-y-4">
      <div><label class="mb-1 block text-sm text-gray-600">ชื่อผู้ใช้</label><input v-model="form.username" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">ชื่อ-นามสกุล</label><input v-model="form.fullname" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">อีเมล</label><input v-model="form.email" type="email" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">บทบาท</label><input :value="roleName" class="input bg-gray-100" disabled></div>
      <button type="submit" :disabled="saving" class="btn-blue disabled:opacity-50">{{ saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}</button>
    </form>
  </div>
</template>
<script setup>
import { jwtDecode } from 'jwt-decode'
const api = useApi()
const form = ref({ username: '', fullname: '', email: '', role: 'user' })
const saving = ref(false)
let myId = null
const roleName = computed(() => ({ hr: 'ผู้ดูแลระบบ', judge: 'กรรมการ', user: 'ผู้รับการประเมิน' }[form.value.role] || form.value.role))
async function load() {
  const token = localStorage.getItem('token')
  const user = jwtDecode(token)
  myId = user.id
  const res = await api.get(`/user/getbyid/${myId}`)
  form.value = res.data.data
}
async function save() {
  saving.value = true
  try {
    await api.put(`/user/updateuser/${myId}`, form.value)
    localStorage.setItem('username', form.value.username)
    alert('บันทึกข้อมูลสำเร็จ')
  } catch (err) {
    alert(err.response?.data?.message || 'บันทึกไม่สำเร็จ')
  } finally { saving.value = false }
}
onMounted(load)
</script>
