# backend
โฟรเดอร์ server คือ โฟรเดอร์ backend ประกอบด้วยส่วน

ไฟล์ sever.js เป็น ส่วนหลักที่ใช้เป็นศูนย์กลาง
โฟรเดอร์ routes เป็นรูทเชื่อมต่อ ไว้คอยรับคำร้องจากหน้าบ้าน และดึงข้อมูลจากหลังบ้าน แล้วส่งให้หน้าบ้านอีกที ประกอบไปด้วย
    - admin.js เป็นส่วนบริหารการทำงานของหน้าต่าง admin
    - auth.js เก็บฟังชั่นการสมัคสมาชิก และเข้าสู่ระบบ ของ user
    - file.js ทำงานเกี่ยวกับ file เช่น upload download select delete
โฟรเดอร์ models เก็บไฟล์ ร่าง ฐานข้อมูล
โฟรเดอร์ midleware คือ โฟรเดอร์ ที่ไว้เขียน logic การทำงานของฟังชั่นต่างๆ เช่น
    - verfyToken.js เป็นไฟล์ ถอดรหัส token เพื่อยืนยันตัวตอนก่อนจะเข้าทำงานในส่วน routes
โฟรเดอร์ storage เก็บไฟล์รูปภาพต่างๆ

# function
   login and register
    - auth.js
   admin
    - admin.js
   file
    - file.js
    - storage
   secural
    - midleware - verifytoken
    - env
    
# frontend
public เป็นส่วน html การแสดงผลหลัก
src เป็น component แปลง html เป็น jsx เพื่อผสมการทำงาน javascrip แบ่งเป็น ส่วนดังนี้

component ไว้เก็บส่วนหน้าตาแสดงผล
content ไวเก็บไฟล์ css ปรับความสวยงาม
store เก็บ state ตัวแปลทั้งหมด ในระบบ เป็นส่วนกลางเพื่อเรียกใช้ได้ทุกที่
index.js เป็นตัวเชื่อมต่อหลักที่คอยแปลงไฟล์ jsx เป็น html
App.js เป็น main หลักในการ เชื่อมตัวทุกส่วนเข้าด้วยกัน
local.js เก็บ part การเชื่อต่อ port ต่างๆ