/**
 * @author SubwaySamurai
 * @date 2020/10/10
 * @description 表单组件
 */

import util from '../../../util';
import Component from '../Component';

/**
 * @constructor 表单
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Form (selector) {
    Component.call(this, selector);
    
    this.state = {
        formConfig: [],
        formData: {}
    };

    /** @type {HTMLFormElement} */
    this.formElem = this.rootElem;
    /** @type {HTMLButtonElement} */
    this.resetBtnElem = null;
    /** @type {HTMLButtonElement} */
    this.submitBtnElem = null;

    this.handleFormLabelClick = this.handleFormLabelClick.bind(this);
    this.handleResetBtnClick = this.handleResetBtnClick.bind(this);
    this.handleSubmitBtnClick = this.handleSubmitBtnClick.bind(this);
}
Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;
/**
 * @method create
 */
Form.prototype.create = function () {
    
}
/**
 * 初始化组件
 * @method init
 */
Form.prototype.init = function () {
    // 元素事件绑定
    util.delegate(this.formElem, 'click', 'label[for="*"]', this.handleFormLabelClick);
    util.delegate(this.formElem, 'click', 'button[type="reset"]', this.handleResetBtnClick);
    util.delegate(this.formElem, 'click', 'button[type="submit"]', this.handleSubmitBtnClick);
    // 子组件初始化
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
    // 目前支持的控件元素类型有：
    // 1. Text Input
    // 2. Number Input
    // 3. Phone Input
    // 4. Email Input
    // 5. Password Input
    // 6. Text Area
    // 7. Switch Button
    // 8. Number Stepper
    // 9. Select
    // 10. Radio Button
    // 11. Checkbox Button
    // 12. DatePicker（未完成）
    // 13. DateTimerPicker（未完成）
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

    var formData = {};
    var formConfig = this.state.formConfig;
    formConfig.forEach(function (item, index, array) {
        
    });
    console.log('formData', formData);
    return formData;
}
/**
 * 处理表单标签 click 事件
 * @method handleFormLabelClick
 * @param {MouseEvent} e 
 * @param {HTMLElement} elem 
 */
Form.prototype.handleFormLabelClick = function (e, elem) {
    var formControlName = elem.getAttribute('for');
    if (formControlName === '') {
        return;
    }
    var formControlElements = this.formElem.querySelectorAll(`[name="${formControlName}"]`);
    if (formControlElements.length === 0) {
        return;
    }
    formControlElements[0].focus();
}
/**
 * 处理重置按钮 click 事件
 * @method handleResetBtnClick
 * @param {MouseEvent} e 
 * @param {HTMLElement} elem
 */
Form.prototype.handleResetBtnClick = function (e, elem) {
    // 取消默认动作
    e.preventDefault();
    this.reset();
}
/**
 * 处理提交按钮 click 事件
 * @method handleSubmitBtnClick
 * @param {MouseEvent} e 
 * @param {HTMLElement} elem
 */
Form.prototype.handleSubmitBtnClick = function (e, elem) {
    // 取消默认动作
    e.preventDefault();
    this.submit();
}
export default Form;