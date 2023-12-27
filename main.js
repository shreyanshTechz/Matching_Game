var cardsArray = [
    {
        'name': 'C++',
        'img': 'https://wallpapercave.com/wp/wp4521293.png'
    },
    {
        'name': 'HTML',
        'img': 'https://images.vexels.com/media/users/3/166383/isolated/preview/6024bc5746d7436c727825dc4fc23c22-html-programming-language-icon-by-vexels.png'
    },
    {
        'name': 'jQuery',
        'img': 'https://metapercept.com/img/softwaredevelopment/jquery-vertical.svg',
    },
    {
        'name': 'JS',
        'img': 'https://images.vexels.com/media/users/3/166403/isolated/preview/a5a33bf3004830a2bd581e9fa65de660-javascript-programming-language-icon-by-vexels.png',
    },
    {
        'name': 'Node',
        'img': 'https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png'
    },
    {
        'name': 'Photo Shop',
        'img': 'https://pngimg.com/uploads/photoshop/photoshop_PNG7.png',
    },
    {
        'name': 'PHP',
        'img': 'https://pngimg.com/uploads/php/php_PNG35.png',
    },
    {
        'name': 'Python',
        'img': 'https://files.realpython.com/media/python-logo.8eb72ea6927b.png',
    },
    {
        'name': 'Ruby',
        'img': 'https://icons.veryicon.com/png/o/application/it-software-development-career/ruby-language.png',
    },
    {
        'name': 'Sublime',
        'img': 'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/sublime-text-icon.png',
    },
];

var cardsArray = cardsArray.concat(cardsArray);

cardsArray.sort(function () {
    return 0.5 - Math.random();
})

var game = document.getElementById('board-game');

var grid = document.getElementById('section');

grid.setAttribute('class', 'grid');

game.appendChild(grid);


for (let i = 0; i < cardsArray.length; i++) {

    var card = document.createElement('div');

    card.classList.add('card');

    // card.dataset.name = cardsArray[i].name;

    card.style.backgroundImage = `url(${cardsArray[i].img})`;

    // create front of card
    var front = document.createElement('div');
    front.classList.add('front');
    front.dataset.name = cardsArray[i].name;

    // Append card to grid
    grid.appendChild(card);
    card.appendChild(front);
    

};

var firstGuess = '';
var secondGuess = '';
// Set count to 0
var count = 0;
var previousTarget = null;


// Add match CSS
var match = function () {
    var selected = document.querySelectorAll('.selected');
    // loop through the array like object containing `selected` class
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
};


var resetGuesses = function () {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};



// Add event listener to grid
grid.addEventListener('click', function (event) {
    // Declare variable to target our clicked item
    var clicked = event.target;
    // Do not allow the grid section itself to be selected;
    // only select divs inside the grid

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.classList.contains('match') || clicked.classList.contains('card') || clicked.classList.contains('selected')) {
        return;
    }
    var delay = 1000;
    // We only want to add `selected` class if the current count is less than 2
    if (count < 2) {
        count++;

        if (count === 1) {
            // Assign first guess
            firstGuess = clicked.dataset.name;
            clicked.classList.add('selected');
        } else {
            // Assign second guess
            secondGuess = clicked.dataset.name;
            clicked.classList.add('selected');
        }
    
        // If both guesses are not empty
        if (firstGuess !== '' && secondGuess !== '') {
            // And the firstGuess matches secondGuess
            if (firstGuess === secondGuess) {
                // Run the match function
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
                var points = Number(document.getElementById('points').innerHTML);
                document.getElementById('points').innerHTML = points+1; 
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
});