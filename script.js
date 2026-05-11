/* =========================================================
   MARSHMALLOW.BIRTHDAY · interactions
   ========================================================= */

/* ---------- Marshmallow Heart Loader ---------- */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Show only on first visit per session. Change to localStorage to make it once-ever.
  const seen = sessionStorage.getItem('marshmallow_seen');
  if (seen) {
    loader.style.display = 'none';
    document.body.style.overflow = '';
    return;
  }

  document.body.style.overflow = 'hidden';

  const counter = document.getElementById('loader-counter');
  const fillClip = document.getElementById('heart-fill-clip');
  const blobsGroup = document.getElementById('marsh-blobs');
  const heartShape = document.getElementById('heart-shape');

  // Marshmallow blob colors (pastels)
  const blobColors = ['#ffd6e8', '#b8d4ff', '#ffe9a8', '#c8f0d8', '#fffdf6', '#ffc4d9'];

  // Generate random marshmallow blobs that will rise inside the heart
  const numBlobs = 28;
  for (let i = 0; i < numBlobs; i++) {
    const cx = 30 + Math.random() * 140; // within heart bounds
    const cy = 200 - (i / numBlobs) * 180 + (Math.random() * 6 - 3);
    const r  = 9 + Math.random() * 6;
    const color = blobColors[Math.floor(Math.random() * blobColors.length)];

    const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse.setAttribute('cx', cx);
    ellipse.setAttribute('cy', cy);
    ellipse.setAttribute('rx', r);
    ellipse.setAttribute('ry', r * 0.85);
    ellipse.setAttribute('fill', color);
    ellipse.setAttribute('stroke', '#1c1612');
    ellipse.setAttribute('stroke-width', '1.2');
    ellipse.classList.add('marsh-blob');
    ellipse.style.animationDelay = (Math.random() * 2) + 's';
    blobsGroup.appendChild(ellipse);
  }

  // Animate the fill rect rising and counter ticking up
  const fillRect = document.getElementById('fill-rect');
  let progress = 0;
  const duration = 2400; // ms
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    progress = Math.min(elapsed / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 2.5);
    const y = 200 - eased * 200;
    fillRect.setAttribute('y', y);
    counter.textContent = Math.floor(eased * 100) + '%';

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = '100%';
      heartShape.classList.add('heart-pulse');
      setTimeout(() => {
        // Show cute enter button instead of auto-dismissing
        counter.style.transition = 'opacity 0.3s';
        counter.style.opacity = '0';
        setTimeout(() => { counter.style.display = 'none'; }, 300);

        const enterBtn = document.createElement('button');
        enterBtn.className = 'loader-enter-btn';
        enterBtn.innerHTML = '✨ let the celebration begin ✨';
        enterBtn.addEventListener('click', () => {
          loader.classList.add('done');
          document.body.style.overflow = '';
          sessionStorage.setItem('marshmallow_seen', '1');
          sessionStorage.setItem('marshmallow_interacted', '1');
          // Kick off home page music now that user has interacted
          const bgMusic = document.getElementById('page-bg-music');
          if (bgMusic) bgMusic.play().catch(() => {});
        });
        loader.appendChild(enterBtn);
      }, 700);
    }
  }
  requestAnimationFrame(tick);
})();

/* ---------- Caricature: hover labels ---------- */
(function initCaricature() {
  const zones = document.querySelectorAll('.cari-zone');
  if (!zones.length) return;

  zones.forEach(zone => {
    const labelId = zone.dataset.label;
    const label = document.getElementById(labelId);
    if (!label) return;

    zone.addEventListener('mouseenter', () => label.classList.add('show'));
    zone.addEventListener('mouseleave', () => label.classList.remove('show'));
    // Also show label briefly on touch (mobile)
    zone.addEventListener('touchstart', () => {
      label.classList.add('show');
      setTimeout(() => label.classList.remove('show'), 1500);
    });
  });
})();

/* ---------- Soundtrack: audio play/pause ---------- */
(function initSoundtrack() {
  const tracks = document.querySelectorAll('.track');
  if (!tracks.length) return;

  let currentlyPlaying = null;

  tracks.forEach(track => {
    const audio = track.querySelector('audio');
    const playBtn = track.querySelector('.track-play');
    if (!audio || !playBtn) return;

    const playIcon = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    const pauseIcon = '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';

    playBtn.innerHTML = playIcon;

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        // Stop any currently playing
        if (currentlyPlaying && currentlyPlaying !== audio) {
          currentlyPlaying.pause();
          currentlyPlaying.currentTime = 0;
          const prevBtn = currentlyPlaying.parentElement.querySelector('.track-play');
          if (prevBtn) {
            prevBtn.innerHTML = playIcon;
            prevBtn.classList.remove('playing');
          }
        }
        audio.play().catch(err => {
          // File missing — show a friendly message
          alert('🎵 Add this song as an mp3 to the /audio/ folder to play it!\n\nExpected file: ' + audio.querySelector('source').getAttribute('src'));
        });
        playBtn.innerHTML = pauseIcon;
        playBtn.classList.add('playing');
        currentlyPlaying = audio;
      } else {
        audio.pause();
        playBtn.innerHTML = playIcon;
        playBtn.classList.remove('playing');
        currentlyPlaying = null;
      }
    });

    audio.addEventListener('ended', () => {
      playBtn.innerHTML = playIcon;
      playBtn.classList.remove('playing');
      currentlyPlaying = null;
    });
  });
})();

/* ---------- Konami code: ABBA confetti! ---------- */
(function initKonami() {
  const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
                    'b', 'a'];
  let pos = 0;

  document.addEventListener('keydown', (e) => {
    const key = e.key;
    const expected = sequence[pos];
    if (key.toLowerCase() === expected.toLowerCase()) {
      pos++;
      if (pos === sequence.length) {
        triggerConfetti();
        pos = 0;
      }
    } else {
      pos = 0;
    }
  });

  function triggerConfetti() {
    const colors = ['#ff3d8a', '#4d6dff', '#ffd449', '#93dba8', '#ffc4d9'];
    const symbols = ['💗', '✨', '🎹', '🦉', '🌻', '🗼', '🎂'];

    for (let i = 0; i < 80; i++) {
      const piece = document.createElement('div');
      const isEmoji = Math.random() > 0.5;
      if (isEmoji) {
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        piece.style.fontSize = (16 + Math.random() * 20) + 'px';
      } else {
        piece.style.width = (8 + Math.random() * 8) + 'px';
        piece.style.height = (8 + Math.random() * 8) + 'px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.border = '1.5px solid #1c1612';
      }
      piece.style.position = 'fixed';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.top = '-30px';
      piece.style.zIndex = '9998';
      piece.style.pointerEvents = 'none';
      piece.style.transition = 'transform ' + (3 + Math.random() * 2) + 's linear, opacity 0.3s';
      document.body.appendChild(piece);

      requestAnimationFrame(() => {
        piece.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${window.innerHeight + 60}px) rotate(${Math.random() * 720}deg)`;
      });
      setTimeout(() => piece.remove(), 5500);
    }

    // Briefly show a message
    const msg = document.createElement('div');
    msg.textContent = '🎹 DANCING QUEEN 🎹';
    msg.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%) rotate(-3deg);
      font-family: 'Bagel Fat One', sans-serif;
      font-size: clamp(2rem, 6vw, 4rem);
      background: #ff3d8a;
      color: #fffdf6;
      border: 4px solid #1c1612;
      box-shadow: 8px 8px 0 #1c1612;
      padding: 20px 40px;
      z-index: 9999;
      letter-spacing: 2px;
      text-align: center;
    `;
    document.body.appendChild(msg);
    setTimeout(() => {
      msg.style.transition = 'opacity 0.4s, transform 0.4s';
      msg.style.opacity = '0';
      msg.style.transform = 'translate(-50%, -50%) rotate(-3deg) scale(0.8)';
      setTimeout(() => msg.remove(), 500);
    }, 1800);
  }
})();

/* ---------- Subtle scroll-driven background warmth ---------- */
(function initScrollGradient() {
  let ticking = false;
  function update() {
    const scrolled = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(scrolled / max, 1) : 0;
    // Shift hue from cool morning to warm sunset
    const hue1 = 50 + ratio * 10;
    const hue2 = 340 + ratio * 10;
    document.body.style.setProperty('background-image',
      `radial-gradient(ellipse at top left, hsla(${hue1}, 80%, 70%, 0.20), transparent 60%),
       radial-gradient(ellipse at bottom right, hsla(${hue2}, 80%, 65%, ${0.10 + ratio * 0.10}), transparent 60%),
       var(--grain-blur)`
    );
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
})();


/* ---------- Page Background Music (auto-play, silent if blocked) ---------- */
(function initPageMusic() {
  const audio = document.getElementById('page-bg-music');
  const pill  = document.getElementById('audio-pill');
  if (!audio) return;

  function tryAutoPlay() {
    // Only attempt if there's actually a src to play
    const src = audio.querySelector('source');
    if (!src || !src.getAttribute('src')) return;

    audio.play().then(() => {
      // Playing fine — show a faint pause pill so they can stop it if they want
      if (pill) pill.classList.add('playing');
    }).catch(() => {
      // Blocked — show the tap-to-play pill
      if (pill) pill.classList.add('needs-tap');
    });
  }

  if (pill) {
    pill.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          pill.classList.remove('needs-tap');
          pill.classList.add('playing');
        }).catch(() => {});
      } else {
        audio.pause();
        pill.classList.remove('playing');
        pill.classList.remove('needs-tap');
      }
    });
    audio.addEventListener('ended', () => {
      pill.classList.remove('playing');
    });
  }

  // On the home page, music is started by the loader button click.
  // On all other pages, try autoplay immediately (works if user previously
  // interacted on the home page within the same session).
  const isHome = document.querySelector('.loader-screen') !== null;
  if (!isHome) {
    tryAutoPlay();
  }
})();

/* ---------- Smart timeline media: placeholder-first, reveal on load ---------- */

// Called when the img loads successfully → show it, hide placeholder
function smartMediaLoaded(imgEl) {
  const slot = imgEl.closest('.smart-media-slot');
  if (!slot) return;
  const placeholder = slot.querySelector('.media-placeholder');
  imgEl.style.display = 'block';
  if (placeholder) placeholder.style.display = 'none';
}

// Called when img fails → try video; if that also fails, placeholder stays
function smartMediaImgFailed(imgEl, year) {
  const slot = imgEl.closest('.smart-media-slot');
  if (!slot) return;
  // img stays hidden (display:none already)
  const vid = slot.querySelector('.media-vid');
  const placeholder = slot.querySelector('.media-placeholder');
  if (!vid) return;

  vid.style.display = 'block';

  vid.addEventListener('loadeddata', function () {
    // Video loaded — hide placeholder
    if (placeholder) placeholder.style.display = 'none';
  }, { once: true });

  vid.addEventListener('error', function () {
    // Video also failed — hide it, keep placeholder visible
    vid.style.display = 'none';
  }, { once: true });
}

// Legacy alias (in case any old markup still references it)
function handleMediaFallback(imgEl, year) {
  smartMediaImgFailed(imgEl, year);
}
