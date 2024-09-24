/*Coding Steps:

    For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
        You do not need to do anything special when there is a tie in a round.
    Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.

// Four suits to represent the appearance (user interface - ui) for your cards
let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
console.log("Card Suits Example:", cardSuits);

    The game itself will automatically play using console.log() to display turns, points, cards used, and the outcome of the game. No user input via prompts is required.

The completed project should, when executed, do the following:

    Deal 26 Cards to each Player from a Deck of 52 cards.
    Iterate through the turns where each Player plays a Card.
    The Player who played the higher card is awarded a point.
    -Ties result in zero points for both Players.
    After all cards have been played, display the score and declare the winner.


The following is extra credit (10pts)

    Write a Unit Test using Mocha and Chai for at least one of the functions you write.*/



/////Card class to start off construction - cards will have ranks (e.g. 2, 3, J, Q, etc), suits, and a value that is used for card comparison    
class Card {
    constructor(rank, suit, value) {
        this.rank = rank;
        this.suit = suit;
        this.value = value;
    }
}
////Deck class includes an empty array to hold the full deck of cards.
class Deck {
    constructor() {
        this.cards = [];
    }
    /////Deck method will first create the full deck - it introduces specific ranks, suits, and values to construct the cards, and then... 
    createDeck() {
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let suits = ['♣️', '♦️', '♥️', '♠️'];
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        ///...iterates through each element of the suits and ranks arrays, and uses the same index value for values so that it will correspond to the above values of 1 through 13.

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(ranks[j], suits[i], values[j])); /////Deck constructor this.cards is the array that new Cards are pushed into, with each card holding a rank, suit, and value.
            }
        }
    }
    /////2nd Deck method that will shuffle the cards using the Fisher-Yates Sorting Algorithm - returns the filled array this.cards
    shuffleDeck() {
        let location1, location2, tmp;
        for (let i = 0; i < 1000; i++) {
            location1 = Math.floor((Math.random() * this.cards.length));
            location2 = Math.floor((Math.random() * this.cards.length));
            tmp = this.cards[location1];
            this.cards[location1] = this.cards[location2];
            this.cards[location2] = tmp;
            
        }
    }
}
/////Player class creates players by name, and assigns them an empty array playerCards to deal cards to, as well as points, set to 0 to track points throughout the game.
class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCards = [];
        this.points = 0;

    }
}
/////Game class holds 2 empty arrays that will be filled with soon to bew constructed players and cards that will be used during active game play
class Game {
    constructor() {
        this.cardsInPlay = [];
        this.players = [];

    }
     /////multiple iterations of this code were made - startFull plays war by traditional rules, and startSimple prioritizes brevity by awarding points and concluding when all cards have been drawn.
    startFull(player1Name,player2Name){
        this.deal(player1Name,player2Name);
        this.compare();
        this.end();
    }
    startSimple(player1Name,player2Name){
        this.deal(player1Name,player2Name);
        this.round();
    }
    ////game method to deal the cards - this method creates 2 Players and the Deck. 
    deal(player1, player2) {
        this.players.push(new Player(player1));
        this.players.push(new Player(player2));
        let d = new Deck();
        d.createDeck(); ///Deck method to create the 52 cards
        d.shuffleDeck();////Deck method to shuffle the cards
        /////the deck, held in the array 'cards' is dealt out to the 2 players in array playerCards
    
        while (d.cards.length > 0) {
            this.players[0].playerCards.push(d.cards.pop());
            this.players[1].playerCards.push(d.cards.pop());////pop is used as a quick way to make sure that the card is removed from the cards array when it gets pushed to a player's hand
        }
    }
    /////multiple iterations of this code were made - this draw method is used for a full game of War during which a card is removed from the player's decks, compared, and then collected by the round winner. This method takes the first element in each playerCards array and pushes it to the cardsInPlay pile
    draw() {
        const p1Card = this.players[0].playerCards.shift();
        const p2Card = this.players[1].playerCards.shift();
        this.cardsInPlay.push(p1Card, p2Card);
    } 
    /////the compare method takes those 2 cards in the cardsInPlay pile, logs the card rank and suit, and then compares their values. Depending upon which value is greater, the 2 cards are then pushed to the winning player's hand, and then they are removed from the cardsInPlay pile via a splice. The round winner is logged in the console alongside the cards
    compare() {
        let p1 = this.players[0];
        let p2 = this.players[1];
        let p1Name = p1.playerName;
        let p2Name = p2.playerName;
        let p1Hand = p1.playerCards;
        let p2Hand = p2.playerCards;
        let roundWinner = '';

    while(p1Hand.length !== 0 && p2Hand.length !== 0){
            this.draw();

        if(this.cardsInPlay[0].value > this.cardsInPlay[1].value) {
            roundWinner = p1Name;

            p1Hand.push(this.cardsInPlay[0], this.cardsInPlay[1]);

            console.log('\n','Player 1 Card:', this.cardsInPlay[0], '\n','Player 2 Card:', this.cardsInPlay[1], '\n', roundWinner, ' Wins this Round','\n',p1Name,'Cards Remaining:',p1Hand.length,'\n',p2Name,' Cards Remaining:',p2Hand.length);

            this.cardsInPlay.splice(0, 2);

        } else if(this.cardsInPlay[1].value > this.cardsInPlay[0].value) {
            roundWinner = p2Name;

            p2Hand.push(this.cardsInPlay[0], this.cardsInPlay[1]);

            console.log('\n','Player 1 Card:', this.cardsInPlay[0], '\n','Player 2 Card:', this.cardsInPlay[1], '\n', roundWinner, ' Wins this Round','\n',p1Name,'Cards Remaining:',p1Hand.length,'\n',p2Name,' Cards Remaining:',p2Hand.length);

            this.cardsInPlay.splice(0, 2);

        } else if (this.cardsInPlay[1].value === this.cardsInPlay[0].value){
            console.log('\n','WAR!','\n\n','Player 1 Card:', this.cardsInPlay[0], '\n','Player 2 Card:', this.cardsInPlay[1]);
            ///this.war();

            } 
        }  
    }
    end(){
        let p1 = this.players[0];
        let p2 = this.players[1];
        let p1Name = p1.playerName;
        let p2Name = p2.playerName;
        let p1Hand = p1.playerCards;
        let p2Hand = p2.playerCards;
       
        while(this.cardsInPlay.length > 0){
            this.players[0].playerCards.shift();
            this.players[1].playerCards.shift();
            this.compare();
        }
        while (p1Hand.length === 0 || p2Hand.length === 0 ) {
            if (p1Hand.length === 0) {
                console.log('\nGame Over! 🏆 ',p2Name, ' Wins! 🎉');

            }
            if (p2Hand.length === 0) {
                console.log('\nGame Over! 🏆 ',p1Name, ' Wins! 🎉');

            } break;
            }
        }
    
    war() {
        let p1Hand = this.players[0].playerCards;
        let p2Hand = this.players[1].playerCards;
        let war = this.cardsInPlay;
        ////if the card values are equal, war ensues, which is when each player puts 1 additional card face down, and an additional card face up (6 cards total in play). The second turned up cards are then compared, following the same rules of the higher value wins. In this case, they would take all 6 cards. If it's another tie, then they do this process of 1 card down, 1 card up again (then 10 cards in play), and so on until one of the turned up cards is higher, with 4 cards being added to the pile each time. For brevity, after 1 round of war, the cards are returned to each player and spliced from the cardsInPlay pile.
     
        if (war[0].value === war[1].value) {
            console.log('\n','WAR!','\n\n','Player 1 Card:', war[0], '\n','Player 2 Card:', war[1]);
            this.draw(); this.draw();
            ///in draw, p1 card is drawn first, then p2, so the cards pushed to the cardsInPlay pile would go in this order: [0]p1 [1]p2 [2]p1 [3]p2 [4]p1 [5]p2
            if (war[4].value > war[5].value) {
                p1Hand.push(war[0], war[1], war[2], war[3], war[4], war[5]);
               
                console.log('\n','Player 1 Card:', war[4], '\n','Player 2 Card:', war[5], '\n',this.players[0].playerName, 'wins this round');
                war.splice(0, 6);

            } else if (war[5].value > war[4].value) {
                p2Hand.push(war[0], war[1], war[2], war[3], war[4], war[5]);
                
                console.log('\n','Player 1 Card:', war[4],'\n','Player 2 Card:',war[5],'\n',this.players[1].playerName,'wins this round');
                war.splice(0, 6);

            } else {
                p1Hand.push(war[0], war[2], war[4]);
                p2Hand.push(war[1], war[3], war[5]);
                war.splice(0, 6);
                
            }
        } 
       ////returns to the compare method loop
    } 

    /////method 'round' is an alternate way of playing the game - during this version, rounds are played until all cards have been drawn, and a point is awarded to each round winner, concluding the game by declaring a winner
    round() {
        let p1 = this.players[0];
        let p2 = this.players[1];
        let p1Name = p1.playerName;
        let p2Name = p2.playerName;
        let p1Hand = p1.playerCards;
        let p2Hand = p2.playerCards;
        let p1Point = p1.points;
        let p2Point = p2.points;
        let turn = 0;
        let roundWinner = '';


        while (p1Hand.length !== 0 && p2Hand.length !== 0) {
            const p1Card = p1Hand.shift();
            const p2Card = p2Hand.shift();
            ///this.cardsInPlay.push(p1Card, p2Card);
            ///const p1C = this.cardsInPlay[0];
            ///const p2C = this.cardsInPlay[1];


            if (p1Card.value > p2Card.value) {
                roundWinner = p1Name;
                ///p1Hand.push(p1C, p2C);
                p1Point += 1;
                ///this.cardsInPlay.splice(0, 2);

                console.log('\n','Turn', (turn += 1), '\n\n', p1Name, ':', p1Card.rank, 'of', p1Card.suit, ' | ', p2Name, ':', p2Card.rank, 'of', p2Card.suit, '\n\n Round Winner:', roundWinner,'\n Points Total:', p1Name,': ',p1Point,' | ',p2Name,': ',p2Point);

            } else if (p2Card.value > p1Card.value) {
                roundWinner = p2Name;
                ///p2Hand.push(p1C, p2C);
                p2Point += 1;
                ///this.cardsInPlay.splice(0, 2);

                console.log('\n','Turn', (turn += 1), '\n\n', p1Name, ':', p1Card.rank, 'of', p1Card.suit, ' | ', p2Name, ':', p2Card.rank, 'of', p2Card.suit, '\n\n Round Winner:', roundWinner,'\n Points Total:', p1Name,': ',p1Point,' | ',p2Name,': ',p2Point);

            } else {
                ///p1Hand.push(p1C);
                ///p2Hand.push(p2C);
                ///this.cardsInPlay.splice(0, 2);

                console.log('\n','Turn', (turn += 1), '\n\n', p1Name, ':', p1Card.rank, 'of', p1Card.suit, ' | ', p2Name, ':', p2Card.rank, 'of', p2Card.suit, '\n\n Round Winner: Tie - No Points Awarded','\n','Points Total:', p1Name,': ',p1Point,' | ',p2Name,': ',p2Point);
                }
            }
            while (p1Hand.length === 0 || p2Hand.length === 0) {
                if (p1Point > p2Point) {
                    console.log('\n','Game Over! 🏆  ',p1Name, ' Wins! 🎉','\n\n','Points Total:', p1Name,': ',p1Point,' | ',p2Name,': ',p2Point);
    
                }
                if (p2Point > p1Point) {
                    console.log('\n','Game Over! 🏆  ',p2Name, ' Wins! 🎉','\n\n','Points Total:', p1Name,': ',p1Point,' | ',p2Name,': ',p2Point);
    
                } break;
            }
        }
    }

let g = new Game();
g.startSimple("Alyssa","Shay");













/*

 while(d.cards.length > 0){
      const random1 = Math.floor((Math.random() * d.cards.length));
      const card1 = d.cards.splice(random1,1);
      const random2 = Math.floor((Math.random() * d.cards.length));
      const card2 = d.cards.splice(random2,1);
      this.players[0].playerCards.push(card1);
      this.players[1].playerCards.push(card2);


setUp() {
      let p1 = this.players[0];
      let p2 = this.players[1];
      let p1Name = p1.playerName;
      let p2Name = p2.playerName;
      let p1Hand = p1.playerCards;
      let p2Hand = p2.playerCards;
    
      console.log('--------- WAR ----------','\n',p1Name,'Cards: ',p1Hand,'\n\n',p2Name,'Cards: ',p2Hand);
      }
  play(){
      let p1 = this.players[0];
      let p2 = this.players[1];
      let p1Name = p1.playerName;
      let p2Name = p2.playerName;
      let p1Hand = p1.playerCards;
      let p2Hand = p2.playerCards;
      let turn = 0;
      let roundWinner = '';


  while(p1Hand.length !== 0 && p2Hand.length !== 0){
      let p1Card = p1Hand.pop();
      let p2Card = p2Hand.pop();

      if(p1Card.value > p2Card.value){
          roundWinner = p1Name;
          p1.points += 1;
          console.log('Turn: ', (turn += 1), '\n\nPlayer 1 Card: ',p1Card.rank,' of ',p1Card.suit, '\nPlayer 2 Card: ',p2Card.rank, ' of ',p2Card.suit,'\n\nRound Winner: ',roundWinner,' (point total: ',p1.points,')');
      } else if (p2Card.value > p1Card.value){
          roundWinner = p2Name;
          p2.points += 1;
          console.log('Turn: ', (turn += 1), '\n\nPlayer 1 Card: ',p1Card.rank,' of ',p1Card.suit, '\nPlayer 2 Card: ',p2Card.rank, ' of ',p2Card.suit,'\n\nRound Winner: ',roundWinner,' (point total: ',p2.points,')');
      } else {
          console.log('Turn: ', (turn += 1), '\n\nPlayer 1 Card: ',p1Card.rank,' of ',p1Card.suit, '\nPlayer 2 Card: ',p2Card.rank, ' of ',p2Card.suit,'\n\nTie!');
          }
      }
  }
      win(){
          let p1 = this.players[0];
          let p2 = this.players[1];
          let p1Name = p1.playerName;
          let p2Name = p2.playerName;
          let p1Hand = p1.playerCards;
          let p2Hand = p2.playerCards;
          let gameWinner = '';
          let winnerPoints = 0;
          if(p1.points > p2.points){
              gameWinner = p1Name;
              winnerPoints = p1.points;
              console.log(gameWinner,' is the Winner!', '\n','Final Point Count: ',p1Name,': ',winnerPoints,' | ',p2Name,': ',p2.points)
          } else if(p2.points > p1.points){
              gameWinner = p2Name;
              winnerPoints = p2.points;
              console.log('\n',gameWinner,' is the Winner!','\n\n', 'Final Point Count: ',p2Name,': ',winnerPoints,' | ',p1Name,': ',p1.points)
      } else {
          console.log('Game Over!');
      }
  }

let location1, location2, tmp;
      for (let i = 0; i < 1000; i++) {
          location1 = Math.floor((Math.random() * this.cards.length));
          location2 = Math.floor((Math.random() * this.cards.length));
          tmp = this.cards[location1];
          this.cards[location1] = this.cards[location2];
          this.cards[location2] = tmp;
          }
      }
  draw(){
      let p1Draw = this.players[0].playerCards.splice(0,1);
      let p2Draw = this.players[1].playerCards.splice(0,1);
      this.cardsInPlay.push(p1Draw,p2Draw);
      }
 
  function start(player1,player2){
      let b = new Board();
      
      b.deal(player1,player2);
      
      let p1Cards = b.players[0].playerCards;
      let p2Cards = b.players[1].playerCards;
    
      while(p1Cards.length > 0 && p2Cards.length > 0){
          
      console.log(`
${b.players[0].playerName} Cards Left: ${p1Cards.length}
${b.players[1].playerName} Cards Left: ${p2Cards.length}`);
          
          let p1Draw = p1Cards.pop();
          let p2Draw = p2Cards.pop();
          b.cardsInPlay.push(p1Draw,p2Draw);
          let p1D = b.cardsInPlay[0];
          let p2D = b.cardsInPlay[1];

          console.log(`
${b.players[0].playerName}'s Card:`); 
          console.log(p1Draw);
          console.log(`
${b.players[1].playerName}'s Card:`); 
          console.log(p2Draw);
          console.log(`----- End Round ----`)
          
         
          if(p1Draw.value > p2Draw.value){
              p1Cards.splice(0,0,p2Draw);

          } else if(p2Draw.value > p1Draw.value){
              p2Cards.splice(0,0,);

          } else 
              p1Cards.splice(0,0,p1Draw);
              p2Cards.splice(0,0,p2Draw);
              
      }

      while(p1Cards.length == 0 || p2Cards.length == 0){
          if(p1Cards.length == 0){
              console.log(`
Game Over 🏆 ${b.players[1].playerName} Wins! 🎉`);
             
          }
          if(p2Cards.length == 0){
              console.log(`
Game Over 🏆 ${b.players[0].playerName} Wins! 🎉`);
             
          }break;
      }
  } 

 



///start('Shay','Alyssa');*/
