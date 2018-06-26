$(document).ready(function(){

	var uId=0;

	$('#textMovieTitle').click(function(){
		
		$('#textMovieId').css('border','none');
		$('.showErrorMovieIdNotFound').slideUp(300);		
		$('#textMovieId').css('border','none');	
		$('.showErrorMovieId').slideUp(300);

	});	

	$('#textMovieYear').click(function(){
		
		$('#textMovieId').css('border','none');
		$('.showErrorMovieIdNotFound').slideUp(300);		
		$('#textMovieId').css('border','none');	
		$('.showErrorMovieId').slideUp(300);

		$('#textMovieTitle').css('border','none');
		$('.showErrorMovieTitle').slideUp(300);
		$('#textMovieTitle').css('border','none');
		$('.showErrorMovieTitleNotFound').slideUp(300);

	});	


	$('#btn-MovieTitle').click(function(){

		

		var getTitle = $('#textMovieTitle').val();
		var getYear = $('#textMovieYear').val();

		if((getTitle == '' && getYear == '') || (getTitle == '' && getYear != '')) 
		{
			$('#textMovieId').val('');
			$('#textMovieYear').val('');
			$('#textMovieTitle').css('border','1px solid #ffa190');
			$('.showErrorMovieTitle').fadeIn(300);

			$('#textMovieTitle').click(function(){

				$('#textMovieTitle').css('border','none');
				$('.showErrorMovieTitle').slideUp(300);

			});
		}
		else
		{
			uId=uId+1;
			getTitleData(getTitle,getYear,uId);
			$('#textMovieTitle').val('');
			$('#textMovieYear').val('');
			$('#textMovieId').val('');
		}

	});

});

function getTitleData(getTitle,getYear,uId)
{
	$.ajax({
		type: 'GET',
		getData: 'json',
		async: true,
		url: 'https://www.omdbapi.com/?t='+ getTitle +'&y='+ getYear +'&apikey=24e011cb',

		success: function(response){

			if (response.Response == 'False')
			{
				$('#textMovieTitle').css('border','1px solid #ffa190');
				$('.showErrorMovieTitleNotFound').fadeIn(300);
				
				$('#textMovieTitle').click(function(){

					$('#textMovieTitle').css('border','none');
					$('.showErrorMovieTitleNotFound').slideUp(300);

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
						              <li class="list-group-item" id="titledirectorVal${uId}"><b>${Object.keys(response)[6]}:</b> </li>
						              <li class="list-group-item" id="titlewriterVal${uId}"><b>${Object.keys(response)[7]}:</b> </li>
						              <li class="list-group-item" id="titleactorVal${uId}"><b>${Object.keys(response)[8]}:</b> </li>
						              <li class="list-group-item" id="titlelanguageVal${uId}"><b>${Object.keys(response)[10]}:</b> </li>
						              <li class="list-group-item" id="titlecountryVal${uId}"><b>${Object.keys(response)[11]}:</b> </li>
						              <li class="list-group-item" id="titleawardVal${uId}"><b>${Object.keys(response)[12]}:</b> </li>
						              <li class="list-group-item" id="titleratingVal${uId}"><b>${Object.keys(response)[14]}:</b> </li>
						              <li class="list-group-item" id="titlemetascoreVal${uId}"><b>${Object.keys(response)[15]}:</b> </li>
						              <li class="list-group-item" id="titleimdbratVal${uId}"><b>${Object.keys(response)[16]}:</b> </li>
						              <li class="list-group-item" id="titleimdbvtVal${uId}"><b>${Object.keys(response)[17]}:</b> </li>
						              <li class="list-group-item" id="titleimdbidVal${uId}"><b>${Object.keys(response)[18]}:</b> </li>
						              <li class="list-group-item" id="titletypeVal${uId}"><b>${Object.keys(response)[19]}:</b> </li>
						              <li class="list-group-item" id="titledvdVal${uId}"><b>${Object.keys(response)[20]}:</b> </li>
						              <li class="list-group-item" id="titleboxofficeVal${uId}"><b>${Object.keys(response)[21]}:</b> </li>
						              <li class="list-group-item" id="titleproductionVal${uId}"><b>${Object.keys(response)[22]}:</b> </li>
						              <li class="list-group-item" id="titlewebsiteVal${uId}"><b>${Object.keys(response)[23]}:</b> </li>
						              <li class="list-group-item" id="titleresponseVal${uId}"><b>${Object.keys(response)[24]}:</b> </li>
						            </ul>
						          </div>
						         </div>`
				$('.display').append(dummyCard);

				$('#titledirectorVal'+uId).append(response.Director);
				$('#titlewriterVal'+uId).append(response.Writer);
				$('#titleactorVal'+uId).append(response.Actors);
				$('#titlelanguageVal'+uId).append(response.Language);
				$('#titlecountryVal'+uId).append(response.Country);
				$('#titleawardVal'+uId).append(response.Awards);

				if(response.Ratings == undefined || response.Ratings == '')	
				{	
					$('#titleratingVal'+uId).append('N/A');
				}
				else
				{
					for (x of response.Ratings)	
					{
						for (var i=0;i<Object.keys(x).length;i++) 
						{
							if(i==0)
							{
								$('#titleratingVal'+uId).append('<br>' + Object.values(x)[i] + ' : ' + Object.values(x)[i+1] + ',');
							}
						}
					}	
				}

				$('#titlemetascoreVal'+uId).append(response.Metascore);
				$('#titleimdbratVal'+uId).append(response.imdbRating);
				$('#titleimdbvtVal'+uId).append(response.imdbVotes);
				$('#titleimdbidVal'+uId).append(response.imdbID);
				$('#titletypeVal'+uId).append(response.Type);
				$('#titledvdVal'+uId).append(response.DVD);
				$('#titleboxofficeVal'+uId).append(response.BoxOffice);
				$('#titleproductionVal'+uId).append(response.Production);
				$('#titlewebsiteVal'+uId).append(response.Website);
				$('#titleresponseVal'+uId).append(response.Response);
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

        }

         
	});
}