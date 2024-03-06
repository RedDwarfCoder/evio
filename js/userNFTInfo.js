window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryUser = urlParams.get("userIdName");
    var userNumber = document.getElementById('userIdNumber');
    var userNameTxt = document.getElementById('userName');
    var userNFTTotalTxt = document.getElementById('nfts');
    var userNFTsOwnedTxt = document.getElementById('nftsOwned');
    var msgUserName = "";    
    var userDataJsonObj = "";
    var userNFTJsonObj = "";
    var nftsOwned = [];
    var validUser = false;

    geturlInfo();

    function geturlInfo(){
        userNumber = document.getElementById('userIdNumber');
        msgUserName = "";    
        userNameTxt = document.getElementById('userName');
        userDataJsonObj = "";
        userNFTJsonObj = "";

        userNameTxt.innerText = "";
        validUser = false;

        if (queryUser != null && (userNumber.value == null || userNumber.value == "")) {
            userNumber.value = queryUser;
        }

        if (userNumber.value == null || userNumber.value == "") {
            userNumber.value = 0;
            userNumber.innerText = 0;
        }

        yourUserUrl = "https://ev.io/user/" + userNumber.value + "?_format=json";

        geturl(yourUserUrl);

        if(validUser) {
            getNFTInfo()
        }
    }

    function geturl(yourUrl){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);

        userDataJsonObj = JSON.parse(Httpreq.responseText);

        msgUserName = "";

        if (Object.keys(userDataJsonObj).length > 1) {
            validUser = true;
            changeUserData();
        } else {
            msgUserName = "Invalid User";
            totalNFTs = 0;
            totalNFTsRented = 0;
            msgNFTsOwned = "";
            userNameTxt.innerText = msgUserName;

            userNFTTotalTxt.innerText = "They own " + totalNFTs + " NFTs";
            userNFTsOwnedTxt.innerText = msgNFTsOwned;
        }
    }

    function changeUserData() {
        if(userDataJsonObj.name.length > 0){
            msgUserName = userDataJsonObj.name[0].value + " (" + userDataJsonObj.uid[0].value +  ")";
        }

        userNameTxt.innerText = msgUserName;
    }

    function getNFTInfo() {
        var NFTUrl = "https://ev.io/flags/" + userNumber.value;
        var totalNFTs = 0;
        var totalNFTsRented = 0;
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
        } else {
            userNFTTotalTxt.innerText = "They own " + totalNFTs + " NFTs";
            userNFTsOwnedTxt.innerText = msgNFTsOwned;
        }

        userNFTTotalTxt.innerText = "They own " + totalNFTs + " NFTs (" + totalNFTsRented + " rented).";

        if(nftsOwned.length > 0) {
            // Sort array if more than 1
            if(nftsOwned.length > 1) {
                // first by name
                nftsOwned = nftsOwned.sort(function(a,b) {
                    return a[0].charCodeAt(0) - b[0].charCodeAt(0);
                });
                // then by tier Rank
                nftsOwned = nftsOwned.sort(function(a,b) {
                    return a[2] - b[2];
                });
            }

            nftsOwned.forEach(element => {
                if(element[3] === ""){
                    msgNFTsOwned = msgNFTsOwned + "<div class='row'><span>" + element[0] + "</span><span>(" + element[1] + ")</span></div>";
                } else {
                    msgNFTsOwned = msgNFTsOwned + "<div class='row rented' title ='" + element[3] + " | " + element[4] +"'><span>" + element[0] + "</span><span>(" + element[1] + ")</span></div>";
                }
            });
        }

        userNFTsOwnedTxt.innerHTML = msgNFTsOwned;

    }

    function getTierValue(nftData) {

        nftData = nftData.replace(/['"\]\[\{]+/g, '');

        nftData = nftData.split('}, ');

        nftData = nftData[1];

        nftData = nftData.split(",");

        nftData = nftData[0].replace('value: ','');

        return nftData;
    }

    document.getElementById('getUrlInfo').addEventListener('click', geturlInfo);
    document.getElementById('userIdNumber').addEventListener('keypress', function(e) {
        if (e.key === "Enter") {
        geturlInfo();
        }
    });
}