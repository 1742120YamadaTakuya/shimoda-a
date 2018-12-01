var database = [];
//https://uxmilk.jp/11586
//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "database.csv", true);
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

 //リサイズ時
$(window).on('load resize', function(){
    document.documentElement.style.setProperty('--tableWidth', Math.min(window.innerHeight * 0.8, window.innerWidth * 0.9) + "px");
});

//検索
var matchSoup = [false,false,false,false,false,false,false],
    matchChoiceMin = [2,2,2,2], matchChoiceMax = [4,4,4,4],
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
    matchChoiceMin[0] = $( "#sliderRangeGreasy" ).slider( "values", 0 );
    matchChoiceMax[0] = $( "#sliderRangeGreasy" ).slider( "values", 1 );
    matchChoiceMin[1] = $( "#sliderRangeThickness" ).slider( "values", 0 );
    matchChoiceMax[1] = $( "#sliderRangeThickness" ).slider( "values", 1 );
    matchChoiceMin[2] = $( "#sliderRangeFirmness" ).slider( "values", 0 );
    matchChoiceMax[2] = $( "#sliderRangeFirmness" ).slider( "values", 1 );
    matchChoiceMin[3] = $( "#sliderRangePrice" ).slider( "values", 0 );
    matchChoiceMax[3] = $( "#sliderRangePrice" ).slider( "values", 1 );

    if (document.getElementById("GreasyUnspec").checked){
        matchChoiceMin[0] = 1;
        matchChoiceMax[0] = 5;
    }
    if (document.getElementById("ThicknessUnspec").checked){
        matchChoiceMin[1] = 1;
        matchChoiceMax[1] = 5;
    }
    if (document.getElementById("FirmnessUnspec").checked){
        matchChoiceMin[2] = 1;
        matchChoiceMax[2] = 5;
    }
    if (document.getElementById("PriceUnspec").checked){
        matchChoiceMin[3] = 1;
        matchChoiceMax[3] = 5;
    }
}
function setSystemMatch(){
    systemMatch = "";
    if (document.getElementById("system0").checked) systemMatch = "家系";
    else if (document.getElementById("system1").checked) systemMatch = "次郎系";
    else if (document.getElementById("system0").checked && document.getElementById("system1").checked) systemMatch = "家系 次郎系";
}
function setOtherMatch(){
    for (var i = 0; i<3;i++){
        if (document.getElementById("other" + i).checked) otherMatch[i] = true;
        else otherMatch[i] = false;
    }
}
var score = [false,false,false,false];
var choiceScore = 0, otherScore = 0;

function showJudgment(){
    result = [];
    for(var y = 1; y < database.length; ++y){
        score = [false,false,false,false], choiceScore = 0, otherScore = 0;
        for(var x = 3; x < database[y].length; ++x){

            switch (x){
                case 3: case 4: case 5: case 6: case 7: case 8: case 9:     //スープ
                    if (database[y][x] && matchSoup[x - 3]){
                        score[0] = true;
                    }
                    break;
                case 10: case 11: case 12: case 13:                         //脂や麺、値段
                    if (database[y][x] >= matchChoiceMin[x - 10] &&
                        database[y][x] <= matchChoiceMax[x - 10] ) {      
                            ++choiceScore;
                    }
                    break;
                case 14:                                                    //系統(OR)
                    if (!score[2] && systemMatch != "" && database[y][x] != systemMatch) score[2] = false;
                    else score[2] = true;
                    break;
                case 15: case 16: case 17:                                  //その他(AND)
                    if (!otherMatch[x - 15] || database[y][x]) otherScore++;
                    break;
            }
            if (choiceScore == 4) score[1] = true;
            if (otherScore == 3) score[3] = true;
        }
        if (score[0] == true &&  score[1] == true && score[2] == true && score[3] == true){
            result.push(y);
        }
    }
    return result;
}
function displayTable(y){
    var stationDistance = "不明";
    switch (database[y][18]){
        case "1": stationDistance = '<span>1分</span>'; break;
        case "2": stationDistance = '<span>3分</span>'; break;
        case "3": stationDistance = '<span>5分</span>'; break;
        case "4": stationDistance = '<span>7分</span>'; break;
        case "5": stationDistance = '<span>10分</span>'; break;
    }

    document.getElementById("searchResults").innerHTML += 
    '<div class="displayDiv" style="display: inline-block; margin: 1vh 2.5vw;">' +
    '<table class="displayTable" style="width: var(--tableWidth); height: calc(var(--tableWidth) / 3); background: #fb4;">' + 
    '<tr class="displayTable">' + 
        '<td rowspan="3" title="Ramen image" class="displayTable" style="width:30%; height:100%;' + 
            'background-image: url(image/shop/' + database[y][1] + '.jpg); background-position: 50%; background-size: cover;">' + 
        '</td>' + 
        '<td colspan="4" class="displayTable" style="width:70%; height:30%;">' + 
            database[y][0] + 
        '</td>' + 
    '</tr>' + 
    '<tr class="displayTable">' + 
        '<td rowspan="2" class="displayTable" style="width:14%; height:35%;">' + 
            '<span style="font-size:50%;">駅から約</span>' + stationDistance +
            '<span>' + database[y][19] + '</span>' + 
        '</td>' + 
        '<td class="displayTable" style="width:14%; height:35%;">' + 
            '脂:' + database[y][10] + 
        '</td>' + 
        '<td class="displayTable" style="width:14%; height:35%;">' + 
            '太:' + database[y][11] + 
        '</td>' + 
        '<td rowspan="2" class="displayTable" style="width:28%; height:70%; font-size: 0.7em;">' + 
            database[y][2] + 
        '</td>' + 
    '</tr>' + 
    '<tr class="displayTable">' + 
        '<td class="displayTable" style="width:14%; height:35%;">' + 
            '固:' + database[y][12] + 
        '</td>' + 
        '<td class="displayTable" style="width:14%; height:35%;">' + 
            '値:' + database[y][13] + 
        '</td>' + 
    '</tr>' + 
'</table><a href="information.html#' + database[y][1] + '" target="_blank"></a>' +
'</div>';
}

 //検索ボタンを押された時
function searchButton() {

    document.getElementById("searchResults").innerHTML = null;
     
    setMatchSoup();
    setMatchChoice();
    setSystemMatch();
    setOtherMatch();
    
    var show = showJudgment();

    document.getElementById("searchResults").innerHTML += "検索結果　" + show.length + "件／" + (database.length - 2) + "件中<br>";
    
    for (var i = 0; i < show.length; i++){
        displayTable(i + 1);
    }
  }