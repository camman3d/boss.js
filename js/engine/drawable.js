/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function Drawable(_id) {
    this.id = _id;
    this.element = null;
    
    // Position and size
    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 32;
    
    // Display properties
    this.alpha = 1;
    this.backgroundColor = "none";
    this.backgroundImage = "none";
    this.backgroundRepeat = "no-repeat";
    this.backgroundPosition = "0px 0px";
    this.shadow = "none";
    this.border = "none";
    this.borderRadius = 0;
    
    // Transformations
    this.rotate = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.skewX = 0;
    this.skewY = 0;
    
    this.style = 'width: {{width}}px;' +
        'height: {{height}}px;' +
        'left: {{x}}px;' +
        'top: {{y}}px;' +
        'alpha: {{alpha}};' +
        'box-shadow: {{shadow}};' +
        '-moz-box-shadow: {{shadow}};' +
        '-webkit-box-shadow: {{shadow}};' +
        'border-radius: {{borderRadius}}px;' +
        '-moz-border-radius: {{borderRadius}}px;' +
        '-webkit-border-radius: {{borderRadius}}px;' +
        'transform: rotate({{rotate}}deg) scale({{scaleX}}, {{scaleY}}) skew({{skewX}}, {{skewY}});' +
        '-ms-transform: rotate({{rotate}}deg) scale({{scaleX}}, {{scaleY}}) skew({{skewX}}, {{skewY}});' +
        '-webkit-transform: rotate({{rotate}}deg) scale({{scaleX}}, {{scaleY}}) skew({{skewX}}, {{skewY}});' +
        '-o-transform: rotate({{rotate}}deg) scale({{scaleX}}, {{scaleY}}) skew({{skewX}}, {{skewY}});' +
        '-moz-transform: rotate({{rotate}}deg) scale({{scaleX}}, {{scaleY}}) skew({{skewX}}, {{skewY}});' +
        'background-color: {{backgroundColor}};' +
        'background-image: {{backgroundImage}};' +
        'background-repeat: {{backgroundRepeat}};' +
        'background-position: {{backgroundPosition}};';
    this.template = '<div id="{{id}}" class="drawable" style="{{>style}}"></div>';
    
    this.render = function(canvas) {
        var content = Mustache.to_html(this.template, this, this);
        canvas.append(content);
        this.element = $("#"+this.id);
        return this;
    };
    
    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
        if(this.element) {
            this.element.css("left", x+"px");
            this.element.css("top", y+"px");
        }
        return this;
    };
    
    this.setSize = function(width, height) {
        this.width = width;
        this.height = height;
        return this;
    };
    
    this.update = function() {
        this.element.attr("style", Mustache.to_html(this.style, this));
        return this;
    };
}