(() => {
const $burgerButton = document.querySelector('.upper__header--burger-menu');
const $crossButton = document.querySelector('.burger-menu__inside--button');
const $menu = document.querySelector('.burger-menu__inside')

$burgerButton.addEventListener('click', (() => {
  $menu.classList.add('burger-menu__inside--visible')
}));

$crossButton.addEventListener('click', (() => {
  $menu.classList.remove('burger-menu__inside--visible')
}));
})();