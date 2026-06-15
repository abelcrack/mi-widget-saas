const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'smartaddress.db');
const db = new Database(dbPath);

console.log('📦 Inicializando SmartAddress...');

db.exec(`
CREATE TABLE IF NOT EXISTS FieldPatterns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    field_pattern TEXT NOT NULL,
    meaning TEXT NOT NULL,
    occurrences INTEGER DEFAULT 1,
    confidence REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS DomainMappings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT NOT NULL,
    field_name TEXT NOT NULL,
    field_type TEXT NOT NULL,
    confidence REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS GeoStats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zone TEXT NOT NULL,
    average_accuracy REAL DEFAULT 0,
    gps_success INTEGER DEFAULT 0,
    gps_fail INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS AddressNormalizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    input_text TEXT NOT NULL,
    normalized_text TEXT NOT NULL,
    country TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

console.log('✅ Base de datos creada correctamente.');
console.log('📍 Tablas creadas:');
console.log('- FieldPatterns');
console.log('- DomainMappings');
console.log('- GeoStats');
console.log('- AddressNormalizations');

db.close();