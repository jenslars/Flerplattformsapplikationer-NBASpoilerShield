/* Used to convert the time of the scheduled games to the users local time*/

class TimeConverter{
    constructor(){}

    async convertTime(time) {
        const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const apiUrl = 'https://timeapi.io/api/Conversion/ConvertTimeZone';
    
        const postData = {
            fromTimeZone: "Etc/Zulu",
            dateTime: time,
            toTimeZone: localTimeZone,
            dstAmbiguity: ""
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(postData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            
            const userGameLocalTime = data.conversionResult.time;
            const userGameLocalTimeMonth = data.conversionResult.month;
            const userGameLocalTimeDay = data.conversionResult.day;
            
            return  [userGameLocalTime, userGameLocalTimeMonth, userGameLocalTimeDay];
        } catch (error) {
            console.error('There was an error with the time conversion request:', error);
            throw error;
        }
    }
    
}   

export default TimeConverter;
