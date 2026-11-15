<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex min-h-56 items-center justify-center bg-slate-700 px-6 text-center text-white">
      <div>
        <p class="mb-2 text-sm font-medium tracking-widest text-blue-200">PERSONNEL MANAGEMENT</p>
        <h1 class="text-3xl font-bold md:text-4xl">ระบบประเมินบุคลากร</h1>
        <p class="mt-3 text-slate-200">เข้าสู่ระบบเพื่อใช้งาน</p>
      </div>
    </div>

    <div class="flex justify-center px-4 py-12">
      <form @submit.prevent="login" class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 class="mb-6 text-center text-2xl font-bold text-gray-800">เข้าสู่ระบบ</h2>
        <div class="mb-4">
          <label class="mb-1 block text-sm text-gray-600">ชื่อผู้ใช้</label>
          <input v-model="username" type="text" class="input" placeholder="กรอกชื่อผู้ใช้" required>
        </div>
        <div class="mb-6">
          <label class="mb-1 block text-sm text-gray-600">รหัสผ่าน</label>
          <input v-model="password" type="password" class="input" placeholder="กรอกรหัสผ่าน" required>
        </div>
        <button type="submit" :disabled="loading" class="btn-blue disabled:opacity-50">
          {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
        </button>
        <p class="mt-4 text-center text-sm text-gray-500">
          ยังไม่มีบัญชี? <NuxtLink to="/register" class="font-semibold text-blue-600 hover:underline">สมัครสมาชิก</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode'

const api = useApi()
const username = ref('')
const password = ref('')
const loading = ref(false)

async function login() {
  loading.value = true
  try {
    const res = await api.post('/auth/login', {
      username: username.value,
      password: password.value
    })

    const token = res.data.authorization
    localStorage.setItem('token', token)

    const user = jwtDecode(token)
    localStorage.setItem('username', user.username || username.value)

    if (user.role === 'hr') await navigateTo('/admin/dashboard')
    else if (user.role === 'judge') await navigateTo('/judge/dashboard')
    else if (user.role === 'user') await navigateTo('/user/dashboard')
    else alert('ไม่พบสิทธิ์การใช้งานของบัญชีนี้')
  } catch (err) {
    alert(err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ')
  } finally {
    loading.value = false
  }
}
</script>
