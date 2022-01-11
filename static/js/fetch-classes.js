function GetEvents() {
  this.getEventData = async () => {
    const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/events_500.json`);
    const data = await response.json();
    return data
  }
}