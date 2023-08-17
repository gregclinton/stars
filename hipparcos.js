
/*
    https://dc.zah.uni-heidelberg.de/__system__/adql/query/form

    select hipno, hpmag, ra, dec,
    from hipparcos.main
    where dec > -45 and hpmag < 4
*/

const hipparcos = {};

hipparcos.load = function () {
    lookup = {};
`
112724,3.6704,342.42046735,66.20071089
105199,2.5141,319.64408982,62.58545529
1067,2.7544,3.30895828,15.18361593
6537,3.7757,21.00604671,-8.18275372
78820,2.594,241.35931206,-19.80539286
85927,1.5244,263.40219373,-37.10374835
84143,3.4149,258.038233,-43.23849039
86228,1.9269,264.32969072,-42.99782155
86670,2.3164,265.62199908,-39.02992092
69673,0.1114,213.91811403,19.18726997
71795,3.7971,220.28716819,13.72833113
67927,2.7957,208.6713175,18.39858742
72220,3.7371,221.56246594,1.8929383
76600,3.5999,234.66410153,-29.77768935
76470,3.7471,234.25607748,-28.13507099
78401,2.2617,240.08338225,-22.62162024
68933,2.2226,211.67218608,-36.36869575
75177,3.6909,230.45181856,-36.26116729
75141,3.1417,230.34306833,-40.64745946
76297,2.7,233.78525156,-41.16669497
73334,3.0671,224.79041254,-42.10414199
71352,2.2729,218.87688163,-42.15774562
85696,2.6043,262.69099501,-37.29574016
71865,3.9422,220.49005323,-37.79342394
102488,2.643,311.55180091,33.96945334
75264,3.3138,230.67036465,-44.68957314
78384,3.3398,240.03058543,-38.39664079
82396,2.4532,252.54268738,-34.29260982
73273,2.5982,224.63314193,-43.13386699
99473,3.2245,302.82610327,-0.82147569
84380,3.3121,258.76189282,36.80915527
81693,2.9338,250.32282132,31.60188695
77622,3.7548,237.70371344,4.4775798
77070,2.7971,236.06664914,6.42551971
76276,3.8677,233.7007926,10.53885916
97365,3.8364,296.84693842,18.53425912
98337,3.6215,299.68911516,19.49209287
74785,2.574,229.25196591,-9.38286694
100345,3.2104,305.25269347,-14.78140119
100064,3.7388,304.5134103,-12.54485877
95947,3.2177,292.68035529,27.9596948
92420,3.5618,282.51997462,33.36267788
93194,3.2343,284.73593568,32.68955312
95347,3.9295,290.97146411,-40.61564629
95241,3.9357,290.65952718,-44.45891013
87073,3.1093,266.89617137,-40.12698197
87261,3.3521,267.4643802,-37.04337105
88635,3.1356,271.45218586,-30.42365007
89642,3.1512,274.4072049,-36.76128103
90185,1.7986,276.04310967,-34.3843146
89931,2.8654,275.24842337,-29.82803914
78933,3.9307,241.70180197,-20.66913479
81266,2.7374,248.97066423,-28.21596156
80763,0.9757,247.35194804,-26.43194608
76952,3.8233,235.68599269,26.29551419
72105,2.5167,221.24687869,27.07417383
74666,3.6268,228.87543241,33.31510222
81833,3.6411,250.72391068,38.92246103
77233,3.6836,236.54672877,15.42192602
78072,3.9456,239.11247598,15.66473327
75695,3.7373,231.95771631,29.10549164
76267,2.221,233.67162293,26.71491041
83207,3.9111,255.07252582,30.92633926
77516,3.5411,237.40527375,-3.43014112
88794,3.8384,271.88562824,28.76247025
91262,0.0868,279.23410832,38.78299311
82729,3.7651,253.64627156,-42.36075916
82514,2.9246,252.96766195,-38.04732717
82545,3.4829,253.08397295,-38.01747781
77634,3.9547,237.7397573,-33.62710488
73714,3.3093,226.01775793,-25.28185602
114971,3.8482,349.28955677,3.28224524
5364,3.6235,17.14693197,-10.181928
7097,3.7914,22.87080776,15.34583101
1562,3.7314,4.85701265,-8.82382948
8102,3.6295,26.02136441,-15.93955597
109074,3.108,331.44593869,-0.31982656
109427,3.5534,332.54924902,6.197789
106278,3.0404,322.88966951,-5.57115593
113368,1.1808,344.41177323,-29.62183701
71053,3.7331,217.95774098,30.37114497
107315,2.546,326.04641808,9.87500791
110395,3.8423,335.41374983,-1.38735315
110960,3.745,337.20750231,-0.02006304
106985,3.766,325.02225935,-16.66225343
107556,2.9409,326.75952199,-16.12656595
105881,3.9246,321.66678212,-22.41137838
109176,3.8678,331.75197729,25.3450461
3419,2.2062,10.89678452,-17.9866841
75458,3.4638,231.2324337,58.96602354
104732,3.3743,318.23408977,30.22708128
108085,2.9763,328.48189202,-37.3648229
78104,3.8095,239.22119438,-29.21401221
78265,2.8274,239.71300283,-26.1140428
80112,2.9227,245.29717718,-25.59275259
112158,3.0897,340.75053573,30.22130866
112748,3.6685,342.5004181,24.60168486
41704,3.5041,127.56679232,60.7184311
61281,3.8414,188.37101041,69.78820992
56211,3.9165,172.85120199,69.33112161
72607,2.2044,222.67664751,74.15547596
113881,2.4861,345.94305575,28.08245462
113963,2.4784,346.1900702,15.20536786
2072,3.9946,6.55048418,-43.67990933
2081,2.5512,6.57028075,-42.30512197
112961,3.8072,343.15360192,-7.57967878
6686,2.7146,21.45251267,60.23540347
68756,3.6452,211.09760837,64.37580873
107259,3.9123,325.87689561,58.78005308
11767,2.1077,37.94614689,89.26413805
71957,3.9589,220.76484284,-5.6574291
54061,1.9519,165.93265365,61.75111888
112029,3.3887,340.36531181,10.83139111
53229,3.9531,163.32766612,34.21556641
113136,3.2964,343.6626635,-15.82075994
63125,2.8471,194.00767051,38.31824617
55219,3.6375,169.61981385,33.09423881
94376,3.2296,288.13814581,67.66131695
97433,3.9974,297.04255658,70.26783533
65109,2.7717,200.15027321,-36.71208109
116727,3.3767,354.83742516,77.63196681
8886,3.3107,28.59868107,63.67014686
80331,2.8717,245.99794523,61.51407536
44816,2.3385,136.99907126,-43.43262406
75097,3.0449,230.1822884,71.83397308
9598,3.9602,30.85912643,72.42123962
83895,3.1359,257.19677111,65.71463676
106032,3.1438,322.16489595,70.56069481
89937,3.6666,275.25974572,72.73369763
114341,3.8484,347.36150879,-21.17248555
68895,3.4187,211.59278733,-26.68201883
72622,2.7892,222.71990536,-16.04161047
50191,3.8653,153.68447399,-42.12206281
67464,3.3237,207.3762392,-41.68765971
67472,3.3969,207.40419934,-42.47368506
68245,3.7448,209.56785278,-42.10070526
68282,3.7877,209.6698807,-44.8035314
46651,3.6577,142.67547063,-40.46688763
45860,3.252,140.26441169,34.39252592
50583,2.1684,154.99234054,19.84186032
50335,3.5096,154.17251805,23.4173284
104887,3.8228,318.69727757,38.04432043
97165,2.8683,296.24350878,45.13069195
113726,3.6041,345.48019377,42.32597866
56343,3.7025,173.25107936,-31.85752405
71075,3.098,218.01982421,38.30788348
57399,3.855,176.51305887,47.77933701
14354,3.2889,46.29373754,38.84053298
7607,3.7515,24.49792651,48.62848641
8068,3.9801,25.9150637,50.6887655
2920,3.6112,9.24277921,53.89693161
116584,3.9695,354.3904487,46.45917621
102422,3.5692,311.32195263,61.83679404
42828,3.6188,130.89811451,-33.18641133
23685,3.3215,76.36521705,-22.37085673
92041,3.1339,281.41397083,-26.9907794
92855,2.0095,283.81631956,-26.29659428
93506,2.6212,285.65301428,-29.88011429
79593,2.8283,243.58652601,-3.69397562
93864,3.4689,286.73517629,-27.66981416
97649,0.8273,297.6945086,8.86738491
66249,3.4147,203.673978,-0.59593821
93747,2.9935,286.3525518,13.86370983
32362,3.4417,101.3226398,12.89605513
63090,3.4405,193.90201366,3.39759862
63608,2.998,195.54483557,10.95910186
60129,3.8992,184.97663096,-0.66674709
37279,0.4607,114.82724194,5.22750767
40526,3.6714,124.12895101,9.18566295
54872,2.5932,168.52671705,20.52403384
80170,3.8125,245.48018203,19.15302185
80816,2.9378,247.55525697,21.4896485
746,2.3579,2.29204036,59.15021814
86263,3.6075,264.39677181,-15.39840835
84012,2.4393,257.59442659,-15.72514757
47908,3.1168,146.4629267,23.77427792
36188,2.8546,111.78780121,8.28940893
25428,1.6151,81.57290804,28.60787346
35350,3.6148,109.52336162,16.54047526
36046,3.9507,111.43198371,27.79828561
32246,3.1915,100.98304088,25.13115531
95501,3.4408,291.37396941,3.11457923
98036,3.8668,298.82819233,6.40793334
86742,2.9279,265.86823714,4.56691684
20042,3.5167,64.47341068,-33.79833145
13847,2.9378,44.5654818,-40.30473491
88048,3.4871,269.75665662,-9.77334973
89341,3.8729,273.44086963,-21.05883031
16537,3.8652,53.23509009,-9.45830584
17378,3.6796,55.81231706,-9.76519868
80883,3.8247,247.72850509,1.98410056
90496,2.9838,276.99278955,-25.42124732
79882,3.3887,244.58016994,-4.69260809
21393,3.973,68.88779874,-30.56231049
93805,3.4026,286.56229139,-4.88233456
88771,3.7636,271.8375861,9.56365345
87108,3.7637,266.97322515,2.70745875
88192,3.9704,270.16131466,2.93158759
18543,3.0703,59.50720862,-13.50824471
84345,2.9137,258.66192687,14.39025314
15474,3.7303,49.87904033,-21.7579421
83000,3.3612,254.41779418,9.37505626
86032,2.1262,263.73335321,12.56057584
84970,3.1931,260.50243371,-24.99948797
81377,2.5708,249.28970847,-10.5671518
93085,3.688,284.43241556,-21.10662433
89962,3.3995,275.32883578,-2.897122
23453,3.8549,75.61950025,41.07588953
23416,3.1457,75.49222507,43.82331397
23767,3.116,76.62862102,41.23464074
50801,3.1544,155.58251355,41.4994335
17529,3.8717,56.29851422,42.57854437
59803,2.5477,183.95194937,-17.5419837
60965,2.9449,187.4665965,-16.51509397
18532,2.8348,59.46342138,40.01027315
26451,2.9184,84.41118447,21.14259299
57757,3.7136,177.67202553,1.76537705
55282,3.7179,169.83551103,-14.77904358
59316,3.1761,182.53135773,-22.61979211
61359,2.8099,188.59680864,-23.39662306
87933,3.8533,269.44096106,29.24792527
97278,2.8695,296.56487567,10.61326869
41307,3.8987,126.41529546,-3.90636482
24436,0.193,78.63446353,-8.20163919
24674,3.5544,79.40166225,-6.84438616
46390,2.1351,141.8968826,-8.65868335
38170,3.5109,117.32357809,-24.85978401
39757,2.9157,121.88625899,-24.30443677
49669,1.3232,152.09358075,11.96719513
49583,3.5034,151.83313948,16.76266572
37229,3.7439,114.70783872,-26.8038924
84379,3.1502,258.75801735,24.83958739
93683,3.9215,286.17055765,-21.74135451
94141,2.9664,287.44097404,-21.02352534
95168,3.9884,290.41823037,-17.84725155
86974,3.5596,266.61549553,27.72249917
22449,3.2862,72.45890935,6.96124744
22797,3.647,73.5628985,2.44067149
22549,3.6236,72.80152507,5.60510146
18907,3.9203,60.78907003,5.98930909
20889,3.6992,67.15388879,19.18052092
20455,3.9308,65.73344722,17.5425843
17847,3.6084,57.29054669,24.05352412
17499,3.6857,56.21884811,24.1134484
17573,3.8591,56.45663804,24.36785796
17702,2.848,56.87110065,24.10524193
57632,2.1605,177.26615977,14.57233687
15900,3.77,51.20349011,9.02906504
16083,3.7082,51.79217049,9.7327724
14135,2.6196,45.56991279,4.08992539
45336,3.8713,138.59080529,2.31502422
47508,3.6282,145.28799116,9.89239902
18246,2.898,58.53299363,31.88365776
17448,3.8583,56.07969347,32.28827325
23015,2.8337,74.24840098,33.16613537
14879,3.9821,48.01783332,-28.98910623
33018,3.6405,103.1972503,33.96136985
13209,3.5831,42.49578911,27.26079044
45688,3.8299,139.71111394,36.80289763
43109,3.5004,131.6943593,6.41890691
43813,3.2803,133.84868687,5.9455277
12706,3.5001,40.82551897,3.23617162
9487,3.8281,30.51166929,2.76376048
20894,3.4597,67.16531219,15.8709468
21421,1.0024,68.98000195,16.50976164
23875,2.8258,76.96264146,-5.08626282
21444,3.8713,69.07975243,-3.352448
22109,3.9696,71.37558764,-3.25462465
61941,2.8213,190.41667557,-1.44952231
32349,-1.0876,101.28854105,-16.71314306
30867,3.7921,97.20447548,-7.03305042
28103,3.7888,89.10132627,-14.16803805
49841,3.7748,152.64748785,-12.35383921
52943,3.2707,162.40596699,-16.19413208
51069,3.9567,156.52293768,-16.83609584
27366,2.0065,86.93911641,-9.66960186
30324,1.8911,95.6749475,-17.95591658
65474,0.8891,201.2983523,-11.16124491
35904,2.4215,111.02377104,-29.30311979
27072,3.6977,86.11656241,-22.44748663
54879,3.3288,168.56017036,15.4297631
51624,3.7965,158.20281305,9.30659431
54539,3.1638,167.41608092,44.49855337
58001,2.4286,178.45725536,53.69473296
32759,3.4644,102.46027285,-32.50848752
39429,2.1364,120.89612561,-40.00318846
37819,3.72,116.31376631,-37.96859848
38414,3.8645,118.05435622,-40.57579889
36377,3.3757,112.3078263,-43.30189129
67301,1.7994,206.8856088,49.31330288
65378,2.254,200.98091604,54.92541525
44127,3.188,134.80349479,48.04234956
44471,3.5778,135.90649494,47.15665934
46853,3.277,143.21802191,51.67860208
86414,3.7497,264.86621847,46.00632216
87833,2.3617,269.15157439,51.48895101
87585,3.8948,268.38178961,56.87245216
28380,2.6103,89.93015897,37.21276409
27989,0.4997,88.79287161,7.40703634
31681,1.929,99.42792641,16.39941482
50372,3.4586,154.27469564,42.91446855
35550,3.6031,110.0307889,21.98233941
37740,3.7285,116.11195237,24.39812929
37826,1.2947,116.33068263,28.02631031
36850,1.5811,113.65001898,31.88863645
18724,3.3774,60.17008591,12.49037571
20205,3.8123,64.94805793,15.62770031
64962,3.1521,199.7302224,-23.17141246
29655,3.2945,93.71956952,22.50682376
30343,2.9141,95.73996302,22.51385027
15863,1.8972,51.08061889,49.86124281
9640,2.2409,30.97466283,42.32984832
14328,3.0586,46.19912598,53.50645031
13268,3.896,42.67413655,55.89552955
85670,2.9466,262.60823708,52.30135901
79992,3.8472,244.93519958,46.31327084
24608,0.2385,79.17206517,45.99902927
28358,3.8904,89.88145972,54.28498197
17358,2.9703,55.7311754,47.7876533
19343,3.9864,62.16530527,47.71259359
34444,1.9628,107.09785853,-26.39320776
35037,3.9854,108.70275679,-26.77268601
33977,3.005,105.75613986,-23.83330131
25606,2.9674,82.06135971,-20.75923214
27654,3.9262,87.82980343,-20.87751376
25985,2.6426,83.18255798,-17.82229227
27288,3.5778,86.73895728,-14.82194717
28360,1.9038,89.88237261,44.94743492
73555,3.6469,225.48663804,40.39063671
27628,3.2833,87.7398034,-35.76929225
30277,3.9932,95.52852147,-33.43627251
35264,2.8296,109.28568399,-37.09748689
33579,1.416,104.65644451,-28.97208931
33856,3.5847,105.42979876,-27.93484165
3179,2.4107,10.12661349,56.53740928
3821,3.5835,12.27125262,57.8165477
4427,2.1379,14.17708808,60.71674966
30122,2.9524,95.07827982,-30.06337656
26207,3.3298,83.78449043,9.93416294
103413,3.9504,314.29338184,41.16719384
6867,3.5329,22.0914236,-43.31772906
25336,1.5493,81.28278416,6.34973451
14576,2.097,47.04220716,40.9556512
14668,3.9564,47.37345463,44.85788896
26549,3.6811,84.68652211,-2.60006791
26551,3.7103,84.69010095,-2.59969173
26727,1.6812,85.18968672,-1.94257841
26311,1.6235,84.05338572,-1.20191725
25281,3.2919,81.11923774,-2.39713844
25930,2.1361,83.00166562,-0.2990934
24305,3.2528,78.2328046,-16.20542901
26241,2.6706,83.85825475,-5.90989984
104060,3.8343,316.23273251,43.92785122
26634,2.6124,84.91224975,-34.07404941
53910,2.3499,165.4599615,56.38234478
46733,3.7327,142.88154025,63.06179545
48319,3.8476,147.74871542,59.03910437
109492,3.512,332.71359131,58.20124992
95853,3.8136,292.42641389,51.72946747
94779,3.9512,289.27545794,53.36816064
92862,3.9348,283.8336882,43.9458926
99675,3.9123,303.40792782,46.74132417
31685,3.1395,99.44029869,-43.19592394
101769,3.723,309.38695734,14.59520289
101958,3.765,309.90939395,15.9120527
101421,3.9978,308.30318657,11.30333217
8796,3.521,28.27041595,29.57939727
10064,3.0626,32.38550383,34.98739204
62956,1.7545,193.5068041,55.95984301
59774,3.3353,183.85603795,57.03259792
102618,3.7818,311.91888574,-9.49568988
8832,3.8584,28.38235506,19.29409264
8903,2.7044,28.65978771,20.80829949
9884,2.1726,31.79285757,23.46277743
5447,2.1741,17.43248991,35.62083048
8645,3.9067,27.86504416,-10.33494526
111169,3.782,337.82239898,50.28244976
102098,1.2966,310.3579727,45.28033423
4436,3.9034,14.18790699,38.49925513
677,2.0371,2.09653333,29.09082805
3092,3.4328,9.83165567,30.86122579
100453,2.3549,305.55708346,40.2566815
`.trim().split('\n').forEach(line => { 
        [hipno, mag, ra, dec] = line.split('\t');
        lookup[hipno] = { mag: mag, ra: ra, dec: dec };
    })
    return lookup;
}