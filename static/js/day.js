(() => {
  const app = {
    init() {
      console.log('1. Application initialized');

      this.getData = new GetData();

      this.cacheElements();
      this.fetchDayData();
    },
    cacheElements() {
      console.log('2. Cache elements');

      this.$randomPreviews = document.querySelector('.events')

    },
    async fetchDayData() {
      console.log('3. Retrieve and filter event data');

      const search = window.location.search;
      const params = new URLSearchParams(search);
      const data = await this.getData.getEventData();

      const day = params.has('day') ? params.get('day') : "19";
      const filteredData = data.filter(event => event.day === day);
      
      this.generateRandomEventHTML(data);
    },
    generateRandomEventHTML(data) {
      console.log('4. generate 3 random event-previews');
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
              <div class="random-event__date">
              <p class="date__hour">${event.start} u</p>
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

    }

  };
  app.init();
})();