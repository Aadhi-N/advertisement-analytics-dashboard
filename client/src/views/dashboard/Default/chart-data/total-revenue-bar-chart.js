// ===========================|| DASHBOARD - STATIC DATA - TOTAL REVENUE BAR CHART ||=========================== //

const barChartData = {    
    series: [{
            name: 'Total Revenue',
            type: 'column',
    }, 
    {
            name: 'Total Clicks',
            type: 'line',
    }],
        options: {
            chart: {
                id: "bar-chart",
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                },
            zoom: {
                enabled: false
            }
        },
        stroke: {
            width: [0, 4]
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
    }
};

export default barChartData;
