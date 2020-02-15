$( document ).ready(function() {
	var api_url = '../api/ideas'
		  $.ajax({
		  url: api_url,
		  contentType: "application/json",
		  dataType: 'json',
		  success: function(result){
			$('#dataTables-ideas > tbody').html(result.ideasTable);
			
							
		  }
		  
		 });	  
		 $(document).ready(function() {
            $('#dataTables-ideas').DataTable({
                responsive: true
            });
        });		
			
	});

	