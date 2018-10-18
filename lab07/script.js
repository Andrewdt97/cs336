// Andrew Thomas
// CS 336 lab07

$( document ).ready(function() {

    $( "a" ).click(function( event ) {
 
        alert( "Thanks for visiting!" );
 		event.preventDefault();
 		$( this ).hide( "slow" );
    });
    $( "a" ).addClass( "test" );


    $( "#myButton" ).click( function() {
		$.ajax({
	 
		    // The URL for the request
		    url: "http://127.0.0.1:3000/hello",
		 
		    // The data to send (will be converted to a query string)
		    data: {
		        "text": "lab07" 
		    },
		 
		    // Whether this is a POST or GET request
		    type: "GET",
		 
		    // The type of data we expect back
		    dataType : "json",
		})
	    .done(function( json ) {
	    	var string = json['text'];
		  	$("<em>", {html: string}).appendTo("body");	
	    })
	    .fail(function( xhr, status, errorThrown ) {
		    alert( "Sorry, there was a problem!" );
		    console.log( "Error: " + errorThrown );
		    console.log( "Status: " + status );
		    console.dir( xhr );
	    })
	    .always(function( xhr, status ) {
		    //alert( "The request is complete!" ); // Removed this because I found it annoying, but it is here
	    });
    	
    });
	
});