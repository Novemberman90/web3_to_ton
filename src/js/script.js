require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


import '../scss/styles.scss';
import {initMenu} from "./modules/menu.js";


window.addEventListener('DOMContentLoaded', ()=>{
   
  initMenu();
});