const imgContainer=document.getElementById("img-container")
loader=document.getElementById("loader")

let ready=false
let imagesLoaded=0
let totalImages=0
let photosArray=[]
let initialLoad=true
let count=5
const apiKey='7qvTpvCsEoNhs6WqoN63WUfvkEEIt4s4YTVUig5ioVI';

//Unsplash API
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=nature`





//Checkif all images were loaded
const imageLoaded=()=>{
    imagesLoaded++
    if(imagesLoaded===totalImages){
        ready=true
        loader.hidden=true
        initialLoad=false
        count=30
        apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=nature`

    }
}

//In order to set attributes of photo,code a helper function
const setAttributes=(element,attributes)=>{
    for (const key in attributes) {
       element.setAttribute(key,attributes[key])
    }

}


//Creaye elements for links and photos then add to dom
const displayPhotos=()=>{
    imagesLoaded=0
    totalImages=photosArray.length
    photosArray.forEach(photo=>{
        const item=document.createElement('a')
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'})
        const img=document.createElement('img')
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
            })
            img.addEventListener('load',imageLoaded)
        item.appendChild(img)
        imgContainer.appendChild(item)

    })
}



const getPhotos=async()=>{
    try { 
        const response=await fetch(apiUrl)
        photosArray=await response.json()
        displayPhotos()     
    } catch (error) {   
    }
}


//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000&&ready){
        ready=false
        getPhotos()
    }

})


getPhotos()


