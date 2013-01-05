/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var poly1 = new Shape();
poly1.edges = [
    [$V([2,2,0]), $V([4,2,0])],
    [$V([4,2,0]), $V([4,4,0])],
    [$V([4,4,0]), $V([2,4,0])],
    [$V([2,4,0]), $V([2,2,0])]
];

var poly2 = new Shape();
poly2.edges = [
    [$V([6,6,0]), $V([4.5,4,0])],
    [$V([4.5,4,0]), $V([3.5,5,0])],
    [$V([3.5,5,0]), $V([6,6,0])]
];

var poly3 = new Shape();
poly3.edges = [
    [$V([2,2,0]), $V([4.5,4,0])],
    [$V([4.5,4,0]), $V([3.5,5,0])],
    [$V([3.5,5,0]), $V([2,2,0])]
];

var poly4 = new Shape();
poly4.edges = [
    [$V([0,0,0]), $V([0,1,0])],
    [$V([0,1,0]), $V([1,1,0])],
    [$V([1,1,0]), $V([1,0,0])],
    [$V([1,0,0]), $V([0,0,0])]
];

var circle1 = new Shape();
circle1.type = "circle";
circle1.center = $V([1,1,0]);
circle1.radius = 1;

var circle2 = new Shape();
circle2.type = "circle";
circle2.center = $V([3,3,0]);
circle2.radius = 1;

var circle3 = new Shape();
circle3.type = "circle";
circle3.center = $V([2.1,2.1,0]);
circle3.radius = 1;

var circle4 = new Shape();
circle4.type = "circle";
circle4.center = $V([1.4,1.4,0]);
circle4.radius = 1;

var circle5 = new Shape();
circle5.type = "circle";
circle5.center = $V([1,1,0]);
circle5.radius = 1;

var collisionHandler = {
    
    pointOfCollision: null,
    
    checkCollision: function(object1, object2) {
        // TODO: update the point of collision 
        
        // Collision of two polygons
        if(object1.type === "polygon" && object2.type === "polygon")
            return collisionHandler.polyPoly(object1, object2);
        
        // Collision of two circles
        if(object1.type === "circle" && object2.type === "circle")
            return collisionHandler.circleCircle(object1, object2);
        
        // Collision of a polygon and a circle
        if(object1.type !== object2.type) {
            if(object1.type == "polygon") {
                return collisionHandler.polyCircle(object1, object2);
            } else {
                return collisionHandler.polyCircle(object2, object1);
            }
        }
        
        return true;
    },

    circleCircle: function(circle1, circle2) {
//        var dist = object1.center.distanceFrom(object2.center);
//        var result = (dist <= object1.radius + object2.radius);

        // Create a line between the two centers
        var line = collisionHandler.sat.buildLineFromSegment([circle1.center, circle2.center]);
        
        // If the line is null then the centers are the same
        if(!line) {
            collisionHandler.pointOfCollision = circle1.center.dup();
            return true;
        }
        
        // Project the circles onto the line
        var projection1 = collisionHandler.sat.projectShapeOnLine(circle1, line);
        var projection2 = collisionHandler.sat.projectShapeOnLine(circle2, line);
        
        // Check each projection for overlap
        if(!collisionHandler.sat.segmentsOverlap(projection1, projection2))
            return false;
        
        // Update the point of collision
        var overlap = collisionHandler.sat.getOverlap(projection1, projection2);
        collisionHandler.pointOfCollision = $V([(overlap[0].e(1) + overlap[1].e(1))/2, (overlap[0].e(2) + overlap[1].e(2))/2, 0]);
        
        return true;
    },
    
    polyCircle: function(polygon, circle) {
        // For each edge
        for(var j in polygon.edges) {
            var edge = polygon.edges[j];

            // Build the line
            var line = collisionHandler.sat.buildLineFromSegment(edge);

            // Project each shape onto the line
            var projection1 = collisionHandler.sat.projectShapeOnLine(polygon, line);
            var projection2 = collisionHandler.sat.projectShapeOnLine(circle, line);

            // Check each projection for overlap
            if(!collisionHandler.sat.segmentsOverlap(projection1, projection2))
                return false;
            
            // TODO: Update the point of collision
            
            // Create lines from the ends of the segment to the center of the circle
            // If the point on the line segment is the center of the circle then
            // the line will be null and it means we have a collision
            var l1 = collisionHandler.sat.buildLineFromSegment([edge[0], circle.center]);
            var l2 = collisionHandler.sat.buildLineFromSegment([edge[1], circle.center]);
            
            if(l1 === null || l2 === null) {
                // TODO: Update the point of collision
                return true;
            }
            
            // Project onto those lines too
            var projPolyL1 = collisionHandler.sat.projectShapeOnLine(polygon, l1);
            var projCircL1 = collisionHandler.sat.projectShapeOnLine(circle, l1);
            var projPolyL2 = collisionHandler.sat.projectShapeOnLine(polygon, l2);
            var projCircL2 = collisionHandler.sat.projectShapeOnLine(circle, l2);
            
            // Check each projection for overlap
            if(!collisionHandler.sat.segmentsOverlap(projPolyL1, projCircL1))
                return false;
            if(!collisionHandler.sat.segmentsOverlap(projPolyL2, projCircL2))
                return false;
            
            // TODO: Update the point of collision
        }
        
        return true;
    },

    polyPoly: function(object1, object2) {
        var collisionPoints = [];
        
        // For each shape
        var objects = [object1, object2];
        for(var i in objects) {
            var object = objects[i];
            
            // For each edge
            for(var j in object.edges) {
                var edge = object.edges[j];
                
                // Build the line
                var line = collisionHandler.sat.buildLineFromSegment(edge);
                
                // Project each shape onto the line
                var projection1 = collisionHandler.sat.projectShapeOnLine(object1, line);
                var projection2 = collisionHandler.sat.projectShapeOnLine(object2, line);
                
                // Check each projection for overlap
                if(!collisionHandler.sat.segmentsOverlap(projection1, projection2))
                    return false;
                
                // Save the point of collision
                var overlap = collisionHandler.sat.getOverlap(projection1, projection2);
                if(overlap[0] && overlap[1])
                    collisionPoints.push($V([(overlap[0].e(1) + overlap[1].e(1))/2, (overlap[0].e(2) + overlap[1].e(2))/2, 0]));
                
            }
        }
        
        // Average the collision points. This isn't perfect, but when we are dealing
        // with mostly squares it's good enough
        var averageX = 0,
            averageY = 0;
        for(i in collisionPoints) {
            averageX += collisionPoints[i].e(1);
            averageY += collisionPoints[i].e(2);
        }
        averageX /= collisionPoints.length;
        averageY /= collisionPoints.length;
        collisionHandler.pointOfCollision = $V([averageX, averageY, 0]);
        
        return true;
    },
    
    // Separating axis theorum functions needed for collision detection
    sat: {
        buildLineFromSegment: function(segment) {
            // Build the direction
            var dir = segment[1].subtract(segment[0]);
            return $L(segment[0], dir);
        },

        combineSegments: function(segments) {
            // Helper function
            var addPointToSegment = function(segment, point) {
                // Check if the point is already in the segment
                if(!collisionHandler.sat.segmentContainsPoint(segment, point)) {
                    // It's not. So let's swap one of the end points with it
                    var d0 = segment[0].distanceFrom(point);
                    var d1 = segment[1].distanceFrom(point);
                    if(d0 < d1)
                        segment[0] = point;
                    else
                        segment[1] = point;
                }
                return segment;
            };

            /* Start with the first segment and check each point. If it's not on the
             * segment, then expand the segment to include it
             */
            var seg = segments[0];
            for(var i=1; i<segments.length; i++) {
                var segment = segments[i];
                seg = addPointToSegment(seg, segment[0]);
                seg = addPointToSegment(seg, segment[1]);
            }

            return seg;
        },
        
        getOverlap: function(segment1, segment2) {
            var p1, p2;
            
            if(collisionHandler.sat.segmentContainsPoint(segment1, segment2[0]))
                p1 = segment2[0];
            if(collisionHandler.sat.segmentContainsPoint(segment1, segment2[1]))
                p2 = segment2[1];
            if(collisionHandler.sat.segmentContainsPoint(segment2, segment1[0]))
                p1 = segment1[0];
            if(collisionHandler.sat.segmentContainsPoint(segment2, segment1[1]))
                p2 = segment1[1];
            return [p1, p2];
        },
    
        projectCircleOnLine: function(shape, line) {
            // Project the middle and extend by the radius
            var middle = line.pointClosestTo(shape.center);
            middle = $V([Math.round(middle.e(1)), Math.round(middle.e(2)), 0]);
            var p1 = middle.subtract(line.direction.multiply(shape.radius));
            var p2 = middle.add(line.direction.multiply(shape.radius));
            return [p1, p2];
        },
    
        projectPolygonOnLine: function(shape, line) {
            var segments = [];
            for(var i in shape.edges) {
                var edge = shape.edges[i];
                var seg = collisionHandler.sat.projectSegmentOnLine(edge, line);
                segments.push(seg);
            }
            return collisionHandler.sat.combineSegments(segments);
        },

        projectSegmentOnLine: function(segment, line) {
            // Point closest to isn't perfect. Besides we're working with pixels
            // so we're going to round to the hundredth
            var p1 = line.pointClosestTo(segment[0]);
            p1 = $V([Math.round(p1.e(1)*100)/100, Math.round(p1.e(2)*100)/100, 0]);
            var p2 = line.pointClosestTo(segment[1]);
            p2 = $V([Math.round(p2.e(1)*100)/100, Math.round(p2.e(2)*100)/100, 0]);
            return [p1, p2];
        },
        
        projectShapeOnLine: function(shape, line) {
            if(shape.type == "polygon")
                return collisionHandler.sat.projectPolygonOnLine(shape, line);
            else
                return collisionHandler.sat.projectCircleOnLine(shape, line);
        },
        
        segmentContainsPoint: function(segment, point) {
            /* Check if in the bounding box. We assume (and know) the point lies
             * on the line
             */
            var minX = Math.min(segment[0].e(1), segment[1].e(1)),
                maxX = Math.max(segment[0].e(1), segment[1].e(1)),
                minY = Math.min(segment[0].e(2), segment[1].e(2)),
                maxY = Math.max(segment[0].e(2), segment[1].e(2));
            var inX = point.e(1) >= minX && point.e(1) <= maxX;
            var inY = point.e(2) >= minY && point.e(2) <= maxY;
            return inX && inY;
        },
        
        segmentsOverlap: function(seg1, seg2) {
            // We assume the two segments are on the same line
            var p1 = collisionHandler.sat.segmentContainsPoint(seg1, seg2[0]);
            var p2 = collisionHandler.sat.segmentContainsPoint(seg1, seg2[1]);
            return p1 || p2;
        }
        
    }
};