function Shape() {
    this.type = "polygon";
    
    // Set when a polygon
    this.edges = [];
    
    // Set when a circle
    this.center = $V([0,0]);
    this.radius = 0;
}