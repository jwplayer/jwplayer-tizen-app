var TizenPlayer = {
	setup: function(category, videoId) {
		$("<div>").load("html/tizen-player.html", function() {
			$("body").html($(this).html());

			var videoConfig = (playerConfig && playerConfig[category][videoId]) || {};
			videoConfig['isTizenApp'] = true;

			jwplayer("player").setup(function() {
				setTimeout(function() {
					jwplayer().setFullscreen(true);

					jwplayer().on('backClick', function() {
						MainMenu.setup();
					});
				});
				return videoConfig;
			}());
		});
	}
};
