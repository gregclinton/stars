let longitude = -117;
let latitude = 34;

function enableDevice() {
    if (!deviceEnabled && DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission().then(() => {
            navigator.geolocation.getCurrentPosition(position => {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
            })
        });
    }
}