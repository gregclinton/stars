stars = {};

let southward = true;

function toggleDirection() {
    southward = !southward;
}

const pad = n => (n < 10 ? '0' : '') + n;

function formatTime(t) {
    const h = t.getHours()

    return [h - (h > 12 ? 12 : 0), pad(t.getMinutes())].join(':');
}

function formatRa(ra) {
    const floor = Math.floor;
    const h = floor(ra / 15);
    const m = floor(ra * 4 % 60);
    const s = floor(ra * 240 % 60);

    return [pad(h), pad(m), pad(s)].join(':');
}

stars.load = function () {
    document.getElementById('allow').remove();

    getGeoLocation((latitude, longitude) => {
        const now = new Date();
        const today = now.getDate();
        const lst = localSiderealDegrees(now, longitude);
        let stars = [];

        getSunset(latitude, longitude, sunset => {
            function afterdark(t) {
                const dark = new Date(sunset.getTime() + 30 * 60 * 1000);

                return t > dark;
            }

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
                star.ra = ra;
                star.dec = dec;

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
                    addTd(formatRa(star.ra));
                    addTd(star.dec.toFixed(1));
                    addTd(formatTime(time));

                    document.getElementById('stars').appendChild(tr);
                }
            });

            function put(name, value) {
                document.getElementById(name).innerHTML = value;
            }

            window.addEventListener('deviceorientation', e => {
                const dec = southward ? e.beta - 90 + latitude : 90 - Math.abs(latitude - e.beta);

                put('dec', dec.toFixed(1));
            });

            setInterval(() => put('sid', formatRa(localSiderealDegrees(new Date(), longitude))), 1000);

            function purge() {
                const t = new Date();

                if (afterdark(t)) {
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

            setInterval(() => purge(new Date()), 1000);
        });
    });
};

