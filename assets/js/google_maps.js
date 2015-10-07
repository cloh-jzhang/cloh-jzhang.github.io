// initialize logic for rendering different types of maps using the google maps API
// necessary parameters for rendering are encoded within the html elements

function renderSimpleMap(mapMetaContainer) {

}

function renderDirectionsServiceMap(mapMetaContainer) {

}


$(document).ready( function() {

  var mapType;
  var map;

  $(this).find('.map-meta-container').each(function() {
    mapType = $(this).attr('mapType');
    console.log('mapType: ' + mapType);
    map = renderMap(this);
  });

});
