<template>
  <div>
    <div v-if="form" class="mx-auto max-w-lg rounded-xl bg-white p-6 shadow">
      <div>
        <h1 class="text-right text-xl font-semibold">แบบประเมินตนเอง</h1>
      </div>
      <div class="mt-2">
        <h1>{{ form.name }}</h1>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          class="rounded-lg bg-blue-600 p-3 text-sm text-white hover:bg-blue-700"
          @click="startForm"
        >
          ทำแบบประเมิน
        </button>
      </div>
    </div>
    <div v-else class="mx-auto max-w-lg rounded-xl bg-white p-6 shadow">
      <h1 class="text-center text-gray-500">ยังไม่มีแบบฟอร์มส่งมา</h1>
    </div>
  </div>
</template>

<script setup>
const api = useApi()
const form = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('/auth/form')
    if (res?.token) {
      form.value = res
    }
  } catch (err) {
    console.error(err)
    form.value = null
  }
})

const startForm = () => {
  if (!form.value?.token) return
  navigateTo(`/evaluate/${form.value.token}`)
}
</script>
