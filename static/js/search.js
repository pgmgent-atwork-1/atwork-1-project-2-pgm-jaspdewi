(() => {
  const search = {
    init() {
      console.log('1. Application initialized');

      this.getData = new GetData();

      this.cacheElements();

    },
    cacheElements() {
      console.log('2. Cache elements');


    },
    
  }
  search.init();
})();