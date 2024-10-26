

function getInfo() {
    const busStopIdEl = document.querySelector('#stopId');
    const busStopId = busStopIdEl.value;

    if (busStopId == '') {
        return;
    }

    const stopNameEl = document.querySelector('#stopName');
    const busesUlEl = document.querySelector('#buses');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busStopId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            stopNameEl.textContent = data.name;
            for (const busNumber in data.buses) {
                const arrivalTime = data.buses[busNumber];
                
                let liEl = document.createElement('li');
                liEl.textContent = `Bus ${busNumber} arrives in ${arrivalTime} minutes`;
                busesUlEl.appendChild(liEl);
            }
        })
        .catch(err => stopNameEl.textContent = 'Error');



    //clear the input field and the ul
    busStopIdEl.value = '';
    busesUlEl.textContent = '';
}
