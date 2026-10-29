# Physiksammlung – JavaScript-Version ohne PHP

## Start per Doppelklick

1. Entpacke `physiksammlung_javascript.zip`.
2. Öffne `physiksammlung_javascript/index.html` per Doppelklick im Browser.
3. Die drei Haupt-CSV-Datensätze sind in `inline-data.js` eingebettet, damit die Startansicht auch unter `file://` geladen werden kann.
4. Wenn du aktualisierte CSV-Dateien hast, klicke auf **CSV-Dateien laden** und wähle eine oder mehrere Dateien aus (`experimente.csv`, `inventur.csv`, `themes.csv`).

Die Anwendung liest und verarbeitet die CSV-Inhalte mit JavaScript im Browser. Sie benötigt weder PHP noch einen lokalen Webserver. Für Browser, die lokale Speicherung bei `file://` einschränken, bleibt **CSV exportieren** der empfohlene Weg, um Änderungen zu sichern.

## Funktionen

- Experimente, Inventar und Themen durchsuchen
- Übersichtsplan der Sammlung mit anklickbaren Schrankbereichen
- Einträge anzeigen, neu anlegen, bearbeiten und lokal löschen
- Eine oder mehrere CSV-Dateien auswählen und importieren
- Änderungen als CSV exportieren
- Lokale Zwischenspeicherung über `localStorage`, sofern vom Browser für lokale Dateien unterstützt
- Vorhandene Medien und Dokumente über relative Links öffnen, wenn die Medienarchive ebenfalls entpackt wurden

## Daten sichern

Änderungen werden nicht automatisch in die ursprünglichen CSV-Dateien zurückgeschrieben. Exportiere die geänderte CSV und ersetze die ursprüngliche Datei bei Bedarf manuell. Wenn die Datenbasis geändert wird, muss `inline-data.js` ebenfalls aktualisiert werden, damit diese Änderungen beim nächsten direkten Öffnen wieder als Startdaten eingebettet sind.

## Medienarchive

Entpacke die drei optionalen Medienarchive in denselben Zielordner wie das Hauptarchiv, damit die referenzierten Inventarbilder und Gerätekarten verfügbar sind:

- `physiksammlung_medien_1.zip`
- `physiksammlung_medien_2.zip`
- `physiksammlung_medien_3.zip`

## Einschränkungen

- Browser-JavaScript kann ohne Backend keine Dateien auf dem Server dauerhaft ändern oder löschen.
- Dateiuploads können ohne Backend nicht dauerhaft auf dem Server gespeichert werden.
- Die bisherige PDF-Erzeugung über TCPDF und einzelne MySQL-basierte PHP-Abläufe sind nicht Bestandteil dieser statischen Version.

## CSV-Dateien

Die Hauptdaten liegen zusätzlich als Dateien im Ordner `data/`: `experimente.csv`, `inventur.csv`, `themes.csv` und `gbu_thm.csv`. Die drei von der Oberfläche verwendeten CSV-Dateien sind außerdem in `inline-data.js` eingebettet, damit `index.html` direkt geöffnet werden kann.


## Aktualisierung
- Farbgebung an das Limettengrün/Anthrazit/Weiß des BBS-Logos angepasst.
- Klick auf einen Schrank zeigt Inventar nach Fach sortiert; neben jedem Fach steht das passende Schrankfachfoto, sofern vorhanden.
- Die Original-Schrankfachbilder liegen unter `data/upload_inv/Schrankbilder/`.
