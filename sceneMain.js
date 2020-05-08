class SceneMain extends Phaser.Scene {
    constructor() 
    {
        super('SceneMain');
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
        new PlatformsPreload({scene:this}); 
        new PlayerPreload({scene:this}); 
        new EnemyPreload({scene:this}); 
    }

    create() {     
    //Sprites
        this.add.image(game.config.width/2, game.config.height/2, 'bg');
        this.platforms = new PlatformsCreate({scene:this});
        this.enemy = new EnemyCreate({scene:this}); 
        this.player = new PlayerCreate({scene:this});

    //The state machine managing the player
        this.stateMachine = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            dash: new DashState(),
            jump: new JumpState(),
        },[this, this.player]);

    //Colliders
        this.physics.add.overlap(playerW, enemy, playerHit.bind(this));
        this.physics.add.overlap(enemyW, player, enemyHit.bind(this));

    //Controls
        keys = this.input.keyboard.createCursorKeys();
        keyAction1 = this.input.keyboard.addKey('X');
        keyAction2 = this.input.keyboard.addKey('Z');

    //HP text
        playerHpText = this.add.text(20 ,20 ,'Start', {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44,
      });
    }

    update() {
    //Movement
        // new EnemyUpdate({scene:this}); 
        // new PlayerUpdate({scene:this});

        this.stateMachine.step();
    //HP text
        // playerHpText.setText('Player HP ' + playerHp + ' / ' + 'Enemy HP ' + enemyHp + ' / ' + this.stateMachine.state); 

        playerHpText.setText(this.stateMachine.state + ' / ' + player.direction);
    //End game
        if(playerHp < 1 || enemyHp < 1)
        {
            this.scene.start('SceneTitle');
        }    
    }
}

//Lower HP if hit
function enemyHit (player)
{
    if (Date.now() > lastHitTimeEnemy + 1000/10 == true) 
    {
        player.setTint(0xff0000);
        // playerHp--;  
        lastHitTimeEnemy = Date.now()
    }
}

function playerHit (enemy)
{
    if (Date.now() > lastHitTimePlayer + 1000/15 == true) 
    {
        enemy.setTint(0xff0000);
        enemyHp--;  
        lastHitTimePlayer = Date.now()
    }
}
