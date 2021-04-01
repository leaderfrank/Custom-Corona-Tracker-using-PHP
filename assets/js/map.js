'use strict';

var colors = [
	'#FFDB6D',
	'#FFDA6D',
	'#FFCA2A',
	'#ffc107',
	'#feb900',
	'#DC5335',
	'#DC4135',
	'#DC3545',
//	'#CD244B'
];

var key = function(name) {
    return name.replace(/[\s_]/g, '_')
        .replace(/[().,\'\"]/g, '')
        .toLowerCase();
};

var resolveColorForNumber = function(cases, step) {
    if(cases) {
        return colors[Math.min(Math.floor(cases / step), 7)];
    }

    return '#fff';
};

var resolveDataForRegion = function(summary, code) {
    return Object.values(summary.regions)
        .find(
            function (data) {
                return data.iso3166a2.toLowerCase() === code.toLowerCase();
            }
        );
};

var renderMap = function(summary) {
    var min = null,
        max = null,
        keys = Object.keys(summary.regions);

    for(var i = 0; i < keys.length; i++) {
        var regionData = summary.regions[keys[i]];

        if(min === null || min > regionData['total_cases']) {
            min = regionData['total_cases'];
        }

        if(max === null || max < regionData['total_cases']) {
            max = regionData['total_cases'];
        }
    }

    var step = Math.ceil((max - min) / 100);
    var countryColors = {};

    for(var i = 0; i < keys.length; i++) {
        var regionData = summary.regions[keys[i]],
            key = regionData['iso3166a2'].toLowerCase();

        countryColors[key] = resolveColorForNumber(regionData['total_cases'], step);
    }

    jQuery('#casesMap .map').vectorMap({
        map: 'world_en',
        colors: countryColors,
        backgroundColor: 'transparent',
        hoverOpacity: 0.7,
        enableZoom: false,
        showTooltip: true,
        showLabels: false,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial',
        onLabelShow: function(event, label, code) {
            var data = resolveDataForRegion(summary, code);

            label[0].innerHTML += "<div><b>" + __('Total cases') + ":</b> " + formatNumber(!!data ? data['total_cases'] : 0) + "</div>";
            label[0].innerHTML += "<div><b>" + __('Active cases') + ":</b> " + formatNumber(!!data ? data['active_cases'] : 0) + "</div>";
            label[0].innerHTML += "<div><b>" + __('Deaths') + ":</b> " + formatNumber(!!data ? data['deaths'] : 0) + "</div>";
            label[0].innerHTML += "<div><b>" + __('Recovered') + ":</b> " + formatNumber(!!data ? data['recovered'] : 0) + "</div>";
            label[0].innerHTML += "<div><b>" + __('Tested') + ":</b> " + formatNumber(!!data ? data['tested'] : 0) + "</div>";
        }
    });
};