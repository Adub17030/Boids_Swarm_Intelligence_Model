class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 5;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    obstacle(hazard, mode) {
        if (hazard) {
            let perceptionRadius = 75;

            let d = dist(
                this.position.x,
                this.position.y,
                hazard[0] + hazard[2] / 2,
                hazard[1] + hazard[3] / 2
            );

            if (d < perceptionRadius) {
                if (mode === 'Avoid') {
                    this.velocity.mult(-1);
                }
                if (mode === 'Collect') {
                    this.velocity.mult(0);
                }
                if (mode === 'Coverage') {
                    this.velocity.rotate(Math.PI);
                    this.velocity.mult(-0.5);
                }
            }
        }
    }

    align(boids) {
        let perceptionRadius = 25;
        let steer = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && d < perceptionRadius) {
                steer.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steer.div(total);
            steer.setMag(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }

    separation(boids) {
        let perceptionRadius = 24;
        let steer = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                steer.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steer.div(total);
            steer.setMag(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }

    cohesion(boids) {
        let perceptionRadius = 50;
        let steer = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && d < perceptionRadius) {
                steer.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steer.div(total);
            steer.sub(this.position);
            steer.setMag(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }

    flock(boids, hazard, mode = 'none') {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        if (hazard) {
            this.obstacle(hazard, mode);
        }
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(6);
        stroke('orange');
        point(this.position.x, this.position.y);
    }
}
