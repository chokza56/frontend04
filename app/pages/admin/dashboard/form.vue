<template>
  <div class="space-y-6">
    <div><h1 class="text-2xl font-bold text-gray-800">จัดการหัวข้อและตัวชี้วัด</h1><p class="mt-1 text-sm text-gray-500">เพิ่มและแก้ไขหัวข้อประเมิน รวมถึงตัวชี้วัด</p></div>
    <section class="rounded-2xl bg-white p-5 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold">หัวข้อประเมิน</h2>
      <form @submit.prevent="saveTopic" class="mb-5 grid gap-3 md:grid-cols-[1fr_2fr_auto]">
        <input v-model="topicForm.name" class="input" placeholder="ชื่อหัวข้อ" required>
        <input v-model="topicForm.description" class="input" placeholder="รายละเอียด">
        <div class="flex gap-2"><button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">{{ topicForm.id ? 'บันทึก' : 'เพิ่มหัวข้อ' }}</button><button v-if="topicForm.id" type="button" @click="resetTopic" class="rounded-lg bg-gray-200 px-4">ยกเลิก</button></div>
      </form>
      <div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="border-b text-gray-500"><tr><th class="py-2">หัวข้อ</th><th>รายละเอียด</th><th>จัดการ</th></tr></thead><tbody><tr v-for="t in topics" :key="t.id" class="border-b"><td class="py-3">{{ t.name }}</td><td>{{ t.description }}</td><td class="space-x-3"><button @click="editTopic(t)" class="text-blue-600">แก้ไข</button><button @click="deleteTopic(t.id)" class="text-red-600">ลบ</button></td></tr></tbody></table></div>
    </section>
    <section class="rounded-2xl bg-white p-5 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold">ตัวชี้วัด</h2>
      <form @submit.prevent="saveIndicator" class="grid gap-3 md:grid-cols-2">
        <select v-model.number="indicatorForm.topic_id" class="input" required><option disabled :value="0">เลือกหัวข้อ</option><option v-for="t in topics" :key="t.id" :value="t.id">{{ t.name }}</option></select>
        <input v-model="indicatorForm.name" class="input" placeholder="ชื่อตัวชี้วัด" required>
        <input v-model="indicatorForm.description" class="input" placeholder="รายละเอียด">
        <input v-model="indicatorForm.weight" type="number" min="0.1" step="0.1" class="input" placeholder="น้ำหนัก" required>
        <select v-model="indicatorForm.eval_type" class="input"><option value="yesno">ใช่ / ไม่ใช่</option><option value="scale">ระดับ 1-4</option></select>
        <input v-model="indicatorForm.evidence_desc" class="input" placeholder="หลักฐานที่ต้องใช้">
        <div class="md:col-span-2 flex gap-2"><button class="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">{{ indicatorForm.id ? 'บันทึกตัวชี้วัด' : 'เพิ่มตัวชี้วัด' }}</button><button v-if="indicatorForm.id" type="button" @click="resetIndicator" class="rounded-lg bg-gray-200 px-4">ยกเลิก</button></div>
      </form>
      <div class="mt-5 overflow-x-auto"><table class="w-full text-left text-sm"><thead class="border-b text-gray-500"><tr><th class="py-2">ตัวชี้วัด</th><th>หัวข้อ</th><th>น้ำหนัก</th><th>รูปแบบ</th><th>จัดการ</th></tr></thead><tbody><tr v-for="i in indicators" :key="i.id" class="border-b"><td class="py-3">{{ i.name }}</td><td>{{ topicName(i.topic_id) }}</td><td>{{ i.weight }}</td><td>{{ i.eval_type }}</td><td class="space-x-3 whitespace-nowrap"><button @click="editIndicator(i)" class="text-blue-600">แก้ไข</button><button @click="deleteIndicator(i.id)" class="text-red-600">ลบ</button></td></tr><tr v-if="!indicators.length"><td colspan="5" class="py-5 text-center text-gray-400">ไม่มีตัวชี้วัด</td></tr></tbody></table></div>
    </section>
  </div>
</template>
<script setup>
const api = useApi()
const topics = ref([])
const indicators = ref([])
const emptyTopic = () => ({ id: null, name: '', description: '' })
const emptyIndicator = () => ({ id: null, topic_id: 0, name: '', description: '', weight: 1, eval_type: 'yesno', evidence_desc: '' })
const topicForm = ref(emptyTopic())
const indicatorForm = ref(emptyIndicator())
const topicName = (id) => topics.value.find(t => Number(t.id) === Number(id))?.name || '-'
async function load() {
  const [t, i] = await Promise.all([api.get('/topic/getall'), api.get('/indicator/getall')])
  topics.value = t.data.data || []; indicators.value = i.data.data || []
}
function editTopic(t) { topicForm.value = { ...t } }
function resetTopic() { topicForm.value = emptyTopic() }
async function saveTopic() {
  try {
    if (topicForm.value.id) await api.put(`/topic/update/${topicForm.value.id}`, topicForm.value)
    else await api.post('/topic/create', topicForm.value)
    resetTopic(); await load()
  } catch (err) { alert(err.response?.data?.message || 'บันทึกหัวข้อไม่สำเร็จ') }
}
async function deleteTopic(id) {
  if (!confirm('ต้องการลบหัวข้อนี้หรือไม่?')) return
  try { await api.delete(`/topic/remove/${id}`); await load() } catch (err) { alert(err.response?.data?.message || 'ลบไม่สำเร็จ') }
}
function editIndicator(i) { indicatorForm.value = { ...i } }
function resetIndicator() { indicatorForm.value = emptyIndicator() }
async function saveIndicator() {
  try {
    const body = { ...indicatorForm.value }
    delete body.id
    if (indicatorForm.value.id) await api.put(`/indicator/updateindicator/${indicatorForm.value.id}`, body)
    else await api.post('/indicator/create', body)
    resetIndicator(); await load()
  } catch (err) { alert(err.response?.data?.message || 'บันทึกตัวชี้วัดไม่สำเร็จ') }
}
async function deleteIndicator(id) {
  if (!confirm('ต้องการลบตัวชี้วัดนี้หรือไม่?')) return
  try { await api.delete(`/indicator/remove/${id}`); await load() } catch (err) { alert(err.response?.data?.message || 'ลบไม่สำเร็จ') }
}
onMounted(load)
</script>
