// http://astropixels.com/messier/messiercat.html
const messierData = `
M2  6.5 21h 33.5m -00° 49′
M3  6.2 13h 42.2m +28° 23′
M4  5.6 16h 23.6m -26° 32′
M5  5.6 15h 18.6m +02° 05′
M6  4.2 17h 40.1m -32° 13′
M7  3.3 17h 53.9m -34° 49′
M8  6.0 18h 03.8m -24° 23′
M10 6.6 16h 57.1m -04° 06′
M11 6.3 18h 51.1m -06° 16′
M12 6.7 16h 47.2m -01° 57′
M13 5.8 16h 41.7m +36° 28′
M15 6.2 21h 30.0m +12° 10′
M16 6.4 18h 18.8m -13° 47′
M19 6.8 17h 02.6m -26° 16′
M21 6.5 18h 04.6m -22° 30′
M22 5.1 18h 36.4m -23° 54′
M23 6.9 17h 56.8m -19° 01′
M24 4.6 18h 16.9m -18° 30′
M25 6.5 18h 31.6m -19° 15′
M28 6.8 18h 24.5m -24° 52′
M31 3.4 00h 41.8m +41° 16′
M33 5.7 01h 33.9m +30° 39′
M34 5.5 02h 42.0m +42° 47′
M35 5.3 06h 08.9m +24° 20′
M36 6.3 05h 36.1m +34° 08′
M37 6.2 05h 52.4m +32° 33′
M39 4.6 21h 32.2m +48° 26′
M41 4.6 06h 47.0m -20° 44′
M42 4.0 05h 35.4m -05° 27′
M44 3.7 08h 40.1m +19° 59′
M45 1.6 03h 47.0m +24° 07′
M46 6.0 07h 41.8m -14° 49′
M47 5.2 07h 36.6m -14° 30′
M48 5.5 08h 13.8m -05° 48′
M50 6.3 07h 03.2m -08° 20′
M51 8.4 13h 30.0m +47° 11′
M55 6.3 19h 40.0m -30° 58′
M62 6.5 17h 01.2m -30° 07′
M67 6.1 08h 50.4m +11° 49′
M81 6.9 09h 55.6m +69° 04′
M82 8.4 09h 55.8m +69° 41′
M92 6.4 17h 17.1m +43° 08′
M93 6.0 07h 44.6m -23° 52′
`.trim().split('\n');