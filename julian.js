function julianDay() {
    // http://www.jgiesen.de/astro/astroJS/siderealClock/sidClock.js

    const dt = new Date();
    let y = dt.getUTCFullYear();
    let m = dt.getUTCMonth() + 1;
    const d = dt.getUTCDate();

    if (m <= 2) {
        m += 12;
        y--;
    }

    const u = dt.getUTCHours() + dt.getUTCMinutes() / 60 + dt.getUTCSeconds() / 3600;

    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d - 13 - 1524.5 + u / 24.0;
}