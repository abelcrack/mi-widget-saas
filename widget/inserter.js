(function () {

    function insertarBoton(campoDireccion) {

        if (!campoDireccion) {
            return null;
        }

        if (
            campoDireccion.parentNode.querySelector(
                '.smartaddress-button'
            )
        ) {
            return null;
        }

        const boton = document.createElement('button');

        boton.type = 'button';

        boton.className = 'smartaddress-button';

        boton.textContent =
            '📍 Autocompletar dirección';

        campoDireccion.insertAdjacentElement(
            'afterend',
            boton
        );

        return boton;
    }

    window.SmartAddressInserter = {
        insertarBoton
    };

})();