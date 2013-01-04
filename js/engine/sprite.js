/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Sprite.prototype = new Drawable();
Sprite.prototype.constructor = Sprite;
function Sprite(_id) {
    this.id = _id;
    
    // Sprite info
    this.image = 'none';
    this.xOffset = 0;
    this.yOffset = 0;
    this.backgroundImageTemplate = 'url({{image}})';
    this.backgroundPositionTemplate = '-{{xOffset}}px -{{yOffset}}px';
    this.spacing = 0;
    
    this.setImageLocation = function(args) {
        if(args.width) this.width = args.width;
        if(args.height) this.height = args.height;
        if(args.spacing) this.spacing = args.spacing;
        if(args.col)
            this.xOffset = (this.width + this.spacing) * args.col;
        if(args.row)
            this.yOffset = (this.height + this.spacing) * args.row;
        if(args.xOffset) this.xOffset = args.xOffset;
        if(args.yOffset) this.yOffset = args.yOffset;
        
        this.backgroundImage = Mustache.to_html(this.backgroundImageTemplate, this);
        this.backgroundPosition = Mustache.to_html(this.backgroundPositionTemplate, this);
        return this;
    };
    
    this.setImage = function(url) {
        this.image = url;
        this.backgroundImage = Mustache.to_html(this.backgroundImageTemplate, this);
        this.backgroundPosition = Mustache.to_html(this.backgroundPositionTemplate, this);
        return this;
    };
}