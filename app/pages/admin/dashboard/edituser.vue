<template>
  <div class="space-y-6">
    <div><h1 class="text-2xl font-bold text-gray-800">จัดการผู้ใช้</h1><p class="mt-1 text-sm text-gray-500">เพิ่ม แก้ไข และลบบัญชีผู้ใช้</p></div>
    <form @submit.prevent="save" class="grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2">
      <div><label class="mb-1 block text-sm text-gray-600">ชื่อผู้ใช้</label><input v-model="form.username" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">ชื่อ-นามสกุล</label><input v-model="form.fullname" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">อีเมล</label><input v-model="form.email" type="email" class="input" required></div>
      <div><label class="mb-1 block text-sm text-gray-600">บทบาท</label><select v-model="form.role" class="input"><option value="user">ผู้รับการประเมิน</option><option value="judge">กรรมการ</option><option value="hr">ผู้ดูแลระบบ</option></select></div>
      <div v-if="!form.user_id"><label class="mb-1 block text-sm text-gray-600">รหัสผ่าน</label><input v-model="form.password" type="password" class="input" :required="!form.user_id"></div>
      <div class="flex items-end gap-2"><button class="btn-blue" type="submit">{{ form.user_id ? 'บันทึกการแก้ไข' : 'เพิ่มผู้ใช้' }}</button><button v-if="form.user_id" type="button" @click="reset" class="rounded-lg bg-gray-200 px-4 py-3 text-gray-700 hover:bg-gray-300">ยกเลิก</button></div>
    </form>
    <div class="overflow-x-auto rounded-2xl bg-white p-5 shadow-sm">
      <table class="w-full text-left text-sm"><thead class="border-b text-gray-500"><tr><th class="py-3">ชื่อผู้ใช้</th><th>ชื่อ-นามสกุล</th><th>อีเมล</th><th>บทบาท</th><th>จัดการ</th></tr></thead>
        <tbody><tr v-for="u in users" :key="u.user_id" class="border-b last:border-0"><td class="py-3">{{ u.username }}</td><td>{{ u.fullname }}</td><td>{{ u.email }}</td><td>{{ roleName(u.role) }}</td><td class="space-x-2 whitespace-nowrap"><button @click="edit(u)" class="font-medium text-blue-600">แก้ไข</button><button @click="remove(u.user_id)" class="font-medium text-red-600">ลบ</button></td></tr><tr v-if="!users.length"><td colspan="5" class="py-6 text-center text-gray-400">ไม่มีข้อมูลผู้ใช้</td></tr></tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
const api = useApi()
const users = ref([])
const emptyForm = () => ({ user_id: null, username: '', fullname: '', email: '', role: 'user', password: '' })
const form = ref(emptyForm())
const roleName = (role) => ({ hr: 'ผู้ดูแลระบบ', judge: 'กรรมการ', user: 'ผู้รับการประเมิน' }[role] || role)
async function load() { const res = await api.get('/user/getall'); users.value = res.data.data || [] }
function edit(user) { form.value = { ...user, password: '' } }
function reset() { form.value = emptyForm() }
async function save() {
  try {
    if (form.value.user_id) {
      await api.put(`/user/updateuser/${form.value.user_id}`, { username: form.value.username, fullname: form.value.fullname, email: form.value.email, role: form.value.role })
    } else {
      await api.post('/user/create', { username: form.value.username, fullname: form.value.fullname, email: form.value.email, role: form.value.role, password: form.value.password })
    }
    alert('บันทึกสำเร็จ'); reset(); await load()
  } catch (err) { alert(err.response?.data?.message || 'บันทึกไม่สำเร็จ') }
}
async function remove(id) {
  if (!confirm('ต้องการลบผู้ใช้นี้หรือไม่?')) return
  try { await api.delete(`/user/remove/${id}`); await load() } catch (err) { alert(err.response?.data?.message || 'ลบไม่สำเร็จ') }
}
onMounted(load)
</script>
