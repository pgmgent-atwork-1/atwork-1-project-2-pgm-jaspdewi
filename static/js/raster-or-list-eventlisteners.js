(() => {
  const eventListeners = {
    init() {
      this.cacheElements();
      this.createEventListeners();
    },
    cacheElements() {
      this.$buttons = document.querySelector('.display-toggle-buttons');
      this.$listButton = document.querySelector('.display-toggle-button--list');
      this.$rasterButton = document.querySelector('.display-toggle-button--raster');
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
            event.classList.add('invisible');
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
            event.classList.remove('invisible');
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
  }
  eventListeners.init();
})();