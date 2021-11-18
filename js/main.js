const username = "RauPro"
const ioKey = ""
const apiUrl = "https://io.adafruit.com";
const storage = !localStorage.getItem('door') ? [] : JSON.parse(localStorage.getItem('door'));

const createTable = () => {
    document.querySelector('.table-door').innerHTML = `
            <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
           <tbody>
    `;
    for (let data of storage){
        document.querySelector('.table-door').innerHTML+= `
            <tr>
                <td>${data.date}</td>
                <td>${data.status}</td>
            </tr>
        `;
    }
    document.querySelector('.table-door').innerHTML+= ` <tbody>`

}
createTable();
async function getFeeds(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-AIO-Key': `${ioKey}`
        },
    });
    return response.json();
}

async function getFeed(key) {
    const response = await fetch(apiUrl + `/api/v2/${username}/feeds/${key}`, {
        method: 'GET',
        headers: {
            'X-AIO-Key': `${ioKey}`
        },
    });
    return response.json();
}

async function updateFeed(feed_key, body) {
    const response = await fetch(apiUrl + `/api/v2/${username}/feeds/${feed_key}/data`, {
        method: 'POST',
        headers: {
            'X-AIO-Key': `${ioKey}`,
        },
        body,


    });
    return response.json();
}

getFeeds(apiUrl + `/api/v2/${username}/feeds/`).then(data => console.log(data))
getFeed('door').then(data => console.log(data))

const doorBtn = document.querySelector('.door-button');
const doorInput = document.querySelector('.key-door');

doorBtn.addEventListener("click", ()=>{
    if (doorInput.value==="1234"){
        const body = new FormData
        body.append("value", "ON")
        updateFeed('door', body).then(data => console.log(data))
        body.delete('value');
        body.append("value", "OFF")
        setInterval(() => {
            updateFeed('door', body).then(data => console.log(data))
            const current = {date: new Date().toString().substring(0, 21), status: 'Open'}
            storage.unshift(current);
            localStorage.setItem('door', JSON.stringify(storage))
            createTable();
            location.reload();
        }, 1000)

    }
    else {
        alert("Invalid key")
    }
})




