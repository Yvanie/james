document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // On vérifie si le bouton existe bien dans la page avant de cliquer
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            console.log("Clic détecté !"); // Pour vérifier dans la console (F12)
            
            const isLight = body.getAttribute('data-theme') === 'light';
            
            if (isLight) {
                body.removeAttribute('data-theme');
                // Change l'icône en lune
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                body.setAttribute('data-theme', 'light');
                // Change l'icône en soleil
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    } else {
        console.error("Le bouton avec l'ID 'theme-toggle' n'a pas été trouvé.");
    }
});


// --- GESTION DU LIEN ACTIF AU SCROLL ---

const sections = document.querySelectorAll('section'); // Sélectionne toutes tes sections
const navLinks = document.querySelectorAll('.nav-link'); // Sélectionne tous les liens

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Déclenche le changement quand la section occupe le milieu de l'écran
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 1. Récupérer l'ID de la section visible
            const id = entry.target.getAttribute('id');
            
            // 2. Retirer la classe 'active' de tous les liens
            navLinks.forEach(link => {
                link.classList.remove('active');
                // 3. Ajouter 'active' au lien qui correspond à l'ID
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// On demande à l'observeur de surveiller chaque section
sections.forEach(section => {
    observer.observe(section);
});

// Pour envoyer un message en haut de la page
// Attendre que toute la page soit chargée
document.addEventListener('DOMContentLoaded', () => {
    
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        // On cache le bouton au départ
        backToTop.style.display = 'none';

        // On affiche le bouton seulement si on a scrollé de 300px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });

        // Action au clic
        backToTop.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche des comportements bizarres du navigateur
            console.log("Retour en haut activé !");
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Pour un défilement fluide
            });
        });
    } else {
        console.error("Le bouton 'back-to-top' n'a pas été trouvé dans le HTML.");
    }
});


//Si tu veux éviter que la page ne se recharge et afficher un message de succès "humain"
const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const data = new FormData(form);
    
    const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        form.reset();
        alert("Merci ! Votre message a bien été envoyé. Je vous répondrai très bientôt.");
    } else {
        alert("Oups ! Un problème est survenu. Veuillez réessayer.");
    }
});