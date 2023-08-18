stars = {};

function formatTime(t) {
    const pad = n => (n < 10 ? '0' : '') + n;
    const h = t.getHours()

    return [h - (h > 12 ? 12 : 0), pad(t.getMinutes()), pad(t.getSeconds())].join(':');
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

        stars.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);

        stars.forEach(star => {
            const time = star.time;
            const hour = time.getHours();

            if (hour > 17 && hour < 22 && time.getDate() === today) {
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

    if (t.getHours() > 17) {
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