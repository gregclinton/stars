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

        [
            ['eta Oph', '17 10 23', '-15 43'],
            ['pi Her', '17 15 03', '36 49'],
        ].forEach(star => {
            const name = star[0];
            const raParts = star[1].split(' ');
            const decParts = star[2].split(' ');
            const [ra, dec] = precess(
                15 * (1 * raParts[0] + raParts[1] / 60 + raParts[2] / 3600),
                1 * decParts[0] + decParts[1] / 60
            );

            const diff = ra + (lst > ra ? 360 : 0) - lst;
            const time = new Date(t.getTime() + 240000 * diff / 1.0027379);
            const tilt = 90 - Math.abs(dec - latitude);

            const tr = document.createElement('tr');
            tr.setAttribute('onclick', 'explore("' + name + '",' + time.getTime() + ',' + tilt + ')');

            const tdName = document.createElement('td');
            tdName.innerHTML = name;

            const tdTime = document.createElement('td');
            const pad = n => (n < 10 ? '0' : '') + n;
            tdTime.innerHTML = [time.getHours() % 12, pad(time.getMinutes())].join(':');

            tr.appendChild(tdName);
            tr.appendChild(tdTime);
            document.getElementById('stars').appendChild(tr);
        });
    });
};