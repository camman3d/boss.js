/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

JSEngine.world.entities.push(new Entity(function(canvas) {
    
    // Set up the drawable
    this.drawable = new Drawable("block");
    this.drawable.backgroundColor = "red";
    this.drawable.setPosition(100,32)
        .setSize(32, 32)
        .render(canvas);

    
}));
