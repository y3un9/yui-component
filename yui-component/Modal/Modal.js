/**
 * @author SubwaySamurai
 * @date 2020/10/12
 * @description 模态框组件
 */

import Component from '../Component';

/**
 * @constructor 模态框组件
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Modal (selector) {
    Component.call(this, selector);

    /** 模态框打开时文档 body 元素的 CSS 类名 */
    this.modalOpenedBodyClassName = 'modal-open';
}
Modal.prototype = Object.create(Component.prototype);
Modal.prototype.constructor = Modal;
/**
 * @method hide
 */
Modal.prototype.hide = function () {
    document.body.classList.remove(this.modalOpenedBodyClassName);
    this.rootElem.style.display = 'none';
};
/**
 * @method show
 */
Modal.prototype.show = function () {
    document.body.classList.add(this.modalOpenedBodyClassName);
    this.rootElem.style.display = 'block';
};
export default Modal;