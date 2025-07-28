import '../assets/styles/styles.scss';
import './form.scss';

let form = document.querySelector('form');
const errorElement = document.querySelector('#errors');
const btnCancel = document.querySelector('.btn-secondary');
const articleId = new URL(location.href).searchParams.get('article-id');

btnCancel.addEventListener('click', (e) => {
    window.location.assign('/index.html');
})

const fillForm = (article) => {
    const author = document.querySelector('input[name="author"]');
    const category = document.querySelector('input[name="category"]');
    const title = document.querySelector('input[name="title"]');
    const img = document.querySelector('input[name="img"]');
    const content = document.querySelector('textarea');

    author.value = article.author;
    category.value = article.category;
    title.value = article.title;
    img.value = article.img;
    content.value = article.content;
}

const initForm = async () => {
    if (articleId) {

        try {
            const response = await fetch(`https://restapi.fr/api/article/${articleId}`);
            const article = await response.json();
            fillForm(article);

        } catch (e) {
            console.log('e : ', e);
        }
    }
}

initForm();

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const article = Object.fromEntries(formData.entries());
    if (formIsValid(article)) {
        try {
            const json = JSON.stringify(article);
            if (articleId) {
                const response = await fetch(`https://restapi.fr/api/article/${articleId}`, {
                    method: 'PATCH',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const body = await response.json();
            } else {
                const response = await fetch(`https://restapi.fr/api/article`, {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const body = await response.json();
            }
            location.assign('/index.html');

        } catch (e) {
            console.error('e : ', e);
        }
    }
});

const formIsValid = (article) => {
    let errors = [];
    if (
        !article.author ||
        !article.category ||
        !article.content ||
        !article.img ||
        !article.title
    ) {
        errors = [];
        errors.push('Vous devez renseigner tous les champs');
    } else {
        errors = [];
    }
    if (errors.length) {
        let errorHTML = '';
        errors.forEach((e) => {
            errorHTML += `<li>${e}</li>`;
        });
        errorElement.innerHTML = errorHTML;
        return false;
    } else {
        errorElement.innerHTML = '';
        return true;
    }
};
