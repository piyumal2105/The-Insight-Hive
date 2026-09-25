# The Insight Hive — Figma AI Design Prompts (v2: Cred-Deck Enriched)
This version layers in the *specific proof points* from the Credential Deck that v1 only 
referenced generically — real client names, real award wins, real numbers, real people. 
Use this where you want the site to feel backed by evidence, not just positioning language.

Paste the Master Brand Prompt first, then each page prompt as its own frame.

---

## 0. MASTER BRAND PROMPT (paste first)

```
Design a modern, premium website for "The Insight Hive" — a full-service marketing agency working alongside UM Worldwide and Initiative Worldwide) that 
connects Brand Strategy, Consumer Insight, Creative & Content, Integrated Media, Digital & 
Performance, and Data & Measurement under one roof. Positioning line: "All-Rounders."

BRAND IDENTITY
- Logo: use the client's existing logo file exactly as supplied — the hexagon "hive" built 
  from thin vertical bars in a purple-to-orange gradient, paired with the "the insight 
  **Hive**" wordmark (light-weight "the insight" + bold "Hive" in dark charcoal). Do NOT 
  redesign, restyle, recolor, or reinterpret this logo — treat the supplied file as the 
  single source of truth and reproduce it pixel-accurately wherever it appears (nav, 
  footer, favicon, hero). It's fine to animate it (see Logo Reveal Animation below); it is 
  not fine to change its shape, proportions, or colors.
- Colors (sampled directly from the official logo file): gradient deep magenta-purple 
  #92278F → vivid orange #F7941F, used on CTAs, tags, key headlines, and anywhere the 
  brand gradient appears. Wordmark charcoal #3A3A3C. Light bg #EFEFEF, dark bg #262626. 
  Body text #1A1A1A on light / #F2F2F2 on dark. Muted text #9A9A9A.
- Type: bold geometric sans (Inter/Manrope/Satoshi), mixing a light-weight word with a 
  bold-weight word in headlines (e.g. "Our **Ethos**"). Clean regular-weight body copy.
- Layout: generous whitespace, bento-grid cards, alternating full-bleed light/dark sections, 
  gradient pill buttons/tags, hexagon-masked images, rounded white "showcase" cards for 
  campaign photography sitting on dark backgrounds (this is how their own deck presents 
  client work — keep that framing device).
- Mood: premium, evidence-led, confident. Built to still look current in 2 years — favor 
  bento grids, big type, and purposeful motion over any trend-locked decoration.

LOGO REVEAL ANIMATION (on page load, Home page hero)
- The hexagon's vertical bars animate up from 0 height in sequence, like an equalizer 
  settling, until they reach their exact final proportions — at that point the graphic 
  must match the supplied logo file exactly. The "the insight Hive" wordmark then fades or 
  slides in beside it to complete the exact, unaltered lockup.
- The bee mascot can be woven into this same moment for delight — e.g. it appears to 
  "trace" the hexagon's outline as the bars rise, or lands on the hexagon just as the last 
  bar settles into place — but the sequence must always resolve into the logo exactly as 
  provided, not a reinterpreted or stylized version of it.

BEE MASCOT (site-wide motif, ties directly to the "Hive" name)
- Design the bee as a fully photorealistic 3D-rendered character — not a flat icon, not a 
  2D illustration, but the quality of a high-end CGI render or nature-documentary macro 
  photograph: individually visible fuzzy hair strands catching light across a rounded 
  thorax and abdomen, crisp black-and-amber/gold banding with natural colour variation 
  (not flat stripes), multi-faceted compound eyes with subtle reflections, finely jointed 
  legs, and two pairs of thin, semi-transparent wings that show real light refraction, soft 
  motion blur when beating, and delicate vein structure. Render it with proper studio-style 
  lighting, soft shadows, and depth of field so it looks like it's truly sitting in 3D space 
  on the page rather than pasted on top. Work a faint touch of the brand gradient into a 
  subtle rim-light or wing iridescence — not as flat colour on the body — so it stays 
  on-brand without breaking the realism. Keep the bee itself entirely separate from the 
  logo file — it's a companion character, never a redrawn part of the logo.
- Make it a generously sized focal element, not a small detail — roughly the height of the 
  hero headline's capital letters on desktop (large enough to read as a real character on 
  the page), scaling down proportionally but staying clearly visible on mobile.
- Motion must be smooth, fluid, and physically believable — no snapping, teleporting, or 
  straight-line movement. Wings blur/flutter continuously at a fast, soft rate while the 
  body drifts slowly along gentle curved, arcing flight paths, with soft ease-in/ease-out 
  acceleration, a light continuous bob/sway for a floating-in-air feel, and a subtle bank/ 
  tilt into the direction of travel like a real insect turning.
- On the Home page specifically, the bee flies in along a smooth curved arc, lands and 
  rests briefly on one letter of the hero headline with a soft, natural landing (never a 
  sudden stop), continuing a gentle wing-flutter and slight body bob while perched, then 
  takes off along another smooth arc to land on a different letter further along the 
  headline or logo, repeating this pattern a few times before settling near the "Let's 
  Talk" button.
- Sitewide, the bee is a persistent, always-on-screen companion — it should never fully 
  disappear or leave the viewport empty-handed. Instead of flying off and vanishing, it 
  continuously wanders to a new random position within the current viewport at all times: 
  after resting somewhere for a few seconds, it takes off along a smooth curved path and 
  travels to another random spot on screen (a different heading letter, a card corner, a 
  hexagon icon, empty whitespace, near a button), rests there for a few seconds, then 
  moves again — an unbroken loop of small random journeys rather than occasional 
  appearances. As the person scrolls, the bee's "home base" position updates so it keeps 
  wandering within whatever is currently in view, instead of getting left behind above the 
  fold. Vary the pause length, flight distance, and direction randomly each time so the 
  pattern never feels scripted or repeats predictably — but at no point should the bee be 
  absent from the screen for more than a moment mid-flight.

Desktop (1440px) and mobile (390px) frames. AA contrast minimum, 44px+ tap targets.
```

---

## 1. HOME PAGE PROMPT (enriched)

```
Design the HOME page for The Insight Hive, built to lead with evidence, not just claims.

Sections, top to bottom:
1. Sticky nav bar: logo, links (Home / About / What We Do / Our Work / Contact) with 
   "Home" shown in an active/highlighted state using the brand gradient underline, 
   gradient "Let's Talk" pill button.
2. Hero: mixed-weight headline on their full-service positioning + "All-Rounders" tagline. 
   Sub-copy referencing that they're an Omnicom Group affiliate founded by veterans with 
   44+ years combined experience. Primary CTA "Let's Talk", secondary "See Our Work". 
   Animated hexagon logo as hero visual. The bee mascot flies in during the headline's 
   reveal animation and lands on one of the headline's letters.
3. Trust bar: a quiet, auto-scrolling logo strip of a few standout client marks — Emirates, 
   Astra, UNDP, Litro Gas — directly under the hero, framed as "Trusted by," with a small 
   "See our full portfolio" link through to the Our Work page's Portfolio area.
4. Capabilities overview: 6-card bento grid (Brand Strategy & Consumer Insight, Creative & 
   Content, Integrated Media Planning, Digital Strategy & Performance, Social Content 
   Management, Data & Measurement).
5. Impact & milestones band (full-bleed dark section, this is the deck's strongest asset — 
   give it real weight): 4-5 stat cards with animated counters:
   - "Almost Rs. 1Bn" — 2024 presidential election spend won on a competitive pitch 
     against Ogilvy Media, in their first year
   - "2nd largest spender" — Cricket World Cup 2023
   - "#1 globally" — Astra Sri Lanka's Global Digital Engagement Leadership 2025, 
     outperforming 90+ Astra markets worldwide
   - "3 awards" — Sri Lanka Leadership Awards 2026
   - "Dragons of Sri Lanka 2026" winner
6. Philosophy strip: three pillars laid out as bold hexagon-tagged statements — 
   "Big on Passion", "Fierce on Dedication", "Built on Trust."
7. Selected work: 2-3 case study cards (lead with the Astra "Rasa Mathaka" campaign) using 
   the rounded white showcase-card-on-dark-background treatment from their own deck, 
   hover reveals "View Case Study."
8. Closing CTA band + footer with address (63 Fife Road, Colombo 5, Sri Lanka), phone, 
   email, and Privacy link.

Motion Notes: 
- Bee mascot hero sequence: on page load, once the headline finishes revealing, the bee 
  flies in from off-canvas along a curved path, lands on one letter of the headline (or 
  the logo's hexagon), rests there with a small wing-flutter/bob loop for ~1.5-2s, then 
  takes off and flies to a second letter further along, rests again, then exits toward 
  the "Let's Talk" button and hovers near it briefly before disappearing — as if inviting 
  the click. Loop this whole sequence occasionally if the visitor lingers on the hero 
  without scrolling (e.g. every 15-20s), so it doesn't repeat distractingly.
- Bee mascot scroll behavior: the bee stays visible on screen at all times as the visitor 
  scrolls — it never fully exits and disappears. It continuously wanders to a new random 
  spot within whatever is currently in the viewport (a stat number, a card corner, a 
  hexagon icon, open whitespace), rests briefly, then flies on a smooth curved path to the 
  next random spot, looping this indefinitely for as long as the page is open. Randomize 
  pause length and flight distance/direction each time so it never repeats a pattern, and 
  keep it clear of key text and the CTA buttons so it never blocks content.
- Logo strip auto-scrolls infinitely, pausing on hover.
- Milestone stat cards count up on scroll into view.
- Philosophy pillars fade in staggered with a hexagon icon draw-on animation.
- Case study cards image-zoom on hover with gradient wipe.
```

---

## 2. ABOUT PAGE PROMPT (enriched)

```
Design the ABOUT page for The Insight Hive, foregrounding their founding story, ethos, 
and their wider global network — all pulled directly from their credentials deck.

Sections, top to bottom:
1. Sticky nav bar: logo, links (Home / About / What We Do / Our Work / Contact), gradient "Let's Talk" pill button.
2. Page header: "Who We Are" — founded April 2023 by industry veterans with 44+ years 
   combined experience, future-facing across traditional and digital, proud Omnicom 
   Group affiliate.
3. "One team, no silos" statement section: a bold pull-quote style block on their actual 
   philosophy — most agencies compartmentalize strategy, planning, buying and digital 
   into separate silos; The Insight Hive trains every team member to master all of it, 
   using role-rotation and the Omnicom network to build agile, future-facing media 
   experts with end-to-end accountability.
4. Our Ethos: scattered/word-cloud style layout (matching their deck's actual layout) of 
   7 values with hexagon bullet icons at varying sizes/positions: Client Centric, 
   Innovation at Core, Transparency & Integrity, Data Driven, Community & Social Impact, 
   Empowerment & Inclusivity, Continuous Learning.
5. Leadership team grid: real profiles with photo placeholder, name, title, and a 
   1-2 line bio pulled from their bios:
   - Peter Solomon — Managing Director / Chief Insights Officer (28+ years in marketing 
     communications)
   - Irshad Farook — Director Operations (14+ years in integrated media planning & buying)
   - Ishani Anuradha — Head of Strategy (16+ years across GroupM, dentsu)
   - Yoosuf Faizal — Head of Digital Strategist (10+ years in brand & comms)
   - Madhavi Jayawardena — Manager, Integrated Media Planning (7+ years)
   - Shalika Udeni — Head of Finance (15+ years, CMA Sri Lanka)
   Hover reveals the fuller bio.
6. Our Network: three-column section on their global affiliation:
   - Omnicom Group — global media, marketing & communications holding company (New York HQ)
   - UM Worldwide — global media network in 100+ countries; their local sub-brand 
     philosophy "Full Color Media" (inclusive, data-powered, culturally nuanced media) 
     with a "Watch the showreel" video thumbnail/link
   - Initiative Worldwide — top-ranked global media agency in 90+ markets; local 
     philosophy "Fame & Flow" (building brand fame while driving performance) with its 
     own showreel thumbnail/link
7. Gallery: a masonry/lightbox photo grid showcasing life at The Insight Hive — team and 
   culture photography, behind-the-scenes shots from campaign shoots and activations (e.g. 
   the Astra "Rasa Mathaka" on-ground activation), and office/team moments. Clicking any 
   image opens a full-screen lightbox with next/previous navigation. Mix portrait and 
   landscape image tiles for visual rhythm rather than a rigid uniform grid.
8. Connect With Us: a "Follow along" strip — social icons (Facebook, Instagram, LinkedIn, 
   YouTube for their showreel content) styled with the brand gradient on hover, linking out 
   to their social profiles. Position this as a clear, standalone band rather than burying 
   it only in the footer.
9. Closing CTA band + footer.

Motion Notes: ethos word-cloud items float/fade in on scroll at staggered delays and 
slightly different speeds (parallax feel); leadership cards flip or slide to reveal bio 
on hover; network showreel thumbnails have a play-button pulse animation; gallery images 
fade/scale in as they enter the viewport, staggered, with a subtle zoom on hover; the 
lightbox fades in with a dimmed backdrop; social icons in the Connect band have a gentle 
bounce and gradient-fill animation on hover.
```

---

## 3. WHAT WE DO PAGE PROMPT (enriched)

```
Design the WHAT WE DO page for The Insight Hive, adding their actual differentiators and 
global technology stack from the credentials deck.

Sections, top to bottom:
1. Sticky nav bar: logo, links (Home / About / What We Do / Our Work / Contact), gradient "Let's Talk" pill button.
2. Page header framing them as connecting every discipline under one roof.
3. Six service blocks (alternating image-text layout): Brand Strategy & Consumer Insight, 
   Creative & Content, Integrated Media Planning & Implementation, Digital Strategy 
   Planning & Implementation, Social Space Content Creation & Management, Data & 
   Measurement. Each with hexagon icon, description, sub-capability pill tags.
4. "What Makes Us Different" — 4-card section using their actual differentiators:
   - Agile, modular media approach — flexible frameworks that adapt and scale quickly
   - Global network-supported proprietary tools — advanced in-house tech for smarter execution
   - Multi-discipline media experts — specialists across media, data, strategy and tech 
     working as one team
   - Proven success in high-stakes campaigns — strong track record in complex, 
     high-impact work
5. Global technology & partnerships band (full-bleed dark section): 
   - IPG Mediabrands' Interact — an all-in-one marketing platform (launched late 2024, 
     built by KINESSO, powered by Acxiom's audience data) unifying data, media, creative 
     and production. Capability tags: End-to-End Integration, Real-Time Optimization, 
     AI-Driven Personalization, Unified Data & Technology Resources, Strategic Partnerships.
   - KINESSO — the technology-driven performance marketing engine behind IPG Mediabrands, 
     operating in 60+ countries with 6,000+ professionals.
6. "The Big Picture" closing statement band: future-ready vision, agile & scalable model, 
   performance culture, cross-border capability — "built for the speed of Asia" — as a 
   bold, large-type standalone statement on a gradient background.
7. Closing CTA band + footer.

Motion Notes: differentiator cards fade-up staggered; capability tags in the tech section 
animate in one-by-one like a checklist populating; "Big Picture" statement text scales in 
gently, gradient background slowly animates hue on loop.
```

---

## 4. OUR WORK PAGE PROMPT (enriched)

```
Design the OUR WORK page for The Insight Hive as two clearly separated areas — a Portfolio 
of client logos, and a Case Studies section with real, detailed results — exactly as their 
credentials deck structures it.

Sections, top to bottom:
1. Sticky nav bar: logo, links (Home / About / What We Do / Our Work / Contact), gradient 
   "Let's Talk" pill button.
2. Page header: "Work that moves the needle." Directly under the header, a simple two-tab 
   or two-anchor pill switcher — "Our Portfolio" / "Case Studies" — so a visitor can jump 
   straight to either area (both remain reachable by scrolling too; the switcher just 
   speeds up navigation).

AREA A — OUR PORTFOLIO
3. Section intro: short line such as "Brands we've partnered with."
4. Client logo wall: a clean, evenly-spaced grid of real client marks, each on hover 
   lifting slightly and revealing a one-line tag of the work done. Include (pulled directly 
   from the credentials deck's "Few of Our Portfolios" section):
   - Emirates — "Fly Better" — integrated campaign
   - Litro Gas — national fuel distribution brand
   - Euro Motors — automotive
   - Marico — FMCG
   - Household & personal care range: All Out, Baygon, Glade, KIWI, Pledge
   - Asthijeewa — Ayurvedic wellness
   - UNDP — social impact campaign
   - Wipro (Santoor) — personal care/FMCG
   - A leading carbonated beverage brand — Official Beverage Partner of Sri Lanka Cricket
   - Browns EV (BAW, Wuling) — electric vehicles
   - MELBET — entertainment/gaming
   - Bellosé — cosmetics
   - Astra — spread/FMCG (also their flagship case study, see below)
   Keep logos monochrome/neutral by default with color revealed on hover, so the grid 
   reads as a clean, unified wall rather than a clash of client brand colors.

AREA B — CASE STUDIES
5. Section intro: short line such as "A closer look at the work behind the results."
6. Awards & milestones strip: a horizontal set of badge-style cards for: Sri Lanka 
   Leadership Awards 2026 (3 wins), Dragons of Sri Lanka 2026 winner, Global Digital 
   Engagement Leadership 2025 (Astra Sri Lanka #1 globally across 90+ markets), and the 
   2024 Presidential Election win (competitive pitch against Ogilvy Media, ~Rs. 1Bn spend, 
   audited for transparency).
7. Featured case study — Astra "Rasa Mathaka" Integrated Campaign — built exactly on 
   their 4-part framework, laid out as four connected steps with icons:
   - Objective — reconnect consumers with 50+ years of nostalgic "Rasa Mathaka" heritage
   - Heritage — revived nostalgic memories tied to the brand
   - Engagement — nationwide memory-collection initiatives celebrating shared stories
   - Experience — immersive, live on-ground brand activations
   Below the framework, a results dashboard of animated stat counters: 8,500+ memory 
   collections nationwide, 7,000+ on-ground foot fall, 83M in media value across 11M 
   reach (993% ROMI), 588 exposures / 9,215 sec of airtime, 2.5M organic + 2.14M paid 
   reach, 1.7M organic + 5.6M paid views, and 18.9% volume share growth in Q1 2025. 
   Include a "Watch the Rasa Mathaka Journey 2025" video thumbnail with a play button.
8. Second case study — KIWI Shoe Polish Integrated Campaign — a shorter card in the same 
   visual style (challenge/execution/results, condensed to what's available), inviting a 
   "View more work" click for further case studies to be added in Phase 2.
9. Closing CTA band + footer.

Motion Notes: the Portfolio/Case Studies pill switcher smoothly scrolls to and highlights 
the active section; client logo wall items fade up on scroll with a slight hover-lift, 
color-reveal, and tooltip; award badges have a subtle shine/sweep animation on load; the 
4-step case study framework animates as a connected line drawing itself between steps as 
the user scrolls; result stat counters count up when in view; video thumbnail has a gentle 
pulsing play button.
```

---

## 5. CONTACT & PRIVACY PAGE PROMPT (unchanged from v1)

```
Design the CONTACT page (with a linked PRIVACY page) for The Insight Hive.

CONTACT PAGE:
1. Sticky nav bar: logo, links (Home / About / What We Do / Our Work / Contact), gradient "Let's Talk" pill button.
2. Two columns: left has headline "Let's build something great together", real contact 
   details (63 Fife Road, Colombo 5, Sri Lanka | +94 112 56 76 26 | info@dinsighthive.com), 
   social icons, and a map/location graphic; right has an enquiry form (Name, Email, 
   Company, Message, Submit) with gradient submit button and success state.
3. Footer with link to Privacy page.

PRIVACY PAGE: simple single-column legal layout, clear section headers, generous spacing, 
back-to-top link, minimal motion — just a calm fade-in on load.

Motion Notes: form fields glow softly on focus using the brand gradient; submit button 
shows a loading shimmer then a checkmark success animation.
```

---

### What changed vs. v1
| Page | v1 (generic) | v2 (cred-deck enriched, latest revision) |
|---|---|---|
| Home | Generic capabilities + placeholder work | Real client logo strip linking to full Portfolio, real award/milestone stats, philosophy pillars |
| About | Generic team/culture | Real founding story, "no silos" philosophy, real leadership names/bios, Omnicom/UM/Initiative network with sub-brand philosophies, a photo Gallery, and a dedicated social "Connect With Us" band |
| What We Do | 6 services only | Adds the 4 real differentiators + IPG Interact/KINESSO tech stack + "Big Picture" statement |
| Our Work | Generic portfolio grid | Now two clearly separated areas — **Our Portfolio** (full real client logo wall: Emirates, Litro Gas, Euro Motors, Marico, All Out/Baygon/Glade/KIWI/Pledge, Asthijeewa, UNDP, Wipro, Browns EV, MELBET, Bellosé, Astra) and **Case Studies** (Astra "Rasa Mathaka" full framework + results, KIWI Shoe Polish secondary case study) |
| Logo | — | Locked to the client's existing logo file exactly as supplied — no redesign. Brand gradient colors corrected to the exact values sampled from that file (#92278F → #F7941F) |
| Home + Nav (all pages) | No mascot; nav missing Home link | Photorealistic 3D bee mascot lands on hero letters, then wanders continuously and stays visible on screen at all times while scrolling; nav bar now includes Home |

### Heads-up on the bee animation specifically
Figma itself — including its AI — only produces flat 2D vector/raster graphics. It cannot 
generate or render a true photorealistic 3D bee; that model has to be created outside Figma 
and then brought in as an image, video, or animation asset. Two realistic paths to get 
there:

1. **Real 3D model + render** (best quality, most work): a 3D artist builds and textures 
   the bee in Blender or Cinema 4D, rigs the wings/legs/antennae, then either renders a 
   looping flight/flutter/landing animation as a transparent-background video (WebM/MP4) 
   or an image sequence, or exports it for a real-time 3D web library like Three.js/Spline 
   if you want it fully interactive and lit dynamically on the live page.
2. **AI-generated photoreal stills, animated as a 2D character** (faster, cheaper): 
   generate a small set of photorealistic bee poses (resting, wings-up, wings-down, banking 
   left/right) with an AI image tool, cut them out with transparent backgrounds, then 
   animate the *movement* (position, rotation, scale for pseudo-depth) in CSS/GSAP or 
   Lottie while swapping between the pose frames for the flutter — this fakes the "real 3D 
   bee" look convincingly without a full 3D pipeline.

Either way, treat the bee as a small dedicated production line item — 3D modeling/rendering 
or AI-asset generation, plus the "always on screen, wandering to random waypoints as the 
user scrolls" logic — separate from the rest of the Figma layout work, and get your dev or 
motion designer to confirm which of the two paths above fits your timeline and budget 
before committing to a launch date.
- In Figma itself: even without true 3D, you can still block out the interaction using 
  placeholder bee poses as an interactive component (perched, mid-flight, wings-up/down) 
  wired together with Smart Animate + "After Delay" triggers, so stakeholders can approve 
  the wandering pattern and timing before the final realistic asset is ready to drop in.

### A scope note worth flagging to the client
The brief marks most of this (detailed case studies beyond the two approved ones, the team bios, the network showreels) as either in-scope for "Our Work"/"About" or explicitly **Phase 2** ("further case studies," "Our Thinking," "custom showreel"). Worth confirming with The Insight Hive which of these enriched sections they want live on Day 1 vs. held for Phase 2, since it affects the five-day build timeline.