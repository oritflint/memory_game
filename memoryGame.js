
let cards = []
let players = [{
    name: "PLAYER 1",
    scores: 0,
},
{
    name: "PLAYER 2",
    scores: 0,
}]
const CONST_BONUS = 10

//--------------------------------------------------------------------------
let gameTbl = document.getElementById("gameTbl")
let divPlayers = document.getElementById("players")
let pScoreSpan = [...document.querySelectorAll(".pscore")]
let pNameSpan = [...document.querySelectorAll(".pname")]
let btnNewGame = document.getElementById("btnNewGame")
let btnAddPNames = document.getElementById("btnAddPNames")
let btnChooseLevel = document.getElementById("btnChooseLevel")
let PopupNamesDiv = document.getElementById("divAddPlayers")
let PopupChooseLevel = document.getElementById("divChooseLevel")
let PopupEndOfGame = document.getElementById("divEndOfGame")
let btnClose = document.getElementById("btnClose")

let ShuflledCards
let cardDiv
let gameLevel
let currPlayer
let tempArr
let isEndOfGame = false
let cardClass = "card"
//--------------------------------------------------------------------------

//ערבוב הקלפים
function shuffle(){
    let SrcCards = cards.slice()
    let DestCards = []
    
    let i = 0
    let RandIndex
    let len = cards.length

    for(let j=0;j<len;j++){

        RandIndex = Math.round(Math.random() * (SrcCards.length-1))
        DestCards.push(SrcCards[RandIndex])
        SrcCards.splice(RandIndex,1)

    }
    return(DestCards)
}

//בדוק התאמה
function checkFit(cardSelected){
    let FirstLetter = cardSelected[0].getElementsByTagName("span")[0].innerHTML.toLowerCase()
    let SecondLetter = cardSelected[1].getElementsByTagName("span")[0].innerHTML.toLowerCase()
    
    Array.from(cardSelected).forEach(element => { 
        element.getElementsByTagName("span")[0].style.visibility = "hidden"
    }) 

    //אם זהה
    if (FirstLetter == SecondLetter){
        
        //זוג תקין! הסתר את הזוג
        Array.from(cardSelected).forEach(element => {
            element.style.visibility = "hidden"
        }) 
        //הוסף ניקוד
        players[currPlayer].scores += 10
        pScoreSpan[currPlayer].innerHTML = players[currPlayer].scores

        //ובדוק אם משחק הסתיים
        isEndOfGame = true
        tempArr = document.getElementsByClassName(cardClass);
        [].forEach.call(tempArr, function(e) {
            if(e.style.visibility != "hidden") isEndOfGame=false
        });
    
    } 
    //אם שונה
    else{
        
        //החזר את הקלפים למצב ראשוני
        Array.from(cardSelected).forEach(element => {
            element.onmouseleave = function(){
                this.className = cardClass
            } 

            element.onmouseover = function(){
                this.className = cardClass + " hoverC"
            }
        })

        //והעבר תור לשחקן הבא
        divPlayers.children[currPlayer].className = "player"
        currPlayer==0? currPlayer=1 : currPlayer=0
        divPlayers.children[currPlayer].classList.add("currPlayer")

    } 
    Array.from(cardSelected).forEach(element => {
        element.className = cardClass
    })  
     
     if(isEndOfGame){
         PopupEndOfGame.style.display="block"
         let maxScores =  Math.max(...players.map(o => o.scores))
         let winner =  players.filter(o => o.scores===maxScores)
         if(winner.length>1){
            document.getElementById("winnerName").innerHTML = "TEKO"
            document.getElementById("winnerScores").innerHTML = "each player got " + winner[0].scores + " scores!"
         }
         else{
            document.getElementById("winnerScores").innerHTML = "Got " +  winner[0].scores + " scores!"
            document.getElementById("winnerName").innerHTML = winner[0].name
         }
         btnClose.onclick= function(){
            PopupEndOfGame.style.display="none"
           }
   }

    tempArr = document.getElementsByClassName(cardClass);
    [].forEach.call(tempArr, function(e) {
        e.style.pointerEvents="auto"
    });

}

//קבע שמות לשחקנים
function initPlayers(){
    currPlayer = 0
    divPlayers.children[currPlayer].classList.add("currPlayer")

    pScoreSpan.map((elem,i)=>{
        elem.innerHTML=players[i].scores
    })

    pNameSpan.map((elem,i)=>{
        elem.innerHTML=players[i].name
    })    
}

//קבע רמת משחק
function initCards(gameLevel){
    let cardCpls;
    switch(gameLevel){
        case 'high': 
            cardCpls = 13
            cardClass = "cardHigh"
        break;

        case 'medium': 
            cardCpls = 9
            cardClass = "cardMedium"
        break;

        default: cardCpls =4
    }
    cards = []
    for(let i=0;i<cardCpls;i++){
        cards.push(String.fromCharCode(i+65))
    }

    for(let i=0;i<cardCpls;i++){
        cards.push(String.fromCharCode(i+97))
    }
    ShuflledCards=shuffle()
    InitGame()
    tempArr = document.getElementsByClassName(cardClass);
    [].forEach.call(tempArr, function(e) {
        e.style.pointerEvents="auto"
    });

}

//התחל משחק
function InitGame(){
    gameTbl.innerHTML=""
    //:שמים את הקלפים על השולחן
    for(let j=0;j<ShuflledCards.length;j++){

        cardDiv = document.createElement("div")
        cardDiv.className=cardClass
        cardDiv.onmouseover = function(){
            this.className = cardClass+" hoverC"
        }
        cardDiv.onmouseleave = function(){
            this.className = cardClass
        }

        cardDiv.onclick = function(){       
            this.getElementsByTagName('span')[0].style.visibility = "visible"  
            this.className = cardClass+" selectedC"          
            this.onmouseleave = ""
            this.onmouseover = "" 

            let cardSelected = this.parentNode.getElementsByClassName("selectedC")       
            let isFirstSelected = cardSelected.length > 1 ? false : true     

            if(!isFirstSelected){
                tempArr= document.getElementsByClassName(cardClass);
                [].forEach.call(tempArr, function(e) {
                    e.style.pointerEvents="none"
                });
            }
            setTimeout(function() {
                //כשנבחר כקלף שני
                if(!isFirstSelected){

                    //בדוק את הקלף הקודם
                    checkFit(cardSelected)
                }
            }, 1000);
            
            
        }

        //כתוב על הקלף
        span = document.createElement("span")   
        span.innerHTML = ShuflledCards[j]    
        span.style.visibility="hidden"

        //שים על השולחן
        cardDiv.appendChild(span)
        gameTbl.appendChild(cardDiv)
}
    btnNewGame.onclick=function(){
        location.reload();
    }

    btnAddPNames.onclick=function(){
        tempArr = document.getElementsByClassName(cardClass);
        [].forEach.call(tempArr, function(e) {
            e.style.pointerEvents="none"
        });

        PopupNamesDiv.style.display="block"
        PopupChooseLevel.style.display="none"

        let txtFrstP = document.getElementById("player1")
        let txtSecP = document.getElementById("player2")
        let btnAppNames = document.getElementById("btnAppNames")

        btnAppNames.onclick=function(){
            players[0].name= txtFrstP.value
            players[1].name= txtSecP.value
            pNameSpan.map((elem,i)=>{
                elem.innerHTML=players[i].name
            })
            PopupNamesDiv.style.display="none"

            tempArr = document.getElementsByClassName(cardClass);
            [].forEach.call(tempArr, function(e) {
                e.style.pointerEvents="auto"
            });
        }
    }

    btnChooseLevel.onclick=function(){
        tempArr = document.getElementsByClassName(cardClass);
        [].forEach.call(tempArr, function(e) {
            e.style.pointerEvents="none"
        });

        PopupChooseLevel.style.display="block"
        PopupNamesDiv.style.display="none"

        let btnHigh = document.getElementById("btnHigh")
        btnHigh.onclick=function(){
            initCards("high")
            
            PopupChooseLevel.style.display="none"
        }
        let btnMedium = document.getElementById("btnMedium")
        btnMedium.onclick=function(){
            initCards("medium")
            PopupChooseLevel.style.display="none"
        }        
        let btnLow = document.getElementById("btnLow")
        btnLow.onclick=function(){
            initCards("low")
            PopupChooseLevel.style.display="none"
        }
    }
}

//--------------------------------------------------------------------------


initPlayers()
initCards("low")
