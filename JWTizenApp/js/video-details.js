const VideoDetail = function(item, index) {
	return {
		'id': index,
		'image': item.image,
		'title': item.title,
		'description': item.description
	};
};

function VideoDetails() {
	const videoCategories = ["Ads", "Basic", "Captions", "DVR-Live"];

	this.setup = function() {
	    generateVideoDetails();
    };

	function generateVideoDetails() {
		videoCategories.forEach(function(category) {
			generateVideoDetailsForCategory(category);
		});
	}

	function generateVideoDetailsForCategory(category) {
		const categoryConfig = (playerConfig && playerConfig[category]) || [];
		const videoDetails = categoryConfig.map(function(x, index) {
			return new VideoDetail(x, index);
		});

		renderVideoDetails(category, videoDetails);
	}

	function renderVideoDetails(category, videoDetails) {
		videoDetails.forEach(function(detail) {
			var titleEl = document.createElement('p');
			titleEl.innerText = detail.title;

			var imgEl = new Image(500, 280);
			imgEl.src = detail.image || '';

			var detailEl = document.createElement('div');
			detailEl.id = detail.id;
			detailEl.appendChild(imgEl);
			detailEl.appendChild(titleEl);
			detailEl.classList.add('video-detail');

			// Initially highlight first item in first row
			if (category === 'Ads' && detail.id === 0) {
				detailEl.classList.add('active-detail');
			}

			document.getElementById(category).appendChild(detailEl);
		});
	}
}

VideoDetails.setup = new VideoDetails().setup;

