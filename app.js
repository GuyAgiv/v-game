

class Game{
    constructor(){
        this.numArr = Array.from(new Array(50).keys());
        this.numArr.splice(0,1);
        this.numArr.push(50);
        this.currentExpectedNumber = 1;
        this.limitNumber = 50;
        this.amountOfFound = 0;
        this.interval = null;
        this.chosenDifficult = "Normal";
        this.desiredNumber = 0;
        this.difficultsElements = document.querySelectorAll(".difficult-button");
    }
    
    

    initializeBoard = () => {

        let root = document.documentElement;

        switch(this.chosenDifficult){
            case "Normal":{
                this.desiredNumber = 7;
                break;
            }
            case "Warrior":{
                this.desiredNumber = 9;
                break;
            }
            case "Noob":{
                this.desiredNumber = 5;
                break;
            }
        }

        root.style.setProperty('--gridRows', this.desiredNumber);
        root.style.setProperty('--gridColumns', this.desiredNumber);

        let gameContainer = document.querySelector(".board");

        for(let i = 0; i < Math.pow(this.desiredNumber,2) - 25;i++){
            let newChild = document.createElement("div");
            newChild.classList.add("grid-item");
            gameContainer.appendChild(newChild);
        }



        this.numArr = Array.from(new Array(Math.pow(this.desiredNumber,2) * 2).keys());
        this.numArr.splice(0,1);
        this.numArr.push(Math.pow(this.desiredNumber,2) * 2);
        this.limitNumber = Math.pow(this.desiredNumber,2) * 2;


        const gridCells = document.getElementsByClassName("grid-item");
        
        let arr = [];

        const randomArr = () => {
            let numArr = Array.from(new Array(Math.pow(this.desiredNumber,2)).keys());
            let RandArr = [];
            numArr.splice(0,1);
            numArr.push(Math.pow(this.desiredNumber,2));
            
            for(let i = 0; i < numArr.length;i++){
                var resultIdx = Math.floor(Math.random() * (numArr.length - i))
                
                RandArr.push(numArr[resultIdx]);
        
                // SWAP CURRENT 1 WITH THE LAST 1
                var placeHolder = numArr[resultIdx];
                numArr[resultIdx] =  numArr[numArr.length - i - 1];
                numArr[numArr.length - i - 1] = placeHolder;
            }
        
        
            return RandArr;
        }
        
        arr = randomArr();
        
        for(var i = 0; i < gridCells.length;i++)
        {
            const cell  = gridCells[i];
            gridCells[i].innerHTML = arr[i];
            gridCells[i].addEventListener("click",(event) => {
                game.onCellClicked(event);
            });
        }

        var ans = document.querySelector(".difficult-container");
        ans.classList.remove("difficult-container");
        ans.classList.add("disable-element");

    }

    onCellClicked = (event) => {
        let num = Number.parseInt(event.target.innerHTML);
        if(this.amountOfFound !== this.limitNumber)
        {
            if(num === this.currentExpectedNumber){
                let idx = game.numArr.findIndex(element => element === num)
                if(idx !== -1){
                    this.amountOfFound++;
    
                    if(Math.pow(this.desiredNumber,2) + this.amountOfFound <= this.limitNumber){

                        event.target.classList.add("cell-disappear");
                        setTimeout(() => {
                            event.target.classList.remove("cell-disappear");
                            event.target.classList.add("cell-appearing"); 
                            event.target.innerHTML = Math.pow(this.desiredNumber,2) + this.amountOfFound;
                        },250)
                    }
                    else{
                        event.target.classList.remove("cell-appearing");
                        event.target.classList.add("cell-disappear"); 
                        this.numArr.splice(0,1);
                    }
    
                    this.currentExpectedNumber++;
                }
                else{
                    console.log("NOT FOUND");
                }
            }
            else{
                console.log("the hell u doing?")
            }
        }
        if(this.amountOfFound === this.limitNumber){
            clearInterval(this.interval);
            alert("YOU WON MAN");
        }
    }

    begin = () => {
        this.initializeBoard();
        var beginTime = 0;
        var secs = 0;
        this.interval = setInterval((beginTime) => {
        var clock = document.querySelector(".timer");
        secs++;
        var RightMinute = (Math.floor(secs / 60) % 60) % 10;
        var LeftMinute = Math.floor((Math.floor(secs / 60) % 60)/10);
         clock.innerHTML = LeftMinute + "" +  RightMinute + ":" + Math.floor((secs % 60)/10) + (secs%60)%10;
        },1000); 
     }

    updateDifficult = (event) => {
        this.chosenDifficult = event.target.innerHTML;
        for(let i = 0; i < this.difficultsElements.length;++i){
            (this.difficultsElements)[i].classList.remove("selected");
        }

        event.target.classList.add("selected");
     }     
}


function fadeDifficult(){
    document.querySelector(".difficult-container").classList.add("fadein");
}

const game = new Game();
