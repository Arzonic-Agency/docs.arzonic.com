const issues = [
  {
    title: "Skriv \"Kom godt i gang\" guide",
    body: `## Beskrivelse
Udfyld GetStarted-komponenten med praktisk indhold der hjælper nye brugere med at komme i gang med Arzonic Dashboard.

## Tasks
- [ ] Skriv "Hvad er Arzonic Dashboard?" sektion
- [ ] Lav "Login og adgang" guide med step-by-step
- [ ] Beskriv "Roller og tilladelser" (admin, redaktør)
- [ ] Tilføj welcome-billede eller illustration

## Acceptance Criteria
- Mindst 3 hovedsektioner med indhold
- Klart og forståeligt dansk sprog
- Inkluderer praktiske eksempler

## Filer at redigere
- \`src/components/client/pages/GetStarted.tsx\``,
    labels: ["content", "high-priority", "good-first-issue"]
  },
  {
    title: "Lav \"Opret dit første opslag\" tutorial",
    body: `## Beskrivelse
Step-by-step guide til hvordan man opretter et nyhedsopslag i dashboardet, med screenshots.

## Tasks
- [ ] Tag screenshots af opslag-flowet i dashboard
- [ ] Skriv step-by-step guide
- [ ] Forklår upload af billeder/videoer
- [ ] Tilføj tips til god content

## Acceptance Criteria
- Minimum 5-7 steps med beskrivelser
- Mindst 3 screenshots inkluderet
- Dækker hele flowet fra start til publicering

## Filer at redigere
- \`src/components/client/pages/NewsPosts.tsx\``,
    labels: ["content", "high-priority", "tutorial"]
  },
  {
    title: "Tilføj screenshots til alle guides",
    body: `## Beskrivelse
Tag screenshots af Arzonic Dashboard og tilføj dem til relevante steder i dokumentationen for bedre forståelse.

## Tasks
- [ ] Tag screenshots af dashboard oversigt
- [ ] Tag screenshots af brugeradministration
- [ ] Tag screenshots af indstillinger
- [ ] Optimer billeder (WebP format, compress)
- [ ] Tilføj alt-tekster på alle billeder

## Acceptance Criteria
- Mindst 10 screenshots tilføjet
- Alle billeder optimeret < 200KB
- Alt-tekster på alle billeder

## Mappe til billeder
- \`/public/screenshots/\` (opret hvis den ikke findes)`,
    labels: ["design", "content", "medium-priority"]
  },
  {
    title: "Fjern console.logs fra produktion",
    body: `## Beskrivelse
Fjern alle console.log statements fra komponenter (GetStarted.tsx, NewsPosts.tsx, PageContent.tsx, etc.)

## Tasks
- [ ] Find alle console.log statements
- [ ] Fjern eller erstat med proper logging
- [ ] Test at funktionalitet stadig virker

## Filer at rette
- \`src/components/client/pages/GetStarted.tsx:13\`
- \`src/components/client/pages/NewsPosts.tsx:10\`
- \`src/components/client/home/PageContent.tsx:43,44,84,89,96,100,107\`

## Acceptance Criteria
- Ingen console.logs i produktionskode
- Functionality virker stadig som forventet`,
    labels: ["tech-debt", "high-priority", "cleanup"]
  },
  {
    title: "Tilføj breadcrumbs navigation",
    body: `## Beskrivelse
Implementer breadcrumbs så brugere nemt kan se hvor de er i dokumentationen og navigere tilbage.

## Tasks
- [ ] Design breadcrumb komponent
- [ ] Implementer logik til at tracke current page
- [ ] Style med Tailwind + DaisyUI
- [ ] Test på mobile og desktop

## Acceptance Criteria
- Viser korrekt sti (f.eks. "Hjem > Kom godt i gang > Login")
- Klikbare links tilbage
- Responsive design

## Ny fil
- \`src/components/elements/Breadcrumbs.tsx\` (opret)`,
    labels: ["feature", "ux", "medium-priority"]
  },
  {
    title: "Implementer søgefunktion i dokumentation",
    body: `## Beskrivelse
Tilføj simpel søgefunktion der lader brugere søge gennem dokumentations-titler og indhold.

## Tasks
- [ ] Design search input komponent
- [ ] Implementer search logik (client-side)
- [ ] Tilføj keyboard shortcut (/) for at åbne søgning
- [ ] Vis search results med highlights

## Acceptance Criteria
- Søger gennem alle titler og sektioner
- Keyboard shortcut "/" virker
- Viser relevante resultater

## Ny fil
- \`src/components/elements/Search.tsx\` (opret)`,
    labels: ["feature", "high-priority", "ux"]
  },
  {
    title: "Forbedre sidebar hover-effekter",
    body: `## Beskrivelse
Tilføj subtile hover states og aktiv-state styling på sidebar menu items for bedre UX.

## Tasks
- [ ] Design hover animation (subtle scale/color)
- [ ] Tilføj aktiv-state indikator
- [ ] Implementer smooth transitions
- [ ] Test i både light og dark mode

## Acceptance Criteria
- Smooth hover effekt (transition)
- Tydeligt active state
- Virker i begge temaer

## Filer at redigere
- \`src/components/client/layout/SideBar.tsx\`
- \`src/app/globals.css\` (for custom styles)`,
    labels: ["design", "ui", "good-first-issue"]
  },
  {
    title: "Tilføj loading skeletons",
    body: `## Beskrivelse
Skab bedre loading states med skeleton screens når indhold hentes.

## Tasks
- [ ] Design skeleton komponent
- [ ] Implementer for PageContent
- [ ] Implementer for sidebar
- [ ] Tilføj shimmer animation

## Acceptance Criteria
- Skeleton vises under load
- Matcher layout af færdigt indhold
- Smooth overgang til rigtigt indhold

## Ny fil
- \`src/components/elements/Skeleton.tsx\` (opret)`,
    labels: ["ux", "design", "medium-priority"]
  },
  {
    title: "Tilføj \"Scroll to top\" knap",
    body: `## Beskrivelse
Tilføj floating button der scroller til toppen på lange dokumentationssider.

## Tasks
- [ ] Design scroll-to-top button
- [ ] Implementer scroll logik
- [ ] Vis kun når scrollet > 500px
- [ ] Smooth scroll animation

## Acceptance Criteria
- Vises kun efter scroll
- Smooth animation tilbage til top
- Responsive placering

## Ny fil
- \`src/components/elements/ScrollToTop.tsx\` (opret)`,
    labels: ["feature", "ux", "good-first-issue"]
  },
  {
    title: "Tilføj \"Var dette hjælpsomt?\" feedback",
    body: `## Beskrivelse
Feedback widget på bunden af hver guide så I kan måle om dokumentationen hjælper.

## Tasks
- [ ] Design feedback komponent (👍 👎)
- [ ] Implementer feedback tracking (Supabase/Analytics)
- [ ] Tilføj "Tak for feedback" confirmation
- [ ] Dashboard til at se feedback stats

## Acceptance Criteria
- Simple 👍/👎 buttons
- Gemmer feedback
- Confirmation message vises

## Ny fil
- \`src/components/elements/FeedbackWidget.tsx\` (opret)`,
    labels: ["feature", "analytics", "low-priority"]
  },
  {
    title: "Optimer billeder til WebP",
    body: `## Beskrivelse
Konverter alle billeder i \`/public\` til WebP format og tilføj lazy loading for bedre performance.

## Tasks
- [ ] Konverter PNG/JPG til WebP
- [ ] Behold fallback til PNG
- [ ] Implementer lazy loading
- [ ] Test lighthouse score forbedring

## Acceptance Criteria
- Alle billeder har WebP version
- Lazy loading implementeret
- Lighthouse score forbedres med min. 10 point

## Mappe
- \`/public/\` (alle undermapper)`,
    labels: ["performance", "seo", "medium-priority"]
  },
  {
    title: "Tilføj meta descriptions til alle sider",
    body: `## Beskrivelse
Skriv og implementer unikke meta descriptions for bedre SEO.

## Tasks
- [ ] Skriv meta description for GetStarted
- [ ] Skriv meta description for NewsPosts
- [ ] Skriv meta description for UserManagement
- [ ] Skriv meta description for Support
- [ ] Implementer i layout/metadata

## Acceptance Criteria
- Alle sider har unik meta description
- 150-160 characters lang
- Indeholder relevante keywords

## Filer at redigere
- \`src/app/layout.tsx\`
- \`src/app/(client)/page.tsx\``,
    labels: ["seo", "medium-priority"]
  },
  {
    title: "Opdater README.md",
    body: `## Beskrivelse
Opdater README med relevant info om docs.arzonic.com projektet.

## Tasks
- [ ] Beskriv hvad docs.arzonic.com er
- [ ] Tilføj setup instructions
- [ ] Dokumenter folder struktur
- [ ] Tilføj contribution guidelines

## Acceptance Criteria
- Klart formål beskrevet
- Step-by-step setup guide
- Folder struktur dokumenteret
- Contribution guidelines tilføjet

## Fil at redigere
- \`README.md\``,
    labels: ["documentation", "good-first-issue"]
  },
  {
    title: "Lav FAQ sektion",
    body: `## Beskrivelse
Saml ofte stillede spørgsmål om dashboard-brugen i en FAQ sektion.

## Tasks
- [ ] Identificer 8-10 FAQ spørgsmål
- [ ] Skriv svar på dansk
- [ ] Design accordion/collapse komponent
- [ ] Tilføj til Support sektion

## Acceptance Criteria
- Minimum 8 FAQ entries
- Klare og hjælpsomme svar
- Accordion/collapse funktionalitet
- Integreret i Support sektion

## Filer at redigere
- \`src/components/client/pages/SupportContact.tsx\`
- \`src/components/elements/FAQAccordion.tsx\` (opret)`,
    labels: ["content", "medium-priority"]
  },
  {
    title: "Tilføj dark mode toggle animation",
    body: `## Beskrivelse
Gør overgangen mellem lys/mørk tema mere smooth med fade animation.

## Tasks
- [ ] Implementer CSS transition på theme switch
- [ ] Tilføj fade animation (300ms)
- [ ] Test performance
- [ ] Ensure no flash of unstyled content

## Acceptance Criteria
- Smooth fade transition (300ms)
- Ingen FOUC (Flash of Unstyled Content)
- Virker på alle browsere

## Filer at redigere
- \`src/app/globals.css\`
- \`src/components/client/layout/Header.tsx\` (hvis theme toggle er her)`,
    labels: ["design", "polish", "good-first-issue"]
  }
];

async function createIssues() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('❌ GITHUB_TOKEN environment variable not set');
    console.log('Please run: export GITHUB_TOKEN=your_github_token');
    process.exit(1);
  }

  const repo = 'Arzonic-Agency/docs.arzonic.com';

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    console.log(`\n📝 Creating issue ${i + 1}/${issues.length}: ${issue.title}`);

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        body: JSON.stringify({
          title: issue.title,
          body: issue.body,
          labels: issue.labels
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      const data = await response.json();
      console.log(`✅ Created issue #${data.number}: ${data.html_url}`);

      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`❌ Failed to create issue: ${error.message}`);
    }
  }

  console.log('\n🎉 Done creating issues!');
}

createIssues();
