/**
 * @author SubwaySamurai
 * @date 2020/10/12
 * @description 对话框组件
 */

import Modal from '../Modal';

/**
 * @constructor 对话框组件
 * @extends Modal
 * @param {string|HTMLElement} selector 
 */
function Dialog (id) {
    Modal.call(this, selector);
}
Dialog.prototype = Object.create(Modal.prototype);
Dialog.prototype.constructor = Dialog;
export default Dialog;