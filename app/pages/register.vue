<template>
    <div class="flex items-center justify-center me-20 mt-15 mb-15">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <form @submit.prevent="register">
                <h1 class="text-2xl font-bold text-gray-600 text-center mb-4">ลงทะเบียนผู้รับการประเมิน</h1>

                <div class="mt-3">
                    <label class="text-gray-600">ชื่อผู้ใช้</label>
                    <input type="text" placeholder="กรอกชื่อผู้ใช้.." v-model="username" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">รหัสผ่าน</label>
                    <input type="password" minlength="6" placeholder="อย่างน้อย 6 ตัวอักษร.." v-model="password" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">ชื่อ-นามสกุล</label>
                    <input type="text" placeholder="กรอกชื่อ-นามสกุล.." v-model="fullname" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">อีเมล</label>
                    <input type="email" placeholder="กรอกอีเมล.." v-model="email" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">เบอร์โทรศัพท์</label>
                    <input type="text" placeholder="กรอกเบอร์โทรศัพท์.." v-model="phone" class="input" required>
                </div>
                <div class="mt-3">
                    <label class="text-gray-600">เลขบัตรประชาชน</label>
                    <input type="text" maxlength="13" placeholder="กรอกเลขบัตรประชาชน.." v-model="czid" class="input" required>
                </div>

                <div class="mt-3">
                    <label class="text-gray-600">เงินเดือน</label>
                    <input type="number" placeholder="กรอกเงินเดือน.." v-model="salary" class="input" required>
                </div>

                <div class="mt-3">
                    <label class="text-gray-600">แผนก</label>
                    <select v-model="department" class="input" required>
                        <option disabled value="">-- เลือกแผนก --</option>
                        <option value="IT">IT</option>
                        <option value="ช่างยนต์">ช่างยนต์</option>
                    </select>
                </div>

                <div class="mt-3">
                    <label class="text-gray-600">ระดับ (Level)</label>
                    <select v-model="level" class="input" required>
                        <option disabled value="">-- เลือกระดับ --</option>
                        <option value="ชำนาญการ">ชำนาญการ</option>
                        <option value="ชำนาญการพิเศษ">ชำนาญการพิเศษ</option>
                        <option value="เชี่ยวชาญ">เชี่ยวชาญ</option>
                        <option value="เชี่ยวชาญพิเศษ">เชี่ยวชาญพิเศษ</option>
                    </select>
                </div>
                
                <button class="w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 p-3 mt-6" type="submit">register</button>
                <div class="mt-2">
                    <nuxt-link to="/" class="text-sm hover:text-blue-600 font-semibold text-gray-600">กลับไปหน้า login</nuxt-link>
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
const phone = ref('')
const czid = ref('')
const department = ref('')
const salary = ref('')
const level = ref('')

const register = async () => {
    try {
        const res = await api.post('auth/register', {
            username: username.value,
            password: password.value,
            fullname: fullname.value,
            email: email.value,
            phone: phone.value,
            czid: czid.value,
            department: department.value,
            salary: salary.value,
            level: level.value
        })
        alert(res.data.message)
        navigateTo('/')
    } catch (err) {
        alert(err.response?.data?.message || err.message)
    }
}
</script>