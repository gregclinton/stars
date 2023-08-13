// https://github.com/JohannesBuchner/libnova/blob/master/src/precession.c

function precess(ra, dec) {
    const jd2000 = 2451545;
    const t = (julianDay(new Date()) - jd2000) / 36525.0 / 3600;
    const radians = degrees => degrees * Math.PI / 180;
    const zeta = radians(2306.2181 * t + 0.30188 * t ** 2 + 0.017998 * t ** 3);
    const eta = radians(2306.2181 * t + 1.09468 * t ** 2 + 0.041833 * t ** 3);
    const theta = radians(2004.3109 * t - 0.42665 * t ** 2 - 0.041833 * t ** 3);

    const cos = Math.cos;
    const sin = Math.sin;

    const A = cos(radians(dec)) * sin(radians(ra) + zeta);
    const B = cos(theta) * cos(radians(dec)) * cos(radians(ra) + zeta) - sin(theta) * sin(radians(dec));
    const C = sin(theta) * cos(radians(dec)) * cos(radians(ra) + zeta) + cos(theta) * sin(radians(dec));

    const degrees = radians => radians * 180 / Math.PI;
    return [(degrees(Math.atan2(A, B) + eta) + 360) % 360, dec > 88 ? dec : degrees(Math.asin(C))];
}