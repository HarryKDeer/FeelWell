window.onload = _ => {
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