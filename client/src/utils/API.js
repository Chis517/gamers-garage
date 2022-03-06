import axios from "axios";
const userHeader = {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "f6901eb21f5847ed965a1390a72f3f2d"
};

export default {
    getAllGenres: function () {
        return axios({
            "method": "GET",
            "url": "https://rawg-video-games-database.p.rapidapi.com/genres",
            "headers": userHeader
        })
    },
    getAllPlatforms: function () {
        return axios({
            "method": "GET",
            "url": "https://rawg-video-games-database.p.rapidapi.com/platforms",
            "headers": userHeader
        })
    },
    getAllGames:function(page){
        /*return axios({
            "method":"GET",
            "url":"https://rawg-video-games-database.p.rapidapi.com/games",
            "headers": userHeader
        })*/
        return axios.get("https://api.rawg.io/api/games?page="+page);
    },
    getAutocompleteResult:function(query){
        return axios({
            "method":"GET",
            "url":"https://rawg-video-games-database.p.rapidapi.com/games?search="+query,
            "headers": userHeader
        })
    },
    getPlatformDetails:function(param){
        return axios({
            "method":"GET",
            "url":"https://rawg-video-games-database.p.rapidapi.com/platforms/"+param,
            "headers": userHeader
        })
    },
    getGameDetails:function(id){
        return axios({
            "method":"GET",
            "url":"https://rawg-video-games-database.p.rapidapi.com/games/"+id,
            "headers": userHeader
        })
    },
    saveGameDetails:function(gameData){
        //console.log("API::saveGameDetails=",gameData);
        return axios.post("/api/games/details",gameData);
    },
    getGamesDetails:function(id){
        //console.log("API::getGamesDetails=",id);
        return axios.get("/api/games/details"+id)
    },
    removeGamesDetails:function(id,username){
        //console.log("API::removeGameDetails:gameid=",id);
        return axios.delete("/api/games/remove/details/"+id+"/"+username);
    }
};