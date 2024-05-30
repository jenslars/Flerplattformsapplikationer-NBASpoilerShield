import axios from 'axios';
import DataSplitter from '../modules/data-splitter';
import DBHandler from '../modules/db-handler';

class NBADataFetcher {
    constructor() {
        this.key = '98d977fc18mshe5acc90839bae9fp196b9bjsn1a0e87e7c524';
        this.host = 'api-nba-v1.p.rapidapi.com';
        this.datasplitter = new DataSplitter();
        this.dbHandler = new DBHandler();
    }

    fetchKey() {
        return this.key;
    }

    fetchHost() {
        return this.host;
    }

    // Fetches game schedule and stores it in indexed database
    async fetchSchedule(date) {
        if (!date) {
            let year = new Date().getFullYear();
            let month = (new Date().getMonth() + 1).toString().padStart(2, '0');
            let day = new Date().getDate().toString().padStart(2, '0');
            date = `${year}-${month}-${day}`;
        }
        const url = `https://api-nba-v1.p.rapidapi.com/games?date=${date}`;
        const options = {
            headers: {
                'X-RapidAPI-Key': this.key,
                'X-RapidAPI-Host': this.host
            }
        };

        try {
            const response = await axios.get(url, options);
            console.log(response.data);  // axios automatically parses the JSON
            const matchObjects = await this.datasplitter.splitGameData(response.data);
            console.log(matchObjects);
            this.dbHandler.cacheGameData(matchObjects);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            throw error;
        }
    }

    // Fetches and returns player data from respective team and season
    async fetchPlayerData(homeTeamId, awayTeamId, season) {
        const homeTeamUrl = `https://api-nba-v1.p.rapidapi.com/players?team=${homeTeamId}&season=${season}`;
        const awayTeamUrl = `https://api-nba-v1.p.rapidapi.com/players?team=${awayTeamId}&season=${season}`;
        const options = {
            headers: {
                'X-RapidAPI-Key': this.key,
                'X-RapidAPI-Host': this.host
            }
        };

        try {
            const [homeTeamResponse, awayTeamResponse] = await Promise.all([
                axios.get(homeTeamUrl, options),
                axios.get(awayTeamUrl, options)
            ]);

            console.log('Home Team Data:', homeTeamResponse.data);
            console.log('Away Team Data:', awayTeamResponse.data);

            return {
                homeTeamData: homeTeamResponse.data.response,
                awayTeamData: awayTeamResponse.data.response
            };

        } catch (error) {
            console.error('Error fetching player data:', error);
            throw error;
        }
    }
}

export default NBADataFetcher;
