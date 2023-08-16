// from wikipedia
const wikipediaData = `
α Oph	α	55		159561	86032	17h 34m 56.00s	+12° 33′ 38.1″	2.08	1.30	47	A5III	Ras Alhague, Rasalhague
η Oph	η	35		155125	84012	17h 10m 22.66s	−15° 43′ 30.5″	2.43	0.37	84	A2.5Va	Sabik
ζ Oph	ζ	13		149757	81377	16h 37m 09.53s	−10° 34′ 01.7″	2.54	−3.20	458	O9.5V	Han; γ Cas variable; Be star
δ Oph	δ	1		146051	79593	16h 14m 20.77s	−03° 41′ 38.3″	2.73	−0.86	170	M1III	Yed Prior, Yad, Jed Prior
β Oph	β	60		161096	86742	17h 43m 28.38s	+04° 34′ 00.9″	2.76	0.76	82	K2III	Cebalrai, Celbalrai, Celb-al-Rai, Kelb Alrai, Cheleb
β Her	β	27		148856	80816	16h 30m 13.26s	+21° 29′ 22.7″	2.78	−0.50	148	G8III	Kornephoros, Korneforos, Rutilicus
ζ Her	ζ	40		150680	81693	16h 41m 17.48s	+31° 36′ 06.8″	2.81	2.64	35	F9IV	Rutilicus
δ Her	δ	65		156164	84379	17h 15m 01.92s	+24° 50′ 22.5″	3.12	1.21	78	A3IVv SB	Sarin, Menkib al Jathi al Aisr, Humerus Sinister Ingeniculi[1]
π Her	π	67		156283	84380	17h 15m 02.85s	+36° 48′ 33.0″	3.16	−2.10	367	K3IIvar	
γ Dra	γ	33		164058	87833	17h 56m 36.38s	+51° 29′ 20.2″	2.24	−1.04	148	K5III	Eltanin
η Dra	η	14		148387	80331	16h 23m 59.51s	+61° 30′ 50.7″	2.73	0.58	88	G8III	Aldibain,[1] Athebyne
β Dra	β	23		159181	85670	17h 30m 25.98s	+52° 18′ 04.9″	2.79	−2.43	361	G2II	Rastaban, Rastaben, Alwaid, Asuia
δ Dra	δ	57		180711	94376	19h 12m 33.15s	+67° 39′ 40.7″	3.07	0.63	100	G9III	Altais, Nodus Secundus, Nodus II, Aldib
ζ Dra	ζ	22		155763	83895	17h 08m 47.23s	+65° 42′ 52.7″	3.17	−1.92	340	B6III	Aldhibah, Eldsib, Nod, Nodus III
α Sco	α			148478	80763	16h 29m 24.47s	−26° 25′ 55.0″	0.91	−5.24	553	M1.5Iab-b	Cor Scorpii, Qalb al-Aqrab, Vespertilo; 16th brightest star; binary; semiregular variable, Vmax = 0.75m, Vmin = 1.21m, P = 2180 d
λ Sco	λ	35		158926	85927	17h 33m 36.53s	−37° 06′ 13.5″	1.62	−5.05	703	B2IV+DA7.9	Shaula; β Cep and Algol variable, Vmax = 1.59m, Vmin = 1.65m, P = 0.21 d
θ Sco	θ			159532	86228	17h 37m 19.13s	−42° 59′ 52.2″	1.86	−2.75	272	F1II	Sargas; suspected variable, Vmax = 1.84m, Vmin = 1.88m
δ Sco	δ	7		143275	78401	16h 00m 20.01s	−22° 37′ 17.8″	2.29	−3.16	401	B0.2IVe	Dschubba, Al Jabba, Iclarkrau; γ Cas variable, Vmax = 1.59m, Vmin = 2.32m
ε Sco	ε	26		151680	82396	16h 50m 10.24s	−34° 17′ 33.4″	2.29	0.78	65	K2IIIb	Wei, Larawag; suspected variable, Vmax = 2.24m, Vmin = 2.35m
κ Sco	κ			160578	86670	17h 42m 29.28s	−39° 01′ 47.7″	2.39	−3.38	464	B1.5III	Girtab; β Cep variable, Vmax = 2.41m, Vmin = 2.42m, P = 0.20 d
β Sco	β1	8		144217	78820	16h 05m 26.23s	−19° 48′ 19.4″	2.62	−3.44	530	B0.5V	Acrab, Elacrab, Graffias, Grafias, Grassias; suspected variable, Vmax = 2.61m, Vmin = 2.67m
υ Sco	υ	34		158408	85696	17h 30m 45.84s	−37° 17′ 44.7″	2.70	−3.31	518	B2IV	Lesath, Lesuth
τ Sco	τ	23		149438	81266	16h 35m 52.96s	−28° 12′ 57.5″	2.82	−2.78	430	B0V	Paikauhale,[1] Alniyat, Al Niyat
π Sco	π	6		143018	78265	15h 58m 51.12s	−26° 06′ 50.6″	2.89	−2.85	459	B1V + B2V	Fang; Nur;[2] Vrischika, Iclil rotating ellipsoidal variable, Vmax = 2.88m, Vmin = 2.91m, P = 1.57 d
σ Sco	σ	20		147165	80112	16h 21m 11.32s	−25° 35′ 33.9″	2.90	−3.86	734	B1III	Alniyat, Al Niyat, β Cep variable, Vmax = 2.86m, Vmin = 2.94m, P = 0.25 d
ι Sco	ι1			161471	87073	17h 47m 35.08s	−40° 07′ 37.1″	2.99	−5.71	1791	F3Ia	Apollyon
μ Sco	μ1			151890	82514	16h 51m 52.24s	−38° 02′ 50.4″	3.00	−4.01	821	B1.5IV + B	Xamidimura, Denebakrab; β Lyr variable, Vmax = 2.94m, Vmin = 3.22m, P = 1.45 d
G Sco	G			161892	87261	17h 49m 51.45s	−37° 02′ 36.1″	3.19	0.24	127	K0/K1III	γ Tel, Fuyue
η Sco	η			155203	84143	17h 12m 09.18s	−43° 14′ 18.6″	3.32	1.61	72	F3p	suspected variable
α UMi	α	1		8890	11767	02h 31m 47.08s	+89° 15′ 50.9″	1.97	−3.64	431	F7:Ib-IIv SB	Pole Star, Lodestar, Alruccabah, Cynosura, Phoenice, Tramontana, Angel Stern, Navigatoria, Star of Arcady, Yilduz, Mismar, Polyarnaya, Dhruva; classical Cepheid, Vmax = 1.97m, Vmin = 2.00m, P = 3.9696 d
β UMi	β	7		131873	72607	14h 50m 42.40s	+74° 09′ 19.7″	2.07	−0.87	126	K4IIIvar	Kochab, Kokab, Kochah; suspected variable, Vmax = 2.02m, Vmin = 2.08m, has a planet (b)
γ UMi	γ	13		137422	75097	15h 20m 43.75s	+71° 50′ 02.3″	3.04	−2.84	480	A3II-III	Pherkad, Pherkad Major; δ Sct variable, ΔV = 0.05m, P = 0.143009 d
α Lyr	α	3		172167	91262	18h 36m 56.19s	+38° 46′ 58.8″	0.03	0.58	25	A0Vvar	Wega, Fidis, Harp Star, Al Nesr al Waki, Vulture Cadens;[1] 5th brightest star, has a dust disk; δ Sct variable, Vmax = -0.02m, Vmin = 0.07m, P = 0.19 d
γ Lyr	γ	14		176437	93194	18h 58m 56.62s	+32° 41′ 22.4″	3.25	−3.20	634	B9III	Sulafat, Sulaphat; suspected variable, Vmax = 3.23m, Vmin = 3.26m
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
            const parts = line.replaceAll('−', '-').split('\t');
            const raParts = parts[6].split(' ');
            const decParts = parts[7].split(' ');
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