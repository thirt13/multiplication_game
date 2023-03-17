
let multiplicationTable = []
let coordinates = [] //coordinates array [[x,y], [x,y], ...] 
let arrayEaten = []
let scorePlay = 0

//creates an array of multiplier numbers
let getArrayNumber = (xs) => {
    let arr = []
    let max = xs * 10
    for (xx = xs; xx <= max; xx++) {
        xx % xs == 0 ? arr.push(xx) : null
    }
    return arr
}

//creates an array of random numbers
let getArraySecondNumber = (xs) => { 
    let xNumber = []
    let max = 6
    document.querySelector("#radio2").checked == true ? limit = max : limit = 0 
  
    while (xNumber.length < limit) {
        xNumber.push(Math.floor(Math.random() * xs * 10) + 1)
        xNumber[xNumber.length-1] % xs == 0 ? xNumber.pop() : null
    }
    return xNumber
}

//start game
let startGame = () =>{
    let allInOne = myNumbers.concat(secondNumber)
    coordinates = getPositions(allInOne.length)
    myGameArea.start()

    multiplicationTable = []
    for (i = 0; i < coordinates.length; i++) {
        multiplicationTable[i] = new multiNumber(allInOne[i], coordinates[i][0], coordinates[i][1])
    }
    
    head = new snackeHead(50, 50, "./img/headNoEat.png", 0, 0) 
}

//created array of coordinates
let getPositions = (len) => {
    let minX = 40
    let maxX = 600
    let minY = 40
    let maxY = 450
    let x, y, ok = 0
    let arrayCoordinates = []

    x = Math.floor(Math.random() * (maxX - minX + 1)) + minX
    y = Math.floor(Math.random() * (maxY - minY + 1)) + minY
    arrayCoordinates.push([x, y])
    
    while (arrayCoordinates.length < len) {
        x = Math.floor(Math.random() * (maxX - minX + 1)) + minX
        y = Math.floor(Math.random() * (maxY - minY + 1)) + minY
    
        for (index = 0; index < arrayCoordinates.length; index++) {
            if ((x > arrayCoordinates[index][0] - 30) && (arrayCoordinates[index][0] + 30 > x))
            {
                if ((y > arrayCoordinates[index][1] - 35) && (arrayCoordinates[index][1] + 35 > y))
                {
                    ok = 1
                }
            }
        }
        ok == 0 ? arrayCoordinates.push([x, y]) : null
        ok = 0
    }
    return arrayCoordinates
}

let myGameArea = {
    canvas: document.querySelector("#myMathCanvas"),
    myscore : document.querySelector("#score span"),
    myeatnumber : document.querySelector("#eating span"),
    start : function() {
        this.myeatnumber.textContent = ""
        myGameArea.myscore.textContent = 0
        this.canvas.width = 650
        this.canvas.height = 520
        this.context = this.canvas.getContext("2d")
        this.interval = setInterval(updateGameArea, 50)
        //control with the Arrow keys
        window.addEventListener("keydown", (e) => {

            ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1 ? e.preventDefault() : null
            myGameArea.key = e.key

            if (e.key == "ArrowLeft") 
            {
                head.image.src = "./img/headEatLeft.png"
            } else if (e.key == "ArrowUp") 
            {
                head.image.src = "./img/headEatUp.png"
            } else if (e.key == "ArrowDown") 
            {
                head.image.src = "./img/headEatDown.png"
            } else
            {
                head.image.src = "./img/headEatRight.png"
            } 
        })
        window.addEventListener("keyup", (e) => {
            myGameArea.key = false
            if (e.key == "ArrowLeft")
            {
                head.image.src = "./img/headNoEatLeft.png"
            } else if (e.key == "ArrowUp")
            {
                head.image.src = "./img/headNoEatUp.png"
            } else if (e.key == "ArrowDown")
            {
                head.image.src = "./img/headNoEatDown.png"
            } else
            {
                head.image.src = "./img/headNoEat.png"
            }
        })

        //control with buttons
        document.querySelector("#left").addEventListener("mousedown", () => {
            myGameArea.key = "ArrowLeft"
            head.image.src = "./img/headEatLeft.png"
        })
        document.querySelector("#left").addEventListener("mouseup", () => {
            myGameArea.key = false
            head.image.src = "./img/headNoEatLeft.png"
        })
        document.querySelector("#right").addEventListener("mousedown", () => {
            myGameArea.key = "ArrowRight"
            head.image.src = "./img/headEatRight.png"
        })
        document.querySelector("#right").addEventListener("mouseup", () => {
            myGameArea.key = false
            head.image.src = "./img/headNoEat.png"
        })
        document.querySelector("#up").addEventListener("mousedown", () => {
            myGameArea.key = "ArrowUp"
            head.image.src = "./img/headEatUp.png"
        })
        document.querySelector("#up").addEventListener("mouseup", () => {
            myGameArea.key = false
            head.image.src = "./img/headNoEatUp.png"
        })
        document.querySelector("#down").addEventListener("mousedown", () => {
            myGameArea.key = "ArrowDown"
            head.image.src = "./img/headEatDown.png"
        })
        document.querySelector("#down").addEventListener("mouseup", () => {
            myGameArea.key = false
            head.image.src = "./img/headNoEatDown.png"
        })

        //for touchscreen
        document.querySelector("#left").addEventListener("touchstart", () => {
            myGameArea.key = "ArrowLeft"
            head.image.src = "./img/headEatLeft.png"
        })
        document.querySelector("#left").addEventListener("touchcancel", () => {
            myGameArea.key = false
            head.image.src = "./img/headNoEatLeft.png"
        })
        document.querySelector("#right").addEventListener("touchstart", () => {
            myGameArea.key = "ArrowRight"
            head.image.src = "./img/headEatRight.png"
        })
        document.querySelector("#right").addEventListener("touchcancel", () => {
            myGameArea.key = false
            head.image.src = "./img/headNoEat.png"
        })
        document.querySelector("#up").addEventListener("touchstart", () => {
            myGameArea.key = "ArrowUp"
            head.image.src = "./img/headEatUp.png"
        })
        document.querySelector("#up").addEventListener("touchcancel", () => {
            myGameArea.key = false
            head.image.src = "./img/headNoEatUp.png"
        })
        document.querySelector("#down").addEventListener("touchstart", () => {
            myGameArea.key = "ArrowDown"
            head.image.src = "./img/headEatDown.png"
        })
        document.querySelector("#down").addEventListener("touchcancel", () => {
            myGameArea.key = false
            head.image.src = "./img/headNoEatDown.png"
        })
    },
    scoreR : function() {
        let stra = ""
        myGameArea.myscore.textContent = scorePlay 
        for (let i = 0; i < arrayEaten.length; i++) {
            arrayEaten[i].color == "green" ? stra += "<span>" + arrayEaten[i].name + "</span>, " : stra += arrayEaten[i].name + ", "
        }
        this.myeatnumber.innerHTML = stra
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop : function() {
        clearInterval(this.interval)
        head.image.src = "./img/headNoEat.png"
    }
}

function snackeHead( width, height, img, x, y)  {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.speedX = 2
    this.speedY = 2
    //this.angle = 0
    this.image = new Image()
    this.image.src = img
    this.update = function() {
        ctx = myGameArea.context
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)  
    }
    this.newPos = function() {
        this.x += this.speedX 
        this.y -= this.speedY 
    }
    this.crashWith = function(otherobj) {
        let myleft = this.x
        let myright = this.x + (this.width)
        let mytop = this.y
        let mybottom = this.y + (this.height)
        let otherleft = otherobj.x + 2
        let otherright = otherobj.x + (otherobj.width) -4
        let othertop = otherobj.y + 2
        let otherbottom = otherobj.y + (otherobj.height) -4
        let crash = true
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) 
        {
          crash = false
        }
        return crash
    }
}

function multiNumber(name, x, y)  {
    this.width = 39
    this.height = 44
    this.x = x
    this.y = y
    this.color = "black"
    this.name = name
    this.image = new Image()
    this.image.src = "./img/number.png"
    this.update = function() {
        ctx = myGameArea.context
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.font = "bold 20px Arial"
        ctx.fillStyle = "#002232"
        ctx.textAlign = "center"
        ctx.fillText(this.name, x + 19, y + 30)
    }
}

function updateGameArea() {
    //test crash
    for (i = 0; i < multiplicationTable.length; i++) {
        if (head.crashWith(multiplicationTable[i])) 
        {
            // game over
            if (secondNumber.includes(multiplicationTable[i].name)) 
            {
                myGameArea.stop() 
                multiplicationTable[i].width = 60
                multiplicationTable[i].height = 60
            } else
            {
                arrayEaten.push(multiplicationTable[i])
                if (arrayEaten[arrayEaten.length - 1].name == myNumbers[arrayEaten.length - 1]) 
                {
                    scorePlay += 10
                    arrayEaten[arrayEaten.length-1].color = "green"
                }
                multiplicationTable.splice(i, 1) 
                myGameArea.scoreR()
            }
            // win
            if (arrayEaten.length == myNumbers.length)
            {
                document.querySelector("#eating2").style.display = "block"
                document.querySelector("#eating2 span").textContent = myNumbers.join(", ")
                myGameArea.stop()
              
            }      
        }
    }

    myGameArea.clear()
    head.speedX = 0
    head.speedY = 0
    
    if (myGameArea.key && myGameArea.key == "ArrowLeft") { head.speedX = -7 }
    if (myGameArea.key && myGameArea.key == "ArrowRight") { head.speedX = 7 }
    if (myGameArea.key && myGameArea.key == "ArrowUp") { head.speedY = 7 }
    if (myGameArea.key && myGameArea.key == "ArrowDown") { head.speedY = -7 }
    
    head.newPos()
    for (i = 0; i < multiplicationTable.length; i++) {
        multiplicationTable[i].update()
    } 
    head.update()
}

let numik = 2
let myNumbers = getArrayNumber(numik)
let secondNumber = getArraySecondNumber(numik)

document.querySelector("#newNumber").value = 2
document.querySelector("#eating2").style.display = "none"
startGame()

document.querySelector("#newGame").addEventListener("click", () => {
    numik = document.querySelector("#newNumber").value
    document.querySelector("#eating2").style.display = "none"
    myNumbers = getArrayNumber(numik)
    secondNumber = getArraySecondNumber(numik)
    arrayEaten = []
    scorePlay = 0
    myGameArea.stop()
    startGame()
})
