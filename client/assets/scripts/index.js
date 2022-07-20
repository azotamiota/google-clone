const searchBtn = document.getElementById('btn-search');
const randButton = document.getElementById('btn-random');
const resultsUrl = 'http://localhost:3000/results';
const randomUrl = 'http://localhost:3000/results/random';

const fetchData = (e, url, random) => {

    const main = document.querySelector('main');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Loading...'
    main.appendChild(errorMessage)

    e.preventDefault();
    fetch(url)
    .then(res => res.json())
    .then(data => {
        main.removeChild(errorMessage)
        if(random) {
            displayRandomData(data)
        } else {
            displayData(data)
        }
    })
    .catch(err => {
        errorMessage.textContent = 'Server failure, try again later';
        console.log(err)})
}

const fetchRandomData = (e) => {

}

searchBtn.addEventListener('click', (e) => fetchData(e, resultsUrl, false));
randButton.addEventListener('click', (e) => fetchData(e, randomUrl, true));

const displayData = (data) => {
    const nav = document.getElementById('header');
    const main = document.querySelector('main')
    nav.classList.add('hidden');
    for(let page in data) {
        const obj = data[`${page}`];

        const segment = document.createElement('article');
        main.appendChild(segment);

        const title = document.createElement('h1');
        segment.appendChild(title);

        const a = document.createElement('a');
        const aNode = document.createTextNode(obj.title)
        a.setAttribute('href', obj.url);
        a.setAttribute('id', `result-${page}`)
        a.setAttribute('class', 'search-link')
        a.appendChild(aNode)
        title.appendChild(a)

        const content = document.createElement('p');
        const contentNode = document.createTextNode('Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit fugiat, obcaecati cupiditate eveniet nulla neque ipsa incidunt vel laudantium rem!')
        content.appendChild(contentNode)
        segment.appendChild(content);

        const tags = document.createElement('ul');
        const tagsNode = document.createTextNode([...obj.tags])
        tags.appendChild(tagsNode)
        segment.appendChild(tags);
        
    }
}


const displayRandomData = (data) => {
    window.location.replace(data.url);
}
