<template>
  <div class="min-h-screen mx-auto max-w-400 rounded-xl bg-white p-6 shadow">
    <div v-if="forms.length > 0">
      <h1 class="text-reft text-2xl font-bold">แบบประเมินตนเอง</h1>
      <div v-for="item in forms" :key="item.id" class="mt-3 rounded-xl border  p-3">
        <p class="text-lg font-medium">{{ item.name }}</p>
        <p class="text-sm text-gray-600">{{ item.detail }}</p>
        <div class="mt-3 flex justify-end">
          <button @click="navigateTo(`/evaluate/${item.id}`)"class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">ทำแบบประเมิน</button>
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

async function loadForms() {
  try {
    const res = await api.get('/auth/form')
    const list = res.data?.data

    forms.value = Array.isArray(list) ? list : []
  } catch (err) {
    console.error('โหลดข้อมูลฟอร์มไม่สำเร็จ:', err)
    forms.value = []
  }
}
onMounted(loadForms)
</script>
