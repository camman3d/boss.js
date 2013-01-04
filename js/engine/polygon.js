/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Rectangle(_top, _left, _width, _height) {
    this.top = _top;
    this.left = _left;
    this.width = _width;
    this.height = _height;
    
    this.containsPoint = function(point) {
         return (point.x >= this.left && point.x <= this.left + this.width
             && point.y >= this.top && point.y <= this.top + this.height);
    }
}