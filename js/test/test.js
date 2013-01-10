/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function test($out) {
    var testObjects = [
        collisionTest,
        entityTest
    ];
    for(var i in testObjects)
        testObjects[i].test($out);    
}