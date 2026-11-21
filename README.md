NNFC Waterwerk (trails-NNFC)

Webapplicatie voor de voorbereiding, baan- en klokregistratie, wedstrijdtafel en uitslagenverwerking van de NNFC-waterwerkdagen (met ondersteuning voor lokale opslag via localStorage en optionele live synchronisatie via Firebase Realtime Database).

Onderdelen en schermen

Startscherm (index.html): Kies een wedstrijdjaar, bekijk de aanwezige data en finalisatiestatus, en open Banen / Klokkers, Wedstrijdtafel of Beheer / Admin.

Beheer / Admin (beheer.html):

Deel 1 – Importeren (Excel / CSV): Inladen van inschrijvingen (inclusief voorbeeld-Excel).

Deel 2 – Nieuwe inschrijving: Handmatig toevoegen van een deelnemer en optionele testdata.

Deel 3 – Baanindeling & 3 Bijlagen: Klassen koppelen aan Baan 1–5 en de 3 bijlagen bij het waterwerkreglement vastleggen.

Deel 4 – Deelnemerslijst & Banen: Zoeken, filteren op baan en aanpassen van startnummer, klasse of baan.

Deel 5 – Back-up, Synchronisatie & Jaarvergrendeling: JSON-back-up downloaden/herstellen, synchroniseren met de wedstrijdtafel en een jaar finaliseren/vergrendelen (nnfc_slot_<jaar>).

Wedstrijdtafel (wedstrijdtafel.html): Dagverloop in 5 stappen (aanmelden & startnummer, basis oefeningen, brevetten, Beste Reu & Beste Teef, en einduitslagen/brevetten/bekers inclusief print/PDF).

Banen / Klokkers (banen.html) & Klokkersscherm (klokker.html): Baanoverzicht, startvolgorde, stopwatch/tijdmeting, oefenpunten en de 3 bijlagen bij het waterwerkreglement.

Afgesloten jaren & alleen-lezen stand

Wedstrijdjaar 2026 staat standaard op afgesloten / vergrendeld (alleen-lezen) tenzij het in Beheer / Admin (Deel 5) expliciet wordt ontgrendeld.

In de alleen-lezen stand kunnen gegevens wel worden bekeken, geëxporteerd of geprint, maar zijn wijzigingen en verwijderacties geblokkeerd.

Bestanden in de repository

index.html – Startscherm en jaarkeuze

beheer.html – Beheer / Admin

wedstrijdtafel.html – Wedstrijdtafel

banen.html – Banen en klokkersoverzicht

klokker.html – Klokkersscherm per baan

config.js – Firebase-configuratie

referentie2026.js – Referentiegegevens 2026

nnfc-logo.png – Clublogo

audit.md – Technische en functionele audit

README.md – Overzicht en gebruik van het project
