/**
 * @author SubwaySamurai
 * @date 2020/11/27
 * @description 抽屉
 */

import Modal from '../Modal';

/**
 * @constructor 抽屉
 * @extends Modal
 * @param {string|HTMLElement} selector 
 */
function Drawer (selector) {
    Modal.call(this, selector);
}
Drawer.prototype = Object.create(Modal.prototype);
Drawer.prototype.constructor = Drawer;
export default Drawer;