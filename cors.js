const URL = 'https://cors-server-for-extension.ue.r.appspot.com/data/32';

function send(method, credentials ) {
    const options = { method,credentials };

    // if (credentials)
    //     options.credentials = credentials;

    if (['post', 'put', 'PATCH'].includes(method)) {
        options.headers = {
            "Content-Type": "application/json",
        };
        options.body = JSON.stringify({ data: 123 });
    }

    return fetch(URL, options)
        .then(r => {
            if (r.ok) return r.json();
            return { error: r.status + ' ' + r.statusText };
        }).catch(er => ({ error: er })).then(o=>Object.assign(o,{credentials}));
}

function toRow(o) {
    if (o.error) return `<tr><td>${o.credentials||''}</td><td colspan=4>${o.error}</td></tr>`
    return `<tr><td>${o.credentials||''}</td><td>${o.method}</td><td>${o.time}</td><td>${o.sessionId}</td><td>${o.data}</td></tr>`;
}

function sendAndDisplay(method, credentials) {
    return send(method, credentials).then(o => {
        console.log(o);
        tbody.insertAdjacentHTML('beforeend', toRow(o));
    });
}

function request(credentials) {
    return sendAndDisplay('get', credentials)
        .then(() => sendAndDisplay('post', credentials))
        .then(() => sendAndDisplay('put', credentials))
        .then(() => sendAndDisplay('delete', credentials))
        .then(() => sendAndDisplay('PATCH', credentials));
}

function tryRequests() {
    tbody.replaceChildren();
    request()
    .then(() => request('include'))
    .then(() => request('omit'))
    .then(() => request('same-origin'));
}

tryRequests();

fetchBtn.addEventListener('click',tryRequests);

