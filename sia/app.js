// auto-generated representative sample (behaves like results/testSet_priority_ranked.csv)
const SAMPLE_PUMPS = [
  {id:55000,region:"Dar es Salaam",lat:-6.8832,lon:38.9633,population:81,quantity:"insufficient",likelihood:0.344,dist_km:10.16,n_nonfunc:1,s_pop:4.5,s_qty:5.0,s_dist:6.8,s_non:2.1},
  {id:55001,region:"Mara",lat:-1.3073,lon:34.9852,population:251,quantity:"enough",likelihood:0.279,dist_km:5.4,n_nonfunc:4,s_pop:8.1,s_qty:10.0,s_dist:3.6,s_non:3.2},
  {id:55002,region:"Dodoma",lat:-5.3965,lon:35.3929,population:104,quantity:"dry",likelihood:0.046,dist_km:8.43,n_nonfunc:11,s_pop:5.6,s_qty:2.0,s_dist:5.6,s_non:8.0},
  {id:55003,region:"Iringa",lat:-7.3457,lon:35.0609,population:14,quantity:"enough",likelihood:0.529,dist_km:22.85,n_nonfunc:6,s_pop:1.2,s_qty:10.0,s_dist:9.9,s_non:4.5},
  {id:55004,region:"Njombe",lat:-8.1663,lon:35.1013,population:122,quantity:"enough",likelihood:0.573,dist_km:9.77,n_nonfunc:6,s_pop:6.1,s_qty:10.0,s_dist:6.6,s_non:4.5},
  {id:55005,region:"Tanga",lat:-4.5795,lon:38.8161,population:283,quantity:"insufficient",likelihood:0.669,dist_km:14.43,n_nonfunc:12,s_pop:8.4,s_qty:5.0,s_dist:8.6,s_non:8.4},
  {id:55006,region:"Manyara",lat:-4.5338,lon:35.4592,population:35,quantity:"dry",likelihood:0.62,dist_km:8.65,n_nonfunc:0,s_pop:2.3,s_qty:2.0,s_dist:5.7,s_non:1.0},
  {id:55007,region:"Tabora",lat:-4.9491,lon:33.0857,population:43,quantity:"unknown",likelihood:0.864,dist_km:15.28,n_nonfunc:6,s_pop:2.8,s_qty:5.0,s_dist:9.0,s_non:4.6},
  {id:55008,region:"Shinyanga",lat:-3.1358,lon:33.2211,population:61,quantity:"insufficient",likelihood:0.154,dist_km:1.97,n_nonfunc:11,s_pop:3.7,s_qty:5.0,s_dist:1.4,s_non:8.0},
  {id:55009,region:"Lindi",lat:-10.1655,lon:39.3085,population:21,quantity:"insufficient",likelihood:0.106,dist_km:6.27,n_nonfunc:4,s_pop:1.6,s_qty:5.0,s_dist:4.3,s_non:3.3},
  {id:55010,region:"Iringa",lat:-7.6784,lon:36.4176,population:88,quantity:"enough",likelihood:0.215,dist_km:7.57,n_nonfunc:0,s_pop:4.9,s_qty:10.0,s_dist:5.1,s_non:1.1},
  {id:55011,region:"Mwanza",lat:-2.5891,lon:32.3637,population:118,quantity:"dry",likelihood:0.37,dist_km:11.53,n_nonfunc:0,s_pop:6.0,s_qty:2.0,s_dist:7.6,s_non:1.1},
  {id:55012,region:"Tanga",lat:-5.6591,lon:37.8334,population:104,quantity:"enough",likelihood:0.214,dist_km:8.72,n_nonfunc:13,s_pop:5.6,s_qty:10.0,s_dist:5.8,s_non:8.9},
  {id:55013,region:"Lindi",lat:-9.8548,lon:38.3187,population:87,quantity:"insufficient",likelihood:0.429,dist_km:12.31,n_nonfunc:7,s_pop:4.8,s_qty:5.0,s_dist:7.9,s_non:5.4},
  {id:55014,region:"Ruvuma",lat:-10.6359,lon:35.8749,population:678,quantity:"insufficient",likelihood:0.258,dist_km:4.51,n_nonfunc:1,s_pop:9.7,s_qty:5.0,s_dist:3.0,s_non:2.2},
  {id:55015,region:"Shinyanga",lat:-3.9714,lon:34.107,population:59,quantity:"insufficient",likelihood:0.454,dist_km:6.2,n_nonfunc:4,s_pop:3.6,s_qty:5.0,s_dist:4.2,s_non:3.3},
  {id:55016,region:"Morogoro",lat:-7.6459,lon:36.6633,population:145,quantity:"insufficient",likelihood:0.61,dist_km:19.39,n_nonfunc:13,s_pop:6.6,s_qty:5.0,s_dist:9.7,s_non:8.9},
  {id:55017,region:"Iringa",lat:-8.0106,lon:35.4796,population:297,quantity:"enough",likelihood:0.115,dist_km:4.27,n_nonfunc:7,s_pop:8.6,s_qty:10.0,s_dist:2.8,s_non:5.4},
  {id:55018,region:"Dodoma",lat:-5.7314,lon:35.2232,population:502,quantity:"enough",likelihood:0.49,dist_km:5.85,n_nonfunc:1,s_pop:9.5,s_qty:10.0,s_dist:3.9,s_non:2.2},
  {id:55019,region:"Shinyanga",lat:-3.9577,lon:32.9725,population:122,quantity:"enough",likelihood:0.67,dist_km:2.68,n_nonfunc:8,s_pop:6.2,s_qty:10.0,s_dist:1.8,s_non:6.0},
  {id:55020,region:"Mbeya",lat:-8.446,lon:33.9423,population:23,quantity:"seasonal",likelihood:0.587,dist_km:2.08,n_nonfunc:7,s_pop:1.7,s_qty:7.0,s_dist:1.5,s_non:5.4},
  {id:55021,region:"Morogoro",lat:-7.6008,lon:37.0969,population:68,quantity:"enough",likelihood:0.225,dist_km:9.34,n_nonfunc:14,s_pop:4.1,s_qty:10.0,s_dist:6.2,s_non:9.0},
  {id:55022,region:"Kilimanjaro",lat:-3.3867,lon:37.5438,population:155,quantity:"seasonal",likelihood:0.54,dist_km:7.54,n_nonfunc:11,s_pop:6.8,s_qty:7.0,s_dist:5.1,s_non:8.0},
  {id:55023,region:"Kigoma",lat:-5.061,lon:30.2879,population:195,quantity:"enough",likelihood:0.784,dist_km:14.73,n_nonfunc:7,s_pop:7.5,s_qty:10.0,s_dist:8.8,s_non:5.5},
  {id:55024,region:"Mara",lat:-1.3898,lon:34.7951,population:170,quantity:"seasonal",likelihood:0.238,dist_km:9.63,n_nonfunc:6,s_pop:7.1,s_qty:7.0,s_dist:6.5,s_non:4.6},
  {id:55025,region:"Mbeya",lat:-8.9408,lon:34.3473,population:238,quantity:"enough",likelihood:0.051,dist_km:6.47,n_nonfunc:12,s_pop:8.0,s_qty:10.0,s_dist:4.5,s_non:8.4},
  {id:55026,region:"Morogoro",lat:-8.8084,lon:36.9194,population:121,quantity:"seasonal",likelihood:0.672,dist_km:6.46,n_nonfunc:9,s_pop:6.1,s_qty:7.0,s_dist:4.5,s_non:6.7},
  {id:55027,region:"Iringa",lat:-7.307,lon:35.6707,population:180,quantity:"seasonal",likelihood:0.298,dist_km:6.08,n_nonfunc:10,s_pop:7.3,s_qty:7.0,s_dist:4.1,s_non:7.5},
  {id:55028,region:"Njombe",lat:-8.7482,lon:35.4287,population:65,quantity:"enough",likelihood:0.623,dist_km:9.45,n_nonfunc:6,s_pop:4.0,s_qty:10.0,s_dist:6.3,s_non:4.6},
  {id:55029,region:"Tanga",lat:-5.781,lon:37.8678,population:18,quantity:"insufficient",likelihood:0.573,dist_km:9.96,n_nonfunc:8,s_pop:1.3,s_qty:5.0,s_dist:6.6,s_non:6.0},
  {id:55030,region:"Singida",lat:-5.131,lon:34.6494,population:73,quantity:"enough",likelihood:0.578,dist_km:3.86,n_nonfunc:8,s_pop:4.2,s_qty:10.0,s_dist:2.6,s_non:6.0},
  {id:55031,region:"Kilimanjaro",lat:-3.3802,lon:37.5779,population:75,quantity:"enough",likelihood:0.105,dist_km:11.12,n_nonfunc:18,s_pop:4.3,s_qty:10.0,s_dist:7.4,s_non:9.8},
  {id:55032,region:"Ruvuma",lat:-10.5239,lon:35.1381,population:213,quantity:"dry",likelihood:0.329,dist_km:15.1,n_nonfunc:10,s_pop:7.8,s_qty:2.0,s_dist:8.9,s_non:7.5},
  {id:55033,region:"Mara",lat:-2.01,lon:34.956,population:63,quantity:"seasonal",likelihood:0.799,dist_km:8.82,n_nonfunc:1,s_pop:3.8,s_qty:7.0,s_dist:5.9,s_non:2.2},
  {id:55034,region:"Pwani",lat:-7.1919,lon:38.7854,population:35,quantity:"enough",likelihood:0.14,dist_km:3.86,n_nonfunc:12,s_pop:2.3,s_qty:10.0,s_dist:2.6,s_non:8.4},
  {id:55035,region:"Ruvuma",lat:-10.4634,lon:35.2,population:789,quantity:"seasonal",likelihood:0.265,dist_km:19.35,n_nonfunc:18,s_pop:9.8,s_qty:7.0,s_dist:9.7,s_non:9.8},
  {id:55036,region:"Lindi",lat:-10.4926,lon:39.8007,population:343,quantity:"enough",likelihood:0.257,dist_km:11.52,n_nonfunc:3,s_pop:9.0,s_qty:10.0,s_dist:7.6,s_non:2.7},
  {id:55037,region:"Arusha",lat:-4.314,lon:36.282,population:197,quantity:"enough",likelihood:0.699,dist_km:3.71,n_nonfunc:10,s_pop:7.5,s_qty:10.0,s_dist:2.5,s_non:7.5},
  {id:55038,region:"Kigoma",lat:-4.731,lon:30.0059,population:234,quantity:"seasonal",likelihood:0.539,dist_km:9.47,n_nonfunc:0,s_pop:8.0,s_qty:7.0,s_dist:6.3,s_non:1.1},
  {id:55039,region:"Kagera",lat:-1.8772,lon:30.9712,population:50,quantity:"insufficient",likelihood:0.18,dist_km:5.13,n_nonfunc:5,s_pop:3.2,s_qty:5.0,s_dist:3.4,s_non:4.0},
  {id:55040,region:"Kilimanjaro",lat:-3.3971,lon:38.0176,population:74,quantity:"insufficient",likelihood:0.744,dist_km:3.82,n_nonfunc:9,s_pop:4.2,s_qty:5.0,s_dist:2.5,s_non:6.7},
  {id:55041,region:"Iringa",lat:-7.5881,lon:35.2939,population:435,quantity:"insufficient",likelihood:0.394,dist_km:8.74,n_nonfunc:9,s_pop:9.3,s_qty:5.0,s_dist:5.8,s_non:6.8},
  {id:55042,region:"Geita",lat:-2.8888,lon:32.0597,population:678,quantity:"enough",likelihood:0.304,dist_km:9.98,n_nonfunc:0,s_pop:9.7,s_qty:10.0,s_dist:6.7,s_non:1.1},
  {id:55043,region:"Tanga",lat:-5.0761,lon:38.1628,population:63,quantity:"enough",likelihood:0.207,dist_km:4.25,n_nonfunc:12,s_pop:3.8,s_qty:10.0,s_dist:2.8,s_non:8.5},
  {id:55044,region:"Njombe",lat:-9.7127,lon:36.0064,population:291,quantity:"enough",likelihood:0.453,dist_km:0.72,n_nonfunc:5,s_pop:8.5,s_qty:10.0,s_dist:1.1,s_non:4.0},
  {id:55045,region:"Mara",lat:-2.4448,lon:34.1982,population:208,quantity:"seasonal",likelihood:0.377,dist_km:1.59,n_nonfunc:5,s_pop:7.7,s_qty:7.0,s_dist:1.3,s_non:4.1},
  {id:55046,region:"Kilimanjaro",lat:-2.8897,lon:37.4432,population:113,quantity:"seasonal",likelihood:0.182,dist_km:5.14,n_nonfunc:7,s_pop:5.8,s_qty:7.0,s_dist:3.4,s_non:5.5},
  {id:55047,region:"Iringa",lat:-7.1339,lon:35.5439,population:443,quantity:"enough",likelihood:0.29,dist_km:9.32,n_nonfunc:0,s_pop:9.3,s_qty:10.0,s_dist:6.2,s_non:1.1},
  {id:55048,region:"Tabora",lat:-4.4123,lon:32.57,population:874,quantity:"dry",likelihood:0.461,dist_km:10.82,n_nonfunc:6,s_pop:9.8,s_qty:2.0,s_dist:7.2,s_non:4.7},
  {id:55049,region:"Lindi",lat:-9.4096,lon:39.026,population:259,quantity:"enough",likelihood:0.134,dist_km:3.81,n_nonfunc:5,s_pop:8.2,s_qty:10.0,s_dist:2.5,s_non:4.1},
  {id:55050,region:"Iringa",lat:-7.8675,lon:35.9767,population:104,quantity:"enough",likelihood:0.113,dist_km:10.73,n_nonfunc:11,s_pop:5.6,s_qty:10.0,s_dist:7.2,s_non:8.0},
  {id:55051,region:"Tanga",lat:-5.0494,lon:38.6582,population:218,quantity:"dry",likelihood:0.307,dist_km:1.86,n_nonfunc:10,s_pop:7.8,s_qty:2.0,s_dist:1.4,s_non:7.6},
  {id:55052,region:"Tanga",lat:-4.784,lon:37.8166,population:91,quantity:"seasonal",likelihood:0.475,dist_km:2.32,n_nonfunc:6,s_pop:5.0,s_qty:7.0,s_dist:1.5,s_non:4.7},
  {id:55053,region:"Iringa",lat:-8.5674,lon:35.3105,population:19,quantity:"enough",likelihood:0.281,dist_km:6.06,n_nonfunc:0,s_pop:1.4,s_qty:10.0,s_dist:4.0,s_non:1.2},
  {id:55054,region:"Mbeya",lat:-8.6819,lon:33.3034,population:9,quantity:"enough",likelihood:0.076,dist_km:0.92,n_nonfunc:8,s_pop:1.1,s_qty:10.0,s_dist:1.1,s_non:6.1},
  {id:55055,region:"Shinyanga",lat:-3.8285,lon:33.7946,population:457,quantity:"enough",likelihood:0.418,dist_km:14.06,n_nonfunc:13,s_pop:9.4,s_qty:10.0,s_dist:8.5,s_non:8.9},
  {id:55056,region:"Kilimanjaro",lat:-3.5987,lon:37.6413,population:127,quantity:"insufficient",likelihood:0.613,dist_km:1.0,n_nonfunc:8,s_pop:6.2,s_qty:5.0,s_dist:1.2,s_non:6.1},
  {id:55057,region:"Mwanza",lat:-2.761,lon:32.1339,population:19,quantity:"enough",likelihood:0.696,dist_km:8.35,n_nonfunc:17,s_pop:1.4,s_qty:10.0,s_dist:5.5,s_non:9.7},
  {id:55058,region:"Kagera",lat:-1.1958,lon:30.8721,population:157,quantity:"enough",likelihood:0.306,dist_km:15.37,n_nonfunc:6,s_pop:6.9,s_qty:10.0,s_dist:9.1,s_non:4.7},
  {id:55059,region:"Kilimanjaro",lat:-3.1448,lon:37.6323,population:43,quantity:"insufficient",likelihood:0.395,dist_km:9.92,n_nonfunc:10,s_pop:2.8,s_qty:5.0,s_dist:6.6,s_non:7.6},
  {id:55060,region:"Pwani",lat:-6.914,lon:38.6368,population:400,quantity:"seasonal",likelihood:0.451,dist_km:17.95,n_nonfunc:6,s_pop:9.2,s_qty:7.0,s_dist:9.5,s_non:4.7},
  {id:55061,region:"Mbeya",lat:-9.2606,lon:32.8622,population:173,quantity:"enough",likelihood:0.398,dist_km:8.43,n_nonfunc:5,s_pop:7.2,s_qty:10.0,s_dist:5.6,s_non:4.1},
  {id:55062,region:"Iringa",lat:-6.9393,lon:35.5518,population:321,quantity:"enough",likelihood:0.923,dist_km:10.39,n_nonfunc:6,s_pop:8.8,s_qty:10.0,s_dist:7.0,s_non:4.8},
  {id:55063,region:"Kilimanjaro",lat:-3.6198,lon:37.2305,population:31,quantity:"seasonal",likelihood:0.473,dist_km:11.27,n_nonfunc:2,s_pop:2.0,s_qty:7.0,s_dist:7.5,s_non:2.4},
  {id:55064,region:"Arusha",lat:-3.9039,lon:36.8465,population:122,quantity:"enough",likelihood:0.22,dist_km:16.26,n_nonfunc:0,s_pop:6.2,s_qty:10.0,s_dist:9.3,s_non:1.2},
  {id:55065,region:"Geita",lat:-2.5429,lon:31.3889,population:205,quantity:"enough",likelihood:0.624,dist_km:7.23,n_nonfunc:15,s_pop:7.7,s_qty:10.0,s_dist:4.9,s_non:9.3},
  {id:55066,region:"Kilimanjaro",lat:-3.6411,lon:37.7887,population:76,quantity:"enough",likelihood:0.459,dist_km:14.78,n_nonfunc:7,s_pop:4.4,s_qty:10.0,s_dist:8.8,s_non:5.5},
  {id:55067,region:"Kilimanjaro",lat:-3.7529,lon:37.4816,population:473,quantity:"seasonal",likelihood:0.665,dist_km:7.38,n_nonfunc:4,s_pop:9.5,s_qty:7.0,s_dist:5.0,s_non:3.3},
  {id:55068,region:"Pwani",lat:-7.1636,lon:38.7127,population:151,quantity:"insufficient",likelihood:0.431,dist_km:5.49,n_nonfunc:4,s_pop:6.8,s_qty:5.0,s_dist:3.7,s_non:3.4},
  {id:55069,region:"Mara",lat:-1.4799,lon:34.8015,population:116,quantity:"seasonal",likelihood:0.098,dist_km:0.96,n_nonfunc:4,s_pop:5.9,s_qty:7.0,s_dist:1.1,s_non:3.4},
  {id:55070,region:"Kilimanjaro",lat:-3.5456,lon:38.3564,population:58,quantity:"enough",likelihood:0.327,dist_km:7.69,n_nonfunc:5,s_pop:3.6,s_qty:10.0,s_dist:5.2,s_non:4.1},
  {id:55071,region:"Dar es Salaam",lat:-6.7997,lon:39.6668,population:36,quantity:"enough",likelihood:0.217,dist_km:11.86,n_nonfunc:6,s_pop:2.4,s_qty:10.0,s_dist:7.7,s_non:4.8},
  {id:55072,region:"Shinyanga",lat:-3.6441,lon:33.528,population:465,quantity:"seasonal",likelihood:0.218,dist_km:9.29,n_nonfunc:0,s_pop:9.4,s_qty:7.0,s_dist:6.1,s_non:1.2},
  {id:55073,region:"Shinyanga",lat:-3.5481,lon:33.5561,population:16,quantity:"enough",likelihood:0.73,dist_km:10.5,n_nonfunc:12,s_pop:1.3,s_qty:10.0,s_dist:7.1,s_non:8.5},
  {id:55074,region:"Lindi",lat:-9.7872,lon:38.9181,population:136,quantity:"enough",likelihood:0.24,dist_km:7.78,n_nonfunc:10,s_pop:6.4,s_qty:10.0,s_dist:5.2,s_non:7.6},
  {id:55075,region:"Manyara",lat:-4.3479,lon:36.484,population:169,quantity:"seasonal",likelihood:0.385,dist_km:7.4,n_nonfunc:1,s_pop:7.0,s_qty:7.0,s_dist:5.0,s_non:2.2},
  {id:55076,region:"Njombe",lat:-9.1737,lon:33.6226,population:94,quantity:"enough",likelihood:0.211,dist_km:9.59,n_nonfunc:4,s_pop:5.1,s_qty:10.0,s_dist:6.4,s_non:3.4},
  {id:55077,region:"Rukwa",lat:-7.6307,lon:31.2549,population:75,quantity:"dry",likelihood:0.606,dist_km:9.05,n_nonfunc:17,s_pop:4.3,s_qty:2.0,s_dist:6.0,s_non:9.7},
  {id:55078,region:"Singida",lat:-4.7844,lon:35.1688,population:28,quantity:"enough",likelihood:0.76,dist_km:5.03,n_nonfunc:11,s_pop:1.9,s_qty:10.0,s_dist:3.3,s_non:8.1},
  {id:55079,region:"Kigoma",lat:-4.8146,lon:29.6064,population:119,quantity:"insufficient",likelihood:0.522,dist_km:11.92,n_nonfunc:4,s_pop:6.1,s_qty:5.0,s_dist:7.8,s_non:3.4},
  {id:55080,region:"Manyara",lat:-4.9594,lon:36.3957,population:107,quantity:"seasonal",likelihood:0.676,dist_km:3.35,n_nonfunc:12,s_pop:5.7,s_qty:7.0,s_dist:2.3,s_non:8.5},
  {id:55081,region:"Mbeya",lat:-8.6322,lon:33.1718,population:32,quantity:"enough",likelihood:0.353,dist_km:8.75,n_nonfunc:4,s_pop:2.1,s_qty:10.0,s_dist:5.9,s_non:3.4},
  {id:55082,region:"Kilimanjaro",lat:-3.1102,lon:37.029,population:96,quantity:"seasonal",likelihood:0.234,dist_km:4.86,n_nonfunc:4,s_pop:5.2,s_qty:7.0,s_dist:3.2,s_non:3.5},
  {id:55083,region:"Tanga",lat:-5.0941,lon:37.3259,population:226,quantity:"dry",likelihood:0.086,dist_km:21.2,n_nonfunc:16,s_pop:7.9,s_qty:2.0,s_dist:9.8,s_non:9.5},
  {id:55084,region:"Singida",lat:-4.3979,lon:34.6799,population:204,quantity:"insufficient",likelihood:0.287,dist_km:17.31,n_nonfunc:9,s_pop:7.6,s_qty:5.0,s_dist:9.5,s_non:6.8},
  {id:55085,region:"Morogoro",lat:-7.0796,lon:36.9188,population:280,quantity:"insufficient",likelihood:0.035,dist_km:1.74,n_nonfunc:11,s_pop:8.3,s_qty:5.0,s_dist:1.4,s_non:8.1},
  {id:55086,region:"Manyara",lat:-3.7935,lon:35.4875,population:296,quantity:"dry",likelihood:0.091,dist_km:6.45,n_nonfunc:0,s_pop:8.5,s_qty:2.0,s_dist:4.4,s_non:1.2},
  {id:55087,region:"Tanga",lat:-5.0234,lon:38.9863,population:19,quantity:"insufficient",likelihood:0.25,dist_km:8.42,n_nonfunc:11,s_pop:1.4,s_qty:5.0,s_dist:5.5,s_non:8.1},
  {id:55088,region:"Mtwara",lat:-10.2316,lon:39.9476,population:548,quantity:"seasonal",likelihood:0.462,dist_km:9.48,n_nonfunc:12,s_pop:9.6,s_qty:7.0,s_dist:6.4,s_non:8.6},
  {id:55089,region:"Iringa",lat:-7.6671,lon:35.4891,population:46,quantity:"enough",likelihood:0.02,dist_km:11.91,n_nonfunc:7,s_pop:3.0,s_qty:10.0,s_dist:7.7,s_non:5.5},
  {id:55090,region:"Kagera",lat:-1.297,lon:31.5932,population:148,quantity:"enough",likelihood:0.732,dist_km:9.71,n_nonfunc:16,s_pop:6.7,s_qty:10.0,s_dist:6.5,s_non:9.5},
  {id:55091,region:"Iringa",lat:-8.216,lon:35.423,population:6,quantity:"seasonal",likelihood:0.734,dist_km:12.66,n_nonfunc:14,s_pop:1.1,s_qty:7.0,s_dist:8.1,s_non:9.0},
  {id:55092,region:"Morogoro",lat:-8.065,lon:36.7082,population:47,quantity:"enough",likelihood:0.486,dist_km:7.37,n_nonfunc:12,s_pop:3.1,s_qty:10.0,s_dist:5.0,s_non:8.6},
  {id:55093,region:"Njombe",lat:-9.1317,lon:35.2685,population:35,quantity:"insufficient",likelihood:0.294,dist_km:8.95,n_nonfunc:4,s_pop:2.3,s_qty:5.0,s_dist:6.0,s_non:3.5},
  {id:55094,region:"Iringa",lat:-7.9823,lon:35.3698,population:71,quantity:"unknown",likelihood:0.172,dist_km:10.82,n_nonfunc:4,s_pop:4.2,s_qty:5.0,s_dist:7.3,s_non:3.5},
  {id:55095,region:"Mtwara",lat:-9.8763,lon:40.0286,population:56,quantity:"enough",likelihood:0.688,dist_km:5.24,n_nonfunc:15,s_pop:3.5,s_qty:10.0,s_dist:3.5,s_non:9.3},
  {id:55096,region:"Iringa",lat:-7.9672,lon:35.5945,population:54,quantity:"enough",likelihood:0.328,dist_km:6.08,n_nonfunc:4,s_pop:3.5,s_qty:10.0,s_dist:4.1,s_non:3.5},
  {id:55097,region:"Morogoro",lat:-8.1171,lon:36.3206,population:2499,quantity:"enough",likelihood:0.533,dist_km:14.92,n_nonfunc:8,s_pop:10.0,s_qty:10.0,s_dist:8.8,s_non:6.1},
  {id:55098,region:"Mwanza",lat:-2.601,lon:32.232,population:69,quantity:"seasonal",likelihood:0.244,dist_km:0.96,n_nonfunc:10,s_pop:4.1,s_qty:7.0,s_dist:1.2,s_non:7.7},
  {id:55099,region:"Mwanza",lat:-3.2319,lon:32.8309,population:359,quantity:"enough",likelihood:0.289,dist_km:19.33,n_nonfunc:3,s_pop:9.0,s_qty:10.0,s_dist:9.7,s_non:2.8},
  {id:55100,region:"Dodoma",lat:-6.8127,lon:35.8046,population:26,quantity:"insufficient",likelihood:0.231,dist_km:19.99,n_nonfunc:5,s_pop:1.9,s_qty:5.0,s_dist:9.8,s_non:4.2},
  {id:55101,region:"Mtwara",lat:-9.9611,lon:40.0865,population:301,quantity:"insufficient",likelihood:0.247,dist_km:4.37,n_nonfunc:9,s_pop:8.6,s_qty:5.0,s_dist:2.9,s_non:6.8},
  {id:55102,region:"Dodoma",lat:-6.1609,lon:34.9208,population:32,quantity:"dry",likelihood:0.568,dist_km:5.94,n_nonfunc:6,s_pop:2.1,s_qty:2.0,s_dist:3.9,s_non:4.8},
  {id:55103,region:"Mwanza",lat:-2.9603,lon:32.831,population:18,quantity:"enough",likelihood:0.715,dist_km:12.54,n_nonfunc:20,s_pop:1.4,s_qty:10.0,s_dist:8.0,s_non:9.9},
  {id:55104,region:"Iringa",lat:-7.8892,lon:35.2746,population:24,quantity:"enough",likelihood:0.074,dist_km:13.2,n_nonfunc:7,s_pop:1.8,s_qty:10.0,s_dist:8.3,s_non:5.5},
  {id:55105,region:"Geita",lat:-2.318,lon:32.1436,population:154,quantity:"seasonal",likelihood:0.084,dist_km:7.27,n_nonfunc:14,s_pop:6.8,s_qty:7.0,s_dist:5.0,s_non:9.0},
  {id:55106,region:"Shinyanga",lat:-3.8472,lon:33.4227,population:208,quantity:"insufficient",likelihood:0.173,dist_km:2.53,n_nonfunc:8,s_pop:7.8,s_qty:5.0,s_dist:1.6,s_non:6.1},
  {id:55107,region:"Tabora",lat:-5.1019,lon:32.911,population:95,quantity:"seasonal",likelihood:0.288,dist_km:4.11,n_nonfunc:0,s_pop:5.2,s_qty:7.0,s_dist:2.7,s_non:1.3},
  {id:55108,region:"Mara",lat:-1.2509,lon:34.2955,population:67,quantity:"seasonal",likelihood:0.6,dist_km:8.2,n_nonfunc:6,s_pop:4.1,s_qty:7.0,s_dist:5.5,s_non:4.8},
  {id:55109,region:"Mbeya",lat:-9.114,lon:33.4519,population:14,quantity:"enough",likelihood:0.477,dist_km:10.7,n_nonfunc:7,s_pop:1.2,s_qty:10.0,s_dist:7.2,s_non:5.6},
  {id:55110,region:"Dar es Salaam",lat:-6.8976,lon:38.7823,population:44,quantity:"insufficient",likelihood:0.224,dist_km:2.09,n_nonfunc:4,s_pop:2.8,s_qty:5.0,s_dist:1.5,s_non:3.6},
  {id:55111,region:"Singida",lat:-4.2226,lon:34.8996,population:23,quantity:"dry",likelihood:0.707,dist_km:5.13,n_nonfunc:1,s_pop:1.7,s_qty:2.0,s_dist:3.4,s_non:2.3},
  {id:55112,region:"Mwanza",lat:-2.4769,lon:33.1085,population:180,quantity:"enough",likelihood:0.271,dist_km:10.56,n_nonfunc:9,s_pop:7.3,s_qty:10.0,s_dist:7.1,s_non:6.8},
  {id:55113,region:"Dodoma",lat:-6.1366,lon:36.1357,population:46,quantity:"insufficient",likelihood:0.239,dist_km:3.65,n_nonfunc:9,s_pop:3.0,s_qty:5.0,s_dist:2.5,s_non:6.9},
  {id:55114,region:"Iringa",lat:-6.7157,lon:35.7982,population:237,quantity:"seasonal",likelihood:0.1,dist_km:15.24,n_nonfunc:12,s_pop:8.0,s_qty:7.0,s_dist:8.9,s_non:8.6},
  {id:55115,region:"Shinyanga",lat:-3.5729,lon:33.7412,population:1580,quantity:"insufficient",likelihood:0.337,dist_km:2.83,n_nonfunc:14,s_pop:10.0,s_qty:5.0,s_dist:2.0,s_non:9.1},
  {id:55116,region:"Tanga",lat:-5.4224,lon:38.7618,population:305,quantity:"enough",likelihood:0.177,dist_km:9.31,n_nonfunc:12,s_pop:8.7,s_qty:10.0,s_dist:6.2,s_non:8.6},
  {id:55117,region:"Ruvuma",lat:-10.4437,lon:36.5444,population:24,quantity:"enough",likelihood:0.467,dist_km:2.41,n_nonfunc:4,s_pop:1.8,s_qty:10.0,s_dist:1.6,s_non:3.6},
  {id:55118,region:"Mwanza",lat:-2.3131,lon:32.8678,population:66,quantity:"enough",likelihood:0.814,dist_km:6.59,n_nonfunc:15,s_pop:4.0,s_qty:10.0,s_dist:4.5,s_non:9.3},
  {id:55119,region:"Pwani",lat:-6.8014,lon:38.6049,population:357,quantity:"enough",likelihood:0.207,dist_km:8.91,n_nonfunc:2,s_pop:9.0,s_qty:10.0,s_dist:6.0,s_non:2.5},
  {id:55120,region:"Shinyanga",lat:-3.4357,lon:33.3411,population:29,quantity:"dry",likelihood:0.175,dist_km:2.33,n_nonfunc:11,s_pop:2.0,s_qty:2.0,s_dist:1.6,s_non:8.1},
  {id:55121,region:"Dar es Salaam",lat:-6.4287,lon:40.1222,population:364,quantity:"enough",likelihood:0.612,dist_km:6.4,n_nonfunc:8,s_pop:9.1,s_qty:10.0,s_dist:4.4,s_non:6.2},
  {id:55122,region:"Tanga",lat:-5.3931,lon:38.7381,population:248,quantity:"insufficient",likelihood:0.233,dist_km:9.24,n_nonfunc:15,s_pop:8.1,s_qty:5.0,s_dist:6.1,s_non:9.4},
  {id:55123,region:"Iringa",lat:-7.6846,lon:35.5979,population:67,quantity:"seasonal",likelihood:0.684,dist_km:6.98,n_nonfunc:16,s_pop:4.1,s_qty:7.0,s_dist:4.8,s_non:9.6},
  {id:55124,region:"Rukwa",lat:-7.9689,lon:32.1077,population:64,quantity:"insufficient",likelihood:0.289,dist_km:11.75,n_nonfunc:4,s_pop:3.8,s_qty:5.0,s_dist:7.7,s_non:3.6},
  {id:55125,region:"Shinyanga",lat:-3.8802,lon:33.2947,population:118,quantity:"seasonal",likelihood:0.174,dist_km:3.96,n_nonfunc:17,s_pop:6.0,s_qty:7.0,s_dist:2.6,s_non:9.7},
  {id:55126,region:"Arusha",lat:-3.5887,lon:36.4598,population:179,quantity:"enough",likelihood:0.211,dist_km:6.84,n_nonfunc:15,s_pop:7.2,s_qty:10.0,s_dist:4.7,s_non:9.4},
  {id:55127,region:"Njombe",lat:-9.5561,lon:34.5368,population:53,quantity:"seasonal",likelihood:0.176,dist_km:5.54,n_nonfunc:5,s_pop:3.4,s_qty:7.0,s_dist:3.7,s_non:4.2},
  {id:55128,region:"Dar es Salaam",lat:-6.1299,lon:37.8263,population:94,quantity:"insufficient",likelihood:0.379,dist_km:4.35,n_nonfunc:5,s_pop:5.1,s_qty:5.0,s_dist:2.9,s_non:4.2},
  {id:55129,region:"Dar es Salaam",lat:-7.272,lon:39.235,population:166,quantity:"enough",likelihood:0.311,dist_km:13.07,n_nonfunc:17,s_pop:7.0,s_qty:10.0,s_dist:8.2,s_non:9.7},
  {id:55130,region:"Morogoro",lat:-8.0376,lon:36.5588,population:48,quantity:"enough",likelihood:0.285,dist_km:14.93,n_nonfunc:0,s_pop:3.1,s_qty:10.0,s_dist:8.8,s_non:1.3},
  {id:55131,region:"Mbeya",lat:-9.224,lon:34.2044,population:28,quantity:"seasonal",likelihood:0.621,dist_km:8.56,n_nonfunc:9,s_pop:1.9,s_qty:7.0,s_dist:5.7,s_non:6.9},
  {id:55132,region:"Manyara",lat:-3.7192,lon:36.0419,population:129,quantity:"seasonal",likelihood:0.171,dist_km:5.19,n_nonfunc:7,s_pop:6.3,s_qty:7.0,s_dist:3.5,s_non:5.6},
  {id:55133,region:"Iringa",lat:-8.1069,lon:36.0654,population:38,quantity:"insufficient",likelihood:0.252,dist_km:15.04,n_nonfunc:4,s_pop:2.5,s_qty:5.0,s_dist:8.9,s_non:3.6},
  {id:55134,region:"Rukwa",lat:-7.721,lon:31.9344,population:80,quantity:"enough",likelihood:0.349,dist_km:5.01,n_nonfunc:2,s_pop:4.5,s_qty:10.0,s_dist:3.3,s_non:2.5},
  {id:55135,region:"Tanga",lat:-5.0241,lon:38.4101,population:32,quantity:"enough",likelihood:0.275,dist_km:7.61,n_nonfunc:8,s_pop:2.1,s_qty:10.0,s_dist:5.2,s_non:6.2},
  {id:55136,region:"Dar es Salaam",lat:-7.0787,lon:38.5231,population:189,quantity:"enough",likelihood:0.838,dist_km:12.62,n_nonfunc:9,s_pop:7.4,s_qty:10.0,s_dist:8.0,s_non:6.9},
  {id:55137,region:"Tanga",lat:-5.2705,lon:38.5976,population:402,quantity:"dry",likelihood:0.39,dist_km:2.74,n_nonfunc:3,s_pop:9.2,s_qty:2.0,s_dist:1.9,s_non:2.8},
  {id:55138,region:"Pwani",lat:-7.4937,lon:38.4629,population:160,quantity:"dry",likelihood:0.433,dist_km:4.75,n_nonfunc:6,s_pop:6.9,s_qty:2.0,s_dist:3.1,s_non:4.8},
  {id:55139,region:"Tabora",lat:-4.7974,lon:32.1878,population:1216,quantity:"enough",likelihood:0.224,dist_km:11.4,n_nonfunc:9,s_pop:9.9,s_qty:10.0,s_dist:7.5,s_non:6.9},
  {id:55140,region:"Morogoro",lat:-7.7303,lon:37.5345,population:144,quantity:"seasonal",likelihood:0.273,dist_km:3.21,n_nonfunc:6,s_pop:6.6,s_qty:7.0,s_dist:2.2,s_non:4.9},
  {id:55141,region:"Manyara",lat:-4.4716,lon:36.0297,population:89,quantity:"enough",likelihood:0.465,dist_km:9.82,n_nonfunc:7,s_pop:5.0,s_qty:10.0,s_dist:6.6,s_non:5.6},
  {id:55142,region:"Iringa",lat:-7.7823,lon:35.131,population:97,quantity:"enough",likelihood:0.463,dist_km:2.75,n_nonfunc:9,s_pop:5.3,s_qty:10.0,s_dist:1.9,s_non:7.0},
  {id:55143,region:"Tabora",lat:-5.3094,lon:32.6937,population:172,quantity:"insufficient",likelihood:0.174,dist_km:10.19,n_nonfunc:8,s_pop:7.1,s_qty:5.0,s_dist:6.8,s_non:6.2},
  {id:55144,region:"Rukwa",lat:-8.8734,lon:30.9514,population:96,quantity:"enough",likelihood:0.113,dist_km:9.33,n_nonfunc:7,s_pop:5.3,s_qty:10.0,s_dist:6.2,s_non:5.7},
  {id:55145,region:"Iringa",lat:-8.0921,lon:35.4527,population:302,quantity:"seasonal",likelihood:0.134,dist_km:4.65,n_nonfunc:8,s_pop:8.6,s_qty:7.0,s_dist:3.0,s_non:6.2},
  {id:55146,region:"Dar es Salaam",lat:-7.0978,lon:38.7701,population:252,quantity:"seasonal",likelihood:0.39,dist_km:7.9,n_nonfunc:14,s_pop:8.1,s_qty:7.0,s_dist:5.3,s_non:9.1},
  {id:55147,region:"Kigoma",lat:-4.7939,lon:29.7965,population:25,quantity:"enough",likelihood:0.648,dist_km:2.9,n_nonfunc:15,s_pop:1.8,s_qty:10.0,s_dist:2.0,s_non:9.4},
  {id:55148,region:"Iringa",lat:-8.4283,lon:34.8837,population:19,quantity:"insufficient",likelihood:0.379,dist_km:8.44,n_nonfunc:3,s_pop:1.4,s_qty:5.0,s_dist:5.6,s_non:2.8},
  {id:55149,region:"Singida",lat:-5.2876,lon:34.9428,population:189,quantity:"enough",likelihood:0.439,dist_km:12.74,n_nonfunc:9,s_pop:7.4,s_qty:10.0,s_dist:8.1,s_non:7.0},
  {id:55150,region:"Mtwara",lat:-10.2817,lon:40.2143,population:298,quantity:"enough",likelihood:0.186,dist_km:9.3,n_nonfunc:11,s_pop:8.6,s_qty:10.0,s_dist:6.1,s_non:8.1},
  {id:55151,region:"Shinyanga",lat:-3.7466,lon:33.5049,population:104,quantity:"unknown",likelihood:0.781,dist_km:3.32,n_nonfunc:8,s_pop:5.7,s_qty:5.0,s_dist:2.3,s_non:6.3},
  {id:55152,region:"Mwanza",lat:-2.59,lon:33.1458,population:547,quantity:"seasonal",likelihood:0.29,dist_km:11.55,n_nonfunc:11,s_pop:9.5,s_qty:7.0,s_dist:7.6,s_non:8.2},
  {id:55153,region:"Mbeya",lat:-9.0635,lon:32.856,population:92,quantity:"seasonal",likelihood:0.138,dist_km:10.41,n_nonfunc:3,s_pop:5.0,s_qty:7.0,s_dist:7.0,s_non:2.8},
  {id:55154,region:"Mtwara",lat:-10.5057,lon:39.7127,population:61,quantity:"seasonal",likelihood:0.059,dist_km:14.49,n_nonfunc:0,s_pop:3.8,s_qty:7.0,s_dist:8.7,s_non:1.3},
  {id:55155,region:"Mwanza",lat:-2.4833,lon:31.7174,population:281,quantity:"enough",likelihood:0.362,dist_km:7.81,n_nonfunc:8,s_pop:8.4,s_qty:10.0,s_dist:5.3,s_non:6.3},
  {id:55156,region:"Morogoro",lat:-7.9245,lon:36.977,population:95,quantity:"enough",likelihood:0.817,dist_km:5.29,n_nonfunc:7,s_pop:5.2,s_qty:10.0,s_dist:3.5,s_non:5.7},
  {id:55157,region:"Kagera",lat:-1.8878,lon:30.9294,population:19,quantity:"seasonal",likelihood:0.298,dist_km:15.78,n_nonfunc:10,s_pop:1.5,s_qty:7.0,s_dist:9.2,s_non:7.7},
  {id:55158,region:"Arusha",lat:-3.3039,lon:37.2376,population:131,quantity:"enough",likelihood:0.264,dist_km:4.69,n_nonfunc:9,s_pop:6.3,s_qty:10.0,s_dist:3.1,s_non:7.0},
  {id:55159,region:"Geita",lat:-2.6703,lon:32.3382,population:148,quantity:"seasonal",likelihood:0.458,dist_km:10.94,n_nonfunc:0,s_pop:6.7,s_qty:7.0,s_dist:7.4,s_non:1.4},
  {id:55160,region:"Arusha",lat:-3.0983,lon:36.5111,population:688,quantity:"enough",likelihood:0.43,dist_km:8.04,n_nonfunc:10,s_pop:9.8,s_qty:10.0,s_dist:5.4,s_non:7.7},
  {id:55161,region:"Mbeya",lat:-8.3725,lon:32.7602,population:179,quantity:"insufficient",likelihood:0.489,dist_km:6.14,n_nonfunc:9,s_pop:7.2,s_qty:5.0,s_dist:4.1,s_non:7.0},
  {id:55162,region:"Dodoma",lat:-6.2285,lon:35.3681,population:97,quantity:"enough",likelihood:0.126,dist_km:10.29,n_nonfunc:12,s_pop:5.3,s_qty:10.0,s_dist:6.9,s_non:8.6},
  {id:55163,region:"Mbeya",lat:-9.5441,lon:33.2919,population:192,quantity:"seasonal",likelihood:0.504,dist_km:5.73,n_nonfunc:11,s_pop:7.4,s_qty:7.0,s_dist:3.8,s_non:8.2},
  {id:55164,region:"Dodoma",lat:-5.7348,lon:35.724,population:47,quantity:"enough",likelihood:0.582,dist_km:1.31,n_nonfunc:3,s_pop:3.1,s_qty:10.0,s_dist:1.2,s_non:2.8},
  {id:55165,region:"Njombe",lat:-9.3753,lon:34.564,population:734,quantity:"enough",likelihood:0.146,dist_km:13.86,n_nonfunc:1,s_pop:9.8,s_qty:10.0,s_dist:8.5,s_non:2.3},
  {id:55166,region:"Mwanza",lat:-1.848,lon:32.8335,population:38,quantity:"enough",likelihood:0.594,dist_km:5.75,n_nonfunc:2,s_pop:2.5,s_qty:10.0,s_dist:3.9,s_non:2.5},
  {id:55167,region:"Shinyanga",lat:-2.9568,lon:33.3081,population:37,quantity:"insufficient",likelihood:0.861,dist_km:6.69,n_nonfunc:6,s_pop:2.4,s_qty:5.0,s_dist:4.7,s_non:4.9},
  {id:55168,region:"Kigoma",lat:-5.1798,lon:30.0654,population:313,quantity:"insufficient",likelihood:0.225,dist_km:14.75,n_nonfunc:3,s_pop:8.8,s_qty:5.0,s_dist:8.8,s_non:2.9},
  {id:55169,region:"Rukwa",lat:-8.924,lon:31.3519,population:181,quantity:"insufficient",likelihood:0.477,dist_km:4.61,n_nonfunc:8,s_pop:7.3,s_qty:5.0,s_dist:3.0,s_non:6.3},
  {id:55170,region:"Tabora",lat:-4.7467,lon:32.8036,population:101,quantity:"insufficient",likelihood:0.514,dist_km:4.44,n_nonfunc:13,s_pop:5.4,s_qty:5.0,s_dist:2.9,s_non:8.9},
  {id:55171,region:"Geita",lat:-2.6037,lon:32.2893,population:612,quantity:"seasonal",likelihood:0.387,dist_km:4.95,n_nonfunc:4,s_pop:9.6,s_qty:7.0,s_dist:3.2,s_non:3.7},
  {id:55172,region:"Singida",lat:-4.4646,lon:35.0425,population:220,quantity:"enough",likelihood:0.136,dist_km:15.04,n_nonfunc:3,s_pop:7.8,s_qty:10.0,s_dist:8.9,s_non:2.9},
  {id:55173,region:"Manyara",lat:-4.9255,lon:35.252,population:114,quantity:"dry",likelihood:0.265,dist_km:4.18,n_nonfunc:5,s_pop:5.8,s_qty:2.0,s_dist:2.7,s_non:4.2},
  {id:55174,region:"Mtwara",lat:-9.9625,lon:40.4,population:45,quantity:"enough",likelihood:0.338,dist_km:7.24,n_nonfunc:4,s_pop:2.9,s_qty:10.0,s_dist:5.0,s_non:3.7},
  {id:55175,region:"Ruvuma",lat:-10.7023,lon:35.3631,population:172,quantity:"seasonal",likelihood:0.196,dist_km:11.29,n_nonfunc:0,s_pop:7.1,s_qty:7.0,s_dist:7.5,s_non:1.4},
  {id:55176,region:"Mara",lat:-1.406,lon:34.2818,population:82,quantity:"seasonal",likelihood:0.047,dist_km:2.37,n_nonfunc:7,s_pop:4.6,s_qty:7.0,s_dist:1.6,s_non:5.7},
  {id:55177,region:"Arusha",lat:-3.8756,lon:36.7919,population:82,quantity:"enough",likelihood:0.517,dist_km:2.68,n_nonfunc:9,s_pop:4.6,s_qty:10.0,s_dist:1.8,s_non:7.1},
  {id:55178,region:"Morogoro",lat:-8.1484,lon:37.2585,population:269,quantity:"seasonal",likelihood:0.598,dist_km:14.21,n_nonfunc:3,s_pop:8.3,s_qty:7.0,s_dist:8.6,s_non:2.9},
  {id:55179,region:"Arusha",lat:-2.9002,lon:36.3571,population:52,quantity:"seasonal",likelihood:0.213,dist_km:8.44,n_nonfunc:0,s_pop:3.4,s_qty:7.0,s_dist:5.7,s_non:1.4},
  {id:55180,region:"Dodoma",lat:-6.0332,lon:35.7241,population:457,quantity:"enough",likelihood:0.166,dist_km:10.32,n_nonfunc:8,s_pop:9.4,s_qty:10.0,s_dist:6.9,s_non:6.3},
  {id:55181,region:"Pwani",lat:-6.7346,lon:38.2383,population:145,quantity:"seasonal",likelihood:0.209,dist_km:12.97,n_nonfunc:12,s_pop:6.6,s_qty:7.0,s_dist:8.2,s_non:8.7},
  {id:55182,region:"Dar es Salaam",lat:-7.019,lon:38.6821,population:277,quantity:"seasonal",likelihood:0.469,dist_km:16.2,n_nonfunc:0,s_pop:8.3,s_qty:7.0,s_dist:9.3,s_non:1.4},
  {id:55183,region:"Shinyanga",lat:-3.9691,lon:33.9235,population:168,quantity:"enough",likelihood:0.444,dist_km:6.2,n_nonfunc:0,s_pop:7.0,s_qty:10.0,s_dist:4.2,s_non:1.4},
  {id:55184,region:"Mbeya",lat:-9.4101,lon:33.5422,population:640,quantity:"enough",likelihood:0.281,dist_km:13.17,n_nonfunc:8,s_pop:9.7,s_qty:10.0,s_dist:8.2,s_non:6.4},
  {id:55185,region:"Mwanza",lat:-3.1103,lon:32.6713,population:372,quantity:"enough",likelihood:0.246,dist_km:5.62,n_nonfunc:8,s_pop:9.1,s_qty:10.0,s_dist:3.8,s_non:6.4},
  {id:55186,region:"Lindi",lat:-10.471,lon:38.6317,population:38,quantity:"seasonal",likelihood:0.102,dist_km:4.83,n_nonfunc:3,s_pop:2.5,s_qty:7.0,s_dist:3.2,s_non:3.0},
  {id:55187,region:"Iringa",lat:-8.0791,lon:36.182,population:40,quantity:"unknown",likelihood:0.085,dist_km:11.25,n_nonfunc:0,s_pop:2.6,s_qty:5.0,s_dist:7.5,s_non:1.5},
  {id:55188,region:"Morogoro",lat:-7.7605,lon:36.8944,population:5,quantity:"enough",likelihood:0.587,dist_km:2.8,n_nonfunc:9,s_pop:1.0,s_qty:10.0,s_dist:2.0,s_non:7.1},
  {id:55189,region:"Kagera",lat:-1.4904,lon:31.5743,population:37,quantity:"seasonal",likelihood:0.706,dist_km:4.76,n_nonfunc:12,s_pop:2.4,s_qty:7.0,s_dist:3.1,s_non:8.7},
  {id:55190,region:"Tanga",lat:-5.0143,lon:37.8704,population:28,quantity:"insufficient",likelihood:0.464,dist_km:10.42,n_nonfunc:9,s_pop:2.0,s_qty:5.0,s_dist:7.1,s_non:7.1},
  {id:55191,region:"Geita",lat:-3.0733,lon:31.2894,population:50,quantity:"enough",likelihood:0.396,dist_km:19.59,n_nonfunc:14,s_pop:3.3,s_qty:10.0,s_dist:9.7,s_non:9.1},
  {id:55192,region:"Iringa",lat:-7.954,lon:35.7032,population:325,quantity:"enough",likelihood:0.083,dist_km:6.92,n_nonfunc:4,s_pop:8.8,s_qty:10.0,s_dist:4.8,s_non:3.7},
  {id:55193,region:"Pwani",lat:-7.4387,lon:37.9721,population:21,quantity:"enough",likelihood:0.826,dist_km:10.21,n_nonfunc:10,s_pop:1.6,s_qty:10.0,s_dist:6.8,s_non:7.7},
  {id:55194,region:"Lindi",lat:-9.864,lon:39.2591,population:84,quantity:"enough",likelihood:0.513,dist_km:11.42,n_nonfunc:3,s_pop:4.7,s_qty:10.0,s_dist:7.5,s_non:3.0},
  {id:55195,region:"Shinyanga",lat:-3.6938,lon:32.7523,population:201,quantity:"seasonal",likelihood:0.338,dist_km:7.12,n_nonfunc:0,s_pop:7.5,s_qty:7.0,s_dist:4.9,s_non:1.5},
  {id:55196,region:"Mbeya",lat:-9.1444,lon:34.0732,population:52,quantity:"enough",likelihood:0.127,dist_km:3.56,n_nonfunc:0,s_pop:3.4,s_qty:10.0,s_dist:2.4,s_non:1.5},
  {id:55197,region:"Shinyanga",lat:-3.7169,lon:34.495,population:83,quantity:"dry",likelihood:0.115,dist_km:14.1,n_nonfunc:8,s_pop:4.7,s_qty:2.0,s_dist:8.6,s_non:6.4},
  {id:55198,region:"Iringa",lat:-7.9067,lon:36.0423,population:268,quantity:"enough",likelihood:0.742,dist_km:2.77,n_nonfunc:12,s_pop:8.2,s_qty:10.0,s_dist:1.9,s_non:8.7},
  {id:55199,region:"Mara",lat:-1.1961,lon:34.9019,population:94,quantity:"seasonal",likelihood:0.207,dist_km:10.08,n_nonfunc:2,s_pop:5.2,s_qty:7.0,s_dist:6.7,s_non:2.5},
  {id:55200,region:"Morogoro",lat:-7.7633,lon:37.6192,population:206,quantity:"seasonal",likelihood:0.61,dist_km:15.95,n_nonfunc:3,s_pop:7.7,s_qty:7.0,s_dist:9.2,s_non:3.0},
  {id:55201,region:"Kilimanjaro",lat:-4.0226,lon:38.1637,population:467,quantity:"seasonal",likelihood:0.461,dist_km:8.69,n_nonfunc:0,s_pop:9.5,s_qty:7.0,s_dist:5.8,s_non:1.5},
  {id:55202,region:"Ruvuma",lat:-10.1187,lon:35.5878,population:59,quantity:"enough",likelihood:0.74,dist_km:18.9,n_nonfunc:20,s_pop:3.7,s_qty:10.0,s_dist:9.6,s_non:9.9},
  {id:55203,region:"Mwanza",lat:-2.7722,lon:32.22,population:116,quantity:"insufficient",likelihood:0.303,dist_km:10.73,n_nonfunc:18,s_pop:5.9,s_qty:5.0,s_dist:7.2,s_non:9.8},
  {id:55204,region:"Shinyanga",lat:-4.1013,lon:33.4687,population:108,quantity:"enough",likelihood:0.337,dist_km:9.41,n_nonfunc:3,s_pop:5.8,s_qty:10.0,s_dist:6.3,s_non:3.0},
  {id:55205,region:"Iringa",lat:-8.1779,lon:35.687,population:44,quantity:"seasonal",likelihood:0.077,dist_km:4.33,n_nonfunc:0,s_pop:2.8,s_qty:7.0,s_dist:2.8,s_non:1.6},
  {id:55206,region:"Kilimanjaro",lat:-3.3711,lon:38.3726,population:41,quantity:"dry",likelihood:0.611,dist_km:4.71,n_nonfunc:6,s_pop:2.7,s_qty:2.0,s_dist:3.1,s_non:4.9},
  {id:55207,region:"Morogoro",lat:-7.9826,lon:37.3968,population:201,quantity:"enough",likelihood:0.126,dist_km:15.27,n_nonfunc:1,s_pop:7.6,s_qty:10.0,s_dist:9.0,s_non:2.3},
  {id:55208,region:"Tanga",lat:-5.0745,lon:38.2848,population:165,quantity:"enough",likelihood:0.373,dist_km:6.25,n_nonfunc:8,s_pop:6.9,s_qty:10.0,s_dist:4.3,s_non:6.4},
  {id:55209,region:"Kilimanjaro",lat:-4.1036,lon:37.1192,population:75,quantity:"enough",likelihood:0.776,dist_km:12.14,n_nonfunc:7,s_pop:4.3,s_qty:10.0,s_dist:7.8,s_non:5.7},
  {id:55210,region:"Lindi",lat:-9.7502,lon:39.4033,population:212,quantity:"insufficient",likelihood:0.383,dist_km:10.41,n_nonfunc:0,s_pop:7.8,s_qty:5.0,s_dist:7.0,s_non:1.6},
  {id:55211,region:"Shinyanga",lat:-4.1695,lon:33.9353,population:19,quantity:"seasonal",likelihood:0.065,dist_km:15.8,n_nonfunc:3,s_pop:1.5,s_qty:7.0,s_dist:9.2,s_non:3.0},
  {id:55212,region:"Shinyanga",lat:-4.2851,lon:32.9973,population:286,quantity:"enough",likelihood:0.254,dist_km:15.24,n_nonfunc:16,s_pop:8.5,s_qty:10.0,s_dist:9.0,s_non:9.6},
  {id:55213,region:"Morogoro",lat:-7.9077,lon:36.7386,population:27,quantity:"dry",likelihood:0.055,dist_km:1.83,n_nonfunc:4,s_pop:1.9,s_qty:2.0,s_dist:1.4,s_non:3.8},
  {id:55214,region:"Shinyanga",lat:-3.0742,lon:33.1383,population:141,quantity:"unknown",likelihood:0.575,dist_km:7.44,n_nonfunc:3,s_pop:6.5,s_qty:5.0,s_dist:5.1,s_non:3.1},
  {id:55215,region:"Shinyanga",lat:-3.7683,lon:33.8368,population:87,quantity:"enough",likelihood:0.609,dist_km:7.64,n_nonfunc:14,s_pop:4.8,s_qty:10.0,s_dist:5.2,s_non:9.1},
  {id:55216,region:"Rukwa",lat:-8.5315,lon:31.5038,population:283,quantity:"unknown",likelihood:0.477,dist_km:1.23,n_nonfunc:4,s_pop:8.4,s_qty:5.0,s_dist:1.2,s_non:3.8},
  {id:55217,region:"Arusha",lat:-4.2344,lon:36.4319,population:660,quantity:"enough",likelihood:0.367,dist_km:7.88,n_nonfunc:1,s_pop:9.7,s_qty:10.0,s_dist:5.3,s_non:2.3},
  {id:55218,region:"Iringa",lat:-8.6188,lon:36.374,population:145,quantity:"enough",likelihood:0.822,dist_km:9.5,n_nonfunc:15,s_pop:6.7,s_qty:10.0,s_dist:6.4,s_non:9.4},
  {id:55219,region:"Iringa",lat:-8.4105,lon:34.8026,population:165,quantity:"unknown",likelihood:0.158,dist_km:8.31,n_nonfunc:0,s_pop:7.0,s_qty:5.0,s_dist:5.5,s_non:1.6},
  {id:55220,region:"Iringa",lat:-7.5363,lon:35.138,population:177,quantity:"seasonal",likelihood:0.708,dist_km:11.99,n_nonfunc:10,s_pop:7.2,s_qty:7.0,s_dist:7.8,s_non:7.8},
  {id:55221,region:"Pwani",lat:-7.1729,lon:38.7398,population:259,quantity:"dry",likelihood:0.507,dist_km:2.73,n_nonfunc:5,s_pop:8.2,s_qty:2.0,s_dist:1.8,s_non:4.2},
  {id:55222,region:"Kilimanjaro",lat:-2.7138,lon:37.3068,population:225,quantity:"seasonal",likelihood:0.437,dist_km:6.23,n_nonfunc:8,s_pop:7.9,s_qty:7.0,s_dist:4.2,s_non:6.5},
  {id:55223,region:"Morogoro",lat:-7.8855,lon:37.0024,population:811,quantity:"unknown",likelihood:0.259,dist_km:3.51,n_nonfunc:9,s_pop:9.8,s_qty:5.0,s_dist:2.4,s_non:7.1},
  {id:55224,region:"Dodoma",lat:-7.0692,lon:36.515,population:40,quantity:"enough",likelihood:0.282,dist_km:17.79,n_nonfunc:0,s_pop:2.7,s_qty:10.0,s_dist:9.5,s_non:1.6},
  {id:55225,region:"Shinyanga",lat:-3.7884,lon:33.3648,population:139,quantity:"seasonal",likelihood:0.129,dist_km:8.84,n_nonfunc:10,s_pop:6.5,s_qty:7.0,s_dist:5.9,s_non:7.8},
  {id:55226,region:"Mara",lat:-1.8778,lon:34.2476,population:69,quantity:"dry",likelihood:0.545,dist_km:12.98,n_nonfunc:8,s_pop:4.2,s_qty:2.0,s_dist:8.2,s_non:6.5},
  {id:55227,region:"Shinyanga",lat:-3.182,lon:33.3938,population:52,quantity:"seasonal",likelihood:0.02,dist_km:21.68,n_nonfunc:2,s_pop:3.4,s_qty:7.0,s_dist:9.9,s_non:2.5},
  {id:55228,region:"Manyara",lat:-4.002,lon:36.4704,population:33,quantity:"dry",likelihood:0.913,dist_km:15.36,n_nonfunc:5,s_pop:2.2,s_qty:2.0,s_dist:9.1,s_non:4.3},
  {id:55229,region:"Dar es Salaam",lat:-7.2283,lon:39.8147,population:144,quantity:"insufficient",likelihood:0.398,dist_km:6.05,n_nonfunc:7,s_pop:6.6,s_qty:5.0,s_dist:4.0,s_non:5.8},
  {id:55230,region:"Mwanza",lat:-2.2357,lon:32.5767,population:21,quantity:"insufficient",likelihood:0.114,dist_km:1.39,n_nonfunc:11,s_pop:1.6,s_qty:5.0,s_dist:1.3,s_non:8.2},
  {id:55231,region:"Singida",lat:-4.2244,lon:34.8547,population:26,quantity:"unknown",likelihood:0.697,dist_km:3.31,n_nonfunc:19,s_pop:1.9,s_qty:5.0,s_dist:2.3,s_non:9.9},
  {id:55232,region:"Morogoro",lat:-7.7438,lon:37.1012,population:9,quantity:"seasonal",likelihood:0.59,dist_km:3.29,n_nonfunc:5,s_pop:1.1,s_qty:7.0,s_dist:2.2,s_non:4.3},
  {id:55233,region:"Dodoma",lat:-7.198,lon:35.0033,population:1047,quantity:"enough",likelihood:0.02,dist_km:10.12,n_nonfunc:1,s_pop:9.9,s_qty:10.0,s_dist:6.8,s_non:2.4},
  {id:55234,region:"Mwanza",lat:-2.0505,lon:33.0505,population:46,quantity:"seasonal",likelihood:0.315,dist_km:7.84,n_nonfunc:0,s_pop:3.0,s_qty:7.0,s_dist:5.3,s_non:1.7},
  {id:55235,region:"Kilimanjaro",lat:-2.9314,lon:38.1797,population:117,quantity:"enough",likelihood:0.022,dist_km:6.16,n_nonfunc:8,s_pop:6.0,s_qty:10.0,s_dist:4.2,s_non:6.5},
  {id:55236,region:"Rukwa",lat:-7.5607,lon:31.7087,population:441,quantity:"unknown",likelihood:0.065,dist_km:6.25,n_nonfunc:9,s_pop:9.3,s_qty:5.0,s_dist:4.3,s_non:7.2},
  {id:55237,region:"Njombe",lat:-9.1636,lon:35.1692,population:112,quantity:"enough",likelihood:0.286,dist_km:6.62,n_nonfunc:11,s_pop:5.8,s_qty:10.0,s_dist:4.6,s_non:8.2},
  {id:55238,region:"Manyara",lat:-4.2861,lon:35.4184,population:110,quantity:"seasonal",likelihood:0.668,dist_km:6.2,n_nonfunc:3,s_pop:5.8,s_qty:7.0,s_dist:4.2,s_non:3.1},
  {id:55239,region:"Mwanza",lat:-2.9207,lon:32.8879,population:85,quantity:"dry",likelihood:0.271,dist_km:15.62,n_nonfunc:14,s_pop:4.8,s_qty:2.0,s_dist:9.1,s_non:9.2},
  {id:55240,region:"Ruvuma",lat:-10.6335,lon:35.9795,population:202,quantity:"enough",likelihood:0.296,dist_km:23.57,n_nonfunc:5,s_pop:7.6,s_qty:10.0,s_dist:9.9,s_non:4.3},
  {id:55241,region:"Iringa",lat:-8.145,lon:35.6847,population:66,quantity:"enough",likelihood:0.17,dist_km:6.24,n_nonfunc:12,s_pop:4.0,s_qty:10.0,s_dist:4.3,s_non:8.8},
  {id:55242,region:"Pwani",lat:-6.4545,lon:39.407,population:58,quantity:"enough",likelihood:0.123,dist_km:26.88,n_nonfunc:2,s_pop:3.6,s_qty:10.0,s_dist:10.0,s_non:2.6},
  {id:55243,region:"Shinyanga",lat:-3.7731,lon:33.7322,population:39,quantity:"enough",likelihood:0.054,dist_km:0.93,n_nonfunc:10,s_pop:2.6,s_qty:10.0,s_dist:1.1,s_non:7.8},
  {id:55244,region:"Mwanza",lat:-2.3684,lon:32.9686,population:85,quantity:"dry",likelihood:0.48,dist_km:6.48,n_nonfunc:0,s_pop:4.8,s_qty:2.0,s_dist:4.5,s_non:1.7},
  {id:55245,region:"Mwanza",lat:-3.2324,lon:33.1978,population:37,quantity:"enough",likelihood:0.153,dist_km:5.14,n_nonfunc:10,s_pop:2.5,s_qty:10.0,s_dist:3.4,s_non:7.8},
  {id:55246,region:"Kagera",lat:-1.7036,lon:31.3144,population:88,quantity:"dry",likelihood:0.54,dist_km:3.27,n_nonfunc:10,s_pop:5.0,s_qty:2.0,s_dist:2.2,s_non:7.8},
  {id:55247,region:"Njombe",lat:-8.7456,lon:34.6316,population:460,quantity:"unknown",likelihood:0.559,dist_km:7.22,n_nonfunc:17,s_pop:9.4,s_qty:5.0,s_dist:4.9,s_non:9.8},
  {id:55248,region:"Mwanza",lat:-2.3768,lon:32.7503,population:64,quantity:"enough",likelihood:0.702,dist_km:6.61,n_nonfunc:19,s_pop:3.9,s_qty:10.0,s_dist:4.6,s_non:9.9},
  {id:55249,region:"Njombe",lat:-9.9344,lon:35.5048,population:185,quantity:"enough",likelihood:0.455,dist_km:2.53,n_nonfunc:12,s_pop:7.4,s_qty:10.0,s_dist:1.7,s_non:8.8},
  {id:55250,region:"Pwani",lat:-6.6178,lon:38.4508,population:133,quantity:"seasonal",likelihood:0.47,dist_km:15.75,n_nonfunc:0,s_pop:6.3,s_qty:7.0,s_dist:9.2,s_non:1.7},
  {id:55251,region:"Morogoro",lat:-8.707,lon:37.2501,population:34,quantity:"enough",likelihood:0.578,dist_km:5.11,n_nonfunc:6,s_pop:2.2,s_qty:10.0,s_dist:3.4,s_non:5.0},
  {id:55252,region:"Singida",lat:-5.8323,lon:34.8049,population:48,quantity:"dry",likelihood:0.502,dist_km:6.68,n_nonfunc:15,s_pop:3.2,s_qty:2.0,s_dist:4.6,s_non:9.5},
  {id:55253,region:"Mbeya",lat:-9.1051,lon:33.2977,population:101,quantity:"dry",likelihood:0.457,dist_km:10.83,n_nonfunc:6,s_pop:5.5,s_qty:2.0,s_dist:7.3,s_non:5.0},
  {id:55254,region:"Pwani",lat:-6.9492,lon:39.0276,population:316,quantity:"insufficient",likelihood:0.21,dist_km:14.28,n_nonfunc:9,s_pop:8.8,s_qty:5.0,s_dist:8.6,s_non:7.2},
  {id:55255,region:"Mtwara",lat:-10.412,lon:40.4,population:77,quantity:"enough",likelihood:0.519,dist_km:12.73,n_nonfunc:6,s_pop:4.5,s_qty:10.0,s_dist:8.1,s_non:5.0},
  {id:55256,region:"Manyara",lat:-3.8987,lon:35.7991,population:25,quantity:"insufficient",likelihood:0.24,dist_km:13.46,n_nonfunc:4,s_pop:1.8,s_qty:5.0,s_dist:8.3,s_non:3.8},
  {id:55257,region:"Ruvuma",lat:-9.9146,lon:36.0448,population:64,quantity:"enough",likelihood:0.285,dist_km:10.27,n_nonfunc:0,s_pop:3.9,s_qty:10.0,s_dist:6.9,s_non:1.8},
  {id:55258,region:"Dodoma",lat:-6.2346,lon:35.805,population:14,quantity:"seasonal",likelihood:0.179,dist_km:10.89,n_nonfunc:5,s_pop:1.2,s_qty:7.0,s_dist:7.3,s_non:4.3},
  {id:55259,region:"Morogoro",lat:-7.2783,lon:36.6927,population:307,quantity:"seasonal",likelihood:0.75,dist_km:12.8,n_nonfunc:6,s_pop:8.7,s_qty:7.0,s_dist:8.1,s_non:5.0},
  {id:55260,region:"Tabora",lat:-5.2172,lon:32.7392,population:51,quantity:"seasonal",likelihood:0.062,dist_km:12.08,n_nonfunc:9,s_pop:3.3,s_qty:7.0,s_dist:7.8,s_non:7.2},
  {id:55261,region:"Iringa",lat:-7.5848,lon:35.0983,population:106,quantity:"seasonal",likelihood:0.448,dist_km:12.19,n_nonfunc:6,s_pop:5.7,s_qty:7.0,s_dist:7.9,s_non:5.0},
  {id:55262,region:"Iringa",lat:-8.3157,lon:36.3963,population:45,quantity:"enough",likelihood:0.259,dist_km:9.43,n_nonfunc:6,s_pop:2.9,s_qty:10.0,s_dist:6.3,s_non:5.1},
  {id:55263,region:"Shinyanga",lat:-4.2797,lon:34.1891,population:195,quantity:"unknown",likelihood:0.047,dist_km:6.03,n_nonfunc:5,s_pop:7.5,s_qty:5.0,s_dist:4.0,s_non:4.4},
  {id:55264,region:"Mwanza",lat:-2.6591,lon:32.8481,population:34,quantity:"dry",likelihood:0.26,dist_km:14.37,n_nonfunc:9,s_pop:2.3,s_qty:2.0,s_dist:8.6,s_non:7.2},
  {id:55265,region:"Shinyanga",lat:-3.9308,lon:33.2479,population:124,quantity:"enough",likelihood:0.268,dist_km:10.63,n_nonfunc:0,s_pop:6.2,s_qty:10.0,s_dist:7.2,s_non:1.8},
  {id:55266,region:"Ruvuma",lat:-10.219,lon:35.925,population:117,quantity:"enough",likelihood:0.355,dist_km:8.49,n_nonfunc:14,s_pop:6.0,s_qty:10.0,s_dist:5.7,s_non:9.2},
  {id:55267,region:"Kagera",lat:-0.9,lon:31.0685,population:385,quantity:"insufficient",likelihood:0.239,dist_km:4.96,n_nonfunc:11,s_pop:9.2,s_qty:5.0,s_dist:3.3,s_non:8.3},
  {id:55268,region:"Njombe",lat:-9.0629,lon:34.1417,population:256,quantity:"unknown",likelihood:0.354,dist_km:6.73,n_nonfunc:11,s_pop:8.1,s_qty:5.0,s_dist:4.7,s_non:8.3},
  {id:55269,region:"Tanga",lat:-4.6606,lon:38.2761,population:140,quantity:"dry",likelihood:0.341,dist_km:13.59,n_nonfunc:7,s_pop:6.5,s_qty:2.0,s_dist:8.4,s_non:5.8},
  {id:55270,region:"Tanga",lat:-5.4551,lon:39.0695,population:175,quantity:"enough",likelihood:0.457,dist_km:17.16,n_nonfunc:7,s_pop:7.2,s_qty:10.0,s_dist:9.4,s_non:5.8},
  {id:55271,region:"Morogoro",lat:-7.5573,lon:36.6717,population:102,quantity:"enough",likelihood:0.086,dist_km:4.13,n_nonfunc:0,s_pop:5.5,s_qty:10.0,s_dist:2.7,s_non:1.8},
  {id:55272,region:"Mwanza",lat:-2.5134,lon:33.7568,population:131,quantity:"enough",likelihood:0.369,dist_km:8.85,n_nonfunc:2,s_pop:6.3,s_qty:10.0,s_dist:6.0,s_non:2.6},
  {id:55273,region:"Ruvuma",lat:-10.9091,lon:35.6058,population:86,quantity:"seasonal",likelihood:0.724,dist_km:9.62,n_nonfunc:14,s_pop:4.8,s_qty:7.0,s_dist:6.4,s_non:9.2},
  {id:55274,region:"Dar es Salaam",lat:-7.8618,lon:38.5501,population:19,quantity:"enough",likelihood:0.652,dist_km:5.19,n_nonfunc:12,s_pop:1.5,s_qty:10.0,s_dist:3.5,s_non:8.8},
  {id:55275,region:"Manyara",lat:-4.5028,lon:35.811,population:281,quantity:"unknown",likelihood:0.29,dist_km:2.91,n_nonfunc:6,s_pop:8.4,s_qty:5.0,s_dist:2.1,s_non:5.1},
  {id:55276,region:"Mwanza",lat:-2.4567,lon:32.9461,population:197,quantity:"enough",likelihood:0.112,dist_km:3.16,n_nonfunc:16,s_pop:7.5,s_qty:10.0,s_dist:2.1,s_non:9.6},
  {id:55277,region:"Mwanza",lat:-2.3669,lon:34.1364,population:75,quantity:"insufficient",likelihood:0.806,dist_km:5.34,n_nonfunc:14,s_pop:4.4,s_qty:5.0,s_dist:3.6,s_non:9.2},
  {id:55278,region:"Shinyanga",lat:-3.6659,lon:33.9279,population:87,quantity:"insufficient",likelihood:0.116,dist_km:15.36,n_nonfunc:10,s_pop:4.9,s_qty:5.0,s_dist:9.1,s_non:7.9},
  {id:55279,region:"Kigoma",lat:-4.7103,lon:30.0141,population:77,quantity:"dry",likelihood:0.02,dist_km:13.59,n_nonfunc:9,s_pop:4.5,s_qty:2.0,s_dist:8.4,s_non:7.2},
  {id:55280,region:"Shinyanga",lat:-3.6007,lon:33.2401,population:991,quantity:"enough",likelihood:0.075,dist_km:12.92,n_nonfunc:7,s_pop:9.9,s_qty:10.0,s_dist:8.1,s_non:5.8},
  {id:55281,region:"Iringa",lat:-7.7728,lon:35.9743,population:32,quantity:"insufficient",likelihood:0.56,dist_km:9.12,n_nonfunc:4,s_pop:2.1,s_qty:5.0,s_dist:6.1,s_non:3.8},
  {id:55282,region:"Dodoma",lat:-7.3805,lon:36.2912,population:39,quantity:"dry",likelihood:0.334,dist_km:17.18,n_nonfunc:9,s_pop:2.6,s_qty:2.0,s_dist:9.4,s_non:7.3},
  {id:55283,region:"Kilimanjaro",lat:-3.7737,lon:38.0901,population:308,quantity:"enough",likelihood:0.42,dist_km:18.47,n_nonfunc:0,s_pop:8.7,s_qty:10.0,s_dist:9.6,s_non:1.8},
  {id:55284,region:"Morogoro",lat:-8.1782,lon:37.7713,population:44,quantity:"enough",likelihood:0.578,dist_km:12.56,n_nonfunc:9,s_pop:2.8,s_qty:10.0,s_dist:8.0,s_non:7.3},
  {id:55285,region:"Mwanza",lat:-1.9434,lon:33.1199,population:82,quantity:"enough",likelihood:0.399,dist_km:5.55,n_nonfunc:5,s_pop:4.6,s_qty:10.0,s_dist:3.8,s_non:4.4},
  {id:55286,region:"Tanga",lat:-5.6074,lon:37.5952,population:49,quantity:"enough",likelihood:0.417,dist_km:3.3,n_nonfunc:8,s_pop:3.2,s_qty:10.0,s_dist:2.2,s_non:6.6},
  {id:55287,region:"Singida",lat:-5.7046,lon:34.8186,population:87,quantity:"enough",likelihood:0.528,dist_km:5.63,n_nonfunc:9,s_pop:4.9,s_qty:10.0,s_dist:3.8,s_non:7.3},
  {id:55288,region:"Kigoma",lat:-5.1031,lon:29.3621,population:74,quantity:"dry",likelihood:0.163,dist_km:2.76,n_nonfunc:9,s_pop:4.3,s_qty:2.0,s_dist:1.9,s_non:7.4},
  {id:55289,region:"Kilimanjaro",lat:-3.5513,lon:37.1208,population:1172,quantity:"seasonal",likelihood:0.308,dist_km:17.57,n_nonfunc:0,s_pop:9.9,s_qty:7.0,s_dist:9.5,s_non:1.9},
  {id:55290,region:"Kilimanjaro",lat:-3.8008,lon:38.5174,population:19,quantity:"enough",likelihood:0.376,dist_km:8.02,n_nonfunc:11,s_pop:1.5,s_qty:10.0,s_dist:5.4,s_non:8.3},
  {id:55291,region:"Mara",lat:-1.7678,lon:33.8772,population:66,quantity:"seasonal",likelihood:0.131,dist_km:7.1,n_nonfunc:3,s_pop:4.0,s_qty:7.0,s_dist:4.8,s_non:3.1},
  {id:55292,region:"Pwani",lat:-7.7049,lon:39.2859,population:434,quantity:"seasonal",likelihood:0.695,dist_km:10.32,n_nonfunc:9,s_pop:9.3,s_qty:7.0,s_dist:6.9,s_non:7.4},
  {id:55293,region:"Singida",lat:-4.3306,lon:35.4459,population:375,quantity:"insufficient",likelihood:0.537,dist_km:4.45,n_nonfunc:14,s_pop:9.1,s_qty:5.0,s_dist:3.0,s_non:9.2},
  {id:55294,region:"Kilimanjaro",lat:-3.7578,lon:38.4302,population:224,quantity:"enough",likelihood:0.151,dist_km:7.7,n_nonfunc:14,s_pop:7.9,s_qty:10.0,s_dist:5.2,s_non:9.3},
  {id:55295,region:"Morogoro",lat:-7.3452,lon:37.2894,population:57,quantity:"enough",likelihood:0.26,dist_km:1.96,n_nonfunc:3,s_pop:3.6,s_qty:10.0,s_dist:1.4,s_non:3.1},
  {id:55296,region:"Dodoma",lat:-5.9133,lon:35.3358,population:47,quantity:"enough",likelihood:0.215,dist_km:11.12,n_nonfunc:6,s_pop:3.1,s_qty:10.0,s_dist:7.4,s_non:5.1},
  {id:55297,region:"Lindi",lat:-9.1906,lon:39.1101,population:8,quantity:"enough",likelihood:0.389,dist_km:20.15,n_nonfunc:3,s_pop:1.1,s_qty:10.0,s_dist:9.8,s_non:3.2},
  {id:55298,region:"Iringa",lat:-8.2989,lon:35.8379,population:101,quantity:"enough",likelihood:0.259,dist_km:5.45,n_nonfunc:6,s_pop:5.5,s_qty:10.0,s_dist:3.6,s_non:5.2},
  {id:55299,region:"Morogoro",lat:-8.2082,lon:36.9979,population:431,quantity:"insufficient",likelihood:0.402,dist_km:6.07,n_nonfunc:0,s_pop:9.2,s_qty:5.0,s_dist:4.0,s_non:1.9},
  {id:55300,region:"Mwanza",lat:-2.3024,lon:33.1303,population:40,quantity:"enough",likelihood:0.566,dist_km:1.67,n_nonfunc:0,s_pop:2.7,s_qty:10.0,s_dist:1.3,s_non:1.9},
  {id:55301,region:"Geita",lat:-2.7008,lon:32.6497,population:92,quantity:"seasonal",likelihood:0.039,dist_km:25.46,n_nonfunc:3,s_pop:5.1,s_qty:7.0,s_dist:9.9,s_non:3.2},
  {id:55302,region:"Tanga",lat:-5.5389,lon:37.5673,population:101,quantity:"enough",likelihood:0.646,dist_km:2.12,n_nonfunc:4,s_pop:5.5,s_qty:10.0,s_dist:1.5,s_non:3.8},
  {id:55303,region:"Mwanza",lat:-2.1441,lon:32.6079,population:206,quantity:"enough",likelihood:0.465,dist_km:13.76,n_nonfunc:2,s_pop:7.7,s_qty:10.0,s_dist:8.5,s_non:2.6},
  {id:55304,region:"Mwanza",lat:-2.769,lon:32.3437,population:75,quantity:"enough",likelihood:0.049,dist_km:2.66,n_nonfunc:0,s_pop:4.4,s_qty:10.0,s_dist:1.8,s_non:1.9},
  {id:55305,region:"Kigoma",lat:-4.5756,lon:30.5135,population:261,quantity:"seasonal",likelihood:0.353,dist_km:11.67,n_nonfunc:4,s_pop:8.2,s_qty:7.0,s_dist:7.7,s_non:3.9},
  {id:55306,region:"Rukwa",lat:-8.2314,lon:32.2286,population:246,quantity:"enough",likelihood:0.762,dist_km:5.66,n_nonfunc:9,s_pop:8.1,s_qty:10.0,s_dist:3.8,s_non:7.4},
  {id:55307,region:"Kagera",lat:-0.9,lon:31.2734,population:64,quantity:"seasonal",likelihood:0.734,dist_km:13.69,n_nonfunc:23,s_pop:3.9,s_qty:7.0,s_dist:8.4,s_non:10.0},
  {id:55308,region:"Kilimanjaro",lat:-3.3956,lon:37.4815,population:587,quantity:"unknown",likelihood:0.148,dist_km:15.97,n_nonfunc:7,s_pop:9.6,s_qty:5.0,s_dist:9.3,s_non:5.8},
  {id:55309,region:"Mbeya",lat:-8.3856,lon:33.5647,population:335,quantity:"enough",likelihood:0.564,dist_km:10.41,n_nonfunc:4,s_pop:8.9,s_qty:10.0,s_dist:7.0,s_non:3.9},
  {id:55310,region:"Iringa",lat:-7.2548,lon:36.2599,population:150,quantity:"enough",likelihood:0.584,dist_km:6.73,n_nonfunc:4,s_pop:6.8,s_qty:10.0,s_dist:4.7,s_non:3.9},
  {id:55311,region:"Morogoro",lat:-6.8785,lon:37.2617,population:169,quantity:"insufficient",likelihood:0.575,dist_km:6.41,n_nonfunc:0,s_pop:7.1,s_qty:5.0,s_dist:4.4,s_non:1.9},
  {id:55312,region:"Dar es Salaam",lat:-7.4327,lon:38.1837,population:82,quantity:"enough",likelihood:0.405,dist_km:2.55,n_nonfunc:6,s_pop:4.7,s_qty:10.0,s_dist:1.7,s_non:5.2},
  {id:55313,region:"Lindi",lat:-10.9291,lon:39.1264,population:49,quantity:"enough",likelihood:0.4,dist_km:3.06,n_nonfunc:7,s_pop:3.2,s_qty:10.0,s_dist:2.1,s_non:5.9},
  {id:55314,region:"Mwanza",lat:-2.3688,lon:33.5462,population:341,quantity:"seasonal",likelihood:0.092,dist_km:2.75,n_nonfunc:1,s_pop:8.9,s_qty:7.0,s_dist:1.9,s_non:2.4},
  {id:55315,region:"Pwani",lat:-7.5713,lon:38.684,population:53,quantity:"enough",likelihood:0.327,dist_km:6.58,n_nonfunc:4,s_pop:3.4,s_qty:10.0,s_dist:4.5,s_non:4.0},
  {id:55316,region:"Dar es Salaam",lat:-6.6393,lon:39.5345,population:14,quantity:"enough",likelihood:0.541,dist_km:20.74,n_nonfunc:5,s_pop:1.2,s_qty:10.0,s_dist:9.8,s_non:4.4},
  {id:55317,region:"Tabora",lat:-5.1009,lon:32.6486,population:329,quantity:"unknown",likelihood:0.251,dist_km:14.65,n_nonfunc:0,s_pop:8.9,s_qty:5.0,s_dist:8.7,s_non:2.0},
  {id:55318,region:"Morogoro",lat:-7.7651,lon:37.0176,population:39,quantity:"seasonal",likelihood:0.065,dist_km:28.14,n_nonfunc:6,s_pop:2.6,s_qty:7.0,s_dist:10.0,s_non:5.2},
  {id:55319,region:"Mwanza",lat:-2.7548,lon:32.6908,population:81,quantity:"dry",likelihood:0.198,dist_km:6.08,n_nonfunc:12,s_pop:4.5,s_qty:2.0,s_dist:4.1,s_non:8.8},
  {id:55320,region:"Manyara",lat:-4.3001,lon:35.63,population:84,quantity:"dry",likelihood:0.059,dist_km:15.72,n_nonfunc:2,s_pop:4.7,s_qty:2.0,s_dist:9.2,s_non:2.6},
  {id:55321,region:"Tabora",lat:-4.9948,lon:32.039,population:45,quantity:"enough",likelihood:0.205,dist_km:6.95,n_nonfunc:11,s_pop:3.0,s_qty:10.0,s_dist:4.8,s_non:8.3},
  {id:55322,region:"Iringa",lat:-7.7153,lon:34.783,population:272,quantity:"enough",likelihood:0.449,dist_km:4.28,n_nonfunc:12,s_pop:8.3,s_qty:10.0,s_dist:2.8,s_non:8.8},
  {id:55323,region:"Tanga",lat:-5.0598,lon:38.5207,population:100,quantity:"enough",likelihood:0.266,dist_km:20.08,n_nonfunc:8,s_pop:5.4,s_qty:10.0,s_dist:9.8,s_non:6.6},
  {id:55324,region:"Iringa",lat:-8.2177,lon:35.3472,population:51,quantity:"enough",likelihood:0.181,dist_km:3.34,n_nonfunc:10,s_pop:3.3,s_qty:10.0,s_dist:2.3,s_non:7.9},
  {id:55325,region:"Shinyanga",lat:-3.7625,lon:33.7194,population:376,quantity:"enough",likelihood:0.158,dist_km:16.27,n_nonfunc:9,s_pop:9.1,s_qty:10.0,s_dist:9.4,s_non:7.4},
  {id:55326,region:"Dar es Salaam",lat:-6.5131,lon:39.8651,population:59,quantity:"enough",likelihood:0.278,dist_km:8.01,n_nonfunc:8,s_pop:3.7,s_qty:10.0,s_dist:5.4,s_non:6.6},
  {id:55327,region:"Mara",lat:-1.7956,lon:34.6766,population:146,quantity:"enough",likelihood:0.462,dist_km:0.12,n_nonfunc:0,s_pop:6.7,s_qty:10.0,s_dist:1.0,s_non:2.0},
  {id:55328,region:"Mbeya",lat:-8.7832,lon:33.2466,population:98,quantity:"enough",likelihood:0.119,dist_km:12.39,n_nonfunc:3,s_pop:5.3,s_qty:10.0,s_dist:7.9,s_non:3.2},
  {id:55329,region:"Shinyanga",lat:-3.8057,lon:33.2458,population:33,quantity:"enough",likelihood:0.356,dist_km:10.43,n_nonfunc:7,s_pop:2.2,s_qty:10.0,s_dist:7.1,s_non:5.9},
  {id:55330,region:"Iringa",lat:-8.6606,lon:35.5753,population:103,quantity:"enough",likelihood:0.351,dist_km:8.73,n_nonfunc:0,s_pop:5.5,s_qty:10.0,s_dist:5.8,s_non:2.0},
  {id:55331,region:"Shinyanga",lat:-3.431,lon:33.6809,population:121,quantity:"insufficient",likelihood:0.455,dist_km:12.07,n_nonfunc:6,s_pop:6.1,s_qty:5.0,s_dist:7.8,s_non:5.2},
  {id:55332,region:"Mbeya",lat:-9.1803,lon:34.728,population:89,quantity:"enough",likelihood:0.221,dist_km:10.05,n_nonfunc:6,s_pop:5.0,s_qty:10.0,s_dist:6.7,s_non:5.2},
  {id:55333,region:"Iringa",lat:-7.7779,lon:35.2698,population:33,quantity:"enough",likelihood:0.262,dist_km:10.9,n_nonfunc:6,s_pop:2.2,s_qty:10.0,s_dist:7.4,s_non:5.3},
  {id:55334,region:"Mtwara",lat:-9.6183,lon:39.9988,population:416,quantity:"insufficient",likelihood:0.248,dist_km:13.75,n_nonfunc:0,s_pop:9.2,s_qty:5.0,s_dist:8.4,s_non:2.0},
  {id:55335,region:"Singida",lat:-4.3885,lon:35.0075,population:14,quantity:"enough",likelihood:0.056,dist_km:9.69,n_nonfunc:7,s_pop:1.3,s_qty:10.0,s_dist:6.5,s_non:5.9},
  {id:55336,region:"Mbeya",lat:-8.2628,lon:33.3417,population:133,quantity:"dry",likelihood:0.611,dist_km:3.41,n_nonfunc:15,s_pop:6.4,s_qty:2.0,s_dist:2.4,s_non:9.5},
  {id:55337,region:"Iringa",lat:-7.4643,lon:35.6515,population:155,quantity:"enough",likelihood:0.742,dist_km:12.51,n_nonfunc:8,s_pop:6.9,s_qty:10.0,s_dist:8.0,s_non:6.6},
  {id:55338,region:"Shinyanga",lat:-3.1256,lon:32.7838,population:63,quantity:"seasonal",likelihood:0.335,dist_km:18.83,n_nonfunc:0,s_pop:3.8,s_qty:7.0,s_dist:9.6,s_non:2.1},
  {id:55339,region:"Mwanza",lat:-1.7813,lon:32.9722,population:303,quantity:"enough",likelihood:0.043,dist_km:8.04,n_nonfunc:0,s_pop:8.6,s_qty:10.0,s_dist:5.5,s_non:2.1},
  {id:55340,region:"Manyara",lat:-4.1025,lon:36.1089,population:95,quantity:"insufficient",likelihood:0.643,dist_km:2.59,n_nonfunc:7,s_pop:5.2,s_qty:5.0,s_dist:1.7,s_non:6.0},
  {id:55341,region:"Tanga",lat:-4.9652,lon:37.9897,population:313,quantity:"enough",likelihood:0.34,dist_km:15.97,n_nonfunc:10,s_pop:8.8,s_qty:10.0,s_dist:9.3,s_non:7.9},
  {id:55342,region:"Mbeya",lat:-8.6253,lon:33.1095,population:71,quantity:"enough",likelihood:0.227,dist_km:7.04,n_nonfunc:7,s_pop:4.2,s_qty:10.0,s_dist:4.8,s_non:6.0},
  {id:55343,region:"Mara",lat:-2.3235,lon:34.0633,population:98,quantity:"enough",likelihood:0.028,dist_km:9.09,n_nonfunc:2,s_pop:5.4,s_qty:10.0,s_dist:6.0,s_non:2.7},
  {id:55344,region:"Kilimanjaro",lat:-3.9793,lon:37.3322,population:134,quantity:"seasonal",likelihood:0.448,dist_km:4.5,n_nonfunc:2,s_pop:6.4,s_qty:7.0,s_dist:3.0,s_non:2.7},
  {id:55345,region:"Mwanza",lat:-2.2194,lon:32.7009,population:37,quantity:"insufficient",likelihood:0.287,dist_km:14.48,n_nonfunc:5,s_pop:2.5,s_qty:5.0,s_dist:8.7,s_non:4.5},
  {id:55346,region:"Tabora",lat:-5.2455,lon:33.4822,population:56,quantity:"insufficient",likelihood:0.308,dist_km:4.84,n_nonfunc:5,s_pop:3.5,s_qty:5.0,s_dist:3.2,s_non:4.5},
  {id:55347,region:"Pwani",lat:-7.6925,lon:38.5308,population:44,quantity:"seasonal",likelihood:0.353,dist_km:3.99,n_nonfunc:6,s_pop:2.9,s_qty:7.0,s_dist:2.6,s_non:5.3},
  {id:55348,region:"Tabora",lat:-5.1067,lon:33.1025,population:117,quantity:"dry",likelihood:0.787,dist_km:0.92,n_nonfunc:20,s_pop:6.0,s_qty:2.0,s_dist:1.1,s_non:10.0},
  {id:55349,region:"Kigoma",lat:-4.7466,lon:29.209,population:134,quantity:"seasonal",likelihood:0.395,dist_km:16.27,n_nonfunc:5,s_pop:6.4,s_qty:7.0,s_dist:9.4,s_non:4.5},
  {id:55350,region:"Mwanza",lat:-2.1407,lon:32.7088,population:243,quantity:"enough",likelihood:0.189,dist_km:2.8,n_nonfunc:8,s_pop:8.0,s_qty:10.0,s_dist:2.0,s_non:6.7},
  {id:55351,region:"Morogoro",lat:-7.2419,lon:37.369,population:21,quantity:"enough",likelihood:0.076,dist_km:2.9,n_nonfunc:6,s_pop:1.7,s_qty:10.0,s_dist:2.1,s_non:5.3},
  {id:55352,region:"Kilimanjaro",lat:-2.6333,lon:36.8736,population:55,quantity:"enough",likelihood:0.031,dist_km:8.72,n_nonfunc:6,s_pop:3.5,s_qty:10.0,s_dist:5.8,s_non:5.3},
  {id:55353,region:"Shinyanga",lat:-4.0391,lon:33.0473,population:337,quantity:"enough",likelihood:0.525,dist_km:13.29,n_nonfunc:9,s_pop:8.9,s_qty:10.0,s_dist:8.3,s_non:7.5},
  {id:55354,region:"Pwani",lat:-7.508,lon:39.1599,population:114,quantity:"enough",likelihood:0.919,dist_km:5.33,n_nonfunc:9,s_pop:5.9,s_qty:10.0,s_dist:3.6,s_non:7.5},
  {id:55355,region:"Mbeya",lat:-9.0251,lon:32.9481,population:20,quantity:"enough",likelihood:0.821,dist_km:5.53,n_nonfunc:0,s_pop:1.6,s_qty:10.0,s_dist:3.7,s_non:2.1},
  {id:55356,region:"Dar es Salaam",lat:-6.2186,lon:39.0304,population:105,quantity:"enough",likelihood:0.564,dist_km:13.45,n_nonfunc:17,s_pop:5.7,s_qty:10.0,s_dist:8.3,s_non:9.8},
  {id:55357,region:"Kilimanjaro",lat:-4.118,lon:37.2204,population:11,quantity:"dry",likelihood:0.047,dist_km:4.18,n_nonfunc:4,s_pop:1.1,s_qty:2.0,s_dist:2.8,s_non:4.0},
  {id:55358,region:"Morogoro",lat:-7.1192,lon:37.97,population:29,quantity:"enough",likelihood:0.321,dist_km:9.99,n_nonfunc:8,s_pop:2.0,s_qty:10.0,s_dist:6.7,s_non:6.7},
  {id:55359,region:"Kilimanjaro",lat:-3.878,lon:37.2781,population:45,quantity:"insufficient",likelihood:0.722,dist_km:3.67,n_nonfunc:11,s_pop:3.0,s_qty:5.0,s_dist:2.5,s_non:8.4},
];
/* ============================================================
   Water Pump Triage — app logic
   Priority model mirrors the notebook exactly:
     impact(1-10) = weighted blend of 4 fixed per-pump scores
     priority     = P(non-functional) * (impact/10) * 100
   The knobs are the weights; impact can be switched off so the
   ranking falls back to raw failure probability.
   ============================================================ */
(function(){
"use strict";

/* ---------- factor configuration (notebook defaults) ---------- */
const FACTORS = [
  {key:"pop",  field:"s_pop",  name:"People served",      desc:"Population relying on this pump"},
  {key:"qty",  field:"s_qty",  name:"Water availability", desc:"A dry pump is rarely worth repairing"},
  {key:"dist", field:"s_dist", name:"Isolation",          desc:"Distance to the nearest working pump"},
  {key:"non",  field:"s_non",  name:"Nearby failures",    desc:"Broken pumps clustered within ~20 km"},
];
const DEFAULT_WEIGHTS = {pop:40, qty:20, dist:25, non:15};   // = 0.40/0.20/0.25/0.15

/* ---------- state ---------- */
const state = {
  pumps: [],
  weights: {...DEFAULT_WEIGHTS},
  impactOn: true,
  topN: "all",         // number, or "all" — default to showing every pump
  reversed: false,     // flip the displayed order of the ranked list
  view: "rank",
  selectedId: null,
  geoZoom: 1,          // map zoom factor (1 = whole country)
  geoCenter: {x:50, y:50},  // map centre in 0..100 viewBox units
};

/* ---------- helpers ---------- */
const lerp = (a,b,t)=>a+(b-a)*t;
function heat(t){                       // teal -> amber -> red
  t = Math.max(0, Math.min(1, t));
  const s = [[42,157,143],[233,196,106],[193,18,31]];
  const seg = t<0.5 ? 0 : 1, lt = t<0.5 ? t/0.5 : (t-0.5)/0.5;
  const c0=s[seg], c1=s[seg+1];
  return `rgb(${Math.round(lerp(c0[0],c1[0],lt))},${Math.round(lerp(c0[1],c1[1],lt))},${Math.round(lerp(c0[2],c1[2],lt))})`;
}
const fmtInt = n => Math.round(n).toLocaleString("en-US");
const fmt1   = n => (Math.round(n*10)/10).toFixed(1);
const pad2   = n => String(n).padStart(2,"0");
const cap    = s => s ? s.charAt(0).toUpperCase()+s.slice(1) : "—";
// pump ids can be numbers (sample data) or strings (loaded CSV); always compare
// them as strings so map clicks and list clicks resolve to the same pump
const sameId = (a,b) => String(a)===String(b);
// resolve the current batch size to an actual count (handles "Show all")
const topCount = ranked => state.topN==="all" ? ranked.length : Math.min(state.topN, ranked.length);
const clampZoom = z => Math.max(1, Math.min(12, z));

/* ---------- core model ---------- */
function impactOf(p){                    // 1..10
  const w = state.weights;
  let s = w.pop + w.qty + w.dist + w.non;
  if (s <= 0) return (p.s_pop + p.s_qty + p.s_dist + p.s_non)/4;   // equal fallback
  return (p.s_pop*w.pop + p.s_qty*w.qty + p.s_dist*w.dist + p.s_non*w.non) / s;
}
function priorityOf(p){
  if (!state.impactOn) return p.likelihood * 100;
  return p.likelihood * (impactOf(p)/10) * 100;
}
function computeRanked(){
  const arr = state.pumps.map(p => ({...p, priority: priorityOf(p)}));
  arr.sort((a,b)=> b.priority - a.priority || b.likelihood - a.likelihood);
  arr.forEach((p,i)=> p.rank = i+1);
  return arr;
}

/* ---------- build static controls ---------- */
function buildKnobs(){
  const box = document.getElementById("knobs");
  box.innerHTML = FACTORS.map(f => `
    <div class="knob" data-key="${f.key}">
      <div class="knob-top">
        <span class="knob-name">${f.name}</span>
        <span class="knob-share" data-share="${f.key}">—</span>
      </div>
      <div class="knob-desc">${f.desc}</div>
      <input type="range" min="0" max="100" step="1" value="${state.weights[f.key]}" data-knob="${f.key}">
    </div>`).join("");
  box.querySelectorAll("input[data-knob]").forEach(inp=>{
    inp.addEventListener("input", e=>{
      state.weights[e.target.dataset.knob] = +e.target.value;
      updateShares(); render();
    });
  });
}
function updateShares(){
  const w = state.weights, sum = w.pop+w.qty+w.dist+w.non;
  FACTORS.forEach(f=>{
    const el = document.querySelector(`[data-share="${f.key}"]`);
    if (!state.impactOn)      el.textContent = "off";
    else if (sum <= 0)        el.textContent = "—";
    else                      el.textContent = Math.round(w[f.key]/sum*100) + "%";
  });
}

/* ---------- impact toggle ---------- */
function toggleImpact(force){
  state.impactOn = (force===undefined) ? !state.impactOn : force;
  const btn = document.getElementById("impactToggle");
  btn.classList.toggle("is-on", state.impactOn);
  btn.setAttribute("aria-checked", state.impactOn);
  document.querySelector(".controls").classList.toggle("impact-off", !state.impactOn);
  document.getElementById("switchSub").textContent =
    state.impactOn ? "On · likelihood × impact" : "Off · failure probability only";
  document.getElementById("controlsHint").textContent =
    state.impactOn ? "Twist the knobs to set how much each factor matters. Pumps re-rank live."
                   : "Impact is off. Pumps are ranked purely on how likely they are to be broken.";
}

/* ---------- KPIs (two compact cards, right column) ---------- */
function renderKPIs(ranked){
  const n = topCount(ranked);
  const top = ranked.slice(0, n);
  const people = top.reduce((s,p)=> s + (p.population||0), 0);
  const liks = top.map(p=>p.likelihood).sort((a,b)=>a-b);
  const med = liks.length ? liks[Math.floor(liks.length/2)] : 0;
  const scope = state.topN==="all" ? "all pumps" : `top ${n}`;

  const cards = [
    {label:`People served · ${scope}`, val:fmtInt(people), unit:"",  sub:"estimated population reached"},
    {label:"Median failure risk",      val:Math.round(med*100), unit:"%", sub:`across the ${scope}`},
  ];
  document.getElementById("miniKpis").innerHTML = cards.map(c=>`
    <div class="mini-kpi">
      <div class="mk-label">${c.label}</div>
      <div class="mk-value">${c.val}${c.unit?`<small>${c.unit}</small>`:""}</div>
      <div class="mk-sub">${c.sub}</div>
    </div>`).join("");
}

/* ---------- ranked list (with FLIP reorder) ---------- */
function renderRank(ranked){
  const list = document.getElementById("rankList");
  const n = topCount(ranked);
  let top = ranked.slice(0, n);
  document.getElementById("rankCount").textContent =
    state.topN==="all" ? `All ${fmtInt(ranked.length)} pumps` : `Top ${n} pumps to inspect`;
  if (state.reversed) top = [...top].reverse();   // flip the displayed order
  const maxScore = ranked.length ? ranked[0].priority : 1;

  // FLIP animation is only worth it on short lists; skip it for big batches
  const doFlip = top.length <= 150;
  const old = {};
  if (doFlip) list.querySelectorAll(".row").forEach(el => old[el.dataset.id] = el.getBoundingClientRect().top);

  // build new rows
  list.innerHTML = "";
  top.forEach(p=>{
    const t = maxScore>0 ? p.priority/maxScore : 0;
    const row = document.createElement("div");
    row.className = "row" + (sameId(p.id, state.selectedId) ? " is-selected" : "");
    row.dataset.id = p.id;
    // the right cell holds only the priority score now; with the row's
    // align-items:center it sits vertically centred (the old ±rank delta is gone)
    row.innerHTML = `
      <div class="row-rank">${pad2(p.rank)}</div>
      <div class="row-main">
        <div class="row-id">#${p.id} <span class="reg">${p.region||""}</span></div>
        <div class="row-bar-track"><div class="row-bar" style="width:${(t*100).toFixed(1)}%;background:${heat(t)}"></div></div>
      </div>
      <div class="row-right">
        <div class="row-score">${fmt1(p.priority)}</div>
      </div>`;
    row.addEventListener("click", ()=> selectPump(p.id));
    list.appendChild(row);
  });

  // LAST + INVERT + PLAY
  if (doFlip){
    list.querySelectorAll(".row").forEach(el=>{
      const id = el.dataset.id;
      if (old[id] !== undefined){
        const dy = old[id] - el.getBoundingClientRect().top;
        if (Math.abs(dy) > 1){
          el.style.transition = "none";
          el.style.transform = `translateY(${dy}px)`;
          requestAnimationFrame(()=>{
            el.style.transition = "transform .5s cubic-bezier(.4,0,.2,1)";
            el.style.transform = "";
          });
        }
      } else {
        el.style.opacity = "0";
        requestAnimationFrame(()=>{ el.style.transition="opacity .4s"; el.style.opacity="1"; });
      }
    });
  }
}

/* ---------- map view (with zoom + pan) ---------- */
const LON0=29.0, LON1=40.6, LAT0=-12.0, LAT1=-0.8;
const projX = lon => 6 + (lon-LON0)/(LON1-LON0)*88;
const projY = lat => 94 - (lat-LAT0)/(LAT1-LAT0)*88;

// the visible window into the 0..100 map space, given current zoom/centre
function geoViewBox(){
  const z = state.geoZoom;
  const half = 50/z;
  const cx = Math.max(half, Math.min(100-half, state.geoCenter.x));
  const cy = Math.max(half, Math.min(100-half, state.geoCenter.y));
  state.geoCenter.x = cx; state.geoCenter.y = cy;   // store back the clamped centre
  return {x:cx-half, y:cy-half, w:100/z, h:100/z, z};
}

function renderGeo(ranked){
  const svg = document.getElementById("geoSvg");
  const vb = geoViewBox();
  svg.setAttribute("viewBox", `${vb.x.toFixed(3)} ${vb.y.toFixed(3)} ${vb.w.toFixed(3)} ${vb.h.toFixed(3)}`);

  const n = topCount(ranked);
  const maxScore = Math.max(1, ...ranked.map(p=>p.priority));
  const maxPop = Math.max(1, ...state.pumps.map(p=>p.population||1));
  const inBatch = new Set(ranked.slice(0,n).map(p=>p.id));
  // draw urgent on top
  const draw = [...ranked].sort((a,b)=> a.priority - b.priority);
  let html = "";
  draw.forEach(p=>{
    if (p.lat==null || p.lon==null || isNaN(p.lat) || isNaN(p.lon)) return;
    const x=projX(p.lon), y=projY(p.lat);
    if (x<0||x>100||y<0||y>100) return;
    // base radius encodes population; divide by zoom so dots keep a constant on-screen size
    const r = (0.9 + 2.4*Math.sqrt((p.population||1)/maxPop)) / vb.z;
    const t = p.priority/maxScore;
    const batch = inBatch.has(p.id);
    const sel = sameId(p.id, state.selectedId);
    const stroke = sel ? "var(--ink)" : (batch ? "rgba(13,92,99,.85)" : "rgba(255,255,255,.7)");
    const sw = sel ? 1.6 : (batch ? 0.9 : 0.6);   // non-scaling-stroke keeps these constant in px
    const op = batch ? 1 : 0.5;
    html += `<circle class="geo-dot" data-id="${p.id}" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(3)}" fill="${heat(t)}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}" vector-effect="non-scaling-stroke"></circle>`;
  });
  svg.innerHTML = html;
  svg.querySelectorAll(".geo-dot").forEach(c=>{
    c.addEventListener("click", ()=>{ if(!geoDragMoved) selectPump(c.dataset.id); });
  });
}

/* ---------- map zoom + pan controls (bound once) ---------- */
let geoDragMoved = false;
let geoRAF = 0;
function scheduleGeo(){ if(geoRAF) return; geoRAF = requestAnimationFrame(()=>{ geoRAF=0; renderGeo(state.ranked); }); }

function bindGeoControls(){
  const svg = document.getElementById("geoSvg");

  // +/- / reset buttons
  document.querySelector(".geo-zoom").addEventListener("click", e=>{
    const b = e.target.closest("button"); if(!b) return;
    const k = b.dataset.zoom;
    if (k==="reset"){ state.geoZoom = 1; state.geoCenter = {x:50, y:50}; }
    else            { state.geoZoom = clampZoom(state.geoZoom * (k==="in" ? 1.5 : 1/1.5)); }
    renderGeo(state.ranked);
  });

  // wheel zoom, anchored on the cursor
  svg.addEventListener("wheel", e=>{
    e.preventDefault();
    const rect = svg.getBoundingClientRect(); if(!rect.width) return;
    const vb = geoViewBox();
    const px = (e.clientX-rect.left)/rect.width;
    const py = (e.clientY-rect.top)/rect.height;
    const ux = vb.x + px*vb.w, uy = vb.y + py*vb.h;        // cursor position in map units
    const newZoom = clampZoom(state.geoZoom * (e.deltaY<0 ? 1.18 : 1/1.18));
    const nw = 100/newZoom;
    state.geoZoom = newZoom;
    state.geoCenter = { x: (ux - px*nw) + nw/2, y: (uy - py*nw) + nw/2 };  // keep cursor fixed
    scheduleGeo();
  }, {passive:false});

  // drag to pan
  let dragging=false, lastX=0, lastY=0;
  svg.addEventListener("pointerdown", e=>{
    dragging=true; geoDragMoved=false; lastX=e.clientX; lastY=e.clientY;
    svg.style.cursor="grabbing";
  });
  window.addEventListener("pointermove", e=>{
    if(!dragging) return;
    const rect = svg.getBoundingClientRect(); if(!rect.width) return;
    if (Math.abs(e.clientX-lastX)+Math.abs(e.clientY-lastY) > 2) geoDragMoved=true;
    const vb = geoViewBox();
    state.geoCenter.x -= (e.clientX-lastX)/rect.width  * vb.w;
    state.geoCenter.y -= (e.clientY-lastY)/rect.height * vb.h;
    lastX=e.clientX; lastY=e.clientY;
    scheduleGeo();
  });
  window.addEventListener("pointerup", ()=>{ if(dragging){ dragging=false; svg.style.cursor=""; } });
}

/* ---------- detail panel ---------- */
function renderDetail(ranked){
  const box = document.getElementById("detail");
  const p = ranked.find(x=> sameId(x.id, state.selectedId)) || ranked[0];
  if (!p){ box.innerHTML = `<div class="detail-empty">No pumps loaded.</div>`; return; }

  const score = priorityOf(p);
  const maxScore = ranked.length ? ranked[0].priority : 1;
  const imp = impactOf(p);
  const w = state.weights, sum = w.pop+w.qty+w.dist+w.non;

  const eq = state.impactOn
    ? `<b>${Math.round(p.likelihood*100)}%</b> likelihood &times; <b>${fmt1(imp)}</b>/10 impact &times; 100`
    : `impact off &middot; ranked on <b>${Math.round(p.likelihood*100)}%</b> failure probability`;

  const bars = FACTORS.map(f=>{
    const sc = p[f.field];
    const share = (state.impactOn && sum>0) ? Math.round(w[f.key]/sum*100)+"% weight" : (state.impactOn ? "—" : "off");
    return `
      <div class="fbar ${state.impactOn?"":"dim"}">
        <div class="fbar-top"><span class="fname">${f.name}</span><span class="fval">${fmt1(sc)}/10 &middot; ${share}</span></div>
        <div class="fbar-track"><div class="fbar-fill" style="width:${(sc/10*100).toFixed(0)}%;${state.impactOn?`background:${heat((sc-1)/9)}`:""}"></div></div>
      </div>`;
  }).join("");

  const dist = (p.dist_km!=null && !isNaN(p.dist_km)) ? fmt1(p.dist_km)+" km" : "—";
  const nearby = (p.n_nonfunc!=null && !isNaN(p.n_nonfunc)) ? fmtInt(p.n_nonfunc) : "—";

  box.innerHTML = `
    <div class="detail-rank">Rank <b>${pad2(p.rank)}</b> of ${fmtInt(state.pumps.length)} ${(state.topN==="all"||p.rank<=state.topN)?"&middot; in batch":""}</div>
    <div class="detail-id">Pump #${p.id}</div>
    <div class="detail-reg">${p.region||"Unknown region"}</div>

    <div class="detail-score">
      <span class="big" style="color:${heat(maxScore>0?score/maxScore:0)}">${fmt1(score)}</span>
      <span class="lab">priority score</span>
    </div>
    <div class="detail-eq">${eq}</div>

    <div class="dsec-label">Impact breakdown</div>
    ${bars}

    <div class="facts">
      <div><div class="fact-l">People served</div><div class="fact-v">${fmtInt(p.population||0)}</div></div>
      <div><div class="fact-l">Water availability</div><div class="fact-v">${cap(p.quantity)}</div></div>
      <div><div class="fact-l">Nearest working pump</div><div class="fact-v">${dist}</div></div>
      <div><div class="fact-l">Broken pumps nearby</div><div class="fact-v">${nearby}</div></div>
      <div><div class="fact-l">Failure likelihood</div><div class="fact-v">${Math.round(p.likelihood*100)}%</div></div>
      <div><div class="fact-l">GPS</div><div class="fact-v" style="font-size:11.5px">${p.lat!=null?fmt1(p.lat):"—"}, ${p.lon!=null?fmt1(p.lon):"—"}</div></div>
    </div>`;
}

/* ---------- master render ---------- */
function render(){
  const ranked = computeRanked();
  state.ranked = ranked;
  if (state.selectedId==null || !ranked.some(p=>sameId(p.id, state.selectedId)))
    state.selectedId = ranked.length ? ranked[0].id : null;
  renderKPIs(ranked);
  renderRank(ranked);
  renderGeo(ranked);
  renderDetail(ranked);
}
function selectPump(id){
  state.selectedId = id;
  // light update: re-mark rows, geo strokes, detail (avoid full FLIP churn)
  document.querySelectorAll(".row").forEach(r=> r.classList.toggle("is-selected", sameId(r.dataset.id, id)));
  renderGeo(state.ranked);
  renderDetail(state.ranked);
}

/* ---------- view + topN switches ---------- */
function bindSegments(){
  const tn = document.getElementById("topnSeg");
  tn.addEventListener("click", e=>{
    const b = e.target.closest("button"); if(!b) return;
    state.topN = b.dataset.n==="all" ? "all" : +b.dataset.n;
    tn.querySelectorAll("button").forEach(x=>x.classList.toggle("is-active", x===b));
    render();
  });
  const rev = document.getElementById("reverseBtn");
  rev.addEventListener("click", ()=>{
    state.reversed = !state.reversed;
    rev.classList.toggle("is-active", state.reversed);
    rev.setAttribute("aria-pressed", state.reversed);
    render();
  });
  const vs = document.getElementById("viewSeg");
  vs.addEventListener("click", e=>{
    const b = e.target.closest("button"); if(!b) return;
    state.view = b.dataset.view;
    vs.querySelectorAll("button").forEach(x=>x.classList.toggle("is-active", x===b));
    document.getElementById("rankView").hidden = state.view!=="rank";
    document.getElementById("geoView").hidden  = state.view!=="geo";
    if (state.view==="geo") renderGeo(state.ranked);
  });
  document.getElementById("impactToggle").addEventListener("click", ()=>{
    toggleImpact(); updateShares(); render();
  });
}

/* ---------- CSV loading (uses your real testSet_priority_ranked.csv) ---------- */
function parseCSV(text){
  const rows=[]; let row=[], field="", inQ=false;
  for (let i=0;i<text.length;i++){
    const c=text[i];
    if (inQ){
      if (c==='"'){ if (text[i+1]==='"'){ field+='"'; i++; } else inQ=false; }
      else field+=c;
    } else {
      if (c==='"') inQ=true;
      else if (c===","){ row.push(field); field=""; }
      else if (c==="\n"||c==="\r"){
        if (c==="\r"&&text[i+1]==="\n") i++;
        row.push(field); field="";
        if (row.length>1 || row[0]!=="") rows.push(row);
        row=[];
      } else field+=c;
    }
  }
  if (field!=="" || row.length){ row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const head = rows[0].map(h=>h.trim().toLowerCase());
  return rows.slice(1).map(r=>{
    const o={}; head.forEach((h,i)=> o[h]= r[i]!==undefined ? r[i].trim() : "");
    return o;
  });
}
function num(v){ const n=parseFloat(v); return isNaN(n)?null:n; }
function loadFromRecords(recs){
  const pick = (o,...keys)=>{ for(const k of keys){ if(o[k]!==undefined && o[k]!=="") return o[k]; } return undefined; };
  const pumps=[];
  for (const o of recs){
    const lik = num(pick(o,"likelihood_nonfunc","prob_nonfunc","likelihood"));
    const sPop = num(pick(o,"score_population","s_pop"));
    const sQty = num(pick(o,"score_quantity","s_qty"));
    const sDist= num(pick(o,"score_dist_nearest_functional_km","score_dist","s_dist"));
    const sNon = num(pick(o,"score_n_nonfunc_in_area","score_nonfunc","s_non"));
    if (lik==null || sPop==null || sQty==null || sDist==null || sNon==null) continue;
    pumps.push({
      id: pick(o,"id") ?? pumps.length,
      region: pick(o,"region") || "",
      lat: num(pick(o,"latitude","lat")),
      lon: num(pick(o,"longitude","lon")),
      population: num(pick(o,"population")) ?? 0,
      quantity: pick(o,"quantity","quantity_group") || "unknown",
      likelihood: Math.max(0,Math.min(1,lik)),
      dist_km: num(pick(o,"dist_nearest_functional_km")),
      n_nonfunc: num(pick(o,"n_nonfunc_in_area")),
      s_pop:sPop, s_qty:sQty, s_dist:sDist, s_non:sNon,
    });
  }
  return pumps;
}
// Shared by both the manual file picker and the auto-loader on page load:
// take a parsed list of pumps, make it the active dataset, and refresh the UI.
function applyLoadedPumps(pumps, label){
  state.pumps = pumps;
  state.selectedId = null;                 // let render() reselect the new rank 1
  const b = document.getElementById("sourceBadge");
  b.textContent = `${label} · ${fmtInt(pumps.length)} pumps`;
  b.className = "badge badge-loaded";
  render();
}

function bindCSV(){
  document.getElementById("csvInput").addEventListener("change", e=>{
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const pumps = loadFromRecords(parseCSV(reader.result));
        if (pumps.length < 1){
          toast("Couldn't find the required columns (likelihood_nonfunc + the four score_ columns).", true);
          return;
        }
        applyLoadedPumps(pumps, "Loaded file");
        toast(`Loaded ${fmtInt(pumps.length)} ranked pumps from ${file.name}.`);
      }catch(err){ toast("Could not read that file as CSV.", true); }
    };
    reader.readAsText(file);
    e.target.value = "";
  });
}

// Try to pull the standard ranked CSV (sitting in ./results next to index.html)
// straight away, so the page opens on the real data instead of the sample.
// fetch() of a local file only works when the page is *served* over http(s):
// opening index.html directly via file:// will throw, so we fall back to the
// embedded sample rather than leaving the page broken.
const DEFAULT_CSV_URL = "results/testSet_priority_ranked.csv";
async function autoLoadDefaultCSV(){
  try{
    const res = await fetch(DEFAULT_CSV_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const pumps = loadFromRecords(parseCSV(await res.text()));
    if (pumps.length < 1) throw new Error("no usable rows in the CSV");
    applyLoadedPumps(pumps, "Ranked CSV");
  }catch(err){
    // Most common reason here is the file:// restriction; keep the sample data
    // already on screen and just log why the auto-load didn't happen.
    console.warn(`Auto-load of ${DEFAULT_CSV_URL} skipped — using sample data instead.`, err);
  }
}
let toastTimer;
function toast(msg, isErr){
  const t = document.getElementById("toast");
  t.textContent = msg; t.hidden=false; t.className = "toast"+(isErr?" err":"");
  requestAnimationFrame(()=> t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ t.classList.remove("show"); setTimeout(()=>t.hidden=true,260); }, 3600);
}

/* ---------- init ---------- */
function init(){
  // Paint the embedded sample immediately so the page is never blank, then try
  // to replace it with the real ranked CSV. If the fetch succeeds the swap is
  // seamless; if it fails (e.g. opened via file://) the sample simply stays.
  state.pumps = (typeof SAMPLE_PUMPS!=="undefined" ? SAMPLE_PUMPS : []).map(p=>({...p}));
  buildKnobs(); bindSegments(); bindGeoControls(); bindCSV();
  toggleImpact(true); updateShares();
  render();
  autoLoadDefaultCSV();
}
if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
else init();

})();