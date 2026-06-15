(function () {

    async function obtenerUbicacionGPS() {
        return new Promise((resolve, reject) => {

            if (!navigator.geolocation) {
                reject("GPS no soportado");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (pos) => resolve(pos.coords),
                (err) => reject(err),
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }
            );
        });
    }

    async function reverseGeocode(lat, lon) {

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=es`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Error reverse geocoding");
        }

        return await res.json();
    }

    function extraerDireccion(data) {

        const a = data.address || {};

        return {
            calle: [
                a.road,
                a.pedestrian,
                a.footway
            ].filter(Boolean).join(' ') || '',

            numero: a.house_number || '',

            ciudad: a.city || a.town || a.village || '',

            distrito: a.suburb || a.state_district || '',

            provincia: a.state || '',

            codigo_postal: a.postcode || ''
        };
    }

    function rellenar(campos, datos) {

        if (campos.direccion?.element) {
            campos.direccion.element.value =
                `${datos.calle} ${datos.numero}`.trim();
        }

        if (campos.ciudad?.element) {
            campos.ciudad.element.value = datos.ciudad;
        }

        if (campos.codigo_postal?.element) {
            campos.codigo_postal.element.value = datos.codigo_postal;
        }

        if (campos.referencia?.element) {
            campos.referencia.element.value =
                `Ubicación aproximada detectada automáticamente`;
        }
    }

    async function ejecutar(campos) {

        try {

            const coords = await obtenerUbicacionGPS();

            const data = await reverseGeocode(
                coords.latitude,
                coords.longitude
            );

            const direccion = extraerDireccion(data);

            console.log("📍 Dirección detectada:", direccion);

            rellenar(campos, direccion);

            alert("✅ Dirección completada automáticamente");

        } catch (err) {

            console.warn("Error autofill:", err);

            alert("⚠️ No se pudo obtener GPS o dirección");
        }
    }

    window.SmartAddressAutofill = {
        ejecutar
    };

})();