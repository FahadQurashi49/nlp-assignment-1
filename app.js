const INITIAL_STATE = 0;
const FINAL_STATE = 5;

$('#submit').click(function () {
    var inputStr = $('#sentence').val();
    if (inputStr) {
        var tokens = inputStr.split(" ");
        var containsName = false;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (my_fsa(token)) {
                containsName = true;
            }
        }
        if (containsName) {
            $('#status').html("contains your name!");
            console.log("contains your name!");
        } else {
            $('#status').html("does not contains your name!");
            console.log("does not contains your name!")
        }
    }
});

function my_fsa(str) {
    var nextState = INITIAL_STATE; //initailize nextState with initial state
    var transitionTable = {
        "f": [1, -1, -1, -1, -1],
        "a": [-1, 2, -1, 4, -1],
        "h": [-1, -1, 3, -1, -1],
        "d": [-1, -1, -1, -1, 5]
    }

    for (var j = 0; j < str.length; j++) {
        var character = str[j];
        if (transitionTable[character]) {
            nextState = transitionTable[character][nextState];
            if (nextState === -1) {
                break;
            }
        } else break;
    }
    return nextState === FINAL_STATE;
}