
const cards = ["A","B","C","D","E","F","G","a","b","c","d","e","f","g"]
// "<img id='A-pic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/American_Alligator.jpg/800px-American_Alligator.jpg' width=150 height=150 />",
// "<img id='B-pic' src='https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg' width=150 height=150 />",
// "<img id='C-pic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/800px-Giraffe_Mikumi_National_Park.jpg' width=150 height=150 />",
// "<img id='D-pic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bucephala-albeola-010.jpg/330px-Bucephala-albeola-010.jpg' width=150 height=150 />",
// "<img id='E-pic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/African_elephant_warning_raised_trunk.jpg/1280px-African_elephant_warning_raised_trunk.jpg' width=150 height=150 />",
// "<img id='F-pic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Georgia_Aquarium_-_Giant_Grouper_edit.jpg/800px-Georgia_Aquarium_-_Giant_Grouper_edit.jpg' width=150 height=150 />",
// "<img id='G-pic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/800px-Giraffe_Mikumi_National_Park.jpg' width=150 height=150 />",
// ]
let ShuflledCards=shuffle()
let cardDiv


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

setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, "3000")

function checkFit(cardSelected){
    debugger
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
    } 
    //אם שונה
    else{
        
        //החזר את הקלפים למצב ראשוני        
        Array.from(cardSelected).forEach(element => {
            element.onmouseleave = function(){
                this.className = "card bg-success"
            } 
            element.onmouseover = function(){
                this.className = "card hoverC"
            }
        })          
    
    } 
    Array.from(cardSelected).forEach(element => {
        element.className = "card bg-success"
    })  

}


//שולחן משחק
let gameTbl = document.getElementById("gameTbl")

//:שמים את הקלפים על השולחן
for(let j=0;j<ShuflledCards.length;j++){

    cardDiv = document.createElement("div")
    cardDiv.className="card bg-success"
    cardDiv.onmouseover = function(){
        this.className = "card hoverC"
    }
    cardDiv.onmouseleave = function(){
        this.className = "card bg-success"
    }

    cardDiv.onclick = function(){       
        //debugger
        this.getElementsByTagName('span')[0].style.visibility = "visible"  
        this.className = "card selectedC"          
        this.onmouseleave = ""
        this.onmouseover = "" 

        let cardSelected = this.parentNode.getElementsByClassName("selectedC")       
        let isFirstSelected = cardSelected.length > 1 ? false : true     

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