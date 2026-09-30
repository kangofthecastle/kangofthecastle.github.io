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
      y: -110, scale: 1.35, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .7 },
    });
    gsap.to('.harbour-ranges', {
      y: -60, ease: 'none',
      scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .7 },
    });
    gsap.to('.harbour-window svg', { scale: 1.16, ease: 'none', scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .7 } });
    gsap.to('.home-opening__copy', {
      y: -85, ease: 'none',
      scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: .7 },
    });
  }

  document.querySelectorAll<HTMLElement>('[data-reveal], .project-card, .page-hero h1').forEach((element) => {
    if (element.closest('.work-index')) return;
    gsap.from(element, {
      y: 24, opacity: 0, duration: .75, ease: 'power3.out', clearProps: 'opacity,transform',
      scrollTrigger: { trigger: element, start: 'top 94%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('.home-secondary .secondary-heading, .home-secondary .software-item').forEach((element, index) => {
    gsap.from(element, {
      y: 28, opacity: 0, duration: .7, delay: index * .14,
      ease: 'power3.out', clearProps: 'opacity,transform',
      scrollTrigger: { trigger: element, start: 'top 78%', once: true },
    });
  });

  // Give the artwork a clear edge-and-corner response with a smooth return to rest.
  const pointerMedia = gsap.matchMedia();
  pointerMedia.add('(hover: hover) and (pointer: fine)', () => {
    if (!harbour) return;
    const art = harbour.querySelector('svg');
    const rotateX = gsap.quickTo(art, 'rotationX', { duration: .45, ease: 'power3.out' });
    const rotateY = gsap.quickTo(art, 'rotationY', { duration: .45, ease: 'power3.out' });
    const move = (event: PointerEvent) => {
      const bounds = harbour.getBoundingClientRect();
      rotateX(((event.clientY - bounds.top) / bounds.height - .5) * -18);
      rotateY(((event.clientX - bounds.left) / bounds.width - .5) * 22);
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

const galleryMotion = gsap.matchMedia();
galleryMotion.add('(prefers-reduced-motion: no-preference)', () => {
  const desktop = window.matchMedia('(min-width: 900px) and (min-height: 720px)').matches;
  const gallery = document.querySelector<HTMLElement>('.work-index');
  const stage = gallery?.querySelector<HTMLElement>('.work-stage');
  if (!gallery || !stage) return;
  const chapters = Array.from(stage.querySelectorAll<HTMLElement>('.work-row'));
  if (!desktop) {
    // Keep the mobile scenes in document flow while giving each effect room to unfold.
    const quickMobileTrigger = (trigger: Element) => ({
      trigger,
      start: 'top 100%',
      end: () => `+=${Math.round(window.innerHeight * .7)}`,
      scrub: .25,
    });
    chapters.forEach((chapter) => {
      const media = chapter.querySelector<HTMLElement>('.work-media');
      if (!media) return;
      gsap.from(chapter.querySelector('.work-title'), {
        x: -45, opacity: 0, duration: .65, ease: 'power3.out',
        scrollTrigger: { trigger: chapter, start: 'top 88%', once: true },
      });
      gsap.fromTo(media, { y: 60, scale: .9 }, {
        y: -15, scale: 1.03, ease: 'none',
        scrollTrigger: quickMobileTrigger(media),
      });
      if (chapter.classList.contains('work-row--agame')) {
        media.classList.add('motion-ready');
        gsap.to(media.querySelector('.agame-ending'), {
          clipPath: 'inset(0% 0 0 0)', ease: 'none',
          scrollTrigger: quickMobileTrigger(media),
        });
        const journey = gsap.timeline({
          scrollTrigger: quickMobileTrigger(media),
        });
        journey.fromTo(media.querySelector('.agame-inset'),
          { xPercent: 24, yPercent: 115, rotation: 5, scale: .82 },
          { xPercent: 0, yPercent: 0, rotation: -2, scale: 1, ease: 'power2.out' }, 0);
        journey.fromTo(media.querySelector('.agame-boat'),
          { xPercent: -130, y: 18, rotation: -8 },
          { xPercent: 145, y: -10, rotation: 4, ease: 'none' }, .18);
      }
      if (chapter.classList.contains('work-row--hubris')) {
        media.classList.add('motion-ready');
        const titleScreen = media.querySelector(':scope > img:first-child');
        const boonScreen = media.querySelector(':scope > img:nth-child(2)');
        const particles = Array.from(media.querySelectorAll<HTMLElement>('.hubris-particle'));
        const shots = media.querySelectorAll<HTMLElement>('.hubris-projectile');
        const gold = media.querySelectorAll<HTMLElement>('.hubris-gold');
        const energy = media.querySelector<HTMLElement>('.hubris-energy');
        gsap.set(energy ? [...particles, ...gold, energy] : [...particles, ...gold], { opacity: 0 });
        gsap.set(gold, { scale: .35, transformOrigin: 'center' });
        const burst = gsap.timeline({
          scrollTrigger: quickMobileTrigger(media),
        });
        burst.fromTo(titleScreen, { xPercent: -22, rotation: -5, scale: .84 }, { xPercent: -5, rotation: -2, scale: 1, ease: 'power2.out' }, 0)
          .fromTo(boonScreen, { xPercent: 22, rotation: 5, scale: .84 }, { xPercent: 5, rotation: 2, scale: 1, ease: 'power2.out' }, 0)
          .fromTo(particles, { scale: .2, opacity: 0 }, { scale: 1, opacity: 1, stagger: .025, ease: 'back.out(1.8)' }, .2)
          .to(particles, { xPercent: (i) => -Math.cos(i * Math.PI / 5) * 58, yPercent: (i) => -Math.sin(i * Math.PI / 5) * 58, duration: .35, ease: 'power2.out' }, .36)
          .fromTo(energy, { scale: .1, opacity: .9 }, { scale: 3.4, opacity: 0, duration: .35, ease: 'power1.out' }, .48)
          .to(shots, { opacity: 0, scale: .3, duration: .12 }, .55)
          .to(gold, { opacity: 1, scale: 1.2, stagger: .015, duration: .16 }, .56)
          .to(particles, { yPercent: '-=38', opacity: 0, stagger: .012, duration: .3 }, .72);
      }
      if (chapter.classList.contains('work-row--freecat')) {
        media.classList.add('motion-ready');
        const preview = media.querySelector<HTMLElement>('.study-preview');
        const satellites = Array.from(media.querySelectorAll<HTMLElement>('.study-satellite'));
        gsap.set(satellites, { autoAlpha: 0 });
        const unfold = gsap.timeline({
          scrollTrigger: quickMobileTrigger(media),
        });
        unfold.fromTo(preview, { y: 42, rotationY: -9, scale: .9 }, { y: 0, rotationY: 0, scale: 1, ease: 'power2.out' }, 0)
          .fromTo(satellites[0], { xPercent: 55, yPercent: 25, rotation: 8, scale: .8, autoAlpha: 0 }, { xPercent: 0, yPercent: 0, rotation: 3, scale: 1, autoAlpha: 1, ease: 'power2.out' }, .28)
          .fromTo(satellites[1], { xPercent: -55, yPercent: -20, rotation: -8, scale: .8, autoAlpha: 0 }, { xPercent: 0, yPercent: 0, rotation: -3, scale: 1, autoAlpha: 1, ease: 'power2.out' }, .42);
      }
      if (chapter.classList.contains('work-row--toybox')) {
        const scene = media.querySelector<HTMLElement>('.toybox-scene');
        const cat = media.querySelector<SVGElement>('.toybox-cat-motion');
        const icons = media.querySelector<SVGElement>('.toybox-icons');
        const tour = gsap.timeline({
          scrollTrigger: quickMobileTrigger(media),
        });
        tour.fromTo(scene, { rotationY: -7, scale: .94 }, { rotationY: 0, scale: 1, ease: 'power2.out' }, 0)
          .fromTo(cat, { x: 0, y: 8 }, { x: 55, y: -10, ease: 'sine.inOut' }, .12)
          .fromTo(icons, { opacity: .3, x: 30 }, { opacity: 1, x: 0, ease: 'power2.out' }, .2);
      }
    });
    return () => stage.querySelectorAll('.work-media.motion-ready').forEach((media) => media.classList.remove('motion-ready'));
  }

  gallery.classList.add('reel-active');
  const agameMedia = stage.querySelector('.work-media--agame');
  agameMedia?.classList.add('motion-ready');
  const colors = ['#1c3035', '#293d4a', '#e4e1d3', '#cbd7cd'];
  const nav = stage.querySelectorAll<HTMLButtonElement>('[data-reel-jump]');
  const headerHeight = () => document.querySelector('.site-header')?.getBoundingClientRect().height ?? 88;
  const story = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: stage, start: () => `top top+=${headerHeight()}`, end: () => `+=${innerHeight * 4.8}`,
      pin: true, scrub: .8, invalidateOnRefresh: true,
    },
  });
  gsap.set(chapters.slice(1), { autoAlpha: 0 });
  chapters.slice(1).forEach((chapter) => { chapter.inert = true; });
  gsap.set('.hubris-gold, .hubris-energy', { opacity: 0 });
  gsap.set('.reel-progress', { color: '#f3f0e8' });

  // A screen opens into a bullet pattern; the cancellation wave resolves it into gold.
  story
    .fromTo('.work-media--hubris > img:first-child', { xPercent: 35, y: 70, rotationY: -18, scale: .88 }, { xPercent: -10, y: 0, rotationY: 0, scale: 1, duration: 1.2 }, 0)
    .fromTo('.work-media--hubris > img:nth-child(2)', { xPercent: -35, y: -70, rotationY: 18, scale: .8 }, { xPercent: 8, y: 0, rotationY: 0, scale: 1.08, duration: 1.2 }, 0)
    .fromTo('.hubris-particle', { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, stagger: .025 }, .35)
    .to('.hubris-particle', { xPercent: (i) => -Math.cos(i * Math.PI / 5) * 200, yPercent: (i) => -Math.sin(i * Math.PI / 5) * 200, duration: .65, ease: 'none' }, .55)
    .fromTo('.hubris-energy', { scale: .1, opacity: 1 }, { scale: 7, opacity: 0, duration: .65 }, 1.05)
    .to('.hubris-projectile', { opacity: 0, scale: .3, duration: .2 }, 1.15)
    .to('.hubris-gold', { opacity: 1, scale: 1.3, duration: .3, stagger: .015 }, 1.15)
    .to('.hubris-particle', { y: -70, opacity: 0, duration: .5, stagger: .02 }, 1.6);

  // A-Game makes a journey through its own artwork, rather than swapping rectangular slides.
  story
    .fromTo('.work-media--agame > img:first-child', { scale: 1.15, xPercent: -4 }, { scale: 1, xPercent: 0, duration: 1.6 }, 3)
    .fromTo('.agame-inset', { xPercent: -55, y: 60, rotation: -6 }, { xPercent: 25, y: -90, rotation: 3, opacity: 0, duration: 1.8 }, 3)
    .fromTo('.agame-boat', { xPercent: -130, y: 35, rotation: -7 }, { xPercent: 235, y: -55, rotation: 4, duration: 1.8, ease: 'none' }, 3)
    .to('.agame-ending', { clipPath: 'circle(150% at 62% 70%)', duration: 1.35 }, 3.55);

  // The local study workspace unfolds into three real, related modules.
  story
    .fromTo('.study-preview', { rotationY: -12, scale: .88, xPercent: 8 }, { rotationY: 0, scale: 1, xPercent: -4, duration: 1.6 }, 6)
    .fromTo('.study-satellite--content', { xPercent: -25, y: 170, rotation: -6, scale: .8 }, { xPercent: 0, y: 0, rotation: 2, scale: 1, duration: 1.7 }, 6)
    .fromTo('.study-satellite--qbank', { xPercent: -45, y: -120, rotation: 6, scale: .8 }, { xPercent: 0, y: 0, rotation: -2, scale: 1, duration: 1.7 }, 6.1);

  // The companion moves through the utility illustration; its original sprite keeps animating.
  story
    .fromTo('.toybox-scene', { rotationY: 12, scale: .9 }, { rotationY: 0, scale: 1.04, duration: 1.8 }, 9)
    .fromTo('.toybox-cat-motion', { x: -60, y: 35 }, { x: 50, y: -25, duration: 1.8, ease: 'sine.inOut' }, 9)
    .fromTo('.toybox-icons', { opacity: .15, x: 90 }, { opacity: 1, x: 0, duration: 1.4 }, 9.3);

  chapters.forEach((outgoing, index) => {
    if (index === 3) return;
    const incoming = chapters[index + 1];
    const at = index * 3 + 1.9;
    const oldCopy = outgoing.querySelector('.work-copy');
    const newCopy = incoming.querySelector('.work-copy');
    const oldFigure = outgoing.querySelector('.work-figure');
    const newFigure = incoming.querySelector('.work-figure');
    story
      .set(incoming, { autoAlpha: 1 }, at)
      .to(oldCopy, { y: -65, opacity: 0, duration: .55 }, at)
      .fromTo(newCopy, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: .7 }, at + .4)
      .to(oldFigure, { yPercent: -90, xPercent: -18, scale: .8, rotation: -3, opacity: 0, duration: 1.1 }, at)
      .fromTo(newFigure, { yPercent: 85, xPercent: 22, scale: 1.2, rotation: 3, opacity: 0 }, { yPercent: 0, xPercent: 0, scale: 1, rotation: 0, opacity: 1, duration: 1.1 }, at)
      .to(stage, { backgroundColor: colors[index + 1], duration: 1.1 }, at)
      .to('.reel-nav button', { color: index > 0 ? '#263739' : '#f3f0e8', duration: 1.1 }, at)
      .to('.reel-progress', { color: index > 0 ? '#65716b' : '#f3f0e8', duration: 1.1 }, at)
      .to('.reel-orbit', { scale: 1 + (index + 1) * .2, xPercent: -(index + 1) * 15, yPercent: (index + 1) * 12, duration: 1.1 }, at)
      .set(outgoing, { autoAlpha: 0 }, at + 1.1);
  });
  story.to('.reel-progress i', { scaleX: 1, duration: 12, ease: 'none' }, 0);

  let previousChapter = -1;
  const syncChapter = () => {
    const active = Math.min(3, Math.floor((story.time() + .5) / 3));
    if (active === previousChapter) return;
    previousChapter = active;
    chapters.forEach((chapter, index) => { chapter.inert = index !== active; });
    nav.forEach((button, index) => button.setAttribute('aria-current', String(index === active)));
  };
  story.eventCallback('onUpdate', syncChapter);
  syncChapter();
  const clickHandlers: Array<() => void> = [];
  nav.forEach((button, index) => {
    const jump = () => {
      const trigger = story.scrollTrigger!;
      const chapterStart = index * 3;
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * (chapterStart / story.duration()), behavior: 'smooth' });
    };
    button.addEventListener('click', jump);
    clickHandlers.push(jump);
  });
  // Keyboard focus can enter the active project's detail link without crossing hidden scenes.
  return () => {
    gallery.classList.remove('reel-active');
    agameMedia?.classList.remove('motion-ready');
    chapters.forEach((chapter) => { chapter.inert = false; });
    nav.forEach((button, index) => button.removeEventListener('click', clickHandlers[index]));
  };
});
