const category = document.getElementById('category');

const FetchData = async() => {
    // fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // .then(response => response.json())
    // .then(data => buttons(data))

    try{
        let response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        let data = await response.json();
        buttons(data);
    }catch(error){
        console.log("The Error Is :" + error);
    }
}


// const buttons = (buttonsName) => {
//     let categoryButton = buttonsName.categories;
//     console.log(categoryButton[0].category);
//     const parentButtons = document.getElementById("category");

//     parentButtons.innerHTML = `
//                 <div class="flex gap-4 justify-center my-8">
//                 <button class="btn">${categoryButton[0].category}</button>
//                 <button class="btn">${categoryButton[1].category}</button>
//                 <button class="btn">${categoryButton[2].category}</button>
//             </div>
//         `
// }

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

FetchData();