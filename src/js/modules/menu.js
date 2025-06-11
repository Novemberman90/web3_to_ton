export const initMenu = () => {

  const submenuBtn = document.querySelector('.menu__submenu-btn'),
        submenu = document.querySelector('.submenu'),
        headerMenuBtn = document.querySelector('.header__menu-btn'),
        menuList = document.querySelector('.menu__list'),
        menuBlock = document.querySelector('.header__menu-block');

  menuBlock.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;

    // Клик по кнопке открытия главного меню
    if (target.closest('.header__menu-btn')) {
      menuList.classList.toggle('menu__list--active');
      // Закрыть подменю, если оно открыто
      submenu.classList.remove('submenu--active');
    }

    // Клик по кнопке подменю
    if (target.closest('.menu__submenu-btn') ) {
      submenu.classList.toggle('submenu--active');
      submenuBtn.classList.toggle('menu__submenu-btn--active');
    } 

    // Клик по кнопке "Back to Menu"
    if (target.closest('.submenu__btn-back')) {
      submenu.classList.remove('submenu--active');
      submenuBtn.classList.remove('menu__submenu-btn--active');
    }
  });

  return{submenu, submenuBtn, headerMenuBtn, menuList}
}