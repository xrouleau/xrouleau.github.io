// fonction qui affiche toute les recettes
async function afficher() {
    // prend les recettes de mockapi
    event.preventDefault()
    let json = await fetch('https://65859630022766bcb8c8f0a3.mockapi.io/api/recettes/recette', {
        method: 'GET',
        headers: {'content-type':'application/json'},
    }).then(recettes => {
        if (recettes.ok) {
            return recettes.json();
        }
        // handle error
    }).then(recettes => {
        // met toutes les propriétés d'une recettes dans des variables
        let i = 0
        for (let recette of recettes){
            var nom = recette["nom"]
            var ingredient1 = recette["ingredient1"]
            var ingredient2 = recette["ingredient2"]
            var ingredient3 = recette["ingredient3"]
            var ingredient4 = recette["ingredient4"]
            var ingredient5 = recette["ingredient5"]
            var quantite1 = recette["quantite1"]
            var quantite2 = recette["quantite2"]
            var quantite3 = recette["quantite3"]
            var quantite4 = recette["quantite4"]
            var quantite5 = recette["quantite5"]
            var instructions = recette["instructions"]

            // construit la carte qui sera affichée

            let eNom = $("<h5></h5>").attr("class", "card-header").text(nom)

            let ingredients = $("<h5></h5>").attr("class", "ms-3").text("Ingrédients")

            let qt1 = $("<span></span>").attr("class", "badge bg-secondary ms-5").text(quantite1)
            let eI1 = $("<li></li>").text(ingredient1).append(qt1)
            let qt2 = $("<span></span>").attr("class", "badge bg-secondary ms-5").text(quantite2)
            let eI2 = $("<li></li>").text(ingredient2).append(qt2)
            let qt3 = $("<span></span>").attr("class", "badge bg-secondary ms-5").text(quantite3)
            let eI3 = $("<li></li>").text(ingredient3).append(qt3)
            let qt4 = $("<span></span>").attr("class", "badge bg-secondary ms-5").text(quantite4)
            let eI4 = $("<li></li>").text(ingredient4).append(qt4)
            let qt5 = $("<span></span>").attr("class", "badge bg-secondary ms-5").text(quantite5)
            let eI5 = $("<li></li>").text(ingredient5).append(qt5)

            let ul = $("<ul></ul>").attr("class", "ms-3")
                .append(eI1)
                .append(eI2)
                .append(eI3)
                .append(eI4)
                .append(eI5)

            let div = $("<div></div>").attr("class", "container grosseur border rounded text-wrap p-1 px-3").text(instructions)

            let button = $("<button></button>").attr("class", "btn btn-danger float-end mt-3").attr("id", i).text("Supprimer")
            i ++;

            let cardbody = $("<div></div>").attr("class", "card-body")
                .append(ingredients)
                .append(ul)
                .append(div)
                .append(button)

            let card = $("<div></div>").attr("class", "card mt-4")
                .append(eNom)
                .append(cardbody)

            $('#cartes').append(card)
        }
    })
}

// fonction qui vérifie si les entrées dans le formulaire sont correctes
function verif() {
    let check = ""

    if ($('#nom').text().length < 2)
        check = "Nom doit contenir au moins deux caractères"

    if ($('#i1').text().length < 2)
        check = "Ingrédient doit contenir au moins deux caractères"

    if ($('#qt1').text().match(/^[0-9]+$/) == null)
        check = "Quantité doit être un nombre"

    if ($('#i2').text().length < 2)
        check = "Ingrédient doit contenir au moins deux caractères"

    if ($('#qt2').text().match(/^[0-9]+$/) == null)
        check = "Quantité doit être un nombre"

    if ($('#instru').text().length < 10)
        check = "Les instructions doivent être d'au moins 10 caractères."
}

// fonction qui ajoutes des recettes
function ajouter() {
    event.preventDefault()
    if (verif)
        var recette = {
            nom : $('#nom').text(),
            i1 : $('#i1').text(),
            i2 : $('#i2').text(),
            i3 : $('#i3').text(),
            i4 : $('#i4').text(),
            i5 : $('#i5').text(),
            qt1 : $('#qt1').text(),
            qt2 : $('#qt2').text(),
            qt3 : $('#qt3').text(),
            qt4 : $('#qt4').text(),
            qt5 : $('#qt5').text(),
            instru :$('#instru').text()
        };
    // publie les recettes sur le mockapi
    fetch('https://65859630022766bcb8c8f0a3.mockapi.io/api/recettes/recette', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify(recette)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(task => {
        afficher()
    })
}

// affiche les recettes dès l'ouverture de la page
document.addEventListener("DOMContentLoaded", function() {
    afficher();
});



