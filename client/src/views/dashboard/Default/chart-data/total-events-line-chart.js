// ===========================|| DASHBOARD - TOTAL EVENTS LINE CHART ||=========================== //

const eventsLineChartData = {
    series: [{
        name: 'Total Clicks',
        type: 'line',
    }], 
    options: {
        chart: {
            id: "line-chart",
            type: "line",
            
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
                    formatter: () => 'Total Events'
                }
            },
            marker: {
                show: false
            }
        }
    }
};

export default eventsLineChartData;
