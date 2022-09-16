window.onload = function() {
    var userNumber = document.getElementById('userIdNumber');
    var yourUserUrl = "";
    var yourScholarshipURL = "";
    var json_obj = "";
    var msgUserName = "";
    var msgWeekScore = "";
    var msgTotalGames = "";
    var msgRank = "";
    var msgScore = "";
    var msgKills = "";
    var msgDeaths = "";
    var msgKD = "";
    var msgKPG = "";
    var msgScorePerGame = "";
    var msgEvCoins = "";
    var msgCPWeek = "";
    var msgCPTotal = "";
    var msgBRWeek = "";
    var msgBRTotal = "";
    var msgSurviveWeek = "";
    var msgSurviveBest = "";
    var msgEarnedAsScholar = "";
    var msgEarnedFromScholar = "";
    var msgAcctCreated = "";
    var msgChanged = "";
    var msgUser = "";
    var msgData = "";
    var userNameTxt = document.getElementById('userName');
    var userEquipDiv = document.getElementById('lastEquipped');
    var userRentingDiv = document.getElementById('userRenting');
    var createdTxt = document.getElementById("createdTxt");
    var changedTxt = document.getElementById("changedTxt");
    var rankTxt = document.getElementById("rankTxt");
    var totalScoreTxt = document.getElementById("totalScoreTxt");
    var totalGamesTxt = document.getElementById("totalGamesTxt");
    var weeklyScoreTxt = document.getElementById("weeklyScoreTxt");
    var killsTxt = document.getElementById("killsTxt");
    var deathsTxt = document.getElementById("deathsTxt");
    var kdRatioTxt = document.getElementById("kdRatioTxt");
    var kpgTxt = document.getElementById("kpgTxt");
    var scorePerGameTxt = document.getElementById("scorePerGameTxt");
    var evCoinsTxt = document.getElementById("evCoinsTxt");
    var earnedAsScholarTxt = document.getElementById("earnedAsScholarTxt");
    var earnedFromScholarTxt = document.getElementById("earnedFromScholarTxt");
    var cpWeekTxt = document.getElementById("cpWeekTxt");
    var cpTotalTxt = document.getElementById("cpTotalTxt");
    var brWeekTxt = document.getElementById("brWeekTxt");
    var brTotalTxt = document.getElementById("brTotalTxt");
    var survivalWeekTxt = document.getElementById("survivalWeekTxt");
    var survivalBestTxt = document.getElementById("survivalBestTxt");
    var characterSkinTxt = document.getElementById("characterSkinTxt");
    var autoRifleSkinTxt = document.getElementById("autoRifleSkinTxt");
    var swordSkinTxt = document.getElementById("swordSkinTxt");
    var burstRifleSkinTxt = document.getElementById("burstRifleSkinTxt");
    var handCannonSkinTxt = document.getElementById("handCannonSkinTxt");
    var laserRifleSkinTxt = document.getElementById("laserRifleSkinTxt");
    var msgRenting = "";
    var skinTitle = [];
    var validUser = false;

    geturlInfo();

    function geturlInfo(){
        userNameTxt.innerText = "";
        userRentingDiv.innerText = "";
        msgUserName = "";
        msgWeekScore = "";
        msgTotalGames = "";
        msgRank = "";
        msgScore = "";
        msgKills = "";
        msgDeaths = "";
        msgKD = "";
        msgKPG = "";
        msgScorePerGame = "";
        msgEvCoins = "";
        msgCPWeek = "";
        msgCPTotal = "";
        msgBRWeek = "";
        msgBRTotal = "";
        msgSurviveWeek = "";
        msgSurviveBest = "";
        msgEarnedAsScholar = "";
        msgEarnedFromScholar = "";
        msgAcctCreated = "";
        msgChanged = "";
        skinTitle = ["","","","","",""];
        validUser = false;

        if (userNumber.value == null || userNumber.value == "") {
            userNumber.value = 0;
            userNumber.innerText = 0;
        }

        yourUserUrl = "https://ev.io/user/" + userNumber.value + "?_format=json";
        yourScholarshipURL = "https://ev.io/scholar/" + userNumber.value;

        geturl(yourUserUrl);

        if(validUser) {
            getScholarshipUrl(yourScholarshipURL);
        }
    }

    function geturl(yourUrl){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);

        json_obj = JSON.parse(Httpreq.responseText);

        msgUserName = "";
        msgUser = "";

        if (Object.keys(json_obj).length > 1) {
            validUser = true;
            changeUserData();
        } else {
            msgUserName = "Invalid User";
            msgData = "This user does not have any data at this time.";

            changeUserText();
            changeLastEquipText(skinTitle);
        }
    }

    function getScholarshipUrl(yourUrl){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);

        json_obj = JSON.parse(Httpreq.responseText);

        if (json_obj.length > 0) {
            changeScholarData();
        } else {
            msgUser = "";
            msgRenting = "This user does not have any scholarships at this time.";

            changeScholarText();
        }
    }

    function changeUserData() {
        var skinNodes = [];
        var msgCharSkin = "";
        var msgSwordSkin = "";
        var msgARSkin = "";

        msgData = "";

        if(json_obj.name.length > 0){
            msgUserName = json_obj.name[0].value + " (" + json_obj.uid[0].value +  ")";
        }

        if(json_obj.field_weekly_score.length > 0){
            // msgWeekScore = json_obj.field_weekly_score[0].value;
            msgWeekScore = (json_obj.field_weekly_score[0].value).toLocaleString();
        }

        if (json_obj.field_total_games.length > 0) {
            msgTotalGames = (json_obj.field_total_games[0].value).toLocaleString();
        }

        if (json_obj.field_rank.length > 0) {
            msgRank = (json_obj.field_rank[0].value).toLocaleString();
        }

        if (json_obj.field_score.length > 0) {
            msgScore = (json_obj.field_score[0].value).toLocaleString();
        }

        if (json_obj.field_kills.length > 0) {
            msgKills = (json_obj.field_kills[0].value).toLocaleString();
        }

        if (json_obj.field_deaths.length > 0) {
            msgDeaths = (json_obj.field_deaths[0].value).toLocaleString();
        }

        if (json_obj.field_k_d.length > 0) {
            msgKD = (json_obj.field_k_d[0].value).toLocaleString();
        }

        if (json_obj.field_kills && json_obj.field_total_games) {
            var KPGScore = Math.round(json_obj.field_kills[0].value/json_obj.field_total_games[0].value);
            msgKPG = KPGScore.toLocaleString();
        }

        if (json_obj.field_score.length > 0 && json_obj.field_total_games.length > 0) {
            var ScorePerGame = Math.round(json_obj.field_score[0].value/json_obj.field_total_games[0].value)
            msgScorePerGame = ScorePerGame.toLocaleString();
        }

        if (json_obj.field_ev_coins.length > 0) {
            msgEvCoins = (json_obj.field_ev_coins[0].value).toLocaleString();
        }

        if (json_obj.field_cp_earned_weekly.length > 0) {
            msgCPWeek = (json_obj.field_cp_earned_weekly[0].value).toLocaleString();
        }

        if (json_obj. field_lifetime_cp_earned.length > 0) {
            msgCPTotal = (json_obj.field_lifetime_cp_earned[0].value).toLocaleString();
        }

        if (json_obj.field_battle_royale_wins_weekly.length > 0) {
            msgBRWeek = (json_obj.field_battle_royale_wins_weekly[0].value).toLocaleString();
        }

        if (json_obj.field_battle_royale_wins.length > 0) {
            msgBRTotal = (json_obj.field_battle_royale_wins[0].value).toLocaleString();
        }

        if (json_obj.field_survival_weekly.length > 0) {
            msgSurviveWeek = json_obj.field_survival_weekly[0].value;
        }

        if (json_obj.field_best_survival_time.length > 0) {
            msgSurviveBest = json_obj.field_best_survival_time[0].value;
        }

        if (json_obj.created.length > 0) {
            var createDate = json_obj.created[0].value;

            createDate = createDate.substring(0,10);
            msgAcctCreated = createDate;
        }

        if (json_obj.changed.length > 0) {
            var changedDate = json_obj.changed[0].value;

            changedDate = changedDate.substring(0,10);
            msgChanged = changedDate;
        }

        if (json_obj.field_earned_as_scholar.length > 0) {
            msgEarnedAsScholar = (json_obj.field_earned_as_scholar[0].value).toLocaleString();
        }

        if (json_obj.field_earned_from_scholars.length > 0) {
            msgEarnedFromScholar = (json_obj.field_earned_from_scholars[0].value).toLocaleString();
        }

        // Get the data of last equipped skins
        if(json_obj.field_eq_skin.length > 0) {
            skinNodes.push(json_obj.field_eq_skin[0].target_id);
        } else {
            skinNodes.push(84);
        }

        if(json_obj.field_auto_rifle_skin.length > 0) {
            skinNodes.push(json_obj.field_auto_rifle_skin[0].target_id);
        } else {
            skinNodes.push(4);
        }

        if(json_obj.field_sword_skin.length > 0) {
            skinNodes.push(json_obj.field_sword_skin[0].target_id);
        } else {
            skinNodes.push(262);
        }

        if(json_obj.field_burst_rifle_skin.length > 0){
            skinNodes.push(json_obj.field_burst_rifle_skin[0].target_id);
        } else {
            skinNodes.push(336);
        }

        if(json_obj.field_hand_cannon_skin.length > 0) {
            skinNodes.push(json_obj.field_hand_cannon_skin[0].target_id);
        } else {
            skinNodes.push (5);
        }

        if(json_obj.field_laser_rifle_skin.length > 0) {
            skinNodes.push(json_obj.field_laser_rifle_skin[0].target_id);
        } else {
            skinNodes.push(9);
        }

        skinNodes.forEach(getSkinData);

        changeUserText();
        changeLastEquipText(skinTitle);
    }

    function changeUserText() {
        userNameTxt.innerText = msgUserName;
        createdTxt.innerText = msgAcctCreated;
        changedTxt.innerText = msgChanged;
        rankTxt.innerText = msgRank;
        totalScoreTxt.innerText = msgScore;
        totalGamesTxt.innerText = msgTotalGames;
        weeklyScoreTxt.innerText = msgWeekScore;
        killsTxt.innerText = msgKills;
        deathsTxt.innerText = msgDeaths;
        kdRatioTxt.innerText = msgKD;
        kpgTxt.innerText =  msgKPG;
        scorePerGameTxt.innerText = msgScorePerGame;
        evCoinsTxt.innerText = msgEvCoins;
        earnedAsScholarTxt.innerText = msgEarnedAsScholar;
        earnedFromScholarTxt.innerText = msgEarnedFromScholar;
        cpWeekTxt.innerText = msgCPWeek;
        cpTotalTxt.innerText = msgCPTotal;
        brWeekTxt.innerText = msgBRWeek;
        brTotalTxt.innerText = msgBRTotal;
        survivalWeekTxt.innerText = msgSurviveWeek;
        survivalBestTxt.innerText = msgSurviveBest;
    }

    function getSkinData(value, index) {
        var Httpreq = new XMLHttpRequest(); // a new request
        var skinUrl = "https://ev.io/node/" + value + "?_format=json";

        Httpreq.open("GET",skinUrl,false);
        Httpreq.send(null);

        var skinObj = JSON.parse(Httpreq.responseText);

        skinTitle[index] = skinObj.title[0].value
    }

    function changeScholarData() {
        msgUser = json_obj[0].field_scholar;
        msgRenting = "";

        json_obj.forEach(item => {
            msgRenting = msgRenting + "Renting " + item.title + "(" + item.field_tier + ")" + " from " + item.field_owner_name + " at " + item.field_scholar_earn_percentage + "%\n"
        });

        changeScholarText();
    }

    function changeScholarText() {
        userRentingDiv.innerText = msgRenting;
    }

    function changeLastEquipText(skinsEquipped) {
        characterSkinTxt.innerText = skinsEquipped[0];
        autoRifleSkinTxt.innerText =  skinsEquipped[1];
        swordSkinTxt.innerText =  skinsEquipped[2];
        burstRifleSkinTxt.innerText =  skinsEquipped[3];
        handCannonSkinTxt.innerText =  skinsEquipped[4];
        laserRifleSkinTxt.innerText =  skinsEquipped[5];
    }

    document.getElementById('getUrlInfo').addEventListener('click', geturlInfo);
    document.getElementById('userIdNumber').addEventListener('keypress', function(e) {
        if (e.key === "Enter") {
        geturlInfo();
        }
    });
}