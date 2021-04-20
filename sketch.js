// Flocking

let flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    alignSlider = createSlider(0, 2, 1.5, 0.1);
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    separationSlider = createSlider(0, 2, 2, 0.1);
    createCanvas(1300, 500);
    inp = createInput('Enter Number of Boids');
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

function draw() {
    background(0);
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}
