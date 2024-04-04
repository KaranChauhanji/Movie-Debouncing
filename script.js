const input= document.getElementById('input')
const search= document.getElementById('search')
const container= document.querySelector('.container');
const debounceDiv= document.querySelector('debounce')
let API_key='2583df3e'
let timerID;


async function fetchData(movie){
    let url=`https://www.omdbapi.com/?apikey=${API_key}&s=${movie}`;
    
    try {
        let res= await fetch(url)
    let data= await res.json();
    
    return data

    } catch (error) {
        console.log(error)
    }

}

async function controller(){

    let value= input.value
    if(value.length <= 3){
        return false
    }

    let getValue= await fetchData(value)
    console.log(getValue)
    displayData(getValue.Search)

}


let debounce =(operation,delay)=>{

    if(timerID){
        clearTimeout(timerID)
    }

   timerID= setTimeout(()=>{
        operation()
    },delay)

}




function displayData(data){

    container.innerHTML=""

    if (data) {
        
            data.forEach(elem => {
                
                let card= document.createElement('div')
        
                card.innerHTML=`
                
                <img src="${elem.Poster}" alt="${elem.Title}">
                <p>${elem.Title}</p>
                `
                container.append(card)
        
            });
        
    } else {
        container.innerHTML=`<h3>Movie Not Found!</h3>`
    }


}
 


  
input.addEventListener('input',()=>{debounce(controller,500)});

