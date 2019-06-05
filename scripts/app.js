/***************************************************************
 * 
 * HTML/JavaScript/CSS
 *
 *
 * @author: Avinash
 ***************************************************************/
'use strict';
var diamondPlaces = [];
var diamondIndex = [];
var lastClickedID,diamondFound=0,maxScore=56;
(function () {

    function generateRandomNumbers() {
        // generating random 8 numbers between 1 to 64
        for (let index = 0; diamondPlaces.length < 8; index++) {
            let position = Math.floor(Math.random() * 64)+1;
            //Preventing Duplicate Entry
            if (!diamondPlaces.includes(`box-${position}`)) {
                diamondPlaces.push(`box-${position}`);
                diamondIndex.push(position);
            }
        }
        console.log(diamondPlaces.sort());
        console.log(diamondIndex.sort());
    }
    function init() {
        generateRandomNumbers();
    }
    init();
})();

var element = document.getElementsByClassName("game-container");
element[0].addEventListener('click', function (e) {
    e = e || window.event;
    var id = e.target.id

    if(isDuplicateClick(id) || diamondFound == 8){
        return false;
    }
    
    if (lastClickedID) {
        let lastClickedElement = document.getElementById(lastClickedID);
        lastClickedElement.classList.remove("arrow-left");
        lastClickedElement.classList.remove("arrow-right");
        lastClickedElement.classList.remove("arrow-up");
        lastClickedElement.classList.remove("arrow-down");
        lastClickedElement.classList.add("empty");
    }
    var target = document.getElementById(id);
    if (diamondPlaces.includes(id)) {
        var index = diamondIndex.indexOf(parseInt(id.split("-")[1]));
        if (index > -1) {
            diamondIndex.splice(index, 1);
        }
        target.classList.remove('question')
        target.classList.add("diamond");
        diamondFound++;

        if(diamondFound === 8){
            document.getElementById("current-score").innerHTML = "Game Over ~ Final Score is : " + maxScore;
        }
    } else {
        target.classList.remove('question');
        maxScore--;
        let idNum = parseInt(id.split("-")[1]);
        if (diamondIndex.includes(idNum - 1) && (idNum % 8) != 1) {
            target.classList.add("arrow-left");
        }
        else if (diamondIndex.includes(idNum + 1) && idNum % 8 != 0) {
            target.classList.add("arrow-right");
        }
        else if (diamondIndex.includes(idNum - 8)) {
            target.classList.add("arrow-up");
        }
        else if (diamondIndex.includes(idNum + 8)) {
            target.classList.add("arrow-down");
        }
        else {            
            target.classList.add("empty");
        }
        lastClickedID = id;
    }

}, false);

var clickedItemS= []
function isDuplicateClick(id){
    if(!clickedItemS.includes(id)){
        clickedItemS.push(id);
        return false;
    }else{
        return true;
    }
}

window.onbeforeunload = function() {
    return "Want to start a New Game ";
}
