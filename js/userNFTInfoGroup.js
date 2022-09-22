window.onload = function() {
    var userNumberArrayTxt = document.getElementById('userIdNumbers');
    var userNumberArray = [];
    var userNFTNameList = [];
    var userNFTTotalList = [];
    var userNFTTotalTxt = document.getElementById('nfts');
    var userNFTsOwnedTxt = document.getElementById('nftsOwned');
    var msgUserName = "";    
    var userDataJsonObj = "";
    var userNFTJsonObj = "";
    var nftsOwned = [];
    var validUser = false;
    var totalNFTs = 0;
    var totalNFTsRented = 0;
    var grandTotalNFTs = 0;
    var grandTotalNFTsRented = 0;
    var allNFTDataToPush = [];

    geturlInfo();

    function geturlInfo() {
        userNumberArrayTxt = document.getElementById('userIdNumbers');
        userNumberArray = [];
        userNFTNameList = [];
        msgUserName = "";
        grandTotalNFTs = 0;
        grandTotalNFTsRented = 0;
        userDataJsonObj = "";
        userNFTJsonObj = "";
        userNFTTotalList = [];
        validUser = false;

        userNumberArray = userNumberArrayTxt.value.split(",");

        if (userNumberArray.value == null || userNumberArray.value == "") {
            userNumberArray.value = 0;
            userNumberArray.value.innerText = 0;
        }

        if(userNumberArray.length > 0) {
            userNumberArray.forEach(element => {
                validUser = false;

                yourUserUrl = "https://ev.io/user/" + element + "?_format=json";

                geturl(yourUserUrl);

                if(validUser) {
                    getNFTInfo(element)
                }
            });
        }

        updateList();
    }

    function geturl(yourUrl){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);
        
        validUser = false;

        userDataJsonObj = JSON.parse(Httpreq.responseText);
        msgUserName = "";
        
        if (Object.keys(userDataJsonObj).length > 1) {
            validUser = true;
            userNFTNameList.push(userDataJsonObj.name[0].value);
        }
    }

    function changeUserData() {
        if(userDataJsonObj.name.length > 0){
            msgUserName = userDataJsonObj.name[0].value + " (" + userDataJsonObj.uid[0].value +  ")";
        }
    }

    function getNFTInfo(userId) {
        var NFTUrl = "https://ev.io/flags/" + userId;
        var totalNFTs = 0;
        var msgNFTsOwned = "";
        
        userNFTTotalTxt.innerText = "";
        nftsOwned = [];

        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",NFTUrl,false);
        Httpreq.send(null);

        userNFTJsonObj = JSON.parse(Httpreq.responseText);

        if (userNFTJsonObj.length > 0) {
            userNFTJsonObj.forEach(element => {
                if (element.field_flag_nft_address !== false) {
                    var tierValue = "";
                    var tierRank = "";
                    var dataToPush = [];
                    var scholar = "";
                    var scholarEarn = "";

                    totalNFTs = totalNFTs + 1;
                    tierValue =  getTierValue(element.field_meta[0]);

                    switch(tierValue) {
                        case "Legendary":
                            tierRank = 1;
                            break;
                        case "Epic":
                            tierRank = 2;
                            break;
                        case "Rare":
                            tierRank = 3;
                            break;
                        case "Common":
                            tierRank = 4;
                            break;
                    }

                    if (element.field_scholar !== "") {
                        totalNFTsRented = totalNFTsRented + 1;
                        grandTotalNFTsRented = grandTotalNFTsRented + 1;
                        scholar = element.field_scholar;
                        scholarEarn = element.field_scholar_earn_percentage;
                    }

                    dataToPush[0] = element.field_skin;
                    dataToPush[1] = tierValue;
                    dataToPush[2] = tierRank;
                    dataToPush[3] = scholar;
                    dataToPush[4] = scholarEarn;

                    nftsOwned.push(dataToPush);
                }
            });
        }
                   
        userNFTTotalList.push(totalNFTs);

        grandTotalNFTs = grandTotalNFTs + totalNFTs;

        userNFTTotalTxt.innerText = "They own " + grandTotalNFTs + " NFTs (" + grandTotalNFTsRented + " rented).";
    }

    function getTierValue(nftData) {

        nftData = nftData.replace(/['"\]\[\{]+/g, '');

        nftData = nftData.split('}, ');

        nftData = nftData[1];

        nftData = nftData.split(",");

        nftData = nftData[0].replace('value: ','');

        return nftData;
    }

    function updateList() {
        var userListMsg = "";
        var theIndex = 0;

        userNFTNameList.forEach(element => {
            userListMsg = userListMsg + "<div class='row'><span>" + element + "</span><span>" + userNFTTotalList[theIndex] + "</span></div>";

            theIndex = theIndex + 1;
        });

        userNFTsOwnedTxt.innerHTML = userListMsg;
    }

    document.getElementById('getUrlInfo').addEventListener('click', geturlInfo);
    document.getElementById('userIdNumbers').addEventListener('keypress', function(e) {
        if (e.key === "Enter") {
        geturlInfo();
        }
    });
}