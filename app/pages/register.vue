<template>
  <div class="min-h-screen bg-gray-100 px-4 py-10">
    <form @submit.prevent="register" class="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-lg">
      <h1 class="mb-6 text-center text-2xl font-bold text-gray-800">สมัครสมาชิก</h1>
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm text-gray-600">ชื่อผู้ใช้</label>
          <input v-model="form.username" class="input" required>
        </div>
        <div>
          <label class="mb-1 block text-sm text-gray-600">รหัสผ่าน</label>
          <input v-model="form.password" type="password" class="input" required>
        </div>
        <div>
          <label class="mb-1 block text-sm text-gray-600">ชื่อ-นามสกุล</label>
          <input v-model="form.fullname" class="input" required>
        </div>
        <div>
          <label class="mb-1 block text-sm text-gray-600">อีเมล</label>
          <input v-model="form.email" type="email" class="input" required>
        </div>
      </div>
      <button type="submit" :disabled="loading" class="btn-blue mt-6 disabled:opacity-50">
        {{ loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก' }}
      </button>
      <p class="mt-4 text-center text-sm text-gray-500">
        มีบัญชีแล้ว? <NuxtLink to="/" class="font-semibold text-blue-600 hover:underline">เข้าสู่ระบบ</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>
const api = useApi()
const loading = ref(false)
const form = ref({ username: '', password: '', fullname: '', email: '' })

async function register() {
  loading.value = true
  try {
    const res = await api.post('/auth/register', form.value)
    alert(res.data.message || 'สมัครสมาชิกสำเร็จ')
    await navigateTo('/')
  } catch (err) {
    alert(err.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ')
  } finally {
    loading.value = false
  }
}
</script>
