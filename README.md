Student Information:
Yash Jain - 300245571
Oliver Byl - 300168571

This is the implementation of the Classic Wordle Game using Server Side Scripting completed for CSI 3140 - Assignment 3.

Please note the directory "/docs/design_system" holds the image assets. Other assets such as fonts are imported directly.

The game can be played at https://yashjain04.github.io/Server-Side-Wordle/

The answer for the word can be seen in the console for accessibility.

States Of Game: * Notice how the leaderboard is changing! *
Initial State: [Initial State Of Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/gameStateInitial.png?raw=true)
Ending State V1 (User Won): [User Won Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/gameStateUserWon.png?raw=true)
Ending State V2 (User Lost): [User Lost Game Image](https://github.com/YashJain04/Server-Side-Wordle/blob/main/docs/design_system/gameStateUserLost.png?raw=true)

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