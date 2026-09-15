/* Fishdom Cleaner — občinski zaslon.
   LASTNICA / OWNER: Ai.  Nihče drug te datoteke ne ureja.

   ZAKAJ OBSTAJA
   To je zaslon, zaradi katerega je naša rešitev Tema 1 hackathona
   ("Smart Monitoring and Digital Tools for Blue Environments") in ne igrica.
   Sodnik na njem gleda eno stvar: ali podatki res obstajajo in ali je
   razvidno, kateri so preverjeni.

   KAKO SE POVEŽE
   js/app.js ob odpiranju zaslona pokliče window.IMPACT.render(state), če
   ta obstaja. Če te datoteke ni, app.js nariše svojo preprosto različico,
   zato nič ni blokirano, dokler delaš.

   ELEMENTI, ki so že v index.html in jih smeš polniti:
     #impact-count       skupno število zapisov
     #verify-summary     koliko preverjenih, koliko za pregled
     #impact-materials   razdelitev po materialih
     #impact-rows        tabela zadnjih zapisov
     #impact-note        opomba pod tabelo

   KAJ MORA BITI VIDNO
   - skupno število kosov
   - razdelitev po materialih
   - razdelitev po conah čiščenja
   - gibanje po dnevih
   - pri vsaki številki mora biti jasno, ali je iz PREVERJENIH ali iz vseh
     zapisov. To je razlika med nami in Litteratijem in sodnik bo vprašal.

   Najprej naj delajo številke, šele nato grafi.
*/

window.IMPACT = {
  // TODO Ai: nariši občinski zaslon. state.scans je seznam zapisov.
  // Vrni false, če hočeš, da app.js nariše svojo privzeto različico.
  render: function (state) {
    return false;
  }
};
