var cell = $("td")
var t = 1

var playerOne = prompt("Enter name of Player One, you will be red: ", "Player One")
var playerTwo = prompt("Enter name of Player Two, you will be blue: ", "Player Two")

$("#turnTxt").text(playerOne + " make your move!")

//creating 2-D array
var fill = new Array(7)
for (var i = 0; i < fill.length; i++) {
    fill[i] = new Array(7)
}

//Filling the array with zeroes
for (var i = 0; i < fill.length; i++) {
    for (var j = 0; j < fill[0].length; j++) {
        fill[i][j] = 0
    }
}

//Fill the array with logic
var lastFilled = [0,0,0,0,0,0,0]
function lgc(){
    var lastPos = fill.length - 1

    //condition to prevent overflow error
    if(lastFilled[this.cellIndex] == fill.length){
        $(this).off("click")
    }
    
    else{
        if(fill[lastPos][this.cellIndex] != 0){
            lastPos = lastPos - lastFilled[this.cellIndex]
        }

        // fill[lastPos][this.cellIndex] = 1
        lastFilled[this.cellIndex] += 1
        // colors(lastPos, this.cellIndex)
        var pos = 7*lastPos + this.cellIndex
        if(t%2 == 0){
            $("#turnTxt").text(playerOne + " make your move!")
            cell.eq(pos).toggleClass("turnBlue")
            fill[lastPos][this.cellIndex] = "B"
        }
        else{
            $("#turnTxt").text(playerTwo + " make your move!")
            cell.eq(pos).toggleClass("turnRed")
            fill[lastPos][this.cellIndex] = "R"
        }
        horizontalWinCheck(fill)
        verticalWinCheck(fill)
        t += 1
    }
}

//Coloring the cells
// function colors(m,n, ){
//     var pos = 7*m + n
//     if(t%2 == 0){
//         $("#turnTxt").text(playerOne + " make your move!")
//         cell.eq(pos).toggleClass("turnBlue")
//     }
//     else{
//         $("#turnTxt").text(playerTwo + " make your move!")
//         cell.eq(pos).toggleClass("turnRed")

//     }
//     t +=1
// }

//Click event
for (var i = 0; i < 7; i++) {
    cell.eq(i).on("click", lgc)
}

//Winning logic
function horizontalWinCheck(fill){
    for (var i = fill.length-1; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if(fill[i][j] == fill[i][j+1] && fill[i][j] == fill[i][j+2] && fill[i][j] == fill[i][j+3] && fill[i][j] != 0){
                reportWin()
            }
        }
        
    }
}

function verticalWinCheck(fill){
    for (var j = 0; j < fill[0].length; j++) {
        for (var i = fill.length-1; i>=3; i--) {
            if(fill[i][j] == fill[i-1][j] && fill[i][j] == fill[i-2][j] && fill[i][j] == fill[i-3][j] && fill[i][j] != 0){
                reportWin()
            }
            
        }
    }

}

function reportWin(){
    if(t%2==1){
        alert(playerOne + " You Have Won!")
    }
    else{
        alert(playerTwo + " You Have Won!")
    }
    $("#turnTxt").text("Game Over")
    for (var i = 0; i < 7; i++) {
        cell.eq(i).off("click")
    }
    console.log("Thanks for playing!")

}