window.onload = () => {

    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = ["red", "green","blue","orange","brown"];

    new Chart(bar, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "World Wine Production 2018"
            }
        }
    });
    new Chart(doughnut, {
        type: 'doughnut',
        data : {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 150, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 6
            }]
        }
    });
    new Chart(bubblechart, {
        type: 'bubble',
        data: {
            labels: "Africa",
            datasets: [
                {
                    label: ["China"],
                    backgroundColor: "rgba(255,221,50,0.2)",
                    borderColor: "rgba(255,221,50,1)",
                    data: [{
                        x: 21269017,
                        y: 5.245,
                        r: 15
                    }]
                }, {
                    label: ["Denmark"],
                    backgroundColor: "rgba(60,186,159,0.2)",
                    borderColor: "rgba(60,186,159,1)",
                    data: [{
                        x: 258702,
                        y: 7.526,
                        r: 10
                    }]
                }, {
                    label: ["Germany"],
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderColor: "#000",
                    data: [{
                        x: 3979083,
                        y: 6.994,
                        r: 15
                    }]
                }, {
                    label: ["Japan"],
                    backgroundColor: "rgba(193,46,12,0.2)",
                    borderColor: "rgba(193,46,12,1)",
                    data: [{
                        x: 4931877,
                        y: 5.921,
                        r: 15
                    }]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
            }, scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Happiness"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "GDP (PPP)"
                    }
                }]
            }
        }
    });
    ////////////////////////////////////////////////
}

const bar           = document.getElementById('bar');
const doughnut      = document.getElementById('doughnut');
const bubblechart	=document.getElementById("bubble-chart")

