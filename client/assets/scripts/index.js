const searchBtn = document.getElementById('btn-search');
const randButton = document.getElementById('btn-random');
const searchIcon = document.getElementById('search-icon');
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

const createTags = (tags, parent) => {
    // itterate through the tags to create <li class="tag">[tagname]</li>
    for( let tag of tags) {
        const content = document.createElement('li');
        const contentNode = document.createTextNode(tag)
        content.setAttribute('class', 'tag')
        content.appendChild(contentNode)
        parent.appendChild(content);
    }
}
const displayData = (data) => {
    const nav = document.getElementById('header');
    const main = document.querySelector('main')
    nav.classList.add('hidden');
    for(let page in data) {
        /**
         * This creates the following html block
         * <article>
         *      <h1>
         *          <a href="[page url]" id="result-1" class="search-link">
         *              [page title]
         *          </a>
         *      </h1>
         *      <p>[page description (fake atm)]</p>
         *      <ul class="tags">
         *          <li class="tag">[page tag]</li>
         *          <li class="tag">[page tag]</li>
         *          <li class="tag">[page tag]</li>
         *      </ul>
         * </article>
         */
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
        content.setAttribute('class', 'content')
        content.appendChild(contentNode)
        segment.appendChild(content);

        const tags = document.createElement('ul');
        tags.setAttribute('class', 'tags')
        segment.appendChild(tags)

        // if coming from the search-bar, there is no obj.tags

        if(obj.tags) {
            createTags(obj.tags, tags)
        }

        
    }
}


const displayRandomData = (data) => {
    window.open(data.url, "blank") || window.location.replace(data.url);
}


searchBtn.addEventListener('click', (e) => fetchData(e, resultsUrl, false));
randButton.addEventListener('click', (e) => fetchData(e, randomUrl, true));
searchIcon.addEventListener('click', (e) => {

    const main = document.querySelector('main');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Loading...'
    main.appendChild(errorMessage)

    const searchString = document.getElementById('search-string').value;
    const url = 'http://api.serpstack.com/search?access_key=39bcf3350d9165e4eab1d7fd15eb7263&query=' + searchString
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        main.removeChild(errorMessage);
        displayData(data["organic_results"])
    })
    .catch(err => console.log(err))

})
