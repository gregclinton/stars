let longitude = 0;
let latitude = 0;
let deviceEnabled = false;

function enableDevice() {
    if (!deviceEnabled && DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission().then(() => {
            navigator.geolocation.getCurrentPosition(position => {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                deviceEnabled = true;
            })
        });
    }
}