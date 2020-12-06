

// --------------une boucle qui me permet de récupere tous les albums   
let albums = []
for (let i = 0; i < data.length; i++) {
    const info = data[i];
    
    let albumId = `${info.album.id}` 
        albums.push(albumId)
 
}
//----------------permettre de filtrer les albums dupliquer 
 function removeDuplicateObject(arr) {
    var keys = {};
    return arr.filter(function(item) {
        var key = JSON.stringify(item);
        if (key in keys) {
            return false;
        }
        keys[key] = 1;
        return true;
    });
}

const resultDeFilterAlbum = removeDuplicateObject(albums)
console.log(resultDeFilterAlbum)
    

//-------------permettre de citer les titres de chaque album 
    let listTitles =[]
    for (let a = 0; a < resultDeFilterAlbum.length; a++) {
    let lstTitlesDeChaqueAlbum =[]
    data.forEach((info)=>{    
        const element = resultDeFilterAlbum[a];
        
        if(element==info.album.id){
        lstTitlesDeChaqueAlbum.push(info.title)   
         
    }
    })
    console.log(lstTitlesDeChaqueAlbum) 
    console.log("-------------------------")
    listTitles.push(lstTitlesDeChaqueAlbum)
    }
    console.log(listTitles) 



// -----------------------la fonction qui nous permet d'afficher les titres de chaque album dans le navigateur 
    const listTitreAlbum = (numAlbum,place)=>{
    for (let titre = 0; titre < numAlbum.length; titre++) {
        const element = numAlbum[titre];
        place.insertAdjacentHTML("beforeend", `<li>${element}</li>`)
    }}
    
    
    
    const premierAlbum = document.querySelectorAll(".Album")
    for (let A = 0; A < listTitles.length; A++) {
        
        listTitreAlbum(listTitles[A], premierAlbum[A])
    }
    
    

