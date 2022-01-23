(() => {
  const detail = {
    init() {
      console.log('1. Application initialized');

      this.getData = new GetData();

      this.cacheElements();
      this.fetchDetailData();
    },
    cacheElements() {
      console.log('2. Cache elements');

      this.$eventDetails = document.querySelector('.event-details');
      this.$otherEventsFromOrganizerTitle = document.querySelector('.see-also__title');
      this.$otherEventsFromOrganizer = document.querySelector('.see-also__events');
    },
    async fetchDetailData() {
      console.log('3. Retrieve event-details');

      this.data = await this.getData.getEventData()
      const search = window.location.search;
      const params = new URLSearchParams(search);

      this.day = params.get('day');
      this.slug = params.get('slug');

      const filteredData = this.data.filter(ev => ev.day === this.day && ev.slug === this.slug);

      this.addClassToActiveDay();
      this.generateEventDetails(filteredData);
    },
    addClassToActiveDay() {
      const activeDay = document.getElementById(`${this.day}`);
      activeDay.classList.add('active-day');
    },
    generateEventDetails(data) {
      console.log('4. Generate event details');

      this.$eventDetails.innerHTML = data.map((ev) => {

        this.organizer = ev.organizer;
        const description = `
        <p class="event-details__description">${ev.description}</p>
        `;
        const website = `
        <div class="event-details__detail-flexbox">
          <p class="bold">Website:</p>
          <a href="${ev.url}">${ev.url}</a>
        </div>
        `;
        const wheelchairAccessible = `
        <div>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>wheelchair</title>
          <path d="M12.646 15.008l0.47 2.993c-0.034-0.001-0.074-0.001-0.115-0.001-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c2.485 0 4.5-2.015 4.5-4.5 0-0.687-0.154-1.338-0.429-1.92l0.012 0.027 3.332 0.766c0.054 0.338 0.085 0.728 0.085 1.125 0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5c0-2.932 1.682-5.471 4.134-6.704l0.043-0.020-0.813-2.274h-1.865c-0.552 0-1-0.448-1-1s0.448-1 1-1v0h2.57c0.431 0.001 0.798 0.274 0.938 0.656l0.002 0.007 1.064 2.972c0.35-0.067 0.707-0.11 1.072-0.127zM13.142 8.482c-1.772-0.188-3.141-1.675-3.141-3.482 0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5c0 1.346-0.76 2.515-1.874 3.1l-0.019 0.009 0.722 4.606c0.087-0.015 0.177-0.018 0.269-0.010l6 0.597c0.514 0.046 0.914 0.474 0.914 0.996 0 0.552-0.448 1-1 1-0.040 0-0.078-0.002-0.117-0.007l0.005 0-5.757-0.572 0.338 2.157 6.392 1.468c0.375 0.088 0.665 0.379 0.751 0.747l0.001 0.007 1.855 8.182 2.277-0.567c0.066-0.015 0.142-0.024 0.22-0.024 0.552 0 1 0.448 1 1 0 0.458-0.308 0.844-0.729 0.963l-0.007 0.002-3.268 0.815c-0.073 0.019-0.156 0.030-0.242 0.030-0.474 0-0.871-0.33-0.974-0.772l-0.001-0.007-1.943-8.566-6.439-1.48c-0.397-0.093-0.698-0.414-0.763-0.813l-0.001-0.006-1.47-9.374zM13.5 6.5c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5v0c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5v0zM13 24.5c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0z"></path>
          </svg>
        </div>
        `
        return `
        <section class="event-details__header">
          <h1>${ev.title}</h1>
          <div class="event-details__location">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>marker</title>
            <path d="M16.5 10.568c-2.209 0-4 1.791-4 4s1.791 4 4 4v0c2.209 0 4-1.791 4-4s-1.791-4-4-4v0M16.5 13.568c0.551 0 1 0.45 1 1s-0.449 1-1 1-1-0.449-1-1c0-0.55 0.449-1 1-1M16.5 3c-6.351 0-11.5 5.15-11.5 11.5 0 8.363 11.5 14.636 11.5 14.636s11.5-6.273 11.5-14.636c0-6.35-5.149-11.5-11.5-11.5M16.5 6c4.687 0 8.5 3.813 8.5 8.5 0 4.592-5.253 9.003-8.5 11.131-3.249-2.13-8.5-6.54-8.5-11.13 0-4.689 3.813-8.501 8.5-8.501"></path>
            </svg>
            <p>${ev.location}</p>
          </div>
          <div class="event-details__date">
          <p>${ev.day_of_week} ${ev.day} juli</p>
          <p>- ${ev.start} > ${ev.end}</p>
          </div>
        </section>
        <section class="event-details__main-flexbox">
          <img class="event-details__image" loading="lazy" src="${ev.image ? ev.image.full : "static/media/images/default-img.png"}" alt="event thumbnail">
          <article>
            ${ev.description === undefined ? '' : description}
            ${ev.url === null ? '' : website}
            <div class="event-details__detail-flexbox">
              <p class="bold">Organisator:</p>
              <p>${ev.organizer}</p>
            </div>
            <div class="event-details__detail-flexbox">
              <p class="bold">Categorieën:</p>
              <p>${(ev.category.length === 3) ? (ev.category[0] + '<br>' + ev.category[1] + '<br>' + ev.category[2]) : (ev.category.length === 2) ? (ev.category[0] + '<br>' + ev.category[1]) : (ev.category[0])}</p>
            </div>
            ${ev.wheelchair_accessible === true ? wheelchairAccessible : ''}
            <div class="event-details__link-flexbox">
              <div class="event-details__link-box"><a href="javascript:void(0)" class="event-details__link-">
                <svg  xmlns="http://www.w3.org/2000/svg"><path d="M21.37 7.277c.014.21.014.419.014.628 0 6.391-4.864 13.755-13.755 13.755-2.739 0-5.283-.793-7.424-2.17.39.045.764.06 1.168.06 2.26 0 4.34-.763 6.002-2.066a4.843 4.843 0 01-4.52-3.352c.299.045.598.074.913.074.434 0 .868-.06 1.272-.164a4.835 4.835 0 01-3.877-4.745v-.06c.644.36 1.392.584 2.185.614a4.831 4.831 0 01-2.155-4.026c0-.898.24-1.721.659-2.44a13.742 13.742 0 009.968 5.059 5.46 5.46 0 01-.12-1.108 4.832 4.832 0 014.835-4.834c1.392 0 2.649.584 3.532 1.527a9.518 9.518 0 003.068-1.168 4.821 4.821 0 01-2.125 2.664 9.692 9.692 0 002.784-.748 10.391 10.391 0 01-2.425 2.5z" fill-rule="nonzero"/></svg>
              </a></div>
              <div class="event-details__link-box"><a href="javascript:void(0)" class="event-details__link-">
                <svg  xmlns="http://www.w3.org/2000/svg"><path d="M17.072 13.474l.655-4.269h-4.096v-2.77c0-1.168.572-2.306 2.407-2.306H17.9V.494S16.21.206 14.594.206c-3.373 0-5.578 2.044-5.578 5.746v3.253h-3.75v4.27h3.75v10.32h4.615v-10.32h3.441z" fill-rule="nonzero"/></svg>
              </a></div>
              <div class="event-details__link-box"><a href="javascript:void(0)" class="event-details__link-">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>pinterest</title>
                <path d="M8.625 13.486c0 1.396 0.614 3.464 2.234 3.911 0.057 0 0.112 0.057 0.224 0.057 0.392 0 0.615-1.006 0.615-1.286 0-0.335-0.895-1.062-0.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-0.838 5.475-3.464 5.475-0.95 0-1.788-0.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-0.838-0.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 0.614 0.057 1.285 0.392 1.844-0.559 2.124-1.62 5.308-1.62 7.487 0 0.671 0.111 1.341 0.167 2.012v0.112l0.168-0.056c1.956-2.459 1.844-2.962 2.738-6.203 0.447 0.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.040 0-3.52-3.297-5.867-6.929-5.867-3.911-0.001-7.822 2.458-7.822 6.425z"></path>
                </svg>
              </a></div>
            </div>
          </article>
        </section>        
        `
      }).join('');

      this.generateOtherEventsFromOrganizer();
    },
    generateOtherEventsFromOrganizer() {
      console.log('4. Generate other events from organizer');

      const filteredData = this.data.filter(ev => ev.organizer === this.organizer)

      this.$otherEventsFromOrganizerTitle.innerHTML = `
      Andere evenementen van ${this.organizer}
      `

      const eventAmount = filteredData.length
      
      for (let i = 0; i < eventAmount; i++) {

        const e = [filteredData[i]];

        const event = e.map((ev) => {
          return `
          <li class="event--raster">
            <a href="evenementen/detail.html?day=${ev.day}&slug=${ev.slug}" class="main__links other-events">
              <p class="other-events__start">${ev.start} u.</p>
              <h3 class="other-events__title">${ev.title}</h3>
              <p class="other-events__location">${ev.location}</p>
            </a>
          </li>
          `
        }).join('');
        this.$otherEventsFromOrganizer.innerHTML += event;
      }

    },

  };
  detail.init();
})();