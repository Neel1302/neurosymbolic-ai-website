document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-nav');

  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && menu && nav) {
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Reveal staggered capability rows and autoplay clips in view.
  const capabilityRows = document.querySelectorAll('.capability');
  const capabilityVideos = document.querySelectorAll('.capability-video video');
  if (capabilityRows.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-inview');
          revealObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -8% 0px' }
    );
    capabilityRows.forEach((row) => revealObserver.observe(row));
  } else {
    capabilityRows.forEach((row) => row.classList.add('is-inview'));
  }

  if (capabilityVideos.length && 'IntersectionObserver' in window) {
    const playObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.35 }
    );
    capabilityVideos.forEach((video) => playObserver.observe(video));
  }

  // Logistics demo iframe switching (dedicated page + legacy embeds).
  const demoSection = document.getElementById('logistics-demo');
  if (demoSection) {
    const viewButtons = demoSection.querySelectorAll('button[aria-controls]');
    const pipeline = document.getElementById('logistics-pipeline');
    let activeFrame = pipeline;
    let fitting = false;

    function loadDemoFrame(frame) {
      if (frame && !frame.hasAttribute('src')) frame.src = frame.dataset.src;
    }

    function measureFrameContent(frame) {
      const doc = frame.contentDocument;
      const body = doc?.body;
      if (!body) return 0;
      // Prefer the last real content node so a tall iframe does not inflate scrollHeight.
      const bottom =
        body.querySelector('.controls') ||
        body.querySelector('main') ||
        body.lastElementChild;
      if (!bottom) return 0;
      const padBottom = parseFloat(getComputedStyle(body).paddingBottom) || 0;
      const bodyTop = body.getBoundingClientRect().top;
      return Math.ceil(bottom.getBoundingClientRect().bottom - bodyTop + padBottom + 8);
    }

    function fitDemoFrame(frame) {
      if (!frame || frame.hidden || !frame.hasAttribute('src') || fitting) return;
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      fitting = true;
      doc.documentElement.style.overflow = 'visible';
      doc.body.style.overflow = 'visible';
      // Temporarily tall so getBoundingClientRect is not clipped by a short frame.
      frame.style.height = '2400px';
      const height = measureFrameContent(frame);
      frame.style.height = `${Math.max(height, 720)}px`;
      doc.documentElement.style.overflow = 'hidden';
      doc.body.style.overflow = 'hidden';
      fitting = false;
    }

    loadDemoFrame(activeFrame);

    for (const button of viewButtons) {
      const frame = document.getElementById(button.getAttribute('aria-controls'));
      if (!frame) continue;

      frame.setAttribute('scrolling', 'no');

      frame.addEventListener('load', () => {
        if (!frame.contentDocument || !frame.hasAttribute('src')) return;
        fitDemoFrame(frame);
        requestAnimationFrame(() => fitDemoFrame(frame));
        setTimeout(() => fitDemoFrame(frame), 150);
        setTimeout(() => fitDemoFrame(frame), 500);
      });

      button.addEventListener('click', () => {
        if (frame === activeFrame) return;

        if (activeFrame === pipeline) {
          pipeline?.contentDocument?.dispatchEvent(new Event('pause-pipeline'));
        }

        activeFrame.hidden = true;
        frame.hidden = false;
        activeFrame = frame;
        for (const viewButton of viewButtons) {
          viewButton.setAttribute('aria-pressed', String(viewButton === button));
        }
        loadDemoFrame(frame);
        fitDemoFrame(frame);
      });
    }

    window.addEventListener('resize', () => fitDemoFrame(activeFrame), { passive: true });
  }

  // RevGuard iframe lazy-load if embedded on a host page.
  const revguardFrame = document.getElementById('revguard-frame');
  if (revguardFrame) {
    revguardFrame.addEventListener('load', () => {
      const frameBody = revguardFrame.contentDocument?.body;
      if (!frameBody || !revguardFrame.hasAttribute('src')) return;

      const resize = () => {
        revguardFrame.style.height = `${Math.ceil(frameBody.getBoundingClientRect().height) + 2}px`;
      };
      const observer = new ResizeObserver(resize);
      observer.observe(frameBody);
      resize();
    });

    const revguardObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      revguardFrame.src = revguardFrame.dataset.src;
      revguardObserver.disconnect();
    });
    revguardObserver.observe(revguardFrame);
  }
});
