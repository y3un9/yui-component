/**
 * @author SubwaySamurai
 * @date 2020/10/10
 * @description 表单组件
 */

import Component from '../Component';

/**
 * @constructor 表单
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Form (selector) {
    Component.call(this, selector);

    /** @type {HTMLFormElement} */
    this.formElem = this.rootElem;
    /** @type {HTMLButtonElement} */
    this.resetBtnElem = null;
    /** @type {HTMLButtonElement} */
    this.submitBtnElem = null;

    this.handleResetBtnClick = this.handleResetBtnClick.bind(this);
    this.handleSubmitBtnClick = this.handleSubmitBtnClick.bind(this);
}
Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;
/**
 * 初始化组件
 * @method init
 */
Form.prototype.init = function () {
    if (this.resetBtnElem) {
        this.resetBtnElem.addEventListener('click', this.handleResetBtnClick);
    }
    if (this.submitBtnElem) {
        this.submitBtnElem.addEventListener('click', this.handleSubmitBtnClick);
    }
}
/**
 * 重置表单
 * @method reset
 */
Form.prototype.reset = function () {
    this.formElem.reset();
}
/**
 * 提交表单
 * @method submit
 */
Form.prototype.submit = function () {
    // TODO: 需要在子类中重写submit方法
}
/**
 * 设置表单数据
 * @method setFormData
 * @param {Object} form_data 
 */
Form.prototype.setFormData = function (form_data) {
    // TODO: 遍历控件元素并赋值各种控件元素
}
/**
 * 获取表单数据
 * @method getFormData
 * @returns {Object}
 */
Form.prototype.getFormData = function () {
    var formData = new FormData(this.formElem);
    // console.log('formData', formData);
    var form_data = {};
    for (var i of formData) {
        var elem_name = i[0];
        var elem_value = i[1];
        form_data[elem_name] = elem_value;
    }
    // console.log('form_data', form_data);
    return form_data;
}
/**
 * 处理重置按钮 click 事件
 * @method handleResetBtnClick
 * @param {MouseEvent} e 
 */
Form.prototype.handleResetBtnClick = function (e) {
    // 取消默认动作
    e.preventDefault();
    this.reset();
}
/**
 * 处理提交按钮 click 事件
 * @method handleSubmitBtnClick
 * @param {MouseEvent} e 
 */
Form.prototype.handleSubmitBtnClick = function (e) {
    // 取消默认动作
    e.preventDefault();
    this.submit();
}
export default Form;