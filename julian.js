function julianDay(localTime) {
    // http://www.jgiesen.de/astro/astroJS/siderealClock/sidClock.js

    let y = localTime.getUTCFullYear();
    let m = localTime.getUTCMonth() + 1;
    const d = localTime.getUTCDate();

    if (m <= 2) {
        m += 12;
        y--;
    }

    const u = localTime.getUTCHours() + localTime.getUTCMinutes() / 60 + localTime.getUTCSeconds() / 3600;

    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d - 13 - 1524.5 + u / 24.0;
}