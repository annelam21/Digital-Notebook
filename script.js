var w = window.innerWidth;
var h = window.innerHeight;
var cnv; //p5js canvas
var c; //canvas element
var ctx; //context
 
var selectMode = false; //set selectMode to false
var count = 0; //count amount of text box created
var prevText; //stores most recent text box
var pen = true; //default pen mode is true
 
var gid = function (id) { //shorthand
    return document.getElementById(id);
}
 
function setup() {
    cnv = createCanvas(w, h); //create canvas
    cnv.position(0, 0); //set canvas position
    cnv.id('canvasID'); //give canvas an id
    sel = createSelect(); //create a select box
    sel.addClass("tools"); //add a class called tools
    sel.position(10, 10); //set position of medium options
    sel.option('Plain White', 0); //set medium options
    sel.option('Black', 1);
    sel.option('Lined', 2);
    sel.option('Graphing Paper', 3);
    sel.selected('Plain White'); //set default medium option
    sel.changed(changeMedium); //runs when changing medium option, when medium is changed, run changeMedium()
}
 
//changes medium based on select box option
function changeMedium() {
    var v = sel.value();
 
    cnv.removeClass('bgWhite');
    cnv.removeClass('bgBlack');
    cnv.removeClass('bgLined');
    cnv.removeClass('bgGraph');
    if (v == 0) { //white bg
        cnv.addClass('bgWhite');
    } else if (v == 1) { //black bg
        cnv.addClass('bgBlack');
    } else if (v == 2) { //lined
        cnv.addClass('bgLined');
    } else { //graph
        cnv.addClass('bgGraph');
    }
    cnv.addClass('medium'); //add class called medium
}
 
function draw() {
    c = gid('canvasID'); //set c to id of canvas
    ctx = c.getContext('2d'); //set ctx to canvas's context
 
    //Controls drawing/erasing ability
    if (!selectMode && mouseIsPressed && pen && (!document.activeElement.classList.contains("tools"))) { //if mouse is held down and drawing mode is on and not focused on other elements
        strokeWeight(gid('drawing-line-width').value);
        stroke(gid('drawing-color').value); //changes color of pen
        ctx.globalCompositeOperation = 'source-over'; //pen stroke is drawn above background
        line(pmouseX, pmouseY, mouseX, mouseY); //drawing line from point of mouse cursor
    } else if (!selectMode && mouseIsPressed && !pen && (!document.activeElement.classList.contains("tools"))) { //if mouse is held down and drawing mode is off
        strokeWeight(gid('drawing-line-width').value);
        ctx.globalCompositeOperation = 'destination-out'; //pen stroke is drawn below background
        line(pmouseX, pmouseY, mouseX, mouseY); //drawing line from point of mouse cursor
    }
}
 
//toggle pen/eraser mode
function onOff() {
    pen = !pen;
    if (pen) {
        gid("pencil").innerHTML = "Pencil";
    } else {
        gid("pencil").innerHTML = "Eraser";
    }
}
 
// change slider value for pen width
gid("drawing-line-width").oninput = function () {
    gid("penWidth").innerHTML = this.value;
}
 
//toggle select mode on/off
function selec() {
    selectMode = !selectMode;
    if (selectMode) {
        gid("selectBtn").innerHTML = "Select: On";
    } else {
        gid("selectBtn").innerHTML = "Select: Off";
    }
}
 
// //Calculator function; allows user to open and close calculator tool
// function calc() {
//     if (document.getElementById('calcBox').style.visibility == "visible") {
//         document.getElementById('calcBox').style.visibility = "hidden";
//     } else {
//         document.getElementById('calcBox').style.visibility = "visible";
//     }
// }
 
// //sets value from 0-9 when button is pressed
// function calc0() {
//     document.getElementById('calcInput').value += 0;
// }
 
// function calc1() {
//     document.getElementById('calcInput').value += 1;
// }
 
// function calc2() {
//     document.getElementById('calcInput').value += 2;
// }
 
// function calc3() {
//     document.getElementById('calcInput').value += 3;
// }
 
// function calc4() {
//     document.getElementById('calcInput').value += 4;
// }
 
// function calc5() {
//     document.getElementById('calcInput').value += 5;
// }
 
// function calc6() {
//     document.getElementById('calcInput').value += 6;
// }
 
// function calc7() {
//     document.getElementById('calcInput').value += 7;
// }
 
// function calc8() {
//     document.getElementById('calcInput').value += 8;
// }
 
// function calc9() {
//     document.getElementById('calcInput').value += 9;
// }
 
// //for parentheses ()
// function par1() {
//     document.getElementById('calcInput').value += "(";
// }
 
// function par2() {
//     document.getElementById('calcInput').value += ")";
// }
 
// //delete last value 
// function del() {
//     var currentVal = document.getElementById('calcInput').value;
//     var recentVal = currentVal.slice(0, -1);
//     document.getElementById('calcInput').value = recentVal;
// }
 
// //clear all values from input box
// function clearVal() {
//     document.getElementById('calcInput').value = "";
// }
 
// //addition
// function addNum() {
//     document.getElementById('calcInput').value += " + ";
// }
 
// //subtraction
// function subtractNum() {
//     document.getElementById('calcInput').value += " - ";
// }
 
// //multiplication
// function multiplyNum() {
//     document.getElementById('calcInput').value += " * ";
// }
 
// //division
// function divideNum() {
//     document.getElementById('calcInput').value += " / ";
// }
 
// //we love pi alot so...
// function weLovePi() {
//     document.getElementById('calcInput').value += " " + Math.PI + " ";
// }
 
// //calculate results
// function calcResults() {
//     var op = document.getElementById('calcInput').value;
//     document.getElementById('calcResults').innerHTML = "Results: " + eval(op);
 
//     //show history of all calculations
//     var history = document.getElementById('history').innerHTML;
 
//     document.getElementById('history').innerHTML = op + " = " + eval(op) + "<br>" + history;
 
//     //clear previous calculation
//     document.getElementById('calcInput').value = "";
 
// }
 
// Create text box & container
function textBox() {
    var text = document.createElement("textarea"); //create a textarea element
    text.className = "tools"; //assign class name of tools
 
    var div = document.createElement("div"); //create a div element
    div.id = "boxCount" + count; //count the number of textboxes being created
    count++; //add +1 to count everytime a textbox is created
    div.className = "ui-widget-content textDiv tools"; //add classes, classes are separated by spaces
    div.setAttribute("tabindex", 0); // make focusable to be able to move the textbox around
 
    //set position of textbox when generated
    div.style.position = "absolute";
    div.style.top = "25%";
 
    //attach textarea to div
    div.appendChild(text);
    document.body.appendChild(div); //attach div to body
 
    //run the following functions...
    makeDraggable();
    makeResizeable();
    focusDiv();
}
 
// Make text box container draggable
function makeDraggable() {
    $(".textDiv").draggable(); //jquery draggable
}
 
// Make text box resizeable
function makeResizeable() {
    $('textarea').each(function () { // for each text box...
    }).on('input', function () { // when adding text...
        if (this.scrollHeight > this.offsetHeight) { //scrollHeight is how far you scroll
            this.style.height = 'auto'; // prevent text box shrinking
            this.style.height = (this.scrollHeight) + 10 + 'px'; // sets height of box to scrollHeight
        }
    });
}
 
// If hovering over div, give it focus
function focusDiv() {
    $("div").each(function () { // for each text box...
        $(this).hover(function () { // when hovering...
            this.focus();
            prevText = document.activeElement.id;
        });
    });
}
 
// Delete that textbox!
function delBox() {
    if (prevText.includes("boxCount")) { //checks if prevText contains the word boxCount
        gid(prevText).remove(); //if true, removes the hovered textbox
    }
}
 
// Create desmos graphing calculator
var elt = document.getElementById('gCalc');
var calculator = Desmos.GraphingCalculator(elt);
 
//change visibility of graphing calculator
function graphCalc() {
    if (document.getElementById('gCalc').style.visibility == "visible") {
        document.getElementById('gCalc').style.visibility = "hidden";
    } else {
        document.getElementById('gCalc').style.visibility = "visible";
    }
}
