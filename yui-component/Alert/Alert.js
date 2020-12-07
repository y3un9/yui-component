/**
 * @author SubwaySamurai
 * @date 2020/12/07
 * @description 警告框组件
 */

import Dialog from '../Dialog';

/**
 * @constructor 警告框
 * @extends Dialog
 * @param {string|HTMLElement} selector 
 */
function Alert (selector) {
    Dialog.call(this, selector);
}
Alert.prototype = Object.create(Dialog.prototype);
Alert.prototype.constructor = Alert;
/**
 * @method init
 */
Alert.prototype.init = function () {

};
/**
 * @method render
 */
Alert.prototype.render = function () {

};
export default Alert;