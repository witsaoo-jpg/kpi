# 🏥 ระบบจัดการตัวชี้วัดคุณภาพการพยาบาลผู้ป่วยใน 6 มิติ (Nursing Quality Indicators Management System)

ระบบเว็บแอปพลิเคชันสำหรับบันทึก ติดตาม และวิเคราะห์ผลลัพธ์ตัวชี้วัดทางการพยาบาลทั้ง 6 มิติ ออกแบบมาเพื่อลดภาระงานเอกสาร ช่วยให้พยาบาลระดับปฏิบัติการและผู้บริหารหอผู้ป่วยสามารถเห็นภาพรวมของคุณภาพการดูแลผู้ป่วยได้อย่างรวดเร็ว ถูกต้อง และนำข้อมูลไปใช้พัฒนาคุณภาพบริการ (CQI) ได้อย่างมีประสิทธิภาพ

## ✨ ฟีเจอร์หลัก (Key Features)

- **📊 Interactive Dashboard:** แดชบอร์ดสรุปผลภาพรวมตัวชี้วัดแบบ Real-time พร้อมกราฟวิเคราะห์ข้อมูล (Chart.js) และแถบความคืบหน้า (Progress Bar)
- **🔍 Smart Data Filter:** ระบบตัวกรองข้อมูลบนแดชบอร์ด สามารถเลือกดูเฉพาะ "เดือน" หรือ "หอผู้ป่วย" ที่ต้องการได้
- **🧮 Auto-Calculation:** ระบบคำนวณผลลัพธ์ตัวชี้วัดให้อัตโนมัติตามสูตร (เช่น A/B × 100) พร้อมประเมินสถานะ "ผ่านเกณฑ์/ไม่ผ่านเกณฑ์" ทันที
- **💾 Google Sheets Integration:** ทำงานแบบ Serverless โดยใช้ Google Sheets เป็นฐานข้อมูลหลัก (ผ่าน Google Apps Script) สะดวกต่อการสำรองข้อมูล
- **⚡ Fast Loading (Caching):** มีระบบ Stale-while-revalidate แคชข้อมูลไว้ในเครื่องชั่วคราว ทำให้หน้าเว็บโหลดกราฟและตารางได้ทันทีโดยไม่ต้องรอโหลดจากเซิร์ฟเวอร์
- **📑 Export & Reports:** รองรับการสร้างรายงานสรุปผลรายมิติ และสามารถส่งออกข้อมูลเป็นไฟล์ **PDF** และ **CSV** ได้
- **🔒 Basic Authentication:** ระบบเข้าสู่ระบบเบื้องต้นเพื่อป้องกันผู้ไม่มีส่วนเกี่ยวข้องเข้าถึงข้อมูล

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ไม่ใช้ Framework เพื่อความรวดเร็วและดูแลรักษาง่าย)
- **Backend / Database:** Google Apps Script (GAS) & Google Sheets
- **Libraries:**
  - [Chart.js](https://www.chartjs.org/) - สำหรับสร้างกราฟบน Dashboard
  - [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) - สำหรับแปลงหน้ารายงานเป็นไฟล์ PDF
  - [FontAwesome](https://fontawesome.com/) - ไอคอนประกอบ UI

## 🚀 การติดตั้งและการใช้งาน (Setup & Usage)

### 1. ฝั่งฐานข้อมูล (Google Sheets & Apps Script)
1. สร้างไฟล์ Google Sheets เพื่อใช้เป็นฐานข้อมูล (กำหนดคอลัมน์ให้ตรงกับโค้ด Apps Script)
2. ไปที่ `ส่วนขยาย (Extensions)` > `Apps Script` แล้ววางโค้ดฟังก์ชันสำหรับรับ-ส่งข้อมูล (GET/POST)
3. กด `ทำให้ใช้งานได้ (Deploy)` > `การนำไปใช้งานใหม่ (New deployment)` > เลือกประเภท `เว็บแอป (Web app)`
4. ตั้งค่าสิทธิ์การเข้าถึงเป็น `ทุกคน (Anyone)` แล้วคัดลอก **URL ของเว็บแอป** เก็บไว้

### 2. ฝั่งหน้าเว็บ (Frontend)
1. นำ URL ที่ได้จากขั้นตอนที่ 1 ไปวางในไฟล์ `script.js` ตรงตัวแปร `SCRIPT_URL`
   ```javascript
   const SCRIPT_URL = '[https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec](https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec)';
   ├── index.html       # โครงสร้างหน้าเว็บ (UI), หน้า Login, หน้า Dashboard และ Form
├── style.css        # ไฟล์ปรับแต่งความสวยงาม (Styling), ธีมสี, และ Responsive Design
├── script.js        # โลจิกการทำงาน, การคำนวณ, วาดกราฟ, และเชื่อมต่อ API
└── README.md        # ไฟล์เอกสารอธิบายโปรเจกต์
