'use strict';

var i18n = {
  'Flag': 'Flag',
  'Name': 'Name',
  'Total cases': 'Total cases',
  'New cases': 'New cases',
  'Active cases': 'Active cases',
  'Deaths': 'Deaths',
  'New deaths': 'New deaths',
  'Recovered': 'Recovered',
  'Tested': 'Tested',
  'Deceased': 'Deceased',
  'Critical': 'Critical',
  'New Cases': 'New Cases',
  'US': 'USA',
  'GB': 'UK',
  'AE': 'UAE',

  'decimal_separator': '.',
  'thousand_separator': ',',

  'month_0': 'Jan',
  'month_1': 'Feb',
  'month_2': 'Mar',
  'month_3': 'Apr',
  'month_4': 'May',
  'month_5': 'Jun',
  'month_6': 'Jul',
  'month_7': 'Aug',
  'month_8': 'Sep',
  'month_9': 'Oct',
  'month_10': 'Nov',
  'month_11': 'Dec'
};

/**
 * Warning:
 * Do not translate under this section!!!
 */
var contentMap = {
  'total': {
    'icon': 'fa-users',
    'title': i18n['Total cases'],
  },
  'active': {
    'icon': 'fa-exclamation-triangle',
    'title': i18n['Active cases'],
  },
  'recovered': {
    'icon': 'fa-child',
    'title': i18n['Recovered'],
  },
  'deceased': {
    'icon': 'fa-heart-broken',
    'title': i18n['Deceased'],
  },
  'tested': {
    'icon': 'fa-vial',
    'title': i18n['Tested'],
  },
  'critical': {
    'icon': 'fa-procedures',
    'title': i18n['Critical'],
  },
  'newToday': {
    'icon': 'fa-users',
    'title': i18n['New Cases'],
  },
  'recoveredToday': {
    'icon': 'fa-child',
    'title': i18n['Recovered'],
  },
  'deceasedToday': {
    'icon': 'fa-heart-broken',
    'title': i18n['Deceased'],
  },
};

var tableConfig = {
  'flag': {
    title: i18n['Flag'],
    resolve: function(row) {
      if(row['iso3166a2'] && row['iso3166a2'] !== '') {
        return '<img src="proxy.php?action=flag&country=' + row['iso3166a2'] + '">';
      }

      return '<img src="assets/images/no_image.png">';
    }
  },
  'name': i18n['Name'],
  'total_cases': {
    title: i18n['Total cases'],
    resolve: function(row) {
      return formatNumber(row['total_cases']);
    }
  },
  'new_cases': {
    title: i18n['New cases'],
    resolve: function (row) {
      return formatNumber(row['change']['total_cases']);
    }
  },
  'deaths': {
    title: i18n['Deaths'],
    resolve: function (row) {
      return formatNumber(row['deaths']);
    }
  },
  'new_deaths': {
    title: i18n['New deaths'],
    resolve: function (row) {
      return formatNumber(row['change']['deaths']);
    }
  },
  'recovered': {
    title: i18n['Recovered'],
    resolve: function (row) {
      return formatNumber(row['recovered']);
    }
  },
  'active_cases': {
    title: i18n['Active cases'],
    resolve: function (row) {
      return formatNumber(row['active_cases']);
    }
  },
  'critical': {
    title: i18n['Critical'],
    resolve: function (row) {
      return formatNumber(row['critical']);
    }
  }
};