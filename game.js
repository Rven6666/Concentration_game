    //pop up message to challage the user
    alert("Do you think you have a good memory? Let's find out!")
    //prompt for input for player name
    let userInput = window.prompt("Enter player name: ");
    //gets element id 'playerName' on the index.html and inserts userInput into span area to be displayed at top fo screen.
    playerName = document.getElementById("playerName").textContent=userInput;

    //Set player lives to starting value '5'.
    let playerLives = 5;
    //gets element id = "PlayerLivesCount" and inserts assigned player lives '5'.
    playerlivesLeft = document.getElementById("playerLivesCount").textContent=playerLives;

    //create three variables
    // count for number of cards clicked
    let selectCount = 0;
    //variable to contain the id of the first card clicked
    let firstSelection = "";
    //variable to contain the id of the second card clicked
    let secondSelection = "";

    // creates constant 'cards' and returns a list of specified classes in the CSS which have been assigned in the HTML div.
    const cards = document.querySelectorAll(".cards .card");



    ///END GAME/ RESET game function.
    function endReset(type){
        //if player live count = 0, prompt 'Game over...'
        //reset player lives to '5'
        if (type == "lives"){
        //if player live count = 0, prompt 'Game over...'
        //reset player lives to '5'
            alert('GAME OVER! Too many incorrect guesses!');
        }
        if(type == "time"){
            alert('GAME OVER! OUT OF TIME!');           
        }
        if(type == "won"){
            alert('CONGRATS!!! YOU WON!');
        }

        if (confirm("Would you like to play again?")){
            playerLives = 5;
            startTime;
            countLocate;
            trackCount;
            time = startTime * 60;
            trackWin = 0;
            //reset the board for next game
            //select all node list of .cards and assign to cardList
            const cardList = document.querySelectorAll(".card");
            //for each card in cardList removed 'checked' from node list class name.
            for (let i = 0; i < cardList.length; i++) {
            cardList[i].classList.remove("checked");
            } 
            cardShow()
        }
        else{close();
        }
    }   

    //function that shows card are the start of very game for 2 seconds
    function cardShow(){  
        //For loop and 2 second time delay to show cards at start of game.
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.add("checked");
            } 
        setTimeout(() =>{
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove("checked");}
        },2000);
        }



    /// Timer function and count down timer
    const startTime = 0.5;
    const countLocate = document.getElementById('countdown');
    const trackCount = setInterval(countdownUpdate, 1000);

    let time = startTime * 60;

    function countdownUpdate(){
        
        const minutes = Math.floor(time/60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        countLocate.innerHTML = `${minutes}:${seconds}`;
        if(minutes == 0 & seconds ==0){
            endReset("time")
            return;
        }
        time--;
    }      


    cardShow();

    let trackWin = 0;
    //for each method executed on the cards list which will run the below code for each class from the list.
    cards.forEach((card) => {
        //Event listener on the card list that will perform the belowed code one a click on the card has been made
        card.addEventListener("click", function click(){
            //once a card is clicked the "clicked" will be added to the node/card class name to identify that it has been clicked
            card.classList.add("clicked");
            //if else statement to check if one card or two cards have been clicked
            //if counter is zero when clicked, one card has been clicked.
            //The getter will then get the id of that card and assign one to the clicked counter to the variable 'firstSelection'
            if (selectCount === 0){
                firstSelection = card.getAttribute("id");
                selectCount++
            //if the counter is 1, one card has been clicked.
            //the getter will get the id of the second card and assign it to the variable 'secondSelection'
            //clicked count is reset to zero to reset cycle of selection
            } else{
                secondSelection = card.getAttribute("id");
                selectCount = 0;
                //nested if else statement to check if two clicked cards match or not.
                if (firstSelection === secondSelection){
                    //if cards id's match
                    //create'correctCards' list
                    //select both cards with matching id and assign them to correctCards list
                    const correctCards = document.querySelectorAll(".card[id='"+firstSelection+"']");
                    
                    //for both cards in list add checked(pair made) to apply CCS opacity to remain visible
                    //remove "clicked" CCS style of the now assigned clicked HTML div node to separate "found pairs" from future incorrect/correct cards
                    correctCards[0].classList.add("checked");
                    correctCards[0].classList.remove("clicked");
                    correctCards[1].classList.add("checked");
                    correctCards[1].classList.remove("clicked");
                    

                    // tracking if game is won/ all cards match
                    trackWin++
                    console.log(trackWin);
                    if(trackWin == 8){
                        endReset("won")
                    }
                }
                else{
                    //if cards do not match
                    //select both cards that have been 'clicked'and have the CSS style .card.clicked applied/
                    //assignment them to "incorrectCards"
                    const incorrectCards = document.querySelectorAll(".card.clicked");
                        //add 'wrong' to class node for both cards because the id's do not match
                        incorrectCards[0].classList.add("wrong");
                        incorrectCards[1].classList.add("wrong");
                        //remove one from player lives
                        playerLives--;
                        //if statemrent to keep track of live count/end of game
                        if(playerLives === 0){
                            endReset("lives");
                        }
                        //update player live count
                        playerLivesCount.textContent = playerLives;
                    //Delay count after two incorrect cards selected of 0.8 seconds before cards flipped over/CSS style 'clicked' is removed.
                    setTimeout(() =>{
                        incorrectCards[0].classList.remove("wrong","clicked");
                        incorrectCards[1].classList.remove("wrong","clicked");
                    },800);
                }
            }
 
        });
    
    });

