<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
    <h1 class="mb-6 text-xl font-bold text-gray-800">เปลี่ยนรหัสผ่าน</h1>

    <form @submit.prevent="save" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm text-gray-600">รหัสผ่านเดิม</label>
        <input v-model="form.old_password" type="password" class="input" autocomplete="current-password" required />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">รหัสผ่านใหม่</label>
        <input v-model="form.new_password" type="password" minlength="6" class="input" autocomplete="new-password" required />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">ยืนยันรหัสผ่านใหม่</label>
        <input v-model="form.confirm_password" type="password" minlength="6" class="input" autocomplete="new-password" required />
      </div>

      <button type="submit" class="w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 p-3">เปลี่ยนรหัสผ่าน</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

const api = useApi()
const route = useRoute()
const form = ref({ 
  old_password: '', 
  new_password: '', 
  confirm_password: '' 
})

const save = async () => {
  if (form.value.new_password !== form.value.confirm_password) {
    return alert('รหัสผ่านใหม่และการยืนยันไม่ตรงกัน')
  }
  
  if (!localStorage.getItem('token')) return navigateTo('/')

  try {
    await api.put('/auth/change-password', {
      old_password: form.value.old_password,
      new_password: form.value.new_password
    })
    
    alert('เปลี่ยนรหัสผ่านสำเร็จ')
    
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)

    localStorage.setItem('status', '1')

    if (decoded.role === 'judge') {
      navigateTo('/judge/dashboard')
    } else {
      navigateTo('/user/dashboard')
    }

  } catch (err) {
    alert(err.response?.data?.message || 'เปลี่ยนรหัสผ่านไม่สำเร็จ')
  }
}
</script>