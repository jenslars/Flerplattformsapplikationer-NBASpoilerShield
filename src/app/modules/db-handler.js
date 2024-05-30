//Class for Indexed Database

class DBHandler {
    constructor() {
        this.dbName = 'gamesDatabase';
        this.version = 4;
        this.dbPromise = this.initDB();
    }

    //Initializes Database
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
            
                if (!db.objectStoreNames.contains('fetched-games')) {
                    const fetchedGamesStore = db.createObjectStore('fetched-games', { keyPath: 'gameId' });
                    fetchedGamesStore.createIndex('gameDate', 'gameDate', { unique: false });
                    fetchedGamesStore.createIndex('gameBlockedStatus', 'gameBlockedStatus', { unique: false });
                }
            
                if (!db.objectStoreNames.contains('blocked-games')) {
                    db.createObjectStore('blocked-games', { keyPath: 'gameId' });
                }
            };
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                console.error('Database error:', event.target.errorCode);
                reject(event.target.error);
            };
        });
    }

    //Opens transaction
    async getDB() {
        if (!this.dbPromise) {
            this.dbPromise = this.initDB();
        }
        return this.dbPromise;
    }

    //Saves fetched schedule
    async cacheGameData(games) {
        const db = await this.getDB();
        const transaction = db.transaction(['fetched-games'], 'readwrite');
        const store = transaction.objectStore('fetched-games');
    
        games.forEach(game => {
            console.log('Caching game:', game); 
            if (typeof game === 'string') {
                game = JSON.parse(game); 
            }
            store.put(game);
        });
    
        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                console.log('Games cached successfully');
                resolve();
            };
            transaction.onerror = (event) => {
                console.error('Transaction failed:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    //Retrieves saved game schedule
    async getGamesByDate(date) {
        const db = await this.getDB();
        const transaction = db.transaction(['fetched-games'], 'readonly');
        const store = transaction.objectStore('fetched-games');
        const index = store.index('gameDate');

        return new Promise((resolve, reject) => {
            const request = index.getAll(date);
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = (event) => {
                console.error('Error retrieving games by date:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    //Saves a blocked game and its data
    async cacheBlockedGames(gameId, data) {
        const db = await this.getDB();
        const transaction = db.transaction(['blocked-games'], 'readwrite');
        const store = transaction.objectStore('blocked-games');
        
        store.put({ gameId, data });

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = (event) => {
                console.error('Failed to cache blocked game data:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    //Sets blocked status
    async toggleBlockedStatus(gameId) {
        const db = await this.getDB();
        const transaction = db.transaction(['fetched-games'], 'readwrite');
        const store = transaction.objectStore('fetched-games');

        return new Promise((resolve, reject) => {
            const request = store.get(gameId);
            request.onsuccess = () => {
                const game = request.result;
                if (game) {
                    // Toggle the blocked status
                    game.gameBlockedStatus = !game.gameBlockedStatus;
                    store.put(game);
                    transaction.oncomplete = () => {
                        console.log('Blocked status toggled successfully for gameId:', gameId);
                        resolve(game);
                    };
                    transaction.onerror = (event) => {
                        console.error('Failed to toggle blocked status:', event.target.error);
                        reject(event.target.error);
                    };
                } else {
                    console.log('No game found with gameId:', gameId);
                    reject(new Error('No game found with gameId: ' + gameId));
                }
            };
            request.onerror = (event) => {
                console.error('Failed to retrieve game:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    //Retrieves blocked games
    async getBlockedGames() {
        const db = await this.getDB();
        const transaction = db.transaction(['blocked-games'], 'readonly');
        const store = transaction.objectStore('blocked-games');
    
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                console.log(request.result)
                resolve(request.result); 
            };
            request.onerror = (event) => {
                console.error('Failed to retrieve all blocked game data:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    //Removes block game
    async removeBlockedGame(gameId) {
        const db = await this.getDB();
        const transaction = db.transaction(['blocked-games'], 'readwrite');
        const store = transaction.objectStore('blocked-games');

        return new Promise((resolve, reject) => {
            const request = store.delete(gameId);
            request.onsuccess = () => {
                console.log(`Game with gameId ${gameId} has been removed from blocked-games.`);
                resolve();
            };
            request.onerror = (event) => {
                console.error('Error removing game:', event.target.error);
                reject(event.target.error);
            };
        });
    }
}

export default DBHandler;
