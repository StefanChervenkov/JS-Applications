

document.querySelector('.get-info').addEventListener('click', () => {
    const container = document.querySelector('.info-container');

    fetch('https://restcountries.com/v3.1/name/bulgaria')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            container.innerHTML = `
            Country: ${country.name.official} <br>
            Currency: ${country.currencies.BGN.name} <br>
            Currency Symbol: ${country.currencies.BGN.symbol} <br>
            Population: ${country.population}
        `;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            container.textContent = 'Error fetching country information';
        })
})









