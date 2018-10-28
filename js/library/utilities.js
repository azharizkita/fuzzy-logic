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