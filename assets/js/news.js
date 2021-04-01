'use strict';

var renderNews = function(news, options) {
    var template = document.querySelector('[data-news-template]');

    if(!template) {
        return;
    }

    var container = template.parentElement;
    container.innerHTML = '';

    for(var i = 0; i < Math.min(news.length, (options ? options.amount : 6)); i++) {
        var article = news[i];
        var articleEl = template.cloneNode(true);

        var titleEl = articleEl.querySelector('[data-news-template-title]'),
            linkEl = articleEl.querySelector('[data-news-template-link]'),
            dateEl = articleEl.querySelector('[data-news-template-date]');

        if(titleEl) {
            titleEl.innerText = article['name']
        }

        if(linkEl) {
            linkEl.setAttribute('href', article['sourceUrl']);
        }

        if(dateEl) {
            var date = new Date(article['datePublished']);

            if(date instanceof Date && !isNaN(date.getTime())) {
                dateEl.innerHTML = (date.getMonth()) + '/' +
                    (date.getDate() > 10 ? date.getDate() : '0' + date.getDate());
            }
        }

        container.appendChild(articleEl);
    }
};