/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var JSEngine = {
    
    currentCanvas: null,
    world: {
        entities: {}
    },
    
    // Initializing/loading
    load: function(callback) {
        var scripts = [
            'js/lib/mustache.js',
            'js/engine/drawable.js',
            'js/engine/sprite.js',
            'js/engine/animatedSprite.js',
            'js/engine/keyboardController.js',
            'js/engine/point.js',
            'js/engine/entity.js',
            'js/engine/collisionHandler.js',
        ];
        
        var loadScript = function(index) {
            if(index < scripts.length) {
                $.getScript(scripts[index], function() {
                    loadScript(index+1);
                });
            } else {
                callback();
            }
        };
        
        loadScript(0);
    },
    
    loadEntities: function(canvas) {
        var c = canvas || this.currentCanvas;
        for(var i in this.world.entities) {
            this.world.entities[i].init(c);
        }
        return this;
    },
    
    loadWorld: function(worldScript, canvas) {
        // Load the world
        $.getScript(worldScript, function() {
            // Load the requires
            var loadRequire = function(index, callback) {
                if(index < JSEngine.world.requires.length) {
                    $.getScript(JSEngine.world.requires[index], function() {
                        loadRequire(index+1, callback);
                    });
                } else {
                    callback();
                }
            };
            
            loadRequire(0, function() {
                JSEngine.loadEntities(canvas);
            });
        });
    },
    
    init: function(id, width, height) {
        width = width || 640;
        height = height || 480;
        this.currentCanvas = $("#"+id).addClass("jsengine").width(width).height(height);
        return this.currentCanvas;
    }
};