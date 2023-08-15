/*
    https://dc.zah.uni-heidelberg.de/__system__/adql/query/form

    select hipno, ra, dec, hpmag
    from hipparcos.main
    where
        dec > -50 and
        hpmag < 3
*/
const hipparcosData = `
105199,319.64408982,62.58545529,2.5141
1067,3.30895828,15.18361593,2.7544
78820,241.35931206,-19.80539286,2.594
85927,263.40219373,-37.10374835,1.5244
86228,264.32969072,-42.99782155,1.9269
86670,265.62199908,-39.02992092,2.3164
109268,332.05781838,-46.96061593,1.6983
69673,213.91811403,19.18726997,0.1114
67927,208.6713175,18.39858742,2.7957
78401,240.08338225,-22.62162024,2.2617
68933,211.67218608,-36.36869575,2.2226
76297,233.78525156,-41.16669497,2.7
71352,218.87688163,-42.15774562,2.2729
85696,262.69099501,-37.29574016,2.6043
102488,311.55180091,33.96945334,2.643
82396,252.54268738,-34.29260982,2.4532
73273,224.63314193,-43.13386699,2.5982
85792,262.96050661,-49.87598159,2.7869
81693,250.32282132,31.60188695,2.9338
77070,236.06664914,6.42551971,2.7971
74785,229.25196591,-9.38286694,2.574
90185,276.04310967,-34.3843146,1.7986
89931,275.24842337,-29.82803914,2.8654
81266,248.97066423,-28.21596156,2.7374
80763,247.35194804,-26.43194608,0.9757
72105,221.24687869,27.07417383,2.5167
76267,233.67162293,26.71491041,2.221
91262,279.23410832,38.78299311,0.0868
82514,252.96766195,-38.04732717,2.9246
113368,344.41177323,-29.62183701,1.1808
107315,326.04641808,9.87500791,2.546
107556,326.75952199,-16.12656595,2.9409
3419,10.89678452,-17.9866841,2.2062
108085,328.48189202,-37.3648229,2.9763
78265,239.71300283,-26.1140428,2.8274
80112,245.29717718,-25.59275259,2.9227
72607,222.67664751,74.15547596,2.2044
113881,345.94305575,28.08245462,2.4861
113963,346.1900702,15.20536786,2.4784
2081,6.57028075,-42.30512197,2.5512
6686,21.45251267,60.23540347,2.7146
11767,37.94614689,89.26413805,2.1077
54061,165.93265365,61.75111888,1.9519
63125,194.00767051,38.31824617,2.8471
65109,200.15027321,-36.71208109,2.7717
80331,245.99794523,61.51407536,2.8717
44816,136.99907126,-43.43262406,2.3385
61932,190.38002079,-48.95988553,2.146
39953,122.38314727,-47.33661177,1.7034
72622,222.71990536,-16.04161047,2.7892
68002,208.88514539,-47.28826634,2.4419
50583,154.99234054,19.84186032,2.1684
71860,220.48239101,-47.38814127,2.2296
97165,296.24350878,45.13069195,2.8683
52727,161.69217542,-49.42012517,2.8299
92855,283.81631956,-26.29659428,2.0095
93506,285.65301428,-29.88011429,2.6212
79593,243.58652601,-3.69397562,2.8283
97649,297.6945086,8.86738491,0.8273
93747,286.3525518,13.86370983,2.9935
63608,195.54483557,10.95910186,2.998
37279,114.82724194,5.22750767,0.4607
54872,168.52671705,20.52403384,2.5932
80816,247.55525697,21.4896485,2.9378
746,2.29204036,59.15021814,2.3579
84012,257.59442659,-15.72514757,2.4393
36188,111.78780121,8.28940893,2.8546
25428,81.57290804,28.60787346,1.6151
86742,265.86823714,4.56691684,2.9279
13847,44.5654818,-40.30473491,2.9378
90496,276.99278955,-25.42124732,2.9838
84345,258.66192687,14.39025314,2.9137
86032,263.73335321,12.56057584,2.1262
81377,249.28970847,-10.5671518,2.5708
59803,183.95194937,-17.5419837,2.5477
60965,187.4665965,-16.51509397,2.9449
18532,59.46342138,40.01027315,2.8348
26451,84.41118447,21.14259299,2.9184
61359,188.59680864,-23.39662306,2.8099
97278,296.56487567,10.61326869,2.8695
24436,78.63446353,-8.20163919,0.193
46390,141.8968826,-8.65868335,2.1351
39757,121.88625899,-24.30443677,2.9157
49669,152.09358075,11.96719513,1.3232
94141,287.44097404,-21.02352534,2.9664
17702,56.87110065,24.10524193,2.848
57632,177.26615977,14.57233687,2.1605
14135,45.56991279,4.08992539,2.6196
18246,58.53299363,31.88365776,2.898
23015,74.24840098,33.16613537,2.8337
21421,68.98000195,16.50976164,1.0024
23875,76.96264146,-5.08626282,2.8258
61941,190.41667557,-1.44952231,2.8213
32349,101.28854105,-16.71314306,-1.0876
27366,86.93911641,-9.66960186,2.0065
30324,95.6749475,-17.95591658,1.8911
65474,201.2983523,-11.16124491,0.8891
35904,111.02377104,-29.30311979,2.4215
58001,178.45725536,53.69473296,2.4286
39429,120.89612561,-40.00318846,2.1364
67301,206.8856088,49.31330288,1.7994
65378,200.98091604,54.92541525,2.254
87833,269.15157439,51.48895101,2.3617
28380,89.93015897,37.21276409,2.6103
27989,88.79287161,7.40703634,0.4997
31681,99.42792641,16.39941482,1.929
37826,116.33068263,28.02631031,1.2947
36850,113.65001898,31.88863645,1.5811
30343,95.73996302,22.51385027,2.9141
15863,51.08061889,49.86124281,1.8972
9640,30.97466283,42.32984832,2.2409
85670,262.60823708,52.30135901,2.9466
24608,79.17206517,45.99902927,0.2385
17358,55.7311754,47.7876533,2.9703
34444,107.09785853,-26.39320776,1.9628
25606,82.06135971,-20.75923214,2.9674
25985,83.18255798,-17.82229227,2.6426
28360,89.88237261,44.94743492,1.9038
35264,109.28568399,-37.09748689,2.8296
33579,104.65644451,-28.97208931,1.416
3179,10.12661349,56.53740928,2.4107
4427,14.17708808,60.71674966,2.1379
30122,95.07827982,-30.06337656,2.9524
25336,81.28278416,6.34973451,1.5493
14576,47.04220716,40.9556512,2.097
26727,85.18968672,-1.94257841,1.6812
26311,84.05338572,-1.20191725,1.6235
25930,83.00166562,-0.2990934,2.1361
26241,83.85825475,-5.90989984,2.6706
26634,84.91224975,-34.07404941,2.6124
53910,165.4599615,56.38234478,2.3499
112122,340.66639531,-46.88456594,2.0699
62956,193.5068041,55.95984301,1.7545
8903,28.65978771,20.80829949,2.7044
9884,31.79285757,23.46277743,2.1726
5447,17.43248991,35.62083048,2.1741
102098,310.3579727,45.28033423,1.2966
677,2.09653333,29.09082805,2.0371
100453,305.55708346,40.2566815,2.3549
`.trim().split('\n');