function GetData() {
  this.getEventData = async () => {
      try {
        const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/events_500.json`);
        const data = await response.json();
        data.sort((a, b) => {
          if (a.start > b.start) {
            return 1;
          } else if (a.start < b.start) {
            return -1;
          }
          return 0;
        })
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    this.getNewsData = async () => {
        try {
          const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/news.json`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
        }
      },
      this.getCategoryData = async () => {
        try {
        const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/categories.json`);
        const data = await response.json();
        return data;
      }catch (error) {
        console.error(error);
      }
    }

}