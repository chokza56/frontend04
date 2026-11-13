<template>
    <div v-if="message" class="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
        {{ message }}
    </div>

    <div v-else class="bg-white rounded-2xl shadow p-5">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-700">ผู้รับการประเมินที่ได้รับมอบหมาย</h3>
            <span class="text-sm text-gray-500">ส่งแบบประเมินแล้ว {{ doneCount }} / {{ rows.length }} คน</span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="text-gray-500 border-b">
                        <th class="py-2">ชื่อผู้รับการประเมิน</th>
                        <th>คะแนนที่กรอก</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in rows" :key="r.id" class="border-b last:border-0">
                        <td class="py-3">{{ r.name }}</td>
                        <td>{{ r.answered }} / {{ r.total }}</td>
                        <td>
                            <span
                                class="px-2 py-1 text-xs rounded"
                                :class="r.done ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
                            >
                                {{ r.done ? 'ส่งแบบประเมินแล้ว' : 'ยังทำไม่ครบ' }}
                            </span>
                        </td>
                        <td class="text-right">
                            <NuxtLink
                                v-if="r.done"
                                :to="`/judge/dashboard/assess?id=${r.id}`"
                                class="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                            >
                                ประเมิน
                            </NuxtLink>
                            <span v-else class="px-4 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed">
                                รอผู้รับการประเมิน
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
const api = useApi()

const PATH = '/assessor/assessments' 

const list = ref([])   


const toArray = (res) => {
    const d = res.data
    return Array.isArray(d) ? d : (d?.data ?? d?.rows ?? [])
}

const rows = computed(() =>
    list.value.map((r) => ({
        id: r.id,
        name: r.assessee_name ?? r.fullname ?? r.name ?? '-',
        answered: r.progress?.answered ?? r.answered ?? 0,
        total: r.progress?.total ?? r.total ?? 0,
        done: (r.status ?? 'draft') !== 'draft',
    }))
)

const doneCount = computed(() => rows.value.filter((r) => r.done).length)

const load = async () => {
    try {
        const res = await api.get(PATH)
        list.value = toArray(res)
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

onMounted(load)
</script>