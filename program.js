(function (){

    let startingIndex = 0;
    let currentIndex;
    function resetGame(){
        currentIndex = startingIndex;
        document.querySelector("button").addEventListener("click", resetGame);
        document.querySelectorAll("#board td").forEach(
            function addClickEventTo(cell){
                cell.innerText = "";
                cell.style.backgroundColor = "white";
                cell.addEventListener("click", playerPlayed);
            }
        )
    }

    resetGame();
    function playerPlayed(evt){
        let possibleMoves = ['X', 'O'];
            if(currentIndex == 0){
                currentIndex = 1;
            }
            else {
                currentIndex = 0;
            }
            evt.target.innerText = possibleMoves[currentIndex];
            evt.target.removeEventListener("click", playerPlayed);
            let winnerCombination = determineWinner();
            if(winnerCombination.length > 0){
                declareWinner(winnerCombination);
                endGame();
            }
    }

    function endGame(){
        document.querySelectorAll("#board td").forEach(
            function addClickEventTo(cell){
                cell.removeEventListener("click", playerPlayed);
            }
        )
    }

    function declareWinner(winnerCombination){
        winnerCombination.forEach(function displayWinningColors(t){
            t.style.backgroundColor = "green";
        })
    }
    function determineWinner(){
        let currentValues = [];
        let rows = document.querySelectorAll("#board tr");
        rows.forEach(function getDataFromEachRow(row){
            console.log(row.querySelectorAll("td").forEach(function getValue(element){
                currentValues.push(element);
            }));
        });
        
        let winningCombinations = [[0,1,2],[3,4,5],[6,7,8],
                                  [0,3,6],[1,4,7],[2,5,8],
                                  [0,4,8],[2,4,6]];

        let result = [];
        winningCombinations.forEach(function checkWinningCombination(combination){
            let findAllX = combination.filter(function checkAllX(c){
                return currentValues[c].innerText == "X";
            });
            if(findAllX.length == 3){
                result = combination;
            }
            let findAllO = combination.filter(function checkAllX(c){
                return currentValues[c].innerText == "O";
            });
            if(findAllO.length == 3){
                result = combination;
            }
        });
        return result.map(function mapCorrespondingCell(x){
            return currentValues[x];
        });
    }
})();