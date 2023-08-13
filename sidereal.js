function localSiderealDegrees() {
    // http://www.jgiesen.de/astro/astroJS/siderealClock/sidClock.js

    const jd = julianDay() - 2400000.5;
    const jd0 = Math.floor(jd);
    const eph  = (jd0 - 51544.5) / 36525.0;
    const gst =  6.697374558 + 1.0027379093 * (jd - jd0) * 24.0 + (8640184.812866 + (0.093104 - 0.0000062 * eph) * eph) * eph / 3600.0;

    return (gst * 15 + longitude) % 360;
}