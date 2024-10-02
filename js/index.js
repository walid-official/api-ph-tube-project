const category = document.getElementById('category');

const fetchButtonData = async() => {
    try{
        let response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        let data = await response.json();
        buttons(data);
    }catch(error){
        console.log("The Error Is :" + error);
    }
}

const fetchVideoData = async() => {
    try{
        let response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        let data = await response.json();
        videosCollection(data);
    }catch(error){
        console.log(error);
    }
}

const videosCollection = (videosInfo) => {
    const videoContent = videosInfo.videos;
    const videoContainer = document.getElementById('videos');
    videoContent.forEach(singleItem => {
        console.log(singleItem);
        let authors = singleItem.authors;

        let profileName = authors.map(item => item.profile_name)
        let profilePicture = authors.map(item => item.profile_picture)

        let div = document.createElement('div');
        div.innerHTML = `
            <div>
             <div class="w-full box-border">
                 <img src="${singleItem.thumbnail}" class="w-full h-[200px] object-cover" alt="">
             </div>
            </div>
            <div class="flex">
                <div class="">
                    <img src="${profilePicture}" class="w-10 h-10 object-cover rounded-full" alt="">
                </div>
                
                <p>${singleItem.title}</p>
            </div>
             <div>
                <h2>${profileName}</h2>
            </div>
            <div>
                <p>${singleItem.others.views}</p>
            </div>
        `
        videoContainer.append(div);
    })
}


const buttons = (buttonsName) => {
    let categoryButton = buttonsName.categories;
    const parentButtons = document.getElementById("category");

    categoryButton.forEach(singleButton => {
        console.log(singleButton.category);
        const button = document.createElement('button');
        button.classList.add('btn')
        button.innerText = `${singleButton.category}`
        parentButtons.append(button);
    });
}

fetchButtonData();
fetchVideoData();