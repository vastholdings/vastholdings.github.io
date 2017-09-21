document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('snowflakes');
    var ctx = canvas.getContext('2d');

    var mp = 225; // max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * canvas.width, // x-coordinate
            y: Math.random() * canvas.height, // y-coordinate
            r: Math.random() * 4 + 1, // radius
            d: Math.random() * mp // density
        });
    }

    // Lets draw the flakes
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    // Function to move the snowflakes
    // angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update() {
        angle += 0.01;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            // Updating X and Y coordinates
            // We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            // Every particle has its own density which can be used to make the downward movement different for each flake
            // Lets make it more random by adding in the radius
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            // Sending flakes back from the top when it exits
            // Lets make it a bit more organic and let flakes enter from the left and right also.
            if (p.x > canvas.width + 5 || p.x < -5 || p.y > canvas.height) {
                if (i % 3 > 0) {
                    particles[i] = {x: Math.random() * canvas.width, y: -10, r: p.r, d: p.d};
                } else if (Math.sin(angle) > 0) {
                    // Enter from the left
                    particles[i] = {x: -5, y: Math.random() * canvas.height, r: p.r, d: p.d};
                } else {
                    // Enter from the right
                    particles[i] = {x: canvas.width + 5, y: Math.random() * canvas.height, r: p.r, d: p.d};
                }
            }
        }
    }

    // animation loop
    setInterval(draw, 70);
});
