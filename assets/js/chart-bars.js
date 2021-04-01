'use strict';

var colorTotal = '#dc3545';
var colorActive = '#ffc107';
var colorRecovered = '#28a745';
var colorDeaths = '#6c757d';
var colorFont = '#6c757d';

var decorateBarChartData = function(data) {
    var dataSets = [[], [], [], []],
        dataKeys = Object.keys(data),
        months = [],
        keys = [];
//            .reverse();

    for (var i = 0; i < dataKeys.length; i++) {
        var date = new Date(dataKeys[i]),
            hash = date.getFullYear() + date.getMonth();

        if(months.includes(hash)) {
            continue;
        }

        dataSets[0].push(data[dataKeys[i]]['total_cases']);
        dataSets[1].push(data[dataKeys[i]]['recovered']);
        dataSets[2].push(data[dataKeys[i]]['deaths']);
        dataSets[3].push(data[dataKeys[i]]['active_cases']);

        months.push(hash);
        keys.push(dataKeys[i]);
    }

    return {
        labels: keys,
        datasets: [
            {
                label: __('Total cases'),
                data: dataSets[0],
                backgroundColor: colorTotal,
            },
            {
                label: __('Recovered'),
                data: dataSets[1],
                backgroundColor: colorRecovered,
            },
            {
                label: __('Deaths'),
                data: dataSets[2],
                backgroundColor: colorDeaths,
            },
            {
                label: __('Active cases'),
                data: dataSets[3],
                backgroundColor: colorActive,
            },
        ]
    };
};

var renderBarChart = function (ctx, data) {
    return new Chart(
        ctx,
        {
            type: 'bar',
            data: decorateBarChartData(data),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, chart){
                            return chart.datasets[tooltipItem.datasetIndex]['label'] + ': ' +  formatNumber(
                                chart.datasets[tooltipItem.datasetIndex]['data'][tooltipItem.index],
                                0
                            );
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        width: 2,
                        ticks: {
                            reverse: true,
                            beginAtZero: false,
                            autoSkip: true,
                            maxRotation: 0,
                            fontSize: '9',
                            callback: function (value, index, array) {
                                var date = new Date(value);

                                return (date.getMonth() > 10 ? date.getMonth() : '0' + date.getMonth()) + '/' +
                                    (date.getDate() > 10 ? date.getDate() : '0' + date.getDate());
                            }
                        },
                        pointLabels: {
                            fontSize: '9'
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: false,
                        position: 'right',
                        ticks: {
                            beginAtZero: true,
                            autoSkip: true,
                            maxTicksLimit: 3,
//								max: 500000,
//								min: 10000,
//								stepSize: 100,
                            callback: function (value, index, array) {
                                return (value < 1000000) ? value / 1000 + 'K' : value / 1000000 + 'M';
                            }
                        },
                        gridLines: {
                            position: 'right',
                            zeroLineWidth: 0,
//								display: false
                        }
                    },
                        {
                            display: false,
                            position: 'left',
                            ticks: {
                                beginAtZero: true,
                                max: 45,
                                min: 0,
                                stepSize: 5
                            }
                        },
                    ]
                }
            }
        }
    );
};