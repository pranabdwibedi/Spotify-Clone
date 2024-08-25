let btnImg = document.querySelector("#playImage");
let arijitBox = document.querySelector("#arijit");
let playPause = document.querySelector("#playpause");
let AllSongcards = document.querySelector(".songsList");
let songInfo = document.querySelector(".songInfo");
let playerImage = document.querySelector("#playerImage");
let preButton = document.querySelector("#preButton");
let nextButton = document.querySelector("#nextButton")
let pritam = document.querySelector("#pritamCard");
let arijit = document.querySelector("#arijitCard");
let rehman = document.querySelector("#rehmanCard");
let kk = document.querySelector("#kkCard");
let vishal = document.querySelector("#vishalCard");
let sidhu = document.querySelector("#sidhuCard");
let punjabi = document.querySelector("#punjabi");
let party = document.querySelector("#party");
let happy = document.querySelector("#happy");
let dance = document.querySelector("#dance")
let perfect = document.querySelector("#perfect");
let currTime = document.querySelector("#currTime");
let progressBar = document.querySelector("#progrssBar");
let totalTime = document.querySelector("#totalTime");




let songsList = [];
let songNo = 0;
let isPlaying = false;
let time = null;
let currentTime = 0;
let currentAudio = null;
let songDetails = document.createElement("span");

//songs are stored in a array called songs[]
let getSongs = async (link)=>{
    let re = await fetch(link);
    let res = await re.text();
    let div = document.createElement("div");
    div.innerHTML = res;
    let songs = [];
    let as = div.getElementsByTagName("a");
    for(let i = 0;i<as.length;i++){
        if(as[i].href.endsWith(".mp3")){
            songs.push(as[i].href);
        }
    }
    return songs;
}



let nextPlay = ()=>{
        if(currentAudio === null){
            return;
        }
        if(songNo === songsList.length-1){
            songNo = 0;
            playSong(songsList[songNo]);
            return;
        }
        playSong(songsList[++songNo]);
}




//function to calculate the name of the song
setSongName = (str) =>{
    str = str.substring(str.lastIndexOf("/")+1,str.length-4);
    return str;
}
let allSongList = async () =>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/All/");
    for(let i = 0;i<songsList.length;i++){
        let card = document.createElement("div");
        let cardImage = document.createElement("img");
        let cardDetails = document.createElement("span");
        card.appendChild(cardImage);
        card.appendChild(cardDetails);
        card.setAttribute("class", "playCards");
        cardImage.setAttribute("src","/Media/logos/music.svg");
        cardImage.setAttribute("class","cardImage");
        cardDetails.setAttribute("class","SongInfo");
        cardDetails.innerText = setSongName(songsList[i].replace(new RegExp("%20", "g")," "));
        AllSongcards.appendChild(card);
        card.addEventListener("click",async ()=>{
            songsList = await getSongs("http://127.0.0.1:5500/media/Music/All/");
            playSong(songsList[i]);
            songNo = i;
        });
    }
}
allSongList();




punjabi.addEventListener("click",async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/MoodWise/punjabi/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
party.addEventListener("click",async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/MoodWise/party/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
happy.addEventListener("click",async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/MoodWise/happyHits/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
dance.addEventListener("click",async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/MoodWise/Dance/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
perfect.addEventListener("click",async()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/MoodWise/perfectDay/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})





pritam.addEventListener("click", async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/singerWise/pritam/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
arijit.addEventListener("click", async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/singerWise/Arijit/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
rehman.addEventListener("click", async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/singerWise/Rehman/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
kk.addEventListener("click", async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/singerWise/kk/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
vishal.addEventListener("click", async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/singerWise/Vishal/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})
sidhu.addEventListener("click", async ()=>{
    songsList = await getSongs("http://127.0.0.1:5500/media/Music/singerWise/sidhu/");
    songNo = 0;
    console.log(songsList);
    playSong(songsList[songNo]);
})






let playSong = (link) =>{
    if(isPlaying){
        currentAudio.pause();
        isPlaying = false;
        songDetails.innerText = "";
    }
    currentAudio = new Audio(link);
    currentAudio.addEventListener("timeupdate",()=>{
        currTime.innerText = `${parseInt((currentAudio.currentTime)/60)} : ${parseInt(currentAudio.currentTime%60)}`;
        totalTime.innerText = `${parseInt((currentAudio.duration)/60)} : ${parseInt(currentAudio.duration%60)}`;
        progressBar.setAttribute("max",currentAudio.duration);
        progressBar.setAttribute("value",currentAudio.currentTime);
        progressBar.innerText = `${(currentAudio.currentTime/currentAudio.duration)*100}`;

    })
    currentAudio.play();
    isPlaying = true;
    setSongDetail(link);
    btnImg.setAttribute("src","/Media/logos/pauseSong.svg");
    currentAudio.addEventListener("ended",()=>{
        console.log("song Ended");
        nextPlay();
    });
}



//to show the song details in the player
let setSongDetail = (link) =>{
    playerImage.style.visibility = "visible";
    console.log(link)
    songDetails.innerText = setSongName(link.replace(new RegExp("%20", "g")," "));;
    songDetails.style.overflow = "hidden";
    songInfo.appendChild(songDetails);
}





//added functionality to the play pause button
playPause.addEventListener("click",()=>{
    if(isPlaying){
        currentAudio.pause();
        isPlaying = false;
        time = currentAudio.currentTime;
        btnImg.setAttribute("src","/Media/logos/play.svg");
    }
    else{
        btnImg.setAttribute("src","/Media/logos/pauseSong.svg");
        if(currentAudio === null){
            // currentAudio = new Audio(songsList[songNo]);
            // setSongDetail(songsList[songNo]);
            // currentAudio.play();
            playSong(songsList[songNo]);
            // isPlaying = true;
            return;
        }
        currentAudio.currentTime = time;
        currentAudio.play();
        isPlaying = true;
    }
})



//added functionality to the previous song button
preButton.addEventListener("click",()=>{
    if(currentAudio === null || songNo === 0){
        return;
    }
    playSong(songsList[--songNo]);
})





nextButton.addEventListener("click",()=>{
    nextPlay();
})