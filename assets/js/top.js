'use strict';

var renderTop = function (payload) {
    var top = document.querySelectorAll('[data-top-by]');

    for(let i = 0; i < top.length; i++) {
        var type  = top[i].getAttribute('data-top-by'),
            cards = top[i].querySelectorAll('.card');

        var set;

        switch (type) {
            default:
            case 'total':

                set = Object.values(payload['regions'])
                    .sort(
                        (a, b) => {
                            if(a['total_cases'] > b['total_cases']) {
                                return -1;
                            }

                            return a['total_cases'] < b['total_cases'] ? 1 : 0;
                        }
                    )
                    .map(
                        region => {
                            return {
                                title: region['name'],
                                flag: region['iso3166a2'],
                                number: region['total_cases']
                            }
                        }
                    );

                break;

            case 'total_change':

                set = Object.values(payload['regions'])
                    .sort(
                        (a, b) => {
                            if(a['change']['total_cases'] > b['change']['total_cases']) {
                                return -1;
                            }

                            return a['change']['total_cases'] < b['change']['total_cases'] ? 1 : 0;
                        }
                    )
                    .map(
                        region => {
                            return {
                                title: region['name'],
                                flag: region['iso3166a2'],
                                number: region['change']['total_cases']
                            }
                        }
                    );

                break;

            case 'active':

                set = Object.values(payload['regions'])
                    .sort(
                        (a, b) => {
                            if(a['active_cases'] > b['active_cases']) {
                                return -1;
                            }

                            return a['active_cases'] < b['active_cases'] ? 1 : 0;
                        }
                    )
                    .map(
                        region => {
                            return {
                                title: region['name'],
                                flag: region['iso3166a2'],
                                number: region['active_cases']
                            }
                        }
                    );

                break;

            case 'recovered':

                set = Object.values(payload['regions'])
                    .sort(
                        (a, b) => {
                            if(a['recovered'] > b['recovered']) {
                                return -1;
                            }

                            return a['recovered'] < b['recovered'] ? 1 : 0;
                        }
                    )
                    .map(
                        region => {
                            return {
                                title: region['name'],
                                flag: region['iso3166a2'],
                                number: region['recovered']
                            }
                        }
                    );

                break;

            case 'deaths':

                set = Object.values(payload['regions'])
                    .sort(
                        (a, b) => {
                            if(a['deaths'] > b['deaths']) {
                                return -1;
                            }

                            return a['deaths'] < b['deaths'] ? 1 : 0;
                        }
                    )
                    .map(
                        region => {
                            return {
                                title: region['name'],
                                flag: region['iso3166a2'],
                                number: region['deaths']
                            }
                        }
                    );

                break;

            case 'tested':

                set = Object.values(payload['regions'])
                    .sort(
                        (a, b) => {
                            if(a['tested'] > b['tested']) {
                                return -1;
                            }

                            return a['tested'] < b['tested'] ? 1 : 0;
                        }
                    )
                    .map(
                        region => {
                            return {
                                title: region['name'],
                                flag: region['iso3166a2'],
                                number: region['tested']
                            }
                        }
                    );

                break;
        }

        for(let k = 0; k < cards.length; k++) {
            var card = cards[k];

            var cardFlagEl = card.querySelector('.top-flag'),
                nameEl = card.querySelector('.top-country'),
                numberEl = card.querySelector('.top-number');

            if(cardFlagEl) {
                cardFlagEl.setAttribute('src', 'proxy.php?action=flag&country=' + set[k].flag);
            }

            if(nameEl) {
                nameEl.innerText = __(set[k].flag, set[k].title);

                if(set[k].title === 'USA') {
                    var link = document.createElement('a');
                    link.setAttribute('href', 'https://quarantine.country/coronavirus/today/usa/');
                    link.innerHTML = nameEl.outerHTML;

                    nameEl.parentElement.replaceChild(link, nameEl);
                }
            }

            if(numberEl) {
                numberEl.innerText = formatNumber(set[k].number);
            }
        }
    }
};