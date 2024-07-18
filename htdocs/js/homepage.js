window.onload = _ => {
    //Get Leaderboard
    let jsonProm = getTopTen();

    (jsonProm && jsonProm.then(json => {
        response.json().then(json =>  {
            for (var i = 1; i < 11; i++){
                let obj = json[i - 1];

                document.getElementById("leaderUser" + i).innerHTML = obj[0];
                document.getElementById("leaderScore" + i).innerHTML = obj[1];
            }
        })
    }));

    //Fancy Effects
    console.log("window loaded");
    const img1 = document.getElementById("fadeID1");
    const img2 = document.getElementById("fadeID2");
    const img3 = document.getElementById("fadeID3");
    if (img1)
    {
        console.log("img get");
        img1.style.opacity = "1";
        img1.style.marginTop = "0px";
        setTimeout(function(){
            img2.style.opacity = "1";
            img2.style.marginTop = "0px";
        }, 100);
        setTimeout(function(){
            img3.style.opacity = "1";
            img3.style.marginTop = "0px";
        }, 200);
    }

    setTimeout(function(){
        const line1 = document.getElementById("line1");
        line1.style.width= "80%";
    }, 200);
};

async function getTopTen(){
    const website = '../php/';
    
    url = website + `getTopTen.php`;
    console.log("url", url);
    return response = fetch(url);
    if (!response)
    {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
}

