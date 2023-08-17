stars = {};

/*
    https://dc.zah.uni-heidelberg.de/__system__/adql/query/form

    select hipno, ra, dec, hpmag
    from hipparcos.main
    where
        dec > -50 and
        ra > 16 * 15 and
        ra < 18 * 15 and
        hpmag < 8
*/

/*
    bayer designation

    24 greek letters
    αβγδεζηθικλμνξοπρστυφχψω

    88 constellations
    And, Ant, Aps, Aqr, Aql, Ara, Ari, Aur, Boo, Cae, Cam, Cnc, CVn, CMa, CMi, Cap, Car, Cas, Cen, Cep,
    Cet, Cha, Cir, Col, Com, CrA, CrB, Crv, Crt, Cru, Cyg, Del, Dor, Dra, Equ, Eri, For, Gem, Gru, Her,
    Hor, Hya, Hyi, Ind, Lac, Leo, LMi, Lep, Lib, Lup, Lyn, Lyr, Men, Mic, Mon, Mus, Nor, Oct, Oph, Ori,
    Pav, Peg, Per, Phe, Pic, Psc, PsA, Pup, Pyx, Ret, Sge, Sgr, Sco, Scl, Sct, Ser, Sex, Tau, Tel, Tri,
    TrA, Tuc, UMa, UMi, Vel, Vir, Vol, Vul

    24 x 88 = 2,112
*/

// from wikipedia epoch 2000 equinox 2000
const data = `
α Oph 2.1 17h 34m 56.00s +12° 33′
η Oph 2.4 17h 10m 22.66s -15° 43′
ζ Oph 2.5 16h 37m 09.53s -10° 34′
δ Oph 2.7 16h 14m 20.77s -03° 41′
β Oph 2.8 17h 43m 28.38s +04° 34′
M10   6.6 16h 57m 08.92s -04° 05′
M12   6.7 16h 47m 14.18s -01° 56′
M19   6.8 17h 02m 37.69s -26° 16′
M62   6.5 17h 01m 12.60s -30° 06′
β Her 2.8 16h 30m 13.26s +21° 29′
ζ Her 2.8 16h 41m 17.48s +31° 36′
δ Her 3.1 17h 15m 01.92s +24° 50′
π Her 3.2 17h 15m 02.85s +36° 48′
α Her 3.3 17h 14m 38.86s +14° 23′
μ Her 3.4 17h 46m 27.72s +27° 43′
η Her 3.5 16h 42m 53.74s +38° 55′
ξ Her 3.7 17h 57m 45.83s +29° 14′
γ Dra 2.2 17h 56m 36.38s +51° 29′
η Dra 2.7 16h 23m 59.51s +61° 30′
β Dra 2.8 17h 30m 25.98s +52° 18′
δ Dra 3.1 19h 12m 33.15s +67° 39′
ζ Dra 3.2 17h 08m 47.23s +65° 42′
α Sco 0.9 16h 29m 24.47s -26° 25′
λ Sco 1.6 17h 33m 36.53s -37° 06′
δ Sco 2.3 16h 00m 20.01s -22° 37′
ε Sco 2.3 16h 50m 10.24s -34° 17′
κ Sco 2.4 17h 42m 29.28s -39° 01′
β Sco 2.6 16h 05m 26.23s -19° 48′
υ Sco 2.7 17h 30m 45.84s -37° 17′
τ Sco 2.8 16h 35m 52.96s -28° 12′
π Sco 2.9 15h 58m 51.12s -26° 06′
σ Sco 2.9 16h 21m 11.32s -25° 35′
ι Sco 3.0 17h 47m 35.08s -40° 07′
μ Sco 3.0 16h 51m 52.24s -38° 02′
G Sco 3.2 17h 49m 51.45s -37° 02′
M4    5.6 16h 23m 35.22s -26° 31′
M6    4.2 17h 40m 06.00s -32° 13'
M7    3.3 17h 53m 51.20s -34° 47′
α UMi 2.0 02h 31m 47.08s +89° 15′
β UMi 2.1 14h 50m 42.40s +74° 09′
γ UMi 3.0 15h 20m 43.75s +71° 50′
α Lyr 0.0 18h 36m 56.19s +38° 46′
γ Lyr 3.3 18h 58m 56.62s +32° 41′
β Lyr 3.5 18h 50m 04.79s +33° 21′
`.trim().split('\n');

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