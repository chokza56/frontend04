<template>
  <div class="flex h-screen bg-gray-100">
    <div class="w-64 bg-gray-600 flex flex-col justify-between p-4 text-white shrink-0">
      <div>
        <div class="text-center mb-6">
          <h1 class="text-xl font-semibold">ประเมินตนเอง</h1>
          <p class="text-xl font-semibold">ผู้ถูกประเมิน</p>
        </div>
        <p class="text-sm font-medium mb-8 text-gray-200 truncate">Username: {{ username }}</p>
        <div class="space-y-2">
          <nuxt-link to="/user/dashboard" class="block p-2 rounded hover:bg-gray-700 transition">ประเมินตนเอง</nuxt-link>
          <nuxt-link to="/user/dashboard/edituser" class="block p-2 rounded hover:bg-gray-700 transition">แก้ไขข้อมูลของฉัน</nuxt-link>
          <nuxt-link to="/user/dashboard/editpassword" class="block p-2 rounded hover:bg-gray-700 transition">แก้ไขรหัสผ่าน</nuxt-link>
        </div>
      </div>
      <button @click="logout" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition">Logout</button>
    </div>
    <div class="flex-1 p-6 overflow-y-auto">
      <NuxtPage /> 
    </div>
  </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode';
import { ref, onMounted } from 'vue';

const username = ref('')

onMounted(() => {
  const token = localStorage.getItem('token')
  if(token) {
    const decode = jwtDecode(token)
    username.value = decode.username || localStorage.getItem('username') || ''
  }
})
const logout = () => {
  localStorage.clear()
  navigateTo('/')
}
</script>

<!-- 
<div class="flex h-screen bg-gray-100">
    <div class="w-64 bg-gray-600 flex flex-col justify-between p-4 text-white shrink-0">
      <div>
        <div class="text-center mb-6">
          <h1 class="text-xl font-semibold">ประเมินตนเอง</h1>
          <p class="text-xl font-semibold">ผู้ถูกประเมิน</p>
        </div>
        <p class="text-sm font-medium mb-8 text-gray-200 truncate">Username: {{ username }}</p>
        <div class="space-y-2">
          <nuxt-link to="/user/dashboard" class="block p-2 rounded hover:bg-gray-700 transition">ประเมินตนเอง</nuxt-link>
          <nuxt-link to="/user/dashboard/edituser" class="block p-2 rounded hover:bg-gray-700 transition">แก้ไขข้อมูลของฉัน</nuxt-link>
          <nuxt-link to="/user/dashboard/editpassword" class="block p-2 rounded hover:bg-gray-700 transition">แก้ไขรหัสผ่าน</nuxt-link>
        </div>
      </div>
      <button @click="logout" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition">Logout</button>
    </div>
    <div class="flex-1 p-6 overflow-y-auto">
      <NuxtPage /> 
    </div>
  </div> -->


<!-- import { jwtDecode } from 'jwt-decode'

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
} -->