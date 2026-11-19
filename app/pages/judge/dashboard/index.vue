<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
    <h1 class="mb-6 text-xl font-bold text-gray-800">บันทึกผลการประเมิน</h1>

    <form @submit.prevent="submitAssessment" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm text-gray-600">คะแนนประเมิน</label>
        <input v-model="form.score" type="number" placeholder="กรอกคะแนน.." class="input" required />
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">ข้อเสนอแนะ / ความคิดเห็น</label>
        <textarea v-model="form.comment" rows="3" placeholder="กรอกความเห็น.." class="input"></textarea>
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">อัปโหลดรูปภาพลายเซ็น (หลักฐาน)</label>
        <input type="file" @change="handleFileUpload" accept="image/*" class="input p-2" required />
        <p v-if="fileName" class="text-xs text-green-600 mt-1">เลือกไฟล์แล้ว: {{ fileName }}</p>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <NuxtLink to="/judge/dashboard" class="px-4 py-2 bg-gray-300 rounded-lg text-gray-700">ย้อนกลับ</NuxtLink>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">บันทึกการประเมิน</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const api = useApi()

const assessId = route.query.id 

const form = ref({
  score: '',
  comment: '',
  signature: null
})
const fileName = ref('')

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.signature = file
    fileName.value = file.name
  }
}

const submitAssessment = async () => {
  try {
    const formData = new FormData()
    formData.append('score', form.value.score)
    formData.append('comment', form.value.comment)
    if (form.value.signature) {
      formData.append('signature', form.value.signature) // แนบไฟล์รูปภาพลายเซ็น
    }

    await api.post(`/committee/assess/${assessId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    alert('บันทึกผลการประเมินและลายเซ็นสำเร็จ')
    router.push('/judge/dashboard')
  } catch (err) {
    alert(err.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึก')
  }
}
</script>