// The logo intro plays once per visit (browser tab session), not on every page.
// Shared by app/layout.tsx (server: the before-first-paint script) and
// components/loading/LoadingScreen.tsx (client), so it lives outside both.
export const INTRO_SEEN_KEY = "he-intro-seen";

// Runs in <head> before first paint: if the intro already played this visit,
// mark <html data-intro-seen> so app/globals.css hides the overlay at once.
export const INTRO_SEEN_SCRIPT = `try{if(sessionStorage.getItem(${JSON.stringify(
  INTRO_SEEN_KEY,
)})==="1")document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`;
