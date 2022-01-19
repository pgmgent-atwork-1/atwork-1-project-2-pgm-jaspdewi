(() => {
  const index = {
    init() {
      console.log('1. Application initialized');

      this.getData = new GetData();

      this.cacheElements();
      this.fetchEventData();
      this.fetchNewsData();
    },
    cacheElements() {
      console.log('2. Cache elements');

      this.$events = document.querySelector('.events');
      this.$news = document.querySelector('.news-articles');
    },
    async fetchEventData() {
      console.log('3. Retrieve event data');

      const data = await this.getData.getEventData();

      for (let i = 0; i < 3; i++) {
        // randomize data
        const random = Math.floor(Math.random() * data.length);

        const randomData = [data[random]];

        const event = randomData.map((event) => {
          // use default-img.jpg as thumbnail when none is available
          return `
          <li class="event">
          <a href="" class="main__links event-link">
          <div class="event__thumbnail-container">
          <img class="event__thumbnail" src="${event.image ? event.image.full : "static/media/images/default-img.png"}" alt="event thumbnail">
          </div>
            <article class="event__article">
              <div class="event__date">
              <p class="date__day">${(event.day_of_week).slice(0,2)} ${event.day} Jul</p>
              <p class="date__hour">${event.start} u</p>
              </div>
              <h3 class="event__name">${event.title}</h3>
              <p class="event__location">${event.location}</p>
            </article>
          </a>
          </li>
          `
        }).join('');
        this.$events.innerHTML += event
      };
    },
    async fetchNewsData() {
      console.log('4. Retrieve news data');

      const data = await this.getData.getNewsData();

      for (let i = 0; i < 3; i++) {
        const newsData = [data[i]];

        const event = newsData.map((news) => {
          // get correct data from new Date 
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
  index.init();
})();