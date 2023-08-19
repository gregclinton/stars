function getSunset(lat, lon, fn) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const now = new Date();
            const time = JSON.parse(this.responseText).results.sunset;
            const day = [now.getMonth() + 1, now.getDate(), now.getFullYear()].join('/');
            let sunset = new Date([day, time, 'UTC'].join(' '));

            if (time.slice(-2) === 'AM') {
                sunset = new Date(sunset.getTime() + 24 * 60 * 60 * 1000);
            }

            fn(sunset);
        }
    };

    xhttp.open('GET', 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lon, true);
    xhttp.send();
}