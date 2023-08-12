let longitude = 0;
let latitude = 0;
let deviceEnabled = false;

const start = 16;
const end = start + 2;

function enableDevice() { return;
    if (!deviceEnabled) {
        DeviceOrientationEvent.requestPermission().then(() => {
            navigator.geolocation.getCurrentPosition(position => {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                deviceEnabled = true;
            })
        });
    }
}

const svgns = "http://www.w3.org/2000/svg";

function line(e, x1, y1, x2, y2, color) {
    const line = document.createElementNS(svgns, 'line');

    line.setAttributeNS(null, 'x1', x1);
    line.setAttributeNS(null, 'y1', y1);
    line.setAttributeNS(null, 'x2', x2);
    line.setAttributeNS(null, 'y2', y2);
    line.setAttributeNS(null, 'stroke', color);
    line.setAttributeNS(null, 'stroke-width', 0.2);
    e.appendChild(line);
    return line;
}

const svg = document.getElementById('stars')
const height = svg.getAttribute('height');
const width = svg.getAttribute('width');
const scale = (x, size, low, high) => size - ((x - low) * size / (high - low));
const raScale = x => scale((x + 360) % 360, width, start * 15, end * 15);
const decScale = x => scale(x, height, -50, 90);

const vline = (e, ra, color) => {
    const x = raScale(ra);
    return line(e, x, 0, x, height, color);
};

const hline = (e, dec, color) => {
    const y = decScale(dec);
    return line(e, 0, y, width, y, color);
};

// draw grid
for (let minute = 0; minute < 1440; minute++) {
    vline(svg, minute * 360 / 1440, '#400').setAttributeNS(null, 'stroke-dasharray', '0.2,0.2');
}

for (let dec = -50; dec < 90; dec++) {
    hline(svg, dec, '#400').setAttributeNS(null, 'stroke-dasharray', '0.2,0.2');;
}

// draw meridian and inclines
const meridian = vline(svg, 0, '#555');
const inclineSouth = hline(svg, 0, '#555');
const inclineNorth = hline(svg, 0, '#555');

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

{
    // https://github.com/JohannesBuchner/libnova/blob/master/src/precession.c

    const jd2000 = 2451545;
    const t = (julianDay() - jd2000) / 36525.0 / 3600;
    const radians = degrees => degrees * Math.PI / 180;
    const zeta = radians(2306.2181 * t + 0.30188 * t ** 2 + 0.017998 * t ** 3);
    const eta = radians(2306.2181 * t + 1.09468 * t ** 2 + 0.041833 * t ** 3);
    const theta = radians(2004.3109 * t - 0.42665 * t ** 2 - 0.041833 * t ** 3);

    function precess(ra, dec) { return [ra, dec];
        const cos = Math.cos;
        const sin = Math.sin;

        const A = cos(radians(dec)) * sin(radians(ra) + zeta);
        const B = cos(theta) * cos(radians(dec)) * cos(radians(ra) + zeta) - sin(theta) * sin(radians(dec));
        const C = sin(theta) * cos(radians(dec)) * cos(radians(ra) + zeta) + cos(theta) * sin(radians(dec));

        const degrees = radians => radians * 180 / Math.PI;
        return [degrees(Math.atan2(A, B) + eta), dec > 88 ? dec : degrees(Math.asin(C))];
    }

    // draw stars
    for (const row of stars.trim().split('\n')) {
        const [ra, dec, mag] = row.trim().split(',');

        if (mag < 5) {
            const dot = document.createElementNS(svgns, 'circle');
            const [raPrecessed, decPrecessed] = precess(ra, dec);

            dot.setAttributeNS(null, 'cx', raScale(raPrecessed));
            dot.setAttributeNS(null, 'cy', decScale(decPrecessed));
            dot.setAttributeNS(null, 'r', [1.8, 1.5, 1.2, 1.0, 0.8, 0.6, 0.4, 0.3, 0.2, 0.1][Math.max(0, Math.floor(parseFloat(mag)))]);
            dot.setAttributeNS(null, 'style', 'stroke: none; fill: #a00');
            svg.appendChild(dot);
        }
    }

    // draw messiers
    for (const messier of messiers.trim().split('\n').map(row => row.trim().split(' '))) {
        const [number, raHour, raMinute, decWhole, decMinute, mag] = messier;

        if (mag < 9) {
            const ra = (parseInt(raHour) + (raMinute / 60)) * 15;
            const dec = parseFloat(decWhole + '.' + ('' + (decMinute / 60)).substring(2));
            const dot = document.createElementNS(svgns, 'circle');
            const [raPrecessed, decPrecessed] = precess(ra, dec);

            dot.setAttributeNS(null, 'cx', raScale(raPrecessed));
            dot.setAttributeNS(null, 'cy',  decScale(decPrecessed));
            dot.setAttributeNS(null, 'r', 0.5);
            dot.setAttributeNS(null, 'style', 'stroke: none; fill: #bb0');
            svg.appendChild(dot);
        }
    }
}

// update meridian
setInterval(() => {
    // http://www.jgiesen.de/astro/astroJS/siderealClock/sidClock.js

    const jd = julianDay() - 2400000.5;
    const jd0 = Math.floor(jd);
    const eph  = (jd0 - 51544.5) / 36525.0;
    const gst =  6.697374558 + 1.0027379093 * (jd - jd0) * 24.0 + (8640184.812866 + (0.093104 - 0.0000062 * eph) * eph) * eph / 3600.0;
    const x = raScale(gst * 15 + longitude);

    meridian.setAttribute('x1', x);
    meridian.setAttribute('x2', x);
}, 1000);

// update inclines
const interval = setInterval(() => {
    if (deviceEnabled) {
        window.addEventListener('deviceorientation', e => {
            const incline = e.beta + (Math.abs(e.beta) < 5 ? 90 : 0);

            const decSouth = incline - (90 - latitude);
            const ySouth = decScale(decSouth);

            inclineSouth.setAttribute('y1', ySouth);
            inclineSouth.setAttribute('y2', ySouth);

            const decNorth = 90 - Math.abs(incline - latitude);
            const yNorth = decScale(decNorth);
            inclineNorth.setAttribute('y1', yNorth);
            inclineNorth.setAttribute('y2', yNorth);
        });

        clearInterval(interval);
    }
}, 1000);

stars = messiers = 0;