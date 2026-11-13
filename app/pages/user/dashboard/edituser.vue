<template>
  <div class="mx-auto max-w-lg rounded-xl bg-white p-6 shadow">
    <h2 class="mb-5 text-xl font-semibold text-gray-800">ข้อมูลของฉัน</h2>

    <form v-if="form" @submit.prevent="save" class="space-y-3">
      <div>
        <label class="mb-1 block text-sm text-gray-600">ชื่อผู้ใช้</label>
        <input v-model="form.username" class="input" required>
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">ชื่อ-นามสกุล</label>
        <input v-model="form.fullname" class="input">
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">อีเมล</label>
        <input v-model="form.email" type="email" class="input">
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">เงินเดือน</label>
        <input v-model.number="form.salary" type="number" class="input" required>
      </div>

      <div>
        <label class="mb-1 block text-sm text-gray-600">เลขบัตรประชาชน</label>
        <input
          v-model="form.czid"
          type="text"
          inputmode="numeric"
          maxlength="13"
          class="input"
        >
      </div>
      <div>
        <label class="mb-1 block text-sm text-gray-600">วิทยฐานะ</label>
        <select v-model.number="form.level" class="input" required>
          <option :value="1">ไม่มี</option>
          <option :value="2">ชำนาญการ</option>
          <option :value="3">ชำนาญการพิเศษ</option>
          <option :value="4">เชี่ยวชาญ</option>
          <option :value="5">เชี่ยวชาญพิเศษ</option>
        </select>
      </div>
      <div>
        <label class="mb-1 block text-sm text-gray-600">แผนก</label>
        <select v-model.number="form.department" class="input" required>
          <option :value="1">ไม่มี</option>
          <option :value="2">การตลาด</option>
          <option :value="3">เทคโนโลยีสารสนเทศ</option>
          <option :value="4">บัญชี</option>
        </select>
      </div>
      <!-- <div>
        <label class="mb-1 block text-sm text-gray-600">สิทธิ์ (แก้ไม่ได้)</label>
        <input :value="form.role" disabled class="input bg-gray-100 text-gray-500">
      </div> -->
      <button
        type="submit"
        :disabled="saving"
        class="btn-blue">บันทึก</button>
    </form>
  </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode'

const api = useApi()
const form = ref(null)
const saving = ref(false)
let myId

async function load() {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบ')

    const user = jwtDecode(token)
    myId = user.id ?? user.user_id ?? user.userId ?? user.sub
    if (!myId) throw new Error('ไม่พบ id ของผู้ใช้ใน token')

    const { data } = await api.get(`/user/getbyid/${myId}`)
    const result = data.data ?? data
    form.value = Array.isArray(result) ? result[0] : result
    if (!form.value) throw new Error('ไม่พบข้อมูลผู้ใช้')
  } catch (err) {
    alert(err.response?.data?.message)
  }
}

async function save() {
  if (!form.value || !myId) return

  saving.value = true
  try {
    const { username, fullname, email, salary, czid, level, department } = form.value
    await api.put(`/user/updateuser/${myId}`, {
      username, fullname, email, salary, czid, level, department,
    })
    localStorage.setItem('username', username)
    alert('บันทึกสำเร็จ')
  } catch (err) {
    alert(err.response?.data?.message)
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
// import { jwtDecode } from 'jwt-decode'

// const api = useApi()
// const form = ref(null)
// const saving = ref(false)
// let myId

// async function load() {
//   try {
//     const token = localStorage.getItem('token')
//     if (!token) throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบ')

//     const user = jwtDecode(token)
//     myId = user.id ?? user.user_id ?? user.userId ?? user.sub
//     if (!myId) throw new Error('ไม่พบ id ของผู้ใช้ใน token')

//     const { data } = await api.get(`/user/getbyid/${myId}`)
//     const result = data.data ?? data
//     form.value = Array.isArray(result) ? result[0] : result
//     if (!form.value) throw new Error('ไม่พบข้อมูลผู้ใช้')
//   } catch (err) {
//     alert(err.response?.data?.message)
//   }
// }

// async function save() {
//   if (!form.value || !myId) return

//   saving.value = true
//   try {
//     const { username, fullname, email, salary, czid, level, department } = form.value
//     await api.put(`/user/updateuser/${myId}`, {
//       username, fullname, email, salary, czid, level, department,
//     })
//     localStorage.setItem('username', username)
//     alert('บันทึกสำเร็จ')
//   } catch (err) {
//     alert(err.response?.data?.message)
//   } finally {
//     saving.value = false
//   }
// }

// onMounted(load)