

function attachEvents() {
    const getWeatherBtn = document.querySelector('#submit');
    const locationInputEl = document.querySelector('#location');
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    const forecastSectionEl = document.querySelector('#forecast');

    const conditionSymbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        degrees: '&#176',
    }

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

                //current conditions
                fetch(`${baseUrl}/today/${locationCode}`)
                    .then(res => res.json())
                    .then(data => {
                        const condition = data.forecast.condition

                        forecastSectionEl.style.display = 'block';
                        const currentForecastSectionEl = forecastSectionEl.querySelector('#current');
                        //clear the forecast from previous requests
                        if (currentForecastSectionEl.children.length >= 2) {
                            currentForecastSectionEl.removeChild(currentForecastSectionEl.children[1]);
                        }

                        const forecastsDivEl = document.createElement('div');
                        forecastsDivEl.classList.add('forecasts');
                        forecastsDivEl.textContent = '';

                        const conditionSymbolEl = document.createElement('span');
                        conditionSymbolEl.className = 'condition symbol';

                        conditionSymbolEl.innerHTML = conditionSymbols[condition];
                        forecastsDivEl.appendChild(conditionSymbolEl);

                        //create a span EL containing 3 more span elements containg forecast data
                        const conditionSpanEl = document.createElement('span');
                        conditionSpanEl.classList.add('condition');

                        const locationNameSpanEl = document.createElement('span');
                        locationNameSpanEl.classList.add('forecast-data');
                        locationNameSpanEl.textContent = data.name;
                        conditionSpanEl.appendChild(locationNameSpanEl);

                        const temperatureSpanEl = document.createElement('span');
                        temperatureSpanEl.classList.add('forecast-data');
                        temperatureSpanEl.innerHTML = `${data.forecast.low}${conditionSymbols.degrees}/${data.forecast.high}${conditionSymbols.degrees}`;
                        conditionSpanEl.appendChild(temperatureSpanEl);

                        const weatherConditionSpanEl = document.createElement('span');
                        weatherConditionSpanEl.classList.add('forecast-data');
                        weatherConditionSpanEl.textContent = data.forecast.condition;
                        conditionSpanEl.appendChild(weatherConditionSpanEl);







                        forecastsDivEl.appendChild(conditionSpanEl);
                        currentForecastSectionEl.appendChild(forecastsDivEl);



                    })

                // upcoming conditions
                fetch(`${baseUrl}/upcoming/${locationCode}`)
                    .then(res => res.json())
                    .then(data => {
                        //clear the forecast from previous requests
                        if (document.getElementById('upcoming').children.length >= 2) {
                            document.getElementById('upcoming').removeChild(document.getElementById('upcoming').children[1]);
                        }

                        const forecastInfoEl = createElWithClass('div', 'forecast-info', document.getElementById('upcoming'), )
                         
                        const firstSpan = createElWithClass('span', 'upcoming', forecastInfoEl);
                        createElWithClass('span', 'symbol', firstSpan, conditionSymbols[data.forecast[0].condition]);
                        createElWithClass('span', 'forecast-data', firstSpan, `${data.forecast[0].low}${conditionSymbols.degrees}/${data.forecast[0].high}${conditionSymbols.degrees}` );
                        createElWithClass('span', 'forecast-data', firstSpan, data.forecast[0].condition);

                        const secondSpan =  createElWithClass('span', 'upcoming', forecastInfoEl);
                        createElWithClass('span', 'symbol', secondSpan, conditionSymbols[data.forecast[1].condition]);
                        createElWithClass('span', 'forecast-data', secondSpan, `${data.forecast[1].low}${conditionSymbols.degrees}/${data.forecast[0].high}${conditionSymbols.degrees}` );
                        createElWithClass('span', 'forecast-data', secondSpan, data.forecast[1].condition);

                        const thirdSpan = createElWithClass('span', 'upcoming', forecastInfoEl);
                        createElWithClass('span', 'symbol', thirdSpan, conditionSymbols[data.forecast[2].condition]);
                        createElWithClass('span', 'forecast-data', thirdSpan, `${data.forecast[2].low}${conditionSymbols.degrees}/${data.forecast[0].high}${conditionSymbols.degrees}` );
                        createElWithClass('span', 'forecast-data', thirdSpan, data.forecast[2].condition);

                    })
            })
            .catch((err) => {
                forecastSectionEl.style.display = 'block';
                forecastSectionEl.textContent = err.message;

            });

    })
}

function createElWithClass(element, className, parent, content) {
    let el = document.createElement(element);
    el.classList.add(className);

    if (content) {
        el.innerHTML = content;
    }
    if (parent) {
        parent.appendChild(el);
    }
    return el;
}

attachEvents();