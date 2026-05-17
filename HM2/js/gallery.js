/*Name this external file gallery.js*/

function siteLoaded(){
    console.log('Page is loaded!');
    const _previewPics = document.querySelectorAll('.preview');
    if( _previewPics.length > 0 ){
        for( let i = 0; i < _previewPics.length; i++ ){
            _previewPics[i].setAttribute('tabindex', '0');
        };
    }
}

function upDate(previewPic){
    const _imageDiv = document.getElementById("image");
    if( _imageDiv){
        _imageDiv.style.backgroundImage = `url(${previewPic.src})`;
        _imageDiv.innerHTML = previewPic.alt;
    }
}

function unDo(){
    const _imageDiv = document.getElementById("image");
    if( _imageDiv ){
        _imageDiv.style.backgroundImage = '';
        _imageDiv.innerHTML = 'Hover over an image below to display here.';
    }
}