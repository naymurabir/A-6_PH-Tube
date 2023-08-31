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
        console.log(category);
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add("text-black", "font-semibold", "rounded-sm", "hover:bg-gray-200");
        categoryDiv.innerHTML = `
        <a onclick ="handleLoadVideosCards('${category.category_id}')" class="tab text-black font-semibold bg-gray-200 rounded "> ${category.category} </a>
        `
        categoriesContainer.appendChild(categoryDiv)
    });

}


// Load Videos Cards from API using ID's
const handleLoadVideosCards = async (videosId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${videosId}`)
    const data = await response.json()
    const videosCards = data.data
    // console.log(videosCards);
    handleDisplayVideosCards(videosCards)
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
        <img class="w-40 mt-16" src="./images/Icon.png" alt="alternative-text">
        <h2 class="text-2xl font-medium mt-3"> Oops!! Sorry, There is no content here </h2>
        `
        emptyContainer.appendChild(emptyDiv)
    }

    videosCards.forEach(cards => {
        const cardDiv = document.createElement('div')
        cardDiv.classList = `card bg-base-100 shadow-xl`
        cardDiv.innerHTML = `
    
                    <figure><img class="h-[200px] w-full" src="${cards.thumbnail}" alt="Videos" />

                        </figure>
                        <div>

                            <div class="flex px-5 py-2 gap-5 ">

                                <div>

                                    <img class="w-10 h-10 rounded-full"
                                    src=" ${cards?.authors[0].profile_picture} " alt="">

                                </div>
                                <div>

                                    <h3 class="font-bold text-sm"> ${cards.title} </h3>
                                    <div class="flex items-center gap-2">
                                        <h3 class="my-2"> ${cards?.authors[0].profile_name} </h3>
                                        
                                        <h3> ${(cards.authors[0].verified) ?
                `<i class="fa-solid fa-circle-check text-green-600 text-2xl"></i>` : ''} </h3> 
                                    </div >
                <h4> ${cards.others.views} views</h4>

                                </div >
                            </div >
                        </div >
                        
               `
        cardsContainer.appendChild(cardDiv)
    });

}


handleLoadVideosCards('1000')
handleLoadCatagories()