# Auditrapport — NNFC Waterwerk

- **Peildatum:** 27 november 2026
- **Status jaar 2026:** Vergrendeld (`vergrendeld = true`). Uitslagen staan vast, bekers en brevetten zijn uitgereikt en gepubliceerd.
- **Volgende operationele cyclus:** Voorbereiding en inrichting van wedstrijdjaar **2027** (en archiefbehoud voor **2026**).

---

## 1. Managementsamenvatting

De applicatie voor het NNFC Waterwerk is ingericht als een set HTML-modules (`index.html`, `beheer.html`, `banen_8.html`, `klokker.html`, `wedstrijdtafel.html`) met ondersteuning voor lokale opslag (`localStorage`), Excel/CSV-import en Firebase Realtime Database (`nnfc-trails`).

Met de definitieve afronding en vergrendeling van **2026** verschuift het zwaartepunt van het systeem:
1. **2026** dient als **archief- en referentiejaar** te worden beschermd tegen onbedoelde wijzigingen.
2. **2027** moet schoon, gecontroleerd en zonder restdata van 2026 worden opgestart.
3. Enkele technische en operationele aandachtspunten uit de code moeten vóór de livegang van **2027** worden strakgetrokken.

---

## 2. Bevindingen per domein

### A. Jaarvergrendeling & Archivering (2026 vs. 2027)
- **Bevinding:** In meerdere schermen valt de standaardvergrendeling voor `2026` terug op alleen-lezen (`vergrendeld = true`) wanneer er nog geen expliciete slot-waarde is opgeslagen. Dat sluit goed aan bij de huidige status van 2026.
- **Risico:** Als tijdens het voorbereiden van **2027** het actieve jaar per ongeluk op `2026` blijft staan of als een JSON-back-up met `2026`-sleutels wordt teruggezet, kan dit tot verwarring of overschrijving leiden.
- **Advies:**
  - Leg een definitieve JSON-archiefback-up van **2026** vast buiten de dagelijkse werkmap.
  - Laat `2026` permanent vergrendeld in de productieomgeving.
  - Start **2027** expliciet als nieuw jaar zonder `2026`-deelnemers of testdata.

### B. Bestandsnamen, Routes & Koppelingen
- **Bevinding:** In de navigatie (`index.html`, `beheer.html`, `wedstrijdtafel.html`) wordt verwezen naar `banen.html`, terwijl het baanoverzichtsbestand in de set `banen_8.html` heet.
- **Risico:** Op servers of omgevingen waar exacte bestandsnamen vereist zijn, leidt een mismatch tussen `banen.html` en `banen_8.html` tot een broken link.
- **Advies:** Harmoniseer de bestandsnaam en de links eenduidig (bijv. hernoem `banen_8.html` naar `banen.html` of pas alle verwijzingen aan naar de definitieve bestandsnaam).

### C. Databronnen, Offline-modus & Synchronisatie
- **Bevinding:** Het systeem combineert `localStorage` (`nnfc_deelnemers_<jaar>`, `nnfc_klokker_outbox_<jaar>_<baan>`, `nnfc_slot_<jaar>`) met Firebase Realtime Database (`nnfc-trails`) en SheetJS voor Excel/CSV-import.
- **Risico:** Bij een lege browsercache of zonder actieve databaseverbinding start het systeem leeg tenzij testdeelnemers, Excel/CSV-bestanden of JSON-back-ups worden geladen. Daarnaast kunnen offline klokker-items in de outbox blijven staan totdat ze gesynchroniseerd zijn.
- **Advies:**
  - Controleer vóór elke wedstrijddag dat alle klokker-outboxes zijn verwerkt en gesynchroniseerd.
  - Test de volledige keten (`Beheer` -> `Banen/Klokker` -> `Wedstrijdtafel`) met een kleine proefset in **2027** voordat echte inschrijvingen worden geladen.

### D. Wedstrijdregels & Administratieve Controle
- **Bevinding:** De wedstrijdtafel ondersteunt startnummers, klassen met standaard `+10%` vrije buffer, oefeningen `A`, `B`, `C` (inclusief `600,00s` bij weigering), brevetten, Beste Reu / Beste Teef, tijd-/puntentelling (art. 2.15) en live/lokale klokker-meldingen/correcties.
- **Risico:** Omdat de uitslag, bekers en brevetten voor **2026** al definitief zijn vastgesteld en gepubliceerd, mogen eventuele nacontroles op **2026** uitsluitend nog als lees- en controleactie plaatsvinden, niet als herberekening van de gepubliceerde eindstand.
- **Advies:** Documenteer de vastgestelde **2026**-eindstand (inclusief brevetten en ereprijzen) als ongewijzigd referentiepunt.

---

## 3. Actiechecklist vóór start seizoen 2027

- [ ] Definitieve export/back-up van **2026** veiligstellen en **2026** vergrendeld houden.
- [ ] Bestandsnaam van het baanoverzicht (`banen_8.html` vs. `banen.html`) overal gelijk trekken.
- [ ] Nieuwe deelnemerslijst en baanindeling voor **2027** voorbereiden en controleren op `+10%` startnummerbuffer.
- [ ] Pincodes en links voor `klokker.html?baan=1..5` voor **2027** genereren en testen.
- [ ] Offline outbox en synchronisatie tussen `klokker.html`, `wedstrijdtafel.html` en Firebase testen.
