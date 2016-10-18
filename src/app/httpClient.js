export default function() {
    this.get = (url, onRequestComplete) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200)
                onRequestComplete(request.responseText);
        }

        request.open("GET", url, true);
        request.send(null);
    }
}
