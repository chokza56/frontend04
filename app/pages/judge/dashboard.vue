<template>
  <div class="relative">
    <div class="flex">
      <div class="bg-gray-600 h-screen w-64 flex flex-col justify-between p-4 shrink-0">  
        <div>
          <div class="text-center">
            <h1 class="text-xl font-semibold text-white mb-2">ฝ่ายบริหารบุคลากร</h1>
            <p class="text-xl font-semibold text-white mb-2">ผู้ดูแลระบบ</p>
          </div>
          
          <div>
            <p class="text-white text-lg font-semibold">username: {{ username }}</p>
          </div>

          <div class="mt-10 space-y-2">
            <div>
              <nuxt-link to="/judge/dashboard" class="box">ผู้ที่ต้องประเมิน</nuxt-link>
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
const router = useRouter()
const username = ref('')

onMounted(() => {
  username.value = localStorage.getItem('username') || ''
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/')
}
</script>