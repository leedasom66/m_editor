/**
 * Created by mmdpt3 on 2017-05-17.
 */

function capture() {
//
//     var video = document.getElementById('video');

    html2canvas($("#webCam"), {
        onrendered: function (video) {
            var img = video.toDataURL("capturing/png");
            $("#webCam").html('<img src=' + img + ' style="background-color : black">');
        }
    });

//     //기존 위치 캡쳐
//     var dataURL = webcam.toDataURL;
//     console.log(dataURL);
// //
// //			var img = document.getElementById("devicePositionCapture");
// //            img.src = dataURL;
//
//     var img = new Image();
//     img.src = dataURL;
//
//     $("#webCam").html('<img src=' + img + '>');
//
//     context.drawImage(img, 0, 0);
//
//     console.log(img.src);


}

