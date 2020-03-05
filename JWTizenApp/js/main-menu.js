var MainMenu = {
	setup: function() {
	    $("<div>").load("html/main-menu.html", function() {
	        $("body").html($(this).html());

	        	VideoDetails.setup();
	    });
	}
};
