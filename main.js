/* What this app should do
1. Display a tic tac toe board
    - in HTML create a board layout
    2. When the user clicks on a space, add their mark to it
    - display marks depending on value
        - update entire board on click
    - use a click event
    - allow changes only if it's empty
    - update the value
    - remember what the space now is
3. Switch to the other player
    - use different values for players
    - switch automatically
4. Evaluate for winning conditions
    - check for game ending conditions every click
5. Finish the game with a message
    - add text to hidden element and show it
6. Have a reset button
    - clear all state & hide message
*/



const game = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],

    finished: false
}