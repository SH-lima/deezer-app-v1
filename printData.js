

// --------------une boucle qui me permet de récupere tous les albums meme répiter  
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
// stocker la listes des albums par ID sans répitation 
const resultDeFilterAlbum = removeDuplicateObject(albums)

    

//-------------permettre de citer les titres de chaque album 
// creer un tableau ou on va stocker tous les titres de chaque album dans un tableau 
    let listTitles =[]
    // creer un tableau ou on va stocker des tableau chaque tableau contient le preview de chaque titre 
    let previewToutesTitres=[]
    //  recuper les titres et les stocker dans des tableaux par album
    for (let a = 0; a < resultDeFilterAlbum.length; a++) {
        let lstTitlesDeChaqueAlbum =[]
        let previewChaqueTitre =[]
        //boucler sur le ficher json 
        data.forEach((info)=>{    
            const element = resultDeFilterAlbum[a];
            
            if(element==info.album.id){
            lstTitlesDeChaqueAlbum.push(info.title)   
            previewChaqueTitre.push(info.preview) 
             }
         })
        listTitles.push(lstTitlesDeChaqueAlbum)
        previewToutesTitres.push(previewChaqueTitre)
    }



// -----------------------la fonction qui nous permet d'afficher pour chaque album les titres et preview de chaque titres dans le navigateur 
    const listTitreAlbum = (numAlbum,titres,place)=>{
    for (let titre = 0; titre < numAlbum.length; titre++) {
        const element = numAlbum[titre];
        const music = titres[titre]
        place.insertAdjacentHTML("beforeend", `<li>${element}</li><audio src="${music}" controls></audio>`)
    }}
    
    
    // selection les elements html:
    // ul ou on inserir les li
    const ulDesTitres = document.querySelector(".Album")
    //images 
    const images = document.querySelectorAll(".card-img-top")
    //le titre d'album
    const lesAlbums =document.querySelectorAll(".card-title")
    // pour play la musique 
    const audios = document.querySelectorAll(".card-audio")
    //bouton qui nous permet d'ouvrir l'album
    const bouton = document.querySelectorAll(".btn")
    //modal ou on va afficher les titres et les previews d'un seule album
    const modal = document.querySelector(".modal")
    // bouton permet de fermer le modal
    const close = document.querySelector(".close")


    //tableau pour stocker les images de chaque album
    let imagesAlbum =[]
    //tableau pour stocker le titre de chaque album
    let leTitreAlbum=[]

    //recuperer l'images et le titre de chaque album
    data.forEach((info)=>{
        imagesAlbum.push(info.album.cover_medium)
        leTitreAlbum.push(info.album.title)
        
    })
    // supprimer les elements repeter
    const resultFilterImages = removeDuplicateObject(imagesAlbum)
    leTitreAlbum = removeDuplicateObject(leTitreAlbum)


    // ------------dans la  page pour chaque album :
    for (let a = 0; a < resultFilterImages.length; a++) {

        const element = resultFilterImages[a];
        const unAlbum = previewToutesTitres[a]
        //afficher l'image 
         images[a].src=`${element}`
         //le titre
         lesAlbums[a].insertAdjacentHTML("beforeend", `${leTitreAlbum[a]}`)
         // le preview de premier titre 
         audios[a].src=`${unAlbum[0]}`
         //le bouton pour ouvrir le modal qui contient tous les titres de chaque album
         bouton[a].addEventListener("click",()=>{
            modal.style.display="block"
            //inserir les titres dynamiquement 
           listTitreAlbum(listTitles[a],previewToutesTitres[a], ulDesTitres)
           //le bouton permet de fermer le modal 
           close.addEventListener("click", ()=>{
                modal.style.display="none" 
                location.reload()
            })
         })
    }


