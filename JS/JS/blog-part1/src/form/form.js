import "../assets/styles/styles.scss"
import "./form.scss"

const form = document.querySelector('form');
let errors = [];
let errorElement = document.querySelector('#errors');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const article = Object.fromEntries((new FormData(form)).entries());

    if (formIsValid(article)) {
        try {
            const response = await fetch('https://restapi.fr/api/articles', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(article),
            });

            const body = await response.json();

            console.log(body);
        } catch (e) {
            console.log(errors);
        }

    }


    // console.log(json);
})

const formIsValid = (article) => {

    if (!article.author || !article.category || !article.content || !article.title || !article.img) {
        errors.push('champ vide');
    } else {
        errors = [];
    }
    if (errors.length) {
        let errorHtml = '';
        errors.forEach(error => {
            errorHtml += `<li>${error}</li>`;
            errorElement.innerHTML = errorHtml;
        })
        return false;
    } else {
        errorElement.innerHTML = '';
        return true;
    }
}

