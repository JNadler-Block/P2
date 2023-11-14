title = "Paddle";

const G = {
	WIDTH: 100,
	HEIGHT: 100
};

description = `
				[Tap]

	to Hit Ball
`;

characters = [];

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	theme: "shapeDark"
};	

let ballX;
let ballY;
let ballVelX = 0;
let ballVelY = 0;
let playerX = G.WIDTH * 0.5;
let playerStartY = G.WIDTH * 0.8;
let playerY = G.WIDTH * 0.8;
let playerWidth = G.WIDTH * 0.3;;
let playerHeight = G.HEIGHT * 0.05;;
let gravity;
let ballDown;

let player;
let ball;

let timerChange = 40;
let timer = timerChange;
let cooldown = 0;
let cooldownDuration = 0.5 * 60;
let moveUp = false; 
let moveDown = false; 
let moveDuration = 10;
let duration = moveDuration;

let collided;

function update() {
	if (!ticks) {
		ballX = 50;
		ballY = 0;
		ballVelY = 0;
		gravity = 0.1;
		timer = timerChange;
		collided = false;
		ballDown = true;
	}

	if (ballY <= 0 && !ballDown) {
		gravity = 0;
		timer--;
	}
	if (timer === 0) {
		ballX = 50;
		ballY = 0;
		ballVelY = 0;
		gravity = rnd(0.08, 0.15);
		timer = timerChange;
		collided = false;
		ballDown = true;
	}

	ballX += ballVelX;
  	ballY += ballVelY;

	ballVelY += gravity;

	if (cooldown > 0) {
		cooldown--;
	}
	if (input.isPressed && cooldown === 0) {
		cooldown = cooldownDuration;
		moveUp = true;
		duration = moveDuration;
	}
	MovePaddle();

	color('black');
	ball = box(ballX, ballY, 5); // check
	color('cyan');
	player = box(playerX, playerY, playerWidth, playerHeight);
	if (player.isColliding.rect.black && !collided) {
		collided = true;
		ballDown = false;
		ballVelY = -5;
		if (playerStartY - playerY < 5) {
			end();
		}
		addScore(ScoreCalculation());
	}
}

function ScoreCalculation() {
	if (playerStartY - playerY === 10) {
		return 3;
	}
	else if (playerStartY - playerY === 9) {
		return 2;
	}
	else if (playerStartY - playerY >= 5) {
		return 1;
	}
	else {
		return 0;
	}
}

function MovePaddle() {
	if (moveUp) {
		duration--;
		playerY--;
		if (duration === 0) {
			moveUp = false;
			moveDown = true;
			duration = moveDuration;
		}
	}
	else if (moveDown) {
		duration--;
		playerY++;
		if (duration === 0) {
			moveDown = false;
			duration = moveDuration;
		}
	}
}
