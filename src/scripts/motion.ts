import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const motion = gsap.matchMedia();
motion.add('(prefers-reduced-motion: no-preference)', () => {
  // Entrance motion ends quickly; every section stays in normal document flow.
  const opening = document.querySelector('.home-opening');
  if (opening) {
    gsap.from('.opening-line > span', {
      yPercent: 110, duration: .85, stagger: .085, ease: 'power3.out', clearProps: 'transform',
    });
    gsap.from('.harbour-print', {
      opacity: 0, y: 18, duration: 1, delay: .12, ease: 'power3.out', clearProps: 'opacity,transform',
    });
    gsap.to('.harbour-sun', {
      y: 24, ease: 'none', scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .6 },
    });
    gsap.to('.harbour-boat', {
      x: 45, ease: 'none', scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .6 },
    });
  }
  document.querySelectorAll<HTMLElement>('[data-reveal], .project-card, .page-hero h1').forEach((element) => {
    gsap.from(element, {
      y: 16, opacity: 0, duration: .65, ease: 'power2.out', clearProps: 'opacity,transform',
      scrollTrigger: { trigger: element, start: 'top 94%', once: true },
    });
  });
});
