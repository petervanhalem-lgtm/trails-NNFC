Audit – NNFC Waterwerk (trails-NNFC)

1. Huidige opzet & naamgeving

De applicatie is opgebouwd rond een jaarselectie en aparte schermen per rol, zonder losse -v2-bestanden in de main-branch:

index.html – Startscherm: Keuze van wedstrijdjaar, overzicht van beschikbare data en finalisatie-/slotstatus, en doorlinken naar de onderdelen voor het gekozen jaar.

beheer.html – Beheer / Admin: Voorbereiding en inschrijvingen (import vanuit Excel/CSV, nieuwe inschrijvingen, baanindeling & 3 bijlagen bij het waterwerkreglement, deelnemerslijst & banen, en back-up/synchronisatie/jaarvergrendeling).

wedstrijdtafel.html – Wedstrijdtafel: Dagverloop in 5 stappen (aanmelden & startnummer, basis oefeningen, brevetten, Beste Reu & Beste Teef, en einduitslagen/brevetten/bekers met print-/PDF-functie).

banen.html – Banen / Klokkers: Overzicht van Baan 1–5, startvolgorde, stopwatch/tijdmeting, oefenpunten en de 3 reglementsbijlagen.

klokker.html – Klokkersscherm: Mobiel/baan-gericht scherm per baan (?baan=1..5) met numeriek toetsenbord, vervolgoefeningen per brevet en wachtrij (outbox) voor synchronisatie.

config.js & referentie2026.js: Firebase-configuratie (nnfc-trails) en spelling-/referentiegegevens voor 2026.

2. Jaarafsluiting & alleen-lezen stand (2026)

2026 standaard vergrendeld: Zolang er in nnfc_slot_2026 geen expliciete ontgrendeling is opgeslagen, wordt 2026 als afgesloten/vergrendeld behandeld.

Alleen-lezen gedrag: Bij een vergrendeld jaar verschijnt een waarschuwingsbanner en worden mutatieknoppen, invoervelden en selecties uitgeschakeld/geblokkeerd, terwijl bekijken en exporteren/printen beschikbaar blijven.

Geen actieve "open" teksten bij afsluiting: Bij een afgesloten jaar worden actieve statussen zoals "Nog niet gezwommen" vervangen door "Afgesloten".

3. Aandachtspunten & bevindingen

Consistentie van datapaden (localStorage & Firebase):

beheer.html, wedstrijdtafel.html en banen.html gebruiken o.a. nnfc_deelnemers_<jaar>, nnfc_baanindeling_<jaar>, nnfc_tafel_<jaar>, nnfc_klokkers_<jaar> en nnfc_slot_<jaar> (en in Firebase o.a. wedstrijd/beheer_deelnemers, wedstrijd/tafel_status_<jaar> en wedstrijd/klokkers_<jaar>).

klokker.html gebruikt nnfc_klokker_state_<baan>, nnfc_klokker_dogs_<baan> en nnfc_klokker_outbox_<baan> en leest/schrijft in Firebase wedstrijd/baan_lijsten/baan_<1..5>, wedstrijd/registraties, wedstrijd/meldingen en wedstrijd/banen_status/baan_<1..5>.

Advies: Houd bij live gebruik scherp in de gaten hoe de baanlijsten en registraties tussen banen.html / wedstrijdtafel.html en klokker.html worden gevoed, en controleer de slot-vlag in klokker.html op het actieve jaar (?jaar= of gekoppeld jaar) zodat ook daar hetzelfde jaar-slot wordt gevolgd.

Controle in render() van banen.html en klokker.html:

Let erop dat hulpfuncties en alleen-lezen banners/locks op top-level staan en niet genest binnen een event-handler of andere functie, zodat de vergrendeling bij elke render direct en voorspelbaar wordt toegepast.

Firebase Database Rules & AVG / persoonsgegevens:

config.js bevat de publieke configuratie voor nnfc-trails. Zorg dat de Firebase Realtime Database Rules passen bij de gewenste toegangsrechten en bewaar echte leden-/deelnemerslijsten (met o.a. lidnummers en e-mailadressen) niet onnodig in een openbare repository.
