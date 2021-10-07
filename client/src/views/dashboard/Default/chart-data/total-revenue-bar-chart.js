import store from '../../../../store';


const state = store.getState();


async function hello() {
    return await [1, 2, 3]
}

console.log('HELOOO', state.revenueChartData.xAxis)
// ===========================|| DASHBOARD - TOTAL REVENUE BAR CHART ||=========================== //


const revenueChartData = {    
    series: [{
        name: 'Total Revenue',
        type: 'column',
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }, 
    {
        name: 'Total Clicks',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
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
    ///
    labels: ['hour 1', 'hour 2'],
    xaxis: {
        type: 'datetime'
    },
    yaxis: [
        {
            title: {
                text: 'Website Blog',
            },
        }, 
        {
            opposite: true,
            title: {
                text: 'Social Media'
        }
        }
    ]
    },
};

export default revenueChartData;
