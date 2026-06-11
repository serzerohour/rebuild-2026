// player.js 
// This file defines the player object with its findmatch player stats
let player ={
    generalInfo: {
        name: "Player1",
        level: 10,
        rank: "Gold",
        avatar: "avatar1.png"
    },
    playerClans: ["ClanA", "ClanB"],
    mw3Stats: {
        kills: 500,
        deaths: 300,
        kdRatio: 1.67,
        wins: 50,
        losses: 30
    },
    calculateKDratio: function(){
        return this.mw3Stats.kills / this.mw3Stats.deaths;
    }
    
}