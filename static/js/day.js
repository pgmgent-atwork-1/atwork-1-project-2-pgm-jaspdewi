(() => {
  const app = {
    init() {
      console.log('1. Application initialized');

      this.getData = new GetData();

      this.cacheElements();
      this.fetchDayData();
      this.createEventListeners();
    },
    cacheElements() {
      console.log('2. Cache elements');

      this.$randomPreviews = document.querySelector('.events');
      this.$categoryList = document.querySelector('.categories__list');
      this.$categorizedEvents = document.querySelector('.day__all-events');
      this.$buttons = document.querySelector('.display-toggle-buttons');
      this.$listButton = document.querySelector('.display-toggle-button--list');
      this.$rasterButton = document.querySelector('.display-toggle-button--raster');
    },
    async fetchDayData() {
      console.log('3. Retrieve and filter event data');

      const search = window.location.search;
      const params = new URLSearchParams(search);
      const data = await this.getData.getEventData();

      this.day = params.has('day') ? params.get('day') : "19";
      const filteredData = data.filter(event => event.day === this.day);
      
      this.generateRandomEventHTML(filteredData);
      this.generateAllEventsForDay(filteredData);
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
          <a href="" class="main__links event-link">
          <div class="event__thumbnail-container">
          <img class="event__thumbnail" src="${event.image ? event.image.full : "static/media/images/default-img.png"}" alt="event thumbnail">
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
        this.$randomPreviews.innerHTML += event
      };

    },
    async generateAllEventsForDay(data) {
      console.log('4. generate list of events for selected day');

      // get event-data, already filtered on correct day, from previous functions
      const events = data;
      // get category-data from services.js-file
      this.categories = await this.getData.getCategoryData();
      const allEventsHtml = this.categories.map((cat) => {
        // mostly same html for events as before (day.js 41 - 57)
        const categorizedEvents = events.filter((event) => event.category[0] === cat || event.category[1] === cat).map((event) => {
          return `
          <li class="event categorized-event">
          <a href="" class="main__links event-link">
          <div class="event__thumbnail-container categorized-event__thumbnail">
          <img class="event__thumbnail" src="${event.image ? event.image.full : "static/media/images/default-img.png"}" alt="event thumbnail">
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
        <a href="evenementen/dag.html?day=${this.day}#categories__list" class="to-category-list">
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
        <a href="evenementen/dag.html?day=${this.day}#${cat}" class="category">
        ${cat}
        </a>
        </li>
        `
      }).join('');
      this.$categoryList.innerHTML = categoryList;
    },
    createEventListeners() {
      this.$listButtonActive = this.$buttons.querySelector('.display-toggle-button--list.display-toggle-button--active');
      this.$rasterButtonActive = this.$buttons.querySelector('.display-toggle-button--raster.display-toggle-button--active');
  
      // eventlistener on list-button
      this.$listButton.addEventListener('click', (() => {
        
        this.$eventThumbnail = document.querySelectorAll('.categorized-event__thumbnail');
        this.$eventArticle = document.querySelectorAll('.categorized-event__article');
        this.$eventsByCategory = document.querySelectorAll('.categorized-events');
        this.$eventByCategory = document.querySelectorAll('.categorized-event');

        if (this.$rasterButtonActive !== null) {
          this.$rasterButtonActive.classList.remove('display-toggle-button--active');
          this.$listButton.classList.add('display-toggle-button--active');
          for (const event of this.$eventThumbnail) {
            event.classList.add('categorized-event__thumbnail--invisible');
          }
          for (const event of this.$eventsByCategory) {
            event.classList.remove('events');
          }
          for (const event of this.$eventByCategory) {
            event.classList.replace('event', 'event--raster');
          }
          for (const event of this.$eventArticle) {
            event.classList.add('categorized-event__article--raster');
          }
        }

        this.$listButtonActive = this.$buttons.querySelector('.display-toggle-button--list.display-toggle-button--active');
      }))
      // eventlistener on raster-button
      this.$rasterButton.addEventListener('click', (() => {

        this.$eventThumbnail = document.querySelectorAll('.categorized-event__thumbnail');
        this.$eventArticle = document.querySelectorAll('.categorized-event__article');
        this.$eventsByCategory = document.querySelectorAll('.categorized-events');
        this.$eventByCategory = document.querySelectorAll('.categorized-event');
        
        if (this.$listButtonActive !== null) {
          this.$listButtonActive.classList.remove('display-toggle-button--active');
          this.$rasterButton.classList.add('display-toggle-button--active');
          for (const event of this.$eventThumbnail) {
            event.classList.remove('categorized-event__thumbnail--invisible');
          }
          for (const event of this.$eventsByCategory) {
            event.classList.add('events');
          }
          for (const event of this.$eventByCategory) {
            event.classList.replace('event--raster', 'event');
          }
          for (const event of this.$eventArticle) {
            event.classList.remove('categorized-event__article--raster');
          }
        }

        this.$rasterButtonActive = this.$buttons.querySelector('.display-toggle-button--raster.display-toggle-button--active');
      }))
    }
  };
  app.init();
})();