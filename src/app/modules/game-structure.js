/*Class used to define needed game data for frontend */

class GameStructure {
    constructor(gameId, gameDate, homeTeam, homeTeamId, homeTeamNickname, homeTeamLogo, awayTeam, awayTeamId, awayTeamNickname, awayTeamLogo, formattedDateTime, season) {
        this.gameId = gameId;
        this.gameDate = gameDate;
        this.homeTeam = homeTeam;
        this.homeTeamId = homeTeamId;
        this.homeTeamNickname = homeTeamNickname;
        this.homeTeamLogo = homeTeamLogo;
        this.awayTeam = awayTeam;
        this.awayTeamId = awayTeamId;
        this.awayTeamNickname = awayTeamNickname;
        this.awayTeamLogo = awayTeamLogo;
        this.formattedDateTime = formattedDateTime;
        this.season = season;
        this.gameBlockedStatus = false;
    }
}

export default GameStructure;