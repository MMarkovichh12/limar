kaboom({
    width: 900,
    height:600,
    font:"sinko",
    canvas: document.querySelector('#mycanvas')
    })
    
    loadSprite("flappy", "sprites/flappy.png")
    loadSprite("background", "sprites/background.png")
    loadSprite("pipe", "sprites/pipe.png")
    
   // loadSound("wooosh", "sounds/wooosh.mp3")
   // loadSound("score", "sounds/score.mp3")
   // loadSound("hit", "sounds/hit.mp3")
    
    
    scene("game", ()=>{
        add([
            sprite("background",{
                width:width(),
                height:height(),
            })
        ])
        score=0
        scoreText=add([
            pos(10,10),
            text(score,{size:70})
        ]) 
        bird=add([
            sprite("flappy"),
            scale(2),
            pos(80,40),
            area(),
            body()
            
        ])
        // pipe 
        function producePipes(){
            PIPE_GAP=150
            offset=rand(-50,50) 
            add([
                sprite("pipe"),
                pos(width(),height()/2+offset+PIPE_GAP/2),
                "pipe",
                area(),
                {passed:false}
            ])
            add([
                sprite("pipe",{flipY:true}),
                pos(width(),height()/2+offset-PIPE_GAP/2),
                origin("botleft"),
                "pipe",
                area()
            ])    
                   
        }
        loop(1.5, ()=>{
            producePipes()
        })   
        onUpdate("pipe",(pipe) =>{
            pipe.move(-160,0)
            if(pipe.passed ==false && pipe.pos.x <bird.pos.x){
                play("score")
                pipe.passed = true
                score +=125
                scoreText.text=score
            }
        })
        // pipe
    
        bird.collides("pipe", ()=>{
          //  play("hit")
            go("gameover",score)
        })
    
        bird.onUpdate(()=>{
            if(bird.pos.y>height()+30 || bird.pos.y <-30){
              //  play("hit")
                go("gameover",score)
            }
        })
        onKeyPress("space", ()=>{
           // play("wooosh")
            bird.jump(200)
        })
    
    
    })
    // storage
    storage = localStorage.getItem("high_score")
    highScore = storage == undefined ? 0:parseInt(storage)
    
    
    
    // storage
    // endgame
    scene("gameover", ()=>{
        if(score >highScore){
            highScore=score
            localStorage.setItem("high_score",highScore)
        }
        add([
            sprite("background",{
                width :width(),
                height: height(),
            })
        ])
        add([
            pos(10,10),
            text(
                "Game Over\n"
                +"results: " + score
                +"\nHight Score: " + highScore, {size: 45}
            )
        ])
        keyPress("space", ()=>{
            go("game")
        })
    })
    go("game")
    
    