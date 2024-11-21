// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("game-container").appendChild(renderer.domElement);

// Add Earth background
const earthTexture = new THREE.TextureLoader().load(
    "https://cdn.jsdelivr.net/gh/plotly/datasets@master/earth-surface.jpg"
);
const earthGeometry = new THREE.SphereGeometry(50, 64, 64);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.z = -100; // Place Earth far in the background
scene.add(earth);

// Create airplane
const airplaneGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
const airplaneMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 });
const airplane = new THREE.Mesh(airplaneGeometry, airplaneMaterial);
airplane.position.z = 0;
scene.add(airplane);

// Create obstacle
const obstacleGeometry = new THREE.BoxGeometry(1, Math.random() * 4 + 1, 0.5);
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0x228b22 });
const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
obstacle.position.set(10, Math.random() * 4 - 2, 0);
scene.add(obstacle);

// Add lighting
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

// Set camera position
camera.position.z = 5;

// Variables for movement and score
let speed = 0.05;
let airplaneY = 0;
let isGameOver = false;
let score = 0;

// Mobile controls
const upButton = document.getElementById("up-button");
const downButton = document.getElementById("down-button");

upButton.addEventListener("mousedown", () => (airplaneY += 0.2));
downButton.addEventListener("mousedown", () => (airplaneY -= 0.2));

// Keyboard controls
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") airplaneY += 0.2;
    if (e.key === "ArrowDown") airplaneY -= 0.2;
});

// Collision detection
function checkCollision() {
    const dx = Math.abs(airplane.position.x - obstacle.position.x);
    const dy = Math.abs(airplane.position.y - obstacle.position.y);

    if (dx < 1 && dy < 1) {
        alert(`Game Over! Your score: ${score}`);
        isGameOver = true;
        window.location.reload();
    }
}

// Rotate Earth
function rotateEarth() {
    earth.rotation.y += 0.001;
}

// Game loop
function animate() {
    if (isGameOver) return;

    // Move airplane
    airplane.position.y = airplaneY;

    // Move obstacle
    obstacle.position.x -= speed;
    if (obstacle.position.x < -10) {
        obstacle.position.x = 10;
        obstacle.position.y = Math.random() * 4 - 2;
        score++;
        speed += 0.01; // Increase speed over time
    }

    // Rotate Earth
    rotateEarth();

    // Check collision
    checkCollision();

    // Render scene
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

// Start game
animate();
