<template>
  <div class="min-h-screen bg-slate-100 py-6 px-4">
    <div class="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <h1 class="text-xl font-bold text-slate-800">ประเมินตนเอง</h1>
        <NuxtLink to="/user/dashboard" class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">กลับหน้าแรก</NuxtLink>
      </div>

      <form v-if="item" @submit.prevent="submitEval" class="space-y-5">
        <div class="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <p class="text-base font-semibold text-slate-800">{{ item.name }}</p>
          <p v-if="item.detail" class="mt-1 text-sm text-slate-600">{{ item.detail }}</p>
          <p class="mt-2 text-xs text-slate-500">น้ำหนัก: <span class="font-medium text-slate-700">{{ item.weight }}</span> | ประเภท: <span class="font-medium text-slate-700">{{ item.score_type || '-' }}</span></p>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">คะแนนประเมินตนเอง</label>
          <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <label v-for="opt in scoreOptions" :key="opt.value" class="cursor-pointer rounded-xl border p-3 text-center transition" :class="Number(form.self_score) === opt.value ? 'border-blue-600 bg-blue-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'">
              <input type="radio" :value="opt.value" v-model="form.self_score" required class="sr-only" />
              <div class="text-base font-bold">{{ opt.value }}</div>
              <div class="mt-0.5 text-xs">{{ opt.label }}</div>
            </label>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">ลิงก์หลักฐาน</label>
            <input v-model="form.evidence_url" type="url" placeholder="https://..." class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">ไฟล์หลักฐาน</label>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" @change="onFileChange" class="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm file:mr-2 file:rounded file:border-0 file:bg-slate-100 file:px-2.5 file:py-1 file:text-xs file:font-medium file:text-slate-700 hover:file:bg-slate-200" />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">หมายเหตุหลักฐาน</label>
          <textarea v-model="form.evidence_note" rows="3" placeholder="รายละเอียดหรือหมายเหตุเพิ่มเติม..." class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"></textarea>
        </div>

        <button type="submit" :disabled="submitting" class="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50">{{ submitting ? 'กำลังบันทึก...' : 'ส่งผลการประเมิน' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const api = useApi()
const item = ref(null)
const file = ref(null)
const submitting = ref(false)
const form = ref({ self_score: '', evidence_url: '', evidence_note: '' })

const scoreOptions = [
  { value: 1, label: 'ต่ำกว่าเกณฑ์' },
  { value: 2, label: 'พอใช้' },
  { value: 3, label: 'ดี' },
  { value: 4, label: 'ดีมาก' }
]

onMounted(async () => {
  const res = await api.get('/auth/form')
  const found = (res.data?.data || []).find(x => String(x.indicator_id) === String(route.params.id))
  if (!found) return
  item.value = found
  form.value = { self_score: found.self_score ?? '', evidence_url: found.evidence_url ?? '', evidence_note: found.evidence_note ?? '' }
})

const onFileChange = (e) => { file.value = e.target.files?.[0] || null }

const submitEval = async () => {
  submitting.value = true
  try {
    const fd = new FormData()
    fd.append('indicator_id', String(route.params.id))
    fd.append('self_score', String(form.value.self_score))
    if (form.value.evidence_url) fd.append('evidence_url', form.value.evidence_url)
    if (form.value.evidence_note) fd.append('evidence_note', form.value.evidence_note)
    if (file.value) fd.append('file', file.value)

    await api.post('/evaluatee/answers', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    alert('บันทึกสำเร็จ')
    navigateTo('/user/dashboard')
  } catch (err) {
    alert(err.response?.data?.message || 'บันทึกไม่สำเร็จ')
  } finally {
    submitting.value = false
  }
}
</script>