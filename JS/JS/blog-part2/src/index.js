import './assets/styles/styles.scss';
import './index.scss';

const articleContainerElement = document.querySelector('.articles-container');
const categoriesContainerElement = document.querySelector('.categories');
let filter;
let articles;

const createArticles = () => {
    const articlesDOM = articles.filter((article) => {
        if (filter) {
            return article.category === filter;
        } else {
            return true;
        }
    }).map((article) => {
        const articleDOM = document.createElement('div');
        articleDOM.classList.add('article');
        articleDOM.innerHTML = `
<img
  src="${article.img}"
  alt="profile"
/>
<h2>${article.title}</h2>
<p class="article-author">${article.author} - ${article.category} - ${new Date(article.createdAt).toLocaleString('fr-FR', {
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })}</p>
<p class="article-content">
  ${article.content}
</p>
<div class="article-actions">
  <button class="btn btn-danger" data-id=${article._id} >Supprimer</button>
  <button class="btn btn-primary" data-id=${article._id} >Modifier</button>
</div>
`;
        return articleDOM;
    });
    articleContainerElement.innerHTML = '';
    articleContainerElement.append(...articlesDOM);
    const deleteButtons = articleContainerElement.querySelectorAll('.btn-danger');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            try {
                const target = event.target;
                const articleId = target.dataset.id;
                const response = await fetch(
                    `https://restapi.fr/api/article/${articleId}`,
                    {
                        method: 'DELETE',
                    }
                );
                const body = await response.json();
                console.log(body);
                fetchArticle();
            } catch (e) {
                console.log('e : ', e);
            }
        });
    });

    const modifyButtons = articleContainerElement.querySelectorAll('.btn-primary');
    modifyButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            window.location.assign(`/form/form.html?article-id=${event.target.dataset.id}`);
        });
    });
};

const createMenuCategories = () => {
    const categories = articles.reduce((acc, article) => {
        if (acc[article.category]) {
            acc[article.category]++;
        } else {
            acc[article.category] = 1;
        }
        return acc;
    }, {});

    const categoriesArr = Object.keys(categories).map((category) => {
        return [category, categories[category]];
    }).sort((c1, c2) => c1[0].localeCompare(c2[0]));

    const liElements = categoriesArr.map(categoryElement => {
        const li = document.createElement('li');
        li.innerHTML = `${categoryElement[0]} (<strong>${categoryElement[1]}</strong>)`;
        li.addEventListener('click', (event) => {
            filter = categoryElement[0];
            liElements.forEach(liElement => {
                liElement.classList.remove('active');
            })
            li.classList.add('active');
            createArticles();
        })
        return li;
    })

    categoriesContainerElement.innerHTML = ``;
    categoriesContainerElement.append(...liElements);
}

const fetchArticle = async () => {
    try {
        const response = await fetch('https://restapi.fr/api/article');
        articles = await response.json();
        createArticles();
        createMenuCategories();
    } catch (e) {
        console.log('e : ', e);
    }
};

fetchArticle();
