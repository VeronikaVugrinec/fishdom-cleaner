# Git — kako delamo vse tri hkrati
Posodobljeno 15.09.2026. Repozitorij: **github.com/VeronikaVugrinec/fishdom-cleaner** (zaseben).
Netlify je povezan z njim: **vsak commit na `main` se sam objavi** na `fishdom-cleaner.netlify.app` v približno minuti. Nihče ne vleče map na Netlify.

## Zlato pravilo, ki edino šteje
**Vsaka se dotika samo svojih datotek.** Če se ga držimo, konflikta ni mogoče dobiti.

| kdo | samo te datoteke |
|---|---|
| **Ai** | `js/verify.js`, `js/impact.js`, `js/db.js`, `data/*` |
| **Au** | `style.css`, `assets/*` |
| **Claude (prek V)** | `index.html`, `js/app.js`, `js/fish.js`, `netlify/*`, `sw.js` |
| **V** | nič v kodi — pitch in deck |

Če rabiš spremembo v datoteki, ki ni tvoja, je **ne popravljaj sama** — napiši V, ona to naroči Claudu. Dve minuti čakanja je ceneje od pol ure razpletanja.

## Postavitev (enkrat, 5 minut)
V terminalu:
```
cd ~/Documents            # ali kamor hočeš
git clone https://github.com/VeronikaVugrinec/fishdom-cleaner.git
cd fishdom-cleaner
code .                    # odpre VS Code
```
Če te vpraša za geslo: uporabniško ime je tvoje GitHub ime, geslo pa **ni** tvoje geslo — narediti moraš token na github.com/settings/tokens (classic, scope `repo`) in prilepiti njega. Ali pa se v VS Code prijaviš z GitHub računom (levo spodaj, ikona osebe → Sign in) in potem gesla ne rabiš nikoli več.

## Delovni krog (vsakič, ko kaj narediš)
```
git pull                                  # PRVO, vedno. Potegne, kar sta naredili drugi dve.
# ... delaš v VS Code ...
git add .
git commit -m "kratko kaj si naredila"
git push
```
Čez minuto je na `fishdom-cleaner.netlify.app`. Preveri na telefonu.

**Commitaj majhno in pogosto** — ena naloga, en commit. Če se kaj polomi, je takoj jasno, kaj ga je.
**Nikoli ne commitaj ključev.** Gemini ključ in Supabase ključi živijo samo v Netlify nastavitvah. Če jih vidiš v datoteki, ne commitaj in javi V.

## Če `git push` javi napako
Skoraj vedno pomeni, da je nekdo medtem pushnil. Rešitev:
```
git pull --rebase
git push
```
Če pri tem javi CONFLICT, si se dotaknila tuje datoteke. Ne poskušaj reševati sama:
```
git rebase --abort
```
in javi V, katera datoteka je bila.

## Če se site podre
V gre v Netlify → **Deploys** → zadnji deploy, ki je delal → **Publish deploy**. Site je nazaj v desetih sekundah.
Nič ni izgubljeno: vsaka različica vsake datoteke je v Gitu za vedno.

## Pred spanjem
Vsaka pushne, kar ima. Nedokončano delo na svojem računalniku ni delo ekipe.
