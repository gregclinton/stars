// from wikipedia
const wikipediaData = `
η Oph 17h 10m 22.66s -15° 43′ 30.5″
α Oph 17h 34m 56.00s +12° 33′ 38.1″
ζ Oph 16h 37m 09.53s -10° 34′ 01.7″
δ Oph 16h 14m 20.77s -03° 41′ 38.3″
β Oph 17h 43m 28.38s +04° 34′ 00.9″
β Her 16h 30m 13.26s +21° 29′ 22.7″
ζ Her 16h 41m 17.48s +31° 36′ 06.8″
δ Her 17h 15m 01.92s +24° 50′ 22.5″
π Her 17h 15m 02.85s +36° 48′ 33.0″ 
γ Dra 17h 56m 36.38s +51° 29′ 20.2″
η Dra 16h 23m 59.51s +61° 30′ 50.7″
β Dra 17h 30m 25.98s +52° 18′ 04.9″
δ Dra 19h 12m 33.15s +67° 39′ 40.7″
ζ Dra 17h 08m 47.23s +65° 42′ 52.7″
α Sco 16h 29m 24.47s -26° 25′ 55.0″
λ Sco 17h 33m 36.53s -37° 06′ 13.5″
θ Sco 17h 37m 19.13s -42° 59′ 52.2″
δ Sco 16h 00m 20.01s -22° 37′ 17.8″
ε Sco 16h 50m 10.24s -34° 17′ 33.4″
κ Sco 17h 42m 29.28s -39° 01′ 47.7″
β Sco 16h 05m 26.23s -19° 48′ 19.4″
υ Sco 17h 30m 45.84s -37° 17′ 44.7″
τ Sco 16h 35m 52.96s -28° 12′ 57.5″
π Sco 15h 58m 51.12s -26° 06′ 50.6″
σ Sco 16h 21m 11.32s -25° 35′ 33.9″
ι Sco 17h 47m 35.08s -40° 07′ 37.1″
μ Sco 16h 51m 52.24s -38° 02′ 50.4″
G Sco 17h 49m 51.45s -37° 02′ 36.1″
η Sco 17h 12m 09.18s -43° 14′ 18.6″
α UMi 02h 31m 47.08s +89° 15′ 50.9″
β UMi 14h 50m 42.40s +74° 09′ 19.7″
γ UMi 15h 20m 43.75s +71° 50′ 02.3″
α Lyr 18h 36m 56.19s +38° 46′ 58.8″
γ Lyr 18h 58m 56.62s +32° 41′ 22.4″
`.trim().split('\n');

/*
    https://dc.zah.uni-heidelberg.de/__system__/adql/query/form

    select hipno, ra, dec, hpmag
    from hipparcos.main
    where
        dec > -50 and
        hpmag < 3

   // α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ/ς τ υ φ χ ψ ω
*/function allow() {
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
            const raParts = line.slice(7, 20).split(' ');
            const decParts = line.slice(22).split(' ');
            const chomp = s => s.slice(0, s.length - 1);

            stars.push(createStar(
                line.slice(0, 6),
                15 * (1 * chomp(raParts[0]) + chomp(raParts[1]) / 60 + chomp(raParts[2]) / 3600),
                1 * decParts[0].slice(0, 3) + decParts[1].slice(0, 2) / 60
            ));
        });

        messierData.forEach(line => {
            const parts = line.split('\t');
            const raParts = parts[6].split(' ');
            const decParts = parts[7].split(' ');
            const mag = parts[3] * 1;

            console.log(parts[0], parts[6], parts[7]);
            if (mag < 7) {
                const chomp = s => s.slice(0, s.length - 1);

                stars.push(createStar(
                    parts[0].trim(),
                    15 * (1 * chomp(raParts[0]) + chomp(raParts[1]) / 60),
                    1 * decParts[0].slice(0, 3) + decParts[1].slice(0, 2) / 60,
                ));
            }
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
                addTd([hour % 12, pad(time.getMinutes())].join(':'));

                document.getElementById('stars').appendChild(tr);
            }
        });
    });
};