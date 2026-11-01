/* =========================================================
   Dr. Mohammed Aman Ullah — Portfolio Scripts
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initFloatingSymbols();
    initNavbar();
    initActiveNav();
    initScrollReveal();
    initEquationTyping();
    initMathRain();
    initLissajous();
    initThreeScene();
});

/* =========================================================
   1. Floating math symbols in hero
   ========================================================= */
function initFloatingSymbols() {
    const symbols = ['∑', '∫', 'π', '∞', '√', 'Δ', 'θ', 'λ', '∂', '∇', '≈', '≠', '±', '×', '÷', 'ℝ', 'ℕ', 'ℤ', 'ℚ', 'ℂ'];
    const container = document.getElementById('heroSymbols');
    if (!container) return;

    for (let i = 0; i < 35; i++) {
        const span = document.createElement('span');
        span.className = 'symbol';
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const size = 20 + Math.random() * 60;
        span.style.fontSize = size + 'px';
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        span.style.animationDuration = (8 + Math.random() * 12) + 's';
        span.style.animationDelay = (Math.random() * 10) + 's';
        span.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(span);
    }
}

/* =========================================================
   2. Navbar scroll effect
   ========================================================= */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* =========================================================
   3. Active nav link
   ========================================================= */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });
}

/* =========================================================
   4. Scroll reveal
   ========================================================= */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    elements.forEach(el => observer.observe(el));
}

/* =========================================================
   5. Typing equation effect
   ========================================================= */
function initEquationTyping() {
    const el = document.getElementById('equation-cycle');
    if (!el) return;

    const equations = [
        'e^(iπ) + 1 = 0',
        '∫₀^∞ e^(-x²) dx = √π/2',
        '∑ 1/n² = π²/6',
        '∇ × B = μ₀J + μ₀ε₀ ∂E/∂t',
        'iℏ ∂ψ/∂t = Ĥψ',
        'a² + b² = c²'
    ];

    let idx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
        const current = equations[idx];

        if (!deleting) {
            charIdx++;
            el.textContent = current.substring(0, charIdx);
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(tick, 2000);
                return;
            }
            setTimeout(tick, 80);
        } else {
            charIdx--;
            el.textContent = current.substring(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                idx = (idx + 1) % equations.length;
                setTimeout(tick, 400);
                return;
            }
            setTimeout(tick, 35);
        }
    }
    tick();
}

/* =========================================================
   6. Falling mathematical equations (canvas 2D "math rain")
   ========================================================= */
function initMathRain() {
    const canvas = document.getElementById('rain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const equations = [
        '∫₀^∞ e^(-x²) dx = √π/2',
        'e^(iπ) + 1 = 0',
        '∑ 1/n² = π²/6',
        '∇ × B = μ₀J + μ₀ε₀ ∂E/∂t',
        'F = ma',
        'E = mc²',
        'a² + b² = c²',
        '∇ · E = ρ/ε₀',
        '∂u/∂t + u·∇u = -∇p/ρ + ν∇²u',
        'iℏ ∂ψ/∂t = Ĥψ',
        'det(A - λI) = 0',
        '∮ B·dl = μ₀I',
        'Σ F = dp/dt',
        'd/dx [x^n] = nx^(n-1)',
        'φ = (1 + √5) / 2',
        'ζ(s) = ∑ 1/n^s'
    ];

    let columns = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const colCount = Math.max(6, Math.floor(canvas.width / 220));
        columns = [];
        for (let i = 0; i < colCount; i++) {
            columns.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 0.3 + Math.random() * 0.7,
                equation: equations[Math.floor(Math.random() * equations.length)],
                opacity: 0.05 + Math.random() * 0.12
            });
        }
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px "Orbitron", monospace';

        columns.forEach(col => {
            ctx.globalAlpha = col.opacity;
            ctx.fillStyle = '#00f0ff';
            ctx.fillText(col.equation, col.x, col.y);

            col.y += col.speed;
            if (col.y > canvas.height + 50) {
                col.y = -50;
                col.equation = equations[Math.floor(Math.random() * equations.length)];
                col.x = Math.random() * canvas.width;
                col.opacity = 0.05 + Math.random() * 0.12;
            }
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    draw();
}

/* =========================================================
   7. Lissajous curve live visualization
   ========================================================= */
function initLissajous() {
    const canvas = document.getElementById('lissajous-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;

    function draw() {
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;

        // Fading trail
        ctx.fillStyle = 'rgba(5, 5, 20, 0.12)';
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const A = w * 0.35;
        const B = h * 0.35;
        const a = 3;
        const b = 2;
        const delta = Math.sin(t) * Math.PI;

        // Cyan main curve
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 240, 255, 0.7)';
        ctx.beginPath();
        for (let i = 0; i <= 300; i++) {
            const angle = (i / 300) * Math.PI * 2;
            const x = cx + A * Math.sin(a * angle + delta);
            const y = cy + B * Math.sin(b * angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Purple secondary curve (a=5, b=4)
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
        ctx.beginPath();
        for (let i = 0; i <= 400; i++) {
            const angle = (i / 400) * Math.PI * 2;
            const x = cx + A * 0.9 * Math.sin(5 * angle + delta * 0.7);
            const y = cy + B * 0.9 * Math.sin(4 * angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.shadowBlur = 0;

        t += 0.008;
        requestAnimationFrame(draw);
    }
    draw();
}

/* =========================================================
   8. Three.js 3D mathematical scene
      - Undulating surface (mathematical function)
      - Rotating torus knot
      - Particle field
      - Mouse parallax
   ========================================================= */
function initThreeScene() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded.');
        return;
    }

    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* ----- Undulating mathematical surface ----- */
    const surfaceGeo = new THREE.PlaneGeometry(20, 20, 100, 100);
    const verts = surfaceGeo.attributes.position.array;

    function updateSurface(time) {
        for (let i = 0; i < verts.length; i += 3) {
            const x = verts[i];
            const y = verts[i + 1];
            const r = Math.sqrt(x * x + y * y);
            verts[i + 2] =
                Math.sin(r * 1.5 + time * 2) * Math.exp(-r * 0.15) * 2.0 +
                Math.sin(x * 0.8 + time) * Math.cos(y * 0.8 + time) * 0.8;
        }
        surfaceGeo.attributes.position.needsUpdate = true;
        surfaceGeo.computeVertexNormals();
    }
    updateSurface(0);

    const surfaceMat = new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
        emissive: 0x004466,
        side: THREE.DoubleSide
    });
    const surface = new THREE.Mesh(surfaceGeo, surfaceMat);
    surface.rotation.x = -Math.PI / 2.4;
    surface.position.y = -2.2;
    scene.add(surface);

    /* ----- Rotating torus knot ----- */
    const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.32, 128, 16, 2, 3);
    const knotMat = new THREE.MeshPhongMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
        emissive: 0x2a0055
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(4, 1.2, -2);
    scene.add(knot);

    /* ----- Particle field ----- */
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 35;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
        color: 0x00f0ff,
        size: 0.06,
        transparent: true,
        opacity: 0.7
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* ----- Lights ----- */
    scene.add(new THREE.AmbientLight(0x404060));

    const light1 = new THREE.PointLight(0x00f0ff, 1.2, 40);
    light1.position.set(6, 8, 6);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xa855f7, 0.9, 40);
    light2.position.set(-6, 4, -6);
    scene.add(light2);

    /* ----- Mouse parallax ----- */
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ----- Animation loop ----- */
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.005;

        // Animate surface
        updateSurface(time);

        // Rotate knot
        knot.rotation.x = time * 0.6;
        knot.rotation.y = time * 0.4;

        // Rotate particles very slowly
        particles.rotation.y = time * 0.08;

        // Camera parallax
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 1.5 + 2 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }
    animate();

    /* ----- Resize ----- */
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}