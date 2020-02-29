const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let particles = [];
let colors = [
    'green',
    'red',
    'blue',
    'white',
    'yellow'
]
function setCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function makeParticle(x, y, radius, color) {
    let velocity = 0.01;
    let radians = Math.random() * Math.PI * 2;

    const update = () => {
        const lastPoint = {x, y};
        radians += velocity;

        // Circular motion
        x = x + Math.cos(radians) * 5;
        y = y + Math.sin(radians) * 5;
        draw(lastPoint);
    }
    const draw = (lastPoint) => {
        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(x, y);
        c.stroke();
        c.closePath();       
    }
    return {x, y, radius, color, update}
}

function animate() {
    let lastSize = window.innerWidth;
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0,0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    })
}

async function makeBoom(color, x, y, timer) {
    for (let i = 0; i < 50; i++){
        particles.push(makeParticle(x, y, 4, color));
    }
    await new Promise(resolve => setTimeout(resolve, timer));
    particles.splice(0, 50);
}

async function init() {
    makeBoom('red', canvas.width / 4, canvas.height / 3, 3000);
    await new Promise(resolve => setTimeout(resolve, 500));    
    makeBoom('yellow', canvas.width / 1.5, canvas.height / 1.5, 3000);
    await new Promise(resolve => setTimeout(resolve, 2500));
    makeBoom('purple', canvas.width / 4, canvas.height / 1.5, 3000);
    await new Promise(resolve => setTimeout(resolve, 500));    
    makeBoom('blue', canvas.width / 1.5, canvas.height / 3, 3000);
    await new Promise(resolve => setTimeout(resolve, 2500));   
    makeBoom('white', canvas.width / 4, canvas.height / 3, 3000);
    await new Promise(resolve => setTimeout(resolve, 500));  
    makeBoom('green', canvas.width / 1.5, canvas.height / 1.5, 3000);
    await new Promise(resolve => setTimeout(resolve, 2500));    

    init();
}

setCanvas();
c.fillRect(0,0, canvas.width, canvas.height);
init();

animate();
window.addEventListener('click', (e)=> {
    makeBoom(colors[(Math.floor(Math.random() * 10) + 1) / 2 - 1], e.clientX, e.clientY, 3000);
});