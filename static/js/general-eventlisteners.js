(() => {
  const eventListeners = {
    init() {

      this.cacheElements();
      this.addEventListenersForHamburgerMenu();
      this.addEventListenersForButtons();
    },
    cacheElements() {

      // for hamburger-menu
      this.$burgerButton = document.querySelector('.upper-header__burger-menu');
      this.$crossButton = document.querySelector('.burger-menu-inside__button');
      this.$menu = document.querySelector('.burger-menu-inside');
      this.$programButton = document.querySelector('.burger-menu-inside__program-button');
      this.$programMenu = document.querySelector('.burger-menu-inside__day-menu');
      this.$chevron = document.querySelector('.chevron');

      // for searchbar-buttons
      this.$headerButton = document.getElementById('header-searchbutton');
      this.$mainButton = document.getElementById('main-searchbutton');

    },
    addEventListenersForHamburgerMenu() {
      /* burger-menu opens and closes with different buttons 
        => 
        need to add class on one button and remove class on other button*/
      this.$burgerButton.addEventListener('click', (() => {
        this.$menu.classList.add('burger-menu-inside__visible')
      }));

      this.$crossButton.addEventListener('click', (() => {
        this.$menu.classList.remove('burger-menu-inside__visible')
      }));

      // programma-menu toggles open and close via one button
      this.$programButton.addEventListener('click', (() => {
        this.$programMenu.classList.toggle('burger-menu-inside__visible')

        if (~this.$chevron.className.indexOf('chevron-down')) {
          this.$chevron.className = this.$chevron.className.replace('chevron-down', 'chevron-up');
        } else {
          this.$chevron.className = this.$chevron.className.replace('chevron-up', 'chevron-down');
        }
      }));

    },
    addEventListenersForButtons() {
      // button in header
      this.$headerButton.addEventListener('click', () => {
        const searchResult = document.getElementById('header-searchbar').value
        console.log(searchResult);
        if (searchResult.length === 0) {
          document.location.href = `evenementen/search.html`
        } else {
          document.location.href = `evenementen/search.html?search=${searchResult}`
        }

      });

      // button in main
      // this part gives an ERROR in the console on pages that don't have a searchbar in main (index.html, news.html & detail.html), but this doesn't affect the working of those webpages
      this.$mainButton.addEventListener('click', () => {
        const searchResult = document.getElementById('main-searchbar').value
        console.log(searchResult);
        if (searchResult.length === 0) {
          document.location.href = `evenementen/search.html`
        } else {
          document.location.href = `evenementen/search.html?search=${searchResult}`
        }

      });
    }
  };
  eventListeners.init();
})();