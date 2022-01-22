(() => {
  const news = {
    init() {
      console.log('1. Application initialized');

      this.getData = new GetData();

      this.cacheElements();
      this.fetchNewsData();
    },
    cacheElements() {
      console.log('2. Cache elements');

      this.$news = document.querySelector('.news-articles');

    },
    async fetchNewsData() {
      console.log('3. Retrieve news data');

      const data = await this.getData.getNewsData();

      const newsLength = data.length;

      for (let i = 0; i < newsLength; i++) {
        const newsData = [data[i]];

        const event = newsData.map((news) => {
          // get correct data from new Date() 
          const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
          const date = new Date(news.publishedAt);
          const day = date.getDate();
          let dayMonth = `${day < 10 ? "0" + day : day}/${month[date.getMonth()]}`;
          return `
          <li class="news-article ">
                <a href="" class="main__links news-link">
                    <div class="news__thumbnail-container">
                        <img class="news__thumbnail" src="https://www.pgm.gent/data/gentsefeesten/${news.picture.medium}" alt="thumbnail">
                        <div class="news__date">${dayMonth}</div>
                    </div>
                    <div class="news__synopsis-container">
                        <h3 class="news__title">${news.title}</h3>
                        <p class="news__synopsis">${news.synopsis}</p>
                        <svg class="news-arrow" width="24" height="24" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"><path d="M8.683 0L6.785 1.885l4.118 4.118H0v2.661h10.903l-4.118 4.117 1.898 1.886L16 7.333z" fill="#000" fill-rule="nonzero"/></svg>
                    </div>
                </a>
            </li>
          `
        }).join('');
        this.$news.innerHTML += event
      };
    },
  };
  news.init();
})();