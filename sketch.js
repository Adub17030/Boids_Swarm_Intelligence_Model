let flock = [];
let alignSlider, cohesionSlider, separationSlider;
let pressed,
    hazard,
    done = false;
var mxBegin, myBegin, mxEnd, myEnd;
var flag = false;
var remove = false;
var mode = 'none';

function setup() {
    alignSlider = createSlider(0, 2, 1.5, 0.1);
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    separationSlider = createSlider(0, 2, 2, 0.1);
    createCanvas(1300, 500);
    inp = createInput('Enter Number of Boids');
    checkbox = createCheckbox('Enable Obstacle Drawing', false);
    checkbox.changed(myCheckedEvent);
    sel = createSelect();
    sel.option('Set Mode');
    sel.option('Avoid');
    sel.option('Collect');
    sel.option('Coverage');
    sel.changed(mySelectEvent);
    button = createButton('Simulate');
    button.mousePressed(myInputEvent);

    for (let i = 0; i < 200; i++) {
        flock.push(new Boid());
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        myInputEvent();
    }
}

function myInputEvent() {
    flock = [];
    for (let i = 0; i < inp.value(); i++) {
        flock.push(new Boid());
    }
}

function mySelectEvent() {
    mode = sel.value();
    console.log(mode);
}
function myCheckedEvent() {
    remove = !remove;
    console.log(remove);
}

function draw() {
    background(0);
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock, hazard, mode);
        boid.update();
        boid.show();
    }
    if (!remove) {
        if (pressed && !done) {
            //draw obstacles
            fill(0, 0, 255, 180);
            stroke(255);
            rect(mxBegin, myBegin, mouseX - mxBegin, mouseY - myBegin);
            hazard = [mxBegin, myBegin, mouseX - mxBegin, mouseY - myBegin];
        }
        if (!pressed && done) {
            done = false;
        }
        if (!pressed && !done) {
            fill(0, 0, 255);
            stroke(255);
            strokeWeight(2);
            rect(mxBegin, myBegin, mxEnd - mxBegin, myEnd - myBegin);
        }
    } else {
        hazard = null;
    }
}

// Started Interaction
function mousePressed() {
    mxEnd = 0;
    myEnd = 0;
    mxBegin = mouseX;
    myBegin = mouseY;
    pressed = true;
}

// Stopped Interaction
function mouseReleased() {
    mxEnd = mouseX;
    myEnd = mouseY;
    pressed = false;
    done = true;
    flag = false;
}
