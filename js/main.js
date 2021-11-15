const username = "RauPro"
const ioKey = "aio_DCqp676VR0NF79PF3xiNAXfatlbx"
const apiUrl = "https://io.adafruit.com";

async function getFeeds(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-AIO-Key': `${ioKey}`
        },
    });
    return response.json();
}
getFeeds(apiUrl + `/api/v2/${username}/feeds/`).then(data => console.log(data))
