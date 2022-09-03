const loadNewsMenu = () =>{
    const  url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMenu(data.data.news_category))
}

const displayMenu = menus =>{
    const newsMenu = document.getElementById('news-menu');
    menus.forEach(menu=>{ 
        const menuLis = document.createElement('ul');
        menuLis.innerHTML = `
            <li onclick="loadNews('${menu.category_id}')">${menu.category_name}</li>
        `;
        menuLis.classList.add('menu-list')
        newsMenu.appendChild(menuLis);
    })
    
}

const loadNews = (category_id) =>{
    // loader(true);
    const url2 = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url2)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => console.log(error))
}

const displayNews = allNews =>{
    const cardBody = document.getElementById('card-body');
    cardBody.innerHTML = ''
    if(allNews.length >= 0){
        const newsNumber = document.getElementById('news-Number');
        newsNumber.innerHTML = `
                    <h3>${allNews.length} Items found for  this category</h3>
                `
    }
    allNews.forEach(news =>{
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card">
        <img src="${news.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title mt-3">${news.title.slice(0, 50)}...</h5>
          <p class="card-text">${news.details.slice(0, 200)}...</p>
        </div>
        <div class="card-body">
            <p>
                <img class="author-image" src="${news.author.img}">
                Authore Name: ${news.author.name} <br>
                Publish Date: ${news.author.published_date}
            </p>

            <p><i class="fa-light fa-eye"></i>
            Total View: ${news.total_view}
            </p>
            <button class="btn btn-primary" onclick="detail('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetaill">Detail</button>
        </div>
      </div>
        `;
        cardBody.appendChild(cardDiv);
    })
    // loader(false);
}

const detail = (news_id) =>{
    const url3 = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url3)
    .then(res => res.json())
    .then(data => displayModal(data.data))
    .catch(error => console.log(error))
}

const displayModal = newsDetail =>{
    newsDetail.forEach(news =>{
        const modalTitle = document.getElementById('newsDetaillLabel');
        modalTitle.innerText = news.title;
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <p>${news.details}</p>
        `;
    })
}

const loader = isLoading =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
      spinner.classList.remove('d-none');
    }
  }

loadNewsMenu();



