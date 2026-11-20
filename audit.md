Technische & Reglementaire Audit: NNFC Digitale Waarneming (Versie 2026–2040)

Datum: 20 november 2026

Referentiedocument: NNFC Reglement Trials 4 oktober 2026

Betrokken bestanden: beheer.html (beheer_3.html), wedstrijdtafel.html (wedstrijdtafel_4.html), config.js, referentie2026.js

Status: Klaar voor productie en archivering in GitHub

1. Samenvatting & Doel van de Audit

Dit document beschrijft de architectuur, reglementaire borging en laatste functionele en grafische verbeteringen van de webapplicatie voor de NNFC Watertrials. De applicatie ondersteunt zowel de voorbereiding door de waterwerkcoördinator/het secretariaat (beheer.html) als de live verwerking op de wedstrijddag (wedstrijdtafel.html).

De nieuwste versie combineert:

Reglementaire naleving van het NNFC Reglement Trials 4 oktober 2026 (inclusief KCM-koppeling en puntentelling).

Schaalbaarheid voor grote evenementen (70+ deelnemende honden verdeeld over 5 banen).

Toekomstbestendigheid met ondersteuning voor de wedstrijdjaargangen 2026 t/m 2040.

2. Reglementaire Borging (Reglement Trials 4 okt. 2026)

Reglementartikel

Onderwerp

Implementatie in de applicatie

Art. 2.3 & 2.4

Inschrijving & Secretariaat

CSV-import vanuit Excel (UTF-8 & Windows-1252) én handmatige invoer in beheer.html. Automatische spellinghulp voor stamboomnamen (referentie2026.js) en controle op dubbele startnummers of opeenvolgende honden van dezelfde eigenaar op één baan.

Art. 2.5

Aanmelding op wedstrijddag

Apart tabblad Aanmelding op de wedstrijdtafel (wedstrijdtafel.html). Alleen honden die door het secretariaat op Aanwezig zijn gezet, worden gesynchroniseerd naar de klokkersschermen van Baan 1 t/m 5.

Art. 2.8 & 2.9

Volgorde & Opvolgend brevet

Automatische bepaling van het eerstvolgende brevet (Jeugdbrevet, Brevet A t/m E, Seaman Brevet) op basis van klasse en huidig brevet.

Art. 2.10 & 4.1–4.3

Weigering / Diskwalificatie

Een weigering wordt automatisch gewaardeerd met de maximale straftijd van 10 minuten ($600{,}00\text{ seconden}$ / $600000\text{ ms}$).

Art. 2.14.1 – 2.14.5

Klassenindeling & Drijfvest (*)

Ondersteuning voor Jeugd (30m), Open Reuen/Teven (50m), Veteranen (30m), Stamboomloos (30m) en Specials (30m). Honden met een drijfvest buiten mededinging worden gemarkeerd met * en uitgesloten van het podium en de bekerpunten.

Art. 2.15

Uitslagenlijst & Puntentelling

Eindresultaat wordt berekend als de som van de basisoefeningen $A + B + C$ per klasse. De snelste hond binnen mededinging ontvangt $250\text{ punten}$, nummer 2 ontvangt $245\text{ punten}$, enzovoort (telkens $-5\text{ punten}$ per plaats).

Art. 2.16.3, 2.16.4 & 2.17

(Junior) Spettertrofee & KCM

KCM-uitslagen (BOB: 75, CAC: 70, Res. CAC: 65, U1: 55, U2: 50, U3: 45, U4: 40, U: 35, ZG: 25, G: 15, M: 10, S: 5) worden al bij voorbereiding in beheer.html vastgelegd en bij de trials opgeteld bij de behaalde trialpunten voor de Spettertrofee (Open) en Junior Spettertrofee (Jeugd).

3. Overzicht van Recente Verbeteringen

A. Geïntegreerde KCM-invoer in Beheer & Synchronisatie

Invoer bij voorbereiding: Omdat de KCM doorgaans eerder in het seizoen plaatsvindt en slechts een deel van de waterwerkhonden aan de KCM deelneemt, kan het KCM-resultaat nu direct in beheer.html worden ingevoerd bij:

Handmatige invoer (2. Handmatig deelnemer toevoegen);

Excel CSV-import (automatische herkenning van kolommen met kcm, clubmatch of spetter);

Direct in de deelnemerstabel per hond.

Naadloze koppeling met de Wedstrijdtafel: Bij synchronisatie (stuurNaarTafel()) én via lokale opslag (nnfc_kcm_<jaar>) worden de KCM-selecties automatisch overgenomen in wedstrijdtafel.html onder Bekers & KCM, waar ze tijdens de wedstrijddag zonodig nog handmatig kunnen worden gecorrigeerd.

B. Grafische Herinrichting voor Grote Deelnemersvelden (70+ honden)

Volledige schermbreedte: 1. Excel-import en 2. Handmatig deelnemer toevoegen staan overzichtelijk naast elkaar bovenaan; 3. Deelnemers & Baanindeling benut daaronder de volledige breedte, zodat lange stamboomnamen en eigenaarsgegevens niet meer over meerdere smalle regels afbreken.

Klikbare baantellers: Direct boven de zoekbalk tonen interactieve filterknoppen live het aantal honden per baan (Alle banen, Baan 1 t/m Baan 5).

Sticky tabelkop & Compacte weergave: De kolomkoppen blijven bovenaan vaststaan bij het scrollen door lange lijsten. Met de knop Compacte weergave kan de rijhoogte worden verkleind om nog meer deelnemers tegelijk op één scherm te tonen.

Uniforme UI: beheer.html en wedstrijdtafel.html delen nu dezelfde rustige kleurstelling, afgeronde kaarten, badges en gegroepeerde actieknoppen (↑, ↓, *, ✕).

C. Meerjarenondersteuning (2026 t/m 2040)

De jaarkiezer in beheer.html ondersteunt de kalenderjaren 2026 t/m 2040 en selecteert bij het openen automatisch het lopende kalenderjaar.

Het gekozen actieve jaar wordt meegesynchroniseerd naar Firebase (wedstrijd/actief_jaar) zodat de wedstrijdtafel automatisch met dezelfde jaargang werkt.

4. Data-architectuur & Opslag

De applicatie werkt hybride (Offline-first + Realtime Cloud):

Lokale opslag (localStorage):

nnfc_deelnemers_<jaar>: Volledige deelnemerslijst inclusief baanindeling, betaalstatus, aanwezigheid, KCM-uitslag en buiten-mededinging-vlag.

nnfc_kcm_<jaar>: Koppeltabel van startnummer naar KCM-predikaat.

JSON Back-up: Via de knop Back-up (JSON) in beheer.html kan op elk moment een volledige export (nnfc_deelnemers_<jaar>_backup.json) worden gedownload.

Firebase Realtime Database (config.js):

wedstrijd/actief_jaar: Huidig geselecteerd wedstrijdjaar.

wedstrijd/beheer_deelnemers: Centrale deelnemerslijst.

wedstrijd/kcm_selecties: Gedeelde KCM-uitslagen tussen Beheer en Wedstrijdtafel.

wedstrijd/baan_lijsten/baan_<1..5>: Gefilterde startlijsten met uitsluitend aanwezige honden voor de klokkers.

wedstrijd/registraties, wedstrijd/meldingen, wedstrijd/logboek & wedstrijd/banen_status: Live tijdwaarneming, conflictresolutie en audittrail tijdens de wedstrijd.

5. Aanbevelingen voor GitHub & Beheer

Bestandsnamen: Hernoem bij het plaatsen in de hoofdmap van je GitHub-repository beheer_3.html naar beheer.html en wedstrijdtafel_4.html naar wedstrijdtafel.html, zodat de onderlinge navigatielinks (href="beheer.html" en href="wedstrijdtafel.html") direct werken.

Gevoelige sleutels (config.js): Zorg ervoor dat in een publieke GitHub-repository de Firebase-beveiligingsregels (Realtime Database Rules) goed zijn ingesteld, of houd de repository privé.

Jaarlijkse back-up: Bewaar na elke trial zowel de JSON-back-up uit beheer.html als de Officiële Uitslag (CSV) uit wedstrijdtafel.html in een aparte map (bijv. /archief/2026/) in de repository.
