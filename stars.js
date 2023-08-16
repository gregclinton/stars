// from wikipedia
const wikipediaData = `
η Oph 17h 10m 22.66s -15° 43′
α Oph 17h 34m 56.00s +12° 33′
ζ Oph 16h 37m 09.53s -10° 34′
δ Oph 16h 14m 20.77s -03° 41′
β Oph 17h 43m 28.38s +04° 34′
β Her 16h 30m 13.26s +21° 29′
ζ Her 16h 41m 17.48s +31° 36′
δ Her 17h 15m 01.92s +24° 50′
π Her 17h 15m 02.85s +36° 48′
γ Dra 17h 56m 36.38s +51° 29′
η Dra 16h 23m 59.51s +61° 30′
β Dra 17h 30m 25.98s +52° 18′
δ Dra 19h 12m 33.15s +67° 39′
ζ Dra 17h 08m 47.23s +65° 42′
α Sco 16h 29m 24.47s -26° 25′
λ Sco 17h 33m 36.53s -37° 06′
θ Sco 17h 37m 19.13s -42° 59′
δ Sco 16h 00m 20.01s -22° 37′
ε Sco 16h 50m 10.24s -34° 17′
κ Sco 17h 42m 29.28s -39° 01′
β Sco 16h 05m 26.23s -19° 48′
υ Sco 17h 30m 45.84s -37° 17′
τ Sco 16h 35m 52.96s -28° 12′
π Sco 15h 58m 51.12s -26° 06′
σ Sco 16h 21m 11.32s -25° 35′
ι Sco 17h 47m 35.08s -40° 07′
μ Sco 16h 51m 52.24s -38° 02′
G Sco 17h 49m 51.45s -37° 02′
η Sco 17h 12m 09.18s -43° 14′
α UMi 02h 31m 47.08s +89° 15′
β UMi 14h 50m 42.40s +74° 09′
γ UMi 15h 20m 43.75s +71° 50′
α Lyr 18h 36m 56.19s +38° 46′
γ Lyr 18h 58m 56.62s +32° 41′
`.trim().split('\n');

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

            // https://astronomy.stackexchange.com/questions/29471/how-to-convert-sidereal-time-to-local-time
            const diff = star.ra + (lst > star.ra ? 360 : 0) - lst;
            star.time = new Date(t.getTime() + 240000 * diff / 1.0027379);
            return star;
        }

        wikipediaData.forEach(line => {
            const raParts = line.substring(7, 21).split(' ');
            const decParts = line.substring(22).split(' ');
            const chomp = s => s.substring(0, s.length - 1);

            stars.push(createStar(
                line.substring(0, 6),
                15 * (1 * chomp(raParts[0]) + chomp(raParts[1]) / 60 + chomp(raParts[2]) / 3600),
                1 * decParts[0].substring(0, 3) + decParts[1].substring(0, 2) / 60
            ));
        });

        messierData.forEach(line => {
            const raParts = line.slice(4, 13).split(' ');
            const decParts = line.slice(14).split(' ');
            const chomp = s => s.slice(0, s.length - 1);

            stars.push(createStar(
                line.slice(0, 3).trim(),
                15 * (1 * chomp(raParts[0]) + chomp(raParts[1]) / 60),
                1 * decParts[0].slice(0, 3) + decParts[1].slice(0, 2) / 60,
            ));
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
                addTd(star.dec > latitude ? 'N' : 'S');

                const tilt = 90 - Math.abs(star.dec - latitude);
                addTd(Math.round(tilt * 10) / 10);

                const pad = n => (n < 10 ? '0' : '') + n;
                addTd([hour % 12, pad(time.getMinutes()), pad(time.getSeconds())].join(':'));

                document.getElementById('stars').appendChild(tr);
            }
        });
    });
};