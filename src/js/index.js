import '../scss/style.scss';
import { getData } from './getData';

window.addEventListener('DOMContentLoaded', async () => {
    let searchBtn = document.querySelector('.news__search-btn')
    let listNews = document.querySelector('.news__list')

    


    if(localStorage.getItem('valueInput')){
        getData(JSON.parse(localStorage.getItem('valueInput')))
    }

    searchBtn.addEventListener('click', () => {
        let valueInput = document.querySelector('.news__search-input').value
        localStorage.setItem('valueInput', JSON.stringify(valueInput))
        listNews.innerHTML = '';
        if(valueInput. length === 0) {
            listNews.innerHTML = '<h1 class="news__valid">Пустая строка!</h1>'
        } else {
            getData(valueInput)
        }
    })
})











