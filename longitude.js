let longitude = -117;
let latitude = 34;

function enableDevice() {
    if (latitude == 0 && DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission().then(() => {
            navigator.geolocation.getCurrentPosition(position => {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
            })
        }).wait();
    }
}