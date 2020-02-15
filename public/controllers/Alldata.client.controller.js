function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
$( document ).ready(function() {
	var api_url = '../api/dashboard'
		  $.ajax({
		  url: api_url,
		  contentType: "application/json",
		  dataType: 'json',
		  success: function(result){
			  
			
			let dataBar = new Array();
			let xBar = new Array();
			let yBar =new Array();
			
			$("#proposed").text(result.dataDonut[5].value)
			$("#completed").text(result.dataDonut[0].value)
			$("#inprogress").text(result.dataDonut[1].value)
			$("#open").text(result.dataDonut[2].value)

			var ctx = document.getElementById('myChart').getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'bar',
				data:result.data,
				
				options: {
					
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
							stacked: true
						}]
					}
				},
				
				
			});
		  }

		  
	  });
	});

	