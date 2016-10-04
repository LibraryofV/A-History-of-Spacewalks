var checkInterval = 0;
var appResult = document.getElementById('app');

checkInterval = setInterval(function() {
        if (appResult.clientHeight > 1000) {
            document.body.removeAttribute('class');
            window.scrollTo(0, 0);
            clearInterval(checkInterval);
        }
    },
50);
