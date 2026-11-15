<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="flex w-64 shrink-0 flex-col justify-between bg-slate-800 p-4 text-white">
      <div>
        <div class="mb-8 text-center">
          <h1 class="text-lg font-bold">ฝ่ายบริหารบุคลากร</h1>
          <p class="mt-1 text-sm text-slate-300">ผู้ดูแลระบบ</p>
          <p class="mt-4 break-all text-sm">{{ username }}</p>
        </div>
        <nav class="space-y-2">
          <NuxtLink to="/admin/dashboard" class="box">ภาพรวม</NuxtLink>
          <NuxtLink to="/admin/dashboard/edituser" class="box">จัดการผู้ใช้</NuxtLink>
          <NuxtLink to="/admin/dashboard/form" class="box">จัดการหัวข้อและตัวชี้วัด</NuxtLink>
          <NuxtLink to="/admin/dashboard/group" class="box">จัดการช่วงเวลาประเมิน</NuxtLink>
        </nav>
      </div>
      <button @click="logout" class="btn-red">ออกจากระบบ</button>
    </aside>
    <main class="min-w-0 flex-1 p-4 md:p-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode'
const username = ref('')
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) return router.replace('/')
  const user = jwtDecode(token)
  if (user.role !== 'hr') return router.replace(user.role === 'judge' ? '/judge/dashboard' : '/user/dashboard')
  username.value = user.username || localStorage.getItem('username') || ''
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/')
}
</script>
