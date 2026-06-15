const { detectField } = require('../widget/fuzzy');

const tests = [
    "shipping_address",
    "zip_code",
    "recipient_name",
    "telefono_cliente",
    "delivery_note",
    "urbanizacion",
    "district"
];

tests.forEach(test => {
    console.log(test, "→", detectField(test));
});