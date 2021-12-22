import { changeHP } from '../Utils/utils.js';
import { renderHP, elHP } from '../UI/ui.js';

/**
 * function create new object player from template
 * @param {Number} id 
 * @param {String} name 
 * @param {String} img 
 * @returns Object
 */
export function createPlayerObject(id, name, img) {
   this.id = id;
   this.name = name;
   this.img = img;

   const hp = 100;

return new Object({
                   id,
                   name,
                   hp,
                   img  
                  })
}

Object.prototype.changeHP = changeHP;
Object.prototype.renderHP = renderHP;
Object.prototype.elHP = elHP;