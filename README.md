Student Information:
Yash Jain - 300245571
Oliver Byl - 300168571

This is the implementation of the Classic Wordle Game using Server Side Scripting completed for CSI 3140 - Assignment 3.

Please note the directory "/docs/design_system" holds the image assets. Other assets such as fonts are imported directly.

The game can be played by downloading the repo and hosting the server locally.

The answer for the word can be seen in the console for accessibility.

Note: If you have a score of 7 this indicates you lost the game as the number of guesses allowed in Wordle are MAX 6.

States Of Game: * Notice how the leaderboard is changing! *
Initial State: [Initial State Of Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/gameStateInitial.png?raw=true)

Ending State (User Won - Run 1): [User Won Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/runOne.png?raw=true)

Ending State (User Won - Run 2): [User Won Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/runTwo.png?raw=true)

Ending State (User Lost - Run 3): [User Lost Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/runThree.png?raw=true)

Ending State (User Lost - Run 4): [User Lost Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/runFour.png?raw=true)

Ending State (User Won - Run 5): [User Won Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/runFive.png?raw=true)

Ending State (User Won - Run 6): [User Won Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/runSix.png?raw=true)

Ending State

Running The Game:
1. CD to your local directory where the game is downloaded
2. Run "php -S localhost:8000" this is port 8000
3. Visit "localhost:8000" this is port 8000
4. Enjoy! The answer and session scores can be seen in the console.

IMPORTANT NOTE:
- The PHP session stores the results for your scores
- To clear these scores and reset the leaderboard this can be done by killing the session
- Visit wordle.php and check lines 36-43 (also see below)...

/**
 * Refesh Session:
 * - Uncomment the line below to kill the PHP session
 * - Refresh the webpage
 * - Comment the line again
 * - Refresh the webpage and play
 */
// session_destroy();