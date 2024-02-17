

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


main_fun = async () => {
    let songs_play = await sart_songs();
    console.log(songs_play);

    let currentSongIndex = 0;
    let audio;

    const playbtn = document.querySelectorAll(".playbtn");
    playbtn.forEach(playbtn => {
        playbtn.addEventListener("click", () => {
            if (audio && !audio.paused) {
                // If audio is playing, pause it
                audio.pause();
            } else {
                // If audio is paused or not started, play the current song
                audio = new Audio(songs_play[currentSongIndex]);
                audio.play();
            }
        });
     
    });
   
    const nextbtn = document.getElementById("nextbtn");
    nextbtn.addEventListener("click", () => {
        if (audio) {
            // Stop the current audio
            audio.pause();
            audio.currentTime = 2;
        }

        // Increment the index to play the next song
        currentSongIndex = (currentSongIndex + 1) % songs_play.length;

        // Play the new song if there is one
        if (songs_play.length > 0) {
            audio = new Audio(songs_play[currentSongIndex]);
            audio.play();
        }
    });


    const prevesbtn = document.getElementById("prevesbtn")
    prevesbtn.addEventListener("click",()=>{
        if (audio) {
            audio.pause();
            audio.currentTime = 0 ;
        }
        currentSongIndex  = (currentSongIndex - 1 +songs_play.length)% songs_play.length;

            audio.src = songs_play[currentSongIndex];
            audio.play();
        }
    )


    audio.addEventListener("ended", () => {
        audio.play();
    });
};

main_fun();


//     let playbtn  =document.getElementById("playbtn");
// changebtn = ()=>{
//     playbtn.addEventListener("click",()=>{
//         if (playbtn.style.display==="none") {
//             playbtn.style.display = "block"
//             playbtn.querySelector("img").src = "./Assests/pause.svg"
//         }else{
//             playbtn.style.display = "none"
//             playbtn.querySelector("img").src = "./Assests/play.svg"
//             playbtn.style.display = "block"
//         }
//     })
// }

// changebtn();