let declinationSouth = 0;
let declinationNorth = 0;

const interval = setInterval(() => {
    if (deviceEnabled) {
        window.addEventListener('deviceorientation', e => {
            const incline = e.beta + (Math.abs(e.beta) < 5 ? 90 : 0);

            declinationSouth = incline - (90 - latitude);
            declinationNorth = 90 - Math.abs(incline - latitude);
        });

        clearInterval(interval);
    }
}, 1000);
