function getGeoLocation(fn) {
    fn(34, -117); return;
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