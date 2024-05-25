/*Class to fetch data from NBA-API*/

import DataSplitter from '../modules/data-splitter';
import DBHandler from '../modules/db-handler';


class NBADataFetcher{
    constructor(){
    this.key = '98d977fc18mshe5acc90839bae9fp196b9bjsn1a0e87e7c524'
    this.host = 'api-nba-v1.p.rapidapi.com'
    this.datasplitter = new DataSplitter()
    this.dbHandler = new DBHandler()
    }

    fetchKey() {
        return this.key
    }

    fetchHost(){
        return this.host
    }

    //Fetches game schedule and stores it in indexed database
    async fetchSchedule(date) {
        if (date === null){
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');         
            date = `${year}-${month}-${day}`;
            console.log(date)
        };
        const url = 'https://api-nba-v1.p.rapidapi.com/games?date=' + date;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': this.key,
                'X-RapidAPI-Host': this.host
            }
        };
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Response not OK');
            }
            const jsonData = await response.json();
            if (!jsonData || !jsonData.response) {
                throw new Error('jsonData or jsonData.response is undefined');
            }
            console.log(jsonData);
            const matchObjects = await this.datasplitter.splitGameData(jsonData);
            console.log(matchObjects);
            this.dbHandler.cacheGameData(matchObjects)
        } catch (error) {
            console.error('Error fetching schedule:', error);
            throw error; 
        }
    }

    //Fetches and returns player data from respective team and season
    async fetchPlayerData(homeTeamId, awayTeamId, season) {
        const homeTeamUrl = `https://api-nba-v1.p.rapidapi.com/players?team=${homeTeamId}&season=${season}`;
        const awayTeamUrl = `https://api-nba-v1.p.rapidapi.com/players?team=${awayTeamId}&season=${season}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': this.key,
                'X-RapidAPI-Host': this.host
            }
        };
    
        try {
            const [homeTeamResponse, awayTeamResponse] = await Promise.all([
                fetch(homeTeamUrl, options),
                fetch(awayTeamUrl, options)
            ]);
            if (!homeTeamResponse.ok || !awayTeamResponse.ok) {
                throw new Error('One or both responses were not OK');
            }
    
            const [homeTeamData, awayTeamData] = await Promise.all([
                homeTeamResponse.json(),
                awayTeamResponse.json()
            ]);
    
            if (!homeTeamData || !awayTeamData || !homeTeamData.response || !awayTeamData.response) {
                throw new Error('jsonData or jsonData.response is undefined');
            }
    
            console.log('Home Team Data:', homeTeamData);
            console.log('Away Team Data:', awayTeamData);
    
            return {
                homeTeamData: homeTeamData.response,
                awayTeamData: awayTeamData.response
            };
    
        } catch (error) {
            console.error('Error fetching spoiler data:', error);
            throw error;
        }
    }
    

}    

export default NBADataFetcher;
