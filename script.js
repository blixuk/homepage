var quotes = [ "If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.", 
"Madness, as you know, is a lot like gravity, all it takes is a little push.", 
"The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.", 
"Life has many ways of testing a person's will, either by having nothing happen at all or by having everything happen all at once.", 
"There is no excellent beauty that hath not some strangeness in its proportions.", "Children are fantastic little creatures, because next to drunk people, they are the only truly honest people on earth.", 
"I begin with an idea, and then it becomes something else.", 
"Be who you are and say what you feel because those who mind don't matter and those who matter don't mind.", 
"You can make more friends in two months by becoming interested in other people than you can in two years by trying to get people interested in you.", 
"An essential aspect of creativity is not being afraid to fail.", 
"Antisocial behavior is a trait of intelligence in a world of conformists.", 
"What you do today can improve all your tomorrows.", 
"A creative man is motivated by the desire to achieve, not by the desire to beat others.", 
"Don't watch the clock; do what it does. Keep going.", 
"If you can dream it, you can do it.", 
"You can't build a reputation on what you're going to do.",
"I will love the light for it shows me the way, yet I will endure the darkness for it shows me the stars.",
"It’s breathtaking to consider; You have two eyes, each composed of 130 million photoreceptor cells. In each one of those cells, there are 100,000,000,000,000 (100 trillion) atoms – that’s more than all the stars in the Milky Way Galaxy. However, each atom in each cell in each eye formed in the core of a star, billions of years ago, & yet, here they are today, being utilized to capture the energy released from that same process. All to expand the consciousness of YOU. The Universe has an interesting sense of irony, in that you are the Universe experiencing itself. And all you are is a thought.",
"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
"No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.",
"Look deep into nature, and then you will understand everything better.",
"It is the mark of an educated mind to be able to entertain a thought without accepting it.",
"Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
"When you arise in the morning, think of what a precious privilege it is to be alive - to breathe, to think, to enjoy, to love.",
"You have power over your mind - not outside events. Realize this, and you will find strength.",
"I have often wondered how it is that every man loves himself more than all the rest of men, but yet sets less value on his own opinions of himself than on the opinions of others." ];
var quoted = [ "Lao Tzu", 
"Joker", 
"Friedrich Nietzsche", 
"Paulo Coelho", 
"Sir Francis Bacon", 
"Mads Nipper", 
"Pablo Picasso", 
"Dr. Seuss", 
"Dale Carnegie", 
"Edwin Land", 
"Nikola Tesla", 
"Ralph Marston", 
"Ayn Rand", 
"Sam Levenson", 
"Walt Disney", 
"Henry Ford",
"Og Mandino",
"Anonymous",
"Buddha",
"Buddha",
"Albert Einstein",
"Aristotle",
"Marcus Aurelius",
"Marcus Aurelius",
"Marcus Aurelius" ];
var greets = [ 'Hello',
'Salutations', 
'Hey', 
'Hi', 
'Greetings', 
'Aloha', 
'Namaste', 
'Hiya', 
'Peace' ];

// Finds current time and date, formats it properly
function startTime() {
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	var dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	var now = new Date();
	var hour = now.getHours();
	var mins = now.getMinutes();
	var secs = now.getSeconds();
	var ampm = hour >= 12 ? 'PM' : 'AM';
	var date = now.getDate();
	var day  = dayNames[now.getDay()];
	var month = monthNames[now.getMonth()];
	var year = now.getFullYear();
	hour = hour % 12;
  	hour = hour ? hour : 12;
	mins = mins < 10 ? '0' + mins : mins;
	secs = secs < 10 ? '0' + secs : secs;
	var timeString = hour + ':' + mins + ':' + secs + ' ' + ampm;
	var dateString = day + ' ' + month + ' ' + date + ', ' + year;
	document.getElementById('time').innerHTML = timeString;
	document.getElementById('date').innerHTML = dateString;
	var t = setTimeout(startTime, 500);
}
// Gets weather for requested location, appends to page
function getWeather(location) {
	$.simpleWeather({
		location: location,
		success: function(weather) {
			$('.weather').html('The weather in ' + weather.city + ' is currently ' + weather.currently + ', with a temperature of ' + weather.temp + '&deg; and wind speeds of ' + weather.wind.speed + weather.units.speed + ' <span class="no-transform">' + weather.wind.direction + '</span>');
			$('.weatherlink').html('<a href="' + weather.link + '">More details (w)</a>');
			$('.weather1').html(weather.forecast[1].day + ' - ' + weather.forecast[1].text + ', temperature ' + weather.forecast[1].high + '&deg;');
			$('.weather2').html(weather.forecast[2].day + ' - ' + weather.forecast[2].text + ', temperature ' + weather.forecast[2].high + '&deg;');
			$('.weather3').html(weather.forecast[3].day + ' - ' + weather.forecast[3].text + ', temperature ' + weather.forecast[3].high + '&deg;');
			$('.weather4').html(weather.forecast[4].day + ' - ' + weather.forecast[4].text + ', temperature ' + weather.forecast[4].high + '&deg;');
		},
		error: function(error)   {
			$('.weather').html('Sorry, there has been a problem retrieving the weather information.');
		}
	});
}
// Master loading function; appends random greeting, quote, and weather
function loadStuff() {
	var randNum = Math.floor((Math.random() * greets.length));
	var randNum2 = Math.floor((Math.random() * quotes.length));
	$('.greeting').html(greets[randNum] + ' Blix');
	$('.quote').html('&ldquo;' + quotes[randNum2] + '&rdquo; &mdash; ' + '<cite><small>' + quoted[randNum2] + '</small></cite>');
	// Geolocates the user, otherwise defaulting to Pittsburgh (2473224)
	if('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
	    	getWeather(position.coords.latitude + ',' + position.coords.longitude);
	  	}, getWeather("luton"), {timeout: 5000});
	} else { getWeather("luton"); }
}
// Initializes keyboard nav
function bindMousetraps() {
	$.each($('.parent'), function(i, val) {
		Mousetrap.bind($(val).children('span').text(), function(e) {
			$('a#' + $(val).attr('id')).toggleClass('active').next().slideToggle(150);
			$.each($(val).parent().find('.tab span'), function(i, val) {
				Mousetrap.bind($(val).text(), function(e) {
					window.location.href = $(val).parent().attr('href');
				});
			});
			Mousetrap.bind($(val).children('span').text(), function(e) {
				resetMousetraps();
			});
		});
	});
	// Resets on ESC or spacebar
	Mousetrap.bind(['esc', 'space'], function(e) {
		resetMousetraps();
	});
	// Binds Weather and GitHub links
	Mousetrap.bind('w', function(e) {
		window.location.href = $('.weatherlink').children().attr('href');
	});
	Mousetrap.bind('g', function(e) {
		window.location.href = $('.github').children().attr('href');
	});
}
// Closes cells, rebinds keyboard shortcuts
function resetMousetraps() {
	$('.subMenu').slideUp(150);
	$('li a').removeClass('active');
	Mousetrap.reset();
	bindMousetraps();
}
// Initializes everything on page load
$(function() {
	startTime();
	loadStuff();
	bindMousetraps();
	// Binds click events for opening tabs and background click to close
	$('li a.parent').click(function() {
		$(this).parent('li').find('ul').slideToggle(150);
		$(this).toggleClass('active');
	});
	$('#background').click(function() {
		resetMousetraps();
	});
});
