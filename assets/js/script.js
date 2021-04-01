'use strict';

var ucFirst = function (string) {
    if (string.length) {
        string = string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
};

var formatNumber = function (number, precision, separate, separator, coma) {
    var re = '\\d(?=(\\d{' + (separate || 3) + '})+' + (precision > 0 ? '\\D' : '$') + ')',
        num = number.toFixed(Math.max(0, ~~precision));

    return (coma ? num.replace('.', (coma || __('decimal_separator'))) : num)
        .replace(new RegExp(re, 'g'), '$&' + (separator || __('thousand_separator')));
};

var __ = function (phraze, defaultStr) {
  var candidate = Object.keys(i18n)
    .find(
      function (key) {
        return key.toLowerCase() === phraze.toLowerCase();
      }
    );

  if(candidate) {
    return i18n[candidate];
  }

  return defaultStr ? defaultStr : phraze;
};

var getBadgeClassFromNumber = function (number) {
    if (number > 0) {
        return 'badge-danger';
    }

    return (number < 0) ? 'badge-success' : 'badge-light';
};

var getBadgeFromNumber = function (number) {
    if (number > 0) {
        return '&#8679';
    }

    return (number < 0) ? '&#8681' : '';
};

var hydrateContentMap = function (payload, original) {
    return {
        'total': {
            ...original['total'],
            'number': payload['summary']['total_cases'],
            'badge-state': getBadgeClassFromNumber(payload['change']['total_cases']),
            'badge': getBadgeFromNumber(payload['change']['total_cases'])
        },
        'active': {
            ...original['active'],
            'number': payload['summary']['active_cases'],
            'badge-state': getBadgeClassFromNumber(payload['change']['active_cases']),
            'badge': getBadgeFromNumber(payload['change']['active_cases'])
        },
        'recovered': {
            ...original['recovered'],
            'number': payload['summary']['recovered'],
            'badge-state': getBadgeClassFromNumber(payload['change']['recovered']),
            'badge': getBadgeFromNumber(payload['change']['recovered'])
        },
        'deceased': {
            ...original['deceased'],
            'number': payload['summary']['deaths'],
            'badge-state': getBadgeClassFromNumber(payload['change']['deaths']),
            'badge': getBadgeFromNumber(payload['change']['deaths'])
        },
        'tested': {
            ...original['tested'],
            'number': payload['summary']['tested'],
            'badge-state': getBadgeClassFromNumber(payload['change']['tested']),
            'badge': getBadgeFromNumber(payload['change']['tested'])
        },
        'critical': {
            ...original['critical'],
            'number': payload['summary']['critical'],
            'badge-state': getBadgeClassFromNumber(payload['change']['critical']),
            'badge': getBadgeFromNumber(payload['change']['critical'])
        },
        'newToday': {
            ...original['newToday'],
            'number': payload['change']['total_cases'],
            'badge-state': getBadgeClassFromNumber(payload['change']['total_cases']),
            'badge': getBadgeFromNumber(payload['change']['total_cases'])
        },
        'recoveredToday': {
            ...original['recoveredToday'],
            'number': payload['change']['recovered'],
            'badge-state': getBadgeClassFromNumber(payload['change']['recovered']),
            'badge': getBadgeFromNumber(payload['change']['recovered'])
        },
        'deceasedToday': {
            ...original['deceasedToday'],
            'number': payload['change']['deaths'],
            'badge-state': getBadgeClassFromNumber(payload['change']['deaths']),
            'badge': getBadgeFromNumber(payload['change']['deaths'])
        },
    }
};

var render = function (valueMap) {
    var keys = Object.keys(valueMap);

    for (var i = 0; i < keys.length; i++) {
        var container = document.querySelector('#cases' + ucFirst(keys[i]));

        if (!container) {
            continue;
        }

        if (valueMap[keys[i]]['icon']) {
            var iconContainer = container.querySelector('i.case-icon');

            if (iconContainer) {
                iconContainer.classList.add(valueMap[keys[i]]['icon']);
            }
        }

        if (valueMap[keys[i]]['title']) {
            var titleContainer = container.querySelector('.case-title');

            if (titleContainer) {
                titleContainer.innerHTML = __(valueMap[keys[i]]['title']);
            }
        }

        if (valueMap[keys[i]]['number']) {
            var numberContainer = container.querySelector('.case-number');

            if (numberContainer) {
                numberContainer.innerHTML = formatNumber(valueMap[keys[i]]['number']);
            }
        }

        if (valueMap[keys[i]]['badge']) {
            var badgeContainer = container.querySelector('.case-badge');

            if (badgeContainer) {
                badgeContainer.classList.add(valueMap[keys[i]]['badge-state']);
                badgeContainer.innerHTML = valueMap[keys[i]]['badge'];
            }
        }
    }
};

Promise.all([
    fetch('proxy.php?action=summary')
        .then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            }
        ),
    fetch('proxy.php?action=spots')
        .then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            }
        ),
    fetch('proxy.php?action=news')
        .then(
            response => {
                if(response.ok) {
                    return response.json();
                }
            }
        )
])
    .then(
        function ([summary, spots, news]) {
            render(hydrateContentMap(summary['data'], contentMap));
            renderMap(summary['data']);
            renderLineChart(document.querySelector('#casesGraph canvas'), spots['data']);
            renderTop(summary['data']);
            renderTable(document.querySelector('#topTable'), summary['data'], tableConfig);
            renderNews(news);
        }
    );
