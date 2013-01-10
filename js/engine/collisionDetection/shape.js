function Shape(args) {
    args = args || {};
    this.type = args.type || "polygon";
    
    // Set when a polygon
    this.edges = args.edges || [];
    
    // Set when a circle
    this.center = args.center || $V([0,0]);
    this.radius = args.radius || 0;
}