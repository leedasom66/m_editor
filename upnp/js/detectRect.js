
function detectRec() {

    var rectInfo = '';
    var num = 0;
    var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var sessionStorage = window.sessionStorage;

	var tracker = new tracking.ColorTracker(['yellow']);
	tracking.track('#video', tracker, { camera: true });

	tracker.on('track', function(event) {
		context.clearRect(0, 0, canvas.width, canvas.height);

		event.data.forEach(function(rect) {

			rectInfo = new Array();

			context.strokeStyle = rect.color;
			context.strokeRect(rect.x, rect.y, rect.width, rect.height);
			context.font = '11px Helvetica';
			// context.fillStyle = rect.color;
			// context.fillRect(rect.x, rect.y, rect.width, rect.height);
			context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
			context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

			rectInfo[0] = rect.x;
			rectInfo[1] = rect.y;
			rectInfo[2] = rect.width;
			rectInfo[3] = rect.height;

			if(num<3) {
                sessionStorage.setItem(rect + num++, rectInfo);

                console.log(sessionStorage.getItem(rect + (num - 1)));
            }
		});
	});


};