var checkInterval = 0;
var count = 0;
var appResult = document.getElementById('app');
var loadingContain = document.getElementsByClassName("loading")[0];
var loadingText = document.getElementsByClassName("loadingText")[0];
var loadingMessage = 'Loading'

var iterateLoadingMessage = function() {
    if (isBodyContentLoaded()) {
        document.body.removeAttribute('class');
        loadingContain.style.right = '-200px';
        clearInterval(checkInterval);
    }

    if (count === 20) {
        loadingMessage = getCorrectMessage(loadingMessage);
        loadingContain.innerHTML = loadingMessage;
        count = 0;
    } else {
        count++;
    }
}

var isBodyContentLoaded = function() {
    return appResult.clientHeight > 1000;
}

var getCorrectMessage = function(current) {
    switch (current) {
        case 'Loading':
            return 'Loading.';
        case 'Loading.':
            return 'Loading..';
        case 'Loading..':
            return 'Loading...';
        default:
            return 'Loading';
    }
}

loadingContain.innerHTML = "Loading";
checkInterval = setInterval(iterateLoadingMessage, 10);
