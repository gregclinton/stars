function getSunset(lat, lon, fn) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const now = new Date();
            const day = [now.getMonth() + 1, now.getDate(), now.getFullYear()].join('/');
            const time = JSON.parse(this.responseText).results.sunset;

            fn(new Date([day, time, 'UTC'].join(' ')));
        }
    };
    xhttp.open('GET', 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lon, true);
    xhttp.send();    
}
