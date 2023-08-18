function getSunset(lat, lon) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open('GET', 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lon, true);
    xhttp.send();    
}
