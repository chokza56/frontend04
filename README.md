# Frontend - ระบบประเมินบุคลากร

โปรเจกต์นี้ใช้ Nuxt 4, Vue 3, Tailwind CSS 4, Axios และ jwt-decode

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev
```

## ตั้งค่า Backend

แก้ไข `app/composables/api.js` ให้ `baseURL` ชี้ไปยัง IP/Port ของ Backend ที่เครื่อง Frontend เข้าถึงได้ เช่น

```js
baseURL: 'http://192.168.88.178:5000/api/'
```

อย่าใช้ `localhost` หากเปิด Frontend จากอุปกรณ์อื่นในเครือข่าย เพราะ localhost จะหมายถึงเครื่องที่เปิดหน้าเว็บ

## บัญชีและสิทธิ์

- `hr`: จัดการผู้ใช้ หัวข้อ ตัวชี้วัด และช่วงเวลาประเมิน
- `judge`: หน้ากรรมการ
- `user`: ดูหัวข้อ/ตัวชี้วัด แก้ไขข้อมูลส่วนตัว และเปลี่ยนรหัสผ่าน

หน้า Login อ่าน `id`, `username`, `role` จาก JWT ด้วย `jwtDecode` เพื่อเลือกหน้า Dashboard

## ขอบเขต API จาก Backend ที่ได้รับ

Backend มี API สำหรับ auth, users, topics, indicators และ periods แต่ยังไม่มี API สำหรับการมอบหมายงานกรรมการ การส่งแบบประเมิน และการดูผลประเมิน ดังนั้นหน้ากรรมการและหน้าส่งแบบประเมินยังแสดงคำชี้แจงแทนการจำลองข้อมูล

## Backend patch ที่ต้องใช้

ใช้ไฟล์ `router/userrouter.js` และ `controller/usercontroller.js` จากโฟลเดอร์ `backend-patch` ที่แนบแยกมา เพื่อให้ HR จัดการผู้ใช้ได้ และให้ผู้ใช้เปลี่ยนรหัสผ่านโดยยืนยันรหัสผ่านเดิม
"# frontendxxx" 
