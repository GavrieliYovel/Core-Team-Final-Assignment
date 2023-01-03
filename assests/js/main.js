window.onload = () => {
	(function($) {

		"use strict";

		var fullHeight = function() {

			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});

		};
		fullHeight();

		$('#sidebarCollapse').on('click', function () {
			$('#sidebar').toggleClass('active');
		});

	})(jQuery);

	////////////////////////////////////////////

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
	new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				yAxisID: 'yAxis'
			}]
		},
		options: {
			scales: {
				xAxis: {
					// The axis for this scale is determined from the first letter of the id as `'x'`
					// It is recommended to specify `position` and / or `axis` explicitly.
					type: 'time',
				}
			}
		}
	});
	////////////////////////////////////////////////
}

const bar           = document.getElementById('bar');
const doughnut      = document.getElementById('doughnut');
