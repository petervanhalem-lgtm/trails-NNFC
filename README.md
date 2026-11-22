# NNFC Waterwerk (trails-NNFC)

Webapplicatie voor de voorbereiding, baan- en klokregistratie, wedstrijdtafel en uitslagenverwerking van de NNFC-waterwerkdagen (met lokale opslag via `localStorage` en optionele live synchronisatie via Firebase Realtime Database).

## Onderdelen en schermen

- **Startscherm (`index.html`)**: Kies een wedstrijdjaar, bekijk de aanwezige data en finalisatiestatus, en open **Banen / Klokkers**, **Wedstrijdtafel** of **Beheer / Admin**.
- **Beheer / Admin (`beheer.html`)**:
  - **Deel 1 – Importeren (Excel / CSV)**: Inladen van inschrijvingen (`.xlsx`, `.xls`, `.csv` of `.tsv`, toevoegen of vervangen) en snel vullen met **5 testdeelnemers** (`+ Vul 5 testdeelnemers`).
  - **Deel 2 – Nieuwe inschrijving**: Handmatig toevoegen van een hond en geleider (inclusief startnummer, klasse, brevetten, KCM-kwalificatie en betalingsstatus).
  - **Deel 3 – Baanindeling & 3 Bijlagen**: Klassen koppelen aan Baan 1–5 (met herverdeling van deelnemers) en de **3 bijlagen** bij het waterwerkreglement vastleggen.
  - **Deel 4 – Deelnemerslijst & Banen**: Zoeken, filteren op baan en aanpassen van startnummer, klasse, baan of verwijderen van deelnemers.
  - **Deel 5 – Back-up, Synchronisatie & Jaarvergrendeling**: JSON-back-up downloaden/herstellen, synchroniseren met de wedstrijdtafel en een wedstrijdjaar finaliseren/vergrendelen (`nnfc_slot_<jaar>`).
- **Wedstrijdtafel (`wedstrijdtafel.html`)**: Dagverloop in 5 stappen:
  1. **Aanmelden & Startnummer**: Aanwezigheid, startnummers, banen en betalingen bijhouden.
  2. **Basis oefeningen & Tijden**: Klokkertijden/weigeringen (`600,00s`) per baan en oefening (`A`, `B`, `C`) bekijken/aanpassen en Trials-punten berekenen.
  3. **Brevetten**: Uitslagen en opmerkingen voor het opvolgende brevet vastleggen.
  4. **Beste Reu & Beste Teef**: Kandidaten en titels beoordelen op basis van totaalpunten.
  5. **Tijd/Punten & Export/Print**: **Eerst** tijden en punten berekenen (`1. Tijd & punten berekenen`), en **daarna** de einduitslagen (alle klassen of per klasse), geslaagde brevetten en bekers/titels exporteren/printen als PDF (`2. Export / Print (PDF)`).
- **Banen / Klokkers (`banen.html`) & Klokkersscherm (`klokker.html`)**: Baanoverzicht, startvolgorde, tijdmeting/weigeringen, vervolgoefeningen per brevet, meldingen/correcties en de 3 bijlagen bij het waterwerkreglement.

## Afgesloten jaren & alleen-lezen stand

- Wedstrijdjaar **2026** staat standaard op afgesloten / vergrendeld (`alleen-lezen`), tenzij het in **Beheer / Admin (Deel 5)** expliciet wordt ontgrendeld.
- In de alleen-lezen stand kunnen gegevens worden bekeken, geëxporteerd of geprint, maar zijn invoervelden, mutaties en verwijderacties geblokkeerd.

## Bestanden in de repository

- `index.html` – Startscherm en jaarkeuze
- `beheer.html` – Beheer / Admin
- `wedstrijdtafel.html` – Wedstrijdtafel
- `banen.html` – Banen en klokkersoverzicht
- `klokker.html` – Klokkersscherm per baan (`?baan=1..5`)
- `nnfc-jaar-nav.js` – Gedeelde jaar- en navigatiehulp voor schermen
- `config.js` – Firebase-configuratie (`nnfc-trails`)
- `referentie2026.js` – Referentiegegevens 2026
- `nnfc-logo.png` – Clublogo
- `audit.md` – Technische en functionele audit
- `README.md` – Overzicht en gebruik van het project
