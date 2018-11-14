function readCsv(data) {
  var target = '#csv-body';
  var csv = $.csv.toArrays(data);
  var insert = '';
  $(csv).each(function() {
      if (this.length > 0) {
          insert += '<tr>';
          $(this).each(function() {
              insert += '<td>' + this + '</td>';
          });
          insert += '</tr>';
      }
  });
  $(target).append(insert);
}

var csvfile = 'search/database.csv';

$(function(){
  $.get(csvfile, readCsv, "https");
});