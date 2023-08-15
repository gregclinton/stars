const starData = `
η Oph,17 10 23,-15 43
π Her,17 15 03,36 49
`.trim().split('\n');

let firstTime = true;

function run() {
    if (!firstTime) {
        return;
    }
    firstTime = false;

    getGeoLocation((latitude, longitude) => {
        // https://astronomy.stackexchange.com/questions/29471/how-to-convert-sidereal-time-to-local-time
        const t = new Date();
        const lst = localSiderealDegrees(t, longitude);
        const stars = [];
        const today = new Date().getDate();

        starData.forEach(line => {
            const parts = line.split(',');
            const raParts = parts[1].split(' ');
            const decParts = parts[2].split(' ');
            const [ra, dec] = precess(
                15 * (1 * raParts[0] + raParts[1] / 60 + raParts[2] / 3600),
                1 * decParts[0] + decParts[1] / 60
            );

            const diff = ra + (lst > ra ? 360 : 0) - lst;
            const time = new Date(t.getTime() + 240000 * diff / 1.0027379);

            if (time.getDate() === today) {
                stars.push({
                    name: parts[0].trim(),
                    time: time,
                    tilt: 90 - Math.abs(dec - latitude),
                    dec: dec,
                });
            }
        });

        stars.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);

        stars.forEach(star => {
            const hour = star.time.getHours();

            if (hour > 16 && hour < 23) {
                const tr = document.createElement('tr');
                const params = ['"' + star.name + '"', star.time.getTime(), star.tilt];
                tr.setAttribute('onclick', 'explore(' + params.join(',') + ')');

                function addTd(value) {
                    const td = document.createElement('td');
                    td.innerHTML = value;
                    tr.appendChild(td);
                }

                addTd(star.name);
                addTd(star.dec > latitude ? 'N' : 'S');
                addTd(Math.floor(star.tilt));

                const pad = n => (n < 10 ? '0' : '') + n;
                const t = star.time;
                addTd([hour % 12, pad(t.getMinutes())].join(':'));

                document.getElementById('stars').appendChild(tr);
            }
        });
    });
};