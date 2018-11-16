//https://uxmilk.jp/11586
//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "search/database.csv", true);
    req.send(null);
    req.onload = function(){
	convertCSVtoArray(req.responseText);
    }
}
// 読み込んだCSVデータを二次元配列に変換
function convertCSVtoArray(str){
    var result = [];
    var tmp = str.split("\n");
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }
    alert(result[0][1]);
}

//ページの読み込み完了時
window.onload = function() {
    getCSV();
 }

 //検索ボタンを押された時
 var searchButton = function () {

    var greasy, thickness, firmness, price;
    //脂の量
    if (document.getElementById("greasy0").checked &&
        !document.getElementById("greasy1").checked &&
        !document.getElementById("greasy2").checked) greasy = 5;
    else
    if (document.getElementById("greasy0").checked &&
        document.getElementById("greasy1").checked &&
        !document.getElementById("greasy2").checked) greasy = 4;
    else
    if (!document.getElementById("greasy0").checked &&
        document.getElementById("greasy1").checked &&
        document.getElementById("greasy2").checked) greasy = 2;
    else
    if (!document.getElementById("greasy0").checked &&
        !document.getElementById("greasy1").checked &&
        document.getElementById("greasy2").checked) greasy = 1;
    else  greasy = 3;
    //太さ
    if (document.getElementById("thickness0").checked &&
        !document.getElementById("thickness1").checked &&
        !document.getElementById("thickness2").checked) thickness = 5;
    else
    if (document.getElementById("thickness0").checked &&
        document.getElementById("thickness1").checked &&
        !document.getElementById("thickness2").checked) thickness = 4;
    else
    if (!document.getElementById("thickness0").checked &&
        document.getElementById("thickness1").checked &&
        document.getElementById("thickness2").checked) thickness = 2;
    else
    if (!document.getElementById("thickness0").checked &&
        !document.getElementById("thickness1").checked &&
        document.getElementById("thickness2").checked) thickness = 1;
    else  thickness = 3;
    //固さ
    if (document.getElementById("firmness0").checked &&
        !document.getElementById("firmness1").checked &&
        !document.getElementById("firmness2").checked) firmness = 5;
    else
    if (document.getElementById("firmness0").checked &&
        document.getElementById("firmness1").checked &&
        !document.getElementById("firmness2").checked) firmness = 4;
    else
    if (!document.getElementById("firmness0").checked &&
        document.getElementById("firmness1").checked &&
        document.getElementById("firmness2").checked) firmness = 2;
    else
    if (!document.getElementById("firmness0").checked &&
        !document.getElementById("firmness1").checked &&
        document.getElementById("firmness2").checked) firmness = 1;
    else  firmness = 3;
    //値段
    if (document.getElementById("price0").checked &&
        !document.getElementById("price1").checked &&
        !document.getElementById("price2").checked) price = 5;
    else
    if (document.getElementById("price0").checked &&
        document.getElementById("price1").checked &&
        !document.getElementById("price2").checked) price = 4;
    else
    if (!document.getElementById("price0").checked &&
        document.getElementById("price1").checked &&
        document.getElementById("price2").checked) price = 2;
    else
    if (!document.getElementById("price0").checked &&
        !document.getElementById("price1").checked &&
        document.getElementById("price2").checked) price = 1;
    else  price = 3;

    //結果表示
    document.getElementById("searchResults").innerHTML = null;
    document.getElementById("searchResults").innerHTML += "脂:" + greasy + " ";
    document.getElementById("searchResults").innerHTML += "太:" + thickness + " ";
    document.getElementById("searchResults").innerHTML += "固:" + firmness + " ";
    document.getElementById("searchResults").innerHTML += "金:" + price + " ";
  };