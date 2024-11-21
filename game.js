const airplane = document.getElementById("airplane");
const obstacle = document.getElementById("obstacle");
const scoreElement = document.getElementById("score");

let score = 0;
let airplaneTop = 50;
let obstacleLeft = 100;
let isGameOver = false;

/* Move Airplane */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && airplaneTop > 0) {
        airplaneTop -= 20;
    } else if (e.key === "ArrowDown" && airplaneTop < window.innerHeight - 50) {
        airplaneTop += 20;
    }
    airplane.style.top = `${airplaneTop}px`;
});

/* Move Obstacle */
function moveObstacle() {
    if (isGameOver) return;
    obstacleLeft -= 5;

    if (obstacleLeft < -40) {
        obstacleLeft = window.innerWidth;
        obstacle.style.height = `${Math.random() * (window.innerHeight - 200) + 50}px`;
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }

    obstacle.style.left = `${obstacleLeft}px`;

    checkCollision();
    requestAnimationFrame(moveObstacle);
}

/* Check Collision */
function checkCollision() {
    const airplaneRect = airplane.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        airplaneRect.right > obstacleRect.left &&
        airplaneRect.left < obstacleRect.right &&
        airplaneRect.bottom > obstacleRect.top &&
        airplaneRect.top < obstacleRect.bottom
    ) {
        alert("Game Over! Your score is " + score);
        isGameOver = true;
        window.location.reload();
    }
}

/* Start Game */
moveObstacle();
