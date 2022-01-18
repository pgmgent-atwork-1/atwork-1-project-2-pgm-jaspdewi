function GetData() {
  this.getEventData = async () => {
    const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/events_500.json`);
    const data = await response.json();
    return data
  },
  this.getNewsData = async () => {
    const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/news.json`);
    const data = await response.json();
    return data
  }
}