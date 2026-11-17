<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-600 flex flex-col justify-between p-4 shrink-0 text-white">
      <div>
        <div class="text-center mb-6">
          <h1 class="text-xl font-semibold">ประเมินตนเอง</h1>
          <p class="text-xl font-semibold">ผู้ถูกประเมิน</p>
        </div>
        
        <p class="text-lg font-semibold mb-8">username: {{ username }}</p>

        <div class="space-y-2">
          <nuxt-link to="/user/dashboard" class="box block">ประเมินตนเอง</nuxt-link>
          <nuxt-link to="/user/dashboard/edituser" class="box block">แก้ไขข้อมูลของฉัน</nuxt-link>
          <nuxt-link to="/user/dashboard/editpassword" class="box block">แก้ไขรหัสผ่าน</nuxt-link>
        </div>
      </div>

      <button @click="logout" class="btn-red w-full">logout</button>
    </div>

    <div class="flex-1 p-6 overflow-y-auto">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode'

const username = ref('')

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    const decode = jwtDecode(token)
    username.value = decode.username || localStorage.getItem('username') || ''
  }
})

const logout = () => {
  localStorage.clear()
  navigateTo('/')
}

</script>