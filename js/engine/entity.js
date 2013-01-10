/**
 * If the collision model is passed in then it should be in normalized coordinates
 */
function Entity(_init) {
    _init = _init || {};
    this.collisionModel = _init.collisionModel || new Shape();
    this.drawable = _init.drawable || null;
    this.height = _init.height || 32;
    this.position = _init.position || $V([0,0,0]);
    this.rotate = _init.rotate || 0;
    this.scale = _init.scale || {x: 1, y: 1};
    this.width = _init.width || 32;
    this.zIndex = _init.zIndex || 1;
    
    // Init the collision model if not defined
    if(!_init.collisionModel) {
        this.collisionModel.edges = [
            [$V([0,0,0]), $V([1,0,0])],
            [$V([1,0,0]), $V([1,1,0])],
            [$V([1,1,0]), $V([0,1,0])],
            [$V([0,1,0]), $V([0,0,0])]
        ]
    }
    
    // Fit the collision model to the size and position
    if(this.collisionModel.type !== "circle")
        for(var i in this.collisionModel.edges)
            for(var j in this.collisionModel.edges[i])
                // Stretch the collision model to match the size
                // Also offset the collision model by the position
                this.collisionModel.edges[i][j].setElements([
                    this.collisionModel.edges[i][j].e(1) * this.width + this.position.e(1),
                    this.collisionModel.edges[i][j].e(2) * this.height + this.position.e(2),
                ]);
    else
        // Offset the center of the circle by the position
        this.collisionModel.center = this.collisionModel.center.add(this.position);
    
    /*
     * ----------------------
     *       Functions
     * ----------------------
     */
    
    this.setPosition = function(position) {
        var diff = this.position.subtract(position);
        this.position = position;
        if(this.collisionModel.type === "circle")
            this.collisionModel.center = position;
        else
            for(var i in this.collisionModel.edges)
                for(var j in this.collisionModel.edges[i])
                    this.collisionModel.edges[i][j] = this.collisionModel.edges[i][j].subtract(diff);
        
        // TODO: Notify the view
    };
}