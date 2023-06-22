const io = require ('socket.io')();
const {createGameState, gameLoop} = require ('./game');
const {FRAME_RATE} = require('./constants');
io.on('connect',client => {

    const state = createGameState();
    startGameInterval(client,state);
    client.emit('init',{data: 'hello world'});

});
function startGameInterval(client,state){
    const intervalId = setInterval (() =>{const miner = gameLoop(state);
        if (!winner){
            client.emit('gameState',JSON.stringify(state));
        }else {
            client.emit('gameOver');
            clearInterval(intervalId);
        }
    }, 1000 / FRAME_RATE);
}
io.listen(3000);