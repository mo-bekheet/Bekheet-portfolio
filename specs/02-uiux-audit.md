# UI/UX Audit: bekheet.com

**Date:** 4 September 2026
**Tested at:** 1440x900, 1280x800 and 375x812 (mobile emulation, Android UA)
**Pages covered:** Homepage, About, Projects, Certifications, Resume, reached by clicking inside the app
**Method:** Every issue below was measured in the DOM or seen in a screenshot. The contact form was not submitted.

---

## Summary table

| # | Issue | Severity | Area |
|---|-------|----------|------|
| 1 | Hamburger menu is off-screen on mobile, site unreachable | CRITICAL | Layout, navigation |
| 2 | Floating chat button sits on top of contact form fields | CRITICAL | Overlap |
| 3 | Navigation links have no hover feedback at all | HIGH | Hover states |
| 4 | Keyboard focus indicators have been switched off | HIGH | Accessibility |
| 5 | 32 of 47 interactive elements have no accessible name | HIGH | Accessibility |
| 6 | Contact form has empty labels and no validation feedback | HIGH | Forms |
| 7 | Highlighted phrases look like links but are not clickable | HIGH | Affordance |
| 8 | Resume page is a single flat image | HIGH | Content, accessibility |
| 9 | Project card buttons do not line up, longest card cramped | MEDIUM | Spacing, alignment |
| 10 | Certification badges inconsistent, none verifiable | MEDIUM | Consistency |
| 11 | Carousel arrows 20x20 with no labels, content triplicated | MEDIUM | Tap targets, a11y |
| 12 | One testimonial avatar links to the wrong person | MEDIUM | Correctness |
| 13 | Inconsistent icon set, two logos read as solid blocks | MEDIUM | Visual consistency |
| 14 | Mobile social row wraps four plus one, leaving an orphan | MEDIUM | Responsive layout |
| 15 | No dimensions on any image, nothing lazy-loaded | MEDIUM | Layout shift |
| 16 | Missing space in the About copy | LOW | Copy |
| 17 | Vertical rhythm between sections is uneven | LOW | Spacing |
| 18 | Background colours declared in three unrelated dark tones | LOW | Theming |
| 19 | Font stack falls back to a serif | LOW | Typography |
| 20 | Visitor counter looks dated and depends on a third party | LOW | Visual, trust |

---

# CRITICAL

## 1. On a phone, the hamburger menu is off-screen and the site is unreachable

**Issue Description:** At 375px wide, the page's scroll width is 461px against a 375px viewport, so the layout is 86px wider than the screen. The fixed navbar stretches to that full 461px, which pushes the hamburger toggle to x=364 through x=417. Only about 11px of a 53px button falls inside the visible area, and in a screenshot nothing appears in the top right corner at all.

The cause is exactly one element. `.form-container` in the contact section sits in its pre-animation state with `transform: matrix(1, 0, 0, 1, 100, 0)` and `opacity: 0`. Its parent column is correctly at 12px to 363px, but the 100px translate pushes the child to 461px. Because no ancestor clips horizontally, that transform expands the page. It only resolves once the visitor scrolls the contact section into view, and by then they have already given up on the menu.

**Impact on UI/UX:** Total navigation failure on mobile, where most people open a portfolio link from LinkedIn. About, Projects, Certifications and Resume are unreachable. The page also scrolls sideways, which makes every vertical swipe feel loose and drifts content off the edge. When the menu is somehow opened, the toggle is still off-screen, so there is no visible way to close it.

**Suggested Improvement:** Two changes.

1. Stop the transform from widening the page:

```css
body { overflow-x: clip; }
```

`clip` is preferred over `hidden` because it does not create a scroll container.

2. Fix the animation so it never overflows: either give the animated element's wrapper `overflow: hidden`, or animate opacity plus a small `translateY` instead of `translateX`.

As a rule, never animate `translateX` on a full-width block without a clipping ancestor.

**Verification:** Load on a phone and confirm `document.documentElement.scrollWidth === clientWidth` at first paint, before any scrolling.

---

## 2. The floating chat button sits on top of the contact form fields

**Issue Description:** `.chatbot-toggle` is `position: fixed` at 1293 to 1383 horizontally and 760 to 850 vertically, with `z-index: 1000`. At 1440px wide, with the contact section in view, that rectangle overlaps:

- the email input (770 to 1344, 755 to 805)
- the message textarea (770 to 1344, 845 to 1039)

Both intersections were verified numerically and seen in a screenshot, where the purple bubble covers the right end of the email field. On the Resume page at around 800px wide, the same button lands on top of the resume image and hides part of the experience section.

**Impact on UI/UX:** The right 51px of two form fields is not clickable, because the tap lands on the chat button instead. A visitor who clicks near the end of the email field gets a chat panel they did not ask for, in the exact moment they were trying to make contact. This is the worst possible place to lose an interaction, since the contact form is the site's only conversion point.

**Suggested Improvement:** Give the form and the button their own lanes rather than nudging the button.

- Add right padding to the contact card so no field extends under the button's column, for example `padding-right: 120px` above 992px, and reduce the form's max width.
- Hide or shrink the launcher while the contact section is on screen, using an IntersectionObserver that adds a class:

```css
.chatbot-toggle--tucked { transform: translateY(140%); }
```

Keep at least 24px of clearance between the button's bounding box and any interactive element. Re-test at 1024, 1280, 1440 and 1920.

---

# HIGH

## 3. Navigation links have no hover feedback at all

**Issue Description:** The nav was built with an animated underline. `.navbar-nav .nav-item a::after` defines a 5px purple bar and `.navbar-nav .nav-item a:hover::after { width: 100%; }` grows it. A later rule cancels it entirely:

```css
.navbar-nav .nav-item a::after { display: none !important; }
```

The colour cannot change either, because `.navbar-nav .nav-link { color: rgb(255,255,255) !important; }` outranks the generic `a:hover` rules. Hovering Projects and About and comparing screenshots shows nothing changes. Separately there is no `active` class and no `aria-current` on any nav link, so nothing marks the current page.

**Impact on UI/UX:** Hover is how a pointer user confirms a target is live before committing to a click. With no colour shift, no underline and no background change, the top nav reads as static text, and people hesitate or click twice. The missing current-page marker compounds it, since after navigating there is no confirmation of where they landed.

**Suggested Improvement:**

- Delete the `display: none !important` override so the underline animation already written can run.
- Drop `!important` from the nav-link colour so a hover colour can win.
- Style both states in the brand purple rather than the stray blue in the generic rules:

```css
.navbar-nav .nav-link:hover { color: #c770f0; }
.navbar-nav .nav-link.active { color: #c770f0; }
```

In React Router, `NavLink` adds the active class automatically. Also fix the two conflicting `a:hover` colours (`rgb(83,91,242)` and `rgb(116,123,255)`), neither of which is in the palette. Pick one purple and define it once as a token.

---

## 4. Keyboard focus indicators have been switched off

**Issue Description:** Several rules remove the focus ring:

```css
.btn:focus { outline: none !important; box-shadow: none !important; }
.navbar-toggler:focus, .navbar-toggler:active { outline: 0 !important; }
.slick-prev:focus, .slick-next:focus { outline: none; }
.slick-dots li button:focus { outline: none; }
```

The hamburger also has no `aria-expanded` attribute, so its open or closed state is never announced. There is no skip link on the page.

**Impact on UI/UX:** Anyone navigating by keyboard, whether by preference, injury, or because they are using a screen reader, cannot see which element is selected. On the buttons above the focus ring is not restyled, it is deleted, so the state is completely invisible. This fails WCAG 2.4.7 Focus Visible, and it is a poor look on the portfolio of an engineer whose work is judged partly on craft.

**Suggested Improvement:** Never remove a focus ring without replacing it. Delete those `outline: none` declarations and add one global style that matches the theme:

```css
:focus-visible {
  outline: 3px solid #c770f0;
  outline-offset: 3px;
  border-radius: 4px;
}
```

Because `:focus-visible` only triggers for keyboard interaction, mouse users never see it, which is usually the reason people remove outlines in the first place. Add `aria-expanded` to the toggle, bound to the open state, and add a skip link as the first focusable element:

```html
<a class="skip-link" href="#main">Skip to content</a>
```

Visually hidden until focused.

---

## 5. Two thirds of the interactive elements have no name

**Issue Description:** The homepage has 47 focusable elements and 32 of them have no text, no `aria-label` and no `title`. That includes:

- all five hero social links (chat, GitHub, LinkedIn, Kaggle, dev.to)
- the same five in the footer
- all seven testimonial avatar links
- the pill in the top right of the nav, which is `<a role="button" href="https://github.com/mohamedbakhet/Bekheet.github.io" target="_blank">` holding two bare SVGs and nothing else

The whole page has exactly one `title` attribute.

**Impact on UI/UX:** A screen reader announces these as "link" with no destination, so ten social profiles are unusable. For sighted users the effect is milder but real: the nav pill shows a fork icon and a star with no count and no label, so it reads as a decorative or broken control rather than a link to a repository. Nobody clicks a control they cannot identify.

**Suggested Improvement:** Give every icon-only control an explicit name, for example `aria-label="GitHub profile"`, `aria-label="LinkedIn profile"`, `aria-label="Mahmoud Yahia on LinkedIn"`. For the nav pill, either add a visible label with live counts ("Star on GitHub, 12") or remove it. If kept, point it at the current repository rather than the older `Bekheet.github.io` one, and add `title` so hover explains it too.

**Verification:** Tab through the page and read the accessible name of each stop. Anything that says only "link" needs a label.

---

## 6. The contact form has empty labels and no validation feedback

**Issue Description:** The markup is three `<label class="form-label">` wrappers containing only inputs, with no label text at all, so the only naming comes from placeholders: "Your Name", "Your email", "Message". No field has `required`, none has an `autocomplete` attribute, and there is no visible error or success region in the markup. The form has no `action` and relies entirely on JavaScript.

```html
<form class="form">
  <label class="form-label"><input type="text" name="name" placeholder="Your Name" class="nameinput"></label>
  <label class="form-label"><input type="email" name="email" placeholder="Your email" class="nameinput"></label>
  <label class="form-label"><textarea rows="7" name="message" placeholder="Message" class="nameinput"></textarea></label>
  <button type="submit" class="submit-button">Send</button>
</form>
```

**Impact on UI/UX:** Placeholder-only labelling breaks in three ways. The label vanishes the moment someone starts typing, so they cannot check what a half-filled field was for. Placeholder grey is deliberately low contrast, so it reads as a filled-in value to some users. And an empty `<label>` gives assistive technology nothing. With no `required` and no visible feedback, a visitor who submits an empty or malformed form gets silence and has no idea whether the message arrived. On the site's single conversion point, that silence costs real leads.

**Suggested Improvement:**

- Add visible label text above each field, keeping the placeholder as an example only: label "Email", placeholder "you@company.com".
- Add `required` and `autocomplete="name"` / `autocomplete="email"`.
- Render inline validation messages tied to fields with `aria-describedby`.
- Add a live region (`role="status" aria-live="polite"`) showing "Message sent, I will reply within a day" or a clear failure message with a fallback email address.
- Disable the Send button and show a spinner while the request is in flight, so nobody double-submits.

---

## 7. Highlighted phrases look exactly like links but are not clickable

**Issue Description:** In the About text, ten phrases are `<b class="purple">` with `color: rgb(199, 112, 240)`, the same accent used for real links. Computed `cursor` is `auto` and there is no underline. Affected phrases include "Machine Learning Engineer", "Computer Vision, Generative AI, MLOps, and Data Science", "Python", "AWS", "SageMaker and Bedrock" and "optimize systems".

**Impact on UI/UX:** Coloured inline text inside a paragraph is the strongest link signal on the web. Users will hover and click these, get nothing, and learn to distrust coloured text everywhere else on the site, including the real links. It also weakens the intended emphasis, because so many phrases in a row are highlighted that nothing stands out.

**Suggested Improvement:** Pick one of two directions.

- Make them real links. This is the better answer, since half of them are the strongest skills on the page and could point at the matching project or certification, giving the page useful internal navigation.
- Or keep them as emphasis but change the treatment so they cannot be mistaken for links: weight plus a slightly lighter neutral tone, or a subtle background chip, reserving purple strictly for links.

Either way, cut the number of highlighted phrases to two or three per section so emphasis means something.

---

## 8. The Resume page is a single flat image

**Issue Description:** The entire resume is one bitmap (`Mohamed-Bekheet_page-0001...`, natural size 1190x1684, displayed at 900x1240). The whole page contains 130 characters of real text: the nav, the heading "My Resume", the two download buttons, and the footer. There are no `mailto:` or `tel:` links anywhere on the page. The image alt text is the generic "Mohamed Bekheet - Machine Learning Engineer Resume".

**Impact on UI/UX:** A recruiter cannot select the email address or phone number to copy them, cannot use browser search to find a keyword, and cannot zoom without the text going soft, since 1190px across a 900px box gives barely 1.3x on a retina screen. On a phone the same image is squeezed to roughly 340px wide, which makes the body text physically unreadable. Screen readers get one sentence in place of an entire career history. The 1240px-tall image also carries the phone number as pixels, which is fine for a person but useless for anyone trying to act on it quickly.

**Suggested Improvement:** Rebuild the resume as HTML using the same section structure the image shows, styled to look the way the image looks. That gives selectable text, working `mailto:` and `tel:` links, search, real zoom, correct rendering at every width, and a page search engines and screen readers can read. Keep the "Download Full CV" PDF button for people who want the file.

Interim step if a full rebuild is too much: place the resume PDF in an embedded viewer with a text layer rather than a flattened image, and add the contact details above it as live HTML links.

---

# MEDIUM

## 9. Project card buttons do not line up, and the longest card is cramped

**Issue Description:** Cards in a row are equal height (579px in row one, 663px in row two) but the GitHub button floats directly under the text, so its distance from the card's bottom edge varies across a single row:

| Row | Card 1 | Card 2 | Card 3 |
|-----|--------|--------|--------|
| 1 | 123px | 106px | 17px |
| 2 | 131px | 47px | 17px |

The card with the most text leaves only 17px of space beneath its button. All card body copy uses `text-align: justify`. The buttons are 38px tall.

**Impact on UI/UX:** Buttons at three different heights in one row break the horizontal scan line, so the eye cannot compare cards quickly and the grid reads as accidental rather than designed. The 17px gap under the third button looks like a rendering error next to the 123px gap beside it. Justified text in a 390px column forces uneven word spacing and visible rivers of white, which measurably slows reading. And 38px is under the 44px minimum for a comfortable touch target.

**Suggested Improvement:** Make each card a flex column and push the footer down, so every CTA sits on the same baseline.

```css
.project-card-view { display: flex; flex-direction: column; padding: 1.5rem; }
.project-card-view .card-text { flex: 1 1 auto; }
.project-card-view .btn { margin-top: auto; align-self: center; min-height: 44px; }
```

Change `text-align: justify` to `left` on card copy. Cap the description at a consistent length, around 180 characters, so cards carry similar weight. Label the button for what it does, for example "View code on GitHub", and add a second "Live demo" button where one exists.

---

## 10. Certification badges are inconsistent in size, shape and quality, and none can be verified

**Issue Description:** The nine badge images range from 200x191 to 1090x600 in natural size, all forced into a 250px-tall `object-fit: contain` box.

- The Azure AI Engineer badge at 200x191 is upscaled to 262x250, so it renders soft.
- The HCCDP-AI entry is a landscape certificate document (800x564) shrunk to 318x250, which makes its printed text unreadable.
- Card titles wrap to two lines in three cases and one line in the rest, so badge tops within the same row sit at 367px versus 379px.
- None of the nine cards is a link.

**Impact on UI/UX:** A certifications wall is scanned for credibility, so uneven scale and one blurry badge undercut the exact impression the page exists to create. The shrunken certificate document is worse than no image, since it shows there is something to read and then does not let anyone read it. Most importantly, a recruiter who wants to confirm an AWS certification has nowhere to click, and unverifiable credentials carry much less weight than linked ones.

**Suggested Improvement:**

- Export every badge as a square PNG at 600x600 with transparent padding.
- For the Huawei certificate use the badge artwork rather than the certificate scan, or link the scan behind a "View certificate" action.
- Reserve a fixed two-line height for the title (`min-height: 3em`) so badges align regardless of title length.
- Make each card a link to its Credly or issuer verification page (the resume already lists `credly.bekheet.com`), add a hover lift so it reads as clickable, and show the issue date under each title.

---

## 11. Carousel arrows are 20x20 pixels with no labels, and the testimonials exist three times over

**Issue Description:** `.slick-prev` and `.slick-next` measure 20x20 pixels and have neither visible text (`font-size: 0`) nor an `aria-label`, so they have no accessible name. The seven testimonials are rendered three times in the DOM as carousel clones, which is why 15 of the page's 47 focusable elements sit inside slides. The active testimonial is a 592px-wide, 480px-tall block of centre-aligned italic text, about ten lines long.

**Impact on UI/UX:** A 20px target is below the 24x24 WCAG minimum and roughly a quarter of the recommended 44px touch area, so on a phone people miss the arrows and conclude the carousel is stuck. With no accessible name, keyboard and screen reader users have no way to advance it. The triple rendering means a keyboard user tabs through 21 testimonials to get past the section, and screen readers read the recommendations three times. Centre-aligned text ten lines deep gives the eye no consistent left edge to return to, which makes a long quote much harder to read than it needs to be.

**Suggested Improvement:**

- Restyle the arrows to at least 44x44 with a visible circular background, and add `aria-label="Previous testimonial"` and `aria-label="Next testimonial"`.
- Mark cloned slides `aria-hidden="true"` with `tabindex="-1"`, which Slick supports through its accessibility options, or render only the active slide plus its neighbours.
- Left-align the quote text and cap the visible length at about 300 characters with a "Read more" toggle.
- Add pause-on-hover plus a visible pause control if the carousel auto-advances.

---

## 12. One testimonial avatar links to the wrong person's profile

**Issue Description:** The avatar labelled "Mohamed Elesawy" links to `https://www.linkedin.com/in/eslamelassal/`, which is Eslam Elassal's profile. The same URL is correctly used for the Eslam Elassal avatar, so it has been duplicated.

**Impact on UI/UX:** Clicking one colleague's photo opens a different colleague's profile. Anyone checking references, which is the whole purpose of a testimonial section, finds a name that does not match the page they land on, and that reads either as carelessness or as a fabricated recommendation. It is also mildly awkward for the two people involved.

**Suggested Improvement:** Correct that single URL to Mohamed Elesawy's own LinkedIn profile. Since the testimonial data is a hand-maintained array, add a guard while in there: assert that the profile URLs in the list are unique, and give each avatar an `aria-label` naming the person it links to, which also makes this class of mistake obvious on inspection.

---

## 13. Inconsistent icon set: two logos read as solid blocks

**Issue Description:** The five hero social icons are all rendered at 24x24 in a 56x56 tile with the same fill colour. Three of them (chat, GitHub, LinkedIn) are simple monochrome glyphs. The other two are wordmarks: the Kaggle logotype and the DEV badge. At 24px, the Kaggle wordmark and the DEV block render as light rectangles with no legible letterforms, clearly visible in a screenshot next to the clean glyphs beside them.

**Impact on UI/UX:** Two of five profile links are visually unidentifiable, so people do not click them. Worse, a light filled rectangle next to three clean glyphs looks like a broken or missing image, which makes the hero, the first thing anyone sees, look unfinished.

**Suggested Improvement:** Use glyph-style marks for the full set. React Icons has `SiKaggle` and `SiDevdotto`, both single-path glyphs rather than wordmarks, so all five will match. If keeping the wordmarks, drop the tile treatment for those two and render them wider at their natural aspect ratio with a text label underneath. Check the row at 24px on a real screen, not zoomed in.

---

## 14. Mobile social row wraps four plus one, leaving an orphan

**Issue Description:** On a 375px viewport, the five hero social tiles wrap into a row of four with the fifth (DEV) centred alone on a second row.

**Impact on UI/UX:** An orphaned single item under a full row is one of the most noticeable signs of an unfinished mobile layout, and it draws the eye to the odd item rather than to the set. It also adds 90px of height in the most valuable part of the screen.

**Suggested Improvement:** Make the set fit one row at 375px by reducing the tile to 48x48 and the gap to 12px, which needs 288px and leaves comfortable margins. Alternatively use `display: grid; grid-template-columns: repeat(5, 1fr);` so the row scales down together rather than wrapping. If a sixth profile is added later, switch to a deliberate 3x2 grid rather than letting it wrap.

---

## 15. No dimensions on any image, and nothing is lazy-loaded

**Issue Description:** All 26 images on the homepage lack `width` and `height` attributes, and none uses `loading="lazy"`. That includes the seven testimonial photos, each present three times because of the carousel clones.

**Impact on UI/UX:** Without dimensions the browser cannot reserve space, so text jumps as each image arrives. This is the layout shift people experience as "the page moved while I was reading it", and it is especially annoying with the hero image and the About portrait. Loading all 26 images upfront, including roughly 14 duplicated clones far below the fold, also delays the first meaningful paint on a phone connection.

**Suggested Improvement:** Add explicit `width` and `height` attributes (or a CSS `aspect-ratio`) to every image so space is reserved before the bytes arrive. Add `loading="lazy"` and `decoding="async"` to everything below the fold, and keep the hero image eager with `fetchpriority="high"`. Deduplicating the testimonial clones (issue 11) removes about 14 image requests on its own.

---

# LOW

## 16. Missing space in the About copy

**Issue Description:** The final About paragraph reads "I actively explore emerging AI technologies andoptimize systems for efficiency". The space is missing between "and" and "optimize", almost certainly because the `<b class="purple">` wrapper starts immediately after "and" in the JSX.

**Impact on UI/UX:** Small, but it is in the last line of a personal introduction, where a reader is forming an impression of attention to detail. Typos in a portfolio's own bio are noticed disproportionately.

**Suggested Improvement:** Add the space outside the tag, as `and <b className="purple">optimize systems</b>`. In JSX a literal space before a tag on the same line is preserved; a line break between them is not, so use `{' '}` if they stay on separate lines. Read the whole About block end to end while in there.

---

## 17. Vertical rhythm between sections is uneven

**Issue Description:** Measured on the homepage:

| Boundary | Gap |
|----------|-----|
| About text ends (1603px) to Testimonial heading (1853px) | 250px |
| Testimonial carousel ends (~2668px) to Contact section (3115px) | ~447px |
| Contact card ends (3585px) to footer (3711px) | 126px |

So consecutive section gaps run 250, 447 and 126 pixels. The 447px band is filled with nothing but the starfield.

**Impact on UI/UX:** Consistent spacing is what tells a reader "this block has ended, a new one begins". When gaps vary by more than three times, the page loses that rhythm. The 447px void before Contact reads as the end of the site, so some visitors stop scrolling and never see the form, while the 126px gap before the footer makes the contact card feel crowded against it.

**Suggested Improvement:** Define a spacing scale as tokens (24, 48, 96, 144px) and apply one value as the standard section gap, most likely 96px at desktop and 64px on mobile, using `padding-block` on a shared `.section` class rather than per-block margins. That also removes the dead band before Contact. Then check that no section relies on an empty spacer element for its spacing.

---

## 18. Background colours are declared in three unrelated dark tones

**Issue Description:**

- `html` has `background-color: rgb(36, 36, 36)`, a neutral dark grey
- `body` has `background-color: rgb(255, 255, 255)` with a purple gradient image painted over it: `linear-gradient(to left, rgb(27,20,41), rgb(20,15,35))`
- the footer is `rgb(33, 33, 33)`, another neutral grey

**Impact on UI/UX:** The neutral greys have no purple in them, so where they show they read as a slightly dirty patch against the surrounding violet. The `html` grey appears during rubber-band overscroll at the top and bottom of the page on macOS and iOS. Separately, the white `body` colour under a gradient image is fragile: all body text is white, so in any situation where the gradient does not paint, such as printing the page or a background-image failure, white text lands on white.

**Suggested Improvement:** Define the palette once as custom properties and use them everywhere:

```css
:root { --bg: #150a24; --surface: #1b1429; }
```

Set `background-color: var(--bg)` on both `html` and `body`, keeping the gradient as a layer on top rather than the only source of darkness, and give the footer `var(--surface)` instead of `rgb(33,33,33)`. Add a small print stylesheet that sets dark text on white, since a resume site does get printed.

---

## 19. The font stack falls back to a serif

**Issue Description:** Body text computes to `font-family: Raleway, serif`. Raleway is a geometric sans, and the only fallback is the generic `serif`.

**Impact on UI/UX:** While Raleway is loading, or if it fails to load, the page renders in Times-style serif, which looks like a completely different site and shifts line lengths noticeably when the real font swaps in.

**Suggested Improvement:** Change the stack to a sans fallback chain, for example `font-family: Raleway, "Helvetica Neue", Arial, system-ui, sans-serif;`, and add `font-display: swap` to the `@font-face` declaration if self-hosting, so text is readable immediately in a metrically similar fallback.

---

## 20. The visitor counter looks like a different decade and depends on a third party

**Issue Description:** The footer loads a 100x27 pixel odometer graphic from `hitwebcounter.com/counter/counter.php`, labelled "Visitors:", showing 00678 at the time of the audit.

**Impact on UI/UX:** The retro segmented-digit graphic clashes with an otherwise modern dark interface, and the pattern reads as dated to anyone who remembers when it was common. It also puts an uncached third-party request in the footer, so if that host is slow the footer stalls, and it shares visitor requests with a service the site owner does not control. The specific number is a further problem: a low public count signals low traffic to exactly the recruiters and clients the site is meant to impress.

**Suggested Improvement:** Remove it and use Vercel Analytics or Plausible, which measure the same thing server side, show more, add nothing to the page, and keep the number private. If a public trust signal is wanted in the footer instead, a line such as "Open to ML engineering roles, based in Cairo" does far more work in the same space.

---

## The two to fix first

Issue 1 (mobile overflow) and issue 2 (chat button overlap). Between them they break navigation on phones and block the site's only contact form on desktop, and both are a handful of CSS lines. Everything else improves the experience. Those two are actively losing contacts right now.

---

## Notes and things not verified

- **prefers-reduced-motion is partly handled.** Two CSS media blocks for `(prefers-reduced-motion: reduce)` exist. The JavaScript-driven particle field (tsParticles) and the Three.js globe are separate systems and were not verified against that preference. Worth checking that both are skipped or slowed when a visitor asks for reduced motion.
- **Colour contrast passes where measured.** Accent purple `rgb(199,112,240)` on the dark background measures 6.36:1 and white body text measures 19.08:1, both comfortably above WCAG AA. Placeholder text in the contact form was not measured.
- **Cross-cutting note.** All four inner routes still return a hard 404 on direct load (see the SEO audit), so every page reviewed here is reachable only by clicking inside the app.
