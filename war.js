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

class Card {
    constructor(rank, suit, value) {
        this.rank = rank;
        this.suit = suit;
        this.value = value;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }
    createDeck() {
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let suits = ['♣️', '♦️', '♥️', '♠️'];
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(ranks[j], suits[i], values[j]));
            }
        }
    }
    shuffleDeck() {
        let location1, location2, tmp;
        for (let i = 0; i < 1000; i++) {
            location1 = Math.floor((Math.random() * this.cards.length));
            location2 = Math.floor((Math.random() * this.cards.length));
            tmp = this.cards[location1];
            this.cards[location1] = this.cards[location2];
            this.cards[location2] = tmp;
            return this.cards;
        } 
    }
}
class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCards = [];
       /// this.points = 0;

    }
}

class Game {
    constructor() {
        this.cardsInPlay = [];
        this.players = [];
       
    }
    deal(player1,player2){
        this.players.push(new Player(player1));
        this.players.push(new Player(player2));
        let d = new Deck();
        d.createDeck();
        d.shuffleDeck();
    while(d.cards.length > 0){
        this.players[0].playerCards.push(d.cards.pop());
        this.players[1].playerCards.push(d.cards.pop());
        } 
        }
    draw(){
        const p1Card = this.players[0].playerCards.shift();
        const p2Card = this.players[1].playerCards.shift();
        this.cardsInPlay.push(p1Card,p2Card);
       
    }
    compare(){
        let p1Hand = this.players[0].playerCards;
        let p2Hand = this.players[1].playerCards;
       
        if(this.cardsInPlay[0].value > this.cardsInPlay[1].value){
            p1Hand.push(this.cardsInPlay[0],this.cardsInPlay[1]);
            console.log('\nPlayer 1 Card:',this.cardsInPlay[0],'\nPlayer 2 Card:',this.cardsInPlay[1],'\n',this.players[0].playerName,' Wins this Round')
            this.cardsInPlay.splice(0,2);   
       
        } else if(this.cardsInPlay[1].value > this.cardsInPlay[0].value){
             p2Hand.push(this.cardsInPlay[0],this.cardsInPlay[1]);
             console.log('\nPlayer 1 Card:',this.cardsInPlay[0],'\nPlayer 2 Card:',this.cardsInPlay[1],'\n',this.players[1].playerName,' Wins this Round')
             this.cardsInPlay.splice(0,2);  
          
            } else{
           this.war();
           }
    }
    war(){
        let p1Hand = this.players[0].playerCards;
        let p2Hand = this.players[1].playerCards;
        if(this.cardsInPlay[0].value === this.cardsInPlay[1].value){
            this.draw(); this.draw(); this.draw();
            if(this.cardsInPlay[6].value > this.cardsInPlay[7].value){
            p1Hand.push(this.cardsInPlay[0],this.cardsInPlay[1],this.cardsInPlay[2],this.cardsInPlay[3],this.cardsInPlay[4],this.cardsInPlay[5],this.cardsInPlay[6],this.cardsInPlay[7]);
            this.cardsInPlay.splice(0,8);
            console.log(this.players[0].playerName,' win');
    } else if(this.cardsInPlay[7].value > this.cardsInPlay[6].value){
        p2Hand.push(this.cardsInPlay[0],this.cardsInPlay[1],this.cardsInPlay[2],this.cardsInPlay[3],this.cardsInPlay[4],this.cardsInPlay[5],this.cardsInPlay[6],this.cardsInPlay[7]);
        this.cardsInPlay.splice(0,8);
        console.log(this.players[0].playerName,' win');
    }}}
    round(){
        let p1 = this.players[0];
        let p2 = this.players[1];
        let p1Name = p1.playerName;
        let p2Name = p2.playerName;
        let p1Hand = p1.playerCards;
        let p2Hand = p2.playerCards;
        let turn = 0;
        let roundWinner = '';
       

        while(p1Hand.length !== 0 && p2Hand.length !== 0){
            const p1Card = p1Hand[0];///.shift();
            const p2Card = p2Hand[0];///.shift();
            this.cardsInPlay.push(p1Card,p2Card);
            const p1C = this.cardsInPlay[0];
            const p2C = this.cardsInPlay[1];
            

            if(p1Card.value > p2Card.value){
                p1Hand.splice(0,1);
                p2Hand.splice(0,1);
                p1Hand.push(p1C,p2C);///(p1Hand.shift(),p2Hand.shift());
                this.cardsInPlay.splice(0,2);
                roundWinner = p1Name;
                
                console.log('Turn',(turn += 1),'\n',p1Name,':',p1Card.rank,'of',p1Card.suit, '\n',p2Name,':',p2Card.rank,'of',p2Card.suit,'\n Round Winner:',roundWinner);
                
            } else if (p2Card.value > p1Card.value){
                p1Hand.splice(0,1);
                p2Hand.splice(0,1);
                p2Hand.push(p1C,p2C);///(p1Hand.shift(),p2Hand.shift());
                this.cardsInPlay.splice(0,2);
                roundWinner = p2Name;
                
               console.log('Turn',(turn += 1),'\n',p1Name,':',p1Card.rank,'of',p1Card.suit, '\n',p2Name,':',p2Card.rank,'of',p2Card.suit,'\n Round Winner:',roundWinner);
              
            } else {
                p1Hand.splice(0,1);
                p2Hand.splice(0,1);
                p1Hand.push(p1C);///(p1Hand.shift());
                p2Hand.push(p2C);///(p2Hand.shift());
                this.cardsInPlay.splice(0,2);
               
                } 
                
        }
        while(p1Hand.length == 0 || p2Hand.length == 0){
            if(p1Hand.length == 0){
                console.log(`
Game Over 🏆 ${p2Name} Wins! 🎉`);
               break;
            }
            if(p2Hand.length == 0){
                console.log(`
Game Over 🏆 ${p1Name} Wins! 🎉`);
               break;
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
        while(p1Hand.length == 0 || p2Hand.length == 0){
            if(p1Hand.length == 0){
                console.log(`
Game Over 🏆 ${p2Name} Wins! 🎉`);
               
            }
            if(p2Hand.length == 0){
                console.log(`
Game Over 🏆 ${p1Name} Wins! 🎉`);
               
            }break;
        }
    }
}
  
 ///let b = new Game();
  ///b.deal("Alyssa","Shay");
  ///b.round();
  ///b.end();
 

  
  
  
  
  
  
  
  
  
  
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
