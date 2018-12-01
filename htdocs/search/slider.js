$(function() {

    $( "#sliderRangeGreasy" ).slider({
        range: true,
        min: 1, max: 5,            
        values: [ 2, 4 ],
        slide: function( event, ui ) {
            $( "#GreasyRangeText" ).val( ui.values[ 0 ] + "～" + ui.values[ 1 ] );
        }
      });

    $( "#sliderRangeThickness" ).slider({
      range: true,
      min: 1, max: 5,            
      values: [ 2, 4 ],
      slide: function( event, ui ) {
          $( "#ThicknessRangeText" ).val( ui.values[ 0 ] + "～" + ui.values[ 1 ] );
      }
    });
    
    $( "#sliderRangeFirmness" ).slider({
        range: true,
        min: 1, max: 5,            
        values: [ 2, 4 ],
        slide: function( event, ui ) {
            $( "#FirmnessRangeText" ).val( ui.values[ 0 ] + "～" + ui.values[ 1 ] );
        }
      });

    $( "#sliderRangePrice" ).slider({
      range: true,
      min: 1, max: 5,            
      values: [ 2, 4 ],
      slide: function( event, ui ) {
          $( "#PriceRangeText" ).val( ui.values[ 0 ] + "～" + ui.values[ 1 ] );
      }
    });
    $( "#GreasyRangeText" ).val( $( "#sliderRangeGreasy" ).slider( "values", 0 ) + "～" + $( "#sliderRangeGreasy" ).slider( "values", 1 ) );
    $( "#ThicknessRangeText" ).val( $( "#sliderRangeThickness" ).slider( "values", 0 ) + "～" + $( "#sliderRangeThickness" ).slider( "values", 1 ) );
    $( "#FirmnessRangeText" ).val( $( "#sliderRangeFirmness" ).slider( "values", 0 ) + "～" + $( "#sliderRangeFirmness" ).slider( "values", 1 ) );
    $( "#PriceRangeText" ).val( $( "#sliderRangePrice" ).slider( "values", 0 ) + "～" + $( "#sliderRangePrice" ).slider( "values", 1 ) );
  });