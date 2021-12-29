(() => {
  const imageLinks = [
    "static/media/images/Gentse-feesten-01.jpg",
    "static/media/images/Gentse-feesten-02.jpg",
    "static/media/images/Gentse-feesten-03.jpg",
    "static/media/images/Gentse-feesten-04.jpg",
    "static/media/images/Gentse-feesten-05.jpg",
    "static/media/images/Gentse-feesten-06.jpg",
    "static/media/images/Gentse-feesten-07.jpg",
    "static/media/images/Gentse-feesten-08.jpg",
    "static/media/images/Gentse-feesten-09.jpg",
  ];
    
  const app = {
    init() {
      console.log('1. header image randomizer initialized');
      this.randomizeImage();
    },
    randomizeImage() {
      console.log('2. Randomize image');
      // randomizes number between 0 & 8
      const randomizer = Math.floor(Math.random() * imageLinks.length);
      // shows randomized number in the console
      console.log(randomizer);
      const header = document.getElementById('needsRandomBackground');
      header.classList.add(`background0${randomizer + 1}`);

      // // adds correct image to the randomized number
      // const chosenImage = `<img src="${imageLinks[randomizer]}" alt="Gentse Feesten header ${randomizer + 1}">`;
      // // adds randomized image to the HTML
      // this.$randomImage.innerHTML = chosenImage;
    }
  };
  app.init();
})();