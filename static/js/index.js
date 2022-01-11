(() => {
 const app = {
   init() {
     console.log('1. Application initialized');

     this.getEvents = new GetEvents();
     
     this.cacheElements();
     this.fetchEventData();
   },
   cacheElements() {
     console.log('2. Cache elements');

     this.$events = document.querySelector('.events-js');
   },
   async fetchEventData() {
     console.log('3. Retrieve event data');
     const data = await this.getEvents.getEventData();
    // console.log(data);
    for(let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random()*data.length);
      // console.log(random);
      const randomData = [data[random]];
      console.log(randomData);
      const event = randomData.map((event) => {
        return `
        <li class="no-bullets">
        <a href="">
          <img class="event__thumbnail" src="${event.image.thumb}" alt="event thumbnail">
          <article class="event__article">
            <div class="event__date">
            <p class="date__day">${(event.day_of_week).slice(0,2)} ${event.day} Jul</p>
            <p class="date__hour">${event.start} u</p>
            </div>
            
          </article>
        </a>
        </li>
        `
      }).join('');
      this.$events.innerHTML += event
    };
    
   }

 };
 app.init();
})();