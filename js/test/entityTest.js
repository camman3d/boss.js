/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var entityTest = {
    
    tests: [
        /*
         * Test 1
         * Check that the collision model is stretched
         */
        function() {
            var entity = new Entity({
                width: 100,
                height: 50
            });
            var point = entity.collisionModel.edges[1][1];
            return (point.e(1) === 100 && point.e(2) === 50);
        },
        
        /*
         * Test 2
         * Check that the position is adjusted
         */
        function() {
            var entity = new Entity({
                width: 100,
                height: 50,
                position: $V([25,25])
            });
            var p1 = entity.collisionModel.edges[0][0];
            var p2 = entity.collisionModel.edges[1][1];
            return (p1.e(1) === 25 && p1.e(2) === 25 && p2.e(1) === 125 && p2.e(2) === 75);
        },
        
        /*
         * Test 3
         * Check that the center of the circle is adjusted
         */
        function() {
            var entity = new Entity({
                collisionModel: new Shape({
                    type: "circle",
                    radius: 16
                }),
                position: $V([25,25])
            });
            return (entity.collisionModel.center.e(1) === 25 && entity.collisionModel.center.e(2) === 25);
        },
        
        /*
         * Test 4
         * Check that chaning the position changes the collision model (square)
         */
        function() {
            var entity = new Entity();
            entity.setPosition($V([30,30,0]));
            var p1 = entity.collisionModel.edges[0][0];
            var p2 = entity.collisionModel.edges[1][1];
            return (p1.e(1) === 30 && p1.e(2) === 30 && p2.e(1) === 62 && p2.e(2) === 62);
        },
        
        /*
         * Test 5
         * Check that chaning the position changes the collision model (circle)
         */
        function() {
            return false;
        }
    ],
    
    test: function($out) {
        var allPassed = true;
        for(var i in this.tests) {
            var result = this.tests[i]();
            if(!result) {
                if($out)
                    $out.append('<p style="color: red">Entity Test ' + (Number(i) + 1) + ' Failed</p>');
                else
                    console.log('Entity Test ' + (Number(i) + 1) + ' Failed');
            }
            allPassed &= result;   
        }
        if(allPassed)
            if($out)
                $out.append('<p>All Entity Tests Passed!');
            else
                console.log('All Entity Tests Passed!');
    }
}