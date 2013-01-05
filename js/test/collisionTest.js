/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var collisionTest = {
    tests: [
        /*
         * Test 1
         * Non-touching squares
         */
        function() {
            var square1 = new Shape();
            square1.edges = [
                [$V([0,0,0]), $V([1,0,0])],
                [$V([1,0,0]), $V([1,1,0])],
                [$V([1,1,0]), $V([0,1,0])],
                [$V([0,1,0]), $V([0,0,0])]
            ];
            var square2 = new Shape();
            square2.edges = [
                [$V([2,2,0]), $V([2,3,0])],
                [$V([2,3,0]), $V([3,3,0])],
                [$V([3,3,0]), $V([3,2,0])],
                [$V([3,2,0]), $V([2,2,0])]
            ];
            return collisionHandler.checkCollision(square1, square2) === false;
        },

        /*
         * Test 2
         * Touching squares
         */
        function() {
            var square1 = new Shape();
            square1.edges = [
                [$V([0,0,0]), $V([3,0,0])],
                [$V([3,0,0]), $V([3,3,0])],
                [$V([3,3,0]), $V([0,3,0])],
                [$V([0,3,0]), $V([0,0,0])]
            ];
            var square2 = new Shape();
            square2.edges = [
                [$V([2,2,0]), $V([2,4,0])],
                [$V([2,4,0]), $V([4,4,0])],
                [$V([4,4,0]), $V([4,2,0])],
                [$V([4,2,0]), $V([2,2,0])]
            ];
            return collisionHandler.checkCollision(square1, square2) === true;
        },

        /*
         * Test 3
         * Perfectly overlapping squares
         */
        function() {
            var square1 = new Shape();
            square1.edges = [
                [$V([0,0,0]), $V([1,0,0])],
                [$V([1,0,0]), $V([1,1,0])],
                [$V([1,1,0]), $V([0,1,0])],
                [$V([0,1,0]), $V([0,0,0])]
            ];
            var square2 = new Shape();
            square2.edges = [
                [$V([0,0,0]), $V([1,0,0])],
                [$V([1,0,0]), $V([1,1,0])],
                [$V([1,1,0]), $V([0,1,0])],
                [$V([0,1,0]), $V([0,0,0])]
            ];
            return collisionHandler.checkCollision(square1, square2) === true;
        },

        /*
         * Test 4
         * Horizontally aligned squares
         */
        function() {
            var square1 = new Shape();
            square1.edges = [
                [$V([0,0,0]), $V([1,0,0])],
                [$V([1,0,0]), $V([1,1,0])],
                [$V([1,1,0]), $V([0,1,0])],
                [$V([0,1,0]), $V([0,0,0])]
            ];
            var square2 = new Shape();
            square2.edges = [
                [$V([2,0,0]), $V([3,0,0])],
                [$V([3,0,0]), $V([3,1,0])],
                [$V([3,1,0]), $V([2,1,0])],
                [$V([2,1,0]), $V([2,0,0])]
            ];
            return collisionHandler.checkCollision(square1, square2) === false;
        },

        /*
         * Test 5
         * Vertically aligned squares
         */
        function() {
            var square1 = new Shape();
            square1.edges = [
                [$V([0,0,0]), $V([1,0,0])],
                [$V([1,0,0]), $V([1,1,0])],
                [$V([1,1,0]), $V([0,1,0])],
                [$V([0,1,0]), $V([0,0,0])]
            ];
            var square2 = new Shape();
            square2.edges = [
                [$V([0,2,0]), $V([1,2,0])],
                [$V([1,2,0]), $V([1,3,0])],
                [$V([1,3,0]), $V([0,3,0])],
                [$V([0,3,0]), $V([0,2,0])]
            ];
            return collisionHandler.checkCollision(square1, square2) === false;
        },
        
        /*
         * Test 6
         * Non-touching diamonds
         */
        function() {
            var diamond1 = new Shape();
            diamond1.edges = [
                [$V([0,1,0]), $V([1,0,0])],
                [$V([1,0,0]), $V([2,1,0])],
                [$V([2,1,0]), $V([1,2,0])],
                [$V([1,2,0]), $V([0,1,0])]
            ];
            var diamond2 = new Shape();
            diamond2.edges = [
                [$V([3,1,0]), $V([4,2,0])],
                [$V([4,2,0]), $V([3,3,0])],
                [$V([3,3,0]), $V([2,2,0])],
                [$V([2,2,0]), $V([3,1,0])]
            ];
            return collisionHandler.checkCollision(diamond1, diamond2) === false;
        },
        
        /*
         * Test 7
         * Touching diamonds
         */
        function() {
            var diamond1 = new Shape();
            diamond1.edges = [
                [$V([0,1,0]), $V([1,0,0])],
                [$V([1,0,0]), $V([2,1,0])],
                [$V([2,1,0]), $V([1,2,0])],
                [$V([1,2,0]), $V([0,1,0])]
            ];
            var diamond2 = new Shape();
            diamond2.edges = [
                [$V([1,1,0]), $V([2,2,0])],
                [$V([2,2,0]), $V([1,3,0])],
                [$V([1,3,0]), $V([0,2,0])],
                [$V([0,2,0]), $V([1,1,0])]
            ];
            return collisionHandler.checkCollision(diamond1, diamond2) === true;
        },
        
        /*
         * Test 8
         * Non-touching circles
         */
        function() {
            var circle1 = new Shape();
            circle1.type = "circle";
            circle1.center = $V([5,5,0]);
            circle1.radius = 5;
            var circle2 = new Shape();
            circle2.type = "circle";
            circle2.center = $V([15,15,0]);
            circle2.radius = 5;
            return collisionHandler.checkCollision(circle1, circle2) === false;
        },
        
        /*
         * Test 9
         * Touching circles
         */
        function() {
            var circle1 = new Shape();
            circle1.type = "circle";
            circle1.center = $V([5,5,0]);
            circle1.radius = 5;
            var circle2 = new Shape();
            circle2.type = "circle";
            circle2.center = $V([12,5,0]);
            circle2.radius = 5;
            return collisionHandler.checkCollision(circle1, circle2) === true;
        },
        
        /*
         * Test 10
         * Overlapping circles
         */
        function() {
            var circle1 = new Shape();
            circle1.type = "circle";
            circle1.center = $V([5,5,0]);
            circle1.radius = 5;
            var circle2 = new Shape();
            circle2.type = "circle";
            circle2.center = $V([5,5,0]);
            circle2.radius = 5;
            return collisionHandler.checkCollision(circle1, circle2) === true;
        },
        
        /*
         * Test 11
         * Non-touching circle and square
         */
        function() {
            var circle = new Shape();
            circle.type = "circle";
            circle.center = $V([5,5,0]);
            circle.radius = 5;
            var square = new Shape();
            square.edges = [
                [$V([10,10,0]), $V([15,10,0])],
                [$V([15,10,0]), $V([15,15,0])],
                [$V([15,15,0]), $V([10,15,0])],
                [$V([10,15,0]), $V([10,10,0])]
            ];
            return collisionHandler.checkCollision(circle, square) === false;
        },
        
        /*
         * Test 12
         * Touching circle and square
         */
        function() {
            var circle = new Shape();
            circle.type = "circle";
            circle.center = $V([5,5,0]);
            circle.radius = 5;
            var square = new Shape();
            square.edges = [
                [$V([6,6,0]), $V([11,6,0])],
                [$V([11,6,0]), $V([11,11,0])],
                [$V([11,11,0]), $V([6,11,0])],
                [$V([6,11,0]), $V([6,6,0])]
            ];
            return collisionHandler.checkCollision(circle, square) === true;
        },
        
        /*
         * Test 13
         * Non-touching diamond and square
         */
        function() {
            var circle = new Shape();
            circle.type = "circle";
            circle.center = $V([5,5,0]);
            circle.radius = 5;
            var diamond = new Shape();
            diamond.edges = [
                [$V([8,11,0]), $V([11,8,0])],
                [$V([11,8,0]), $V([14,11,0])],
                [$V([14,11,0]), $V([11,14,0])],
                [$V([11,14,0]), $V([8,11,0])]
            ];
            return collisionHandler.checkCollision(circle, diamond) === false;
        },
        
        /*
         * Test 14
         * Touching diamond and square
         */
        function() {
            var circle = new Shape();
            circle.type = "circle";
            circle.center = $V([5,5,0]);
            circle.radius = 5;
            var diamond = new Shape();
            diamond.edges = [
                [$V([5,5,0]), $V([10,10,0])],
                [$V([10,10,0]), $V([5,15,0])],
                [$V([5,15,0]), $V([0,10,0])],
                [$V([0,10,0]), $V([5,5,0])]
            ];
            return collisionHandler.checkCollision(circle, diamond) === true;
        }
    ],
    
    test: function($out) {
        var allPassed = true;
        for(var i in collisionTest.tests) {
            var result = collisionTest.tests[i]();
            if(!result) {
                if($out)
                    $out.append('<p style="color: red">Collision Test ' + (Number(i)+1) + ' Failed</p>');
                else
                    console.log('Collision Test ' + (Number(i)+1) + ' Failed');
            }
            allPassed &= result;
        }
        if(allPassed)
            if($out)
                $out.append('All Collision Tests Passed!');
            else
                console.log('All Collision Tests Passed!');
    }
}