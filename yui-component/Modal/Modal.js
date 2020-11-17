/**
 * @author SubwaySamurai
 * @date 2020/10/12
 * @description 模态框组件
 */

import Component from './Component';

/**
 * @constructor 模态框组件
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Modal (selector) {
    Component.call(this, selector);
}
Modal.prototype = Object.create(Component.prototype);
Modal.prototype.constructor = Modal;
/**
 * @method hide
 */
Modal.prototype.hide = function () {
    document.body.classList.remove('modal-open');
    this.rootElem.style.display = 'none';
};
/**
 * @method show
 */
Modal.prototype.show = function () {
    document.body.classList.add('modal-open');
    this.rootElem.style.display = 'block';
};
export default Modal;