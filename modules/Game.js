export default class Game{
    constructor(url){
        this.url = url
        this.word = "";
        this.keyboard = [];
        this.arrayWord = [];
        this.arrayDiv = [];
        this.heart = 0;
    }

    loadJson(){
        return new Promise( (resolve,reject) => {
            return fetch("../json/words.json")
                .then( result => result.json())
                .then( result => {
                    const rand = Math.floor(Math.random() * Math.floor(result.words.length-1))
                    this.word = result.words[rand].word.toLowerCase();
                    console.log(this.word);
                    resolve(this.keyboard = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"])
                })
                .catch( err => reject(new Error("Echec du loading du json")))
        })
    }

    init(){
        this.heart = 3;
        this.arrayWord = this.word.split("")
        this.arrayDiv = this.arrayWord.reduce( (a,e) => {
            const tmpDiv = document.createElement('div');
            tmpDiv.classList.add("letter");
            tmpDiv.innerHTML = `-`;
            document.querySelector(".layout").appendChild(tmpDiv);
            a.push(tmpDiv)
            return a;
        },[])
        this.keyboard.forEach( key => {
            const tmpDiv = document.createElement('div');
            tmpDiv.classList.add("letter");
            tmpDiv.innerHTML = `${key}`.toUpperCase();
            tmpDiv.addEventListener("click",() => {
                /////////////////////////////////////////////////////////////////////////
                ////                           Correct input                        /////
                /////////////////////////////////////////////////////////////////////////
                if(this.arrayWord.some( elem => elem === tmpDiv.innerHTML.toLowerCase())&&this.heart>0)
                {
                    this.arrayWord.forEach( (elem,index) => {
                        if(elem === tmpDiv.innerHTML.toLowerCase()){
                        this.arrayDiv[index].innerHTML = elem.toUpperCase();
                        tmpDiv.style.color = "white"
                        tmpDiv.style.backgroundColor = "green"
                        }
                    })
                }
                /////////////////////////////////////////////////////////////////////////
                ////                           Bad input                            /////
                /////////////////////////////////////////////////////////////////////////
                else if(tmpDiv.innerHTML !== "/"&&this.heart>0){
                    ///////////////////////////////////////////////////////////
                    tmpDiv.innerHTML = "/"
                    tmpDiv.style.backgroundColor = "gray"
                    ///////////////////////////////////////////////////////////
                    const heartTmp = document.querySelector(`.n${this.heart}`);
                    heartTmp.style.fill = "black";
                    heartTmp.style.animation = "none"
                    this.heart--;
                    ///////////////////////////////////////////////////////////
                }
                //////////////////////////////////////////////////////////////////
                ///                            LOSE                            ///  
                //////////////////////////////////////////////////////////////////
                if(this.heart == 0){
                    this.heart--;
                    const gameOverTmp = document.createElement('p')
                    gameOverTmp.innerHTML = "Game Over"
                    gameOverTmp.classList.add("gameOver")
                    document.querySelector("body").appendChild(gameOverTmp)
                    this.arrayWord.forEach( (e,i) => this.arrayDiv[i].innerHTML = e.toUpperCase())
                    setTimeout(()=> {document.location.reload()},3000)
                }
                //////////////////////////////////////////////////////////////////
                ///                           WIN                              ///
                //////////////////////////////////////////////////////////////////
                if(!this.arrayDiv.some(e=>(e.innerHTML)==="-")&&this.heart>0){
                    this.heart= -1;
                    const gameOverTmp = document.createElement('p')
                    gameOverTmp.innerHTML = "WIN"
                    gameOverTmp.classList.add("gameOver")
                    document.querySelector("body").appendChild(gameOverTmp)
                    setTimeout(()=> {document.location.reload()},3000)
                }
                ///////////////////////////////////////////////////////////////////
            });
            document.querySelector(".padding").appendChild(tmpDiv);
        }) 
    }
}