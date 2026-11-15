<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">ภาพรวมระบบ</h1>
      <p class="mt-1 text-sm text-gray-500">ข้อมูลจากระบบจัดการบุคลากร</p>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div v-for="item in stats" :key="item.label" class="rounded-2xl bg-white p-5 shadow-sm">
        <p class="text-sm text-gray-500">{{ item.label }}</p>
        <p class="mt-2 text-3xl font-bold text-gray-800">{{ item.value }}</p>
      </div>
    </div>
    <div class="mt-6 rounded-2xl bg-white p-5 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-gray-800">ผู้ใช้ในระบบ</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b text-gray-500"><tr><th class="py-3">ชื่อผู้ใช้</th><th>ชื่อ-นามสกุล</th><th>อีเมล</th><th>บทบาท</th></tr></thead>
          <tbody>
            <tr v-for="u in users" :key="u.user_id" class="border-b last:border-0">
              <td class="py-3">{{ u.username }}</td><td>{{ u.fullname }}</td><td>{{ u.email }}</td><td>{{ roleName(u.role) }}</td>
            </tr>
            <tr v-if="!users.length"><td colspan="4" class="py-6 text-center text-gray-400">ยังไม่มีข้อมูล หรือ API ยังไม่ได้รับสิทธิ์</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
const api = useApi()
const users = ref([])
const topics = ref([])
const periods = ref([])
const stats = computed(() => [
  { label: 'ผู้ใช้ทั้งหมด', value: users.value.length },
  { label: 'หัวข้อประเมิน', value: topics.value.length },
  { label: 'ช่วงเวลาประเมิน', value: periods.value.length }
])
const roleName = (role) => ({ hr: 'ผู้ดูแลระบบ', judge: 'กรรมการ', user: 'ผู้รับการประเมิน' }[role] || role)
onMounted(async () => {
  const results = await Promise.allSettled([api.get('/user/getall'), api.get('/topic/getall'), api.get('/period/getall')])
  if (results[0].status === 'fulfilled') users.value = results[0].value.data.data || []
  if (results[1].status === 'fulfilled') topics.value = results[1].value.data.data || []
  if (results[2].status === 'fulfilled') periods.value = results[2].value.data.data || []
})
</script>
