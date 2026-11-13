<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div v-for="s in stats" :key="s.label" class="bg-white rounded-2xl shadow p-5">
                <p class="text-gray-500 text-sm">{{ s.label }}</p>
                <p class="text-3xl font-bold mt-2" :class="s.color">{{ s.value }}</p>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow p-5 mt-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">การประเมินล่าสุด</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="text-gray-500 border-b">
                            <th class="py-2">ชื่อบุคลากร</th>
                            <th>ผู้ประเมิน</th>
                            <th>คะแนน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="r in evaluations" :key="r.id" class="border-b">
                            <td class="py-3">{{ r.name }}</td>
                            <td>{{ r.judge }}</td>
                            <td>{{ r.score }}</td>
                        </tr>
                        <tr v-if="evaluations.length === 0">
                            <td colspan="3" class="py-6 text-center text-gray-400">ไม่มีข้อมูล</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
const api = useApi()

const personnel = ref([])
const judge = ref([])
const evaluations = ref([])

const toArray = (res) => {
    const d = res.data
    return Array.isArray(d) ? d : (d?.data ?? d?.rows ?? [])
}

const load = async (path, target) => {
    try {
        const res = await api.get(path)
        target.value = toArray(res)
        console.log(path, target.value)
    } catch (err) {
        console.log('โหลดไม่สำเร็จ:', path, err.response?.status, err.message)
    }
}

onMounted(async () => {
    await Promise.all([
        load('/personnel', personnel),
        load('/judge', judge),
        load('/evaluations', evaluations),
    ])
})

const stats = computed(() => [
    { label: 'บุคลากรทั้งหมด', value: personnel.value.length, color: 'text-gray-600' },
    { label: 'ประเมินแล้ว', value: evaluations.value.length, color: 'text-gray-600' },
    { label: 'รอประเมิน', value: Math.max(personnel.value.length - evaluations.value.length, 0), color: 'text-gray-600' },
    { label: 'ผู้ประเมิน', value: judge.value.length, color: 'text-gray-600' },
])
</script>