export const getData = async (searchText = 'пример') => {
    let listNews = document.querySelector('.news__list')
    const API_KEY = '5a4484655019b9ef7d2b4856cd906fdf'
    let res = await fetch(`https://gnews.io/api/v4/search?q=${searchText}&lang=ru&country=ru&max=12&apikey=${API_KEY}`)
    let content = await res.json()
    content = content.articles
    for (let key in content){
        listNews.innerHTML += `
        <li class="news__item">
            <div class="news__content">
                <img src="${content[key].image}" alt="images__news" class="news__img">
                <div class="news__content-text">
                    <h2 class="news__title">${content[key].title}</h2>
                    <p class="news__description">${content[key].description}</p>
                    <a href="${content[key].url}" class="news__url">Перейти к статье</a>
                </div>
            </div>
        </li>
    `
    }
}  