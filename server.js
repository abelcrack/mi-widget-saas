const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/widget', express.static(path.join(__dirname, 'widget')));

app.get('/', (req, res) => {
    res.send('🚀 SmartAddress API funcionando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});