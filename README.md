Tic Tac Plaid: A simple Tic Tac Toe game written by Daniel Sweetser

Playable here: https://dsweetser.github.io/tic-tac-toe/

Coded with Javascript, HTML, and CSS/SASS.

This project with the bare bones of the game logic layed out in javascript.  My
plan was to start working on the game engine, then put the engine into a basic
website where you could click on individual squares to make moves, then to
connect the website to an outside server that would store games, and lastly to
add some plaid style to the website. The first function I wrote for this was
triggerEndGame, but when I couldn't get the draw functionality to work I
switched to a turnCounter to keep track of whose turn it was.  The next
functionality went pretty quickly - building the website around the logic,
attaching JQuery click handlers to the square.  Preventing players from moving
when the game had finished was problematic until I hit upon the idea of just
removing the board entirely (which was already part of the createBoard
functionality) and replacing with a "player/nobody wins" div.

In the project I struggled the most with differing data types.  Learning how
to feed the correct object into an AJAX request took a lot of reading, trial,
and error to grok.  Once I had that under my belt things started flowing
smoothly again until I started creating the functionality to resume a game from
the server.  I wound up being very confused by the fact that one input was a
string and the other was a number - in my head they were the same, and it took
a lot of time to realize the error.  Finally, with everything else done, I
made a series of plaids from https://www.scotweb.co.uk/tartandesign/design/ and
applied them to the various parts of the website.

Unsolved Problems: currently there is a bug in which a user can hit the "Login"
button and try to receive games even if they're not logged in.  I originally had
an if (store.user) loop in place that would prevent that code from applying if
the user had not successfully logged in, but it required the user to hit the
login button twice to function.

my original wireframes can be found here: http://i.imgur.com/QAzeDel.jpg - the
final project diverged from them significantly due to time restraints/me getting
interesting in implementing javascript features than in styling the website.

My original user stories are:
I will be able to log in and see my user history
I will be able to click on boxes and change their values
I will be able to play against friends
I will experience the thrill of the draw

Unfortunately I did not have the time to implement multiplayer across different
devices, but I would be able to do so fairly easily by retrieving the game state
from the server after each player makes a move.

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
