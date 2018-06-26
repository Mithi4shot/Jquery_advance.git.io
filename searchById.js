$(document).ready(function(){

	var tId = 0;

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
			tId=tId+1;
			getIdData(getId,tId);
			$('#textMovieId').val('');
			$('#textMovieTitle').val('');
			$('#textMovieYear').val('');
		}

	});

});

function getIdData(getId,tId)
{
		

	$.ajax({
		type: 'GET',
		getData: 'json',
		async: true,
		url: 'https://www.omdbapi.com/?i='+ getId +'&apikey=24e011cb',

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
				var rating;

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
						              <li class="list-group-item" id="directorVal${tId}"><b>${Object.keys(response)[6]}:</b> </li>
						              <li class="list-group-item" id="writerVal${tId}"><b>${Object.keys(response)[7]}:</b> </li>
						              <li class="list-group-item" id="actorVal${tId}"><b>${Object.keys(response)[8]}:</b> </li>
						              <li class="list-group-item" id="languageVal${tId}"><b>${Object.keys(response)[10]}:</b> </li>
						              <li class="list-group-item" id="countryVal${tId}"><b>${Object.keys(response)[11]}:</b> </li>
						              <li class="list-group-item" id="awardVal${tId}"><b>${Object.keys(response)[12]}:</b> </li>
						              <li class="list-group-item" id="ratingVal${tId}"><b>${Object.keys(response)[14]}:</b> </li>
						              <li class="list-group-item" id="metascoreVal${tId}"><b>${Object.keys(response)[15]}:</b> </li>
						              <li class="list-group-item" id="imdbratVal${tId}"><b>${Object.keys(response)[16]}:</b> </li>
						              <li class="list-group-item" id="imdbvtVal${tId}"><b>${Object.keys(response)[17]}:</b> </li>
						              <li class="list-group-item" id="imdbidVal${tId}"><b>${Object.keys(response)[18]}:</b> </li>
						              <li class="list-group-item" id="typeVal${tId}"><b>${Object.keys(response)[19]}:</b> </li>
						              <li class="list-group-item" id="dvdVal${tId}"><b>${Object.keys(response)[20]}:</b> </li>
						              <li class="list-group-item" id="boxofficeVal${tId}"><b>${Object.keys(response)[21]}:</b> </li>
						              <li class="list-group-item" id="productionVal${tId}"><b>${Object.keys(response)[22]}:</b> </li>
						              <li class="list-group-item" id="websiteVal${tId}"><b>${Object.keys(response)[23]}:</b> </li>
						              <li class="list-group-item" id="responseVal${tId}"><b>${Object.keys(response)[24]}:</b> </li>
						            </ul>
						          </div>
						         </div>`
				$('.display').append(dummyCard);

				$('#directorVal'+tId).append(response.Director);
				$('#writerVal'+tId).append(response.Writer);
				$('#actorVal'+tId).append(response.Actors);
				$('#languageVal'+tId).append(response.Language);
				$('#countryVal'+tId).append(response.Country);
				$('#awardVal'+tId).append(response.Awards);

				if(response.Ratings == undefined || response.Ratings == '')	
				{	
					$('#ratingVal'+tId).append('N/A');
				}
				else
				{
					for (x of response.Ratings)	
					{
						for (var i=0;i<Object.keys(x).length;i++) 
						{
							if(i==0)
							{
								$('#ratingVal'+tId).append('<br>' + Object.values(x)[i] + ' : ' + Object.values(x)[i+1] + ',');
							}
						}
					}	
				}

				$('#metascoreVal'+tId).append(response.Metascore);
				$('#imdbratVal'+tId).append(response.imdbRating);
				$('#imdbvtVal'+tId).append(response.imdbVotes);
				$('#imdbidVal'+tId).append(response.imdbID);
				$('#typeVal'+tId).append(response.Type);
				$('#dvdVal'+tId).append(response.DVD);
				$('#boxofficeVal'+tId).append(response.BoxOffice);
				$('#productionVal'+tId).append(response.Production);
				$('#websiteVal'+tId).append(response.Website);
				$('#responseVal'+tId).append(response.Response);
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