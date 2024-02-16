const getElementFromDOM = (element) => {
    return document.querySelector(element);
}

const renderData = (data) => {
    if(data.length > 0){
        let html = '';
        console.log(data);
        for (const item of data) {
            html += '<tr scope="row">';
            html += `<td colspan="1">${item.artistName}</td>`;
            html += `<td colspan="1">${item.trackCensoredName}</td>`;
            html += `<td colspan="1">${item.collectionName}</td>`;
            html += `<td colspan="1"><img src="${item.artworkUrl100}" alt="music-artwork"></></td>`;
            html += `<td colspan="2"><audio controls src="${item.previewUrl}"></audio>`;
            html += '</tr>';
        }

        songsList.innerHTML = html;

        return;
    }

    songsList.innerHTML = 'Nisam dohvatio podatke!';
}

const fetchData = (url, method = 'GET') => {
    return fetch(url, {
        method: method
    });
}

const getDataFromApi = (event) => {
    event.preventDefault();

    const term = searchTerm.value;

    if(!term){
        alert('Unesite pojam koji tražite, kao naziv pjesme ili ime izvođača!');
        return;
    }

    const url = `https://itunes.apple.com/search?term=${term}&entity=song
    `;

    loader.classList.remove('d-none');
    loader.classList.add('d-flex');

    const dataPromise = fetchData(url);

    dataPromise.then(response => response.json())
               .then(data => {
                   renderData(data.results);
               })
               .catch(error => console.error(error))
               .finally(() => {
                    loader.classList.remove('d-flex');
                    loader.classList.add('d-none');
               });

}

const appInit = () => {
    const loader = getElementFromDOM('#loader');
    const searchTerm = getElementFromDOM('#searchTerm');
    const songsList = getElementFromDOM('#songsList');
    const searchBtn = getElementFromDOM('#searchBtn'); 

    searchBtn?.addEventListener('click', getDataFromApi);
    searchBtn?.addEventListener('keypress', getDataFromApi);
};

(() => {
    appInit();
})();