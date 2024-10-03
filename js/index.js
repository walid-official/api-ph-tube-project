const category = document.getElementById('category');



function setTimeConverter(time){
    // console.log(time);
    let hours = parseInt(time / 3600);
    let seconds = time % 3600;
    let minutes = parseInt(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `Hours ${hours} Minute ${minutes} Seconds ${remainingSeconds} `
}


const removeActiveClass = () => {
    const removeClass = document.getElementsByClassName('category-btn');
    for(const btn of removeClass){
        btn.classList.remove('active')
    }
}





const fetchButtonData = async() => {
    try{
        let response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        let data = await response.json();
        buttons(data);
    }catch(error){
        console.log("The Error Is :" + error);
    }
}

const fetchVideoData = async(searchText = "") => {
    try{
        let response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        let data = await response.json();
        videosCollection(data.videos);
    }catch(error){
        console.log(error);
    }
}

async function loadVideos(id) {
    try{
        let response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        let data = await response.json();
        removeActiveClass()
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active')
        videosCollection(data.category);
    }catch(error){
        console.log(error);
    }
}

async function loadDetails(id) {
    try{
        let response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`);
        let data = await response.json();
        // videosCollection(data.video_id);
        displayDetails(data.video);
    }catch(error){
        console.log(error);
    }
}

function displayDetails(video) {
    // console.log(video.description);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <img class="w-full" src=${video.thumbnail}/>
        <p class="mt-4 font-bold">${video.description}</p>
    `
    document.getElementById("modalBox").click();
}






const videosCollection = (videosInfo) => {
    
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = ""

    if(videosInfo.length == 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
            <div class="mt-10">
                <div class="flex justify-center ">
                    <img src="assets/Icon.png" class=""/>
                </div>
                <h2 class="font-bold font-xl mt-2 text-center">
                NO Content Here In This Category
                </h2>
            </div>
        `
    }else{
        videoContainer.classList.add('grid')
    }


    videosInfo.forEach(singleItem => {
        // console.log(singleItem.video_id);
        let authors = singleItem.authors;

        let profileName = authors.map(item => item.profile_name)
        let profilePicture = authors.map(item => item.profile_picture)

        let div = document.createElement('div');
        div.innerHTML = `
            <div class="relative">
                <div class="w-full box-border">
                    <img src="${singleItem.thumbnail}" class="w-full h-[200px] object-cover" alt="">
                     ${singleItem.others.posted_date?.length == 0 ? "" : `<span class="absolute bottom-2 right-2 text-white">${setTimeConverter(singleItem.others.posted_date)}</span>`}
                    
                </div>
            </div>
            <div class="flex pt-4">
                <div class="">
                    <img src="${profilePicture}" class="w-10 h-10 object-cover rounded-full" alt="">
                </div>
                  <div class="ml-4">
                    <p class="font-bold text-xl">${singleItem.title}</p>
                    <div class="flex">
                         <h2 class="my-2">${profileName}</h2>
                        <div class="w-6 mt-2">
                             
                             ${singleItem.authors[0].verified == true ? '<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-full"/>' : null}
                        </div>
                    </div>
                    <p>${singleItem.others.views}</p>
                    <div>
                        <button onclick="loadDetails('${singleItem.video_id}')" class="btn bg-red-600 mt-3 text-white">Details</button>
                    </div>
                </div>
            </div>
        `
        videoContainer.append(div);
    })
}


const buttons = (buttonsName) => {
    let categoryButton = buttonsName.categories;
    const parentButtons = document.getElementById("category");

    categoryButton.forEach(singleButton => {
        console.log(singleButton.category_id);
        const buttonContainer = document.createElement('div');
        // button.classList.add('btn')
        // button.innerText = `${singleButton.category}`

        buttonContainer.innerHTML = `
            <button id="btn-${singleButton.category_id}" onclick="loadVideos(${singleButton.category_id})" class="btn category-btn">${singleButton.category}</button>
        `
        parentButtons.append(buttonContainer);
    });
}




document.getElementById('search-input').addEventListener('keyup',(event)=> {
    fetchVideoData(event.target.value);
})
fetchButtonData();
fetchVideoData();

























// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }