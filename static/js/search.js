(() => {
  const search = {
    init() {
      console.log('1. Application initialized');

      this.getData = new GetData();

      this.cacheElements();
      this.fetchSearchData();
      
    },
    cacheElements() {
      console.log('2. Cache elements');

      this.$resultAmount = document.querySelector('.searchresult--amount')
      this.$buttons = document.querySelector('.display-toggle-buttons');
      this.$searchResults = document.querySelector('.events');
    },
    async fetchSearchData() {
      console.log('3. Retrieve and filter search data');

      const data = await this.getData.getEventData()
      const search = window.location.search;
      const params = new URLSearchParams(search);

      const searchParam = params.get('search');
      if (searchParam === null) {
        this.$resultAmount.classList.add('invisible');
        this.$buttons.classList.add('invisible');
      };
      // without toLowerCase() the filter is case-sensitive (= not very user-friendly)
      const filteredData = data.filter(event => event.title.toLowerCase().includes(searchParam));

      this.generateSearchResults(filteredData, searchParam);
    },
    generateSearchResults(data, search) {
      console.log('4. generate list of events for search results');

      const amount = data.length
      this.$resultAmount.innerHTML = `
      <p class="strong">${amount} resultaten</p>
      <p>voor "${search}"</p>
      `
      // get event-data from previous function
      const events = data;
      this.$searchResults.innerHTML  = events.map((event) => {
        return `
          <li class="event categorized-event">
          <a href="evenementen/detail.html?day=${event.day}&slug=${event.slug}" class="main__links event-link">
          <div class="event__thumbnail-container categorized-event__thumbnail">
          <img class="event__thumbnail" loading="lazy" src="${event.image ? event.image.full : "static/media/images/default-img.png"}" alt="event thumbnail">
          </div>
            <article class="event__article categorized-event__article">
              <div class="event__date">
              <p class="date__day">${(event.day_of_week).slice(0,2)} ${event.day} Jul</p>
              <p class="date__hour">${event.start} u.</p>
              </div>
              <h3 class="event__name">${event.title}</h3>
              <p class="event__location">${event.location}</p>
            </article>
          </a>
          </li>
          `
      }).join('');
    }
  }
  search.init();
})();