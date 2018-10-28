function naik(min, max, nilai) {
    return ( (nilai - min) / (max - min) )
}

function turun(min, max, nilai) {
    return ( (max - nilai) / (max - min) )
}

function cekPendapatan(data) {
    if (0 <= data && data <= 0.5) {
        pr = 1;
    } else if (0.5 < data && data < 1) {
        pr = turun(0.5, 1, data);
        ps = naik(0.5, 1, data);
    } else if (1 < data && data <= 1.5) {
        ps = turun(1, 1.5, data);
        pt = naik(1, 1.5, data);
    } else if (1.5 < data && data <= 2) {
        pt = 1;
    }
}

function cekHutang(data) {
    if (0 <= data && data <= 25) {
        hr = 1;
    } else if (25 < data && data <= 50) {
        hr = turun(25, 50, data);
        hs = naik(25, 50, data);
    } else if (50 < data && data <= 75) {
        hs = turun(50, 75, data);
        ht = naik(50, 75, data);
    }  else if (75 < data && data <= 100) {
        ht = 1;
    }
}

function cekKelayakan(pr, ps, pt, hr, hs, ht) {
    if (pr >0 && hr > 0) {
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

function deffuzificate(a,b) {
    return ((a*60) + (b*30) / (a + b))
}

function sort(dataSort) {
    tempData = [];
    for (let index = 0; index < dataSort.length; index++) {
        tempData[index] = {
            Keluarga: dataSort[index].Keluarga,
            Score: dataSort[index].Score
        }     
    }

    var sortData = tempData.slice(0);
    sortData.sort(function(a, b) {
        return b.Score - a.Score;
    });
    return sortData;
}

function reformat(params) {
    for (let index = 0; index < params.length; index++) {
        tempData[index] = {
            Keluarga: params[index].Keluarga
        }
    }
    return tempData;
}

function formatCSV(array) {
    var keys = Object.keys(array[0]);
    var result = keys.join(",") + "\n";
    array.forEach(function(obj){
        keys.forEach(function(k, ix){
            if (ix) result += ",";
            result += obj[k];
        });
        result += "\n";
    });
    return result;
}

function exportCSV(csvData) {
    var data, filename, data;
    var csv = csvData;
    if (csv == null) return;
    filename = 'TebakanTugas2.csv';
    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);
    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}