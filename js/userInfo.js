window.onload = function() {
    var userNumber = document.getElementById('userIdNumber');
    var yourUserUrl = "";
    var yourScholarshipURL = "";
    var json_obj = "";
    var msgUser = "";
    var msgData = "";
    var userNameDiv = document.getElementById('userName');
    var userDataDiv = document.getElementById('userData');
    var userEquipDiv = document.getElementById('lastEquipped');
    var msgRenting = "";
    var userRentingDiv = document.getElementById('userRenting');
    var skinTitle = [];

    geturlInfo();
    
    function geturlInfo(){
        yourUserUrl = "https://ev.io/user/" + userNumber.value + "?_format=json";
        yourScholarshipURL = "https://ev.io/scholar/" + userNumber.value;

        geturl(yourUserUrl);
        getScholarshipUrl(yourScholarshipURL);
    }

    function geturl(yourUrl){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);

        json_obj = JSON.parse(Httpreq.responseText);

        msgUser = "";

        if (Object.keys(json_obj).length > 1) {
            changeUserData();
        } else {
            msgData = "This user does not have any data at this time.";

            changeUserText();
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
        var msgChanged = "";
        var skinNodes = [];
        var msgCharSkin = "";
        var msgSwordSkin = "";
        var msgARSkin = "";

        msgData = "";

        if(json_obj.name.length > 0){
            msgUserName = "User Name: " + json_obj.name[0].value + " (" + json_obj.uid[0].value +  ")\n";
        }

        if(json_obj.field_weekly_score.length > 0){
            msgWeekScore = "Weekly Score: " + json_obj.field_weekly_score[0].value + "\n";
        }
        
        if (json_obj.field_total_games.length > 0) {
            msgTotalGames = "Total Games: " + json_obj.field_total_games[0].value + "\n";
        }

        if (json_obj.field_rank.length > 0) {
            msgRank = "Rank: " + json_obj.field_rank[0].value + "\n";
        }

        if (json_obj.field_score.length > 0) {
            msgScore = "Total Score: " + json_obj.field_score[0].value + "\n";
        }

        if (json_obj.field_kills.length > 0) {
            msgKills = "Kills: " + json_obj.field_kills[0].value + "\n";
        }
        
        if (json_obj.field_deaths.length > 0) {
            msgDeaths = "Deaths: " + json_obj.field_deaths[0].value + "\n";    
        }
        
        if (json_obj.field_k_d.length > 0) {
            msgKD =  "K/D: " + json_obj.field_k_d[0].value + "\n";
        }

        if (json_obj.field_kills && json_obj.field_total_games) {
            var KPGScore = Math.round(json_obj.field_kills[0].value/json_obj.field_total_games[0].value);
            msgKPG = "KPG: " + KPGScore + "\n";
        }

        if (json_obj.field_score.length > 0 && json_obj.field_total_games.length > 0) {
            var ScorePerGame = Math.round(json_obj.field_score[0].value/json_obj.field_total_games[0].value)
            msgScorePerGame = "Score/Game: " + ScorePerGame + "\n";                       
        }
        
        if (json_obj.field_ev_coins.length > 0) {
            msgEvCoins = "ev Coins: " + json_obj.field_ev_coins[0].value + "\n";
        }
        
        if (json_obj.field_cp_earned_weekly.length > 0) {
            msgCPWeek = "CP - Weekly: " + json_obj.field_cp_earned_weekly[0].value + "\n";
        }

        if (json_obj. field_lifetime_cp_earned.length > 0) {
            msgCPTotal = "CP - Total: " + json_obj.field_lifetime_cp_earned[0].value + "\n";
        }

        if (json_obj.field_battle_royale_wins_weekly.length > 0) {
            msgBRWeek = "Battle Royale - Weekly: " + json_obj.field_battle_royale_wins_weekly[0].value + "\n"; 
        }
        
        if (json_obj.field_battle_royale_wins.length > 0) {
            msgBRTotal = "Battle Royale - Total: " + json_obj.field_battle_royale_wins[0].value + "\n";
        }

        if (json_obj.field_survival_weekly.length > 0) {
            msgSurviveWeek = "Survival - Weekly: " + json_obj.field_survival_weekly[0].value + "\n";
        }
        if (json_obj.field_best_survival_time.length > 0) {
            msgSurviveBest = "Survival - Best: " + json_obj.field_best_survival_time[0].value + "\n";
        }

        if (json_obj.created.length > 0) {
            var createDate = json_obj.created[0].value;

            createDate = createDate.substring(0,10);
            msgAcctCreated = "Created: " + createDate + "\n";
        }

        if (json_obj.changed.length > 0) {
            var changedDate = json_obj.changed[0].value;

            changedDate = changedDate.substring(0,10);
            msgChanged = "Changed: " + changedDate + "\n";
        }

        if (json_obj.field_earned_as_scholar.length > 0) {
            msgEarnedAsScholar = "Earned as Scholar: " + json_obj.field_earned_as_scholar[0].value + "\n";
        }

        if (json_obj.field_earned_from_scholars.length > 0) {
            msgEarnedFromScholar = "Earned from Scholar: " + json_obj.field_earned_from_scholars[0].value + "\n";
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

        msgData = msgUserName + msgAcctCreated + msgChanged + msgRank + msgScore + msgTotalGames + msgWeekScore + msgKills + msgDeaths + msgKD + msgKPG + msgScorePerGame + msgEvCoins + msgEarnedAsScholar + msgEarnedFromScholar + msgCPWeek + msgCPTotal + msgBRWeek + msgBRTotal + msgSurviveWeek + msgSurviveBest;

        changeUserText();
        changeLastEquipText(skinTitle);
    }

    function changeUserText() {
        userNameDiv.innerText = msgUser;
        userDataDiv.innerText = msgData;
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
        // Character,AR,SW,BR,HC,LR
        var msgEquipped = "";

        msgEquipped = "Equipped Skins\n" +
        "Character: " + skinsEquipped[0] + "\n" +
        "Auto Rifle: " + skinsEquipped[1] + "\n" +
        "Sword: " + skinsEquipped[2] + "\n" +
        "Burst Rifle: " + skinsEquipped[3] + "\n" +
        "Hand Cannon: " + skinsEquipped[4] + "\n" +
        "Laser Rifle: " + skinsEquipped[5] + "\n";

        userEquipDiv.innerText = msgEquipped;
    }
    
    document.getElementById('getUrlInfo').addEventListener('click', geturlInfo);
    document.getElementById('userIdNumber').addEventListener('keypress', function(e) {
        if (e.key === "Enter") {
            geturlInfo();
        }
    });
}