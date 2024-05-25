/* Class used for splitting JSON */
import GameStructure from './game-structure';
import TimeConverter from '../api/time-converter';

  //Class used to split the fetched data in order to save the needed data

    class DataSplitter{
    constructor(){
        this.timeconverter = new TimeConverter
    }

    //Splits the retrieved game data
    async splitGameData(jsonData) {
        const games = jsonData.response;
        const gameStructuresPromises = games.map(async (game) => {
          const gameId = game.id;
          const homeTeam = game.teams.home.name;
          const homeTeamId = game.teams.home.id;
          const homeTeamNickname = game.teams.home.code;
          const homeTeamLogo = game.teams.home.logo;
          const awayTeam = game.teams.visitors.name;
          const awayTeamId = game.teams.visitors.id;
          const awayTeamNickname = game.teams.visitors.code;
          const awayTeamLogo = game.teams.visitors.logo;
          const unhandledGameTimeStart = game.date.start;
          const season = game.season;
        
          var [date, timeWithMilliseconds] = unhandledGameTimeStart.split('T');
    
          const gameDate = date

          var time = timeWithMilliseconds.split('.')[0];
          const formattedDateTime = `${date} ${time}`; 
    

          return new GameStructure(gameId, gameDate, homeTeam, homeTeamId, homeTeamNickname, homeTeamLogo, awayTeam, awayTeamId, awayTeamNickname, awayTeamLogo, formattedDateTime, season);
      });
    
        const gameStructures = await Promise.all(gameStructuresPromises);
        return gameStructures;
      }

      //Converts time
      async convertTime(formattedDateTime) {
        try {
          const convertedValues = await this.timeconverter.convertTime(formattedDateTime); 
          const convertedTime = convertedValues[0];
          const formattedDate = `${convertedValues[2]}/${convertedValues[1]}`;  
  
          return [convertedTime, formattedDate];
        } catch (error) {
          throw error;
        }
       
      }

      //Gets current timezone abbriveation
      getTimeZoneAbbr() {
        const options = {
          hour: '2-digit',
          hour12: false,
          timeZoneName: 'short'
        };
        const formatter = new Intl.DateTimeFormat([], options);
        const parts = formatter.formatToParts(new Date());
        const timeZoneName = parts.find(part => part.type === 'timeZoneName');
        return timeZoneName ? timeZoneName.value : 'Unknown TZ';
      }

      //Splits the retrieved player data
      async splitPlayerData(spoilerData){
        console.log("vi är i playerdata")
        const { homeTeamData, awayTeamData } = spoilerData;
        let playerNames = [];

        const addNamesToList = (teamData) => {
            teamData.forEach(player => {
                playerNames.push(`${player.firstname} ${player.lastname}`);
                });
            };

            if (homeTeamData && Array.isArray(homeTeamData)) {
                addNamesToList(homeTeamData);
            }

            // Extract names from away team data
            if (awayTeamData && Array.isArray(awayTeamData)) {
                addNamesToList(awayTeamData);
        }

        return playerNames;
    }



    }

   

export default DataSplitter;



