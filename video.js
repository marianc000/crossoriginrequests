import { findObject } from "./find.js";

function iframeHTML(id) {
    return `    <iframe width="376" height="576" src="https://www.youtube.com/embed/${id}" title="Araignée Géante" frameborder="0"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

async function video() {

    const doc = await fetch('https://www.youtube.com/@Natural-yogurt/shorts', { credentials: 'include' }).then(r => r.text().then(html => new DOMParser().parseFromString(html, "text/html")));

    const s = 'var ytInitialData =';
    const s2 = [...doc.querySelectorAll('script')].filter(e => e.textContent.includes(s)).map(e => e.textContent)[0];

    const o = JSON.parse(s2.match(/^[^{]+(\{.+\})[^}]*$/)[1]);

    const prefix = '/shorts/';
    const urls = findObject(o => o?.url?.startsWith(prefix), o).map(o => o.o.url.replace(prefix, ''));
    videoDiv.innerHTML = iframeHTML(urls[Math.floor(Math.random() * urls.length)]);
      console.log('<video',video)
}

export function insertNiceVideo() {
    console.log('>insertNiceVideo')
    try {
        video();
    } catch (ex) { console.log('EX',ex)}
}