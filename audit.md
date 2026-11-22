# Audit – NNFC Waterwerk (trails-NNFC)

## 1. Huidige opzet & naamgeving

De applicatie is opgebouwd rond een jaarselectie (`nnfc_jaar` / `nnfc_actief_jaar` en `?jaar=`) en aparte schermen per rol:

- `index.html` – **Startscherm**: Keuze van wedstrijdjaar, overzicht van beschikbare data en finalisatie-/slotstatus, en doorlinken naar de onderdelen voor het gekozen jaar.
- `beheer.html` – **Beheer / Admin**: Voorbereiding en inschrijvingen in 5 delen:
  1. Importeren vanuit Excel/CSV + testdata-knop (`+ Vul 5 testdeelnemers`).
  2. Nieuwe inschrijving toevoegen.
  3. Baanindeling per klasse (Baan 1–5) + 3 bijlagen bij het waterwerkreglement.
  4. Deelnemerslijst & banen (zoeken, filteren, bewerken, verwijderen).
  5. JSON-back-up/herstel, synchronisatie met de wedstrijdtafel en jaarvergrendeling.
- `wedstrijdtafel.html` – **Wedstrijdtafel**: Dagverloop in 5 stappen, waarbij in Stap 5 expliciet eerst de tijd- en puntentelling wordt uitgevoerd (`berekenPuntenUitTijden()`) en daarna de export/print (`berekenEnPrintOverzicht()`) volgt.
- `banen.html` – **Banen / Klokkers**: Overzicht van Baan 1–5, startvolgorde, tijdmeting, oefenpunten en de 3 reglementsbijlagen.
- `klokker.html` – **Klokkersscherm**: Baan-gericht scherm (`?baan=1..5`) met tijdregistratie/weigeringen, brevetonderdelen en wachtrij (`outbox`) voor synchronisatie.
- `nnfc-jaar-nav.js`, `config.js` & `referentie2026.js` – Gedeelde jaarnavigatie, Firebase-configuratie (`nnfc-trails`) en referentiegegevens voor 2026.

## 2. Jaarafsluiting & alleen-lezen stand (2026)

- **2026 standaard vergrendeld**: Zolang er in `nnfc_slot_2026` geen expliciete ontgrendeling is opgeslagen, wordt `2026` als afgesloten/vergrendeld behandeld.
- **Alleen-lezen gedrag**: Bij een vergrendeld jaar verschijnt een waarschuwingsbanner en worden mutatieknoppen, invoervelden en selecties uitgeschakeld/geblokkeerd, terwijl bekijken en exporteren/printen beschikbaar blijven.
- **Geen actieve "open" teksten bij afsluiting**: Bij een afgesloten jaar worden actieve statussen zoals *"Nog niet gezwommen"* vervangen door *"Afgesloten"*.

## 3. Aandachtspunten & bevindingen

### Consistentie van datapaden (`localStorage` & Firebase)

- `beheer.html` en `wedstrijdtafel.html` gebruiken jaarafhankelijke `localStorage`-sleutels (`nnfc_deelnemers_<jaar>`, `nnfc_baanindeling_<jaar>`, `nnfc_tafel_<jaar>`, `nnfc_tafel_klokkerlog_<jaar>`, `nnfc_kcm_<jaar>` en `nnfc_slot_<jaar>`) en schrijven bij actieve Firebase-configuratie naar jaarafhankelijke paden (`wedstrijd/beheer_deelnemers_<jaar>`, `wedstrijd/baanindeling_<jaar>`, `wedstrijd/tafel_status_<jaar>`, `wedstrijd/tafel_klokkerlog_<jaar>`, `wedstrijd/registraties_<jaar>`, `wedstrijd/meldingen_<jaar>`, `wedstrijd/kcm_selecties_<jaar>`, `wedstrijd/slot_<jaar>`).
- `klokker.html` gebruikt baan-/jaargekoppelde opslag (`nnfc_klokker_state_<jaar>_<baan>`, `nnfc_klokker_dogs_<jaar>_<baan>`, `nnfc_klokker_outbox_<jaar>_<baan>`) en synchroniseert met Firebase.
- **Advies**: Blijf bij live gebruik controleren dat `klokker.html` en `banen.html` exact hetzelfde actieve `<jaar>` en dezelfde slotstatus (`nnfc_slot_<jaar>`) volgen als `beheer.html` en `wedstrijdtafel.html`.

### Controle in `render()` van alle schermen

- **Advies**: Houd hulpfuncties en alleen-lezen banners/locks op top-level en pas ze aan het einde van elke `render()`-cyclus toe, zodat dynamisch opgebouwde tabellen, knoppen en velden altijd consistent worden vergrendeld.

### Firebase Database Rules & AVG / persoonsgegevens

- `config.js` bevat de publieke configuratie voor `nnfc-trails`. Zorg dat de Firebase Realtime Database Rules passen bij de gewenste toegangsrechten en sla echte leden-/deelnemerslijsten (met o.a. lidnummers en e-mailadressen) niet onnodig op in een openbare repository.
