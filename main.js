/* song playlist*/

let playlistsObj = {

	playlist1: [
		{
			name: "Lofi Hip-Hop.m4a",
			path: "Media/Playlist1/Chill Vibes - LoFi-HipHop Beat.m4a"
        },
		{
			name: "Justhea - Chill Vibes.m4a",
			path: "Media/Playlist1/Justhea - Chill Vibes.m4a"
        },
		{
			name: "Chill Out Guitar.m4a",
			path: "Media/Playlist1/Summer Vibes - Chill Out Guitar.m4a"
        }
    ],
	playlist2: [
		{
			name: "Disco Party.m4a",
			path: "Media/Playlist2/Disco Party by MokkaMusic.m4a"
            },
		{
			name: "Rock Sport Energetic.m4a",
			path: "Media/Playlist2/Rock Sport Energetic - Party.m4a"
            }
    ],
	playlist3: [
		{
			name: "UNTIL WE MEET AGAIN by Vyncke.m4a",
			path: "Media/Playlist3/UNTIL WE MEET AGAIN by Arthur Vyncke.m4a"
            }
    ],
	playlist4: [
		{
			name: "Upbeat Funk Podcast by Infraction.m4a",
			path: "Media/Playlist4/Upbeat Funk Podcast by Infraction.m4a"
                }
        ],
	playlist5: [
		{
			name: "DREAMCATCHER by Onycs.m4a",
			path: "Media/Playlist5/DREAMCATCHER by Onycs.m4a"
                    }
            ],
	playlist6: [
		{
			name: "And So It Begins.m4a",
			path: "Media/Playlist6/And So It Begins.m4a"
        }
    ],
	playlist7: [
		{
			name: "Miles Above You.m4a",
			path: "Media/Playlist7/Miles Above You by JessePaulWarren  (Spektrem).m4a"
        }
    ],
	playlist8: [
		{
			name: "Eternal Love by Twisterium.m4a",
			path: "Media/Playlist8/Eternal Love by Twisterium .m4a"
        }
    ],
	playlist9: [
		{
			name: "The Good Times.m4a",
			path: "Media/Playlist9/The Good Times.m4a"
        }
    ],
	playlist10: [
		{
			name: "It's been a while by Broke In Summer.m4a",
			path: "Media/Playlist10/It's been a while by Broke In Summer.m4a"
        }
    ]
};

/*accessing elements*/

let showList = document.querySelector("#showList");

let coverContainer = document.querySelectorAll(".playlist-cover");

let currentPlay = document.querySelector("#songToPlay");

let playPause = document.querySelector(".playPause");


let showListPara = showList.getElementsByTagName('p');

let previous = document.querySelector("#previous");
let next = document.querySelector("#next");


let playerCurrentMusic = document.querySelector("#playerCurrentMusic")


let playerCurrentTime = document.querySelector("#playerCurrentTime")
let playerTotalDuration = document.querySelector("#playerTotalDuration")


function timeFormat(time) {

	if (time >= 60) {
		let timeInSecond = Math.floor(time);
		let minute = Math.floor(timeInSecond / 60)
		let second = timeInSecond % 60

		if (second < 10) {
			second = `0${second}`
		}

		return `0${minute}:${second}`;

	} else if (time < 60) {
		let timeInSecond = Math.floor(time);
		if (timeInSecond < 10) {
			timeInSecond = `0${timeInSecond}`;
		}
		return `00:${timeInSecond}`;
	}

}


currentPlay.addEventListener("loadedmetadata", () => {
	playerTotalDuration.textContent = timeFormat(currentPlay.duration);
	//console.log(currentPlay.duration);
	//console.log("hay");
});

///////////


try {
	let progressBar = document.querySelector("#progressBar");
	let progressed = document.querySelector("#progressed");


	let isDragging = false;

	currentPlay.addEventListener("timeupdate", (e) => {
		progressed.style.width = (currentPlay.currentTime * 100 / currentPlay.duration) + "%";

		playerCurrentTime.textContent = timeFormat(currentPlay.currentTime);
		console.log("hy")
		console.log(currentPlay.currentTime)
	});

	progressBar.addEventListener("mousedown", (e) => {
		isDragging = true;
		updateProgressBar(e);
	});

	progressBar.addEventListener("mousemove", (e) => {
		if (isDragging) {
			updateProgressBar(e);
		}
	});

	progressBar.addEventListener("mouseup", (e) => {
		if (isDragging) {
			updateProgressBar(e);
			isDragging = false;
		}
	});

	progressBar.addEventListener("mouseleave", (e) => {
		if (isDragging) {
			updateProgressBar(e);
			isDragging = false;
		}
	});

	function updateProgressBar(e) {
		let rect = progressBar.getBoundingClientRect();
		let offsetX = e.clientX - rect.left;
		let width = rect.width;

		let newPosition = offsetX /
			width;
		//console.log(newPosition)
		let newTime = newPosition * currentPlay.duration;

		currentPlay.currentTime = newTime;


	}

	progressBar.addEventListener("touchstart", (e) => {
		isDragging = true;
		updateProgressBar(e.touches[0]);
		/*  This is done because touch events can involve multiple fingers touching the screen simultaneously, and [0] allows us to focus on the details of the first touch point. */
	});

	progressBar.addEventListener("touchmove", (e) => {
		if (isDragging) {
			updateProgressBar(e.touches[0]);
		}

	});

	progressBar.addEventListener("touchend", (e) => {
		if (isDragging) {
			updateProgressBar(e.changedTouches[0]);
			isDragging = false;
		}

	});
} catch (e) {
	console.log(e)
}

/*volume bar*/

try {
	let volumeBar = document.querySelector("#volumeBar");

	let progressedVol = document.querySelector("#progressedVol");


	let isDraggingVol = false;

	volumeBar.addEventListener("mousedown", (e) => {
		isDraggingVol = true;
		updateVolumeBar(e);
	});

	volumeBar.addEventListener("mousemove", (e) => {
		if (isDraggingVol) {
			updateVolumeBar(e);
		}
	});

	volumeBar.addEventListener("mouseup", (e) => {
		if (isDraggingVol) {
			updateVolumeBar(e);
			isDraggingVol = false;
		}
	});

	volumeBar.addEventListener("mouseleave", (e) => {
		if (isDraggingVol) {
			updateVolumeBar(e);
			isDraggingVol = false;
		}
	});

	function updateVolumeBar(e) {

		/*	let offsetX = e.offsetX;
			console.log(offsetX)

			let offsetWidth= e.target.offsetWidth;
			console.log(e.target.offsetWidth)
			
			
			progressedVol.style.width = Math.floor(offsetX*100/offsetWidth) + "%";
			
			currentPlay.volume=Math.floor(((offsetX/offsetWidth)*100))/100;
			console.log(Math.floor(((offsetX/offsetWidth)*100))/100)*/

		let rectVol = volumeBar.getBoundingClientRect();


		let offsetXVol = e.clientX - rectVol.left;
		//console.log(offsetXVol)

		let widthVol = rectVol.width;
		//console.log(widthVol)

		let newPositionVol = (offsetXVol / widthVol);
		//console.log(newPositionVol)

		// func. for 0-1 range
		function clamp(value, min, max) {
			return Math.min(Math.max(value, min), max);

		};

		newPositionVol = clamp(newPositionVol, 0, 1);




		/* function roundInRange(number, min, max) {
		 return Math.round(clamp(number, min, max));
		 	}*/



		progressedVol.style.width = Math.floor((newPositionVol) * 100) + "%";
		//console.log(newPositionVol*100)


		currentPlay.volume = Math.floor((newPositionVol) * 100) / 100;

		//console.log(Math.floor(((offsetXVol/widthVol)*100))/100);




	}

	volumeBar.addEventListener("touchstart", (e) => {
		isDraggingVol = true;
		updateVolumeBar(e.touches[0]);
		/*  This is done because touch events can involve multiple fingers touching the screen simultaneously, and [0] allows us to focus on the details of the first touch point. */
	});

	volumeBar.addEventListener("touchmove", (e) => {
		if (isDraggingVol) {
			updateVolumeBar(e.touches[0]);
		}

	});

	volumeBar.addEventListener("touchend", (e) => {
		if (isDraggingVol) {
			updateVolumeBar(e.changedTouches[0]);
			isDraggingVol = false;
		}

	});
} catch (e) {
	console.log(e)
}


/*show list of songs*/

/*let showList = document.querySelector("#showList");

let coverContainer=document.querySelectorAll(".playlist-cover");*/

coverContainer.forEach((image) =>
{
	image.addEventListener("click", (event) => {

		/*to remove early list names*/
		while (showList.firstChild) {
			showList.removeChild(showList.firstChild);
		}


		let playlistName = event.target.dataset.playlist;

		//adding new data attribute to showlist of current playlist name and reset audio tag src and playPause element reset//

		showList.dataset.showListName = playlistName;

		currentPlay.src = (playlistsObj[playlistName][0]).path
		currentPlay.dataset.song = (playlistsObj[playlistName][0]).name
		playerCurrentMusic.textContent = currentPlay.dataset.song;




		playPause.innerHTML = 'play_arrow'

		/////////

		let songArr = playlistsObj[playlistName];

		songArr.forEach((songObj, index) => {



			let element = document.createElement('p');

			element.src = songArr[index].path;
			element.dataset.songName = songArr[index].name;
			let songName = songArr[index].name;
			element.textContent = songArr[index].name


			showList.append(element);



		});

	})
})


/*handling song list click*/


//console.log(showListPara[0])

//console.log(showListPara.length)


document.addEventListener("click", function(event) {
	if (event.target.tagName === 'P' && event.target.parentNode.id === 'showList') {
		//console.log("Clicked on paragraph:", event.target.textContent);
		//console.log("Clicked on paragraph:", event.target.src);
		currentPlay.src = event.target.src
		currentPlay.dataset.song = event.target.dataset.songName;
		playerCurrentMusic.textContent = currentPlay.dataset.song;

		// function timeFormat(time) {
		// 	let timeInSecond = Math.floor(time);
		// 	let minute = Math.floor(timeInSecond / 60)
		// 	let second = timeInSecond % 60

		// 	if(second<10){
		// 		second = `0${second}`
		// 	}

		// 	return `0${minute}:${second}`
		// }


		currentPlay.play();

		playPause.innerHTML = 'pause'

	}
});


/* previous & next play*/

/*let previous = document.querySelector("#previous");
let next = document.querySelector("#next");*/


previous.addEventListener("click", (e) => {

	let showListNameCont = showList.dataset.showListName
	//console.log(showList.dataset.showListName

	let songObjArr = playlistsObj[showListNameCont];
	//console.log(songObjArr[0])


	/*getting decoded src currently playing song by URL obj. */

	let currentPlaySRC = new URL(currentPlay.src).pathname
	let currentPlayDSRC = decodeURIComponent(currentPlaySRC)
	//console.log(currentPlayDSRC)


	//console.log((songObjArr[songObjArr.length - 1]).path)



	if (currentPlayDSRC === songObjArr[0].path) {

		currentPlay.src = (songObjArr[songObjArr.length - 1]).path
		currentPlay.dataset.song = (songObjArr[songObjArr.length - 1]).name
		playerCurrentMusic.textContent = currentPlay.dataset.song;

		/* ,songObjArr([songObjArr.length - 1]).path, in the place of ,(songObjArr[songObjArr.length - 1]).path, will not work so right way of using brackets are very imp here in above line of code*/

		//console.log(songObjArr[0].path)
	} else {

		let currentIndex = songObjArr.indexOf(songObjArr.find(obj => obj.path === currentPlayDSRC))

		currentPlay.src = (songObjArr[currentIndex - 1]).path
		currentPlay.dataset.song = (songObjArr[currentIndex - 1]).name
		playerCurrentMusic.textContent = currentPlay.dataset.song;



	}


	currentPlay.play()
	playPause.innerHTML = 'pause'



});



next.addEventListener("click", (e) => {

	let showListNameCont = showList.dataset.showListName
	//console.log(showList.dataset.showListName

	let songObjArr = playlistsObj[showListNameCont];
	//console.log(songObjArr[0])


	/*getting decoded src currently playing song by URL obj. */

	let currentPlaySRC = new URL(currentPlay.src).pathname
	let currentPlayDSRC = decodeURIComponent(currentPlaySRC)
	//console.log(currentPlayDSRC)


	//console.log((songObjArr[songObjArr.length - 1]).path)



	if (currentPlayDSRC === (songObjArr[songObjArr.length - 1]).path) {

		currentPlay.src = (songObjArr[0]).path
		currentPlay.dataset.song = (songObjArr[0]).name
		playerCurrentMusic.textContent = currentPlay.dataset.song;

		/* ,songObjArr([songObjArr.length - 1]).path, in the place of ,(songObjArr[songObjArr.length - 1]).path, will not work so right way of using brackets are very imp here in above line of code*/

		//console.log(songObjArr[0].path)
	} else {

		let currentIndex = songObjArr.indexOf(songObjArr.find(obj => obj.path === currentPlayDSRC))

		currentPlay.src = (songObjArr[currentIndex + 1]).path
		currentPlay.dataset.song = (songObjArr[currentIndex + 1]).name
		playerCurrentMusic.textContent = currentPlay.dataset.song;

	}


	currentPlay.play()
	playPause.innerHTML = 'pause'


});


/*play pause logic*/

//element has accesed on upperside 

playPause.addEventListener("click", (e) => {

	if (currentPlay.paused) {
		playPause.innerHTML = 'pause'
		playerCurrentMusic.textContent = currentPlay.dataset.song;

		currentPlay.play()
	} else {
		playPause.innerHTML = 'play_arrow'
		playerCurrentMusic.textContent = currentPlay.dataset.song;

		currentPlay.pause()
	}

})


/*play next songs on audio end event*/

currentPlay.addEventListener("ended", (e) => {

	let showListNameCont = showList.dataset.showListName

	let songObjArr = playlistsObj[showListNameCont];


	/*getting decoded src currently playing song by URL obj. */

	let currentPlaySRC = new URL(currentPlay.src).pathname
	let currentPlayDSRC = decodeURIComponent(currentPlaySRC)


	if (currentPlayDSRC === (songObjArr[songObjArr.length - 1]).path) {

		currentPlay.src = (songObjArr[0]).path
		currentPlay.dataset.song = (songObjArr[0]).name
		playerCurrentMusic.textContent = currentPlay.dataset.song;

		/* ,songObjArr([songObjArr.length - 1]).path, in the place of ,(songObjArr[songObjArr.length - 1]).path, will not work so right way of using brackets are very imp here in above line of code*/

		//console.log(songObjArr[0].path)
	} else {

		let currentIndex = songObjArr.indexOf(songObjArr.find(obj => obj.path === currentPlayDSRC))

		currentPlay.src = (songObjArr[currentIndex + 1]).path
		currentPlay.dataset.song = (songObjArr[currentIndex + 1]).name
		playerCurrentMusic.textContent = currentPlay.dataset.song;

	};


	currentPlay.play()
	playPause.innerHTML = 'pause'

})



//////////



/*******only click event not swipe in music bar*****

let progressBar = document.querySelector("#progressBar");
let progressed = document.querySelector("#progressed");




currentPlay.addEventListener("timeupdate",(e)=>{
		progressed.style.width = (currentPlay.currentTime *100 / currentPlay.duration)+"%" 
	});
	
	progressBar.addEventListener("click", (e) => {
	currentPlay.currentTime= (e.offsetX/progressBar.offsetWidth)*currentPlay.duration
	});  
	/////////////////////////////////
	*/
