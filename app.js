

const sart_songs = async ()=>{
     let songs = await fetch("http://127.0.0.1:5500/songs/");
let response = await songs.text();

let div = document.createElement("div");
div.innerHTML = response;
let as= div.getElementsByTagName("a")
let songs_play = [];

for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
        songs_play.push(element.href)
        
    }

}
return songs_play
}

main_fun = async ()=>{
    let songs_play = await sart_songs();
    console.log(songs_play);

    const playbtn = document.getElementById("playbtn")

    playbtn.addEventListener("click",()=>{
        var audio = new Audio(songs_play[0])
        audio.addEventListener("canplay",function(){
            audio.play();
        });
        audio.play();
    })
};

main_fun();