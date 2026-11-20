NNFC Digitale Waarneming – Watertrials

Webapplicatie voor de voorbereiding, aanmelding, tijdwaarneming en uitslagenverwerking van de NNFC Watertrials (volgens het Reglement Trials 4 oktober 2026), geschikt voor de wedstrijdjaargangen 2026 t/m 2040.

Overzicht van de onderdelen

index.html – Startmenu voor de verschillende rollen en schermen.

beheer.html – Voorbereiding door waterwerkcoördinator en secretariaat: CSV-import uit Excel, handmatige invoer (inclusief spellinghulp uit referentie2026.js en KCM-uitslagen), baanindeling (Baan 1 t/m 5), startnummers, JSON-back-up en synchronisatie met de wedstrijdtafel.

wedstrijdtafel.html – Live wedstrijdtafel voor het secretariaat en wedstrijdleiding: aanmelding (Aanwezig), daginschrijvingen (+ Extra deelnemer), handmatige tijden/weigeringen, conflictmeldingen, Klokkersbeeld per baan, Bekers & KCM ((Junior) Spettertrofee) en CSV-uitslagenexport.

klokker.html – Scherm voor de tijdwaarneming aan de baan.

config.js – Configuratie van de Firebase Realtime Database.

audit.md – Uitgebreide technische en reglementaire audit (zie audit.md).

Wedstrijddag-checklist

Vooraf (voorbereiding):

Controleer in beheer.html het actieve jaar (2026 t/m 2040) en laad de deelnemerslijst in via CSV of handmatige invoer.

Vul bekende KCM-uitslagen (BOB t/m S) in voor de Spettertrofee en Junior Spettertrofee.

Maak een JSON-back-up (Back-up (JSON)) en klik op Synchroniseer met Wedstrijdtafel.

Testdata opschonen vóór de start:

Controleer op de wedstrijdtafel of er geen oude testregistraties, testmeldingen of een afwijkend actief jaar meer staan voordat de eerste honden starten.

Tijdens de trials:

Vink in wedstrijdtafel.html bij Aanmelding honden op Aanwezig zodra ze zich melden bij het secretariaat en synchroniseer de banen.

Gebruik Klokkersbeeld om snel te controleren welke aanwezige honden en tijden op een baan zichtbaar zijn, en Meldingen om eventuele tijdconflicten te beoordelen.

Na afloop:

Controleer de standen en de Spettertrofee / Junior Spettertrofee onder Bekers & KCM.

Exporteer de uitslag via Exporteer Uitslag (CSV) en sla zowel het CSV-bestand als een definitieve JSON-back-up veilig op.
