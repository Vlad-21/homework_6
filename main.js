let input = document.querySelector('.main-container__search-bar--input');

input.addEventListener('change', (event) => {
    loader(true);
    getUserRepositories(event.target.value);
});

async function getUserRepositories(userName) {
    const url = `https://api.github.com/users/${userName}/repos`;
    await fetch(url, {
        method: 'get',
    }).then((response) => {
        response.json().then(reasponseData => {
            let data = reasponseData;
            if (data?.message === "Not Found") {
                notFound();
                return;
            }
            clearData();
            addRepository(data);
        }).catch(e => {
            console.log(e);
        });
    }).catch((e) => {
        console.log(e);
    });
};

getUserRepositories();


function addRepository(array) {
    let container = document.querySelector('.main-container__user-repo');
    container.style.display = 'grid';
    container.style.alignItems = 'start';
    for (let item of array) {
        let element = document.createElement('a');
        element.href = item.svn_url;
        element.className = 'card';
        element.target = '_blank';

        let title = document.createElement('p');
        title.className = 'card__title';
        title.innerText = item.name;

        let language = document.createElement('p');
        language.className = 'card__language';
        language.innerText = `Language: ${item.language || 'Not listed'}`;

        let description = document.createElement('p');
        description.className = 'card__description';
        description.innerText = `Description:  ${item.description || 'No available'}`

        element.appendChild(title);
        element.appendChild(language);
        element.appendChild(description);
        container.appendChild(element);
    };
    loader(false);
}

function clearData() {
    let container = document.querySelector('.main-container__user-repo');
    if (!container.firstChild) {
        return;
    };
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    };
}


function notFound() {
    let container = document.querySelector('.main-container__user-repo');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.innerHTML = `
        <h1>User not found</h1>
    `;
    loader(false);
}


function loader(show) {
    let loader = document.querySelector('.loader');
    if (show) {
        loader.style.display = 'flex';
    } else {
        loader.style.display = 'none';
    }
}