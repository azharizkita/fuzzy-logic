$.get('DataTugas2.csv', function(textData) {
    var dataEval = [];
    // data.txt dipecah, setiap new line adalah array baru
    rawData = textData.split('\n');
    /* karena array pertama dan terakhir berisis header dan array kosong, 
    slice array antara array kedua dari depan sampai kedua dari belakang */
    rawData = rawData.slice(1, rawData.length - 1);
    // melakukan perulangan sebanyak panjang dari array rawData
    for (let index = 0; index < rawData.length; index++) {
        data = rawData[index].split(',').map(parseFloat);
        // inisiasi pendapatan
        pr = 0; ps = 0; pt = 0; 
        // inisiasi hutang
        hr = 0; hs = 0; ht = 0;
        // inisiasi kelayakan
        l = 0; tl = 0;
        // cek kategori pendapatan
        cekPendapatan(data[1]);
        // cek kategori hutang
        cekHutang(data[2]);
        // cek kelayakan
        cekKelayakan(pr, ps, pt, hr, hs, ht);
        let score = deffuzificate(l,tl);
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
    exportCSV(csvDump);

    // tampilan table info pada console
    console.log("Top 20 keluarga yang layak menerima BLT:");
    console.table(finalData.slice(0, 20));
    console.log("Detail data:");
    console.table(dataEval);
});