/*
There is no place to submit a read me file so here are some notes:
1.in order to get the user input i used npm - npm install prompt-sync
2. most of the functions use the game object with the following initial structre:
    {
        word to guess: word,
        attemptes left: 10,
        asterisk display: ****,
        asterisk to find: 4,
    }
3. the main function starts the game and i tried to put some comments in the functions.
*/
//googled how to get an input in node JS.
const ps = require('prompt-sync');
const prompt = ps();
const  figlet = require('figlet');
const word_bank = ['funny', 'bikini', 'buzzwords','frizzled', 'galaxy', 'hyphen', 'jackpot',
                    'lucky', 'microwave', 'nightclub', 'oxygen', 'rhythm', 'strength',
                    'subway', 'syndrome', 'transplant', 'witchcraft', 'zombie', 'zodiac'];
  
function print_welcome_msg(){
    console.log(figlet.textSync('Hangman game', {
        font: 'Standard',
        width: 80,
        whitespaceBreak: true
    }));
}

function get_random_word(){
    let randomNumber = Math.ceil(Math.random() * word_bank.length-1);
    return word_bank[randomNumber];
}

function check_the_guess(obj, letter){
    //the function check if the letter appears in the word to guess.
    for(let i =0; i < obj.word_to_guess.length; i++ ){
        if (obj.word_to_guess[i] === letter){
            //if the guess is in the word to guess
            return change_asterisk_display(obj, letter)
        }
    }
    //if the letter is not in the word.
    obj.attemptes_left  = --obj.attemptes_left
    return obj;
}

function change_asterisk_display(obj, letter){
    //the function split the asterisks into array, switch to letter and re-join.
    let asterisk_in_array = obj.asterisk_display.split('');
    for(let i =0; i < obj.word_to_guess.length; i++ ){
        if (obj.word_to_guess[i] === letter){
            asterisk_in_array[i] = letter;
            obj.asterisk_to_find -= 1;
        }
    }
    obj.asterisk_display = asterisk_in_array.join('')
    return obj
}
            

function print_status(game_obj){
    console.log(`You have ${game_obj.attemptes_left} guesses \nThe word is \n${game_obj.asterisk_display}`);
}

function check_input(letter){
    const regex = /[^a-zA-Z]/
    if (letter.match(regex) || letter.length != 1){ 
        //input has at least one symbol/digit or the input has more than 1 char.
        return false
    }
    return true
};

function get_user_input(){
    //the function returns array -
        //array[0] = true if the input is valid -> otherwise false.
        // array[1] = the user guess.
    let user_input = prompt('What is your guess? ');
    return [check_input(user_input), user_input.toLowerCase()] 

};

function create_game_definitions(){
    let game_obj = {word_to_guess: get_random_word(), attemptes_left: 10,}
    let asterisk_display ='*'.repeat(game_obj.word_to_guess.length)
    let asterisk_to_find = asterisk_display.length;
    game_obj.asterisk_display = asterisk_display;
    game_obj.asterisk_to_find = asterisk_to_find
    return game_obj;
};

function game_round(game_obj){
    //this function handles the user's input then handles the guess
    // returns the modified object.
    print_status(game_obj);
    let [valid_input, letter_guessed] = get_user_input()
    if (valid_input){
        game_obj = check_the_guess(game_obj, letter_guessed);
    } else {
        console.log('Please enter only one character and make sure it\'s not a digit.')
    }
    return game_obj
}

function game_over(game_obj){
    console.log(`The word was ${game_obj.word_to_guess}.`)
    if (game_obj.asterisk_to_find == 0){
        console.log('You won! you are so smart!');
    } else {
        console.log('You lost :(')
    }
}

function main(){
    //store the word , asterisk display, how more asterisks to find and attemptes left in object.
    let game_obj = create_game_definitions();
    print_welcome_msg();
    console.log(game_obj.word_to_guess, game_obj.asterisk_display);
    while (game_obj.attemptes_left > 0 && game_obj.asterisk_to_find != 0){
        //while there are still attempts remaining AND the user didnt get the whole word
        game_obj = game_round(game_obj);
    }
    game_over(game_obj); 
}

main();
