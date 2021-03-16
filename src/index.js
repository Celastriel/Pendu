import Game from '../modules/Game.js'
import { URL } from '../modules/listString.js'

const game = new Game(URL);

const run = async () => {
    try{
        await game.loadJson();
        game.init();
    }catch(err)
    {
        throw err;
    }
    
}

run();