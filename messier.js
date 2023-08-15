// http://astropixels.com/messier/messiercat.html
const messierData = `
M1	1952	Sn	8.4	6x4	6300	5h 34.5m	+22° 01′	Tau	winter	Crab Nebula
M2	7089	Gc	6.5	12.9	37900	21h 33.5m	-00° 49′	Aqr	autumn	
M3	5272	Gc	6.2	16.2	33900	13h 42.2m	+28° 23′	CVn	spring	
M4	6121	Gc	5.6	26.3	7200	16h 23.6m	-26° 32′	Sco	summer	
M5	5904	Gc	5.6	17.4	24500	15h 18.6m	+02° 05′	Ser	summer	
M6	6405	Oc	4.2	25	1600	17h 40.1m	-32° 13′	Sco	summer	Butterfly Cluster
M7	6475	Oc	3.3	80	800	17h 53.9m	-34° 49′	Sco	summer	Ptolemy's Cluster
M8	6523	Di	6.0	90x40	5200	18h 03.8m	-24° 23′	Sgr	summer	Lagoon Nebula
M9	6333	Gc	7.7	9.3	26700	17h 19.2m	-18° 31′	Oph	summer	
M10	6254	Gc	6.6	15.1	14400	16h 57.1m	-04° 06′	Oph	summer	
M11	6705	Oc	6.3	14	6000	18h 51.1m	-06° 16′	Sct	summer	Wild Duck Cluster
M12	6218	Gc	6.7	14.5	16000	16h 47.2m	-01° 57′	Oph	summer	
M13	6205	Gc	5.8	16.6	25100	16h 41.7m	+36° 28′	Her	summer	Great Hercules Globular
M14	6402	Gc	7.6	11.7	29000	17h 37.6m	-03° 15′	Oph	summer	
M15	7078	Gc	6.2	12.3	33600	21h 30m	+12° 10′	Peg	autumn	Great Pegasus Globular
M16	6611	Oc	6.4	7	7000	18h 18.8m	-13° 47′	Ser	summer	Eagle Nebula
M17	6618	Di	7.0	11	5000	18h 20.8m	-16° 11′	Sgr	summer	Omega Nebula
M18	6613	Oc	7.5	9	4900	18h 19.9m	-17° 08′	Sgr	summer	
M19	6273	Gc	6.8	13.5	28400	17h 02.6m	-26° 16′	Oph	summer	
M20	6514	Di	9.0	28	5200	18h 02.6m	-23° 02′	Sgr	summer	Trifid Nebula
M21	6531	Oc	6.5	13	4250	18h 04.6m	-22° 30′	Sgr	summer	
M22	6656	Gc	5.1	24	10400	18h 36.4m	-23° 54′	Sgr	summer	Sagittarius Cluster
M23	6494	Oc	6.9	27	2150	17h 56.8m	-19° 01′	Sgr	summer	
M24	-	MW	4.6	90	10000	18h 16.9m	-18° 30′	Sgr	summer	Sagittarius Star Cloud
M25	IC4725	Oc	6.5	40	2000	18h 31.6m	-19° 15′	Sgr	summer	
M26	6694	Oc	8.0	15	5000	18h 45.2m	-09° 24′	Sct	summer	
M27	6853	Pl	7.4	8.0x5.7	1250	19h 59.6m	+22° 43′	Vul	summer	Dumbbell Nebula
M28	6626	Gc	6.8	11.2	18600	18h 24.5m	-24° 52′	Sgr	summer	
M29	6913	Oc	7.1	7	4000	20h 23.9m	+38° 32′	Cyg	summer	
M30	7099	Gc	7.2	11	26100	21h 40.4m	-23° 11′	Cap	autumn	
M31	224	Sp	3.4	178x63	3 million	0h 41.8m	+41° 16′	And	autumn	Andromeda Galaxy
M32	221	El	8.1	8x6	3 million	0h 42.8m	+40° 52′	And	autumn	
M33	598	Sp	5.7	73x45	3 million	1h 33.9m	+30° 39′	Tri	autumn	Triangulum Galaxy
M34	1039	Oc	5.5	35	1400	2h 42m	+42° 47′	Per	autumn	
M35	2168	Oc	5.3	28	2800	6h 08.9m	+24° 20′	Gem	winter	
M36	1960	Oc	6.3	12	4100	5h 36.1m	+34° 08′	Aur	winter	
M37	2099	Oc	6.2	24	4400	5h 52.4m	+32° 33′	Aur	winter	
M38	1912	Oc	7.4	21	4200	5h 28.7m	+35° 50′	Aur	winter	
M39	7092	Oc	4.6	32	825	21h 32.2m	+48° 26′	Cyg	autumn	
M40	Win4	Ds	8.4	0.8	510	12h 22.4m	+58° 05′	UMa	spring	Winnecke 4
M41	2287	Oc	4.6	38	2300	6h 47m	-20° 44′	CMa	winter	
M42	1976	Di	4.0	85x60	1600	5h 35.4m	-05° 27′	Ori	winter	Great Nebula in Orion
M43	1982	Di	9.0	20x15	1600	5h 35.6m	-05° 16′	Ori	winter	De Mairan's Nebula
M44	2632	Oc	3.7	95	577	8h 40.1m	+19° 59′	Cnc	winter	Beehive Cluster
M45	-	Oc	1.6	110	380	3h 47m	+24° 07′	Tau	winter	Pleiades
M46	2437	Oc	6.0	27	5400	7h 41.8m	-14° 49′	Pup	winter	
M47	2422	Oc	5.2	30	1600	7h 36.6m	-14° 30′	Pup	winter	
M48	2548	Oc	5.5	54	1500	8h 13.8m	-05° 48′	Hya	winter	
M49	4472	El	8.4	9x7.5	60 million	12h 29.8m	+08° 00′	Vir	spring	
M50	2323	Oc	6.3	16	3000	7h 03.2m	-08° 20′	Mon	winter	
M51	5194	Sp	8.4	11x7	37 million	13h 30m	+47° 11′	CVn	spring	Whirlpool Galaxy
M52	7654	Oc	7.3	13	5000	23h 24.2m	+61° 35′	Cas	autumn	
M53	5024	Gc	7.6	12.6	59700	13h 12.9m	+18° 10′	Com	spring	
M54	6715	Gc	7.6	9.1	88700	18h 55.1m	-30° 29′	Sgr	summer	
M55	6809	Gc	6.3	19	17600	19h 40m	-30° 58′	Sgr	summer	
M56	6779	Gc	8.3	7.1	32900	19h 16.6m	+30° 11′	Lyr	summer	
M57	6720	Pl	8.8	1.4x1.0	2300	18h 53.6m	+33° 02′	Lyr	summer	Ring Nebula
M58	4579	Ba	9.7	5.5x4.5	60 million	12h 37.7m	+11° 49′	Vir	spring	
M59	4621	El	9.6	5x3.5	60 million	12h 42m	+11° 39′	Vir	spring	
M60	4649	El	8.8	7x6	60 million	12h 43.7m	+11° 33′	Vir	spring	
M61	4303	Sp	9.7	6x5.5	60 million	12h 21.9m	+04° 28′	Vir	spring	
M62	6266	Gc	6.5	14.1	22500	17h 01.2m	-30° 07′	Oph	summer	
M63	5055	Sp	8.6	10x6	37 million	13h 15.8m	+42° 02′	CVn	spring	Sunflower Galaxy
M64	4826	Sp	8.5	9.3x5.4	19 million	12h 56.7m	+21° 41′	Com	spring	Black Eye Galaxy
M65	3623	Sp	9.3	8x1.5	35 million	11h 18.9m	+13° 05′	Leo	spring	
M66	3627	Sp	8.9	8x2.5	35 million	11h 20.2m	+12° 59′	Leo	spring	
M67	2682	Oc	6.1	30	2700	8h 50.4m	+11° 49′	Cnc	winter	
M68	4590	Gc	7.8	12	33300	12h 39.5m	-26° 45′	Hya	spring	
M69	6637	Gc	7.6	7.1	28000	18h 31.4m	-32° 21′	Sgr	summer	
M70	6681	Gc	7.9	7.8	29400	18h 43.2m	-32° 18′	Sgr	summer	
M71	6838	Gc	8.2	7.2	12700	19h 53.8m	+18° 47′	Sge	summer	
M72	6981	Gc	9.3	5.9	55400	20h 53.5m	-12° 32′	Aqr	summer	
M73	6994	As	9.0	2.8	2000	20h 59m	-12° 38′	Aqr	summer	
M74	628	Sp	9.4	10.2x9.5	35 million	1h 36.7m	+15° 47′	Psc	autumn	
M75	6864	Gc	8.5	6	61300	20h 06.1m	-21° 55′	Sgr	summer	
M76	650	Pl	10.1	2.7x1.8	3400	1h 42.4m	+51° 34′	Per	autumn	Little Dumbbell Nebula
M77	1068	Sp	8.9	7x6	60 million	2h 42.7m	+00° 02′	Cet	autumn	
M78	2068	Di	8.3	8x6	1600	5h 46.7m	+00° 03′	Ori	winter	
M79	1904	Gc	7.7	8.7	42100	5h 24.5m	-24° 33′	Lep	winter	
M80	6093	Gc	7.3	8.9	32600	16h 17m	-22° 59′	Sco	summer	
M81	3031	Sp	6.9	21x10	12 million	9h 55.6m	+69° 04′	UMa	spring	Bode's Galaxy
M82	3034	Ir	8.4	9x4	12 million	9h 55.8m	+69° 41′	UMa	spring	Cigar Galaxy
M83	5236	Sp	7.6	11x10	15 million	13h 37m	-29° 52′	Hya	spring	Southern Pinwheel
M84	4374	Ln	9.1	5	60 million	12h 25.1m	+12° 53′	Vir	spring	
M85	4382	Ln	9.1	7.1x5.2	60 million	12h 25.5m	+18° 12′	Com	spring	
M86	4406	Ln	8.9	7.5x5.5	60 million	12h 26.2m	+12° 57′	Vir	spring	
M87	4486	El	8.6	7	60 million	12h 30.8m	+12° 24′	Vir	spring	
M88	4501	Sp	9.6	7x4	60 million	12h 32.1m	+14° 26′	Com	spring	
M89	4552	El	9.8	4	60 million	12h 35.7m	+12° 33′	Vir	spring	
M90	4569	Sp	9.5	9.5x4.5	60 million	12h 36.8m	+13° 10′	Vir	spring	
M91	4548	Ba	10.2	5.4x4.4	60 million	12h 35.5m	+14° 30′	Com	spring	
M92	6341	Gc	6.4	11.2	26700	17h 17.1m	+43° 08′	Her	summer	
M93	2447	Oc	6.0	22	3600	7h 44.6m	-23° 52′	Pup	winter	
M94	4736	Sp	8.2	7x3	15 million	12h 50.9m	+41° 08′	CVn	spring	
M95	3351	Ba	9.7	4.4x3.3	38 million	10h 44m	+11° 42′	Leo	spring	
M96	3368	Sp	9.2	6x4	38 million	10h 46.8m	+11° 49′	Leo	spring	
M97	3587	Pl	9.9	3.4x3.3	2600	11h 14.8m	+55° 01′	UMa	spring	Owl Nebula
M98	4192	Sp	10.1	9.5x3.2	60 million	12h 13.9m	+14° 55′	Com	spring	
M99	4254	Sp	9.9	5.4x4.8	60 million	12h 18.9m	+14° 26′	Com	spring	
M100	4321	Sp	9.3	7x6	60 million	12h 23m	+15° 50′	Com	spring	
M101	5457	Sp	7.9	22	27 million	14h 03.2m	+54° 21′	UMa	spring	Pinwheel Galaxy
M102	5866	Ln	9.9	5.2x2.3	40 million	15h 06.5m	+55° 46′	Dra	summer	
M103	581	Oc	7.4	6	8500	1h 33.2m	+60° 42′	Cas	autumn	
M104	4594	Sp	8.0	9x4	50 million	12h 40m	-11° 37′	Vir	spring	Sombrero Galaxy
M105	3379	El	9.3	2	38 million	10h 47.8m	+12° 35′	Leo	spring	
M106	4258	Sp	8.4	19x8	25 million	12h 18.9m	+47° 19′	CVn	spring	
M107	6171	Gc	7.9	10	20900	16h 32.5m	-13° 03′	Oph	summer	
M108	3556	Sp	10.0	8x1	45 million	11h 11.5m	+55° 40′	UMa	spring	
M109	3992	Ba	9.8	7x4	55 million	11h 57.6m	+53° 23′	UMa	spring	
M110	205	El	8.5	17x10	3 million	00h 40.4m	+41° 41′	And	autumn	
`.trim().split('\n');;