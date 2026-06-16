(function () {

    function getFieldText(element) {

        return [
            element.id,
            element.name,
            element.placeholder,
            element.getAttribute('aria-label'),
            element.getAttribute('autocomplete'),
            element.getAttribute('data-label')
        ]
            .filter(Boolean)
            .join(' ');
    }

    function detectarCampos() {

        if (!window.SmartAddressFuzzy) {
            console.error('SmartAddress: fuzzy.js no cargado.');
            return {};
        }

        const { detectField } = window.SmartAddressFuzzy;

        const elementos = document.querySelectorAll(
            'input, textarea, select'
        );

        const encontrados = {};

        elementos.forEach((elemento) => {

            const texto = getFieldText(elemento);

            if (!texto.trim()) {
                return;
            }

            const resultado = detectField(texto);

            if (!resultado.type) {
                return;
            }

            const tipo = resultado.type;

            if (
                !encontrados[tipo] ||
                resultado.confidence >
                    encontrados[tipo].confidence
            ) {

                encontrados[tipo] = {
                    element: elemento,
                    confidence: resultado.confidence,
                    source: texto
                };
            }
        });

        return encontrados;
    }

    window.SmartAddressDetector = {
        detectarCampos
    };

})();