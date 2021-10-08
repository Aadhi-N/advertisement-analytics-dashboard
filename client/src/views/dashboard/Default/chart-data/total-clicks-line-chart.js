// ===========================|| DASHBOARD - TOTAL CLICKS LINE CHART ||=========================== //

const clicksLineChartData = {
    type: 'line',
    height: 90,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: () => 'Total Clicks'
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'Total Clicks',
        }
    ]
};

export default clicksLineChartData;
