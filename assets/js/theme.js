'use strict';

var bootstrap = document.querySelector('[data-theme-bootstrap]'),
//    style = document.querySelector('[data-theme-style]'),
    twitter = document.querySelector('#tweets');

var getActiveTheme = function () {
    return document.body.classList.contains('theme-dark') ?
           'dark' :
           'light';
};

var changeTheme = function (type) {
    /**
     * Skip active theme
     */
    if (getActiveTheme() === type) {
        return;
    }

    switch (type) {
        default:
        case 'light':
            activateLightTheme();
            break;

        case 'dark':
            activateDarkTheme();
            break;
    }

    localStorage.setItem('theme', type);
};

var activateLightTheme = function () {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    document.body.classList.remove('bg-dark');
    document.body.classList.add('bg-light');
    trigger.classList.remove('fa-inverse');

	 bootstrap.setAttribute('href', 'https://covidscript-yatko.netdna-ssl.com/assets/css/bootstrap.min.css');
    // style.setAttribute('href', 'assets/css/style.css');

    // LMAO
    if (twitter) {
        twitter.innerHTML = '<a class="twitter-timeline"' +
            'data-height="230" ' +
            'href="https://twitter.com/QUARCountry?ref_src=twsrc%5Etfw">' +
            'Tweets by QUARCountry' +
            '</a>';

        twttr.widgets.load();
    }
};

var activateDarkTheme = function () {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    document.body.classList.remove('bg-light');
    document.body.classList.add('bg-dark');
    trigger.classList.add('fa-inverse');

	 bootstrap.setAttribute('href', 'https://covidscript-yatko.netdna-ssl.com/assets/css/bootstrap.min.css');
    // style.setAttribute('href', 'assets/css/style-dark.css');
    localStorage.setItem('theme', 'dark');

    // LMAO
    if (twitter) {
        twitter.innerHTML = '<a class="twitter-timeline" ' +
            'data-theme="dark" ' +
            'data-height="230" ' +
            'href="https://twitter.com/QUARCountry?ref_src=twsrc%5Etfw">' +
            'Tweets by QUARCountry' +
            '</a>';

        twttr.widgets.load();
    }
};

if (trigger) {
    var urlParams = new URLSearchParams(window.location.search),
        localTheme = localStorage.getItem('theme');

    if (urlParams.has('theme')) {
        changeTheme(urlParams.get('theme'));
    } else {
        if(localTheme) {
            changeTheme(localTheme);
        } else {
            if (window.matchMedia) {
                if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                    changeTheme('dark')
                }
            }
        }

        /**
         * Automatic theme switch
         */
        if (window.matchMedia) {
            var query = window.matchMedia('(prefers-color-scheme: dark)');

            try {
                if(query.addEventListener) {
                    query.addEventListener('change', e => {
                        changeTheme(e.matches ? 'dark' : 'light');
                    });
                } else {
                    query.addListener('change', e => {
                        changeTheme(e.matches ? 'dark' : 'light');
                    });
                }

            } catch (e) {

            }
        }
    }

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        changeTheme(getActiveTheme() === 'light' ? 'dark' : 'light')
    });
}