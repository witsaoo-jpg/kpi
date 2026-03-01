// --- Authentication ---
// กำหนดชื่อผู้ใช้และรหัสผ่านสำหรับเข้าระบบ (สามารถแก้ไขได้ตามต้องการ)
const SECRET_USERNAME = "admin";
const SECRET_PASSWORD = "1234";

// --- Data Definitions ---
const wards = [
    "หอผู้ป่วย สก.3", "หอผู้ป่วย สก.4", "หอผู้ป่วย สก.5", "หอผู้ป่วย สก.6",
    "หอผู้ป่วยสงฆ์อาพาธ", "หอผู้ป่วยสงฆ์พิเศษ 2+3", "หอผู้ป่วยสามัญติดเชื้อ ธารน้ำใจ 1",
    "หอผู้ป่วยสามัญติดเชื้อ ธารน้ำใจ 2", "หอผู้ป่วยพิเศษอายุรกรรมชลาทรล่าง",
    "หอผู้ป่วยพิเศษอายุรกรรมชลาทรบน", "หอผู้ป่วย Low Immune ธนจ.4",
    "หอผู้ป่วยชลาทิศ 1", "หอผู้ป่วยชลาทิศ 2", "หอผู้ป่วยชลาทิศ 3", "หอผู้ป่วยชลาทิศ 4",
    "หอผู้ป่วยพิเศษศัลยกรรม ฉ.7", "หอผู้ป่วยพิเศษศัลยกรรม ฉ.8", "หอผู้ป่วยพิเศษศัลยกรรม Ex.9",
    "หอผู้ป่วยแผลไหม้", "หอผู้ป่วยคมีบำบัด", "หอผู้ป่วยหลังคลอด",
    "หอผู้ป่วยนรีเวช ชลารักษ์4", "หอผู้ป่วยพิเศษนรีเวช ชลารักษ์4",
    "หอผู้ป่วยกระดูกชาย", "หอผู้ป่วยศัลยกรรมอุบัติเหตุและกระดูกหญิง",
    "หอผู้ป่วยพิเศษศัลยกรรม Ex.8", "หอผู้ป่วยสามัญ EENT และศัลยกรรมเด็ก ชว.3",
    "หอผู้ป่วยพิเศษ EENT"
];

const indicatorsDB = [
    // Dimension 1
    { id: 101, dim: 1, name: "ร้อยละของตัวชี้วัดวิสัยทัศน์ที่บรรลุเป้าหมาย", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนตัวชี้วัดวิสัยทัศน์ที่บรรลุเป้าหมาย", varB: "จำนวนตัวชี้วัดวิสัยทัศน์ทั้งหมด" },
    { id: 102, dim: 1, name: "ร้อยละของโครงการ/กิจกรรมดำเนินการตามกระบวนการควบคุมภายในที่มีคะแนนความเสี่ยงลดลง", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนโครงการ/กิจกรรมที่มีคะแนนความเสี่ยงลดลง", varB: "จำนวนโครงการ/กิจกรรมทั้งหมด" },
    { id: 103, dim: 1, name: "ร้อยละของบุคลากรพยาบาลที่มีผลการประเมินจริยธรรมจรรยาบรรณวิชาชีพผ่านเกณฑ์ที่กำหนด", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบุคลากรพยาบาลที่ผ่านเกณฑ์", varB: "จำนวนบุคลากรพยาบาลทั้งหมด" },
    
    // Dimension 2
    { id: 201, dim: 2, name: "ผลิตภาพของงานการพยาบาลผู้ป่วยใน (Nursing Productivity)", targetMin: 90, targetMax: 110, targetType: "range", formula: "(A×100)/B", varA: "จำนวนชั่วโมงความต้องการการพยาบาลของผู้ป่วยทั้งหมด", varB: "จำนวนชั่วโมงการปฏิบัติการพยาบาลของพยาบาลทั้งหมด" },
    { id: 202, dim: 2, name: "จำนวนวันนอนเฉลี่ย", target: "ตามบริบทหน่วยงาน", targetType: "value", formula: "A/B", varA: "จำนวนวันนอนรวมของผู้ป่วยที่จำหน่าย", varB: "จำนวนผู้ป่วยที่จำหน่ายทั้งหมด" },
    { id: 203, dim: 2, name: "ร้อยละของบุคลากรพยาบาลที่มีจำนวนชั่วโมงการปฏิบัติงานการพยาบาลเฉลี่ยมากกว่า 60 ชั่วโมงต่อสัปดาห์", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนบุคลากรพยาบาลที่มีชั่วโมงทำงาน > 60 ชม./สัปดาห์", varB: "จำนวนบุคลากรพยาบาลทั้งหมด" },
    { id: 204, dim: 2, name: "ร้อยละของอุบัติการณ์/ความเสี่ยงทางการพยาบาลได้รับการจัดการทันเวลาตามที่กำหนด", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนอุบัติการณ์ที่จัดการทันเวลา", varB: "จำนวนอุบัติการณ์ทั้งหมด" },

    // Dimension 3
    { id: 301, dim: 3, name: "ร้อยละความพึงพอใจของผู้ใช้บริการต่อบริการพยาบาล", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "คะแนนความพึงพอใจจากแบบสอบถามทั้งหมด", varB: "คะแนนเต็มรวมของแบบสอบถามทั้งหมด" },
    { id: 302, dim: 3, name: "ร้อยละความพึงพอใจของผู้มีส่วนได้ส่วนเสียต่อหน่วยงานบริการพยาบาล", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "คะแนนความพึงพอใจจากผู้มีส่วนได้ส่วนเสีย", varB: "คะแนนเต็มรวมของแบบสอบถามทั้งหมด" },
    { id: 303, dim: 3, name: "ร้อยละความไม่พึงพอใจของผู้ใช้บริการต่อบริการพยาบาล", target: 5, targetType: "lt", formula: "(A×100)/B", varA: "จำนวนข้อ/รายการที่ไม่พึงพอใจ", varB: "จำนวนข้อ/รายการทั้งหมด" },
    { id: 304, dim: 3, name: "จำนวนข้อร้องเรียนของผู้ใช้บริการเกี่ยวกับสิทธิหรือการละเมิดสิทธิผู้ใช้บริการ", target: 0, targetType: "eq", formula: "นับจำนวน", varA: "จำนวนข้อร้องเรียน", varB: "-" },
    { id: 305, dim: 3, name: "จำนวนข้อร้องเรียนของผู้ใช้บริการเกี่ยวกับสิทธิหรือการละเมิดสิทธิผู้ใช้บริการกลุ่มเฉพาะ", target: 0, targetType: "eq", formula: "นับจำนวน", varA: "จำนวนข้อร้องเรียน", varB: "-" },
    { id: 306, dim: 3, name: "จำนวนข้อร้องเรียนของผู้ใช้บริการเกี่ยวกับพฤติกรรมบริการของบุคลากรพยาบาล", target: 0, targetType: "eq", formula: "นับจำนวน", varA: "จำนวนข้อร้องเรียน", varB: "-" },
    { id: 307, dim: 3, name: "จำนวนข้อร้องเรียนของผู้ใช้บริการเกี่ยวกับการละเมิดข้อมูลส่วนบุคคล", target: 0, targetType: "eq", formula: "นับจำนวน", varA: "จำนวนข้อร้องเรียน", varB: "-" },
    { id: 308, dim: 3, name: "ร้อยละของการแก้ไขและ/หรือการตอบกลับข้อร้องเรียนของผู้ใช้บริการ", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนข้อร้องเรียนที่แก้ไข/ตอบกลับ", varB: "จำนวนข้อร้องเรียนทั้งหมด" },

    // Dimension 4
    { id: 401, dim: 4, name: "ร้อยละความผูกพันของบุคลากรพยาบาล", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "คะแนนความผูกพันจากแบบประเมิน", varB: "คะแนนเต็มรวมของแบบประเมิน" },
    { id: 402, dim: 4, name: "ร้อยละความพึงพอใจในงานและบรรยากาศองค์กรของบุคลากรพยาบาล", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "คะแนนความพึงพอใจจากแบบประเมิน", varB: "คะแนนเต็มรวมของแบบประเมิน" },
    { id: 403, dim: 4, name: "ร้อยละการโอนย้ายและลาออกของบุคลากรพยาบาล", target: 1, targetType: "lte", formula: "(A×100)/B", varA: "จำนวนบุคลากรที่โอนย้าย/ลาออก", varB: "จำนวนบุคลากรทั้งหมด" },
    { id: 404, dim: 4, name: "ร้อยละของบุคลากรพยาบาลมีสมรรถนะตามบทบาทหน้าที่และสมรรถนะเฉพาะตามเกณฑ์ที่กำหนด", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบุคลากรที่มีสมรรถนะตามเกณฑ์", varB: "จำนวนบุคลากรทั้งหมด" },
    { id: 405, dim: 4, name: "ร้อยละของบุคลากรพยาบาลได้รับการอบรมฟื้นฟูทักษะการช่วยฟื้นคืนชีพขั้นพื้นฐานอย่างน้อย 1 ครั้งต่อปี", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบุคลากรที่อบรม BLS", varB: "จำนวนบุคลากรทั้งหมด" },
    { id: 406, dim: 4, name: "ร้อยละของบุคลากรพยาบาลได้รับการอบรมฟื้นฟูทักษะการช่วยฟื้นคืนชีพขั้นสูงอย่างน้อย 1 ครั้งต่อปี", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบุคลากรที่อบรม ACLS", varB: "จำนวนบุคลากรทั้งหมด" },
    { id: 407, dim: 4, name: "ร้อยละของบุคลากรพยาบาลได้รับการอบรมฟื้นฟูทักษะการป้องกันและควบคุมการติดเชื้อในโรงพยาบาลอย่างน้อย 1 ครั้งต่อปี", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบุคลากรที่อบรม IC", varB: "จำนวนบุคลากรทั้งหมด" },
    { id: 408, dim: 4, name: "ร้อยละของบุคลากรพยาบาลที่ได้รับการตรวจสุขภาพประจำปีและตามความเสี่ยงจากการทำงาน", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบุคลากรที่ตรวจสุขภาพ", varB: "จำนวนบุคลากรทั้งหมด" },
    { id: 409, dim: 4, name: "ร้อยละของบุคลากรพยาบาลที่เจ็บป่วยหรือเกิดอุบัติเหตุจากการปฏิบัติงานได้รับการดูแลตามแนวทางการดูแลรักษา", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบุคลากรที่ได้รับการดูแล", varB: "จำนวนบุคลากรที่เจ็บป่วย/อุบัติเหตุทั้งหมด" },

    // Dimension 5
    { id: 501, dim: 5, name: "ร้อยละของบุคลากรพยาบาลที่ปฏิบัติตามแนวทางปฏิบัติการพยาบาล", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบุคลากรที่ปฏิบัติตามแนวทาง", varB: "จำนวนบุคลากรทั้งหมด" },
    { id: 502, dim: 5, name: "ร้อยละของการบันทึกทางการพยาบาลตามเกณฑ์มาตรฐานการพยาบาลในโรงพยาบาล", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนบันทึกที่ครบถ้วนตามเกณฑ์", varB: "จำนวนบันทึกที่สุ่มประเมินทั้งหมด" },
    { id: 503, dim: 5, name: "ร้อยละของอุบัติการณ์ภัยพิบัติหรือภาวะฉุกเฉินได้รับการจัดการตามกระบวนการที่กำหนด", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนครั้งที่จัดการตามกระบวนการ", varB: "จำนวนครั้งทั้งหมด" },
    { id: 504, dim: 5, name: "ร้อยละของฐานข้อมูลจำเป็นตามมาตรฐานการพยาบาลในโรงพยาบาลที่นำมาใช้ประโยชน์ทางการพยาบาล", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนฐานข้อมูลที่นำมาใช้ประโยชน์", varB: "จำนวนฐานข้อมูลทั้งหมด" },
    { id: 505, dim: 5, name: "ร้อยละขององค์ความรู้และ/หรือนวัตกรรมทางการพยาบาลที่พัฒนาด้วยการจัดการความรู้และนำไปใช้", target: 80, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนองค์ความรู้/นวัตกรรมที่นำไปใช้", varB: "จำนวนองค์ความรู้/นวัตกรรมทั้งหมด" },
    { id: 506, dim: 5, name: "จำนวนอุบัติการณ์ความไม่พร้อมต่อการช่วยชีวิตฉุกเฉิน", target: 0, targetType: "eq", formula: "นับจำนวน", varA: "จำนวนอุบัติการณ์", varB: "-" },
    { id: 507, dim: 5, name: "จำนวนอุบัติการณ์ไม่พึงประสงค์จากการบริหารจัดการยาเสพติดให้โทษประเภท 2", target: 0, targetType: "eq", formula: "นับจำนวน", varA: "จำนวนอุบัติการณ์", varB: "-" },

    // Dimension 6
    { id: 601, dim: 6, name: "ร้อยละของผู้ป่วยที่อยู่ในภาวะคุกคามชีวิตได้รับการแก้ไขทันทีภายใน 4 นาที", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนผู้ป่วยที่แก้ไขภายใน 4 นาที", varB: "จำนวนผู้ป่วยภาวะคุกคามชีวิตทั้งหมด" },
    { id: 602, dim: 6, name: "อัตราการเกิดอาการเปลี่ยนแปลงของผู้ป่วยโดยไม่ได้คาดการณ์", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนผู้ป่วยที่เกิดอาการเปลี่ยนแปลง", varB: "จำนวนผู้ป่วยทั้งหมด" },
    { id: 603, dim: 6, name: "อัตราการเกิดภาวะแทรกซ้อนที่ป้องกันได้", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนผู้ป่วยที่เกิดภาวะแทรกซ้อน", varB: "จำนวนผู้ป่วยทั้งหมด" },
    { id: 604, dim: 6, name: "อัตราการเกิดอุบัติการณ์ไม่พึงประสงค์ระหว่างส่งต่อหรือเคลื่อนย้าย", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนครั้งที่เกิดอุบัติการณ์", varB: "จำนวนครั้งส่งต่อ/เคลื่อนย้ายทั้งหมด" },
    { id: 605, dim: 6, name: "อัตราการกลับเข้ารักษาซ้ำในโรงพยาบาลภายใน 28 วันโดยไม่ได้วางแผน", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนผู้ป่วยที่กลับเข้ารักษาซ้ำ", varB: "จำนวนผู้ป่วยที่จำหน่ายทั้งหมด" },
    { id: 606, dim: 6, name: "ร้อยละของความคลาดเคลื่อนจากการบริหารยา/สารน้ำมีความรุนแรงระดับ E-I", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนความคลาดเคลื่อนระดับ E-I", varB: "จำนวนความคลาดเคลื่อนทั้งหมด (ระดับ A-I)" },
    { id: 607, dim: 6, name: "ร้อยละของความคลาดเคลื่อนจากการให้เลือดมีความรุนแรงระดับ E-I", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนความคลาดเคลื่อนระดับ E-I", varB: "จำนวนความคลาดเคลื่อนทั้งหมด (ระดับ A-I)" },
    { id: 608, dim: 6, name: "จำนวนอุบัติการณ์การระบุตัวผู้ป่วยผิดคน", target: 0, targetType: "eq", formula: "นับจำนวน", varA: "จำนวนอุบัติการณ์", varB: "-" },
    { id: 609, dim: 6, name: "ร้อยละของการพลัดตกหกล้มมีความรุนแรงระดับ E-I", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนการพลัดตกหกล้มระดับ E-I", varB: "จำนวนการพลัดตกหกล้มทั้งหมด (ระดับ A-I)" },
    { id: 610, dim: 6, name: "อัตราการเกิดการบาดเจ็บจากการจัดท่า ผูกยึด หรือการใช้อุปกรณ์และเครื่องมือ", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนผู้ป่วยที่มีการบาดเจ็บ", varB: "จำนวนผู้ป่วยที่มีการผูกยึด/ใช้อุปกรณ์ทั้งหมด" },
    { id: 611, dim: 6, name: "อัตราการเกิดแผลกดทับในโรงพยาบาล", target: 0, targetType: "eq", formula: "(A×100)/B", varA: "จำนวนแผลกดทับใหม่ทั้งหมด", varB: "จำนวนผู้ป่วยกลุ่มเสี่ยงทั้งหมด" },
    { id: 612, dim: 6, name: "อัตราการติดเชื้อในโรงพยาบาล", target: 0, targetType: "eq", formula: "(A×1000)/B", varA: "จำนวนครั้งการติดเชื้อ", varB: "จำนวนวันนอนหรือวันใส่อุปกรณ์ของผู้ป่วยกลุ่มเสี่ยง" },
    { id: 613, dim: 6, name: "ร้อยละของผู้ป่วยหรือญาติที่มีความรู้และทักษะตามแผนจำหน่ายรายบุคคล", target: 100, targetType: "gte", formula: "(A×100)/B", varA: "จำนวนผู้ป่วย/ญาติที่มีความรู้และทักษะ", varB: "จำนวนผู้ป่วยจำหน่ายทั้งหมด" }
];

// --- State Management ---
let records = [];

// URL จาก Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBpnbe9Nb9ti4Ei--IhORGJu6DHX4EEjhIGSu0TvNIuZ_eMTFQEwq3JFxBS_pQeTys/exec';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. ตรวจสอบสถานะการเข้าสู่ระบบ
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const overlay = document.getElementById('login-overlay');
        if(overlay) overlay.style.display = 'none';
    }

    populateWards();
    populateWardFilter();
    
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    document.getElementById('entry-date').value = `${year}-${month}`;
    
    // เรียกฟังก์ชันโหลดข้อมูลจาก Sheets ตอนเปิดหน้าเว็บ
    loadDataFromSheet();
});

// --- Login & Logout Functions ---
function checkLogin() {
    const inputUser = document.getElementById('login-username').value;
    const inputPwd = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error');
    
    if (inputUser === SECRET_USERNAME && inputPwd === SECRET_PASSWORD) {
        // ถ้ารหัสถูก ให้จำไว้ในเครื่อง
        localStorage.setItem('isLoggedIn', 'true');
        
        // ซ่อนหน้าจอ Login อย่างนุ่มนวล
        const overlay = document.getElementById('login-overlay');
        overlay.style.opacity = '0';
        setTimeout(() => { 
            overlay.style.display = 'none'; 
            showToast('เข้าสู่ระบบสำเร็จ', 'success');
        }, 400);
    } else {
        // ถ้าผิด
        errorMsg.style.display = 'block';
        document.getElementById('login-password').value = ''; 
        setTimeout(() => { errorMsg.style.display = 'none'; }, 3000);
    }
}

function handleLoginEnter(event) {
    if (event.key === 'Enter') {
        checkLogin();
    }
}

function logout() {
    if(confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
        localStorage.removeItem('isLoggedIn');
        location.reload(); 
    }
}

// ฟังก์ชันดึงข้อมูลจาก Google Sheets (เพิ่มระบบ Cache ลดความหน่วง)
async function loadDataFromSheet() {
    // 1. ดึงข้อมูลเก่าที่เคยจำไว้ในเครื่อง (Cache) มาแสดงผลทันที (ไม่หน่วง)
    const cachedData = localStorage.getItem('nursingRecordsCache');
    if (cachedData) {
        records = JSON.parse(cachedData);
        updateDashboard();
        if(!document.getElementById('data-list').classList.contains('hidden')) {
            renderTable();
        }
    }

    // 2. แจ้งเตือนสถานะการดึงข้อมูลใหม่
    showToast(cachedData ? 'กำลังซิงค์ข้อมูลล่าสุดจากระบบ...' : 'กำลังโหลดข้อมูลจากฐานข้อมูล...', 'info');
    
    try {
        // 3. แอบวิ่งไปดึงข้อมูลใหม่จาก Google Sheets อยู่เบื้องหลัง
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        
        records = data.map(r => {
            let formattedDate = r.date;
            if (formattedDate && String(formattedDate).includes('T')) {
                const d = new Date(formattedDate);
                formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            }

            return {
                id: parseInt(r.id),
                date: formattedDate,
                ward: r.ward,
                dim: parseInt(r.dim),
                indId: parseInt(r.indId),
                indName: r.indName,
                valA: parseFloat(r.valA),
                valB: parseFloat(r.valB),
                result: parseFloat(r.result),
                isPass: r.isPass === true || r.isPass === 'true',
                notes: r.notes || '',
                formula: indicatorsDB.find(i => i.id == r.indId)?.formula || '',
                targetType: indicatorsDB.find(i => i.id == r.indId)?.targetType || '',
                target: indicatorsDB.find(i => i.id == r.indId)?.target || ''
            };
        });
        
        // 4. เซฟข้อมูลชุดใหม่ล่าสุดลง Cache ทับของเก่า
        localStorage.setItem('nursingRecordsCache', JSON.stringify(records));
        
        // 5. อัปเดตหน้าจอด้วยข้อมูลใหม่
        updateDashboard();
        if(!document.getElementById('data-list').classList.contains('hidden')) {
            renderTable();
        }
        
        showToast(cachedData ? 'อัปเดตข้อมูลล่าสุดเรียบร้อย' : 'โหลดข้อมูลสำเร็จ', 'success');
        
    } catch (error) {
        console.error(error);
        // ถ้าเน็ตหลุด หรือ Sheets มีปัญหา ก็ยังมีข้อมูลเก่าให้ดู
        if (cachedData) {
            showToast('แสดงผลด้วยข้อมูลออฟไลน์ (เชื่อมต่อเซิร์ฟเวอร์ไม่ได้)', 'warning');
        } else {
            showToast('ไม่สามารถเชื่อมต่อฐานข้อมูลได้', 'error');
        }
    }
}

// --- Navigation ---
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const titles = {
        'dashboard': 'ภาพรวมตัวชี้วัด',
        'data-entry': 'บันทึกข้อมูล',
        'data-list': 'รายการข้อมูล',
        'reports': 'รายงานสรุปผล'
    };
    document.getElementById('page-title').textContent = titles[sectionId];

    if(sectionId === 'dashboard') updateDashboard();
    if(sectionId === 'data-list') renderTable();
    if(sectionId === 'data-entry') resetForm();
    if(sectionId === 'reports') generateReport();
}

// --- Core Functions ---
function populateWards() {
    const select = document.getElementById('entry-ward');
    wards.forEach(ward => {
        const option = document.createElement('option');
        option.value = ward;
        option.textContent = ward;
        select.appendChild(option);
    });
}

function populateWardFilter() {
    const select = document.getElementById('filter-ward');
    const reportSelect = document.getElementById('report-ward');
    wards.forEach(ward => {
        const option1 = document.createElement('option');
        option1.value = ward;
        option1.textContent = ward;
        select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = ward;
        option2.textContent = ward;
        reportSelect.appendChild(option2);
    });
}

function loadIndicatorsByDimension() {
    const dim = document.getElementById('entry-dimension').value;
    const indicatorSelect = document.getElementById('entry-indicator');
    indicatorSelect.innerHTML = '<option value="">-- เลือกตัวชี้วัด --</option>';
    indicatorSelect.disabled = !dim;

    if (dim) {
        const filtered = indicatorsDB.filter(i => i.dim == dim);
        filtered.forEach(ind => {
            const option = document.createElement('option');
            option.value = ind.id;
            option.textContent = `${ind.id}. ${ind.name}`;
            indicatorSelect.appendChild(option);
        });
    }
    updateFormulaHint();
}

function updateFormulaHint() {
    const indId = document.getElementById('entry-indicator').value;
    const container = document.getElementById('formula-container');
    const code = document.getElementById('formula-code');
    const variables = document.getElementById('formula-variables');
    const targetDisplay = document.getElementById('target-display');
    
    if (!indId) {
        container.style.display = 'none';
        return;
    }

    const ind = indicatorsDB.find(i => i.id == indId);
    container.style.display = 'block';
    code.textContent = ind.formula;
    
    let varsHtml = '';
    varsHtml += `<p><strong>A =</strong> ${ind.varA}</p>`;
    if (ind.varB !== '-') {
        varsHtml += `<p><strong>B =</strong> ${ind.varB}</p>`;
    }
    variables.innerHTML = varsHtml;

    let targetText = '';
    if (ind.targetType === 'range') {
        targetText = `${ind.targetMin}-${ind.targetMax}%`;
    } else if (ind.targetType === 'eq') {
        targetText = `= ${ind.target}`;
    } else if (ind.targetType === 'gte') {
        targetText = `≥ ${ind.target}%`;
    } else if (ind.targetType === 'lte') {
        targetText = `≤ ${ind.target}%`;
    } else if (ind.targetType === 'lt') {
        targetText = `< ${ind.target}%`;
    } else {
        targetText = ind.target;
    }
    targetDisplay.textContent = `เป้าหมาย: ${targetText}`;

    calculateResult();
}

function calculateResult() {
    const indId = document.getElementById('entry-indicator').value;
    const valA = parseFloat(document.getElementById('val-a').value) || 0;
    const valB = parseFloat(document.getElementById('val-b').value) || 0;
    const resultDisplay = document.getElementById('result-display');

    if (!indId) return;

    const ind = indicatorsDB.find(i => i.id == indId);
    let result = 0;

    if (ind.formula.includes('นับจำนวน')) {
        result = valA;
    } else if (ind.formula.includes('×1000')) {
        result = valB === 0 ? 0 : (valA * 1000) / valB;
    } else if (ind.formula.includes('×100')) {
        result = valB === 0 ? 0 : (valA * 100) / valB;
    } else {
        result = valB === 0 ? 0 : valA / valB;
    }

    const isCount = ind.formula.includes('นับจำนวน');
    resultDisplay.textContent = isCount ? `${result} ครั้ง` : `${result.toFixed(2)}%`;
    resultDisplay.dataset.raw = result;
}

function checkStatus(result, ind) {
    if (ind.targetType === 'gte') return result >= ind.target;
    if (ind.targetType === 'lte') return result <= ind.target;
    if (ind.targetType === 'lt') return result < ind.target;
    if (ind.targetType === 'eq') return result == ind.target;
    if (ind.targetType === 'range') return result >= ind.targetMin && result <= ind.targetMax;
    return true;
}

function getStatusBadge(result, ind) {
    const isPass = checkStatus(result, ind);
    if (isPass) {
        return '<span class="status-badge status-pass"><i class="fas fa-check"></i> ผ่านเกณฑ์</span>';
    } else {
        return '<span class="status-badge status-fail"><i class="fas fa-times"></i> ไม่ผ่านเกณฑ์</span>';
    }
}

function resetForm() {
    document.getElementById('indicator-form').reset();
    document.getElementById('record-id').value = '';
    document.getElementById('result-display').textContent = '0.00%';
    document.getElementById('result-display').dataset.raw = '';
    document.getElementById('entry-indicator').disabled = true;
    document.getElementById('formula-container').style.display = 'none';
    
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    document.getElementById('entry-date').value = `${year}-${month}`;
}

// --- CRUD Operations ---
document.getElementById('indicator-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn.innerHTML;
    
    const id = document.getElementById('record-id').value;
    const date = document.getElementById('entry-date').value;
    const ward = document.getElementById('entry-ward').value;
    const dim = document.getElementById('entry-dimension').value;
    const indId = document.getElementById('entry-indicator').value;
    const valA = parseFloat(document.getElementById('val-a').value);
    const valB = parseFloat(document.getElementById('val-b').value);
    const resultRaw = parseFloat(document.getElementById('result-display').dataset.raw);
    const notes = document.getElementById('entry-notes').value;

    const indData = indicatorsDB.find(i => i.id == indId);
    const isPass = checkStatus(resultRaw, indData);

    let targetText = indData.target;
    if (indData.targetType === 'range') targetText = `${indData.targetMin}-${indData.targetMax}%`;
    else if (indData.targetType === 'gte') targetText = `≥ ${indData.target}%`;
    else if (indData.targetType === 'lte') targetText = `≤ ${indData.target}%`;
    else if (indData.targetType === 'lt') targetText = `< ${indData.target}%`;

    const record = {
        id: id ? parseInt(id) : Date.now(),
        date,
        ward,
        dim,
        indId,
        indName: indData.name,
        targetText,
        valA,
        valB,
        result: resultRaw,
        isPass,
        notes
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังบันทึก...';
    showToast('กำลังบันทึกข้อมูลไปยัง Google Sheets...', 'info');

    try {
        // ดัก Error จาก Redirect ด้วย .catch()
        await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'save', record: record })
        }).catch(err => {
            console.warn('มองข้าม Error จาก Redirect:', err);
        });

        // อัปเดตข้อมูลในระบบ
        if (id) {
            const index = records.findIndex(r => r.id == id);
            if(index !== -1) records[index] = record;
        } else {
            records.push(record);
        }

        resetForm();
        showSection('data-list');
        updateDashboard();
        showToast(id ? 'อัปเดตข้อมูลเรียบร้อยแล้ว' : 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success');
        
    } catch (error) {
        console.error('ข้อผิดพลาดในระบบ:', error);
        showToast('เกิดข้อผิดพลาดในการประมวลผล', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
    }
});

function renderTable() {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = '';
    
    const search = document.getElementById('search-input').value.toLowerCase();
    const filterDim = document.getElementById('filter-dimension').value;
    const filterWard = document.getElementById('filter-ward').value;
    const filterStatus = document.getElementById('filter-status').value;

    const filteredRecords = records.filter(r => {
        const matchSearch = r.ward.toLowerCase().includes(search) || r.indName.toLowerCase().includes(search);
        const matchDim = filterDim === 'all' || r.dim == filterDim;
        const matchWard = filterWard === 'all' || r.ward === filterWard;
        const matchStatus = filterStatus === 'all' || 
            (filterStatus === 'pass' && r.isPass) || 
            (filterStatus === 'fail' && !r.isPass);
        return matchSearch && matchDim && matchWard && matchStatus;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredRecords.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding: 40px; color: #78909c;"><i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 10px;"></i><br>ไม่พบข้อมูล</td></tr>';
        return;
    }

    filteredRecords.forEach(r => {
        const tr = document.createElement('tr');
        const indData = indicatorsDB.find(i => i.id == r.indId);
        let targetDisplay = r.targetText || (indData ? indData.target : '-');
        
        if(!r.targetText && indData) {
            if (indData.targetType === 'range') targetDisplay = `${indData.targetMin}-${indData.targetMax}%`;
            else if (indData.targetType === 'gte') targetDisplay = `≥ ${indData.target}%`;
            else if (indData.targetType === 'lte') targetDisplay = `≤ ${indData.target}%`;
            else if (indData.targetType === 'lt') targetDisplay = `< ${indData.target}%`;
        }

        const isCount = indData ? indData.formula.includes('นับจำนวน') : false;
        
        tr.innerHTML = `
            <td>${r.date}</td>
            <td>${r.ward}</td>
            <td><span class="status-badge" style="background: #e3f2fd; color: #1976d2;">มิติที่ ${r.dim}</span></td>
            <td style="max-width: 300px;">${r.indName}</td>
            <td>${r.valA}</td>
            <td>${r.valB === 0 ? '-' : r.valB}</td>
            <td style="font-weight:bold; color: ${r.isPass ? 'var(--success-color)' : 'var(--danger-color)'}">
                ${isCount ? r.result : r.result.toFixed(2) + '%'}
            </td>
            <td>${targetDisplay}</td>
            <td>${getStatusBadge(r.result, indData || r)}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-view" onclick="viewRecord(${r.id})" title="ดูรายละเอียด"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-edit" onclick="editRecord(${r.id})" title="แก้ไข"><i class="fas fa-pen"></i></button>
                    <button class="btn btn-danger" onclick="deleteRecord(${r.id})" title="ลบ"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewRecord(id) {
    const record = records.find(r => r.id === id);
    if (!record) return;

    const ind = indicatorsDB.find(i => i.id == record.indId);
    let targetText = record.targetText || '';
    if(!targetText && ind) {
        if (ind.targetType === 'range') targetText = `${ind.targetMin}-${ind.targetMax}%`;
        else if (ind.targetType === 'eq') targetText = `= ${ind.target}`;
        else if (ind.targetType === 'gte') targetText = `≥ ${ind.target}%`;
        else if (ind.targetType === 'lte') targetText = `≤ ${ind.target}%`;
        else if (ind.targetType === 'lt') targetText = `< ${ind.target}%`;
        else targetText = ind.target;
    }

    const isCount = ind ? ind.formula.includes('นับจำนวน') : false;
    const statusBadge = getStatusBadge(record.result, ind || record);
    const formulaDisplay = ind ? ind.formula : record.formula || '-';
    const varA_text = ind ? ind.varA : 'ค่า A';
    const varB_text = ind ? ind.varB : 'ค่า B';

    const content = `
        <div style="display: grid; gap: 15px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <label style="color: #78909c; font-size: 0.85rem;">งวดที่บันทึก</label>
                    <div style="font-weight: 600;">${record.date}</div>
                </div>
                <div>
                    <label style="color: #78909c; font-size: 0.85rem;">หอผู้ป่วย</label>
                    <div style="font-weight: 600;">${record.ward}</div>
                </div>
            </div>
            <div>
                <label style="color: #78909c; font-size: 0.85rem;">มิติตัวชี้วัด</label>
                <div style="font-weight: 600;">มิติที่ ${record.dim}</div>
            </div>
            <div>
                <label style="color: #78909c; font-size: 0.85rem;">ชื่อตัวชี้วัด</label>
                <div style="font-weight: 600;">${record.indName}</div>
            </div>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                <label style="color: #78909c; font-size: 0.85rem;">สูตรคำนวณ</label>
                <div style="font-family: monospace; background: white; padding: 10px; border-radius: 6px;">${formulaDisplay}</div>
                <div style="margin-top: 10px; font-size: 0.9rem;">
                    <p><strong>A =</strong> ${varA_text} = ${record.valA}</p>
                    ${varB_text !== '-' ? `<p><strong>B =</strong> ${varB_text} = ${record.valB}</p>` : ''}
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="text-align: center; background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)); color: white; padding: 20px; border-radius: 8px;">
                    <div style="font-size: 0.85rem; opacity: 0.9;">ผลลัพธ์</div>
                    <div style="font-size: 2rem; font-weight: 700;">${isCount ? record.result : record.result.toFixed(2) + '%'}</div>
                </div>
                <div style="text-align: center; background: #f5f5f5; padding: 20px; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #78909c;">เป้าหมาย</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--secondary-color);">${targetText}</div>
                </div>
            </div>
            <div style="text-align: center;">
                ${statusBadge}
            </div>
            ${record.notes ? `
            <div>
                <label style="color: #78909c; font-size: 0.85rem;">หมายเหตุ</label>
                <div style="background: #fff3e0; padding: 15px; border-radius: 8px;">${record.notes}</div>
            </div>
            ` : ''}
        </div>
    `;

    document.getElementById('view-content').innerHTML = content;
    document.getElementById('view-modal').classList.add('active');
}

function editRecord(id) {
    const record = records.find(r => r.id === id);
    if (!record) return;

    showSection('data-entry');
    document.getElementById('record-id').value = record.id;
    document.getElementById('entry-date').value = record.date;
    document.getElementById('entry-ward').value = record.ward;
    document.getElementById('entry-dimension').value = record.dim;
    
    loadIndicatorsByDimension();
    setTimeout(() => {
        document.getElementById('entry-indicator').value = record.indId;
        updateFormulaHint();
        document.getElementById('val-a').value = record.valA;
        document.getElementById('val-b').value = record.valB;
        document.getElementById('entry-notes').value = record.notes || '';
        calculateResult();
    }, 100);
}

async function deleteRecord(id) {
    if(confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
        showToast('กำลังลบข้อมูลจากระบบ...', 'info');
        try {
            // ดัก Error จาก Redirect ด้วย .catch()
            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ action: 'delete', id: id })
            }).catch(err => {
                console.warn('มองข้าม Error จาก Redirect:', err);
            });
            
            records = records.filter(r => r.id !== id);
            renderTable();
            updateDashboard();
            showToast('ลบข้อมูลเรียบร้อยแล้ว', 'success');
        } catch(error) {
            console.error('ข้อผิดพลาดในการลบ:', error);
            showToast('ลบข้อมูลไม่สำเร็จ', 'error');
        }
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// --- Dashboard ---
function updateDashboard() {
    document.getElementById('total-indicators').textContent = indicatorsDB.length;
    
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthRecords = records.filter(r => r.date === currentMonth);
    document.getElementById('records-this-month').textContent = monthRecords.length;

    if (monthRecords.length > 0) {
        let passCount = 0;
        monthRecords.forEach(r => {
            if (r.isPass) passCount++;
        });

        const compliance = Math.round((passCount / monthRecords.length) * 100);
        document.getElementById('avg-compliance').textContent = compliance + '%';
        document.getElementById('below-target').textContent = monthRecords.length - passCount;
    } else {
        document.getElementById('avg-compliance').textContent = '0%';
        document.getElementById('below-target').textContent = '0';
    }

    const container = document.getElementById('dimension-cards-container');
    container.innerHTML = '';
    
    const dims = [
        {id: 1, name: "ผลลัพธ์ด้านการนำองค์กร", color: "#00897b", icon: "fa-flag"},
        {id: 2, name: "ผลลัพธ์ด้านประสิทธิภาพ", color: "#0288d1", icon: "fa-chart-bar"},
        {id: 3, name: "ผลลัพธ์ด้านผู้ใช้บริการ", color: "#fbc02d", icon: "fa-users"},
        {id: 4, name: "ผลลัพธ์ด้านบุคลากร", color: "#7b1fa2", icon: "fa-user-nurse"},
        {id: 5, name: "ผลลัพธ์ด้านระบบงานและกระบวนการสำคัญ", color: "#e64a19", icon: "fa-cogs"},
        {id: 6, name: "ผลลัพธ์ด้านการบริการพยาบาล", color: "#388e3c", icon: "fa-heartbeat"}
    ];

    dims.forEach(d => {
        const count = indicatorsDB.filter(i => i.dim === d.id).length;
        const monthCount = monthRecords.filter(r => r.dim == d.id).length;
        const card = document.createElement('div');
        card.className = 'dimension-card';
        card.style.borderTopColor = d.color;
        card.innerHTML = `
            <h3><i class="fas ${d.icon}" style="color: ${d.color};"></i> ${d.name}</h3>
            <p>มีตัวชี้วัด ${count} ข้อ</p>
            <div class="dimension-stats">
                <div class="stat">
                    <div class="num">${count}</div>
                    <div class="label">ตัวชี้วัด</div>
                </div>
                <div class="stat">
                    <div class="num">${monthCount}</div>
                    <div class="label">บันทึกเดือนนี้</div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Reports ---
function generateReport() {
    const filterDim = document.getElementById('report-dimension').value;
    const filterWard = document.getElementById('report-ward').value;

    let filteredRecords = records;
    if (filterDim !== 'all') {
        filteredRecords = filteredRecords.filter(r => r.dim == filterDim);
    }
    if (filterWard !== 'all') {
        filteredRecords = filteredRecords.filter(r => r.ward === filterWard);
    }

    const content = document.getElementById('report-content');
    
    if (filteredRecords.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #78909c;">
                <i class="fas fa-chart-bar" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <p>ยังไม่มีข้อมูลสำหรับแสดงรายงาน</p>
            </div>
        `;
        return;
    }

    // Group by dimension
    const byDim = {};
    filteredRecords.forEach(r => {
        if (!byDim[r.dim]) byDim[r.dim] = [];
        byDim[r.dim].push(r);
    });

    let html = '<div style="display: grid; gap: 30px;">';
    
    Object.keys(byDim).sort().forEach(dim => {
        const dimRecords = byDim[dim];
        const passCount = dimRecords.filter(r => r.isPass).length;
        const compliance = Math.round((passCount / dimRecords.length) * 100);

        const dimNames = {
            1: "ผลลัพธ์ด้านการนำองค์กร",
            2: "ผลลัพธ์ด้านประสิทธิภาพ",
            3: "ผลลัพธ์ด้านผู้ใช้บริการ",
            4: "ผลลัพธ์ด้านบุคลากร",
            5: "ผลลัพธ์ด้านระบบงานและกระบวนการสำคัญ",
            6: "ผลลัพธ์ด้านการบริการพยาบาล"
        };

        html += `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3 style="color: var(--primary-dark);">มิติที่ ${dim}: ${dimNames[dim]}</h3>
                    <span class="status-badge ${compliance >= 80 ? 'status-pass' : 'status-fail'}">
                        ผ่านเกณฑ์ ${compliance}%
                    </span>
                </div>
                <table style="width: 100%;">
                    <thead>
                        <tr>
                            <th>งวด</th>
                            <th>หอผู้ป่วย</th>
                            <th>ตัวชี้วัด</th>
                            <th>ผลลัพธ์</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        dimRecords.forEach(r => {
            const indData = indicatorsDB.find(i => i.id == r.indId);
            const isCount = indData ? indData.formula.includes('นับจำนวน') : false;
            html += `
                <tr>
                    <td>${r.date}</td>
                    <td>${r.ward}</td>
                    <td>${r.indName}</td>
                    <td style="color: ${r.isPass ? 'var(--success-color)' : 'var(--danger-color)'}; font-weight: 600;">
                        ${isCount ? r.result : r.result.toFixed(2) + '%'}
                    </td>
                    <td>${getStatusBadge(r.result, indData || r)}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    });

    html += '</div>';
    content.innerHTML = html;
}

// --- Export CSV & PDF ---
function exportToCSV() {
    if (records.length === 0) {
        showToast('ไม่มีข้อมูลสำหรับส่งออก', 'error');
        return;
    }

    const headers = ['ID', 'วันที่', 'หอผู้ป่วย', 'มิติ', 'ตัวชี้วัด', 'ค่า A', 'ค่า B', 'ผลลัพธ์', 'เป้าหมาย', 'สถานะ', 'หมายเหตุ'];
    const rows = records.map(r => {
        let targetText = r.targetText || '';
        if(!targetText) {
            const ind = indicatorsDB.find(i => i.id == r.indId);
            if(ind) {
                if (ind.targetType === 'range') targetText = `${ind.targetMin}-${ind.targetMax}%`;
                else if (ind.targetType === 'gte') targetText = `≥ ${ind.target}%`;
                else if (ind.targetType === 'lte') targetText = `≤ ${ind.target}%`;
                else if (ind.targetType === 'lt') targetText = `< ${ind.target}%`;
                else targetText = ind.target;
            }
        }

        return [
            r.id,
            r.date,
            r.ward,
            r.dim,
            `"${r.indName}"`,
            r.valA,
            r.valB,
            r.result.toFixed(2),
            targetText,
            r.isPass ? 'ผ่าน' : 'ไม่ผ่าน',
            `"${r.notes || ''}"`
        ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `nursing_indicators_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    showToast('ส่งออกไฟล์ CSV เรียบร้อยแล้ว', 'success');
}

function downloadPDF() {
    const content = document.getElementById('report-content');
    
    // เช็คก่อนว่ามีข้อมูลรายงานให้แคปไหม
    if (!content.innerHTML.trim() || content.innerHTML.includes('ยังไม่มีข้อมูลสำหรับแสดงรายงาน')) {
        showToast('ไม่มีข้อมูลสำหรับสร้าง PDF', 'error');
        return;
    }

    showToast('กำลังเตรียมสร้างไฟล์ PDF...', 'info');
    
    content.classList.add('pdf-export-mode');

    const wardName = document.getElementById('report-ward').value;
    const fileName = `รายงานตัวชี้วัด_${wardName === 'all' ? 'ภาพรวม' : wardName}_${new Date().toISOString().slice(0,10)}.pdf`;

    const opt = {
        margin:       10, 
        filename:     fileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true }, 
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(content).save().then(() => {
        content.classList.remove('pdf-export-mode');
        showToast('ดาวน์โหลด PDF สำเร็จ!', 'success');
    }).catch(err => {
        console.error(err);
        content.classList.remove('pdf-export-mode');
        showToast('เกิดข้อผิดพลาดในการสร้าง PDF', 'error');
    });
}

// --- Toast Notification ---
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}
