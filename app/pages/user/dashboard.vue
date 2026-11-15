<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="flex w-64 shrink-0 flex-col justify-between bg-slate-800 p-4 text-white">
      <div>
        <div class="mb-8 text-center">
          <h1 class="text-lg font-bold">ระบบประเมินบุคลากร</h1>
          <p class="mt-1 text-sm text-slate-300">ผู้รับการประเมิน</p>
          <p class="mt-4 break-all text-sm">{{ username }}</p>
        </div>
        <nav class="space-y-2">
          <NuxtLink to="/user/dashboard" class="box">หน้าหลัก</NuxtLink>
          <NuxtLink to="/user/dashboard/edituser" class="box">แก้ไขข้อมูลของฉัน</NuxtLink>
          <NuxtLink to="/user/dashboard/editpassword" class="box">เปลี่ยนรหัสผ่าน</NuxtLink>
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
  if (user.role !== 'user') return router.replace(user.role === 'hr' ? '/admin/dashboard' : '/judge/dashboard')
  username.value = user.username || ''
})
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/')
}
</script>
