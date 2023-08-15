// from wikipedia
const wikipediaData = `
α Oph	α	55			159561	86032	17h 34m 56.00s	+12° 33′ 38.1″	2.08	1.30	47	A5III	Ras Alhague, Rasalhague
η Oph	η	35	90		155125	84012	17h 10m 22.66s	−15° 43′ 30.5″	2.43	0.37	84	A2.5Va	Sabik
ζ Oph	ζ	13	28		149757	81377	16h 37m 09.53s	−10° 34′ 01.7″	2.54	−3.20	458	O9.5V	Han; γ Cas variable; Be star
δ Oph	δ	1	7		146051	79593	16h 14m 20.77s	−03° 41′ 38.3″	2.73	−0.86	170	M1III	Yed Prior, Yad, Jed Prior
β Oph	β	60	168		161096	86742	17h 43m 28.38s	+04° 34′ 00.9″	2.76	0.76	82	K2III	Cebalrai, Celbalrai, Celb-al-Rai, Kelb Alrai, Cheleb
`.trim().split('\n');

/*
    https://dc.zah.uni-heidelberg.de/__system__/adql/query/form

    select hipno, ra, dec, hpmag
    from hipparcos.main
    where
        dec > -50 and
        hpmag < 3

   // α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ/ς τ υ φ χ ψ ω
*/

function allow() {
    document.getElementById('allow').remove();

    getGeoLocation((latitude, longitude) => {
        const t = new Date();
        const today = t.getDate();
        const lst = localSiderealDegrees(t, longitude);
        let stars = [];

        function createStar(name, ra, dec) {
            const star = { name: name };
            const [raPrecessed, decPrecessed] = precess(ra, dec);

            star.ra = raPrecessed;
            star.dec = decPrecessed;

            const diff = star.ra + (lst > star.ra ? 360 : 0) - lst;
            star.time = new Date(t.getTime() + 240000 * diff / 1.0027379);
            return star;
        }

        wikipediaData.forEach(line => {
            const parts = line.split('\t');
            const raParts = parts[7].split(' ');
            const decParts = parts[8].split(' ');
            const chomp = s => s.slice(0, s.length - 1);

            stars.push(createStar(
                parts[0],
                15 * (1 * chomp(raParts[0]) + chomp(raParts[1]) / 60 + chomp(raParts[2]) / 3600),
                1 * decParts[0].slice(0, 3) + decParts[1].slice(0, 2) / 60
            ));
        });

        messierData.forEach(line => {
            const parts = line.split('\t');
            const raParts = parts[6].split(' ');
            const decParts = parts[7].split(' ');
            const mag = parts[3] * 1;

            if (mag < 7) {
                const chomp = s => s.slice(0, s.length - 1);

                stars.push(createStar(
                    parts[0].trim(),
                    15 * (1 * chomp(raParts[0]) + chomp(raParts[1]) / 60),
                    1 * decParts[0].slice(0, 3) + decParts[1].slice(0, 2) / 60,
                ));
            }
        });

        stars = stars.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);

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