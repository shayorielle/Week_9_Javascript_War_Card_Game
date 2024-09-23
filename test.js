/*
  If you have not, be sure to cd into the project and run: npm install
  This will install the dependencies needed for the project ie. mocha and chai
  Check package.json for version numbers of dependencies when looking at documentation or examples.
*/

let expect = chai.expect; //imports the expect function from the chai library.

/*NOTE
    This is an example and as such may not work the same for you.
    Use this is a guide to help you understand how to write tests.
    Be sure to refer to the mocha/chai documentation for more information.
    */




//Describes what is being tested.
describe("Deck of Cards Length", () => {
  /*
  (done) is a parameter used to tell Mocha that this test is asynchronous.
  This means other tests can run while this test is running.
  */

  //Describe what the test is checking for.
  it("should see if the length of the card deck is equal to 52.", function (done) {
    let d = (new Deck);
    d.createDeck(); //Creates a new deck of cards from the game itself. ie. war.js
    let cards = d.cards; //Creates a variable that holds the card deck.
    let numberOfCards = cards.length; //Creates a variable that outputs the number of cards in the deck.

    console.log("------------ Test 1 -------------");
    console.log("Here are my cards:", cards);
    console.log("How many cards do I have?", numberOfCards); //Prints the cards to the console.

    //Checks if the number of cards is equal to 52.
    expect(numberOfCards).to.eql(52);

    done(); //Tells Mocha that the test is done.
  });
});


describe("Shuffle deck of cards", () => {

  it("should create two new decks, shuffle one, and then see if the card at index 0 of the two decks is different", function (done) {
    let d1 = new Deck();
    d1.createDeck(); //Creates a new deck of cards
    let cards1 = d1.cards; //Creates a variable that holds the 1st card deck.
    let card1 = cards1[0];

    let d2 = new Deck();
    d2.createDeck();
    d2.shuffleDeck();
    let cards2 = d2.cards;
    let card2 = cards2[0];

    console.log("------------ Test 2 -------------");
    console.log("Here is the 1st card from the unshuffled deck: ", card1);
    console.log("Here is the 1st card from the shuffled deck: ", card2);
    console.log("Are the two cards different? ",card1!=card2)
    expect(card1).to.not.equal(card2);

    done();
  
  });
});


describe("Deal cards to 2 players", () => {
 
  it("should split the deck of cards evenl amongst 2 players, leaving each player with 26 cards each.", function(done){
    let b = new Game();
    b.deal('Jane','John');
    let p1 = b.players[0];
    let p2 = b.players[1];
    let player1Hand = p1.playerCards;
    let player2Hand = p2.playerCards;

    console.log("------------ Test 3 -------------");
    console.log("Here are " + p1.playerName + "'s cards: ",player1Hand);
    console.log("How many cards does " + p1.playerName + " have? ", player1Hand.length);
    console.log("Here are " + p2.playerName + "'s cards: ",player2Hand);
    console.log("How many cards does " + p2.playerName + " have? ", player2Hand.length);


    expect(player1Hand.length).to.eql(26);
    expect(player2Hand.length).to.eql(26);

    done();
  });
});


describe("Draw 1 Card from each Player's Hand", () => {

  it("should remove 1 card from each player's hand and add those 2 cards to the inPlay pile", function (done) {
    let b = new Game();
    b.deal('Walter','Wendy');
    b.draw();
    let p1 = b.players[0];
    let p2 = b.players[1];
    let p1Hand = p1.playerCards;
    let p2Hand = p2.playerCards;

expect(p1Hand.length).to.eql(25);
expect(p2Hand.length).to.eql(25);
expect(b.cardsInPlay.length).to.eql(2);

    console.log("------------ Test 4 -------------");
    console.log("How many cards does " + p1.playerName + " have? ", p1Hand.length);
    console.log("How many cards does " + p2.playerName + " have? ", p2Hand.length);
    console.log("How many cards are in play? ", b.cardsInPlay.length);

    done();

  });
});

describe("Play a round and Declare a Winner", () => {

  it("should draw a card from each player's cards, then compare their values, and push those 2 cards to the round winner", function (done) {
   
   let b = new Game();
   b.deal('Shay','Alyssa');
     let p1 = b.players[0];
     let p2 = b.players[1];
     let p1Hand = p1.playerCards;
     let p2Hand = p2.playerCards;
   
  
   
    

    console.log("------------ Test 5 -------------");
    b.draw();
    b.compare();
    
    expect(p1Hand.length).to.not.eql(26) 
    expect(p2Hand.length).to.not.eql(26);

    console.log(b.cardsInPlay)
    console.log(p1Hand);
    console.log(p2Hand);
    
    console.log("How many cards does " + p1.playerName + " have? ", p1Hand.length);
    console.log("How many cards does " + p2.playerName + " have? ", p2Hand.length);
    console.log("How many cards are in play? ", b.cardsInPlay.length);


    done();

  });
});


/*     lit-html snippet - Begin    Add to the top of your code. Works with html or jsx!    Formats html in a template literal  using the lit-html library     Syntax: html`<div> html or jsx here! variable </div>` */ ///lit-html snippet - Begin let html = (strings, ...values) => {   let str = "";   strings.forEach((string, i) => {     str += string + (values[i] || "");   });   return str; }; //lit-html snippet - End
