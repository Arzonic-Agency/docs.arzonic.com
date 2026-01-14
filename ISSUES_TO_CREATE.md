# 📋 Issues til docs.arzonic.com

Kopier hver sektion nedenfor og opret som et nyt issue på GitHub.

---

## Issue #1: Skriv "Kom godt i gang" guide
**Labels:** `content`, `high-priority`, `good-first-issue`

### Beskrivelse
Udfyld GetStarted-komponenten med praktisk indhold der hjælper nye brugere med at komme i gang med Arzonic Dashboard.

### Tasks
- [ ] Skriv "Hvad er Arzonic Dashboard?" sektion
- [ ] Lav "Login og adgang" guide med step-by-step
- [ ] Beskriv "Roller og tilladelser" (admin, redaktør)
- [ ] Tilføj welcome-billede eller illustration

### Acceptance Criteria
- Mindst 3 hovedsektioner med indhold
- Klart og forståeligt dansk sprog
- Inkluderer praktiske eksempler

### Filer at redigere
- `src/components/client/pages/GetStarted.tsx`

---

## Issue #2: Lav "Opret dit første opslag" tutorial
**Labels:** `content`, `high-priority`, `tutorial`

### Beskrivelse
Step-by-step guide til hvordan man opretter et nyhedsopslag i dashboardet, med screenshots.

### Tasks
- [ ] Tag screenshots af opslag-flowet i dashboard
- [ ] Skriv step-by-step guide
- [ ] Forklår upload af billeder/videoer
- [ ] Tilføj tips til god content

### Acceptance Criteria
- Minimum 5-7 steps med beskrivelser
- Mindst 3 screenshots inkluderet
- Dækker hele flowet fra start til publicering

### Filer at redigere
- `src/components/client/pages/NewsPosts.tsx`

---

## Issue #3: Tilføj screenshots til alle guides
**Labels:** `design`, `content`, `medium-priority`

### Beskrivelse
Tag screenshots af Arzonic Dashboard og tilføj dem til relevante steder i dokumentationen for bedre forståelse.

### Tasks
- [ ] Tag screenshots af dashboard oversigt
- [ ] Tag screenshots af brugeradministration
- [ ] Tag screenshots af indstillinger
- [ ] Optimer billeder (WebP format, compress)
- [ ] Tilføj alt-tekster på alle billeder

### Acceptance Criteria
- Mindst 10 screenshots tilføjet
- Alle billeder optimeret < 200KB
- Alt-tekster på alle billeder

### Mappe til billeder
- `/public/screenshots/` (opret hvis den ikke findes)

---

## Issue #4: Fjern console.logs fra produktion
**Labels:** `tech-debt`, `high-priority`, `cleanup`

### Beskrivelse
Fjern alle console.log statements fra komponenter (GetStarted.tsx, NewsPosts.tsx, PageContent.tsx, etc.)

### Tasks
- [ ] Find alle console.log statements
- [ ] Fjern eller erstat med proper logging
- [ ] Test at funktionalitet stadig virker

### Filer at rette
- `src/components/client/pages/GetStarted.tsx:13`
- `src/components/client/pages/NewsPosts.tsx:10`
- `src/components/client/home/PageContent.tsx:43,44,84,89,96,100,107`

### Acceptance Criteria
- Ingen console.logs i produktionskode
- Functionality virker stadig som forventet

---

## Issue #5: Tilføj breadcrumbs navigation
**Labels:** `feature`, `ux`, `medium-priority`

### Beskrivelse
Implementer breadcrumbs så brugere nemt kan se hvor de er i dokumentationen og navigere tilbage.

### Tasks
- [ ] Design breadcrumb komponent
- [ ] Implementer logik til at tracke current page
- [ ] Style med Tailwind + DaisyUI
- [ ] Test på mobile og desktop

### Acceptance Criteria
- Viser korrekt sti (f.eks. "Hjem > Kom godt i gang > Login")
- Klikbare links tilbage
- Responsive design

### Ny fil
- `src/components/elements/Breadcrumbs.tsx` (opret)

---

## Issue #6: Implementer søgefunktion i dokumentation
**Labels:** `feature`, `high-priority`, `ux`

### Beskrivelse
Tilføj simpel søgefunktion der lader brugere søge gennem dokumentations-titler og indhold.

### Tasks
- [ ] Design search input komponent
- [ ] Implementer search logik (client-side)
- [ ] Tilføj keyboard shortcut (/) for at åbne søgning
- [ ] Vis search results med highlights

### Acceptance Criteria
- Søger gennem alle titler og sektioner
- Keyboard shortcut "/" virker
- Viser relevante resultater

### Ny fil
- `src/components/elements/Search.tsx` (opret)

---

## Issue #7: Forbedre sidebar hover-effekter
**Labels:** `design`, `ui`, `good-first-issue`

### Beskrivelse
Tilføj subtile hover states og aktiv-state styling på sidebar menu items for bedre UX.

### Tasks
- [ ] Design hover animation (subtle scale/color)
- [ ] Tilføj aktiv-state indikator
- [ ] Implementer smooth transitions
- [ ] Test i både light og dark mode

### Acceptance Criteria
- Smooth hover effekt (transition)
- Tydeligt active state
- Virker i begge temaer

### Filer at redigere
- `src/components/client/layout/SideBar.tsx`
- `src/app/globals.css` (for custom styles)

---

## Issue #8: Tilføj loading skeletons
**Labels:** `ux`, `design`, `medium-priority`

### Beskrivelse
Skab bedre loading states med skeleton screens når indhold hentes.

### Tasks
- [ ] Design skeleton komponent
- [ ] Implementer for PageContent
- [ ] Implementer for sidebar
- [ ] Tilføj shimmer animation

### Acceptance Criteria
- Skeleton vises under load
- Matcher layout af færdigt indhold
- Smooth overgang til rigtigt indhold

### Ny fil
- `src/components/elements/Skeleton.tsx` (opret)

---

## Issue #9: Tilføj "Scroll to top" knap
**Labels:** `feature`, `ux`, `good-first-issue`

### Beskrivelse
Tilføj floating button der scroller til toppen på lange dokumentationssider.

### Tasks
- [ ] Design scroll-to-top button
- [ ] Implementer scroll logik
- [ ] Vis kun når scrollet > 500px
- [ ] Smooth scroll animation

### Acceptance Criteria
- Vises kun efter scroll
- Smooth animation tilbage til top
- Responsive placering

### Ny fil
- `src/components/elements/ScrollToTop.tsx` (opret)

---

## Issue #10: Tilføj "Var dette hjælpsomt?" feedback
**Labels:** `feature`, `analytics`, `low-priority`

### Beskrivelse
Feedback widget på bunden af hver guide så I kan måle om dokumentationen hjælper.

### Tasks
- [ ] Design feedback komponent (👍 👎)
- [ ] Implementer feedback tracking (Supabase/Analytics)
- [ ] Tilføj "Tak for feedback" confirmation
- [ ] Dashboard til at se feedback stats

### Acceptance Criteria
- Simple 👍/👎 buttons
- Gemmer feedback
- Confirmation message vises

### Ny fil
- `src/components/elements/FeedbackWidget.tsx` (opret)

---

## Issue #11: Optimer billeder til WebP
**Labels:** `performance`, `seo`, `medium-priority`

### Beskrivelse
Konverter alle billeder i `/public` til WebP format og tilføj lazy loading for bedre performance.

### Tasks
- [ ] Konverter PNG/JPG til WebP
- [ ] Behold fallback til PNG
- [ ] Implementer lazy loading
- [ ] Test lighthouse score forbedring

### Acceptance Criteria
- Alle billeder har WebP version
- Lazy loading implementeret
- Lighthouse score forbedres med min. 10 point

### Mappe
- `/public/` (alle undermapper)

---

## Issue #12: Tilføj meta descriptions til alle sider
**Labels:** `seo`, `medium-priority`

### Beskrivelse
Skriv og implementer unikke meta descriptions for bedre SEO.

### Tasks
- [ ] Skriv meta description for GetStarted
- [ ] Skriv meta description for NewsPosts
- [ ] Skriv meta description for UserManagement
- [ ] Skriv meta description for Support
- [ ] Implementer i layout/metadata

### Acceptance Criteria
- Alle sider har unik meta description
- 150-160 characters lang
- Indeholder relevante keywords

### Filer at redigere
- `src/app/layout.tsx`
- `src/app/(client)/page.tsx`

---

## Issue #13: Opdater README.md
**Labels:** `documentation`, `good-first-issue`

### Beskrivelse
Opdater README med relevant info om docs.arzonic.com projektet.

### Tasks
- [ ] Beskriv hvad docs.arzonic.com er
- [ ] Tilføj setup instructions
- [ ] Dokumenter folder struktur
- [ ] Tilføj contribution guidelines

### Acceptance Criteria
- Klart formål beskrevet
- Step-by-step setup guide
- Folder struktur dokumenteret
- Contribution guidelines tilføjet

### Fil at redigere
- `README.md`

---

## Issue #14: Lav FAQ sektion
**Labels:** `content`, `medium-priority`

### Beskrivelse
Saml ofte stillede spørgsmål om dashboard-brugen i en FAQ sektion.

### Tasks
- [ ] Identificer 8-10 FAQ spørgsmål
- [ ] Skriv svar på dansk
- [ ] Design accordion/collapse komponent
- [ ] Tilføj til Support sektion

### Acceptance Criteria
- Minimum 8 FAQ entries
- Klare og hjælpsomme svar
- Accordion/collapse funktionalitet
- Integreret i Support sektion

### Filer at redigere
- `src/components/client/pages/SupportContact.tsx`
- `src/components/elements/FAQAccordion.tsx` (opret)

---

## Issue #15: Tilføj dark mode toggle animation
**Labels:** `design`, `polish`, `good-first-issue`

### Beskrivelse
Gør overgangen mellem lys/mørk tema mere smooth med fade animation.

### Tasks
- [ ] Implementer CSS transition på theme switch
- [ ] Tilføj fade animation (300ms)
- [ ] Test performance
- [ ] Ensure no flash of unstyled content

### Acceptance Criteria
- Smooth fade transition (300ms)
- Ingen FOUC (Flash of Unstyled Content)
- Virker på alle browsere

### Filer at redigere
- `src/app/globals.css`
- `src/components/client/layout/Header.tsx` (hvis theme toggle er her)

---

## 🚀 Hurtig oprettelse

Gå til: https://github.com/Arzonic-Agency/docs.arzonic.com/issues/new

Eller brug scriptet med en GitHub token:
```bash
cd /Users/marcmoller/Documents/GitHub/docs.arzonic.com
export GITHUB_TOKEN=din_token_her
node create-issues.js
```
