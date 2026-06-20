const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

// Path ke file mentah dan output
const rawDataPath = path.join(__dirname, '../medical-data.raw.js');
const outputPath = path.join(__dirname, '../src/data/medical-data.encrypted.js');

if (!fs.existsSync(rawDataPath)) {
  console.error("❌ File medical-data.raw.js tidak ditemukan!");
  process.exit(1);
}

const rawData = require(rawDataPath);
// Enkripsi menggunakan password
const encrypted = CryptoJS.AES.encrypt(JSON.stringify(rawData), "279381").toString();

const fileContent = `// File ini dihasilkan secara otomatis oleh scripts/encrypt.js. 
// JANGAN letakkan data mentah (plain text) di sini.
export const ENCRYPTED_MEDICAL_DATA = "${encrypted}";
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContent);

console.log("✅ Data medis berhasil dienkripsi dan disimpan ke src/data/medical-data.encrypted.js");
