let btnImg = document.querySelector("#playImage");
let arijitBox = document.querySelector("#arijit");
let playPause = document.querySelector("#playpause");
let logo = document.querySelector("#logo");
let search = document.querySelector("#search");

let songs = [];


//songs are stored in a array called songs[]
let getSongs = async (link)=>{
    let re = await fetch(link);
    let res = await re.text();
    let div = document.createElement("div");
    div.innerHTML = res;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for(let i = 0;i<as.length;i++){
        if(as[i].href.endsWith(".mp3")){
            songs.push(as[i].href);
        }
    }
    console.log(songs);
    return songs;
}

getSongs("http://127.0.0.1:5500/media/Music/singerWise/Arijit/");