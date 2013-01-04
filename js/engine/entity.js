/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Entity(_init) {
    this.drawable = null;
    
    // Overwritable init function
    this.init = _init;
    
    // Collision Stuffs
    this.collisionModel = {
        type: "circle",
        
        center: [0.5, 0.5],
        
        // If a circle then define its radius in pixels
        radius: 16,
    
        // If a polygon then define the points in normalized coordinates
        poly: [new Point(0,0), new Point(0,1), new Point(1,1), new Point(1,0)]
    };
    this.getCenterPoint = function() {
        var x = this.drawable.x + (this.drawable.width * this.center[0]);
        var y = this.drawable.y + (this.drawable.height * this.center[1]);
        return new Point(x, y);
    };
    this.getBoundingBox = function() {
        var center = this.getCenterPoint();
        
        // If a circle then easy
        if(this.collisionModel.type === "circle") {
            var r = this.collisionModel.radius;
            return [new Point(center.x - r, center.y - r),
                new Point(center.x + r, center.y - r),
                new Point(center.x + r, center.y + r),
                new Point(center.x - r, center.y + r)];
        }
    };
    
    
    // Movement
    this.velocity = {
        x: 0,
        y: 0
    };
    this.timeStep = 100; // 1/10 second
    this.move = function() {
        // Check if we're stopped
        if(this.velocity.x === 0 && this.velocity.y === 0)
            return;
        
        if(this.drawable !== null) {
            this.drawable.setPosition(
                this.drawable.x + this.velocity.x,
                this.drawable.y + this.velocity.y
            );
        }
        
        var e = this;
        setTimeout(function() {e.move();}, e.Step)
    };
    this.setVelocity = function(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
        this.move();
    }
}