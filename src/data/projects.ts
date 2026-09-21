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
      'A portrait-monitor bullet-hell roguelite where grazing fills a screen-clearing gauge and cancelled bullets become collectible gold.',
    problem:
      'I wanted a bullet hell designed around a portrait monitor, with an escape mechanic that did more than erase a mistake. In HUBRIS, the panic button is also part of the economy.',
    solution:
      'Grazing fills Apotheosis. Triggering it cancels enemy bullets into gold. A run seed chooses the encounters and procedural score; god boons replace the weapon rather than adding minor stat bonuses.',
    outcome:
      'The game is playable directly from index.html with no server or build step. It has three sectors, bosses, permanent unlocks, its own WebGL and Canvas render stack, and procedural WebAudio.',
    stack: ['WebGL2', 'Canvas 2D', 'WebAudio', 'Vanilla JavaScript'],
    tags: ['Game design', 'Procedural audio', 'Rendering'],
    media: '/images/projects/goldwake-title.webp',
    mediaAlt: 'The HUBRIS title screen',
    mediaCaption: 'The current title screen, captured from the game running locally.',
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
      'A one-sitting birthday game with two friends’ houses, small games inside their computers, three keepsakes, a violin, and a paper-boat ending.',
    problem:
      'I wanted the birthday present to be a place someone could explore rather than a message they would read once. The game was built around shared interests and people the recipient knows.',
    solution:
      'The player visits two friends, fishes inside one computer, defuses a small top-down game inside another, then returns home when a violin starts calling. Three keepsakes become a lit paper boat before the water transitions into a galaxy.',
    outcome:
      'It runs in the browser and can also be packaged as an Electron gift build. There are no fail states or save system; it is meant to be completed in one sitting with sound on.',
    stack: ['Phaser 3', 'TypeScript', 'Vite', 'WebAudio'],
    tags: ['Games', 'Personal software', 'Pixel art'],
    media: '/images/projects/a-game-clearing.webp',
    mediaAlt: 'The lantern-lit clearing near the end of A-Game',
    mediaCaption: 'A sanitized capture from the running game; names, letters, and personal photos are excluded.',
    accent: 'violet',
    selected: true,
    visibility: 'private',
    captures: [
      {
        src: '/images/projects/a-game-outside.webp',
        alt: 'The outdoor village in A-Game near the player’s house',
        caption: 'The village connects the homes and the game’s small activities.',
      },
      {
        src: '/images/projects/cinematic/a-game-galaxy.webp',
        alt: 'The water-to-galaxy transition from A-Game’s ending',
        caption: 'The final scene changes the water into a galaxy after the keepsakes become a paper boat.',
      },
    ],
  },
  {
    slug: 'freecat',
    title: 'FreeCAT',
    eyebrow: 'Local-first MCAT study software',
    year: '2026',
    summary:
      'A local-first MCAT desktop app that keeps questions, lessons, imported Anki decks, review history, progress, and a study pet in one SQLite file.',
    problem:
      'I wanted an MCAT study app without an account, subscription, or hosted backend, and I wanted the study data to remain available as a file on my own machine.',
    solution:
      'FreeCAT combines an original and openly licensed question bank, topic-linked lessons, Anki package import, FSRS review work, and gamification in an Electron app backed by local SQLite.',
    outcome:
      'The question bank, content review, gamification, and Anki import are working. FSRS review, richer media support, image occlusion, installers, and the public repository are still in progress.',
    stack: ['Electron', 'React', 'TypeScript', 'SQLite'],
    tags: ['Learning systems', 'Local-first', 'Open source'],
    media: '/images/projects/freecat-home.webp',
    mediaAlt: 'The FreeCAT home screen with a study pet and local progress',
    mediaCaption: 'The app running locally with a development profile and seeded progress.',
    accent: 'mint',
    selected: true,
    visibility: 'private',
    captures: [
      {
        src: '/images/projects/freecat-qbank.webp',
        alt: 'The FreeCAT question-bank practice setup screen',
        caption: 'Practice can be scoped by discipline or topic through the shared content taxonomy.',
      },
      {
        src: '/images/projects/freecat-content.webp',
        alt: 'The FreeCAT content-review topic list',
        caption: 'Questions and lessons share topic slugs, which allows direct links between practice and review.',
      },
    ],
  },
  {
    slug: 'toybox',
    title: 'Toybox',
    eyebrow: 'Tiny Windows utilities with no dependencies',
    year: '2026',
    summary:
      'A set of Python utilities for Windows: a system and media HUD, an in-memory clipboard history with LAN sync, and a music-reactive desktop cat.',
    problem:
      'I kept wanting small Windows utilities without installing another large desktop app or sending system and clipboard data to a service.',
    solution:
      'The programs use Python’s standard library, Tkinter, and native Windows APIs. The cat reacts to system audio, runs timers and reminders, naps in a box, and can carry files dropped onto it.',
    outcome:
      'The utilities run as separate small processes and share one configuration. Clipboard sync stays on the local network; recent clipboard contents remain in memory so copied passwords do not become a permanent history file.',
    stack: ['Python', 'tkinter', 'Win32 APIs'],
    tags: ['Desktop utilities', 'Zero dependency', 'Digital pets'],
    media: '/images/projects/toybox-staged.webp',
    mediaAlt: 'A staged Toybox desktop with the system monitor, clipboard, timer, and real cat sprite',
    mediaCaption: 'A sanitized staging of the utilities using the real cat sprite. A Windows recording will replace it.',
    accent: 'blue',
    selected: true,
    visibility: 'private',
  },
];

export const selectedProjects = projects.filter((project) => project.selected);

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
