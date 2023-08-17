stars = {};

// from wikipedia epoch 2000 equinox 2000
const data = `
M10   6.6 16h 57m 08.92s -04° 05′
M12   6.7 16h 47m 14.18s -01° 56′
M19   6.8 17h 02m 37.69s -26° 16′
M62   6.5 17h 01m 12.60s -30° 06′
M4    5.6 16h 23m 35.22s -26° 31′
M6    4.2 17h 40m 06.00s -32° 13'
M7    3.3 17h 53m 51.20s -34° 47′
`.trim().split('\n');

function formatTime(t) {
    const pad = n => (n < 10 ? '0' : '') + n;
    const h = t.getHours()

    return [h - (h > 12 ? 12 : 0), pad(t.getMinutes()), pad(t.getSeconds())].join(':');
}

stars.load = function () {
    document.getElementById('allow').remove();
    const names = bayer.load();
    return;

    let bayerData = '';
    
    hipparcos.data.forEach(row => {
        [hipno, mag, ra, dec] = row.split(',');
        const xxx = names[hipno];

        if (xxx) {
            bayerData += [hipno, xxx.letter, xxx.constellation].join(',') + '\n';
        }
    });

    console.log(bayerData);
    return;

    getGeoLocation((latitude, longitude) => {
        const now = new Date();
        const today = now.getDate();
        const lst = localSiderealDegrees(now, longitude);
        let stars = [];

        data.forEach(line => {
            const star = {
                name: line.substring(0, 6),
                mag: line.substring(6, 9),
            };

            const raParts = line.substring(10, 24).split(' ');
            const decParts = line.substring(25).split(' ');
            const chomp = s => s.substring(0, s.length - 1);

            const [ra, dec] = precess(
                15 * (1 * chomp(raParts[0]) + chomp(raParts[1]) / 60 + chomp(raParts[2]) / 3600),
                1 * decParts[0].substring(0, 3) + decParts[1].substring(0, 2) / 60
            );

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