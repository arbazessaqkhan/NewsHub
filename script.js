const API_KEY= '389b5c64b5d54ec7953c91c15b75013a' 
const url='https://newsapi.org/v2/everything?q='  

window.addEventListener('load',() => fetchNews("India"))

function reload(){
    window.location.reload()
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    bindData(data.articles)

}

function bindData(articles){
    
    // adding template and clonning dynamically 
    const cardsContainer = document.getElementById('cards-container')
    const newsCardTemplate = document.getElementById('template-news-card')
    // empty before api call to get news articles distinct else get same gets concatinated again
    cardsContainer.innerHTML = '';
    articles.forEach(article => {
         //if no image comming in article 
        if(!article.urlToImage) return;
        // deep cloning i.e inside html div .card all content must clone
        
        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone, article)
        cardsContainer.appendChild(cardClone)
    
    
    });
   
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage
    newsTitle.innerHTML = article.title
    newsDesc.innerHTML = article.description

    const date= new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} • ${date}`

    cardClone.firstElementChild.addEventListener('click', () =>{
        window.open(article.url, '_blank')
    })
}

function onNavItemClick(id) {
    fetchNews(id);
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active')
    curSelectedNav = navItem
    curSelectedNav.classList.add('active')
}

const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text')


searchButton.addEventListener('click', ()=>{
    const query= searchText.value
    if(!query) return
    fetchNews(query);
    curSelectedNav?.classList.remove('active')
    curSelectedNav = null
})