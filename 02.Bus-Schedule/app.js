

function solve() {
    const departButton = document.querySelector('#depart');
    const arriveButton = document.querySelector('#arrive');
    const infoBoxSpanEl = document.querySelector('#info span');

    let currentStopName = 'Depot' // default value, will be changed dynamically
    let currentStopId = 'depot'; // default value, will be changed dynamically
    let nextStopId = '';

    
    function depart() {
        
        
        
        // get data
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStopId}`)
        .then(response => response.json())
        .then(data => {
            //we change the text in the info box 
            infoBoxSpanEl.textContent = `Next stop ${data.name}`;
            departButton.disabled = true;
            arriveButton.disabled = false;
            // set the busStopId to the next stop
            currentStopId = data.next;
            currentStopName = data.name;
            
        })
    }

    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;
        infoBoxSpanEl.textContent = `Arriving at ${currentStopName}`
        
    }

    return {
        depart,
        arrive
    };
}

let result = solve();