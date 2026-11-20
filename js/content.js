/* =========================================================================
   SITE CONTENT: edit this file to change text, links and projects.
   You don't need to touch any other file. Keep the quotes " " and commas.
   After editing on GitHub, click "Commit changes": the site updates itself
   in about a minute.
   ========================================================================= */
window.SITE = {
  name: "Priyanshu Chatterjee",
  role: "Video Editor & Motion Designer",
  city: "Delhi, India",
  available: "Open for work",

  // Big first line in the hero. Keep it short.
  tagline: "I cut short-form videos that stop the scroll and say one thing clearly.",

  // Rotating role ticker (separated by ✺)
  roles: ["Video Editor", "Motion Designer", "AI-Assisted Video", "Colour Grading", "Sound Design"],

  email: "hello.thebreakthrough@gmail.com",
  instagram: { handle: "@ft.priyanshu.__", url: "https://www.instagram.com/ft.priyanshu.__/", dm: "https://www.instagram.com/ft.priyanshu.__/" },
  linkedin: "https://www.linkedin.com/in/priyanshu-chatterjee-85b892311/",

  about: {
    lines: [
      "I'm a Delhi-based video editor and motion designer, working on Reels and short-form content for brands and organisations.",
      "I plan an edit before I touch the timeline: the hook, the rhythm, the sound, and the one action the viewer should take."
    ],
    facts: [
      { k: "Editing since", v: "June 2026" },
      { k: "Client projects", v: "2 shipped" },
      { k: "Based in", v: "Delhi" },
      { k: "Works", v: "Remote + hybrid" }
    ],
    lookingFor: "Project-based freelance work and internships with marketing agencies. Remote, or hybrid in Delhi."
  },

  services: [
    { name: "Short-form Reels", line: "Built for the first two seconds. A hook that stops the thumb, pacing that holds it, and an ending that makes people act.", thumbs: ["assets/img/s1.jpg", "assets/img/s2.jpg"] },
    { name: "Motion graphics", line: "Words that move with the voice. Kinetic captions, animated icons and branded end cards that turn a talking head into something people watch twice.", thumbs: ["assets/img/s3.jpg", "assets/img/s4.jpg"] },
    { name: "Colour grading", line: "Phone footage, cinema mood. Harsh sun tamed, skin tones kept true, one consistent look from the first shot to the last.", thumbs: ["assets/img/s5.jpg", "assets/img/s6.jpg"] },
    { name: "Sound design", line: "The half of video you feel before you notice it. Cuts on the beat, a hit on every transition, and a mix that stays punchy even on a phone speaker.", thumbs: ["assets/img/s7.jpg", "assets/img/s8.jpg"] },
    { name: "AI-assisted production", line: "AI as my crew, not my crutch. Claude shapes scripts and edit plans, Google Flow creates the shots a camera can't, so ideas reach the timeline faster.", thumbs: ["assets/img/logos/claude.svg", "assets/img/logos/google-flow.webp"] }
  ],

  // Featured client projects
  projects: [
    {
      num: "01",
      title: "Learn AI, practically",
      client: "VC Gurukul",
      year: "2026",
      type: "Instagram Reel · 19 s",
      role: "Edit, motion graphics, kinetic captions, sound design, colour",
      desc: "A testimonial Reel from VC Gurukul's second AI workshop at Shaheed Bhagat Singh College. One handheld take in harsh sun, turned into a fast, captioned, podcast-style edit with a branded end card.",
      preview: "assets/video/vc-gurukul-preview.mp4",
      poster: "assets/img/vc-gurukul-poster.jpg",
      youtube: "https://youtube.com/shorts/Ia6x3KhJiZI",
      youtubeId: "Ia6x3KhJiZI"
    },
    {
      num: "02",
      title: "Sadak se School tak",
      client: "Helping Hut NGO",
      year: "2026",
      type: "Instagram Reel · 29 s",
      role: "Story, edit, captions, sound design",
      desc: "An awareness Reel for a youth-led Delhi NGO that runs street schools for children. The story moves from the streets to the classroom in three words: Padhai. Hasi. Sapne.",
      preview: "assets/video/helping-hut-preview.mp4",
      poster: "assets/img/helping-hut-poster.jpg",
      youtube: "https://youtu.be/q_9bV5-w2m0",
      youtubeId: "q_9bV5-w2m0"
    }
  ],

  tools: [
    { name: "Premiere Pro", use: "Editing, pacing, captions" },
    { name: "After Effects", use: "Motion graphics and titles" },
    { name: "DaVinci Resolve", use: "Colour grading" },
    { name: "Claude", use: "Scripts, edit plans, creative direction" },
    { name: "Google Flow", use: "AI-generated video shots" }
  ],

  education: {
    degree: "B.Com (Hons.)",
    college: "Shaheed Bhagat Singh College",
    university: "University of Delhi"
  }

  // TESTIMONIALS: none yet. When a client sends you a line you can quote,
  // ask Claude to add a testimonials section.
};
