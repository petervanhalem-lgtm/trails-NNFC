# NNFC WATERTRIALS – PROJECT- EN CODE-AUDIT (VERSIE 5.0)
Datum: 17 november 2026
Project: Digitaal Waarnemingssysteem NNFC Watertrials
Repository: petervanhalem-lgtm/trails-NNFC
Reglementaire basis: NNFC Reglement Trials (4 oktober 2026)

================================================================================
1. DOEL EN SYSTEEMARCHITECTUUR
================================================================================
Het systeem vervangt de papieren waarnemingslijsten op de 5 wedstrijdbanen en
automatiseert de verwerking aan de centrale wedstrijdtafel.

- Baanisolatie: Elke baan (1 t/m 5) gebruikt een eigen HTML-bestand en een eigen
  lokale wachtrij (localStorage outbox). Klokkers kunnen elkaars banen niet
  inzien of beïnvloeden.
- Offline-first & 4G/5G-bestendigheid: Bij wegvallende mobiele verbinding slaat
  het klokkersscherm tijden lokaal op en verstuurt deze automatisch zodra de
  verbinding herstelt.
- Centrale regie: De wedstrijdtafel ontvangt real-time alle registraties,
  detecteert dubbele invoer of correctieverzoeken, houdt de oude waarde geldig
  totdat de tafel akkoord geeft en berekent automatisch de standen en bekers.

================================================================================
2. INVENTARISATIE VAN DE 9 BESTANDEN IN GITHUB
================================================================================
1. config.js (v1.0)
   - Centrale configuratie voor de Firebase Realtime Database (apiKey,
     authDomain, databaseURL, projectId). Wordt door alle pagina's ingeladen.

2. referentie2026.js (v2.0)
   - Bevat 73 historische stamboom- en kennelnamen van de Watertrials 2026.
   - Dient UITSLUITEND als passieve spelling- en auto-complete hulp in
     beheer.html. Klasse, eigenaar en brevetstatus worden NOOIT automatisch
     overgenomen naar een nieuw wedstrijdjaar.

3. beheer.html (v3.0 – Voorbereiding Waterwerkcoördinator / Secretariaat)
   - Jaarselectie (2026, 2027, 2028, 2029) met gescheiden opslag per jaargang.
   - Knop "Importeer deelnemers" voor CSV-bestanden uit Excel (inclusief
     automatische herkenning van kolommen).
   - Handmatig invoerformulier voor laatkomers of deelnemers met
     formulierproblemen.
   - Vinkvakje "Betaald" per deelnemer met live teller (Betaald vs. Nog betalen).
   - Automatische afleiding van het opvolgend brevet (Jeugdbrevet, Brevet A
     t/m E, Seaman Brevet).
   - Startvolgorde-controle: geeft een rode waarschuwing als twee honden van
     dezelfde eigenaar (Lidnr) direct na elkaar op dezelfde baan staan.
   - Stuurt de voorbereide baanindeling naar Firebase (wedstrijd/beheer_deelnemers).

4. baan1.html t/m baan5.html (v2.0 – Klokkersinterfaces Baan 1 t/m 5)
   - Laadt automatisch de aanwezige deelnemers voor die specifieke baan vanuit
     Firebase (wedstrijd/baan_lijsten/baan_X).
   - Cijferinvoer zonder komma (bijv. 945 wordt herkend als 9,45 sec) met
     blokkade op ongeldige invoer (>59 sec of 0,00).
   - Dubbele bevestiging (2-staps modal) vóór definitieve opslag.
   - Ondersteunt getimede basisoefeningen (A, B, C) én tijdloze
     brevetoefeningen (E t/m J) met knoppen "Uitgevoerd" en "Weigering".
   - Volgordewijziging ("Als volgende") en correctieaanvragen (oude tijd blijft
     geldig totdat de wedstrijdtafel akkoord geeft).

5. wedstrijdtafel.html (v5.0 – Centrale Wedstrijdtafel)
   - Live overzicht van alle 5 banen met voortgang, actieve hond en
     "Laatst gezien"-tijdstempel.
   - Tabblad "Aanmelding (Dag zelf)": secretariaat vinkt aanwezigheid aan
     (ook voor laatkomers op elk moment), waarna de hond direct naar de
     juiste klokker wordt gestuurd.
   - Knop "+ Extra Deelnemer": daginschrijving ter plekke invoeren en direct
     aan een baan/klokker koppelen.
   - Tabblad "Handmatige Tijd": nood-invoer voor de tafel als een telefoon of
     verbinding op een baan hapert.
   - Eindstanden in totaal seconden (A+B+C), met deelnemers "buiten
     mededinging (*)" onderaan de ranglijst.
   - Tabblad "Bekers & KCM": automatische berekening van de 250-puntenschaal
     en koppeling met KCM-resultaten voor de (Junior) Spettertrofee.
   - Volledig logboek van alle wijzigingen en beslissingen.

================================================================================
3. REGLEMENTAIRE REKENREGELS (REGLEMENT TRIALS 4 OKTOBER 2026)
================================================================================
- Basisoefeningen A, B en C (Art. 2.8 & 4.1–4.3):
  * Open klasse zwemt op 50 meter; alle overige klassen op 30 meter.
  * Eindresultaat per klasse is de optelsom van de eindtijden van A + B + C,
    weergegeven in totaal seconden (bijv. 372,34 sec).
- Weigering (Art. 4.1–4.3):
  * Telt voor de basisoefeningen A, B en C mee als de volle tijd van
    10 minuten = 600,00 seconden (600 punten). Drie weigeringen = 1800,00 sec.
- Brevetoefeningen zonder tijdmeting (Art. 2.9 & 4.5–4.9):
  * Oefening E (Brevet B), F (Brevet C), G (Brevet D), H (Brevet E) en
    J (Seaman Brevet) hebben geen tijdmeting (alleen Uitgevoerd of Weigering).
- Deelnemende klassen (Art. 2.14):
  1. Jeugdklasse (8–20 maanden, reuen en teven samen)
  2. Open klasse Reuen (20 maanden – 8 jaar, apart geklasseerd)
  3. Open klasse Teven (20 maanden – 8 jaar, apart geklasseerd)
  4. Veteranen / Senioren klasse (8 jaar en ouder, reuen en teven samen)
  5. Stamboomloze klasse (reuen en teven samen)
  6. Special klasse (verplicht drijfvest om medische redenen, 30m)
- Buiten mededinging / Drijfvest (Art. 2.14.1, 2.14.2 & Uitslagenlijst):
  * Honden in Jeugd of Open die met een drijfvest zwemmen zijn uitgesloten van
    de eindklassering en bekers (krijgen een * achter hun tijd en worden
    onderaan de stand geplaatst), maar kunnen wel hun brevet behalen.
- Puntentelling & Bekers (Art. 2.15, 2.16 & 2.17):
  * Snelste hond per klasse krijgt 250 punten, nr. 2 krijgt 245, nr. 3 krijgt
    240 (elke plek lager is 5 punten minder).
  * Neptunusbeker: finale op 50m tussen snelste Open Reu en snelste Open Teef.
  * Caesarbeker: snelste veteraan die alle oefeningen goed heeft afgelegd.
  * (Junior) Spettertrofee: Trial-punten + KCM-punten volgens vaste tabel:
    BOB = 75 | CAC = 70 | Res. CAC = 65 | U1 = 55 | U2 = 50 | U3 = 45 |
    U4 = 40 | U = 35 | ZG = 25 | G = 15 | M = 10 | S = 5.

================================================================================
4. PRIVACY (AVG) & VERVOLGSTAPPEN
================================================================================
- Privacy-scheiding: Echte ledengegevens (lidnr, e-mail, telefoon) mogen
  NOOIT in een Public GitHub-repository staan. Tijdens publieke tests alleen
  fictieve testnamen gebruiken. Bij echt gebruik opslaan in Firebase achter
  authenticatie en de GitHub-map op Private houden (of alleen schone UI-code
  publiceren).
- Openstaande vervolgstappen:
  [ ] Stap 1: GitHub Pages activeren op branch 'main' en folder '/ (root)' en
      visuele controle uitvoeren op wedstrijdtafel.html v5.0.
  [ ] Stap 2: Gratis Firebase-project aanmaken (Realtime Database in
      europe-west1) en de 4 sleutels invullen in config.js.
  [ ] Stap 3: Firebase Security Rules instellen zodat klokkers alleen mogen
      schrijven naar hun eigen baan en geen persoonsgegevens kunnen uitlezen.
  [ ] Stap 4: Exportfunctie toevoegen aan wedstrijdtafel.html voor publicatie
      van de officiële uitslag (CSV/tabel voor de NNFC-website).
  [ ] Stap 5: Praktijktest op 4G/5G met meerdere telefoons tegelijk.

