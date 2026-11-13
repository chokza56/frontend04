<template>
    <div class="flex items-center justify-center me-20 mt-15">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <form @submit.prevent="register">
                <h1 class="text-2xl font-bold text-gray-600 text-center">เพิ่มกรรมการและผู้รับการประเมิน</h1>

                <div class="mt-3">
                    <label class="text-gray-600">ชื่อ</label>
                    <input type="text" placeholder="กรอกชื่อ.." v-model="username" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">รหัสผ่าน</label>
                    <input type="password" placeholder="กรอกรหัส.." v-model="password" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">ชื่อจริง</label>
                    <input type="text" placeholder="กรอกชื่อจริง.." v-model="fullname" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">อีเมล</label>
                    <input type="email" placeholder="กรอกอีเมล.." v-model="email" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">เงินเดือน</label>
                    <input type="number" min="0" placeholder="กรอกเงินเดือน.." v-model="salary" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">เลขบัตรประชาชน</label>
                    <input type="text" inputmode="numeric" maxlength="13" pattern="\d{13}"
                        title="ต้องเป็นตัวเลข 13 หลัก" placeholder="กรอกเลข 13 หลัก.."
                        v-model="czid" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">วิทยฐานะ</label>
                    <select v-model="level" class="input" required>
                        <option :value="1">ไม่มี</option>
                        <option :value="2">ชำนาญการ</option>
                        <option :value="3">ชำนาญการพิเศษ</option>
                        <option :value="4">เชี่ยวชาญ</option>
                        <option :value="5">เชี่ยวชาญพิเศษ</option>
                    </select>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">แผนก</label>
                    <select v-model="department" class="input" required>
                        <option :value="1">ไม่มี</option>
                        <option :value="2">การตลาด</option>
                        <option :value="3">เทคโนโลยีสารสนเทศ</option>
                        <option :value="4">บัญชี</option>
                    </select>
                </div>
                <div>
                    <label class="text-gray-600">บทบาท</label>
                    <select v-model="role" class="input" required>
                        <option value="1">ไม่มี</option>
                        <option value="judge">กรรมการ</option>
                        <option value="user">ผู้รับการประเมิน</option>
                    </select>
                </div>
                <button class="w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 p-3 mt-6" type="submit">register</button>
                <div class="mt-2">
                    <!-- <nuxt-link to="/" class="text-sm hover:text-blue-600 font-semibold text-gray-600">login</nuxt-link> -->
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const api = useApi()

const username = ref('')
const password = ref('')
const fullname = ref('')
const email = ref('')
const salary = ref('')
const level = ref('')
const department = ref('')
const czid = ref('')
const role = ref('')


const register = async () => {
    try {
        const res = await api.post('auth/register', {
            username: username.value,
            password: password.value,
            fullname: fullname.value,
            salary: salary.value,
            czid: czid.value,
            level: level.value,
            department: department.value,
            role:role.value,
            email: email.value
        })
        alert(res.data.message)
        await navigateTo('/')
    } catch (err) {
        console.log(err)
        alert(err.response?.data?.message)
    }
}
</script>