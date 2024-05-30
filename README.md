# Flerplattformsapplikationer-NBASpoilerShield
 Repository for school project. Firefox extension that blocks potential spoilers for NBA games on YouTube.com.

# Requirements to run SpoilerShield
1. Download and install Node.js. Follow the guide found at https://nodejs.org/en
2. Download and install Firefox from https://www.mozilla.org/en-US/firefox/.
3. Download and install Visual Studio Code from https://code.visualstudio.com/

# Installation Guide
1. Download the SpoilerShield repository from GitHub (https://github.com/jenslars/Flerplattformsapplikationer-NBASpoilerShield).
2. Open the repository in Visual Studio Code and go the the terminal, in the terminal type "npm run build" and press enter
3. In Firefox, go to the URL field and type "about:debugging".
4. Click on "This Firefox".
5. Click on "Load Temporary Add-on".
6. Select the manifest file in the downloaded folder.
7. The extension is now installed. To test it, click on the extension icon and then again on the extension to start it.

# Test Run Instructions
1. To test the program, you need to block a game.
2. Do this by navigating to a game via the popup interface where each day's game schedule can be retrieved.
3. As an example, navigate to the date 2024-05-31 where a game between the Minnesota Timberwolves and the Dallas Mavericks is scheduled.
4. Block this by pressing "BLOCK".
5. Afterward, you need to visit https://www.youtube.com. To test the extension directly, you can instead visit the following link, which might consist of spoilers that we want to block:
   https://www.youtube.com/results?search_query=dallas+mavericks

   DISCLAIMER: When the extension is newly installed, it is sometimes necessary to reload YouTube for the extension scripts to start running.

# Installation Guide Svenska
1. Ladda ner SpoilerShield-repot via Github (https://github.com/jenslars/Flerplattformsapplikationer-NBASpoilerShield)
2. Öppna SpoileShield-mappen i Visual Studio Code och gå till terminalen. I terminalen, skriv "npm run build" och tryck på enter.
3. I URL-fältet skriv: about:debugging
4. Klicka på Detta Firefox. 
5. Klicka på Ladda temporärt tillägg
6. Välj manifest-filen i den nedladdade mappen.
7. Nu är tillägget installerat, för att testköra det så klickar ni på ikonen för tillägg och sedan igen på tillägget för att starta den. 

# Test run instructions Svenska
1. För att testköra programmet behöver ni blockera en match. 
2. Det gör ni genom att navigera till en match via popup-gränsnittet där varje dags spelschema kan hämtas.
3. Som exempel kan vi navigera till datumet 2024-05-31 där en match mellan Minnesota Timberwolves och Dallas Mavericks är schemalagd.
4. Blockera denna genom att trycka på "BLOCK". 
5. Därefter behöver vi besöka https://www.youtube.com. För att testa tillägget direkt kan ni istället besöka länken nedan som möjligen består av spoilers som vi vill blockera: 
   https://www.youtube.com/results?search_query=dallas+mavericks

   DISCLAIMER: När tillägget nyligen installerats så krävs det ibland att man laddar om YouTube för att tilläggets scrips skall börja köras. 

# Built With
- React
- Axios
- Javascript
- MUI Library

# Authors
- Jens Larsen

# License
This project is licensed under the MIT License - see the LICENSE.md file for details
