<template>
    <div class="bg-pink-50 min-h-screen flex flex-col justify-center items-center p-4">
        <h1 class="text-grat-700 text-3xl font-bold text-center mb-5">ระบบประเมิน</h1>
        <form @submit.prevent="login" class="w-full max-w-sm rounded-lg border border-gray-200  space-y-4 p-6 shadow-lg">
            <h1 class="text-center text-gray-700 text-2xl font-bold">login</h1>
            <div>
                <label class="text-gray-600 font-semibold text-sm">username</label>
                <input v-model="username" type="text" placeholder="" class="w-full rounded-lg border p-3">
            </div>
            <div>
                <label class="text-gray-600 font-semibold text-sm">password</label>
                <input v-model="password" type="password" placeholder="" class="w-full rounded-lg border p-3">
            </div>
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg border mt-3">login</button>
            <nuxt-link to="/resgister" class="text-blue-500 ">สมัครสมาชิก</nuxt-link>
        </form>
    </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode'
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const api = useApi()

const login = async () => {
    try {
        const res = await api('/auth/login', {
            username:username.value,
            password:password.value
        })
        const token = res.data.authorization
        const status = res.data.status
        const decode = jwtDecode(token)
        localStorage.setItem('token',token)
        localStorage.setItem('username',username.value)
        if ( status === 0 && decode.role === 'user'){
            return navigateTo('/user/dashboard/editpassword')
        }
         navigateTo(decode.role === 'judge' ? '/judge/dashboard' : '/hr/dashboard')
         alert('yes yes yes')
    } catch (err) {
        console.error(err.response?.data?.message)
        alert('ไม่ทำแม่งแล้ว')
    }
}
</script>
