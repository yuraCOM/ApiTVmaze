

let myWord = document.querySelector('#myWord')
let mySend = document.querySelector('#mySend')
let dataWrapper = document.querySelector('#data-wrapper')
let z
let requestUrl

mySend.onclick = function (){
    dataWrapper.innerHTML = ""
    z = myWord.value
    requestUrl = `https://api.tvmaze.com/search/shows?q=${z}`
    console.log(myWord.value)

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            if(data){
                data.forEach(item =>{
                    console.log(item)
                    dataWrapper.innerHTML += createTemplate(item)
                })
            }

        });

    myWord.value = ''
}

// let requestUrl = `http://api.tvmaze.com/search/shows?q=${}`

const createTemplate = data =>{
    let genres = []
    if (data.show.genres.length){
        genres = data.show.genres.reduce((acc, item) =>{
            return acc + ', ' + item;
        })
    } else {
        genres = 'Unknown...'
    }

    return `
        <div id="data-item">
            <div id="image">
                <img src="${data.show.image ? data.show.image.medium : 'https://img.icons8.com/dotty/80/000000/image--v1.png'}" alt="Sorry, no Image">
            </div>
            <div><span>Name: </span>${data.show.name}</div>
            <div><span>Premiered: </span>${data.show.premiered ? data.show.premiered : 'Unknown...' }</div>
            <div><span>Rating: </span>${data.show.rating.average}</div>
            <div><span>Genres: </span>${genres}</div>
            <div><span>Language: </span>${data.show.language}</div>
            <div><span>OfficialSite: </span> <a href="${data.show.officialSite}">Push me!</a></div>
            <div><span>Description: </span>${data.show.summary}</div>
            
        </div>
    `
}


//
// fetch(requestUrl)
//     .then(response => response.json())
//     .then(data => {
//         if(data){
//             data.forEach(item =>{
//                 console.log(item)
//                 dataWrapper.innerHTML += createTemplate(item)
//             })
//         }
//
//     });


