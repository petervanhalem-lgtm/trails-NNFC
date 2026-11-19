# NNFC WATERTRIALS – TECHNISCHE & REGLEMENTAIRE AUDIT (VERSIE 8.0)
**Project:** Digitaal Waarnemingssysteem & Uitslagenverwerking NNFC Watertrials  
**Repository:** `petervanhalem-lgtm/trails-NNFC`  
**Live Testomgeving:** `https://github.io`  
**Reglementaire basis:** NNFC Reglement Trials (vastgesteld 4 oktober 2026)  
**Laatst bijgewerkt:** 19 november 2026  

================================================================================
1. DOEL & ARCHITECTUUR VAN HET SYSTEEM
================================================================================
Het systeem vervangt de papieren waarnemingsformulieren op 5 wedstrijdbanen en
automatiseert de klassementen, bekerberekeningen en administratie aan de
centrale wedstrijdtafel.

De volledige keten verloopt in 4 gekoppelde fasen:
1. Voorbereiding (`beheer.html` + `referentie2026.js`):
   - Inlezen van het inschrijfoverzicht uit Excel (CSV-import met ondersteuning
     voor puntkomma/komma, aanhalingstekens en UTF-8/Windows-1252 tekens) of
     handmatige invoer per wedstrijdjaar (2026, 2027, 2028).
   - Bijhouden van betaalstatus (`Betaald` vs. `Nog betalen`) en baantoewijzing
     over Baan 1 t/m 5.
   - Startvolgorde-validatie: waarschuwt bij dubbele startnummers en als twee
     honden van dezelfde eigenaar (Lidnr) direct na elkaar op een baan staan.
   - Synchronisatie per hond op uniek ID (`wedstrijd/beheer_deelnemers/<id>`),
     zodat bestaande aanwezigheidsvinkjes en daginschrijvingen behouden blijven.
2. Aanmelding op de wedstrijddag (`wedstrijdtafel.html`):
   - Secretariaat vinkt aanwezigen aan; alleen aanwezige honden worden naar de
     specifieke baan-queue (`wedstrijd/baan_lijsten/baan_{1..5}`) gepusht.
   - Laatkomers kunnen op elk moment worden aangevinkt of via `+ Extra
     deelnemer` als daginschrijving worden toegevoegd.
3. Registratie langs het water (`klokker.html?baan=1` t/m `?baan=5`):
   - Eén gedeeld, mobielvriendelijk klokkersscherm voor alle 5 banen.
   - Invoer van cijfers zonder komma (bijv. `1234` = `12,34` sec) met dubbele
     bevestiging bij weigeringen en opvallend snelle tijden (< 5,00 sec).
   - Offline-first wachtrij (`localStorage`) die bij wegvallend 4G/5G-bereik
     tijden bewaart en automatisch verstuurt zodra er weer verbinding is.
4. Centrale regie & uitslagen (`wedstrijdtafel.html`):
   - Live overzicht van alle 5 banen met voortgangsbalk en levensteken op
     officiële Firebase-servertijd (`ServerValue.TIMESTAMP`).
   - Conflict- en correctiebeheer: de eerst geregistreerde tijd blijft geldig
     totdat de wedstrijdtafel beslist (`Accepteren` of `Afwijzen`).
   - Handmatige nood-invoer (`Handmatige tijd`) en directe CSV-export van de
     officiële einduitslag.

================================================================================
2. ACTUELE BESTANDSSTRUCTUUR IN GITHUB
================================================================================
- `index.html`
  Beheerdersportaal met duidelijke waarschuwing ("Alleen voor beheerders"),
  toegang tot Beheer, Wedstrijdtafel (`?admin=1`) en kopieerknoppen voor
  directe links per baan zonder menuknop.
- `beheer.html`
  Voorbereidingsscherm voor Excel/CSV-import, handmatige invoer, startvolgorde,
  JSON-back-up en per-hond synchronisatie naar Firebase.
- `wedstrijdtafel.html`
  Centraal wedstrijdtafelscherm met 5 baankaarten, 6 klassementen, aanmelding,
  daginschrijvingen, nood-invoer, meldingen/correcties, KCM-bekertabel en CSV-
  uitslagexport.
- `klokker.html`
  Gedeeld klokkersscherm voor Baan 1 t/m 5 (`?baan=1` t/m `?baan=5`) voor zowel
  basisoefeningen (A, B, C) als tijdloze brevetoefeningen (E t/m J).
- `config.js`
  Bevat `firebaseConfig` en de dynamische script-loader voor Firebase v10.14.1.
- `referentie2026.js`
  Bevat 73 historische stamboom- en kennelnamen van 2026 als passieve
  spellinghulp in `beheer.html`.
- `nnfc-logo.png` (of `assets/nnfc-logo.png`)
  Transparant verenigingslogo in de kopbalk van alle schermen.
- *(Oude bestanden `baan1.html` t/m `baan5.html` zijn vervangen door het ene
  gedeelde `klokker.html` en mogen worden verwijderd of gearchiveerd).*
================================================================================
3. DOORVOERDE TECHNISCHE VERBETERINGEN (SINS VERSIE 7.0)
================================================================================
- Eén gedeeld klokkersbestand (`klokker.html`) i.p.v. 5 losse kopieën.
- Compatibiliteit met oudere telefoons: alle `.at()`-aanroepen zijn verwijderd.
- Beveiliging tegen script-injectie: alle gebruikersinvoer en hondennamen worden
  veilig ge-escaped met `esc()`.
- Atomische database-updates per hond (`wedstrijd/beheer_deelnemers/<id>`) i.p.v.
  het overschrijven van de volledige deelnemerslijst.
- Betrouwbare conflictafhandeling: afgewezen tweede registraties krijgen
  `status: 'AFGEWEZEN'` en tellen nooit mee in de stand.
- Servertijd (`ServerValue.TIMESTAMP`) voor het levensteken per baan.
- KCM-bekerkeuzes en actief wedstrijdjaar worden live via Firebase gedeeld
  tussen meerdere schermen aan de wedstrijdtafel.
- CSV-import ondersteunt komma's binnen aanhalingstekens, Windows-1252 tekens
  en weigert stille aannames bij onbekende klassen, geslachten of brevetten.

================================================================================
4. REGLEMENTAIRE CONTROLEMATRIX (NNFC REGLEMENT 4 OKTOBER 2026)
================================================================================
[OK] Art. 2.3 (Inschrijving & Betaling): Betaalstatus zichtbaar in Beheer en bij
     aanmelding op de wedstrijddag.
[OK] Art. 2.4 (Startvolgorde): Controle op opeenvolgende honden van dezelfde
     eigenaar (Lidnr) per baan.
[OK] Art. 2.5 (Aanmelding secretariaat): Alleen aanwezige honden gaan naar de
     klokker; laatkomers en daginschrijvingen sluiten direct aan.
[OK] Art. 2.8 & 4.1–4.3 (Oefeningen A, B, C & Weigering): Optelsom in seconden;
     weigering telt als 600,00 seconden (10 minuten).
[OK] Art. 2.9 & 4.5–4.9 (Vervolgoefeningen): Apart tabblad Brevet zonder
     tijdmeting (`Uitgevoerd` / `Weigering`) voor Oefening E, F, G, H en J.
[OK] Art. 2.14 (Klassen): Open Reuen, Open Teven, Jeugd, Veteranen,
     Stamboomloos en Specials.
[OK] Art. 2.14.1 & 2.14.2 (Buiten mededinging / Drijfvest): Gemarkeerd met `*`,
     onderaan de ranglijst en 0 bekerpunten.
[OK] Art. 2.15–2.17 (Puntentelling & Bekers): 250-puntenschaal (-5 per plaats)
     en KCM-puntentabel (BOB +75 t/m S +5) voor Spettertrofeeën.

================================================================================
5. OPENSTAANDE ACTIEPUNTEN VOOR LIVE-GANG & TESTPLAN
================================================================================
Vóór de praktijktest:
1. Vul de 4 echte Firebase-gegevens (`apiKey`, `authDomain`, `databaseURL`,
   `projectId`) in `config.js` in.
2. Upload het transparante logo als echt afbeeldingsbestand (`nnfc-logo.png`).
3. Stel vóór de echte wedstrijddag Firebase Security Rules in (AVG-bescherming
   voor lidnummers en eigenaarnamen in `beheer_deelnemers`).

Praktijktest (5 stappen met verzonnen testnamen):
[ ] 1. Voeg in `beheer.html` 4 testhonden toe op Baan 1 en klik op
       "Synchroniseer met Wedstrijdtafel".
[ ] 2. Vink in `wedstrijdtafel.html` (Aanmelding) 2 honden aan als aanwezig en
       controleer of ze direct op `klokker.html?baan=1` verschijnen.
[ ] 3. Klok een tijd in (`1425` -> `14,25` sec), test de dubbele bevestiging bij
       een weigering en zet hond 3 op "Als volgende".
[ ] 4. Test offline werking (vliegtuigmodus aan -> tijd inklokken -> `Wachtrij: 1`
       -> vliegtuigmodus uit -> automatische verzending).
[ ] 5. Vraag vanaf de baan een tijdcorrectie aan, test zowel "Houd oude tijd"
       als "Neem over" aan de wedstrijdtafel en exporteer de uitslag naar CSV.
