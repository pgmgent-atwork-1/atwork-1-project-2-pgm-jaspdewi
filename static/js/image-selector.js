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
      this.cacheElements();
      this.randomizeImage();
    },
    cacheElements() {
      console.log('2. Cache elements');
      this.$randomImage = document.querySelector('.random-image_js');
    },
    randomizeImage() {
      console.log('3. Randomize image');
      const randomizer = Math.floor(Math.random() * imageLinks.length);
      console.log(randomizer);
      const chosenImage = `<img src="${imageLinks[randomizer]}" alt="Gentse Feesten header ${randomizer + 1}">`;
      this.$randomImage.innerHTML = chosenImage;
    }

  };
  app.init();
})();