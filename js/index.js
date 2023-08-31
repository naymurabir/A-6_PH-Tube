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
        <a class="tab text-black font-semibold bg-gray-200 rounded"> ${category.category} </a>
        `
        categoriesContainer.appendChild(categoryDiv)
    });


}


// Load Videos Cards from API using ID's
const handleLoadVideosCards = async (videosId) => {

}
handleLoadCatagories()