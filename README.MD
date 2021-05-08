# Boids Swarm Behavior Simulation

Access the simulation here: https://adi-swarm-intelligence-models.netlify.app/

Developed by Craig Reynolds in 1986, Boids is an artificial life program that simulates the flocking behavior of birds. The name “boid” itself refers to a shortened version of “bird-oid object”. Instead of controlling the interaction of the entire flock or swarm of birds, the Boids simulation only specifies the behavior of each individual bird with a few simple rules. The key aspect regarding this intelligence model is that the highly complex behavior of a multi-agent system can be explained by the simple interaction of many independent agents all working with incomplete information. With this aspect, Boids is able to effectively showcase emergent behavior in swarm systems, and by understanding the model foundation that creates this behavior, we can in turn gain the ability to direct and coordinate a swarm system by tuning its low-level ruleset. The model consists of a swarm of agents that each obeys three simple rules:

* Alignment: Each boid steers to match the average velocity of nearby boids
* Coherence: Each boid steers to move to the average position of nearby boids
* Separation: Each boid steers to avoid running into other boids

## Controls
The simulation is preset to the most ideal settings for the alignment, cohesion, and separation values on a swarm of 200 boids. The level of alignment, cohesion, and separation can all be controlled with the appropriate sliders. We can simulate any number of boids, however, a number is greater than 300 boids will slow the simulation down. This simulation also allows us to introduce obstacles to this multi-agent environment. By clicking on the” enable obstacle drawing” checkbox, you can draw obstacles into the simulation by clicking and dragging your mouse over the black canvas. There are three modes of interaction that we can set:

* Avoid: The boids will avoid the obstacle
* Collect: The boids will collect around
* Coverage: The boids will position themselves to cover the obstacle in a stable manner

## Now you can use this information to control the behavior of a swarm of boids!
