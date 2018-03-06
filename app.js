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

// str is the input string, which user enters
function my_fsa(str) {
    // nextState = 0
    var nextState = INITIAL_STATE; //initailize nextState with initial state
    // make transition table of your name,
    // e.g. when "f" comes in the input string on location 0,
    // move to q1 (or 1) in the following case
    var transitionTable = { // say tt
        //   q1  q2  q3  q4  q5
        "f": [1, -1, -1, -1, -1], // tt["f"][0] = 1 -> nextState
        "a": [-1, 2, -1, 4, -1],  // // tt["a"][nextState] = 2
        "h": [-1, -1, 3, -1, -1],
        "d": [-1, -1, -1, -1, 5] // final state is 5
    }

    // suppose input is fahad
    // loop through array of char.s ["f", "a", "h", "a", "d"]
    for (var j = 0; j < str.length; j++) {
        var character = str[j]; // char at 0 is "f"
        if (transitionTable[character]) { // if "f" is in tt? yes
            nextState = transitionTable[character][nextState]; // nextState=0, so tt["f"][0] = 1 -> nextState
            if (nextState === -1) {  // no nextState is 1
                break;
            }
        } else break;
        // now j will increment and next char is "a" and nextState is 1
        // so tt["a"][1] = 2
        // j will increment again and, char= "h", nextState=2 so tt["h"][2] = 3 and so on
        // if any case if nextState becomes -1 loop will break and input will not pass
    }
    // after loop completes nextState should be equal to final state
    return nextState === FINAL_STATE;
}