/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

JSEngine.world.entities.push(new Entity(function(canvas) {
    
    // Set up the drawable
    this.drawable = new AnimatedSprite("mario");
    this.drawable.backgroundColor = "green";
    this.drawable.setPosition(32,32)
        .setSize(30, 32)
        .setImage("assets/sprites/MarioLuigi.gif")
        .createAnimation("walk")
        .setAnimation("walk")
        .addFrame({
            xOffset: 90
        }).addFrame({
            xOffset: 123
        }).render(canvas)
        .setFrame(0);
        
    // Set up the keyboard/movement
    var e = this;
    KeyboardController.bindKey(KeyboardController.keys.left,
        KeyboardController.keyDown,
        function() {
            if(e.velocity.x === 0) {
                e.drawable.scaleX = -1;
                e.drawable.update().setFrame(0).startAnimation();
                e.setVelocity(-1, 0);
            }
    });
    KeyboardController.bindKey(KeyboardController.keys.left,
        KeyboardController.keyUp,
        function() {
            if(e.velocity.x < 0) {
                e.drawable.stopAnimation();
                e.setVelocity(0, 0);
            }
        });

    KeyboardController.bindKey(KeyboardController.keys.right,
        KeyboardController.keyDown,
        function() {
            if(e.velocity.x === 0) {
                e.drawable.scaleX = 1;
                e.drawable.update().setFrame(0).startAnimation();
                e.setVelocity(1, 0);
            }
        });
    KeyboardController.bindKey(KeyboardController.keys.right,
        KeyboardController.keyUp,
        function() {
            if(e.velocity.x > 0) {
                e.drawable.stopAnimation();
                e.setVelocity(0, 0);
            }
        });
    
}));
