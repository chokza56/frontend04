<template>
    <div class="flex bg-gray-400 w-full h-60">
        <div class="flex justify-center items-center text-center text-4xl text-white w-full h-full">
            <h1>ระบบประเมินบุคลากร</h1>
        </div>
    </div>
    <div class="flex items-center justify-center mt-15">
        <form action="" @submit.prevent="login">
            <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <div>
                <h1 class="text-2xl font-bold text-gray-600 text-center">login</h1>
            </div>
            <div class="mt-4">
                <label class="text-gray-600">username</label>
                <input type="text" placeholder="กรอกชื่อ.." v-model="username" class="input" required>
            </div>
            <div class="mt-3">
                <label class="text-gray-600">password</label>
                <input type="password" placeholder="กรอกรหัส.." v-model="password" class="input" required>
            </div>
            <button class="w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 p-3 mt-6" type="submit">login</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

const api = useApi()
const username = ref('')
const password = ref('')

const login = async () => {
    try {
        const res = await api.post('auth/login',{
            username:username.value,
            password:password.value
        })
        const token = res.data.authorization
        localStorage.setItem('token',token)
        localStorage.setItem('username',username.value)
        const decode = jwtDecode(token)
        if(decode.role === 'hr'){
            navigateTo('admin.dashboard')
        }else if(decode.role === 'judge'){
            navigateTo('judge/dashboard')
        }else if(decode.role === 'user'){
            navigateTo('user/dashboard')
        }else{
            console.log(res.data.message)
        }
    }catch(err){
        console.log(err)
        alert(err.response?.data?.message)
    }
}
</script>
<!-- 

import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

const api = useApi()
const username = ref('')
const password = ref('')

const login = async () => {
    try {
        const res = await api.post('auth/login',{
            username:username.value,
            password:password.value
        })
        const token = res.data.authorization
        localStorage.setItem('token',token)
        localStorage.setItem('username',username.value)
        const decode = jwtDecode(token)
        if(decode.role === 'hr'){
            navigateTo('admin.dashboard')
        }else if(decode.role === 'judge'){
            navigateTo('judge/dashboard')
        }else if(decode.role === 'user'){
            navigateTo('user/dashboard')
        }else{
            console.log(res.data.message)
        }
    }catch(err){
        console.log(err)
        alert(err.response?.data?.message)
    }
} -->