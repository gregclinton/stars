stars = {};

let southward = true;

const pad = n => (n < 10 ? '0' : '') + n;
const times = [];

function formatTime(t) {
    const h = t.getHours()

    return [h - (h > 12 ? 12 : 0), pad(t.getMinutes())].join(':');
}

stars.add = function (latitude, longitude, sunset) {
    const dark = new Date(sunset.getTime() + 30 * 60 * 1000);
    const now = new Date();
    const today = now.getDate();
    const lst = localSiderealDegrees(now, longitude);
    let stars = [];

    function addStar(name, con, mag, ra2000, dec2000) {
        const star = { name: name, con: con, mag: mag };
        const [ra, dec] = precess(ra2000, dec2000);

        // https://astronomy.stackexchange.com/questions/29471/how-to-convert-sidereal-time-to-local-time
        function getStarTime(ra) {
            const diff = ra + (lst > ra ? 360 : 0) - lst;

            return new Date(now.getTime() + 240000 * diff / 1.0027379);
        }

        star.time = getStarTime(ra);
        star.direction = dec > latitude ? 'N' : 'S';
        star.tilt = 90 - Math.abs(dec - latitude);

        if (star.time.getDate() !== today && dec + latitude > 90) {
            // star is below polaris and above horizon
            star.time = getStarTime((ra + 180) % 360);
            star.tilt = dec + latitude - 90;
        }
        stars.push(star);
    }

    const bayerLookup = bayer.load();

    hipparcos.data.forEach(row => {
        [hipno, mag, ra, dec] = row.split(',');
        const names = bayerLookup[hipno];

        if (names) {
            const [name, con] = names;

            addStar(name, con, mag * 1, ra * 1, dec * 1);
        }
    });

    messiers.forEach(line => {
        const [name, con, ra, dec, mag] = line.split(',');

        addStar(name, con, mag * 1, ra * 1, dec * 1);
    });

    stars.sort((a, b) => a.time - b.time);

    stars.forEach(star => {
        const time = star.time;

        if (time > dark && time.getHours() < 22 && time.getDate() === today) {
            let tr = document.createElement('tr');

            function addTd(value) {
                const td = document.createElement('td');
                td.innerHTML = value;
                tr.appendChild(td);
            }

            addTd(star.name);
            addTd(star.con);
            addTd(star.mag.toFixed(1));
            addTd(star.direction);
            addTd(star.tilt.toFixed(1));
            addTd(formatTime(star.time));

            times.push(star.time);

            document.getElementById('stars').appendChild(tr);
        }
    });

    function purge() {
        const t = new Date();

        if (t > dark) {
            const time = formatTime(t).substring(0, 5);
            let keepGoing = true;

            while (keepGoing) {
                const tr = document.getElementById("stars").firstElementChild;
                const e = tr.lastElementChild;
                const td = e.innerHTML.substring(0, 5);

                keepGoing = false;

                if (tr && (td.indexOf(':') !== -1 || td * 1 <= 0) && td < time) {
                    tr.remove();
                    times.shift();
                    keepGoing = true;
                } else {
                    const remaining = Math.floor((times[0] - new Date()) / 1000);

                    if (remaining < 30)  {
                        e.innerHTML = remaining > 0 ? remaining : '';
                    }
                }
            }
        }
    };

    setInterval(() => purge(new Date()), 1000);
};