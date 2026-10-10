import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initGsapAnimations() {
  if (typeof window === 'undefined') return;

  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Show all elements without animated transforms
    document.querySelectorAll('.gsap-hero-crest, .gsap-hero-title, .gsap-hero-sub, .gsap-hero-btn, .gsap-reveal-batch, .gsap-milestone-card').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return;
  }

  // Teardown previous ScrollTrigger instances to prevent memory leaks during page navigation
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // 1. Hero Entrance Timeline
  const heroTitle = document.querySelector('.gsap-hero-title');
  if (heroTitle) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (document.querySelector('.gsap-hero-crest')) {
      heroTl.fromTo('.gsap-hero-crest', { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 });
    }

    heroTl.fromTo('.gsap-hero-title', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, '-=0.5');

    if (document.querySelector('.gsap-hero-sub')) {
      heroTl.fromTo('.gsap-hero-sub', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, '-=0.6');
    }

    if (document.querySelectorAll('.gsap-hero-btn').length > 0) {
      heroTl.fromTo('.gsap-hero-btn', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.5');
    }
  }

  // 2. Parallax Backdrop Scrubbing
  const parallaxBg = document.querySelector('.gsap-parallax-bg');
  const heroSection = document.querySelector('.hero-section');
  if (parallaxBg && heroSection) {
    gsap.to(parallaxBg, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // 3. Animated Metric Counters
  const counters = document.querySelectorAll('.gsap-counter');
  counters.forEach((counter) => {
    const targetVal = parseInt(counter.getAttribute('data-target') || '0', 10);
    const suffix = counter.getAttribute('data-suffix') || '';
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val) + suffix;
          },
        });
      },
    });
  });

  // 4. Milestone Timeline Line Scrub
  const milestoneLine = document.querySelector('.gsap-milestone-line');
  const milestoneContainer = document.querySelector('.gsap-milestone-container');
  if (milestoneLine && milestoneContainer) {
    gsap.fromTo(
      milestoneLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: milestoneContainer,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 0.5,
        },
      }
    );

    const milestoneCards = document.querySelectorAll('.gsap-milestone-card');
    milestoneCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // 5. Batch Reveal for Cards & Circulars
  const batchElements = document.querySelectorAll('.gsap-reveal-batch');
  if (batchElements.length > 0) {
    ScrollTrigger.batch('.gsap-reveal-batch', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            overwrite: 'auto',
          }
        );
      },
    });
  }

  // Refresh ScrollTrigger calculations after initial paint
  ScrollTrigger.refresh();
}
