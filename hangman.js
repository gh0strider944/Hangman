
//Opening modal splashscreen and menu
//rollovers dont work after reset.
//buttons changing color on click after flawless win
//querty keypad?
var hangman = {};

hangman.currentWord = "";
hangman.lettersGuessed = "";
hangman.clue = "";
hangman.incorrectGuesses = 0;
//hangman.cssLink = $("<link rel='stylesheet' type='text/css' href='" + "styles.css" + "'>");



$( document ).ready(function() { //********************************************************************************


    //$("#messageDiv").hide(); 
    
    $.getJSON("_json/states_titlecase.json", function(json) {		
		hangman.currentWord = json[Math.floor((Math.random() * 58) + 0)].name;
		hangman.buildClue();
		//console.log( "ready!" );
	});
    

});



$(".letters" ).click(function(z) { //*****************************************************************************
  	var correctGuess = false;
  	var numberFound = 0;
  	
  z.preventDefault();
  	
  	//check if game is over with hangman.incorrectGuesses, if so then give restart prompt and exit
	if (hangman.incorrectGuesses > 5) {
		var r = confirm("The current game is over. Would you like to restart?");
		$("#displayClue").text(hangman.currentWord.toUpperCase());	//Show word, used to fix problem with old clue showing up after win or lose 
		if (r == true) {hangman.resetGame();} else {return false;}		
	}
	//check if the game has already been won, if so display restart prompt and exit 
  	if ($("#messageDiv").text() == "Congratulations! You were pardoned!") {
  		var y = confirm("The current game is over. Would you like to restart?");
		if (y == true) {hangman.resetGame();} else {return false;}
  	}
  	//Check if letter was already guessed, if so then exit
  	for (var i=0; i < hangman.lettersGuessed.length; i++) {     
  		if (hangman.lettersGuessed.charAt(i) == this.text) {return false;}
  	}



	  	
  
  	//check for correct guess, if incorrect then switch picture and change button color, if correct then show good job message and change button color  		
	for (var n=0; n < hangman.currentWord.length; n++){
		if (this.text == hangman.currentWord.charAt(n).toUpperCase()) {
			//Guess is correct
			numberFound++;
			correctGuess = true;
		}
	}
		
		
		
	//*****************************************************************Guess is correct, find number of letters found, display result
	if (correctGuess == true) { 		
		if (numberFound > 1) {
			$("#messageDiv").html("You found " + numberFound.toString() + " " + $(this).text().bold() + "s!"); //count number of finds
		} else {
			$("#messageDiv").html("You found " + numberFound.toString() + " " + $(this).text().bold() + "!"); //count number of finds
		}	
		$("#messageDiv").fadeIn('slow'); //.delay(1000).fadeOut('slow');
		//$.playSound('sound.mp3');
		$(this).removeClass("defaultLetterStyle").addClass("correctLetterStyle");
		//$(this).css('background-color', 'rgba(144,238,144, 0.9)');
		//$(this).css('background-color', '#004200');
		//$(this).css('color', '#004200');
		//$(this).css('border-color', '#004200');
		//$(this).css('border-style', 'outset');
		//$(this).css('text-shadow', '-1px -1px 0 rgba(255,255,255,0.3');
		//$(this).css('text-shadow', '1px 1px 5px #def, 0 0 0 #000, 1px 1px 5px #def');
		//break;
	}	  		


	//***************************************************************************************Guess is incorrect, show message and update picture	 		
	if (correctGuess == false) { 
		hangman.incorrectGuesses++;
		$("#gallowImage").attr("src", "_img/hangman" + hangman.incorrectGuesses + ".jpg");
		//this is the last guess and game over
		if (hangman.incorrectGuesses == 6) {
  			$("#displayClue").text(hangman.currentWord.toUpperCase());	//Show word
  			$("#messageDiv").text("Sorry, you have been hanged!");
  			$("#gallowImage").attr("src", "_img/loser.jpg");
  			$("#messageDiv").fadeIn('fast');
			//$("#btnReset").fadeIn('slow');
			return false;
		//this is not the last guess, so continue playing
		} else {
  			$("#messageDiv").text("Sorry, " + $(this).text() + " not found.");
  			$("#messageDiv").fadeIn('fast');//.delay(1000).fadeOut('slow');
			
			$(this).removeClass("defaultLetterStyle").addClass("wrongLetterStyle");
			
			//$(this).css('background-color', '#700000');
			//$(this).css('color', '#b57272');
			//$(this).css('border-color', 'black');
			//$(this).css('border-style', 'outset');
		}
	}
	  		
  		hangman.lettersGuessed += this.text;		//add guess to lettersGuessed 
  		hangman.buildClue();
  		$("#displayGuessed").text(hangman.lettersGuessed);
	  	
	  	
	  	
	  	//update clue, check if all letters were guessed
		//alert(this.text);
		//reset button, give up button, guess word button,
	
	

}); //End onclick function



hangman.buildClue = function (){ //***************************************************************************************************
	hangman.clue = "";
	var loser = true;
	for (var i=0; i < hangman.currentWord.length; i++) {
		var correct = false;
		if (hangman.currentWord.charAt(i) != " ") {
			for (var x=0; x < hangman.lettersGuessed.length; x++){
				if (hangman.lettersGuessed.charAt(x) == hangman.currentWord.charAt(i).toUpperCase()) {
					hangman.clue += hangman.currentWord.charAt(i);	
					correct = true;
				}
			}
			if (correct == false) {
				hangman.clue += "_";
			}
		} else { hangman.clue += " ";}
	}
	$("#displayClue").text(hangman.clue.toUpperCase());
	if(hangman.clue.indexOf('_') === -1) {	//Check if winner
		$("#messageDiv").text("Congratulations, You were pardoned!");
		$("#messageDiv").fadeIn('fast');
		//$("#btnReset").fadeIn('slow');
		$("#gallowImage").attr("src", "_img/winner.jpg");
	}
};



$(".linksClass" ).click(function(z) { //*****************************************************************************
  	z.preventDefault();
	hangman.resetGame();
});



hangman.resetGame = function () {
	
	$('.letters').removeClass('correctLetterStyle').addClass('defaultLetterStyle');
	$(".letters").removeClass("wrongLetterStyle").addClass("defaultLetterStyle");
	
	//$(".letters").css('border-color', '#9a9ae8');
	//$("#btnReset").hide();
	    
	hangman.incorrectGuesses = 0;
	hangman.lettersGuessed = "";
	hangman.clue = "";
	
	$("#gallowImage").attr("src", "_img/hangman.jpg");
	$("#messageDiv").text("Guess a letter.");
	$("#displayGuessed").text("?");
	
	
	switch($("#catSelect option:selected").text()) {
    
    case "US States and Territories":
        $.getJSON("_json/states_titlecase.json", function(json) {	//check current category and load appropriate file		
			hangman.currentWord = json[Math.floor((Math.random() * 58) + 0)].name;
			hangman.buildClue();
		});
        break;
    
    case "Countries":
        $.getJSON("_json/countries.json", function(json) {	//check current category and load appropriate file	, json file in wrong format?
			//hangman.currentWord = json[240].name;
			hangman.currentWord = json[Math.floor((Math.random() * 239) + 0)].name;
			hangman.buildClue();
		});
        break;
	}
		
	
	
	
	//$(this).css('border-style', 'outset');

};


$("#catSelect" ).change(function() { //*****************************************************************************
	hangman.resetGame();
});








