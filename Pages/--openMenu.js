const menuButton = document.querySelector(".menu-button")
const closeNavigationButton = document.querySelector(".close-phone-navigation-button")
const navigationContainer = document.querySelector(".small-navigation-container")

const handleOpennavigation = () => {
    if(navigationContainer){
        // Si le menu de navigation sur téléphone est fermer
        if(navigationContainer.classList.contains("closed")){
            // On retire la classe closed
            navigationContainer.classList.remove("closed")
            // On ajoute la classe d'animation d'apparition
            navigationContainer.classList.add("animationClass_phone-navigation-apparition")
        }
    }
}

const handleClosenavigation = () => {
    if(navigationContainer){
        // Si le menu de navigation sur téléphone est ouvert
        if(!navigationContainer.classList.contains("closed")){
            // On ajoute la classe d'animation de fermeture
            navigationContainer.classList.add("animationClass_phone-navigation-disparition")
            // A la fin de cette animation, on lui remet closed, et on lui retire toutes ses classes d'animations
            setTimeout(() => {
                navigationContainer.classList.add("closed")
                navigationContainer.classList.remove("animationClass_phone-navigation-disparition")
                navigationContainer.classList.remove("animationClass_phone-navigation-apparition")
            }, 300);
        }
    }
}

menuButton.addEventListener("click", handleOpennavigation, true)
closeNavigationButton.addEventListener("click", handleClosenavigation, true)
