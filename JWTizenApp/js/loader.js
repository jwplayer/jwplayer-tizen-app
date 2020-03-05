head.js(
	{JQuery: 'js/scripts/jquery.js'},

	/* Player Config loaded here */
	{Init: 'js/init.js'},

	{MainMenu: "js/main-menu.js"},
	{VideoDetail: "js/video-details.js"},
	{TizenPlayer: "js/tizen-player.js"},

	/* Dev Player */
//	{JwPlayer: "http://player-develop-test-jenkins.longtailvideo.com/builds/lastSuccessfulBuild/archive/bin-debug/jwplayer.js"},
	/* Latest Tizen PR Player */
	 {JWPlayer: "http://player-pr-test-jenkins.longtailvideo.com/builds/25685/archive/bin-debug/jwplayer.js"},
	
	function() {
		MainMenu.setup();
	}
);
