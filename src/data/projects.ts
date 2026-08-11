export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  tags: string[];
  media: string;
  mediaAlt: string;
  mediaCaption: string;
  accent: 'gold' | 'violet' | 'mint' | 'coral' | 'blue' | 'amber';
  selected: boolean;
  visibility: 'private' | 'public' | 'local';
  repository?: string;
  captures?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
};

export const projects: Project[] = [
  {
    slug: 'goldwake',
    title: 'HUBRIS / Goldwake',
    eyebrow: 'A portrait bullet-hell roguelite',
    year: '2026',
    summary:
      'A one-file WebGL game where grazing danger, gathering gold, and timing a screen-clearing apotheosis all feed the same loop.',
    problem:
      'I wanted a shooting game whose pressure stayed legible on a portrait display—and whose economy was part of the minute-to-minute combat rather than a menu between fights.',
    solution:
      'A seeded three-sector run with authored bullet geometry, transforming god boons, procedural music, and an apotheosis system that converts bullets into gold.',
    outcome:
      'A dependency-free game that runs directly from index.html, with its own render stack, audio system, progression, bosses, and authored art pipeline.',
    stack: ['WebGL2', 'Canvas 2D', 'WebAudio', 'Vanilla JavaScript'],
    tags: ['Game design', 'Procedural audio', 'Rendering'],
    media: '/images/projects/goldwake.svg',
    mediaAlt: 'Stylized preview of the HUBRIS portrait bullet-hell game',
    mediaCaption: 'Gameplay capture will replace this prototype composition.',
    accent: 'gold',
    selected: true,
    visibility: 'private',
    captures: [
      {
        src: '/images/projects/goldwake-title.webp',
        alt: 'The HUBRIS title screen with a crowned silhouette above a vortex of gold coins',
        caption: 'The title screen establishes the portrait format and gold economy before the first input.',
      },
      {
        src: '/images/projects/goldwake-boon.webp',
        alt: 'A mid-run HUBRIS boon selection offering Thor, Artemis, and Odin attack transforms',
        caption: 'A mid-run choice: three attack transforms, rarity, mechanical role, and readable trade-offs.',
      },
    ],
  },
  {
    slug: 'a-game',
    title: 'A-Game',
    eyebrow: 'A browser RPG made as a birthday present',
    year: '2026',
    summary:
      'A cozy, one-sitting world made for one person: friends’ houses, tiny games, keepsakes, a violin, and an ocean under a galaxy.',
    problem:
      'A normal digital birthday card was too flat. I wanted the gift to feel like entering a small place built from shared memories.',
    solution:
      'A keyboard-driven RPG with original scenes, characters, minigames, music hooks, and a no-fail story arc designed to be finished in one sitting.',
    outcome:
      'A deeply personal piece of software where interaction—not a message box—became the wrapping paper.',
    stack: ['Phaser 3', 'TypeScript', 'Vite', 'WebAudio'],
    tags: ['Games', 'Personal software', 'Pixel art'],
    media: '/images/projects/a-game.svg',
    mediaAlt: 'Stylized preview of A-Game’s warm pixel-art world',
    mediaCaption: 'Gameplay capture will replace this prototype composition.',
    accent: 'violet',
    selected: true,
    visibility: 'private',
  },
  {
    slug: 'freecat',
    title: 'FreeCAT',
    eyebrow: 'Local-first MCAT study software',
    year: '2026',
    summary:
      'An open-source desktop study environment that keeps questions, lessons, flashcards, progress, and a small study pet on your own machine.',
    problem:
      'Study tools often trade ownership and flexibility for subscriptions, accounts, and siloed progress. I wanted one place I could trust and shape around how I actually study.',
    solution:
      'A local SQLite application combining a question bank, content review, Anki import, spaced repetition, and lightweight gamification.',
    outcome:
      'A tested Electron foundation with content review, question-bank, flashcard-import, and study-pet milestones already working offline.',
    stack: ['Electron', 'React', 'TypeScript', 'SQLite'],
    tags: ['Learning systems', 'Local-first', 'Open source'],
    media: '/images/projects/freecat.svg',
    mediaAlt: 'Stylized preview of the FreeCAT local-first study dashboard',
    mediaCaption: 'Application capture will replace this prototype composition.',
    accent: 'mint',
    selected: false,
    visibility: 'private',
  },
  {
    slug: 'baddest',
    title: 'Baddest',
    eyebrow: 'Subjective ranking, made concrete',
    year: '2026',
    summary:
      'A hosted pairwise-ranking app for settling a deliberately subjective question: who is, once and for all, the baddest in the game?',
    problem:
      'Ranked lists are hard to make directly, especially when the criteria are vibes. Choosing between two candidates at a time is much easier.',
    solution:
      'An image-first voting flow backed by confidence-aware ratings, personal and shared leaderboards, and authenticated data sync.',
    outcome:
      'A playful opinion becomes an inspectable ranking through a sequence of tiny decisions.',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase'],
    tags: ['Social tools', 'Ranking systems', 'Product design'],
    media: '/images/projects/baddest.svg',
    mediaAlt: 'Stylized preview of the Baddest pairwise ranking interface',
    mediaCaption: 'Interface capture will replace this prototype composition.',
    accent: 'coral',
    selected: false,
    visibility: 'private',
  },
  {
    slug: 'toybox',
    title: 'Toybox',
    eyebrow: 'Tiny Windows utilities with no dependencies',
    year: '2026',
    summary:
      'A tray launcher for a translucent system monitor, a private clipboard history, and a music-reactive desktop pet.',
    problem:
      'Some utilities should be small enough to understand, fast enough to forget, and specific enough that generic apps never quite fit.',
    solution:
      'Three standard-library Python toys using native Windows APIs for audio level, hotkeys, translucent windows, and startup behavior.',
    outcome:
      'Useful background tools with zero installs, no network, no telemetry, and deliberately tiny resource footprints.',
    stack: ['Python', 'tkinter', 'Win32 APIs'],
    tags: ['Desktop utilities', 'Zero dependency', 'Digital pets'],
    media: '/images/projects/toybox.svg',
    mediaAlt: 'Stylized preview of Toybox desktop utilities',
    mediaCaption: 'Windows capture will replace this prototype composition.',
    accent: 'blue',
    selected: true,
    visibility: 'private',
  },
  {
    slug: 'question-distiller',
    title: 'Question Distiller',
    eyebrow: 'A document-to-learning pipeline',
    year: '2026',
    summary:
      'Script-first tooling that turns image-only question documents into structured, reviewable learning material and interactive concept labs.',
    problem:
      'A large screenshot-based study corpus was searchable only by memory and reviewable only one image at a time.',
    solution:
      'A deterministic extraction, OCR, validation, crop-review, and concept-distillation pipeline with explicit human review gates.',
    outcome:
      'A brittle pile of screenshots became structured data, targeted review queues, and reusable learning artifacts without hiding provenance or uncertainty.',
    stack: ['Python', 'OCR', 'Structured JSON', 'Three.js'],
    tags: ['Learning systems', 'Pipelines', 'Human-in-the-loop'],
    media: '/images/projects/distiller.svg',
    mediaAlt: 'Stylized preview of the document-to-learning distillation pipeline',
    mediaCaption: 'Pipeline artifact capture will replace this prototype composition.',
    accent: 'amber',
    selected: false,
    visibility: 'private',
  },
];

export const selectedProjects = projects.filter((project) => project.selected);

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
