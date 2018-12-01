function databaseInnerHTML(number){
    var text = '<span><b>スープの種類: </b></span>';

    for (var i = 3;i < 10;i++) {
        if (databaseData[number][i]) {
            switch(i){
                case 3: text += '<span>[醤油]</span>'; break;
                case 4: text += '<span>[味噌]</span>'; break;
                case 5: text += '<span>[豚骨]</span>'; break;
                case 6: text += '<span>[魚介]</span>'; break;
                case 7: text += '<span>[鶏ガラ]</span>'; break;
                case 8: text += '<span>[塩]</span>'; break;
                case 9: text += '<span>[その他]</span>'; break;
            }
        }
    }
    text += '</span>／<span><b>脂の量: </b>';
    switch(databaseData[number][10]){
        case "1": text += 'こってり'; break;
        case "2": text += 'ややこってり'; break;
        case "3": text += '普通'; break;
        case "4": text += 'ややあっさり'; break;
        case "5": text += 'あっさり'; break;
    }
    text += '</span>／<span><b>麺の太さ: </b></span>';
    switch(databaseData[number][11]){
        case "1": text += '太い'; break;
        case "2": text += 'やや太い'; break;
        case "3": text += '普通'; break;
        case "4": text += 'やや細い'; break;
        case "5": text += '細い'; break;
    }
    text += '</span>／<span><b>麺の固さ: </b></span>';
    switch(databaseData[number][12]){
        case "1": text += '固い'; break;
        case "2": text += 'やや固い'; break;
        case "3": text += '普通'; break;
        case "4": text += 'やや柔い'; break;
        case "5": text += '柔い'; break;
    }
    text += '</span>／<span><b>値段: </b></span>';
    switch(databaseData[number][13]){
        case "1": text += '高い'; break;
        case "2": text += 'やや高い'; break;
        case "3": text += '普通'; break;
        case "4": text += 'やや安い'; break;
        case "5": text += '安い'; break;
    }
    for (var i = 14;i < 18;i++) {
        if (databaseData[number][i]) {
            text += '</span>／<span><b>備考: </b></span>';
            break;
        }
    }
    for (var i = 14;i < 18;i++) {
        if (databaseData[number][i]) {
            switch(i){
                case 14: text += '<span>[' + databaseData[number][i] +']</span>'; break;
                case 15: text += '<span>[麺類]</span>'; break;
                case 16: text += '<span>[映える]</span>'; break;
                case 17: text += '<span>[個性的]</span>'; break;
            }
        }
    }
    text += '／<span><b>駅からの距離: </b>約';
    switch(databaseData[number][13]){
        case "1": text += '10分</span>'; break;
        case "2": text += '7分</span>'; break;
        case "3": text += '5分</span>'; break;
        case "4": text += '3分</span>'; break;
        case "5": text += '1分</span>'; break;
    }

    document.getElementById("databaseText").innerHTML = text;
}

var shopName;
var shopViewData = [], databaseData = [];

var req = new XMLHttpRequest();
req.open("get", "information/text/" + location.hash.slice(1) + ".txt", true);
req.send(null);
req.onload = function(){
    var tmp = req.responseText.split("\n");
    for(var i=0;i<tmp.length;++i){
        shopViewData.push(tmp[i].split(','));
    }
    document.getElementById("titleText").innerHTML = shopViewData[0][0];
    document.getElementById("storeInfoText").innerHTML =
        "<span><b>HP: <a href='" + shopViewData[4][0] + "' target='_blank'></b>" + shopViewData[4][0] + "</a>／</span>" +
        "<span><b>TEL: </b>" + shopViewData[5][0] + "／</span>" +
        "<span><b>営業時間: </b>" + shopViewData[6][0] + "／</span>" +
        "<span><b>住所: </b>" + shopViewData[2][0];
    document.getElementById("explanationText").innerHTML = shopViewData[7][0];
    
    $("#mapPc").attr("src", shopViewData[3][0]);
    $("#mapSp").attr("src", shopViewData[3][0]);
}

//詳細情報
var req2 = new XMLHttpRequest();
req2.open("get", "database.csv", true);
req2.send(null);
req2.onload = function(){
    var tmp2 = req2.responseText.split("\n");
    for(var i=0;i<tmp2.length;++i){
        databaseData.push(tmp2[i].split(','));
        if (databaseData[i][1] == location.hash.slice(1)) break;
    }
    databaseInnerHTML(databaseData.length - 1);
}