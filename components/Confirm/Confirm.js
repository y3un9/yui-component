/**
 * @author SubwaySamurai
 * @date 2020/10/12
 * @description 确认框组件
 */

import Dialog from '../Dialog';

/**
 * @function confirmCallback
 * @description 未指定confirm方法时的默认回调函数
 */
function confirmCallback () {
    console.log('未指定confirm方法');
};
/**
 * @constructor 确认框组件
 * @extends Dialog
 * @param {string|HTMLElement} selector 
 */
function Confirm (selector) {
    Dialog.call(this, selector);
    
    this.cancelBtnElem = this.rootElem.querySelector('button[data-action="cancel"]');
    this.confirmBtnElem = this.rootElem.querySelector('button[data-action="confirm"]');

    this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
    this.handleConfirmBtnClick = this.handleConfirmBtnClick.bind(this);
}
Confirm.prototype = Object.create(Dialog.prototype);
Confirm.prototype.constructor = Confirm;
/**
 * @method init
 */
Confirm.prototype.init = function () {
    this.cancelBtnElem.addEventListener('click', this.handleCancelBtnClick);
    this.confirmBtnElem.addEventListener('click', this.handleConfirmBtnClick);
};
/**
 * @method open
 * @param {Function} callback 
 */
Confirm.prototype.open = function (callback) {
    if (typeof callback === 'function') {
        this.confirm = callback;
    } else {
        this.confirm = confirmCallback;
    }
    this.show();
};
/**
 * @method confirm
 */
Confirm.prototype.confirm = confirmCallback;
/**
 * @method handleCancelBtnClick
 * @param {MouseEvent} e 
 */
Confirm.prototype.handleCancelBtnClick = function (e) {
    this.hide();
};
/**
 * @method handleConfirmBtnClick
 * @param {MouseEvent} e 
 */
Confirm.prototype.handleConfirmBtnClick = function (e) {
    this.confirm();
};
export default Confirm;