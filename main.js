var game;

window.onload=function()
{
var config = {
        type: Phaser.AUTO,
        width: 736,
        height: 400,
        backgroundColor: 0xffffff,
        pixelArt: true, //fix blurred pixels
        zoom: 1,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {y: 1200},
                debug: false
                // debug: true
            }
        },
        scene: [SceneTitle, SceneMain, ]
    };
    game = new Phaser.Game(config);
}

var player;
var enemy;
var cursors;
var platforms;
var rNum;
var distance;
var speed;
var playerHp;
var enemyHp;
var playerHpText;
var lastHitTimeEnemy = Date.now();
var lastHitTimePlayer = Date.now();
var playerW;
var enemyW;
var weaponRange;
