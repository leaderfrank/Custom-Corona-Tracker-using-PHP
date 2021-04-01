'use strict';

var colorTotal = '#dc3545';
var colorActive = '#ffc107';
var colorRecovered = '#28a745';
var colorDeaths = '#6c757d';
var colorFont = '#6c757d';

var decorateChartData = function(data) {
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
                borderColor: colorTotal,
                backgroundColor: colorTotal,
                borderWidth: 2,
				pointRadius: .1,
				pointHitRadius: 4,
				pointHoverRadius: 4,
				pointBorderWidth: 1,
//				pointHoverBorderWidth: 8,
//				pointBorderColor: "transparent",
                order: 3,
                fill: true
            },
            {
                label: __('Recovered'),
                data: dataSets[1],
                borderColor: colorRecovered,
                backgroundColor: colorRecovered,
                borderWidth: 2,
				pointRadius: .1,
				pointHitRadius: 4,
				pointHoverRadius: 4,
				pointBorderWidth: 1,
//				pointHoverBorderWidth: 8,
//				pointBorderColor: "transparent",
                order: 1,
                fill: true
            },
            {
                label: __('Deaths'),
                data: dataSets[2],
                borderColor: colorDeaths,
                backgroundColor: colorDeaths,
                borderWidth: 2,
				pointRadius: .1,
				pointHitRadius: 4,
				pointHoverRadius: 4,
				pointBorderWidth: 1,
//				pointHoverBorderWidth: 8,
//				pointBorderColor: "transparent",
                order: 0,
                fill: true
            },
            {
                label: __('Active cases'),
                data: dataSets[3],
                borderColor: colorActive,
                backgroundColor: colorActive,
                borderWidth: 2,
				pointRadius: .1,
				pointHitRadius: 4,
				pointHoverRadius: 4,
				pointBorderWidth: 1,
//				pointHoverBorderWidth: 8,
//				pointBorderColor: "transparent",
                order: 2,
                fill: true
            },
        ]
    };
};

var renderLineChart = function (ctx, data) {
    return new Chart(
        ctx,
        {
            type: 'line',
            data: decorateChartData(data),
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
                                return __('month_' + date.getMonth());
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