<template>
    <div class="flex items-center justify-center me-20 mt-15">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <div>
                <h1 class="text-2xl font-bold text-gray-600 text-center">register</h1>
            </div>
            <div>
                <label class="text-gray-600">username</label>
                <input type="text" placeholder="กรอกชื่อ.." v-model="username" class="input">
            </div>
            <div>
                <label class="text-gray-600">password</label>
                <input type="password" placeholder="กรอกรหัส.." v-model="password" class="input">
            </div>
            <div>
                <label class="text-gray-600">fullname</label>
                <input type="text" placeholder="กรอกชื่อจริง.." v-model="fullname" class="input">
            </div>
            <div>
                <label class="text-gray-600">email</label>
                <input type="email" placeholder="กรอกอีเมล.." v-model="email" class="input">
            </div>
            <button @click="sub" class="w-full text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 p-3 mt-4">register</button>
            <p v-if="error" class="text-red-500 text-sm text-center mt-4">{{ error }}</p>
                <div class="mt-2">
                    <nuxt-link to="/" class="text-sm hover:text-blue-600 font-semibold text-gray-600">login</nuxt-link>
                </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '~/composables/api'

const api = useApi()

const username = ref('')
const password = ref('')
const fullname = ref('')
const email = ref('')
const error = ref('')

async function sub() {
    error.value = ''

    try {
        const res = await api.post('/auth/register', {
            username: username.value,
            password: password.value,
            fullname: fullname.value,
            email: email.value
        })
        alert('สมัครสำเร็จ')

        username.value = ''
        password.value = ''
        fullname.value = ''
        email.value = ''

    } catch (err) {
        error.value = err.response?.data?.message || 'สมัครไม่สำเร็จ'
    }
}
</script>

<style scoped>
</style>
