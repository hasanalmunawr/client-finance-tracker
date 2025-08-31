<script setup lang="ts">
import type { Payment } from "@/types/models"
import { onMounted, ref } from 'vue'
import { columns } from './columns'
import DataTable from '../dataTable/DataTable.vue'

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    { id: '728ed001', amount: 10230, status: 'pending', email: 'user1@example.com' },
    { id: '728ed002', amount: 5500, status: 'success', email: 'user2@example.com' },
    { id: '728ed003', amount: 7800, status: 'failed', email: 'user3@example.com' },
    { id: '728ed004', amount: 9200, status: 'pending', email: 'user4@example.com' },
    { id: '728ed005', amount: 13400, status: 'success', email: 'user5@example.com' },
    { id: '728ed006', amount: 2400, status: 'failed', email: 'user6@example.com' },
    { id: '728ed007', amount: 8900, status: 'pending', email: 'user7@example.com' },
    { id: '728ed008', amount: 12300, status: 'success', email: 'user8@example.com' },
    { id: '728ed009', amount: 4300, status: 'failed', email: 'user9@example.com' },
    { id: '728ed010', amount: 9900, status: 'pending', email: 'user10@example.com' },
    { id: '728ed011', amount: 8700, status: 'success', email: 'user11@example.com' },
    { id: '728ed012', amount: 2200, status: 'failed', email: 'user12@example.com' },
    { id: '728ed013', amount: 10100, status: 'pending', email: 'user13@example.com' },
    { id: '728ed014', amount: 5500, status: 'success', email: 'user14@example.com' },
    { id: '728ed015', amount: 7600, status: 'failed', email: 'user15@example.com' },
    { id: '728ed016', amount: 9800, status: 'pending', email: 'user16@example.com' },
    { id: '728ed017', amount: 12000, status: 'success', email: 'user17@example.com' },
    { id: '728ed018', amount: 3100, status: 'failed', email: 'user18@example.com' },
    { id: '728ed019', amount: 8900, status: 'pending', email: 'user19@example.com' },
    { id: '728ed020', amount: 15000, status: 'success', email: 'user20@example.com' },
    { id: '728ed021', amount: 4300, status: 'failed', email: 'user21@example.com' },
    { id: '728ed022', amount: 9100, status: 'pending', email: 'user22@example.com' },
    { id: '728ed023', amount: 7700, status: 'success', email: 'user23@example.com' },
    { id: '728ed024', amount: 2600, status: 'failed', email: 'user24@example.com' },
    { id: '728ed025', amount: 11200, status: 'pending', email: 'user25@example.com' },
    { id: '728ed026', amount: 5600, status: 'success', email: 'user26@example.com' },
    { id: '728ed027', amount: 8000, status: 'failed', email: 'user27@example.com' },
    { id: '728ed028', amount: 9400, status: 'pending', email: 'user28@example.com' },
    { id: '728ed029', amount: 13500, status: 'success', email: 'user29@example.com' },
    { id: '728ed030', amount: 2900, status: 'failed', email: 'user30@example.com' },
    { id: '728ed031', amount: 8700, status: 'pending', email: 'user31@example.com' },
    { id: '728ed032', amount: 12500, status: 'success', email: 'user32@example.com' },
    { id: '728ed033', amount: 4800, status: 'failed', email: 'user33@example.com' },
    { id: '728ed034', amount: 10200, status: 'pending', email: 'user34@example.com' },
    { id: '728ed035', amount: 8900, status: 'success', email: 'user35@example.com' },
    { id: '728ed036', amount: 2300, status: 'failed', email: 'user36@example.com' },
    { id: '728ed037', amount: 9500, status: 'pending', email: 'user37@example.com' },
    { id: '728ed038', amount: 13800, status: 'success', email: 'user38@example.com' },
    { id: '728ed039', amount: 3300, status: 'failed', email: 'user39@example.com' },
    { id: '728ed040', amount: 9100, status: 'pending', email: 'user40@example.com' },
    { id: '728ed041', amount: 7800, status: 'success', email: 'user41@example.com' },
    { id: '728ed042', amount: 2400, status: 'failed', email: 'user42@example.com' },
    { id: '728ed043', amount: 11800, status: 'pending', email: 'user43@example.com' },
    { id: '728ed044', amount: 5600, status: 'success', email: 'user44@example.com' },
    { id: '728ed045', amount: 8100, status: 'failed', email: 'user45@example.com' },
    { id: '728ed046', amount: 9700, status: 'pending', email: 'user46@example.com' },
    { id: '728ed047', amount: 12300, status: 'success', email: 'user47@example.com' },
    { id: '728ed048', amount: 3200, status: 'failed', email: 'user48@example.com' },
    { id: '728ed049', amount: 8800, status: 'pending', email: 'user49@example.com' },
    { id: '728ed050', amount: 14200, status: 'success', email: 'user50@example.com' },
    { id: '728ed051', amount: 4500, status: 'failed', email: 'user51@example.com' },
    { id: '728ed052', amount: 9200, status: 'pending', email: 'user52@example.com' },
    { id: '728ed053', amount: 7600, status: 'success', email: 'user53@example.com' },
    { id: '728ed054', amount: 2700, status: 'failed', email: 'user54@example.com' },
    { id: '728ed055', amount: 11000, status: 'pending', email: 'user55@example.com' },
    { id: '728ed056', amount: 5800, status: 'success', email: 'user56@example.com' },
    { id: '728ed057', amount: 8200, status: 'failed', email: 'user57@example.com' },
    { id: '728ed058', amount: 9600, status: 'pending', email: 'user58@example.com' },
    { id: '728ed059', amount: 13000, status: 'success', email: 'user59@example.com' },
    { id: '728ed060', amount: 3000, status: 'failed', email: 'user60@example.com' },
    { id: '728ed061', amount: 8700, status: 'pending', email: 'user61@example.com' },
    { id: '728ed062', amount: 12600, status: 'success', email: 'user62@example.com' },
    { id: '728ed063', amount: 4900, status: 'failed', email: 'user63@example.com' },
    { id: '728ed064', amount: 10100, status: 'pending', email: 'user64@example.com' },
    { id: '728ed065', amount: 8800, status: 'success', email: 'user65@example.com' },
    { id: '728ed066', amount: 2500, status: 'failed', email: 'user66@example.com' },
    { id: '728ed067', amount: 9400, status: 'pending', email: 'user67@example.com' },
    { id: '728ed068', amount: 13700, status: 'success', email: 'user68@example.com' },
    { id: '728ed069', amount: 3400, status: 'failed', email: 'user69@example.com' },
    { id: '728ed070', amount: 9000, status: 'pending', email: 'user70@example.com' },
    { id: '728ed071', amount: 7700, status: 'success', email: 'user71@example.com' },
    { id: '728ed072', amount: 2600, status: 'failed', email: 'user72@example.com' },
    { id: '728ed073', amount: 11900, status: 'pending', email: 'user73@example.com' },
    { id: '728ed074', amount: 5700, status: 'success', email: 'user74@example.com' },
    { id: '728ed075', amount: 8300, status: 'failed', email: 'user75@example.com' },
    { id: '728ed076', amount: 9700, status: 'pending', email: 'user76@example.com' },
    { id: '728ed077', amount: 12400, status: 'success', email: 'user77@example.com' },
    { id: '728ed078', amount: 3100, status: 'failed', email: 'user78@example.com' },
    { id: '728ed079', amount: 8900, status: 'pending', email: 'user79@example.com' },
    { id: '728ed080', amount: 14500, status: 'success', email: 'user80@example.com' },
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
