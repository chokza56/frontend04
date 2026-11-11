<template>
    <div class="flex bg-gray-400 w-full h-60">
        <div class="flex justify-center items-center text-center text-4xl text-white w-full h-full">
            <h1>ระบบประเมินบุคลากร</h1>
        </div>
    </div>

    <div class="flex items-center justify-center mt-15">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <div>
                <h1 class="text-2xl font-bold text-gray-600 text-center">login</h1>
            </div>
            <div class="mt-4">
                <label class="text-gray-600">username</label>
                <input type="text" placeholder="กรอกชื่อ.." v-model="username" class="input">
            </div>
            <div class="mt-3">
                <label class="text-gray-600">password</label>
                <input type="password" placeholder="กรอกรหัส.." v-model="password" class="input">
            </div>
            <button @click="login" class="w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 p-3 mt-6">login</button>
            <p v-if="error" class="text-red-500 text-sm text-center mt-4">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '~/composables/api'

const username = ref('')
const password = ref('')
const error = ref('')

// ฟังก์ชันสำหรับถอดรหัส JWT Token เพื่อดึงข้อมูลข้างใน (เช่น role)
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        return JSON.parse(jsonPayload)
    } catch (e) {
        return null
    }
}

const login = async () => {
    error.value = ''
    try {
        const api = useApi()

        const res = await api.post('/auth/login', {
            username: username.value,
            password: password.value
        })

        const token = res.data.authorization || res.data.token
        
        if (!token) {
            error.value = 'ไม่พบ Token จากระบบ'
            return
        }

        localStorage.setItem('token', token)

        const decoded = parseJwt(token)
        console.log('ข้อมูลใน Token:', decoded)

        localStorage.setItem('username', decoded?.username || username.value)
        const role = decoded?.role

        if (role === 'admin' || role === 'root' || role === 'noob') {
            await navigateTo('/admin/dashboard')
        } else if (role === 'judge') {
            await navigateTo('/judge/dashboard')
        } else if (role === 'user') {
            await navigateTo('/user/dashboard')
        } else {
            error.value = 'ไม่พบค่า role ใน Token ข้อมูลที่ได้คือ: ' + JSON.stringify(decoded)
        }
    } catch (err) {
        console.error(err)
        error.value = err.response?.data?.message || 'username หรือ password ไม่ถูกต้อง'
    }
}
</script>
