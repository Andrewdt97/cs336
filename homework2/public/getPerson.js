$( document ).ready(function() {

  $( 'form' ).submit(function( event ) {
  event.preventDefault();
 
  var form = $( this );
  var array = form.serializeArray();
  var id = array[0].value;
  var url = 'http://localhost:3000/person/' + id;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function( resp ) {
      console.log( resp );
    }
  })
  .done(function( json ) {
        $("<em>", {html: JSON.stringify( json )}).appendTo("body"); 
    })
  .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    });
  });
  
});