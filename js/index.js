// Load Videos Catagories from API
const handleLoadCatagories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await response.json()
    const videosCatagories = data.data
    // console.log(videosCatagories);
    displayVideosCatagories(videosCatagories)
}

// Display Videos Catagories from API
const displayVideosCatagories = (videosCatagories) => {
    const categoriesContainer = document.getElementById('catagories-container')
    videosCatagories.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add("text-black", "font-semibold", "rounded-sm", "hover:bg-gray-200");
        categoryDiv.innerHTML = `
        <a onclick ="handleLoadVideosCards('${category.category_id}')" class="tab text-black font-semibold bg-gray-300 rounded hover:bg-gray-200"> ${category.category} </a>
        `
        categoriesContainer.appendChild(categoryDiv)
    });

}


// Load Videos Cards from API using ID's
let sortButton;
const handleLoadVideosCards = async (videosId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${videosId}`)
    const data = await response.json()
    sortButton = data.data
    // console.log(videosCards);
    handleDisplayVideosCards(sortButton)
}


// Handle Display Videos Cards from API Using ID's
const handleDisplayVideosCards = (videosCards) => {
    // console.log(videosCards);
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.textContent = ''

    const emptyContainer = document.getElementById('empty-container')
    emptyContainer.textContent = ''

    if (videosCards.length === 0) {
        const emptyDiv = document.createElement('div')
        emptyDiv.classList = `flex justify-center items-center flex-col`
        emptyDiv.innerHTML = `
        <img class="w-40 mt-12" src="./images/Icon.png" alt="alternative-text">
        <h2 class="text-2xl font-medium mt-3"> Oops!! Sorry, There is no content here </h2>
        `
        emptyContainer.appendChild(emptyDiv)
    }

    videosCards.forEach(cards => {
        const { thumbnail, title, authors, others } = cards;
        let hrs;
        let min;
        if (others.posted_date) {
            // console.log('On posted Data');
            hrs = Math.floor(others.posted_date / 360)
            min = Math.floor((others.posted_date % 360) / 60)
        } else {

        }
        // console.log(hrs, min);
        const cardDiv = document.createElement('div')
        cardDiv.classList = `card bg-base-100 shadow-xl`
        cardDiv.innerHTML = `
    
                    <div class="relative">
                         <img class="h-[200px] w-full" src="${thumbnail}" alt="Videos" />
                         <h2> ${others.posted_date ? `<h3 class=" bg-black px-2 py-1 text-white rounded-lg absolute bottom-2 right-2"> Hrs ${hrs} Min ${min} ago </h3>` : ""} </h2>
                         
                         </div>
                        
                        <div>

                            <div class="flex px-0 py-2 gap-5 ">
                                <div>
                                   <img class="w-10 h-10 rounded-full"
                                    src=" ${cards?.authors[0].profile_picture} " alt="">
                                </div>

                                <div>
                                    <h3 class="font-bold text-sm"> ${title} </h3>
                                    <div class="flex items-center gap-1">
                                        <h3 class="my-2"> ${authors[0].profile_name} </h3>
                                        
                                        <h3> ${(cards.authors[0].verified) ?
                `<img src= "./images/verify.png" alt="" /> ` : ''} </h3> 
                                    </div >
                <h4> ${cards.others.views} views</h4>
                                </div >
                            </div >
                        </div >

               `
        cardsContainer.appendChild(cardDiv)
    });

}

// Handle Sort By Button
document.getElementById('sort-button').addEventListener('click', function () {
    const sortingButton = sortButton.sort((a, b) => {
        // console.log(parseFloat(a.others.views.slice(0, -1)));
        const x = parseFloat(a.others.views.slice(0, -1))
        const y = parseFloat(b.others.views.slice(0, -1))
        // console.log(x, y);
        return y - x;
    })

    handleDisplayVideosCards(sortingButton)

})


handleLoadVideosCards('1000')
handleLoadCatagories()

