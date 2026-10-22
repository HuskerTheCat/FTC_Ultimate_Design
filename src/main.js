import { openApp, prefetchApps } from './switching.js';

// The welcome screen, copied from Inventory. Not wired up yet, so every control but the app switcher is disabled under the development banner.
const PROGRAMS = ['FTC', 'FRC', 'FLL', 'Other'];

const app = document.querySelector('#app');

function renderWelcome() {
  app.innerHTML = `
    <main class="center wide">
      <div class="lockup">
        <div class="menuwrap">
          <button id="apps-toggle" aria-label="FTC Ultimate apps" title="FTC Ultimate apps" aria-haspopup="true" aria-expanded="false" aria-controls="apps-menu"><span class="app-icon design"></span></button>
          <div id="apps-menu" class="menu" hidden>
            <h3>FTC Ultimate</h3>
            <a class="menu-item" href="https://huskerthecat.github.io/FTC_Ultimate_Inventory/" data-app="inventory"><span class="app-icon inventory"></span>Inventory</a>
            <a class="menu-item" href="https://huskerthecat.github.io/FTC_Ultimate_Competition/" data-app="competition"><span class="app-icon competition"></span>Competition</a>
            <button class="menu-item" aria-current="true"><span class="app-icon design"></span>Design</button>
          </div>
        </div>
        <h1 class="brand"><span>FTC Ultimate <span class="app-name">Design</span></span></h1>
      </div>
      <div class="card split">
        <form id="signin">
          <h2>Sign in to your team</h2>
          <div class="teamid">
            <select name="program" aria-label="Program">${PROGRAMS.map((p) => `<option>${p}</option>`).join('')}</select>
            <input name="teamNumber" required inputmode="numeric" pattern="[1-9][0-9]{0,5}" placeholder="Team number, e.g. 12345" />
          </div>
          <button>Next</button>
        </form>
        <form id="join">
          <h2>New to the team? Enter your join code</h2>
          <input name="code" required autocapitalize="off" autocomplete="off" spellcheck="false" placeholder="Join code" />
          <div class="row">
            <button>Join team</button>
            <button type="button" class="secondary">Scan QR</button>
          </div>
        </form>
      </div>
      <div class="card">
        <h2>Set up a new team</h2>
        <button class="secondary">Start setup</button>
      </div>
      <div class="card">
        <h2>Just looking?</h2>
        <button class="secondary">Try the demo</button>
      </div>
      <button class="guides-link">Guides</button>
    </main>`;
  for (const control of app.querySelectorAll('.card :is(button, input, select), .guides-link')) control.disabled = true;
  wireAppSwitcher();
}

// The cube opens a menu of the FTC Ultimate apps, as in Inventory. Choosing one, a tap elsewhere or Escape closes it.
function wireAppSwitcher() {
  const toggle = app.querySelector('#apps-toggle');
  const menu = app.querySelector('#apps-menu');
  const show = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.onclick = () => {
    show(menu.hidden);
    prefetchApps(menu);
  };
  // Another app fades into its loading screen first (see switching.js). Ctrl, Shift or Cmd and a click opens the link as the browser normally would.
  menu.onclick = (e) => {
    const link = e.target.closest('a[data-app]');
    if (link && !(e.ctrlKey || e.shiftKey || e.metaKey)) {
      e.preventDefault();
      openApp(link);
    }
    if (e.target.closest('a, button')) show(false);
  };
  document.addEventListener('pointerdown', (e) => e.target.closest('.menuwrap') || show(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && show(false));
}

renderWelcome();
