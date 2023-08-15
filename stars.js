const starData = `
η Oph,17 10 23,-15 43
π Her,17 15 03,36 49
`.trim().split('\n');

/*
    https://dc.zah.uni-heidelberg.de/__system__/adql/query/form

    select ra, dec, hpmag
    from hipparcos.main
    where
        dec > -50 and
        ra > 16 * 15 and
        ra < 18 * 15 and
        hpmag < 8
*/

function allow() {
    document.getElementById('allow').remove();

    getGeoLocation((latitude, longitude) => {
        const t = new Date();
        const today = t.getDate();
        const lst = localSiderealDegrees(t, longitude);
        const stars = [];

        starData.forEach(line => {
            const parts = line.split(',');
            const raParts = parts[1].split(' ');
            const decParts = parts[2].split(' ');

            stars.push({
                name: parts[0].trim(),
                ra: 15 * (1 * raParts[0] + raParts[1] / 60 + raParts[2] / 3600),
                dec: 1 * decParts[0] + decParts[1] / 60,
            });
        });

        messierData.forEach(line => {
            const parts = line.split('\t');
            const raParts = parts[6].split(' ');
            const decParts = parts[7].split(' ');
            const mag = parts[3] * 1;

            if (mag < 7) {
                const chomp = s => s.slice(0, s.length - 1);

                stars.push({
                    name: parts[0].trim(),
                    ra: 15 * (1 * chomp(raParts[0]) + chomp(raParts[1]) / 60),
                    dec: 1 * decParts[0].slice(0, 3) + decParts[1].slice(0, 2) / 60,
                });
            }
        });

        stars.forEach(star => {
            const [ra, dec] = precess(star.ra, star.dec);

            const diff = ra + (lst > ra ? 360 : 0) - lst;
            star.time = new Date(t.getTime() + 240000 * diff / 1.0027379);
            star.ra = ra;
            star.dec = dec;
        });

        stars.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);

        stars.forEach(star => {
            // https://astronomy.stackexchange.com/questions/29471/how-to-convert-sidereal-time-to-local-time
            const time = star.time;
            const dec = star.dec;
            const hour = time.getHours();
            const tilt = 90 - Math.abs(dec - latitude);

            if (hour > 16 && hour < 23 && time.getDate() === today) {
                const tr = document.createElement('tr');
                const params = ['"' + star.name + '"', time.getTime(), tilt];
                tr.setAttribute('onclick', 'explore(' + params.join(',') + ')');

                function addTd(value) {
                    const td = document.createElement('td');
                    td.innerHTML = value;
                    tr.appendChild(td);
                }

                addTd(star.name);
                addTd(dec > latitude ? 'N' : 'S');
                addTd(Math.floor(tilt));

                const pad = n => (n < 10 ? '0' : '') + n;
                const t = time;
                addTd([hour % 12, pad(t.getMinutes())].join(':'));

                document.getElementById('stars').appendChild(tr);
            }
        });
    });
};