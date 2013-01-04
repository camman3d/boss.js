/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

AnimatedSprite.prototype = new Sprite();
AnimatedSprite.prototype.constructor = AnimatedSprite;
function AnimatedSprite(_id) {
    this.id = _id;
    
    // Animation info
    this.animationEnabled = true;
    this.animations = {};
    this.currentAnimation = "";
    this.animationIndex = 0;
    this.animationSpeed = 100;
    
    // Animation creation
    this.createAnimation = function(name) {
        this.animations[name] = [];
        return this;
    };
    
    this.setAnimation = function(name) {
        this.currentAnimation = name;
        if(this.animations[this.currentAnimation].length > 0)
            this.setFrame(0);
        return this;
    };
    
    this.addFrame = function(args) {
        var frameX = args.xOffset || 0;
        var frameY = args.yOffset || 0;
        if(args.col)
            frameX = (this.width + this.spacing) * args.col;
        if(args.row)
            frameY = (this.height + this.spacing) * args.row;
        
        this.animations[this.currentAnimation].push({
            xOffset: frameX,
            yOffset: frameY
        });
        return this;
    };
    
    // Animation execution
    this.updateAnimation = function() {
        if(!this.animationEnabled) {
            this.setFrame(0);
            return;
        }
        
        this.animationIndex++;
        if(this.animationIndex >= this.animations[this.currentAnimation].length)
            this.animationIndex = 0;
        this.setFrame(this.animationIndex);
        
        var s = this;
        setTimeout(function(){s.updateAnimation();}, this.animationSpeed);
    };
    
    this.setFrame = function(i) {
        this.xOffset = this.animations[this.currentAnimation][i].xOffset;
        this.yOffset = this.animations[this.currentAnimation][i].yOffset;
        this.element.css("background-position", "-" + this.xOffset + "px -" + this.yOffset + "px");
        return this;
    };
    
    this.startAnimation = function() {
        // Don't start the animation if this object isn't rendered or has no animations
        if(this.element === null || this.animations.length === 0 || this.animations[this.currentAnimation].length === 0)
            return this;
        
        this.animationEnabled = true;
        var s = this;
        setTimeout(function(){s.updateAnimation();}, this.animationSpeed);
        return this;
    };
    
    this.stopAnimation = function() {
        this.animationEnabled = false;
        return this;
    };
    
}