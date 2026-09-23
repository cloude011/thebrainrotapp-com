// Brainrot landing page — scroll reveals, stat count-ups, hero parallax, review marquee

// Arm the reveal styles (home.css hides .reveal only under html.js) from the
// same file that un-hides them: if this script is ever stale-cached, blocked,
// or fails to load, sections render visible instead of staying hidden.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ----- scroll reveal -----
    // home.css hides .reveal elements (under html.js only); this fades them
    // in as they enter the viewport. One-shot: unobserve after revealing.
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // ----- stat count-up -----
    // Parses "10K+" into 10 + "K+" and counts the number up from 0 when the
    // stat scrolls into view. Skipped under reduced motion.
    function countUp(el) {
        const match = el.textContent.trim().match(/^([\d,.]+)(.*)$/);
        if (!match) return;
        const target = parseFloat(match[1].replace(/,/g, ''));
        const suffix = match[2] || '';
        const duration = 1400;
        let startTime;
        function tick(now) {
            if (startTime === undefined) startTime = now;
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    const statNums = document.querySelectorAll('.stat-num');
    if ('IntersectionObserver' in window && !reduceMotion && statNums.length) {
        const statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    countUp(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        statNums.forEach(function (el) { statObserver.observe(el); });
    }

    // ----- review marquee -----
    // Duplicate the card group so the -50% keyframe loop wraps seamlessly.
    // The clone is decoration; hide it from screen readers.
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        const group = marqueeTrack.querySelector('.marquee-group');
        if (group) {
            const clone = group.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            marqueeTrack.appendChild(clone);
        }
    }
});
