document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // ELEMENTS
    // ============================
    const screens = {
        surprise: document.getElementById('screen-surprise'),
        dare: document.getElementById('screen-dare'),
        love: document.getElementById('screen-love'),
        thanks: document.getElementById('screen-thanks'),
        smile: document.getElementById('screen-smile'),
        birthday: document.getElementById('screen-birthday'),
    };

    const bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.5;

    // ============================
    // FLOATING HEARTS BACKGROUND
    // ============================
    const heartsContainer = document.getElementById('floating-hearts-bg');
    const heartSymbols = ['💕', '💗', '💖', '🩷', '♥', '❤️', '💘'];

    function spawnBgHeart() {
        if (!heartsContainer) return;
        const heart = document.createElement('span');
        heart.classList.add('float-heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = (Math.random() * 100) + 'vw';
        heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        heart.style.animationDuration = (Math.random() * 10 + 12) + 's';
        heart.style.animationDelay = (Math.random() * 2) + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 24000);
    }

    // Spawn hearts slowly for subtle effect
    setInterval(spawnBgHeart, 1200);
    for (let i = 0; i < 12; i++) {
        setTimeout(spawnBgHeart, i * 300);
    }

    // ============================
    // SMOOTH SCREEN TRANSITION
    // ============================
    function goToScreen(fromKey, toKey, delay = 700) {
        const from = screens[fromKey];
        const to = screens[toKey];

        // Sparkle burst on transition
        spawnSparkles(10);

        // Fade out current screen
        from.classList.add('fade-out');
        from.classList.remove('active');

        // After the fade-out, show next screen
        setTimeout(() => {
            from.classList.remove('fade-out');
            to.classList.add('active');
        }, delay);
    }

    // ============================
    // SPARKLE EFFECT
    // ============================
    function spawnSparkles(count) {
        const colors = ['#FF4D6D', '#FF7A95', '#FFB6C8', '#FF6B8A', '#E8365A', '#FFD700', '#FF85A2'];
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = (Math.random() * 80 + 10) + 'vw';
            sparkle.style.top = (Math.random() * 80 + 10) + 'vh';
            sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.width = (Math.random() * 6 + 4) + 'px';
            sparkle.style.height = sparkle.style.width;
            sparkle.style.animationDelay = (Math.random() * 0.4) + 's';
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }
    }

    // ============================
    // CELEBRATION HEARTS BURST
    // ============================
    function burstHearts(count = 12) {
        for (let i = 0; i < count; i++) {
            const h = document.createElement('div');
            h.classList.add('celebration-heart');
            h.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            h.style.left = (Math.random() * 70 + 15) + 'vw';
            h.style.top = (Math.random() * 40 + 40) + 'vh';
            h.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            h.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
            h.style.animationDelay = (Math.random() * 0.3) + 's';
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 5000);
        }
    }

    // ============================
    // SCREEN 1: "Ready for a Small Surprise?"
    // ============================
    const btnSurpriseYes = document.getElementById('btn-surprise-yes');
    const btnSurpriseNo = document.getElementById('btn-surprise-no');

    btnSurpriseYes.addEventListener('click', () => {
        burstHearts(10);
        goToScreen('surprise', 'love');
    });

    btnSurpriseNo.addEventListener('click', () => {
        goToScreen('surprise', 'dare');
    });

    // ============================
    // SCREEN 2: "How dare you, click YES!"
    // ============================
    const btnFine = document.getElementById('btn-fine');

    btnFine.addEventListener('click', () => {
        burstHearts(6);
        goToScreen('dare', 'love');
    });

    // ============================
    // SCREEN 3: "Do You Love Me?"
    // ============================
    const btnLoveYes = document.getElementById('btn-love-yes');
    const btnLoveNo = document.getElementById('btn-love-no');
    const noBtnOriginalParent = btnLoveNo.parentElement; // Save original parent (.btn-row)

    btnLoveYes.addEventListener('click', () => {
        // Reset NO button before transitioning
        resetLoveNoBtn();
        burstHearts(12);
        goToScreen('love', 'thanks');
    });

    // Escaping NO button
    let noClickCount = 0;
    const noMessages = ["You sure? 🥺", "Try again...", "Wrong button!", "Uh uh uh!", "CLICK YES! 😤"];
    let isEscaping = false;

    function resetLoveNoBtn() {
        noClickCount = 0;
        isEscaping = false;

        // Hide button immediately so it doesn't persist on later screens
        btnLoveNo.style.display = 'none';

        // Clear all inline styles
        btnLoveNo.textContent = 'NO';
        btnLoveNo.style.position = '';
        btnLoveNo.style.left = '';
        btnLoveNo.style.top = '';
        btnLoveNo.style.zIndex = '';
        btnLoveNo.style.fontSize = '';
        btnLoveNo.style.transition = '';
        btnLoveYes.style.transform = '';
        btnLoveYes.style.transition = '';

        // Move button back to its original parent if it was moved to body
        if (btnLoveNo.parentElement !== noBtnOriginalParent) {
            noBtnOriginalParent.appendChild(btnLoveNo);
        }

        // Restore visibility now that it's safely back in its container
        btnLoveNo.style.display = '';
    }

    function escapeLoveNo() {
        if (isEscaping) return;
        isEscaping = true;

        noClickCount++;

        // After 7 attempts, the NO button disappears completely
        if (noClickCount >= 7) {
            btnLoveNo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            btnLoveNo.style.opacity = '0';
            btnLoveNo.style.transform = 'scale(0.3) rotate(45deg)';
            setTimeout(() => {
                btnLoveNo.style.display = 'none';
            }, 500);
            isEscaping = false;
            return;
        }

        // CRITICAL FIX: Move button to document.body BEFORE setting position:fixed.
        // The .heart-container has a CSS transform animation, which creates a new
        // containing block for position:fixed children. This causes the button's
        // coordinates to be relative to the container instead of the viewport,
        // making it fly off-screen. Moving it to body fixes this.
        if (btnLoveNo.parentElement !== document.body) {
            document.body.appendChild(btnLoveNo);
        }

        btnLoveNo.style.position = 'fixed';
        btnLoveNo.style.zIndex = '999';

        const btnW = btnLoveNo.offsetWidth || 120;
        const btnH = btnLoveNo.offsetHeight || 45;
        const padding = 40;
        const maxX = window.innerWidth - btnW - padding;
        const maxY = window.innerHeight - btnH - padding;
        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        // Apply position immediately, then animate on next frame
        btnLoveNo.style.left = randomX + 'px';
        btnLoveNo.style.top = randomY + 'px';

        // After first move, enable transitions for smooth movement on subsequent escapes
        requestAnimationFrame(() => {
            btnLoveNo.style.transition = 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        // Update button text with each escape
        if (noClickCount <= noMessages.length) {
            btnLoveNo.textContent = noMessages[noClickCount - 1];
        } else {
            btnLoveNo.textContent = '😤';
            btnLoveNo.style.fontSize = '1.2rem';
        }

        // Make YES button grow smoothly with each NO attempt
        const scale = 1 + (noClickCount * 0.15);
        btnLoveYes.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        btnLoveYes.style.transform = `scale(${Math.min(scale, 2.2)})`;

        // Allow triggering again after cooldown
        setTimeout(() => { isEscaping = false; }, 400);
    }

    // Desktop: escape on hover
    btnLoveNo.addEventListener('mouseenter', () => {
        escapeLoveNo();
    });

    // Desktop: clicking NO also escapes
    btnLoveNo.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        escapeLoveNo();
    });

    // Mobile: touchstart escapes the button
    btnLoveNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        escapeLoveNo();
    }, { passive: false });

    // Mobile: touchend to prevent ghost clicks
    btnLoveNo.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });

    // ============================
    // SCREEN 4: "Thanks!!"
    // ============================
    const btnClickHere = document.getElementById('btn-click-here');

    btnClickHere.addEventListener('click', () => {
        burstHearts(8);
        goToScreen('thanks', 'smile');
    });

    // ============================
    // SCREEN 5: "Do You Know, I Love Your Smile?"
    // ============================
    const btnSmileYes = document.getElementById('btn-smile-yes');
    const btnSmileOhYes = document.getElementById('btn-smile-ohyes');

    function goToBirthday() {
        burstHearts(18);

        // Smooth background change
        document.body.style.transition = 'background 1.5s ease';
        document.body.style.background = '#FFF0F0';

        // Fade out floating hearts
        if (heartsContainer) {
            heartsContainer.style.transition = 'opacity 1s ease';
            heartsContainer.style.opacity = '0';
            setTimeout(() => { heartsContainer.style.display = 'none'; }, 1200);
        }

        goToScreen('smile', 'birthday', 900);

        // Start music after a beat
        setTimeout(() => {
            bgMusic.play().catch(e => {
                console.log('Music autoplay blocked:', e);
            });
        }, 1200);

        // Confetti!
        setTimeout(() => {
            if (typeof confetti !== 'undefined') {
                const duration = 5000;
                const end = Date.now() + duration;
                (function frame() {
                    confetti({
                        particleCount: 4,
                        angle: 60,
                        spread: 60,
                        origin: { x: 0, y: 0.65 },
                        colors: ['#FF4D6D', '#FFB6C8', '#FF7A95', '#E8365A', '#FFD700', '#FF85A2']
                    });
                    confetti({
                        particleCount: 4,
                        angle: 120,
                        spread: 60,
                        origin: { x: 1, y: 0.65 },
                        colors: ['#FF4D6D', '#FFB6C8', '#FF7A95', '#E8365A', '#FFD700', '#FF85A2']
                    });
                    if (Date.now() < end) requestAnimationFrame(frame);
                }());
            }
        }, 1500);
    }

    btnSmileYes.addEventListener('click', goToBirthday);
    btnSmileOhYes.addEventListener('click', goToBirthday);

    // ============================
    // BIRTHDAY CARD: MUSIC PLAYER
    // ============================
    const playBtn = document.getElementById('play-btn');
    const progressFill = document.getElementById('progress-fill');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            playBtn.textContent = '▶';
            isPlaying = false;
        } else {
            bgMusic.play().catch(e => console.log('Play error:', e));
            playBtn.textContent = '⏸';
            isPlaying = true;
        }
    });

    bgMusic.addEventListener('timeupdate', () => {
        if (bgMusic.duration) {
            const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
            progressFill.style.width = progress + '%';
        }
    });

    bgMusic.addEventListener('play', () => {
        playBtn.textContent = '⏸';
        isPlaying = true;
    });

    bgMusic.addEventListener('pause', () => {
        playBtn.textContent = '▶';
        isPlaying = false;
    });

});
