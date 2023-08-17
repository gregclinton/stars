stars = {};

function formatTime(t) {
    const pad = n => (n < 10 ? '0' : '') + n;
    const h = t.getHours()

    return [h - (h > 12 ? 12 : 0), pad(t.getMinutes()), pad(t.getSeconds())].join(':');
}

stars.load = function () {
    document.getElementById('allow').remove();
    const bayerLookup = bayer.load();

    getGeoLocation((latitude, longitude) => {
        const now = new Date();
        const today = now.getDate();
        const lst = localSiderealDegrees(now, longitude);
        let stars = [];

        function addStar(name, constellation, mag, ra2000, dec2000) {
            const star = {
                name: name,
                constellation: constellation,
                mag: Math.round(mag * 10) / 10,
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

        hipparcos.data.forEach(row => {
            [hipno, mag, ra, dec] = row.split(',');
            const names =  bayerLookup[hipno];

            if (names) {
                const [name, constellation] = names;

                addStar(name, constellation, mag * 1, ra * 1, dec * 1);
            }
        });

        messiers.forEach(line => {
            const name = line.substring(0, 5);
            const constellation = line.substring(6, 9);
            const mag = line.substring(10, 13);
            const [h, m, s] = line.substring(14, 28).split(' ');
            const chomp = s => s.substring(0, s.length - 1);
            const ra = 15 * (1 * chomp(h) + chomp(m) / 60 + chomp(s) / 3600);
            const [degrees, minutes] = line.substring(29).split(' ');
            const dec = degrees.substring(0, 3) * 1 + minutes.substring(0, 2) / 60;

            addStar(name, constellation, mag, ra, dec);
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
                addTd(star.constellation);
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