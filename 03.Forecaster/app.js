

function attachEvents() {
    const getWeatherBtn = document.querySelector('#submit');
    const locationInputEl = document.querySelector('#location');
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    const forecastSectionEl = document.querySelector('#forecast');

    getWeatherBtn.addEventListener('click', () => {
        const locationInput = locationInputEl.value.toLowerCase();

        if (locationInput == '') {
            return;
        }

        let locationCode = '';
        fetch(`${baseUrl}/locations`)
            .then(res => res.json())
            .then(locations => {
                
                locations.forEach(element => {
                    if (element.name.toLowerCase() == locationInput) {
                        locationCode = element.code;
                    }
                });

                if (locationCode == '') {
                    throw new Error("Error");
                };
                
                // make new requests to collect forecast for current and upcoming conditions
                
            })
            .catch((err) => {
                forecastSectionEl.style.display = 'inline-block';
                forecastSectionEl.textContent = err.message;

            });

    })
}

attachEvents();