import { renderHP, elHP } from '../UI/ui.js';
import { playerAttack, enemyAttack } from '../Game/gameEvent.js';

//Неудалось так описать объект. Пришлось пробросить elHP извне. Буду думать, как полностью описать обьект
class ElementHP {
   // constructor(id) {
   //    this.elHP = document.querySelector(`.player${this.id} .life`);
   // }
}

export default class PlayerObject extends ElementHP {
   constructor({id, name, img}) {
      super(id);
      this.id = id;
      this.name = name;
      this.img = img;
      this.hp = 100;

      this.elHP = elHP;
      this.renderHP = renderHP;
      
   }

   changeHP = damage => {
                           this.hp -= damage;
                           if (this.hp <= 0) this.hp = 0;
                        }
}

//Так же пришлось завести два класса, чтобы каждому заменять свой attack
export class Player1 extends PlayerObject {
   attack = playerAttack;
 }
 
export class Player2 extends PlayerObject {
   attack = enemyAttack;
 }