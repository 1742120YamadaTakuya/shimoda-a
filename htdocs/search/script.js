var database = [];
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
    database = [];
    var tmp = str.split("\n");
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        database[i] = tmp[i].split(',');
    }
}

//ページの読み込み完了時
window.onload = function() {
    getCSV();
    
 }

$(window).on('load resize', function(){
    document.documentElement.style.setProperty('--tableWidth', Math.min(window.innerHeight * 0.3, window.innerWidth * 0.95) + "px");
});

var matchSoup = [false,false,false,false,false,false,false],
    matchChoice = [3,3,3,3],
    systemMatch = "",
    otherMatch = [false,false,false],
    matchScore = [][false,false,false,false];

function setMatchSoup(){
    matchSoup = [document.getElementById("Soup0").checked,
        document.getElementById("Soup1").checked,
        document.getElementById("Soup2").checked,
        document.getElementById("Soup3").checked,
        document.getElementById("Soup4").checked,
        document.getElementById("Soup5").checked,
        document.getElementById("Soup6").checked,];
    if (matchSoup[0] == false && matchSoup[1] == false && matchSoup[2] == false &&
        matchSoup[3] == false && matchSoup[4] == false && matchSoup[5] == false && matchSoup[6] == false)
        matchSoup = [true,true,true,true,true,true,true];
}
function setMatchChoice(){
    //脂の量
    if (document.getElementById("greasy0").checked &&
        !document.getElementById("greasy1").checked &&
        !document.getElementById("greasy2").checked) matchChoice[0] = 5;
    else
    if (document.getElementById("greasy0").checked &&
        document.getElementById("greasy1").checked &&
        !document.getElementById("greasy2").checked) matchChoice[0] = 4;
    else
    if (!document.getElementById("greasy0").checked &&
        document.getElementById("greasy1").checked &&
        document.getElementById("greasy2").checked) matchChoice[0] = 2;
    else
    if (!document.getElementById("greasy0").checked &&
        !document.getElementById("greasy1").checked &&
        document.getElementById("greasy2").checked) matchChoice[0] = 1;
    else
    if (document.getElementById("greasy0").checked &&
        document.getElementById("greasy1").checked &&
        document.getElementById("greasy2").checked) matchChoice[0] = 6;
    else matchChoice[0] = 3;
    //太さ
    if (document.getElementById("thickness0").checked &&
        !document.getElementById("thickness1").checked &&
        !document.getElementById("thickness2").checked) matchChoice[1] = 5;
    else
    if (document.getElementById("thickness0").checked &&
        document.getElementById("thickness1").checked &&
        !document.getElementById("thickness2").checked) matchChoice[1] = 4;
    else
    if (!document.getElementById("thickness0").checked &&
        document.getElementById("thickness1").checked &&
        document.getElementById("thickness2").checked) matchChoice[1] = 2;
    else
    if (document.getElementById("thickness0").checked &&
        document.getElementById("thickness1").checked &&
        document.getElementById("thickness2").checked) matchChoice[1] = 6;
    else matchChoice[1] = 3;
    //固さ
    if (document.getElementById("firmness0").checked &&
        !document.getElementById("firmness1").checked &&
        !document.getElementById("firmness2").checked) matchChoice[2] = 5;
    else
    if (document.getElementById("firmness0").checked &&
        document.getElementById("firmness1").checked &&
        !document.getElementById("firmness2").checked) matchChoice[2] = 4;
    else
    if (!document.getElementById("firmness0").checked &&
        document.getElementById("firmness1").checked &&
        document.getElementById("firmness2").checked) matchChoice[2] = 2;
    else
    if (document.getElementById("firmness0").checked &&
        document.getElementById("firmness1").checked &&
        document.getElementById("firmness2").checked) matchChoice[2] = 6;
    else matchChoice[2] = 3;
    //値段
    if (document.getElementById("price0").checked &&
        !document.getElementById("price1").checked &&
        !document.getElementById("price2").checked) matchChoice[3] = 5;
    else
    if (document.getElementById("price0").checked &&
        document.getElementById("price1").checked &&
        !document.getElementById("price2").checked) matchChoice[3] = 4;
    else
    if (!document.getElementById("price0").checked &&
        document.getElementById("price1").checked &&
        document.getElementById("price2").checked) matchChoice[3] = 2;
    else
    if (document.getElementById("price0").checked &&
        document.getElementById("price1").checked &&
        document.getElementById("price2").checked) matchChoice[3] = 6;
    else matchChoice[3] = 3;
}
function setSystemMatch(){
    systemMatch = "";
    if (document.getElementById("system0").checked) systemMatch = "家系";
    else if (document.getElementById("system1").checked) systemMatch = "次郎系";
    else if (document.getElementById("system0").checked && document.getElementById("system1").checked) systemMatch = "家系 次郎系";
}
function setOtherMatch(){
    otherMatch[
        document.getElementById("other0").checked,
        document.getElementById("other1").checked,
        document.getElementById("other2").checked
    ];
}
function showJudgment(){
    result = [];

    for(var y = 1; y < database.length; ++y){
        var score = [false,false,false,false], choiceScore = 0;
        for(var x = 3; x < database[y].length; ++x){

            switch (x){
                case 3: case 4: case 5: case 6: case 7: case 8: case 9:     //スープ
                    if (database[y][x] && matchSoup[x - 3]){
                        score[0] = true;
                    }
                    break;
                case 10: case 11: case 12: case 13:                         //脂や麺、値段
                    if (database[y][x] <= matchChoice[x - 10] + 1 &&
                        database[y][x] >= matchChoice[x - 10] - 1 ||
                        matchChoice[x - 10] == 6) {      
                            ++choiceScore;
                    }
                    if (choiceScore == 4) {               
                        score[1] = true;
                    }
                    break;
                case 14:                                                    //系統
                    if (systemMatch != "" && database[y][x] != systemMatch) score[2] = false;
                    else {
                        score[2] = true;
                    }
                    break;
                case 15: case 16: case 17:                                  //その他
                    if (otherMatch[x - 15] && database[y][x] != otherMatch[x - 15]) score[3] = false;
                    else {
                        score[3] = true;
                    }
                    break;
            }
        }
        if (score[0] == true &&  score[1] == true && score[2] == true && score[3] == true){
            result.push(y);
        }
    }
    return result;
}
function displayTable(){
    
}

 //検索ボタンを押された時
function searchButton() {

    document.getElementById("searchResults").innerHTML = null;
     
    setMatchSoup();
    setMatchChoice();
    setSystemMatch();
    setOtherMatch();
    
    var show = showJudgment();

    document.getElementById("searchResults").innerHTML += "検索結果　" + show.length + "件／" + (database.length - 1) + "件中<br>";
    
    for (var i = 0; i < show.length; i++){
        document.getElementById("searchResults").innerHTML += database[show[i]][0] + "<br>";
    }


    /*
    //デバッグ時　確認用
    document.getElementById("searchResults").innerHTML = null;
    document.getElementById("searchResults").innerHTML += "脂:" + matchChoice[0] + " ";
    document.getElementById("searchResults").innerHTML += "太:" + matchChoice[1] + " ";
    document.getElementById("searchResults").innerHTML += "固:" + matchChoice[2] + " ";
    document.getElementById("searchResults").innerHTML += "金:" + matchChoice[3] + " ";

    document.getElementById("searchResults").innerHTML += "<br>";

    for(var y = 0; y < result.length; ++y){

        for(var x = 0; x < result[y].length; ++x){
            document.getElementById("searchResults").innerHTML += result[y][x] + ",";
        }
        document.getElementById("searchResults").innerHTML += "<br>";
    }
    */
  }