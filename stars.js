stars = {};

function formatTime(t) {
    const pad = n => (n < 10 ? '0' : '') + n;
    const h = t.getHours()

    return [h - (h > 12 ? 12 : 0), pad(t.getMinutes()), pad(t.getSeconds())].join(':');
}

function afterdark(t) {
    const today = new Date();
    const isDst = today.getTimezoneOffset() / 60 === 7;
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    /*
        sunsets (all times dst) mar 21: 7:06 jun 21: 8:08 sep 21: 6:52 dec 21: 5:48

        5:48 to 8:08 is 140 minutes
    */
    const sunsetMar21 = new Date([m + 1, d, y].join('/') + ' 7:00');
    const mar21 = new Date([3, 21, y].join('/'))
    const daysSinceMar21 = (today - mar21) / 1000 / 60 / 60 / 24;
    const adjustedMinutes = (140 / 2) * Math.sin(2 * Math.PI * daysSinceMar21 / 365);
    const sunset = new Date(sunsetMar21.getTime() + adjustedMinutes * 60 * 1000);
    const dark = new Date(sunset.getTime() + 30 * 60 * 1000);

    return t > dark;
}

stars.load = function () {
    document.getElementById('allow').remove();

    getGeoLocation((latitude, longitude) => {
        const now = new Date();
        const today = now.getDate();
        const lst = localSiderealDegrees(now, longitude);
        let stars = [];

        function addStar(name, con, mag, ra2000, dec2000) {
            const star = {
                name: name,
                con: con,
                mag: (mag * 1).toFixed(1),
            };
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

                addStar(name, con, mag, ra, dec);
            }
        });

        messiers.forEach(line => {
            const [name, con, ra, dec, mag] = line.split(',');

            addStar(name, con, mag, ra, dec);
        });

        stars.sort((a, b) => a.time - b.time);

        stars.forEach(star => {
            const time = star.time;

            if (afterdark(time) && time.getHours() < 22 && time.getDate() === today) {
                const tr = document.createElement('tr');

                function addTd(value) {
                    const td = document.createElement('td');
                    td.innerHTML = value;
                    tr.appendChild(td);
                }

                addTd(star.name);
                addTd(star.con);
                addTd(star.mag);
                addTd(star.direction);
                addTd(Math.round(star.tilt));
                addTd(formatTime(time));

                document.getElementById('stars').appendChild(tr);
            }
        });
    });

    stars.purge();
};

stars.purge = function() {
    const t = new Date();

    if (afterdark(t) > 17) {
        const time = formatTime(t);
        let keepGoing = true;

        while (keepGoing) {
            const tr = document.getElementById("stars").firstElementChild;
            keepGoing = false;

            if (tr && tr.lastElementChild.innerHTML.substring(0, 5) < time.substring(0, 5)) {
                tr.remove();
                keepGoing = true;
            }
        }
    }
};