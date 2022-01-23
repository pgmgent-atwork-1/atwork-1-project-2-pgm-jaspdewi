(() => {
  const day = {
    init() {
      console.log('1. Application initialized');

      this.getData = new GetData();

      this.cacheElements();
      this.fetchDayData();
    },
    cacheElements() {
      console.log('2. Cache elements');

      this.$randomPreviews = document.querySelector('.events');
      this.$categoryList = document.querySelector('.categories__list');
      this.$categorizedEvents = document.querySelector('.day__all-events');
    },
    async fetchDayData() {
      console.log('3. Retrieve and filter event data');

      const data = await this.getData.getEventData();
      const search = window.location.search;
      const params = new URLSearchParams(search);
      

      this.day = params.has('day') ? params.get('day') : "19";
      const filteredData = data.filter(event => event.day === this.day);
      
      this.addClassToActiveDay();
      this.generateRandomEventHTML(filteredData);
      this.generateAllEventsForDay(filteredData);
    },
    addClassToActiveDay() {
      const activeDay = document.getElementById(`${this.day}`);
      activeDay.classList.add('active-day');
    },
    generateRandomEventHTML(data) {
      console.log('4. generate 3 random event-previews');
      for (let i = 0; i < 3; i++) {

        // randomize data
        const random = Math.floor(Math.random() * data.length);

        const randomData = [data[random]];

        const event = randomData.map((event) => {
          // use default-img.jpg as thumbnail when none is available
          // largely same html as events on main-page (index.js 32 - 48)
          // small difference in event__date div (index.js 38 - 41, here 50 - 52)
          return `
          <li class="event">
          <a href="evenementen/detail.html?day=${event.day}&slug=${event.slug}" class="main__links event-link">
          <div class="event__thumbnail-container">
          <img class="event__thumbnail" loading="lazy" src="${event.image ? event.image.full : "static/media/images/default-img.png"}" alt="event thumbnail">
          </div>
            <article class="event__article">
              <div class="random-event__date">
              <p class="date__hour">${event.start} u.</p>
              </div>
              <h3 class="event__name">${event.title}</h3>
              <p class="event__location">${event.location}</p>
            </article>
          </a>
          </li>
          `
        }).join('');
        this.$randomPreviews.innerHTML += event;
      };

    },
    async generateAllEventsForDay(data) {
      console.log('5. generate list of events for selected day');

      // get event-data, already filtered on correct day, from previous functions
      const events = data;
      // get category-data from services.js-file
      this.categories = await this.getData.getCategoryData();
      const allEventsHtml = this.categories.map((cat) => {
        // mostly same html for events as before (day.js 41 - 57)
        const categorizedEvents = events.filter((event) => event.category[0] === cat || event.category[1] === cat).map((event) => {
          return `
          <li class="event categorized-event">
          <a href="evenementen/detail.html?day=${event.day}&slug=${event.slug}" class="main__links event-link">
          <div class="event__thumbnail-container categorized-event__thumbnail">
          <img class="event__thumbnail" loading="lazy" src="${event.image ? event.image.full : "static/media/images/default-img.png"}" alt="event thumbnail">
          </div>
            <article class="event__article categorized-event__article">
              <div class="random-event__date">
              <p class="date__hour">${event.start} u.</p>
              </div>
              <h3 class="event__name">${event.title}</h3>
              <p class="event__location">${event.location}</p>
            </article>
          </a>
          </li>
          `
        }).join('');
        
        // html for category-titles & division
        return `
        <section class="events-by-category">
        <div class="category__title">
        <h2 id="${cat}">${cat}</h2>
        <a href="evenementen/day.html?day=${this.day}#categories__list" class="to-category-list">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>arrow-up</title>
          <path d="M13.682 11.791l-6.617 6.296-3.065-2.916 11.74-11.171 12.26 11.665-2.935 2.793-7.113-6.768v16.311h-4.269z"></path>
        </svg>
        </a>
        </div>
        <ul class="events categorized-events no-bullets">
          ${categorizedEvents}
        </ul>
        </section>
        `
      }).join('');

      // add created structure to innerHTML
      this.$categorizedEvents.innerHTML = allEventsHtml

      this.generateCategoryList();
    },
    generateCategoryList() {
      const categoryList = this.categories.map((cat) => {
        return `
        <li>
        <a href="evenementen/day.html?day=${this.day}#${cat}" class="category">
        ${cat}
        </a>
        </li>
        `
      }).join('');
      this.$categoryList.innerHTML = categoryList;
    },
  };
  day.init();
})();