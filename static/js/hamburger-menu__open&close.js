(() => {
const $burgerButton = document.querySelector('.upper__header--burger-menu');
const $crossButton = document.querySelector('.burger-menu__inside--button');
const $menu = document.querySelector('.burger-menu__inside');
const $programButton = document.querySelector('.burger-menu__inside--program-button');
const $programMenu = document.querySelector('.burger-menu__inside--day-menu');
const $chevron = document.querySelector('.chevron');

/* burger-menu opens and closes with different buttons 
   => 
   need to add class on one button and remove class on other button*/
$burgerButton.addEventListener('click', (() => {
  $menu.classList.add('burger-menu__inside--visible')
}));

$crossButton.addEventListener('click', (() => {
  $menu.classList.remove('burger-menu__inside--visible')
}));

// programma-menu toggles open and close via one button
$programButton.addEventListener('click', (() => {
  $programMenu.classList.toggle('burger-menu__inside--visible')

  if(~$chevron.className.indexOf('chevron--down')) {
    $chevron.className = $chevron.className.replace('chevron--down', 'chevron--up');
  }else{
    $chevron.className = $chevron.className.replace('chevron--up', 'chevron--down');
  }
}));
})();