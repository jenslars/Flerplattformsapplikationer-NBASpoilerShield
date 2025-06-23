# Flerplattformsapplikationer-NBASpoilerShield

> **Notice**: This repository is no longer maintained and was made way before I knew any better :^). The project is currently being refactored to react and is improved to support more sports and websites with the help of a self mantained API. The new repository is located at: [spoilershield-sports-extension](https://github.com/jenslars/spoilershield-sports-extension)

**SpoilerShield** is a Firefox extension built as a hobby project. It blocks potential spoilers for NBA games on YouTube.com by allowing users to select and block specific games through a popup interface.

---

## Getting Started

### Prerequisites
To run and test the extension locally, you'll need:
- [Node.js](https://nodejs.org/en)
- [Firefox](https://www.mozilla.org/en-US/firefox/)
- [Visual Studio Code](https://code.visualstudio.com/)

---

## Installation

1. Clone this repository:
```bash
  git clone https://github.com/jenslars/Flerplattformsapplikationer-NBASpoilerShield
  cd Flerplattformsapplikationer-NBASpoilerShield
```

2. Install dependencies:
```bash
  npm install
```

3. Build the extension:
```bash
  npm run build
```


4. Load the extension in Firefox:
  - Open Firefox and go to about:debugging
  - Click "This Firefox"
  - Click "Load Temporary Add-on"
  - Select the manifest.json file inside the project folder

## How to Use

1. Click on the extension icon in the browser toolbar
2. Browse the game schedule and choose a date (e.g., 2024-05-31)
3. Click BLOCK on a game (e.g., Minnesota Timberwolves vs. Dallas Mavericks)
4. Visit YouTube or search directly:
  https://www.youtube.com/results?search_query=dallas+mavericks

If the extension was just installed, you may need to refresh YouTube for it to take effect.

## Installationsguide (Svenska)

1. Klona detta repo:
```bash
  git clone https://github.com/jenslars/Flerplattformsapplikationer-NBASpoilerShield
  cd Flerplattformsapplikationer-NBASpoilerShield
```

2. Installera beroenden:
```bash
  npm install
```

3. Bygg projektet:
```bash
  npm run build
```

4. Ladda tillägget i Firefox:
  - Öppna Firefox och skriv about:debugging i adressfältet
  - Klicka på "Detta Firefox"
  - Klicka på "Ladda temporärt tillägg"
  - Välj manifest.json-filen i projektmappen

## Användning (Svenska)

1. Klicka på tilläggsikonen i verktygsfältet
2. Välj ett datum (t.ex. 2024-05-31) i popup-fönstret
3. Tryck på BLOCK på en match (t.ex. Timberwolves mot Mavericks)
4. Besök YouTube eller sök direkt:
  https://www.youtube.com/results?search_query=dallas+mavericks

Om tillägget nyss installerats kan det krävas att YouTube laddas om för att tilläggets skript ska börja köras.

## Built With

- Axios
- JavaScript
- MUI (Material-UI)

## Author

Jens Larsen