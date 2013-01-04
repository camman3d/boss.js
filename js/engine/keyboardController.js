/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var KeyboardController = {
    keys: {
        // Modifiers
        shift: 16, ctrl: 17, alt: 18, caps: 20,
        
        // Arrows
        left: 37, up: 38, right: 39, down: 40,
        
        // Alphabet
        a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, 
        k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81,r: 82, s: 83, t: 84,
        u: 85, v: 86, w: 87, x: 88, y: 89, z: 90,
        
        // Numbers
        one: 49, two: 50, three: 51, four: 52, five: 53, six: 54, seven: 55,
        eight: 56, nine: 57, zero: 48,
        
        // Num Pad
        npad_zero: 96, npad_one: 97, npad_two: 98, npad_three: 99,
        npad_four: 100, npad_five: 101, npad_six: 102, npad_seven: 103,
        npad_eight: 104, npad_nine: 105, npad_times: 106, npad_plus: 107,
        npad_minus: 109, npad_period: 110, npad_divide: 111,
        
        // Symbols
        semicolon: 186, equals: 187, comma: 188, dash: 189, period: 190,
        forwardSlash: 191, tilde: 192, leftBracket: 219, backSlash: 220,
        rightBracket: 221, quote: 222,
        
        // Other
        tab: 9, enter: 13, space: 32
    },
    // Bindings
    keyDown: {},
    keyUp: {},
    state: [],
    
    // Event binding
    bindKey: function(key, event, block) {
        if(event[key] === undefined)
            event[key] = [block];
        else
            event[key].push(block);
    },
    
    // Event handlers
    keyDownHandler: function(e) {
        // Get the code
        e = e || window.event; 
        var code = e.charCode || e.keyCode
        
        // Test and set the flag
        if(KeyboardController.state[code])
            return;
        KeyboardController.state[code] = true;
        
        // Call all the events
        if(KeyboardController.keyDown[code] && KeyboardController.keyDown[code].length) {
            for(var i in KeyboardController.keyDown[code])
                KeyboardController.keyDown[code][i]();
        } else {
            console.log("Down: " + code);
        }
    },
    
    keyUpHandler: function(e) {
        // Get the code
        e = e || window.event; 
        var code = e.charCode || e.keyCode
        
        // Reset the flag
        KeyboardController.state[code] = false;
        
        // Call all the events
        if(KeyboardController.keyUp[code] && KeyboardController.keyUp[code].length) {
            for(var i in KeyboardController.keyUp[code])
                KeyboardController.keyUp[code][i]();
        } else {
            console.log("Up: " + code);
        }
    }
};

document.onkeydown = KeyboardController.keyDownHandler;
document.onkeyup = KeyboardController.keyUpHandler;