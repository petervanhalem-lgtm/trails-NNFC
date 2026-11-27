NNFC Waterwerk

Webapplicatie voor organisatie, baan- en klokkersregistratie en wedstrijdtafelbeheer van het NNFC Waterwerk.

Actuele Status (2026 Vastgesteld)

Jaar 2026: Vergrendeld (vergrendeld = true). De uitslagen staan vast, bekers en brevetten zijn uitgereikt en gepubliceerd. Wijzigingen in 2026 zijn geblokkeerd om de gepubliceerde eindstand te beschermen.

Volgende editie: 2027 (in te richten vanuit een schone start of met nieuwe inschrijvingsdata).

Overzicht van de Onderdelen

Startscherm (index.html)

Keuze van het wedstrijdjaar (met indicator voor aanwezige data en slot-icoon bij vergrendelde jaren).

Snelle links naar de klokkersschermen per baan (klokker.html?baan=1 t/m 5).

Toegang tot Banen / Klokkers, Wedstrijdtafel en Beheer / Admin.

Beheer / Admin (beheer.html)

Importeren (Excel / CSV): Importeert .xlsx, .xls, .csv en .tsv via SheetJS (toevoegen of vervangen), inclusief testdeelnemers en wisopties per jaar.

Nieuwe inschrijving: Vastleggen van hondgegevens (roepnaam, stamboomnaam, geslacht, klasse), eigenaar (naam, district, lidnummer, startnummer) en brevet/KCM/betaal- en buiten-mededingingstatus.

Baanindeling & 3 Bijlagen: Koppeling van klassen (Jeugd, Open, Veteranen, Stamboomloos, Specials) aan Baan 1–5, startnummerreeksen met standaard +10% vrije buffer voor na-/daginschrijving en beheer van de 3 reglementsbijlagen.

Deelnemerslijst & Banen: Aanpassen van startnummers, klassen, brevetten en banen of verwijderen van deelnemers.

Back-up & Jaarvergrendeling: JSON-export en -import, synchronisatie met de wedstrijdtafel en vergrendelen/ontgrendelen van een jaar (nnfc_slot_<jaar>).

Banen & Klokkers (banen_8.html en klokker.html)

Overzicht van Baan 1–5, de 3 bijlagen, baanlijsten en generatie van jaar- en baanspecifieke pincodes en deelberichten voor klokkers.

Klokkersscherm (klokker.html) voor oefeningen A, B, C en BREVET met numeriek toetsenblok, tweestapsbevestiging, lokale outbox bij offline werken (nnfc_klokker_outbox_<jaar>_<baan>), volgordewijzigingen en meldingen/correcties richting de wedstrijdtafel.

Wedstrijdtafel (wedstrijdtafel.html)

Begeleidt het wedstrijdverloop in vijf stappen:

Aanmelden & startnummer

Basis oefeningen (A, B, C) en tijden (600,00s bij weigering)

Brevetten

Beste Reu & Beste Teef

Tijd-/puntentelling (art. 2.15) met print-/PDF-overzicht

Toont binnenkomende klokker-registraties en -correcties.

Gebruik en Beheer richtlijnen

2026 behouden: Laat 2026 vergrendeld en bewaar een aparte JSON-back-up van de definitieve data.

Starten met 2027: Selecteer jaar 2027, controleer dat het jaar niet onbedoeld vergrendeld is en laad de nieuwe deelnemers- en baangegevens.

Let op bestandsnamen: Controleer dat de bestandsnaam van het baanoverzicht (banen_8.html) overeenkomt met de links in index.html, beheer.html en wedstrijdtafel.html (of hernoem het bestand naar banen.html).
