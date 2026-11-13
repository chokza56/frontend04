<template>
  <div class="relative">
    <div class="flex">
      <div class="bg-gray-600 h-screen w-64 flex flex-col justify-between p-4 shrink-0">  
        <div>
          <div class="text-center">
            <h1 class="text-xl font-semibold text-white mb-2">ประเมินตนเอง</h1>
            <p class="text-xl font-semibold text-white mb-2">ผู้ถูกประเมิน</p>
          </div>
          
          <div>
            <p class="text-white text-lg font-semibold">username: {{ username }}</p>
          </div>

          <div class="mt-10 space-y-2">
            <div>
              <nuxt-link to="/user/dashboard" class="box">ประเมินตนเอง</nuxt-link>
            </div>
            <div>
              <nuxt-link to="/user/dashboard/edituser" class="box">แก้ไขข้อมูลของฉัน</nuxt-link>
            </div>
            <div>
              <nuxt-link to="/user/dashboard/editpassword" class="box">แก้ไขรหัสผ่าน</nuxt-link>
            </div>
          </div>
        </div>
        <div>
          <button type="button" @click="logout" class="btn-red w-full">logout</button>
        </div>
      </div>
      <div class="w-full min-h-screen bg-gray-100 p-6">
        <NuxtPage />
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { jwtDecode } from 'jwt-decode'

const router = useRouter()
const username = ref('')

onMounted(() => {
  username.value = localStorage.getItem('username') || ''

  if (!username.value) {
    const token = localStorage.getItem('token')
    if (token) {
      const decode = jwtDecode(token)
      console.log('ข้อมูลใน token:', decode)
      username.value = decode.username ?? decode.fullname ?? decode.name ?? ''
    }
  }
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/')
}
</script>