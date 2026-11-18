<template>
  <div class="relative">
    <div class="flex">
      <!-- Sidebar ฝั่งกรรมการ -->
      <div class="bg-gray-600 h-screen w-64 flex flex-col justify-between p-4 shrink-0">  
        <div>
          <div class="text-center mb-6">
            <h1 class="text-xl font-semibold text-white mb-2">กรรมการประเมินผล</h1>
            <p class="text-xl font-semibold text-white mb-2">ผู้ประเมิน</p>
          </div>
          
          <div class="mb-6">
            <p class="text-white text-lg font-semibold">username: {{ username }}</p>
          </div>

          <div class="space-y-2">
            <div>
              <nuxt-link to="/judge/dashboard" class="box block">ผู้รับการประเมินที่ได้รับมอบหมาย</nuxt-link>
            </div>
            <div>
              <nuxt-link to="/judge/dashboard/editpassword" class="box block">แก้ไขรหัสผ่าน</nuxt-link>
            </div>
          </div>
        </div>

        <div>
          <button type="button" @click="logout" class="btn-red w-full">logout</button>
        </div>
      </div>
      
      <div class="w-full min-h-screen bg-gray-100 p-6 overflow-y-auto">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const router = useRouter()
const username = ref('')

onMounted(() => {
  username.value = localStorage.getItem('username') || ''
})

function logout() {
  localStorage.clear()
  router.push('/')
}
</script>