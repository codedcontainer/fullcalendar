$scope.$on('$routeChangeSuccess', function()
	{	
		// initialz creation of the fullCalendar
		$('#calendar').fullCalendar({
			eventBackgroundColor: '#0f58a7',
			eventBorderColor: '#0f58a7',
			header:
			{
				left: 'title',
				center: '',
				right: 'today prev, next',
			},
			buttonIcons:
			{
				prev: 'left-single-arrow',
			},
			eventClick: function(event, jsEvent, view)
			{
				$('.myModal3 .title').text(event.title);
				$('.myModal3 .date').text(event.start.format('MMM Do YYYY @ h:mm:ss a'));
				$('.myModal3 .modal-body').text(event.desc);
				$('.myModal3 .modal-body').append("<a href='" + event.link + "' target='_blank'>Learn More</a>");

				$('.myModal3').css('display', 'block');
				$('.myModal3.fade').css('opacity', '1');
			},
			events: function(start, end, timezone, callback)
			{
				var eventsArray = [];
				//rewrite the ajax call as a http promise
				$http({
					url: 'http://unitedway.iupui.edu/includes/calendar.asp', 
					dataType: 'xml',
					method: "get"
					})
					.then(
						function(doc){
						 	var x2js = new X2JS();
							var jsonString = x2js.xml_str2json(doc.data); 
							var events = jsonString.events.event; 

								for( var i = 0; i <= events.length-1; i++){
									var time = events[i]['start-date-time']; 
									var formatTime = moment(time).format(); 
									var title = events[i]['summary'];
									var urlLink = events[i]['event-url'];
									var formatTime = moment(time).format(); 
									var description = events[i]['description'];
									eventsArray.push({
									 title: title, 
									link: urlLink,
									start: formatTime, 
									desc: description 
									});		
								}
							callback(eventsArray); 	
					}); //end then promise
				
				
		} // end events 
	});// end full calendar
	
	
	
	$(window).resize(function()
	{
		windowSize(); 
	});
	windowSize(); 
	function windowSize(){ 
			if ( window.innerWidth > 767 )
			{
				$('#calendar').fullCalendar('changeView', 'month' );
				 
			}
			else { 
				$('#calendar').fullCalendar('changeView', 'listMonth' ); 
			}
	
		}
	
