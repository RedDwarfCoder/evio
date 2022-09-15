window.onload = function() {
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
                    totalNFTs = totalNFTs + 1;
                    nftsOwned.push(element.field_skin);
                }
            });
        } else {
            userNFTTotalTxt.innerText = "They own " + totalNFTs + " NFTs";
            userNFTsOwnedTxt.innerText = msgNFTsOwned;
        }

        userNFTTotalTxt.innerText = "They own " + totalNFTs + " NFTs";

        if(nftsOwned.length > 0) {
            nftsOwned.forEach(element => {
                msgNFTsOwned = msgNFTsOwned + element + ", ";
            });
        }

        userNFTsOwnedTxt.innerText = msgNFTsOwned;

    }

    document.getElementById('getUrlInfo').addEventListener('click', geturlInfo);
    document.getElementById('userIdNumber').addEventListener('keypress', function(e) {
        if (e.key === "Enter") {
        geturlInfo();
        }
    });
}