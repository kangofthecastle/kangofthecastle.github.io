import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const motion = gsap.matchMedia();
motion.add('(prefers-reduced-motion: no-preference)', () => {
  const opening = document.querySelector<HTMLElement>('.home-opening');
  const harbour = document.querySelector<HTMLElement>('[data-harbour]');
  if (opening && harbour) {
    // The print assembles in layers, then becomes a quietly living harbour.
    const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
    entrance
      .from('.opening-line > span', { yPercent: 110, duration: .95, stagger: .1, clearProps: 'transform' }, 0)
      .from(harbour, { opacity: 0, y: 25, duration: .8, clearProps: 'opacity,transform' }, .05)
      .from('.harbour-sun-rise', { y: 150, scale: .7, opacity: 0, duration: 1.6 }, .15)
      .from('.harbour-ranges > path', { y: 100, opacity: 0, duration: 1.15, stagger: .07 }, .3)
      .from('.harbour-city', { y: 55, opacity: 0, duration: 1 }, .65)
      .from('.harbour-boat-entry', { x: -210, opacity: 0, duration: 1.6 }, .8);

    const ambient = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
    ambient
      .to('.harbour-boat', { x: 330, duration: 18, ease: 'sine.inOut' }, 0)
      .to('.harbour-halo', { opacity: .25, duration: 9, ease: 'sine.inOut', repeat: 1, yoyo: true }, 0)
      .to('[data-water-pattern]', { attr: { patternTransform: 'translate(120 0)' }, duration: 18, ease: 'none' }, 0);
    ScrollTrigger.create({
      trigger: opening, start: 'top bottom', end: 'bottom top',
      onToggle: ({ isActive }) => { if (isActive && entrance.progress() === 1) ambient.play(); else ambient.pause(); },
    });
    entrance.eventCallback('onComplete', () => {
      if (opening.getBoundingClientRect().bottom > 0) ambient.play();
    });
    // Scroll lifts the sun and opens the landscape; the page keeps scrolling naturally.
    gsap.to('.harbour-sun', {
      y: -48, scale: 1.12, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .7 },
    });
    gsap.to('.harbour-ranges', {
      y: -18, ease: 'none',
      scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .7 },
    });
    gsap.to('.home-opening__copy', {
      y: -35, ease: 'none',
      scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .7 },
    });
  }

  document.querySelectorAll<HTMLElement>('[data-reveal], .project-card, .page-hero h1').forEach((element) => {
    if (element.classList.contains('work-media')) return;
    gsap.from(element, {
      y: 24, opacity: 0, duration: .75, ease: 'power3.out', clearProps: 'opacity,transform',
      scrollTrigger: { trigger: element, start: 'top 94%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('.work-media').forEach((media) => {
    const images = media.querySelectorAll<HTMLImageElement>(':scope > img');
    const reveal = gsap.timeline({ scrollTrigger: { trigger: media, start: 'top 92%', once: true } });
    reveal.from(media, { clipPath: 'inset(16% 0 0 0)', opacity: 0, duration: .9, ease: 'power3.out', clearProps: 'clipPath,opacity' });
    if (media.classList.contains('work-media--hubris')) {
      reveal.from(images, { scale: .92, rotate: (index) => index ? 4 : -4, duration: 1.1, stagger: .12, ease: 'power3.out' }, .1);
      gsap.fromTo(images, { y: 0 }, {
        immediateRender: false, y: (index) => index ? -24 : 24, ease: 'none',
        scrollTrigger: { trigger: media, start: 'top 75%', end: 'bottom top', scrub: .8 },
      });
    }
    if (media.classList.contains('work-media--agame')) {
      media.classList.add('motion-ready');
      reveal.from('.agame-inset', { scale: .85, rotate: -5, opacity: 0, duration: 1.1, ease: 'power3.out' }, .2);
      gsap.to(media.querySelector('.agame-ending'), {
        clipPath: 'inset(0% 0 0 0)', ease: 'none',
        scrollTrigger: { trigger: media, start: 'top 45%', end: 'bottom 35%', scrub: .7 },
      });
      gsap.fromTo('.agame-inset', { y: 0 }, {
        immediateRender: false, y: -20, ease: 'none',
        scrollTrigger: { trigger: media, start: 'top 75%', end: 'bottom top', scrub: .8 },
      });
    }
  });

  // Pointer depth is a small enhancement for a fine pointer, never a mobile requirement.
  const pointerMedia = gsap.matchMedia();
  pointerMedia.add('(hover: hover) and (pointer: fine)', () => {
    if (!harbour) return;
    const art = harbour.querySelector('svg');
    const rotateX = gsap.quickTo(art, 'rotationX', { duration: .7, ease: 'power3.out' });
    const rotateY = gsap.quickTo(art, 'rotationY', { duration: .7, ease: 'power3.out' });
    const move = (event: PointerEvent) => {
      const bounds = harbour.getBoundingClientRect();
      rotateX(((event.clientY - bounds.top) / bounds.height - .5) * -5);
      rotateY(((event.clientX - bounds.left) / bounds.width - .5) * 6);
    };
    const leave = () => { rotateX(0); rotateY(0); };
    harbour.addEventListener('pointermove', move);
    harbour.addEventListener('pointerleave', leave);
    return () => {
      harbour.removeEventListener('pointermove', move);
      harbour.removeEventListener('pointerleave', leave);
    };
  });
  return () => {
    pointerMedia.revert();
    document.querySelector('.work-media--agame')?.classList.remove('motion-ready');
  };
});
