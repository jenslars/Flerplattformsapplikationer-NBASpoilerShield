import DBHandler from './db-handler';
import DataSplitter from './data-splitter';
import NBADataFetcher from '../api/nba-data-fetcher';
import React from 'react';
import ReactDOM from 'react-dom';
import Variants from './mui-react-modules/skeleton/skeleton';

//Class used for creating and handling the Game schedule feed

class GameScheduleFeed {
    constructor() {
        this.dbHandler = new DBHandler();
        this.dataFetcher = new NBADataFetcher();
        this.dataSplitter = new DataSplitter();
        this.gameContainer = document.getElementById('fetched-game-section');
    }


    //Used to handle the blocking of spoilers for selected game
    async blockSpoilers(gameId, homeTeamId, homeTeam, homeTeamNickname, awayTeamId, awayTeam, awayTeamNickname, season, gameBlockedOverlay) {
        gameBlockedOverlay.classList.add("active");
        const playerData = await this.dataFetcher.fetchPlayerData(homeTeamId, awayTeamId, season);
        const spoilerData = await this.dataSplitter.splitPlayerData(playerData);
        spoilerData.push(awayTeam, homeTeam, awayTeamNickname, homeTeamNickname);
        this.dbHandler.toggleBlockedStatus(gameId)
        this.dbHandler.cacheBlockedGames(gameId, spoilerData);
        
    }

    //Used to handle the unblocking of spoilers for selected game
    async unblockSpoilers(gameId, gameBlockedOverlay) {
        gameBlockedOverlay.classList.remove('active');
        this.dbHandler.toggleBlockedStatus(gameId);
        this.dbHandler.removeBlockedGame(gameId);
    }

    //Used to fetch and create game schedule
    async createGameSchedule(date) {
        this.gameContainer.innerHTML = '';
        ReactDOM.render(<Variants />, this.gameContainer);

        const testGetBlockedGames = await this.dbHandler.getBlockedGames();
        console.log(testGetBlockedGames);
        try {
            let cachedGames = await this.dbHandler.getGamesByDate(date);
            console.log("Fetched Games:", cachedGames);
            if (!cachedGames || cachedGames.length === 0) {
                await this.dataFetcher.fetchSchedule(date);
            }
            
            cachedGames = await this.dbHandler.getGamesByDate(date);
            this.displayGames(cachedGames);
        } catch (error) {
            console.log('Vi är i första error hanteraren')
            this.gameContainer.innerHTML = '';
            console.error('Error processing games:', error);
            this.gameContainer.textContent = 'There was an error fetching the scheduled games: ' + error;

        }
    }

    //Used to handle the response of received games
    async displayGames(games) {
        this.gameContainer.innerHTML = '';
    
        try {
            if (!games || games.length === 0) {
                const noResultDiv = document.createElement('div');
                noResultDiv.className = 'no-results-found';
                const noResultText = document.createElement('p');
                noResultText.className = 'no-result-paragraph';
                noResultText.textContent = 'No games are scheduled on this day';
                noResultDiv.appendChild(noResultText);
                this.gameContainer.appendChild(noResultDiv);
                return;
            }
    
            for (const game of games) {
                try {
                    const splittedDateTime = await this.dataSplitter.convertTime(game.formattedDateTime);
                    this.processEachGame(game, splittedDateTime);
                } catch (error) {
                    console.error('Error processing a game:', error);
                    this.gameContainer.textContent = `Error processing game data: ${error.message || error}`;
                    break;
                }
            }
        } catch (error) {
            console.error('Error creating game schedule:', error);
            this.gameContainer.textContent = 'There was an error fetching the scheduled games: ' + error;
        }
    }
    
     //Used to create needed html for retrieved games
    processEachGame(game, splittedDateTime) {

        const blurredGameDiv = document.createElement('div');
        blurredGameDiv.className = 'blurredGameDiv';

        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-div';

        const homeTeamDiv = this.createTeamDiv(game.homeTeamLogo, game.homeTeamNickname, 'home-team');
        const awayTeamDiv = this.createTeamDiv(game.awayTeamLogo, game.awayTeamNickname, 'away-team');

        const gameDateTimeDiv = document.createElement('div');
        gameDateTimeDiv.className = 'game-date-time';

        const gameTime = document.createElement('p');
        gameTime.className = 'game-time';
        gameTime.textContent = splittedDateTime[0];

        const timeZone = document.createElement('p');
        timeZone.className = 'time-zone';
        timeZone.textContent = this.dataSplitter.getTimeZoneAbbr();

        const gameDate = document.createElement('p');
        gameDate.className = 'game-date';
        gameDate.textContent = splittedDateTime[1];

        gameDateTimeDiv.append(gameTime, timeZone, gameDate);
        
        const gameDivider = document.createElement('div');
        gameDivider.className = 'game-divider';

        const gameBlockSection = document.createElement('div');
        gameBlockSection.className = 'game-block-section';

        const gameBlockedOverlay = document.createElement('div');
        if (game.gameBlockedStatus === true) {
            gameBlockedOverlay.className = 'game-blocked-overlay active';
        } else {
            gameBlockedOverlay.className = 'game-blocked-overlay';
        }

        gameBlockedOverlay.innerHTML = 'Game Blocked';
        gameBlockedOverlay.addEventListener("click", () => {
            this.unblockSpoilers(game.gameId, gameBlockedOverlay);
        });

        const gameBlockSectionParagraph = document.createElement('p');
        gameBlockSectionParagraph.textContent = 'Block';
        gameBlockSection.addEventListener("click", () => {
            this.blockSpoilers(game.gameId, game.homeTeamId, game.homeTeam, game.homeTeamNickname, game.awayTeamId, game.awayTeam, game.awayTeamNickname, game.season, gameBlockedOverlay);
        });
        gameBlockSection.appendChild(gameBlockSectionParagraph);

        
        gameDiv.append(homeTeamDiv, gameDateTimeDiv, awayTeamDiv, gameDivider, gameBlockSection, gameBlockedOverlay);
        
        blurredGameDiv.append(gameDiv)

        this.gameContainer.appendChild(blurredGameDiv);
    }

    //Create the html required for the team element
    createTeamDiv(logoUrl, nickname, className) {
        const teamDiv = document.createElement('div');
        teamDiv.className = className;

        const teamLogo = document.createElement('img');
        teamLogo.src = logoUrl;
        teamLogo.alt = nickname;
        teamLogo.className = className + '-logo';

        const teamNickname = document.createElement('p');
        teamNickname.textContent = nickname;
        teamNickname.className = className + '-nickname';

        teamDiv.append(teamLogo, teamNickname);
        return teamDiv;
    }
}

export default GameScheduleFeed;
