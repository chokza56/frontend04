<template>
  <div class="mx-auto max-w-lg rounded-xl bg-white p-6 shadow">
    <div v-if="forms.length > 0">
      <h1 class="text-right text-xl font-semibold">แบบประเมินตนเอง</h1>
      <div v-for="item in forms" :key="item.indicator_id" class="mt-3 rounded border p-3">
        <p class="text-lg font-medium">{{ item.name }}</p>
        <p class="text-sm text-gray-600">{{ item.detail }}</p>
        <div class="mt-3 flex justify-end">
          <button
            @click="navigateTo(`/evaluate/${item.indicator_id}`)"
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >ทำแบบประเมิน</button>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-gray-500">ยังไม่มีแบบฟอร์มส่งมา</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const api = useApi()
const forms = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/auth/form')
    forms.value = Array.isArray(res.data?.data) ? res.data.data : []
  } catch (err) {
    forms.value = []
    console.error(err, 'ทำไม่ถูกแล้วกู')
  }
})
</script>


<!-- const api = useApi()
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
}) -->