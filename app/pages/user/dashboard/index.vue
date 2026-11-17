<template>
  <div class="mx-auto max-w-lg rounded-xl bg-white p-6 shadow">
    <div v-if="form">
      <h1 class="text-right text-xl font-semibold">แบบประเมินตนเอง</h1>
      <p class="mt-2 text-lg">{{ form.name }}</p>
      <div class="mt-4 flex justify-end">
        <button 
          @click="navigateTo(`/evaluate/${form.token}`)" 
          class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">ทำแบบประเมิน</button>
      </div>
    </div>
    <p v-else class="text-center text-gray-500">ยังไม่มีแบบฟอร์มส่งมา</p>
  </div>
</template>

<script setup>
const api = useApi()
const form = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('/auth/form')
    const data = res?.data || res 
    if (data?.token) {
      form.value = data
    }
  } catch (err) {
    form.value = null
  }
})
</script>