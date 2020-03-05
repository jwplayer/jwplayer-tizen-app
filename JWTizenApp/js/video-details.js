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
	    document.addEventListener('keydown', handleKeydown);
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
	
    function handleKeydown(e) {
		const currentDetail = document.querySelector('.active-detail');

    	if (!currentDetail) {
			return;
		}

		const parentEl = currentDetail.parentElement;
		
		switch(e.keyCode) {
			case 38: // UP arrow
				var prevParentEl = parentEl.previousElementSibling;

				while (prevParentEl && prevParentEl.tagName !== "DIV") {
					prevParentEl = prevParentEl.previousElementSibling;
				}

				if (!prevParentEl) {
					break;
				}

				currentDetail.classList.remove('active-detail');
				prevParentEl.firstElementChild.classList.add('active-detail');
				prevParentEl.firstElementChild.scrollIntoView();
				break;
			case 40: // DOWN arrow
				var nextParentEl = parentEl.nextElementSibling;

				while (nextParentEl && nextParentEl.tagName !== "DIV") {
					nextParentEl = nextParentEl.nextElementSibling;
				}

				if (!nextParentEl) {
					break;
				}

				currentDetail.classList.remove('active-detail');
				nextParentEl.firstElementChild.classList.add('active-detail');
				nextParentEl.firstElementChild.scrollIntoView();
				break;
			case 37: // LEFT arrow
				const prevDetail = currentDetail.previousElementSibling;
				
				if (!prevDetail) {
					break;
				}
				
				prevDetail.classList.add('active-detail');
				currentDetail.classList.remove('active-detail');
				prevDetail.scrollIntoView();
				break;
			case 39: // RIGHT arrow
				const nextDetail = currentDetail.nextElementSibling;
				
				if (!nextDetail) {
					break;
				}
				
				nextDetail.classList.add('active-detail');
				currentDetail.classList.remove('active-detail');
				nextDetail.scrollIntoView();
				break;
			case 13: // OK button
				TizenPlayer.setup(parentEl.id, currentDetail.id);
				document.removeEventListener('keydown', handleKeydown);
				break;
			case 10009: // RETURN button
			    alert('Are you sure you want to leave?');
				break;
			default:
				break;
		}
    }
}

VideoDetails.setup = new VideoDetails().setup;

