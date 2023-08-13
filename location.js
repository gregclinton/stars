function getGeoLocation(fn) {
    if (DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission().then(() => {
            navigator.geolocation.getCurrentPosition(position => {
                fn(position.coords.latitude, position.coords.longitude);
            })
        });
    } else {
        fn(34, -117);
    }
}