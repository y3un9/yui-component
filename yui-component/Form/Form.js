/**
 * @author SubwaySamurai
 * @date 2020/10/10
 * @description 表单组件
 */

import Component from './Component';

/**
 * @constructor 表单组件类
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
 * @method 初始化组件
 */
Form.prototype.init = function () {
    // console.log(this.constructor.name, arguments.callee.name);
    if (this.resetBtnElem) {
        this.resetBtnElem.addEventListener('click', this.handleResetBtnClick);
    }
    if (this.submitBtnElem) {
        this.submitBtnElem.addEventListener('click', this.handleSubmitBtnClick);
    }
}
/**
 * @method 重置表单
 */
Form.prototype.reset = function () {
    // console.log(this.constructor.name, arguments.callee.name);
    this.formElem.reset();
}
/**
 * @method 提交表单
 */
Form.prototype.submit = function () {
    // console.log(this.constructor.name, arguments.callee.name);
    // TODO: 需要在子类中重写submit方法
}
/**
 * @method 设置表单数据
 * @param {Object} form_data 
 */
Form.prototype.setFormData = function (form_data) {
    // console.log(this.constructor.name, arguments.callee.name);
    // console.log('form_data', form_data);
    // TODO: 遍历控件元素并赋值各种控件元素
}
/**
 * @method 获取表单数据
 * @returns {Object}
 */
Form.prototype.getFormData = function () {
    // console.log(this.constructor.name, arguments.callee.name);
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
 * @method 处理重置表单按钮click事件
 * @param {MouseEvent} e 
 */
Form.prototype.handleResetBtnClick = function (e) {
    // console.log(this.constructor.name, arguments.callee.name);
    // console.log('e', e);
    // 取消默认动作
    e.preventDefault();
    this.reset();
}
/**
 * @method 处理提交表单按钮click事件
 * @param {MouseEvent} e 
 */
Form.prototype.handleSubmitBtnClick = function (e) {
    // console.log(this.constructor.name, arguments.callee.name);
    // console.log('e', e);
    // 取消默认动作
    e.preventDefault();
    this.submit();
}
export default Form;