<template>
  <div class="space-y-6">
    <div><h1 class="text-2xl font-bold text-gray-800">จัดการช่วงเวลาประเมิน</h1><p class="mt-1 text-sm text-gray-500">กำหนดชื่อและวันที่เริ่มต้น-สิ้นสุดของแต่ละรอบ</p></div>
    <form @submit.prevent="save" class="grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2">
      <div class="md:col-span-2"><label class="mb-1 block text-sm text-gray-600">ชื่อช่วงเวลา</label><input v-model="form.name" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">วันเริ่มต้น</label><input v-model="form.start_date" type="date" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">วันสิ้นสุด</label><input v-model="form.end_date" type="date" class="input" required></div>
      <div class="flex gap-2"><button class="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">{{ form.id ? 'บันทึก' : 'เพิ่มช่วงเวลา' }}</button><button v-if="form.id" type="button" @click="reset" class="rounded-lg bg-gray-200 px-4">ยกเลิก</button></div>
    </form>
    <div class="overflow-x-auto rounded-2xl bg-white p-5 shadow-sm"><table class="w-full text-left text-sm"><thead class="border-b text-gray-500"><tr><th class="py-3">ชื่อช่วงเวลา</th><th>วันเริ่มต้น</th><th>วันสิ้นสุด</th><th>จัดการ</th></tr></thead><tbody><tr v-for="p in periods" :key="p.id" class="border-b last:border-0"><td class="py-3">{{ p.name }}</td><td>{{ dateOnly(p.start_date) }}</td><td>{{ dateOnly(p.end_date) }}</td><td class="space-x-3"><button @click="edit(p)" class="text-blue-600">แก้ไข</button><button @click="remove(p.id)" class="text-red-600">ลบ</button></td></tr><tr v-if="!periods.length"><td colspan="4" class="py-6 text-center text-gray-400">ไม่มีข้อมูลช่วงเวลา</td></tr></tbody></table></div>
  </div>
</template>
<script setup>
const api = useApi()
const periods = ref([])
const blank = () => ({ id: null, name: '', start_date: '', end_date: '' })
const form = ref(blank())
const dateOnly = (value) => value ? String(value).slice(0, 10) : '-'
async function load() { const res = await api.get('/period/getall'); periods.value = res.data.data || [] }
function edit(p) { form.value = { id: p.id, name: p.name, start_date: dateOnly(p.start_date), end_date: dateOnly(p.end_date) } }
function reset() { form.value = blank() }
async function save() {
  try {
    if (form.value.start_date > form.value.end_date) return alert('วันเริ่มต้นต้องไม่เกินวันสิ้นสุด')
    const body = { name: form.value.name, start_date: form.value.start_date, end_date: form.value.end_date }
    if (form.value.id) await api.put(`/period/updateperiod/${form.value.id}`, body)
    else await api.post('/period/create', body)
    reset(); await load()
  } catch (err) { alert(err.response?.data?.message || 'บันทึกไม่สำเร็จ') }
}
async function remove(id) {
  if (!confirm('ต้องการลบช่วงเวลานี้หรือไม่?')) return
  try { await api.delete(`/period/remove/${id}`); await load() } catch (err) { alert(err.response?.data?.message || 'ลบไม่สำเร็จ') }
}
onMounted(load)
</script>
