$(document).ready(function(){

	$('#textMovieId').focus();
	
	$('#textMovieId').click(function(){

		$('#textMovieTitle').css('border','none');
		$('.showErrorMovieTitle').slideUp(300);
		$('#textMovieTitle').css('border','none');
		$('.showErrorMovieTitleNotFound').slideUp(300);

	});	

	$('#btn-MovieId').click(function(){

		var getId = $('#textMovieId').val();

		if(getId == '') 
		{
			$('#textMovieTitle').val('');
			$('#textMovieYear').val('');
			$('#textMovieId').css('border','1px solid #ffa190');
			$('.showErrorMovieId').fadeIn(300);

			$('#textMovieId').click(function(){

				$('#textMovieId').css('border','none');
				$('.showErrorMovieId').slideUp(300);

			});
		}
		else
		{
			getIdData(getId);
			$('#textMovieId').val('');
			$('#textMovieTitle').val('');
			$('#textMovieYear').val('');
		}

	});

});

function getIdData(getId)
{
	

	$.ajax({
		type: 'GET',
		getData: 'json',
		async: true,
		url: 'http://www.omdbapi.com/?i='+ getId +'&apikey=24e011cb',

		success: function(response){

			if (response.Response == 'False')
			{
				$('#textMovieId').css('border','1px solid #ffa190');
				$('.showErrorMovieIdNotFound').fadeIn(300);
				
				$('#textMovieId').click(function(){

					$('#textMovieId').css('border','none');
					$('.showErrorMovieIdNotFound').slideUp(300);

				});
		
			}
			else
			{
				var poster;

				if (response.Poster == 'N/A') 
				{
					poster = 'dummyposter.jpg';
				}
				else
				{
					poster = response.Poster;
				}

				var dummyCard = `
								 <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 d-flex justify-content-center padding">
						          <div class="card shadow-lg" style="width: 18rem;">
						            <img class="card-img-top" src=${poster}>
						            <div class="card-body">
						              <h4 class="card-title"><b>${response.Title} (${response.Year})</b></h5>
						              <h6 class="card-title1"><b>${response.Rated} | ${response.Runtime} | ${response.Genre} | ${response.Released}</b></h5>
						              <p class="card-text">${response.Plot}</p>
						            </div>
						            <ul class="list-group list-group-flush">
						              <li class="list-group-item"><b>${Object.keys(response)[6]}:</b> ${response.Director}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[7]}:</b> ${response.Writer}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[8]}:</b> ${response.Actors}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[10]}:</b> ${response.Language}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[11]}:</b> ${response.Country}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[12]}:</b> ${response.Awards}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[14]}:</b> ${response.Ratings[0]}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[15]}:</b> ${response.Metascore}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[16]}:</b>${response.imdbRating}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[17]}:</b> ${response.imdbVotes}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[18]}:</b> ${response.imdbID}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[19]}:</b> ${response.Type}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[20]}:</b> ${response.DVD}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[21]}:</b> ${response.BoxOffice}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[22]}:</b> ${response.Production}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[23]}:</b> ${response.Website}</li>
						              <li class="list-group-item"><b>${Object.keys(response)[24]}:</b> ${response.Response}</li>
						              

						            </ul>
						            
						          </div>
						         </div>`
				$('.display').append(dummyCard);
			}
			
		},
		erro:function(err){
			
			alert(err.responseJSON.error.message);
		},
		beforeSend: function(){ 

            
            $('#exampleModal').show();
            

        },
        complete:function(){

            
            $('#exampleModal').hide();
            

        },

        timeout:3000
	});
}