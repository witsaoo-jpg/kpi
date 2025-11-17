/**
 * รหัส Google Sheet ที่จะใช้เก็บข้อมูล
 */
var SHEET_ID = "1o-xvysON--0UER0Uhv2H47QRx4hTvK0ECa-vMX5QdFY";

/**
 * ชื่อของ Sheet (แท็บ) ที่จะใช้
 */
var SHEET_NAME = "CustomerThai";

/**
 * ฟังก์ชันหลักที่จะถูกเรียกเมื่อเปิด Web App
 * ทำหน้าที่แสดงไฟล์ Index.html
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('ระบบจัดการข้อมูลลูกค้า ABC จำกัด');
}

/**
 * [NEW] ฟังก์ชันสำหรับดึงข้อมูลลูกค้าทั้งหมดจาก Google Sheet
 * @returns {Array<Object>} - อาร์เรย์ของออบเจ็กต์ข้อมูลลูกค้า
 */
function getCustomerData() {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return []; // ถ้าไม่มีชีท ก็ส่งค่าว่างกลับไป
    }

    // ดึงข้อมูลทั้งหมด trừแถวหัวข้อ (แถวที่ 1)
    // getRange(startRow, startCol, numRows, numCols)
    // .getLastRow() จะนับแถวทั้งหมด, -1 คือการไม่รวมหัว
    if (sheet.getLastRow() <= 1) {
      return []; // ไม่มีข้อมูล (มีแต่หัว)
    }
    
    var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7); // 7 คอลัมน์ (A-G)
    var values = range.getValues();
    var data = [];

    for (var i = 0; i < values.length; i++) {
      var rowData = values[i];
      // Sheet row number คือ (index + 2) เพราะเราเริ่มดึงจากแถวที่ 2
      var rowNumber = i + 2; 
      
      // ตรวจสอบว่าแถวไม่ว่างเปล่า (อย่างน้อยต้องมีชื่อ)
      if (rowData[1] && rowData[1] !== "") {
        data.push({
          row: rowNumber, // หมายเลขแถวใน Sheet (สำคัญมากสำหรับการแก้ไข)
          timestamp: rowData[0],
          firstName: rowData[1],
          lastName: rowData[2],
          phone: rowData[3],
          email: rowData[4],
          customerType: rowData[5],
          notes: rowData[6]
        });
      }
    }
    return data;
  } catch (e) {
    Logger.log(e.toString());
    return []; // ส่งค่าว่างกลับไปหากเกิดข้อผิดพลาด
  }
}

/**
 * ฟังก์ชันสำหรับเพิ่มข้อมูลลูกค้าลงใน Google Sheet
 * (เหมือนเดิม)
 */
function addCustomerData(formData) {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var headers = ["Timestamp", "ชื่อ", "สกุล", "เบอร์โทร", "อีเมล", "ประเภทลูกค้า", "หมายเหตุ"];
      sheet.appendRow(headers);
    }

    var newRow = [
      new Date(),
      formData.firstName,
      formData.lastName,
      formData.phone,
      formData.email,
      formData.customerType,
      formData.notes
    ];
    sheet.appendRow(newRow);

    return { 
      status: "success", 
      message: "บันทึกข้อมูลลูกค้าใหม่สำเร็จ!" 
    };

  } catch (e) {
    Logger.log(e.toString());
    return { 
      status: "error", 
      message: "เกิดข้อผิดพลาดในการบันทึก: " + e.message 
    };
  }
}

/**
 * [NEW] ฟังก์ชันสำหรับอัปเดตข้อมูลลูกค้าในแถวที่ระบุ
 * @param {Object} request - ออบเจ็กต์ที่มี { row: number, data: Object }
 * @returns {Object} - สถานะความสำเร็จ
 */
function updateCustomerData(request) {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    var rowNumber = request.row;
    var data = request.data;

    // สร้าง array ของข้อมูลที่จะอัปเดต (7 คอลัมน์)
    var newRowValues = [
      new Date(), // อัปเดต Timestamp
      data.firstName,
      data.lastName,
      data.phone,
      data.email,
      data.customerType,
      data.notes
    ];
    
    // อัปเดตข้อมูลในแถวที่ระบุ
    // getRange(row, column, numRows, numColumns)
    var range = sheet.getRange(rowNumber, 1, 1, 7);
    range.setValues([newRowValues]); // setValues ต้องใช้ 2D array

    return { 
      status: "success", 
      message: "อัปเดตข้อมูลสำเร็จ!" 
    };
  } catch (e) {
    Logger.log(e.toString());
    return { 
      status: "error", 
      message: "เกิดข้อผิดพลาดในการอัปเดต: " + e.message 
    };
  }
}

/**
 * [NEW] ฟังก์ชันสำหรับลบข้อมูลลูกค้าในแถวที่ระบุ
 * @param {number} rowNumber - หมายเลขแถวที่จะลบ
 * @returns {Object} - สถานะความสำเร็จ
 */
function deleteCustomerData(rowNumber) {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    sheet.deleteRow(rowNumber);
    
    return { 
      status: "success", 
      message: "ลบข้อมูลสำเร็จ!" 
    };
  } catch (e) {
    Logger.log(e.toString());
    return { 
      status: "error", 
      message: "เกิดข้อผิดพลาดในการลบ: " + e.message 
    };
  }
}
