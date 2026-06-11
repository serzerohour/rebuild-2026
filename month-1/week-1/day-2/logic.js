// === LOGIC SIMULATION ===

// define games
const games = [
    {
        gameID: "MW3",
        gameName: "Call of Duty: Modern Warfare 3",
        genre: "First-Person Shooter",
        releaseDate: "2011-11-08",
        platforms: ["PC", "Xbox 360", "PlayStation 3"]
    },
    {
        gameID: "BO2",
        gameName: "Call of Duty: Black Ops II",
        genre: "First-Person Shooter",
        releaseDate: "2012-11-13",
        platforms: ["PC", "Xbox 360", "PlayStation 3"]
    },
    {
        gameID: "DOTA2",
        gameName: "Dota 2",
        genre: "Multiplayer Online Battle Arena",
        releaseDate: "2013-07-09",
        platforms: ["PC"]
    },
    {
        gameID: "CSGO",
        gameName: "Counter-Strike: Global Offensive",
        genre: "First-Person Shooter",
        releaseDate: "2012-08-21",
        platforms: ["PC"]
    }
]

// define players
const players = [
    {
        playerId: 1,
        playerName: "Ali",
        playerUsername: "Ali5325",
        playerEmail: "john.doe@example.com",
        playerAvatar: "avatar1.png",
        playerLevel: 15,
        playerExperience: 1000
    },
    {
        playerId: 2,
        playerName: "Reza",
        playerUsername: "Reza_behnoud",
        playerEmail: "alireza.behnoud@example.com",
        playerAvatar: "avatar2.png",
        playerLevel: 20,
        playerExperience: 2000
    },
    {
        playerId: 3,
        playerName: "Sara",
        playerUsername: "sarabeauty4ul",
        playerEmail: "sarabeauty4ul@example.com",
        playerAvatar: "avatar3.png",
        playerLevel: 25,
        playerExperience: 3000
    },
    {
        playerId: 4,
        playerName: "Nima",
        playerUsername: "nimaahmadii",
        playerEmail: "sara.smith@example.com",
        playerAvatar: "avatar4.png",
        playerLevel: 30,
        playerExperience: 4000
    },
    {
        playerId: 5,
        playerName: "Darya",
        playerUsername: "0xdarya",
        playerEmail: "darya.johnson@example.com",
        playerAvatar: "avatar5.png",
        playerLevel: 35,
        playerExperience: 5000
    }
    ,
    {
        playerId: 6,
        playerName: "Kaveh",
        playerUsername: "serkaveh",
        playerEmail: "mrkaveh@example.com",
        playerAvatar: "avatar6.png",
        playerLevel: 40,
        playerExperience: 6000
    },
    {
        playerId: 7,
        playerName: "Michael Brown",
        playerUsername: "michael_brown",
        playerEmail: "michael.brown@example.com",
        playerAvatar: "avatar7.png",
        playerLevel: 45,
        playerExperience: 7000
    }
]

// define teams 
const teams = [
    { teamId: "1", teamName: "ZeroHour", teamTag: "ZH", teamCaptainId: "1" },
    { teamId: "2", teamName: "ShadowStrike", teamTag: "SS", teamCaptainId: "4" },
    { teamId: "3", teamName: "IronWolves", teamTag: "IW", teamCaptainId: "6" },
    { teamId: "4", teamName: "Numbers", teamTag: "321", teamCaptainId: "7" }

]

// define memberships (which players are in which teams)
const memberships = [
    { playerId: "1", teamId: "1" },
    { playerId: "2", teamId: "1" },
    { playerId: "3", teamId: "1" },
    { playerId: "2", teamId: "2" },  // Reza is in TWO teams
    { playerId: "4", teamId: "2" },
    { playerId: "5", teamId: "2" },
    { playerId: "5", teamId: "3" },  // Darya is in TWO teams
    { playerId: "6", teamId: "3" },
    { playerId: "3", teamId: "3" }   // Sara is in TWO teams
];

// define events
const events = [
    { eventId: "1", eventName: "Iran Dota Championship", eventType: "tournament", eventGameId: "DOTA2", eventType: "team" },
    { eventId: "2", eventName: "CS Masters League", eventType: "league", eventGameId: "CSGO", eventType: "team" },
    { eventId: "3", eventName: "CoD FFA Night", eventType: "casual", eventGameId: "MW3", eventType: "individual" }
];

// Confirmed rosters (starts empty - your functions will fill this)
const rosters = [];

// Individual event registrations (starts empty)
const individualRegistrations = [];


const isPlayerMemberOfTeam = (playerId, teamId) => {

    /* Old version
    let found = false;

    for (let index = 0; index < memberships.length; index++) {
        const element = memberships[index];
        let seletedPID = false;
        let seletedTID = false;
        for (const key in element) {
            if (element[key] == playerId) seletedPID = true;
            if (element[key] == teamId) seletedTID = true;
        }
        if (seletedPID && seletedTID) {
            found = true;
            break;
        }
    }
    return found;
    */
    // New version
    return result = memberships.some(m => m.playerId == playerId && m.teamId == teamId);
}

const isCaptain = (teamId, playerId) => {

    /* Old version
    for (let index = 0; index < teams.length; index++) {
        const teamObject = teams[index];

        for (const key in teamObject) {

            if (teamObject[key] == teamId && teamObject["teamCaptainId"] == playerId) {
                return true;

            }

        }

    }
    return false;
    */
    // New version
    const isCaptainExist = teams.find(t => t.teamId == teamId && t.teamCaptainId == playerId);
    if(isCaptainExist){
        return true;
    }else{
        return false;
    }

}

//if (isCaptainExist)return true;
//else return false;




const isPlayerAlreadyInEventRoster = (playerId, eventId) => {

    /* old version
    for (let index = 0; index < rosters.length; index++) {
        const rosterObject = rosters[index];
        for (const key in rosterObject) {

            if (rosterObject[key] == playerId && rosterObject['eventId'] == eventId) {
                return true;
            }


        }
    }
    return false;
    */
   // New version
    return result = rosters.some(r => r.playerId == playerId && r.eventId == eventId);


}
const isPlayerRegisteredIndividual = (playerId, eventId) => {
    for (let index = 0; index < individualRegistrations.length; index++) {
        const individualObject = individualRegistrations[index];
        for (const key in individualObject) {

            if (individualObject[key] == playerId && individualObject['eventId'] == eventId) {
                return true;
            }


        }
    }
    return false;
}


const getEventType = (eventID) => {
    for (let index = 0; index < events.length; index++) {
        const eventObject = events[index];
        for (const key in eventObject) {
            if (eventObject[key] == eventID) return eventObject['eventType'];
        }

    }
    return false;
}

const findEntityNameById = (entityId, entityType) => {
    let entityNewArray = [];
    let fieldName = "";
    switch (entityType) {
        case "player":
            entityNewArray = players;
            fieldName = "playerName";
            break;
        case "team":
            entityNewArray = teams;
            fieldName = "teamName";
            break;
        case "event":
            entityNewArray = events;
            fieldName = "eventName";
    }

    for (let index = 0; index < entityNewArray.length; index++) {
        const entitySelectedObject = entityNewArray[index];
        for (const key in entitySelectedObject) {
            if (entitySelectedObject[key] == entityId)
                return entitySelectedObject[fieldName];
        }

    }
    return false;
}
// captainId, playerId, teamId, eventID
const selectPlayerForRoster = (captainId, playerId, teamId, eventId) => {
    if (!isCaptain(teamId, captainId)) {
        console.log("Only the captain can select roster \n");
    }
    else if (!isPlayerMemberOfTeam(playerId, teamId)) {
        console.log("Player is not a member of this team \n");
    }
    else if (isPlayerAlreadyInEventRoster(playerId, eventId)) {
        console.log("Player is already registered in this event \n");
    }
    else {

        // Push new object data to roster array        
        rosters.push({ playerId, teamId, eventId });
        console.log(`Player ${findEntityNameById(playerId, "player")} confirmed for team ${findEntityNameById(teamId, "team")} in ${findEntityNameById(eventId, "event")}`);
    }
}

const registerPlayerIndividually = (playerId, eventId) => {


    if (getEventType(eventId) !== "individual" && getEventType(eventId) !== false) {
        console.log("This event requires team registration");

    }
    else if (isPlayerRegisteredIndividual(playerId, eventId)) {
        console.log("Already registered");
    }
    else {
        individualRegistrations.push({ playerId, eventId });

        console.log(`Player ${findEntityNameById(playerId, "player")} registered for ${findEntityNameById(eventId, "event")}`);
    }

}



// Now time to backtest it with Arena requests
// Case 1:  Ali (captain of ZeroHour) selects Reza for Iran Dota Championship
console.log("Case 1: \n")
selectPlayerForRoster(1, 2, 1, 1);

// Case 2: Nima (captain of ShadowStrike) selects Reza for Iran Dota Championship
console.log("Case 2: \n");
selectPlayerForRoster(4, 2, 2, 1);

// Case 3: Nima (captain of ShadowStrike) selects Reza for CS Masters League
console.log("Case 3: \n");
selectPlayerForRoster(4, 2, 2, 2);

// Case 4: Ali tries to select Kaveh for Iran Dota Championship
console.log("Case 4: \n");
selectPlayerForRoster(1, 6, 1, 1);

// Case 5: Reza (not captain) tries to select Sara for ZeroHour
console.log("Case 5: \n");
selectPlayerForRoster(2, 3, 1, 1);

// Case 6: Register Ali individually for CoD FFA Night
console.log("Case 6: \n");
registerPlayerIndividually(1, 3);

// Case 7: Register Ali individually for Iran Dota Championship
console.log("Case 7: \n");
registerPlayerIndividually(1, 1);

// Case 8: Register Ali individually for CoD FFA Night again
console.log("Case 8: \n");
registerPlayerIndividually(1, 3);
