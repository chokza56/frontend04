<template>
  <div class="space-y-6">
    <div><h1 class="text-2xl font-bold text-gray-800">แบบประเมินของฉัน</h1><p class="mt-1 text-sm text-gray-500">รายการหัวข้อและตัวชี้วัดที่มีในระบบ</p></div>
    <div class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      Backend ชุดที่ได้รับยังไม่มี API สำหรับส่งคำตอบแบบประเมินหรือดูผลการประเมิน หน้านี้จึงแสดงรายการหัวข้อและตัวชี้วัดที่มีอยู่เท่านั้น
    </div>
    <div v-for="topic in topics" :key="topic.id" class="rounded-2xl bg-white p-5 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-800">{{ topic.name }}</h2>
      <p v-if="topic.description" class="mt-1 text-sm text-gray-500">{{ topic.description }}</p>
      <div class="mt-4 divide-y">
        <div v-for="item in indicators.filter(i => Number(i.topic_id) === Number(topic.id))" :key="item.id" class="py-3">
          <div class="flex flex-wrap items-center justify-between gap-2"><p class="font-medium text-gray-700">{{ item.name }}</p><span class="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">น้ำหนัก {{ item.weight }}</span></div>
          <p v-if="item.description" class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
          <p class="mt-1 text-xs text-gray-400">รูปแบบ: {{ item.eval_type === 'scale' ? 'ระดับ 1-4' : 'ใช่ / ไม่ใช่' }}</p>
        </div>
        <p v-if="!indicators.some(i => Number(i.topic_id) === Number(topic.id))" class="py-3 text-sm text-gray-400">ยังไม่มีตัวชี้วัด</p>
      </div>
    </div>
    <div v-if="!topics.length" class="rounded-2xl bg-white p-8 text-center text-gray-400 shadow-sm">ยังไม่มีหัวข้อประเมิน</div>
  </div>
</template>
<script setup>
const api = useApi()
const topics = ref([])
const indicators = ref([])
onMounted(async () => {
  try {
    const [t, i] = await Promise.all([api.get('/topic/getall'), api.get('/indicator/getall')])
    topics.value = t.data.data || []
    indicators.value = i.data.data || []
  } catch (err) { console.log(err); alert(err.response?.data?.message || 'โหลดข้อมูลไม่สำเร็จ') }
})
</script>
