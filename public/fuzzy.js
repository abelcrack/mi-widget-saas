const FIELD_DICTIONARY = {
    direccion: [
        "address",
        "direccion",
        "dirección",
        "street",
        "calle",
        "domicilio",
        "addr",
        "addr1",
        "shipping_address",
        "billing_address",
        "delivery_address",
        "address1",
        "address_line_1"
    ],

    ciudad: [
        "city",
        "ciudad",
        "town",
        "municipality",
        "municipio"
    ],

    codigo_postal: [
        "zip",
        "zipcode",
        "zip_code",
        "postal",
        "postcode",
        "codigo_postal",
        "código_postal",
        "cep"
    ],

    referencia: [
        "reference",
        "referencia",
        "indicacion",
        "indicación",
        "landmark",
        "instructions",
        "delivery_note"
    ]
};

function normalize(text = "") {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function detectField(fieldText = "") {
    const normalized = normalize(fieldText);

    let bestMatch = null;
    let bestScore = 0;

    for (const [type, keywords] of Object.entries(FIELD_DICTIONARY)) {
        for (const keyword of keywords) {

            const normalizedKeyword = normalize(keyword);

            if (normalized.includes(normalizedKeyword)) {

                const score = normalizedKeyword.length;

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = type;
                }
            }
        }
    }

    return {
        type: bestMatch,
        confidence: bestScore
    };
}

if (typeof module !== 'undefined') {
    module.exports = {
        FIELD_DICTIONARY,
        normalize,
        detectField
    };
}

if (typeof window !== 'undefined') {
    window.SmartAddressFuzzy = {
        FIELD_DICTIONARY,
        normalize,
        detectField
    };
}