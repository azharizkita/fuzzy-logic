var dataEval = [];
var score;

function naik(min, max, nilai) {
    return ( (nilai - min) / (max - min) )
}

function turun(min, max, nilai) {
    return ( (max - nilai) / (max - min) )
}

function scores(a,b) {
    return ((a*60) + (b*30) / (a + b))
}

function cek(a, b, c) {
    if (a<=b) {
        if (a>=c) {
            return a;
        } else {
            return c;
        }
    } else if (b<=a) {
        if (b>=c) {
            return b;
        } else {
            return c;
        }
    }
}

// program utama
$.get('data.txt', function(textData) {

    // data.txt dipecah, setiap new line adalah array baru
    rawData = textData.split('\n');
    
    // melakukan perulangan sebanyak panjang dari array rawData
    for (let index = 0; index < rawData.length; index++) {
        data = rawData[index].split('\t').map(parseFloat);

        // inisiasi pendapatan
        pr = 0; // rendah
        ps = 0; // sedang
        pt = 0; // tinggi
        // inisiasi hutang
        hr = 0; // rendah
        hs = 0; // sedang
        ht = 0; // tinggi
        // inisiasi kelayakan
        l = 0;  // layak
        tl = 0; // tidak layak

        // cek kategori pendapatan
        if (0 <= data[1] && data[1] <= 0.5) {
            pr = 1;
        } else if (0.5 < data[1] && data[1] < 1) {
            pr = turun(0.5, 1, data[1]);
            ps = naik(0.5, 1, data[1]);
        } else if (1 < data[1] && data[1] <= 1.5) {
            ps = turun(1, 1.5, data[1]);
            pt = naik(1, 1.5, data[1]);
        } else if (1.5 < data[1] && data[1] <= 2) {
            pt = 1;
        }

        // cek kategori hutang
        if (0 <= data[2] && data[2] <= 25) {
            hr = 1;
        } else if (25 < data[2] && data[2] <= 50) {
            hr = turun(25, 50, data[2]);
            hs = naik(25, 50, data[2]);
        } else if (50 < data[2] && data[2] <= 75) {
            hs = turun(50, 75, data[2]);
            ht = naik(50, 75, data[2]);
        }  else if (75 < data[2] && data[2] <= 100) {
            ht = 1;
        }

        // cek kelayakan
        if (pr > 0 && hr > 0) {
            l = cek(pr, hr, l);
        }
        if (ps > 0 && hr > 0) {
            tl = cek(ps, hr, tl);
        }
        if (pt > 0 && hr > 0) {
            tl = cek(pt, hr, tl);
        }
        if (pr > 0 && hs > 0) {
            l = cek(pr, hs, l);
        }
        if (ps > 0 && hs > 0) {
            l = cek(ps, hs, l);
        }
        if (pt > 0 && hs > 0) {
            tl = cek(pt, hs, tl);
        }
        if (pr > 0 && ht > 0) {
            l = cek(pr, ht, l);
        }
        if (ps > 0 && ht > 0) {
            l = cek(ps, ht, l);
        }
        if (pt > 0 && ht > 0) {
            l = cek(pt, ht, l);
        }

        score = scores(l,tl);

        // data disimpan dalam array of object
        dataEval[index] = {
                Keluarga: data[0],
                Pendapatan: data[1],
                Hutang: data[2],
                ps: ps, pr: pr, pt: pt,
                hs: hs, hr: hr, ht: ht,
                Lolos: l,
                TidakLolos: tl,
                Score: score
        }    
    }

    // sorting descending
    finalData = sort(dataEval);
    // membuang kolom score
    finalData = reformat(finalData);
    // parsing 20 data teratas array of object menjadi dump CSV 
    csvDump = formatCSV(finalData.slice(0, 20));
    // export dump CSV menjadi file .csv
    // exportCSV(csvDump);
    
    console.log("Top 20 keluarga yang layak menerima BLT:");
    console.table(finalData.slice(0, 20));
    console.log("Detail data:");
    console.table(dataEval);
});