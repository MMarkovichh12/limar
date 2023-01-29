kaboom({
    width:1050,
    height:400,
    font: "sinko",
    canvs: document.querySelector('#mycanvas')
})

loadSprite("t-rex","sprites/t-rex.jpg")


loadSprite("background","sprites/background.png")
loadSprite("cactus","sprites/cactus.jpg")


loadSound("jump","sounds/jump.mp3")
loadSound("hit","sounds/hit.mp3")

FLOOR_HEIGHT=10
JUMP_FORCE=800
SPEED=480

score = 0
scoreLabel=add([
    text(score,{size:40}),
])

onUpdate(() =>{
    score++
    scoreLabel.text=score
})

scene("game",() =>{
    gravity(2400)
    add([
        rect(width(),FLOOR_HEIGHT),
        pos(0,height()-FLOOR_HEIGHT),
        area(),
        body()
    ])
    //pozadina
    add([
        sprite("background",{
            width:width(),
            height:height()
        })
    ])
    trex=add([
        sprite("t-rex"),
        pos(80,40),
        area(),
        body()
    ])
    OnKeyPress("space",jump)
    function jump(){
        if(trex.isGrounded())
        {
         play("jump")
         trex.jump(JUMP_FORCE)
         }
    }

    spawnCactus()
function spawnCactus(){
    add([
        sprite("cactus"),
        area(),
        pos(width(),height()-FLOOR_HEIGHT),
        origin("botleft"),
        move(LEFT,SPEED),
        "tree"
        ])
        wait(rand(0.5,1.5),spawnCactus)
    }


})

trex.onCollide("tree",()=>{
      play("hit")
      go("lose",score)
})

screen("lose",()=>{
     add([
        rect(width(),height()),
        color(0,0,0)
     ])
    add([
        text("rezultat: " +score,{size: 60}),
        pos(10,10)
    ])
    onKeyPress("space", ()=>{

        go("game")
    })
})


go("game")