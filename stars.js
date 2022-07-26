let longitude = 0;
let latitude = 0;
let deviceEnabled = false;

function enableDevice() {
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

function vline(e, x) {
    return line(e, x, 0)
}

class Scaler {
    constructor(size) {
        this.low = Number.MAX_VALUE;
        this.high = Number.MIN_VALUE;
        this.size = size;
    }

    scale(x) {
        return this.size - ((x - this.low) * this.size / (this.high - this.low));
    }

    scan(x) {
        this.low = Math.min(x, this.low);
        this.high = Math.max(x, this.high);
    }
}

function plot(csvStars, messierFlat) {
    const stars = [];
    const svg = document.getElementById('stars')
    const height = svg.getAttribute('height');
    const width = svg.getAttribute('width');
    const raScaler = new Scaler(width);
    const decScaler = new Scaler(height);

    const vline = (e, ra, color) => {
        const x = raScaler.scale(ra);
        return line(e, x, 0, x, height, color);
    };

    const hline = (e, dec, color) => {
        const y = decScaler.scale(dec);
        return line(e, 0, y, width, y, color);
    };

    for (const row of csvStars.trim().split('\n')) {
        const star = row.trim().split(',');
        const [ra, dec, mag, name] = star;

        raScaler.scan(ra);
        decScaler.scan(dec);
        stars.push(star);
    }

    const messiers = messierFlat.trim().split('\n').map(row => row.trim().split(' '));

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

    // draw stars
    for (const star of stars) {
        const [ra, dec, mag] = star;
        const dot = document.createElementNS(svgns, 'circle');

        dot.setAttributeNS(null, 'cx', raScaler.scale(ra));
        dot.setAttributeNS(null, 'cy',  decScaler.scale(dec));
        dot.setAttributeNS(null, 'r', 1.0);
        dot.setAttributeNS(null, 'style', 'stroke: none; fill: #' +
            (mag < 1 ? 'faa' : mag < 2 ? 'f44' : mag < 3 ? 'f00' : mag < 4 ? 'a00' : mag < 5 ? '800' : mag < 6 ? '600' : '400'));
        svg.appendChild(dot);
    }

    // draw messiers
    for (const messier of messiers) {
        const [number, raHour, raMinute, decWhole, decMinute, mag] = messier;

        if (mag < 9) {
            const ra = (parseInt(raHour) + (raMinute / 60)) * 15;
            const dec = parseFloat(decWhole + '.' + ('' + (decMinute / 60)).substring(2));
            const dot = document.createElementNS(svgns, 'circle');

            dot.setAttributeNS(null, 'cx', raScaler.scale(ra));
            dot.setAttributeNS(null, 'cy',  decScaler.scale(dec));
            dot.setAttributeNS(null, 'r', 0.5);
            dot.setAttributeNS(null, 'style', 'stroke: none; fill: #bb0');
            svg.appendChild(dot);
        }
    }

    // update meridian
    setInterval(() => {
        // http://www.jgiesen.de/astro/astroJS/siderealClock/sidClock.js

        const dt = new Date();
        let y = dt.getUTCFullYear();
        let m = dt.getUTCMonth() + 1;
        const d = dt.getUTCDate();

        if (m <= 2) {
            m += 12;
            y--;
        }

        const floor = Math.floor;
        const u = dt.getUTCHours() + dt.getUTCMinutes() / 60 + dt.getUTCSeconds() / 3600;
        const jd = floor(365.25 * (y + 4716)) + floor(30.6001 * (m + 1)) + d - 13 -1524.5 + u / 24.0 - 2400000.5;
        const jd0 = floor(jd);
        const eph  = (jd0 - 51544.5) / 36525.0;
        const gst =  6.697374558 + 1.0027379093 * (jd - jd0) * 24.0 + (8640184.812866 + (0.093104 - 0.0000062 * eph) * eph) * eph / 3600.0;
        const x = raScaler.scale((gst * 15 + longitude) % 360);

        meridian.setAttribute('x1', x);
        meridian.setAttribute('x2', x);
    }, 1000);

    // update inclines
    const interval = setInterval(() => {
        if (deviceEnabled) {
            window.addEventListener('deviceorientation', e => {
                const incline = e.beta + (Math.abs(e.beta) < 5 ? 90 : 0);

                const decSouth = incline - (90 - latitude);
                const ySouth = decScaler.scale(decSouth);

                inclineSouth.setAttribute('y1', ySouth);
                inclineSouth.setAttribute('y2', ySouth);

                const decNorth = 90 - Math.abs(incline - latitude);
                const yNorth = decScaler.scale(decNorth);
                inclineNorth.setAttribute('y1', yNorth);
                inclineNorth.setAttribute('y2', yNorth);
            });

            clearInterval(interval);
        }
    }, 1000);
}

plot(stars, messiers);

stars = messiers = 0;