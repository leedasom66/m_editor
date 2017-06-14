
function copy() {

    var image = document.querySelector('#contentsImg');
    console.log(image);


    var cropper = new Cropper(image, {
        dragMode: 'move',
        // aspectRatio: 16 / 9,
        autoCropArea: 0.3,
        restore: false,
        guides: false,
        center: false,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false

    });

}/**
 * Created by mmdpt3 on 2017-05-24.
 */
