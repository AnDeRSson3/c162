AFRAME.registerComponent("ball",{
    init:function(){
        this.throwball();
    },
    throwball:function(){
        window.addEventListener("keydown", (e)=>{
            if (e.key === "z"){
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:.5
                });
                ball.setAttribute("material", "color", "blue");
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                ball.setAttribute("position", {
                    x: pos.x,
                    y:pos.y,
                    z:pos.z
                });
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity", direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene");
                ball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    radius:.5
                })
                ball.addEventListener("collide", this.removeBall);
                scene.appendChild(ball)
            }
        })
    },
    removeBall: function(e){
        var element = e.detail.target.el
        var target = e.detail.body.el 
         if (target.id.includes("pin")){
            target.setAttribute("material",{
                opacity:1,
                transparent: true
            })
        var impulse = new CANNON.Vec3(-2, 2, 1)
        var worldPoint= new CANNON.Vec3().copy(
            target.getAttribute("position")
        ) 
        target.body.applyImpulse(impulse, worldPoint)
        element.removeEventListener("collide", this.ball)
        var scene = document.querySelector("#scene")
        scene.removeChild(element)
         }
    }
})