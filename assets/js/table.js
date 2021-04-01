'use strict';

var renderTable = function (element, data, options) {
    var tableEl = document.createElement('table'),
        tableKeys = Object.keys(options),
        tableHeaderEl = tableEl.createTHead(),
        tableBodyEl = tableEl.createTBody();

    var i;
    var regionKeys = Object.keys(data['regions']);

    /**
     * Fill header
     */
    tableHeaderEl.insertRow();

    for (i = 0; i < tableKeys.length; i++) {
        var cellConfig = options[tableKeys[i]],
            thEl = tableHeaderEl.rows[0].insertCell();

        if(!cellConfig) {
            continue;
        }

        thEl.innerHTML = typeof cellConfig === 'string' ?
                           cellConfig :
                           cellConfig['title'];
    }

    /**
     * Fill table body
     */
    for(i = 0; i < regionKeys.length; i++) {
        var region = data['regions'][regionKeys[i]];
        var rowEl = tableBodyEl.insertRow();

        for (var k = 0; k < tableKeys.length; k++) {
            var cellConfig = options[tableKeys[k]],
                value;

            if(typeof cellConfig === 'object') {
                value = cellConfig['resolve'](region);
            } else {
                if(region.hasOwnProperty(tableKeys[k])) {
                    value = region[tableKeys[k]];
                }
            }

            rowEl.insertCell()
                .innerHTML = value;
        }
    }

    element.appendChild(tableEl);
    $(tableEl).DataTable();
};