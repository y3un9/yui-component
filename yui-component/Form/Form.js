/**
 * @author SubwaySamurai
 * @date 2020/10/10
 * @description 表单组件
 */

import './Form.css';

import Component from '../Component';
import formControls from './FormControls';
import FormValidator from './FormValidator';

import util from '../../../util';

// 目前支持的控件元素类型有：
// 1. Hidden
// 2. Plain Text
// 3. Text Input
// 4. Number Input
// 5. Phone Input
// 6. Email Input
// 7. Password Input
// 8. Text Area
// 9. Switch Button
// 10. Number Stepper
// 11. Select
// 12. Radio Button
// 13. Checkbox Button
// 14. DatePicker（未完成, 暂时用 bootstrap-datetimepicker 代替）
// 15. TimePicker (未完成, 暂时用 bootstrap-datetimepicker 代替)
// 16. DateTimerPicker（未完成, 暂时用 bootstrap-datetimepicker 代替）

/**
 * @typedef {Object} FormItem 表单项
 * @property {string} key 键值名
 * @property {string} type 控件类型
 * @property {string} [title] 标签名
 * @property {string} [description] 说明
 * @property {number | string} [value] 控件值
 * @property {number | string} [default] 控件默认值
 * @property {boolean} [disabled] 是否禁用
 * @property {boolean} [required] 不允许空值
 * @property {FormItemOption} option 控件选项
 */

/**
 * @typedef {HiddenOption|PlainTextOption|TextInputOption|NumberInputOption|PhoneInputOption|EmailInputOption|PasswordInputOption|TextAreaOption|SwitcherOption|StepperOption|SelectorOption|RadioOption|CheckboxOption} FormItemOption 
 */

/**
 * @typedef {Object} HiddenOption 隐藏选项
 */

/**
 * @typedef {Object} PlainTextOption 纯文本选项
 */

/**
 * @typedef {Object} TextInputOption 文字输入框选项
 * @property {string} placeholder 占位符
 * @property {number} minLength 最小输入字数
 * @property {number} maxLength 最大输入字数
 */

/**
 * @typedef {Object} NumberInputOption 数字输入框选项
 * @property {string} placeholder 占位符
 * @property {number} min 最小值
 * @property {number} max 最大值
 */

/**
 * @typedef {Object} PhoneInputOption 电话输入框选项
 * @property {string} placeholder 占位符
 * @property {number} length 合法长度
 */

/**
 * @typedef {Object} EmailInputOption 邮件输入框选项
 * @property {string} placeholder 占位符
 * @property {Array<string>} hostnames 允许域名列表
 */

/**
 * @typedef {Object} PasswordInputOption 密码输入框选项
 * @property {string} placeholder 占位符
 * @property {number} minLength 最小输入字数
 * @property {number} maxLength 最大输入字数
 */

/**
 * @typedef {Object} TextAreaOption 段落输入框选项
 * @property {string} placeholder 占位符
 * @property {number} minLength 最小输入字数
 * @property {number} maxLength 最大输入字数
 */

/**
 * @typedef {Object} SwitcherOption 开关选项
 * @property {{ value: number | string, title?: string, description?: string }} on 
 * @property {{ value: number | string, title?: string, description?: string }} off 
 */

/**
 * @typedef {Object} StepperOption 步进器选项
 * @property {number} min
 * @property {number} max
 * @property {number} step 
 */

/**
 * @typedef {Object} SliderOption 滑动选择器选项
 * @property {number} min
 * @property {number} max
 * @property {number} step
 * @property {Array<{ value: number, text: string }>} marks
 * @property {boolean} showMarks
 */

/**
 * @typedef {Object} SelectorOption 选择器选项
 * @property {string} placeholder 占位符
 * @property {Array<{ value: number | string, title: string, description?: string, disabled?: boolean }>} options
 */

/**
 * @typedef {Object} RadioOption 单选按钮组选项
 * @property {Array<{ value: number | string, title: string, description?: string, disabled?: boolean }>} options
 */

/**
 * @typedef {Object} CheckboxOption 多选按钮组选项
 * @property {Array<{ value: number | string, title: string, description?: string, disabled?: boolean }>} options
 */

/**
 * @typedef {Object} DatePickerOption 日期选择器选项
 */

/**
 * @typedef {Object} TimePickerOption 时间选择器选项
 */

/**
 * @typedef {Object} DateTimePickerOption 日期时间选择器选项
 */

/**
 * @constructor 表单
 * @extends Component
 * @param {string | HTMLElement} selector 
 */
function Form (selector) {
    // super constructor
    Component.apply(this, arguments);
    
    this.state = {
        /** @type {Array<FormItem>} */
        formConfigs: [],
        explainRequiredTextSuffix: '不能为空',
        explainRequiredInputTextPrefix: '请填写',
        explainRequiredInputTextSuffix: '为必填项',
        explainRequiredInputMinLengthTextSuffix: '最小长度为',
        explainRequiredInputMaxLengthTextSuffix: '最大长度为',
        explainRequiredNumberMinTextSuffix: '小于最小值',
        explainRequiredNumberMaxTextSuffix: '大于最大值',
        explainRequiredSelectTextPrefix: '请选择',
        explainRequiredSelectTextSuffix: '为必选项',

        validateSuccessClassName: 'has-success',
        validateWarningClassName: 'has-warning',
        validateErrorClassName: 'has-error'
    };

    /** 校验状态常量 */
    this.VALIDATE_STATUS = FormValidator.VALIDATE_STATUS;

    /** @type {HTMLFormElement} */
    this.formElem = this.rootElem;
    /** @type {HTMLButtonElement} */
    this.resetBtnElem = null;
    /** @type {HTMLButtonElement} */
    this.submitBtnElem = null;

    this.handleFormLabelClick = this.handleFormLabelClick.bind(this);
    this.handleResetBtnClick = this.handleResetBtnClick.bind(this);
    this.handleSubmitBtnClick = this.handleSubmitBtnClick.bind(this);

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    this.handlePhoneInputChange = this.handlePhoneInputChange.bind(this);
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleSliderFocus = this.handleSliderFocus.bind(this);
    this.handleSliderBlur = this.handleSliderBlur.bind(this);
    this.handleSliderInput = this.handleSliderInput.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this);
    this.handleDateTimePickerChange = this.handleDateTimePickerChange.bind(this);
    this.handleTransferSelectItemBtnClick = this.handleTransferSelectItemBtnClick.bind(this);
    this.handleTransferUnselectItemBtnClick = this.handleTransferUnselectItemBtnClick.bind(this);
    this.handleTransferSelectAllItemBtnClick = this.handleTransferSelectAllItemBtnClick.bind(this);
    this.handleTransferUnselectAllItemBtnClick = this.handleTransferUnselectAllItemBtnClick.bind(this);
    this.handleTransferCheckboxChange = this.handleTransferCheckboxChange.bind(this);
    this.handleTransferListAllSelectItemCheckboxChange = this.handleTransferListAllSelectItemCheckboxChange.bind(this);
    this.handleTransferListSelectedSelectItemCheckboxChange = this.handleTransferListSelectedSelectItemCheckboxChange.bind(this);
    this.handleTransferListAllSelectAllCheckboxChange = this.handleTransferListAllSelectAllCheckboxChange.bind(this);
    this.handleTransferListSelectedSelectAllCheckboxChange = this.handleTransferListSelectedSelectAllCheckboxChange.bind(this);
}
Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;
Form.prototype.formController = formControls;
/**
 * 根据表单配置进行
 * @method create
 */
Form.prototype.create = function () {
    var self = this;
    // 清除表单模板
    var template = '';
    this.formElem.innerHTML = template;
    // 判断表单数据合理性
    if (!Array.isArray(this.state.formConfigs)) {
        return;
    }
    // 进行表单模板创建
    template = this.state.formConfigs.reduce(util.makeReduceCallbackStringConcat(this.renderFormItem.bind(this)), '');
    this.formElem.innerHTML = template;
}
/**
 * 初始化组件
 * @method init
 */
Form.prototype.init = function () {
    this.resetBtnElem = this.formElem.querySelector('button[type="reset"]');
    this.submitBtnElem = this.formElem.querySelector('button[type="submit"]');
    
    // element event binding
    util.delegate(this.formElem, 'click', 'label[for="*"]', this.handleFormLabelClick);
    util.delegate(this.formElem, 'click', 'button[type="reset"]', this.handleResetBtnClick);
    util.delegate(this.formElem, 'click', 'button[type="submit"]', this.handleSubmitBtnClick);
    
    // if (this.resetBtnElem) {
    //     this.resetBtnElem.addEventListener('click', this.handleResetBtnClick, false);
    // }
    // if (this.submitBtnElem) {
    //     this.submitBtnElem.addEventListener('click', this.handleSubmitBtnClick, false);
    // }

    util.delegate(this.formElem, 'input', 'input[type="text"]', this.handleTextInputChange);
    util.delegate(this.formElem, 'input', 'input[type="number"]', this.handleNumberInputChange);
    util.delegate(this.formElem, 'input', 'input[type="phone"]', this.handlePhoneInputChange);
    util.delegate(this.formElem, 'input', 'input[type="email"]', this.handleEmailInputChange);
    util.delegate(this.formElem, 'input', 'input[type="password"]', this.handlePasswordInputChange);
    util.delegate(this.formElem, 'input', 'textarea', this.handleTextAreaChange);
    util.delegate(this.formElem, 'focus', 'input[type="range"]', this.handleSliderFocus, true);
    util.delegate(this.formElem, 'blur', 'input[type="range"]', this.handleSliderBlur, true);
    util.delegate(this.formElem, 'input', 'input[type="range"]', this.handleSliderInput);
    util.delegate(this.formElem, 'change', 'input[type="range"]', this.handleSliderChange);
    util.delegate(this.formElem, 'change', 'select', this.handleSelectChange);
    util.delegate(this.formElem, 'change', 'input[type="radio"]', this.handleRadioChange);
    util.delegate(this.formElem, 'change', 'input[type="checkbox"]', this.handleCheckboxChange);
    util.delegate(this.formElem, 'click', '.transfer button[data-action="SelectItem"]', this.handleTransferSelectItemBtnClick);
    util.delegate(this.formElem, 'click', '.transfer button[data-action="UnselectItem"]', this.handleTransferUnselectItemBtnClick);
    util.delegate(this.formElem, 'click', '.transfer button[data-action="SelectAll"]', this.handleTransferSelectAllItemBtnClick);
    util.delegate(this.formElem, 'click', '.transfer button[data-action="UnselectAll"]', this.handleTransferUnselectAllItemBtnClick);
    util.delegate(this.formElem, 'change', '.transfer input[type="checkbox"]', this.handleTransferCheckboxChange);
    
    // sub component initializing
    this.initDatePicker();
    this.initTimePicker();
    this.initDateTimePicker();
    // this.initTransfer();
}
/**
 * @method  initDatePicker
 */
Form.prototype.initDatePicker = function () {
    var self = this;
    // find all DatePicker form control initialize bootstrap datetimepicker
    this.state.formConfigs.forEach(function (item, index, array) {
        if (item.type !== 'DatePicker') {
            return;
        }
        var formControlElem = self.formElem.querySelector(`input[name="${item.key}"]`);
        if (!formControlElem) {
            return;
        }
        var dtPicker = $(formControlElem).datetimepicker({
            format: (item.option || {}).format || 'yyyy-mm-dd',
            weekStart: 0,
            // startDate: '',
            // endDate: '',
            // daysOfWeekDisabled: [],
            autoclose: true,
            startView: 2,
            minView: 2,
            maxView: 4,
            todayBtn: true,
            todayHighlight: true,
            clearBtn: true,
            keyboardNavigation: false,
            language: 'zh-CN',
            forceParse: true,
            // minuteStep: 5,
            pickerPosition: 'bottom-left',
            showMeridian: false,
            // initialDate: ''
        });
        dtPicker.on('changeDate', self.handleDatePickerChange);
        self.setState({
            formConfigs: [].concat(
                array.slice(0, index),
                Object.assign({}, item, {
                    instance: dtPicker
                }),
                array.slice(index + 1)
            )
        });
    });
}
/**
 * @method initTimePicker
 */
Form.prototype.initTimePicker = function () {
    // find all TimePicker form control initialize bootstrap datetimepicker
}
/**
 * @method initDateTimePicker
 */
Form.prototype.initDateTimePicker = function () {
    var self = this;
    // find all DateTimePicker form control initialize bootstrap datetimepicker
    this.state.formConfigs.forEach(function (item, index, array) {
        if (item.type !== 'DateTimePicker') {
            return;
        }
        var formControlElem = self.formElem.querySelector(`input[name="${item.key}"]`);
        if (!formControlElem) {
            return;
        }
        var dtPicker = $(formControlElem).datetimepicker({
            format: (item.option || {}).format || 'yyyy-mm-dd hh:ii:ss',
            weekStart: 0,
            // startDate: '',
            // endDate: '',
            // daysOfWeekDisabled: [],
            autoclose: true,
            startView: 2,
            minView: 0,
            maxView: 4,
            todayBtn: true,
            todayHighlight: true,
            clearBtn: true,
            keyboardNavigation: false,
            language: 'zh-CN',
            forceParse: false,
            minuteStep: 1,
            pickerPosition: 'bottom-left',
            showMeridian: false,
            // initialDate: ''
        });
        dtPicker.on('changeDate', self.handleDateTimePickerChange);
        self.setState({
            formConfigs: [].concat(
                array.slice(0, index),
                Object.assign({}, item, {
                    instance: dtPicker
                }),
                array.slice(index + 1)
            )
        });
    });
}
/**
 * @method initTransfer
 */
Form.prototype.initTransfer = function () {
    var self = this;
    // find all Transfer formConfigItem
    var formConfigItemsTransfer = this.state.formConfigs.filter(function (item, index, array) {
        return item.type === 'Transfer';
    });
    // bind Transfer event listen handler to wrapper elem
    formConfigItemsTransfer.forEach(function (item, index, array) {
        var wrapperElem = self.formElem.querySelector(`.transfer[data-name="${item.key}"]`);
        if (wrapperElem) {
            util.delegate(wrapperElem, 'click', 'button[data-action="SelectItem"]', self.handleTransferSelectItemBtnClick);
            util.delegate(wrapperElem, 'click', 'button[data-action="UnselectItem"]', self.handleTransferUnselectItemBtnClick);
            util.delegate(wrapperElem, 'click', 'button[data-action="SelectAll"]', self.handleTransferSelectAllItemBtnClick);
            util.delegate(wrapperElem, 'click', 'button[data-action="UnselectAll"]', self.handleTransferUnselectAllItemBtnClick);
            util.delegate(wrapperElem, 'change', 'input[type="checkbox"]', self.handleTransferCheckboxChange);
        }
    });
}
/**
 * 重置表单
 * @method reset
 */
Form.prototype.reset = function () {
    var self = this;

    this.formElem.reset();

    // // @deprecated 2021/10/12 一次性将所有表单项赋值, 赋值时基于执行此函数的一整个 formConfigs
    // this.setFormData(this.state.formConfigs.reduce(function (previous, item, index, array) {
    //     var value = '';
    //     // if (item.hasOwnProperty('value')) {
    //     //     value = item['value'];
    //     // }
    //     if (item.hasOwnProperty('default')) {
    //         value = item['default'];
    //     }
    //     return Object.assign({}, previous, {
    //         [item.key]: value
    //     });
    // }, {}));

    // 针对每一个表单项赋值时始终基于每个表单项的最新对象 !!!
    // 应用的场景是: 此处针对所有表单项按顺序重新赋值, 前面的表单项值改变时可能会触发 "后面未执行到的表单项" 默认值重新赋值, 
    // 所以执行到后面默认值已被改变的表单项来重新赋值时, 需要取到最新的表单项对象
    this.state.formConfigs.forEach(function (item, index, array) {
        var value = '';
        // // @deprecated 2021/10/12 需要重新从 formConfigs 取最新的每个表单项值, 否则与上面无异
        // if (item.hasOwnProperty('default')) {
        //     value = item['default'];
        // }
        var formConfigItem = util.getTargetItemFromArrayByKey(
            self.state.formConfigs,
            item.key,
            'key'
        );
        if (
            formConfigItem
            && formConfigItem.hasOwnProperty('default')
        ) {
            value = formConfigItem['default'];
        }
        self.setFormData({
            [item.key]: value
        });
    });
}
/**
 * 提交表单
 * @method submit
 */
Form.prototype.submit = function () {
    // 需要在子类中重写submit方法
}
/**
 * 验证表单
 * @method validate
 * @returns {boolean}
 */
Form.prototype.validate = function () {
    // if (!Array.isArray(this.state.formConfigs)) {
    //     return true;
    // }
    // return this.state.formConfigs.every(this.validateFormItem.bind(this));

    var self = this;
    if (!Array.isArray(this.state.formConfigs)) {
        return true;
    }
    var formData = this.getFormData();
    return this.state.formConfigs.every(function (item, index, array) {
        return self.validateFormItem.call(self, item, formData);
    });
}
/**
 * 验证表单项
 * @method validateFormItem
 * @param {FormItem} formConfigItem 
 * @param {Object} formData
 * @returns {boolean}
 */
Form.prototype.validateFormItem = function (formConfigItem, formData) {
    // 不同表单项的验证方式不一样
    var formItemKey = formConfigItem.key;
    var formItemType = formConfigItem.type;
    var validatorFunc = (
        (this.formController[formItemKey] || {}).validate
        || (this.formController[formItemType] || {}).validate
    );
    // console.log('validatorFunc', validatorFunc);
    if (typeof validatorFunc === 'function') {
        var result = validatorFunc.call(this, formConfigItem, formData[formItemKey], formData);
        // 验证函数只返回验证结果标志
        if (typeof result === 'boolean') {
            // 根据验证结果改变表单项反馈样式
            this.setFormItemFeedback(formConfigItem, {
                flag: result,
                status: this.VALIDATE_STATUS.NONE,
                help: ''
            });
            return result;
        }
        // 验证函数返回验证结果对象
        if (result && typeof result === 'object') {
            // 根据验证结果改变表单项反馈样式
            this.setFormItemFeedback(formConfigItem, result);
            return result.flag;
        }
        return false;
    } else {
        return true;
    }
}
Form.prototype.setFormSubmitting = function (flag) {
    var self = this;
    if (flag) {
        if (this.resetBtnElem) {
            this.resetBtnElem.setAttribute('disabled', '');
        }
        if (this.submitBtnElem) {
            this.submitBtnElem.classList.add('btn-loading');
        }
        this.state.formConfigs.forEach(function (item, index, array) {
            var formControlElems = self.querySelectorAll(`*[name="${item.key}"]`);
            Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
                elem.setAttribute('disabled', '');
            });
        });
    } else {
        if (this.resetBtnElem) {
            this.resetBtnElem.removeAttribute('disabled');
        }
        if (this.submitBtnElem) {
            this.submitBtnElem.removeAttribute('disabled', '');
        }
        this.state.formConfigs.forEach(function (item, index, array) {
            var formControlElems = self.querySelectorAll(`*[name="${item.key}"]`);
            if ([
                'Radio',
                'Checkbox'
            ].includes(item.type)) {
                var { option: { options = [] } } = item;
                Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
                    if (item.disabled) {
                        return;
                    }
                    var targetOption = util.getTargetItemFromArrayByKey(options, elem.value, 'value');
                    if (
                        targetOption
                        && targetOption.disabled
                    ) {
                        return;
                    }
                    elem.removeAttribute('disabled');
                });
                return;
            }
            Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
                if (!item.disabled) {
                    elem.removeAttribute('disabled');
                }
            });
        });
    }
}
Form.prototype.setFormDisabled = function (flag) {
    var self = this;
    if (flag) {
        if (this.resetBtnElem) {
            this.resetBtnElem.setAttribute('disabled', '');
        }
        if (this.submitBtnElem) {
            this.submitBtnElem.classList.remove('btn-loading');
        }
        this.state.formConfigs.forEach(function (item, index, array) {
            var formControlElems = self.querySelectorAll(`*[name="${item.key}"]`);
            Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
                elem.setAttribute('disabled', '');
            });
        });
    } else {
        if (this.resetBtnElem) {
            this.resetBtnElem.removeAttribute('disabled');
        }
        if (this.submitBtnElem) {
            this.submitBtnElem.removeAttribute('disabled', '');
        }
        this.state.formConfigs.forEach(function (item, index, array) {
            var formControlElems = self.querySelectorAll(`*[name="${item.key}"]`);
            if ([
                'Radio',
                'Checkbox'
            ].includes(item.type)) {
                var { option: { options = [] } } = item;
                Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
                    if (item.disabled) {
                        return;
                    }
                    var targetOption = util.getTargetItemFromArrayByKey(options, elem.value, 'value');
                    if (
                        targetOption
                        && targetOption.disabled
                    ) {
                        return;
                    }
                    elem.removeAttribute('disabled');
                });
                return;
            }
            Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
                if (!item.disabled) {
                    elem.removeAttribute('disabled');
                }
            });
        });
    }
}
/**
 * 设置表单项反馈
 * @method setFormItemFeedback
 * @param {FormItem} data 
 * @param {ValidateResult} result 
 */
Form.prototype.setFormItemFeedback = function (data, result) {
    var elem = this.rootElem.querySelector(`[name="${data.key}"]`);
    if (!elem) {
        return;
    }
    var form_control_elem = util.findTargetParentElement(elem, '.form-group');
    var form_explain_elem = form_control_elem && form_control_elem.querySelector('.form-explain');
    if (form_control_elem) {
        // remove all feedback class name
        form_control_elem.classList.remove(
            this.state.validateSuccessClassName,
            this.state.validateWarningClassName,
            this.state.validateErrorClassName
        );
        // feedback success
        if (result.status === this.VALIDATE_STATUS.SUCCESS) {
            form_control_elem.classList.add(this.state.validateSuccessClassName);
        }
        // feedback warning
        if (result.status === this.VALIDATE_STATUS.WARNING) {
            form_control_elem.classList.add(this.state.validateWarningClassName);
        }
        // feedback error
        if (result.status === this.VALIDATE_STATUS.ERROR) {
            form_control_elem.classList.add(this.state.validateErrorClassName);
        }
    }
    if (form_explain_elem) {
        form_explain_elem.innerHTML = result.help;
    }
};
/**
 * 设置表单数据
 * @method setFormData
 * @param {Object} data 
 */
Form.prototype.setFormData = function (data) {
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

    console.log('setFormData', this, data);

    var self = this;
    Object.keys(data).forEach(function (key, index, array) {
        var targetConfig = util.getTargetItemFromArrayByKey(self.state.formConfigs, key, 'key');
        // console.log('targetConfig', targetConfig);
        if (!targetConfig) {
            return;
        }
        var formItemKey = targetConfig.key;
        var formItemType = targetConfig.type;
        var setterFunc = (
            (self.formController[formItemKey] || {}).set
            || (self.formController[formItemType] || {}).set
        );
        // console.log('setterFunc', setterFunc);
        if (typeof setterFunc === 'function') {
            setterFunc.call(self, targetConfig, data[key], data);
        }
    });
}
/**
 * 获取表单数据
 * @method getFormData
 * @returns {Object}
 */
Form.prototype.getFormData = function () {
    // var form_data = new FormData(this.formElem);
    // var formData = {};
    // for (var item of form_data) {
    //     formData[item[0]] = item[1];
    // }
    // return formData;

    var self = this;
    var formData = this.state.formConfigs.reduce(function (total, item, index, array) {
        var formItemKey = item.key;
        var formItemType = item.type;
        var getterFunc = (
            (self.formController[formItemKey] || {}).get
            || (self.formController[formItemType] || {}).get
        );
        if (typeof getterFunc === 'function') {
            return Object.assign({}, total, {
                [formItemKey]: getterFunc.call(self, item)
            });
        } else {
            return Object.assign({}, total, {
                [formItemKey]: ''
            });
        }
    }, {});

    console.log('getFormData', this, formData);

    return formData;
}
/**
 * 获取表单项标签包裹元素类名
 * @method getFormLabelWrapperClassName
 * @param {FormItem} data 
 * @returns {string}
 */
Form.prototype.getFormLabelWrapperClassName = function (data) {
    return `form-label ${this.getFormLabelRequiredClassName(data)}`;
}
/**
 * 获取表单项标签必填项类名
 * @method getFormLabelRequiredClassName
 * @param {FormItem} data
 * @returns {string}
 */
Form.prototype.getFormLabelRequiredClassName = function (data) {
    if (data.required) {
        return 'form-label-required';
    } else {
        return '';
    }
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
 * @param {HTMLButtonElement} elem
 */
Form.prototype.handleResetBtnClick = function (e, elem) {
    // console.log('handleResetBtnClick', 'e', e, e.target, e.currentTarget, 'elem', elem);

    // 取消默认动作 ( 防止表单元素执行 reset )
    e.preventDefault();
    // 停止冒泡 
    e.stopPropagation();
    this.reset();
}
/**
 * 处理提交按钮 click 事件
 * @method handleSubmitBtnClick
 * @param {MouseEvent} e 
 * @param {HTMLButtonElement} elem
 */
Form.prototype.handleSubmitBtnClick = function (e, elem) {
    // console.log('handleSubmitBtnClick', 'e', e, e.target, e.currentTarget, 'elem', elem);

    // 取消默认动作 ( 防止表单元素执行 submit )
    e.preventDefault();
    // 停止冒泡
    e.stopPropagation();
    this.submit();
}
/**
 * handler of "TextInput" control element "input" event
 * @method handleTextInputChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 * @returns 
 */
Form.prototype.handleTextInputChange = function (e, elem) {
    // console.log('handleTextInputChange', e, elem);
    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.TextInput.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "NumberInput" control element "input" event
 * @method handleNumberInputChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 * @returns 
 */
Form.prototype.handleNumberInputChange = function (e, elem) {
    // console.log('handleNumberInputChange', e, elem);
    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.NumberInput.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "PhoneInput" control element "input" event
 * @method handleNumberInputChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 * @returns 
 */
Form.prototype.handlePhoneInputChange = function (e, elem) {
    console.log('handlePhoneInputChange', e, e.target.value, elem);
    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.PhoneInput.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "EmailInput" control element "input" event
 * @method handleEmailInputChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 * @returns 
 */
Form.prototype.handleEmailInputChange = function (e, elem) {
    // console.log('handleEmailInputChange', e, elem);
    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.EmailInput.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "PasswordInput" control element "input" event
 * @method handlePasswordInputChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 * @returns 
 */
Form.prototype.handlePasswordInputChange = function (e, elem) {
    // console.log('handlePasswordInputChange', e, elem);
    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.PasswordInput.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "TextArea" control element "input" event
 * @method handleTextAreaChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 * @returns 
 */
Form.prototype.handleTextAreaChange = function (e, elem) {
    // console.log('handleTextAreaChange', e, elem);

    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.TextArea.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "Slider" control element "focus" event
 * @method handleSliderFocus
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 */
Form.prototype.handleSliderFocus = function (e, elem) {
    console.log('handleSliderFocus', e, elem);

    var formControlName = elem.name;
    var formControlElem = elem;
    var wrapperElem = util.findTargetParentElement(formControlElem, '.slider');
    if (wrapperElem) {
        var tooltipElem = wrapperElem.querySelector('.slider-tooltip');
        if (tooltipElem) {
            tooltipElem.style.display = 'block';
        }
    }
}
/**
 * handler of "Slider" control element "blur" event
 * @method handleSliderBlur
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 */
Form.prototype.handleSliderBlur = function (e, elem) {
    console.log('handleSliderBlur', e, elem);

    var formControlName = elem.name;
    var formControlElem = elem;
    var wrapperElem = util.findTargetParentElement(formControlElem, '.slider');
    if (wrapperElem) {
        var tooltipElem = wrapperElem.querySelector('.slider-tooltip');
        if (tooltipElem) {
            tooltipElem.style.display = 'none';
        }
    }
}
/**
 * handler of "Slider" control element "input" event
 * @mthod handleSliderInput
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 */
Form.prototype.handleSliderInput = function (e, elem) {
    // console.log('handleSliderInput', e, elem);

    var formControlName = elem.name;
    var formConfigItem = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!formConfigItem) {
        return;
    }
    var formControlElem = elem;
    var numberValue = Number.parseFloat(formControlElem.value);
    // map marks and activate target mark
    var wrapperElem = util.findTargetParentElement(formControlElem, '.slider');
    if (wrapperElem) {
        var markActiveClassName = 'active';
        var markElems = wrapperElem.querySelectorAll('.slider-mark-text');
        Array.prototype.forEach.call(markElems, function (elem, index, array) {
            elem.classList.remove(markActiveClassName);
            
            var markValue = Number.parseFloat(elem.getAttribute('data-value'));
            if (Number.isNaN(markValue)) {
                return;
            }
            if (markValue === numberValue) {
                elem.classList.add(markActiveClassName);
            }
        });

        var tooltipElem = wrapperElem.querySelector('.slider-tooltip');
        if (tooltipElem) {

            var tooltipInnerElem = tooltipElem.querySelector('.slider-tooltip-inner');
            if (tooltipInnerElem) {
                tooltipInnerElem.innerHTML = numberValue;
            }

            var leftPercentage = ( numberValue - formConfigItem.option.min ) / formConfigItem.option.max * 100;
            tooltipElem.style.left = `${leftPercentage}%`;
        }
    }
}
/**
 * handler of "Slider" control element "change" event
 * @method handleSliderChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 */
Form.prototype.handleSliderChange = function (e, elem) {
    // console.log('handleSliderChange', e, elem);
    
    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }

    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.Slider.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "Select" control element "change" event
 * @method handleSelectChange
 * @param {UIEvent} e 
 * @param {HTMLSelectElement} elem 
 * @returns 
 */
Form.prototype.handleSelectChange = function (e, elem) {
    // console.log('handleSelectChange', e, elem);

    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }

    // console.log('handleSelectChange', 'this', this, 'targetConfig', targetConfig, 'value', e.target.value, 'elem', elem);

    var targetOptionData = util.getTargetItemFromArrayByKey(
        targetConfig.option.options,
        e.target.value,
        'value'
    );

    // // @deprecated This will cause "handleFormItemChange" silent when Select was set null/undefined/''
    // if (
    //     !targetOptionData
    //     // when select empty option, still trigger formItemChange method
    //     && e.target.value !== ''
    // ) {
    //     return;
    // }

    // var formData = this.getFormData();
    // if (targetOptionData.value === formData[formControlName]) {
    //     return;
    // }
    var newValue;
    if (targetOptionData) {
        newValue = targetOptionData.value
    } else {
        newValue = '';
    }
    // use form control setter func to set new value
    this.formController.Select.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "Radio" control element "change" event
 * @method handleRadioChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 * @returns 
 */
Form.prototype.handleRadioChange = function (e, elem) {
    // console.log('handleRadioChange', e, elem);

    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    var targetOptionData = util.getTargetItemFromArrayByKey(
        targetConfig.option.options,
        e.target.value,
        'value'
    );
    if (!targetOptionData) {
        return;
    }
    // var formData = this.getFormData();
    // if (targetOptionData.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = targetOptionData.value;
    // use form control setter func to set new value
    this.formController.Radio.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "Checkbox" control element "change" event
 * @method handleCheckboxChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem 
 * @returns 
 */
Form.prototype.handleCheckboxChange = function (e, elem) {
    // console.log('handleCheckboxChange', e, elem);

    var formControlName = elem.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    var targetOptionData = util.getTargetItemFromArrayByKey(
        targetConfig.option.options,
        e.target.value,
        'value'
    );
    if (!targetOptionData) {
        return;
    }
    var formData = this.getFormData();
    // if (targetOptionData.value === formData[formControlName]) {
    //     return;
    // }
    // var newValue = targetOptionData.value;
    var newValue = formData[targetConfig.key];
    // use form control setter func to set new value
    this.formController.Checkbox.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "DatePicker" control element bootstrap datetimepicker "changeDate" event
 * @method handleDatePickerChange
 * @param {Event} e 
 */
Form.prototype.handleDatePickerChange = function (e) {
    // console.log('handleDatePickerChange', e);

    var formControlName = e.target.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    var elem = e.target;
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.DatePicker.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "TimePicker" control element bootstrap datetimepicker "changeDate" event
 * @method handleTimePickerChange
 * @param {Event} e 
 */
Form.prototype.handleTimePickerChange = function (e) {
    // console.log('handleTimePickerChange', e);

    var formControlName = e.target.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    var elem = e.target;
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // use form control setter func to set new value
    this.formController.TimePicker.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "DateTimePicker" control element bootstrap datetimepicker "changeDate" event
 * @method handleDateTimePickerChange
 * @param {Event} e 
 */
Form.prototype.handleDateTimePickerChange = function (e) {
    // console.log('handleDateTimePickerChange', e);

    var formControlName = e.target.name;
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formControlName, 'key');
    if (!targetConfig) {
        return;
    }
    var elem = e.target;
    // var formData = this.getFormData();
    // if (e.target.value === formData[formControlName]) {
    //     return;
    // }
    var newValue = e.target.value;
    // console.log('e.target.value', e.target.value, 'e.date.valueOf', e.date.valueOf());
    // var newValue = util.formatDate(
    //     util.newDateWithTimestamp(e.date.valueOf()),
    //     'yyyy-MM-dd hh:mm:ss'
    // );
    // use form control setter func to set new value
    this.formController.DateTimePicker.set.call(this, targetConfig, newValue);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValue,
        targetConfig,
    );
}
/**
 * handler of "Transfer" control select item btn element "click" event
 * @method handleTransferSelectItemBtnClick
 * @param {MouseEvent} e 
 * @param {HTMLButtonElement} elem
 */
Form.prototype.handleTransferSelectItemBtnClick = function (e, elem) {
    // console.log('handleTransferSelectItemBtnClick', e, elem);

    var self = this;
    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    if (!transferWrapperElem) {
        return;
    }
    // get corresponding form config item
    var formKey = transferWrapperElem.getAttribute('data-name');
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formKey, 'key');
    if (!targetConfig) {
        return;
    }
    var listAllContentElem = transferWrapperElem.querySelector('.transfer-list-all .transfer-list-content');
    var listSelectedContentElem = transferWrapperElem.querySelector('.transfer-list-selected .transfer-list-content');
    if (
        !listAllContentElem
        || !listSelectedContentElem
    ) {
        return;
    }
    // get transfer-list-all checkbox selected item elems
    var listAllCheckboxCheckedInputElems = listAllContentElem.querySelectorAll('.transfer-list-content-item input[type="checkbox"]:checked');
    // change their parent element into transfer-list-selected content elem
    // insert reversely
    Array.prototype.forEach.call(
        Array.prototype.reduce.call(listAllCheckboxCheckedInputElems, function (previous, elem, index, array) {
            previous.unshift(elem);
            return previous;
        }, []), 
        function (elem, index, array) {
            var listContentItemElem = util.findTargetParentElement(elem, '.transfer-list-content-item');
            if (!listContentItemElem) {
                return;
            }
            util.insertFirstChildElement(listSelectedContentElem, listContentItemElem);
        }
    );
    // un-check all checkbox elems, includes two selectAll checkbox
    var checkboxInputElems = transferWrapperElem.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxInputElems, function (elem, index, array) {
        elem.checked = false;
    });
    // update header text
    var listAllHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list.transfer-list-all .transfer-list-header .transfer-list-header-selected'
    );
    var listSelectedHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list.transfer-list-selected .transfer-list-header .transfer-list-header-selected'
    );
    if (listAllHeaderSelectedTextElem) {
        listAllHeaderSelectedTextElem.innerHTML = `${listAllContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    if (listSelectedHeaderSelectedTextElem) {
        listSelectedHeaderSelectedTextElem.innerHTML = `${listSelectedContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    // get selected array value
    var listAllContentItemElems = listAllContentElem.querySelectorAll('.transfer-list-content-item');
    var selectedValueArr = Array.prototype.map.call(listAllContentItemElems, function (elem, index, array) {
        return elem.getAttribute('value');
    });
    var newValueArr = targetConfig.option.options.reduce(function (previous, item, index, array) {
        if (!selectedValueArr.includes(item.value.toString())) {
            return previous;
        }
        return [].concat(
            previous,
            item.value
        );
    }, []);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValueArr,
        targetConfig,
    );
}
/**
 * handler of "Transfer" control un-select item btn element "click" event
 * @method handleTransferUnselectItemBtnClick
 * @param {MouseEvent} e 
 * @param {HTMLButtonElement} elem
 */
Form.prototype.handleTransferUnselectItemBtnClick = function (e, elem) {
    // console.log('handleTransferUnselectItemBtnClick', e, elem);

    var self = this;
    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    if (!transferWrapperElem) {
        return;
    }
    // get corresponding form config item
    var formKey = transferWrapperElem.getAttribute('data-name');
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formKey, 'key');
    if (!targetConfig) {
        return;
    }
    var listAllContentElem = transferWrapperElem.querySelector('.transfer-list-all .transfer-list-content');
    var listSelectedContentElem = transferWrapperElem.querySelector('.transfer-list-selected .transfer-list-content');
    if (
        !listAllContentElem
        || !listSelectedContentElem
    ) {
        return;
    }
    // get all transfer-list-selected list item elems
    var listSelectedCheckboxCheckedInputElems = listSelectedContentElem.querySelectorAll('.transfer-list-content-item input[type="checkbox"]:checked');
    // change them into transfer-list-all content elem
    // insert reversely
    Array.prototype.forEach.call(
        Array.prototype.reduce.call(listSelectedCheckboxCheckedInputElems, function (previous, elem, index, array) {
            previous.unshift(elem);
            return previous;
        }, []), 
        function (elem, index, array) {
            var listContentItemElem = util.findTargetParentElement(elem, '.transfer-list-content-item');
            if (!listContentItemElem) {
                return;
            }
            listAllContentElem.appendChild(listContentItemElem);
        }
    );
    // un-check all checkbox elems, includes two selectAll checkbox
    var checkboxInputElems = transferWrapperElem.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxInputElems, function (elem, index, array) {
        elem.checked = false;
    });
    // update header text
    var listAllHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list-all .transfer-list-header .transfer-list-header-selected'
    );
    var listSelectedHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list-selected .transfer-list-header .transfer-list-header-selected'
    );
    if (listAllHeaderSelectedTextElem) {
        listAllHeaderSelectedTextElem.innerHTML = `${listAllContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    if (listSelectedHeaderSelectedTextElem) {
        listSelectedHeaderSelectedTextElem.innerHTML = `${listSelectedContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    // get selected array value
    var listAllContentItemElems = listAllContentElem.querySelectorAll('.transfer-list-content-item');
    var selectedValueArr = Array.prototype.map.call(listAllContentItemElems, function (elem, index, array) {
        return elem.getAttribute('value');
    });
    var newValueArr = targetConfig.option.options.reduce(function (previous, item, index, array) {
        if (!selectedValueArr.includes(item.value.toString())) {
            return previous;
        }
        return [].concat(
            previous,
            item.value
        );
    }, []);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValueArr,
        targetConfig,
    );
}
/**
 * handler of "Transfer" control select all btn element "click" event
 * @method handleTransferSelectAllItemBtnClick
 * @param {MouseEvent} e 
 * @param {HTMLButtonElement} elem
 */
Form.prototype.handleTransferSelectAllItemBtnClick = function (e, elem) {
    // console.log('handleTransferSelectAllItemBtnClick', e, elem);

    var self = this;
    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    if (!transferWrapperElem) {
        return;
    }
    // get corresponding form config item
    var formKey = transferWrapperElem.getAttribute('data-name');
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formKey, 'key');
    if (!targetConfig) {
        return;
    }
    var listAllContentElem = transferWrapperElem.querySelector('.transfer-list-all .transfer-list-content');
    var listSelectedContentElem = transferWrapperElem.querySelector('.transfer-list-selected .transfer-list-content');
    if (
        !listAllContentElem
        || !listSelectedContentElem
    ) {
        return;
    }
    // get all item elems
    var listContentItemElems = transferWrapperElem.querySelectorAll('.transfer-list-content-item');
    // empty list-all and list-select inner html
    listAllContentElem.innerHTML = '';
    listSelectedContentElem.innerHTML = '';
    // map form config item, insert coressponding item elem into list content
    // reversely
    [].concat(targetConfig.option.options).reverse().forEach(function (item, index, array) {
        var targetItemElem = Array.prototype.filter.call(listContentItemElems, function (elem, index, array) {
            return elem.getAttribute('data-key') === item.value.toString();
        })[0];
        if (!targetItemElem) {
            return;
        }
        listSelectedContentElem.appendChild(targetItemElem);
    });
    // un-check all checkbox elems, includes two selectAll checkbox
    var checkboxInputElems = transferWrapperElem.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxInputElems, function (elem, index, array) {
        elem.checked = false;
    });
    // update header text
    var listAllHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list-all .transfer-list-header .transfer-list-header-selected'
    );
    var listSelectedHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list-selected .transfer-list-header .transfer-list-header-selected'
    );
    if (listAllHeaderSelectedTextElem) {
        listAllHeaderSelectedTextElem.innerHTML = `${listAllContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    if (listSelectedHeaderSelectedTextElem) {
        listSelectedHeaderSelectedTextElem.innerHTML = `${listSelectedContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    // get new value
    var listAllContentItemElems = listAllContentElem.querySelectorAll('.transfer-list-content-item');
    var listAllValueStr = Array.prototype.map.call(listAllContentItemElems, function (elem, index, array) {
        return elem.getAttribute('data-key');
    });
    var newValueArr = targetConfig.option.options.reduce(function (previous, item, index, array) {
        if (!listAllValueStr.includes(item.value.toString())) {
            return previous;
        }
        return [].concat(
            previous,
            item.value
        );
    }, []);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValueArr,
        targetConfig,
    );
}
/**
 * handler of "Transfer" control un-select all btn element "click" event
 * @method handleTransferUnselectAllItemBtnClick
 * @param {MouseEvent} e 
 * @param {HTMLButtonElement} elem
 */
Form.prototype.handleTransferUnselectAllItemBtnClick = function (e, elem) {
    // console.log('handleTransferUnselectAllItemBtnClick', e, elem);

    var self = this;
    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    if (!transferWrapperElem) {
        return;
    }
    // get corresponding form config item
    var formKey = transferWrapperElem.getAttribute('data-name');
    var targetConfig = util.getTargetItemFromArrayByKey(this.state.formConfigs, formKey, 'key');
    if (!targetConfig) {
        return;
    }
    var listAllContentElem = transferWrapperElem.querySelector('.transfer-list-all .transfer-list-content');
    var listSelectedContentElem = transferWrapperElem.querySelector('.transfer-list-selected .transfer-list-content');
    if (
        !listAllContentElem
        || !listSelectedContentElem
    ) {
        return;
    }
    // get all item elems
    var listContentItemElems = transferWrapperElem.querySelectorAll('.transfer-list-content-item');
    // empty list-all and list-select inner html
    listAllContentElem.innerHTML = '';
    listSelectedContentElem.innerHTML = '';
    // map form config item, insert coressponding item elem into list content
    targetConfig.option.options.forEach(function (item, index, array) {
        var targetItemElem = Array.prototype.filter.call(listContentItemElems, function (elem, index, array) {
            return elem.getAttribute('data-key') === item.value.toString();
        })[0];
        if (!targetItemElem) {
            return;
        }
        listAllContentElem.appendChild(targetItemElem);
    });
    // un-check all checkbox elems, includes two selectAll checkbox
    var checkboxInputElems = transferWrapperElem.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxInputElems, function (elem, index, array) {
        elem.checked = false;
    });
    // update header text
    var listAllHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list-all .transfer-list-header .transfer-list-header-selected'
    );
    var listSelectedHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list-selected .transfer-list-header .transfer-list-header-selected'
    );
    if (listAllHeaderSelectedTextElem) {
        listAllHeaderSelectedTextElem.innerHTML = `${listAllContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    if (listSelectedHeaderSelectedTextElem) {
        listSelectedHeaderSelectedTextElem.innerHTML = `${listSelectedContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    // get new value
    var listAllContentItemElems = listAllContentElem.querySelectorAll('.transfer-list-content-item');
    var listAllValueStr = Array.prototype.map.call(listAllContentItemElems, function (elem, index, array) {
        return elem.getAttribute('data-key');
    });
    var newValueArr = targetConfig.option.options.reduce(function (previous, item, index, array) {
        if (!listAllValueStr.includes(item.value.toString())) {
            return previous;
        }
        return [].concat(
            previous,
            item.value
        );
    }, []);
    // provide form item value change customize handling
    var changeFunc = this[`handleFormItemChange_${targetConfig.key}`];
    if (typeof changeFunc !== 'function') {
        return;
    }
    changeFunc.call(
        this,
        e,
        elem,
        newValueArr,
        targetConfig,
    );
}
/**
 * handler of "Transfer" control checkbox element "change" event
 * @method handleTransferCheckboxChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem
 */
Form.prototype.handleTransferCheckboxChange = function (e, elem) {
    // console.log('handleTransferCheckboxChange', e, elem);

    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    var listContentElem = util.findTargetParentElement(elem, '.transfer-list');
    if (
        !transferWrapperElem
        || !listContentElem
    ) {
        return;
    }
    var formKey = transferWrapperElem.getAttribute('data-name');
    // transfer list all checkbox
    if (listContentElem.classList.contains('transfer-list-all')) {
        var selectAllCheckboxInputElem = listContentElem.querySelector(`[name="transferListAll_selectAll_${formKey}"]`);
        // checkbox select all
        if (elem === selectAllCheckboxInputElem) {
            this.handleTransferListAllSelectAllCheckboxChange(e, elem);
        }
        // checkbox select item
        else {
            this.handleTransferListAllSelectItemCheckboxChange(e, elem);
        }
    }
    // transfer list selected checkbox
    if (listContentElem.classList.contains('transfer-list-selected')) {
        var selectAllCheckboxInputElem = listContentElem.querySelector(`[name="transferListSelected_selectAll_${formKey}"]`);
        // checkbox select all
        if (elem === selectAllCheckboxInputElem) {
            this.handleTransferListSelectedSelectAllCheckboxChange(e, elem);
        }
        // checkbox select item
        else {
            this.handleTransferListSelectedSelectItemCheckboxChange(e, elem);
        }
    }

}
/**
 * handler of "Transfer" control transfer-list-all list item checkbox "change" event
 * @method handleTransferListAllSelectItemCheckboxChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem
 */
Form.prototype.handleTransferListAllSelectItemCheckboxChange = function (e, elem) {
    // console.log('handleTransferListAllSelectItemCheckboxChange', e, e.target.checked, elem);

    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    if (!transferWrapperElem) {
        return;
    }
    var formKey = transferWrapperElem.getAttribute('data-name');
    var transferListAllSelectItemCheckboxInputElems = transferWrapperElem.querySelectorAll(
        `.transfer-list-all .transfer-list-content input[name="transferListItem_${formKey}"]`
    );
    var transferListAllSelectAllCheckboxInputElem = transferWrapperElem.querySelector(
        `input[name="transferListAll_selectAll_${formKey}"]`
    );
    // change transfer-list-all select all checkbox attr "checked"
    var isAllChecked = Array.prototype.every.call(transferListAllSelectItemCheckboxInputElems, function (elem, index, array) {
        return elem.checked;
    });
    if (isAllChecked) {
        // transferListAllSelectAllCheckboxInputElem.setAttribute('checked', '');
        transferListAllSelectAllCheckboxInputElem.checked = true;
    } else {
        transferListAllSelectAllCheckboxInputElem.checked = false;
    }
    // update header selected text
    var transferListHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list.transfer-list-all .transfer-list-header .transfer-list-header-selected'
    );
    if (transferListHeaderSelectedTextElem) {
        var transferListAllSelectItemCheckboxCheckedElems =Array.prototype.filter.call(
            transferListAllSelectItemCheckboxInputElems,
            function (elem, index, array) {
                return elem.checked;
            }
        );
        if (transferListAllSelectItemCheckboxCheckedElems.length === 0) {
            transferListHeaderSelectedTextElem.innerHTML = `
                ${transferWrapperElem.querySelectorAll(
                    '.transfer-list.transfer-list-all .transfer-list-content .transfer-list-content-item'
                ).length}
                项
            `;
        } else {
            transferListHeaderSelectedTextElem.innerHTML = `
                ${transferListAllSelectItemCheckboxCheckedElems.length}
                /
                ${transferWrapperElem.querySelectorAll(
                    '.transfer-list.transfer-list-all .transfer-list-content .transfer-list-content-item'
                ).length}
                项
            `;
        }
    }
}
/**
 * handler of "Transfer" control transfer-list-selected list item checkbox "change" event
 * @method handleTransferListSelectedSelectItemCheckboxChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem
 */
Form.prototype.handleTransferListSelectedSelectItemCheckboxChange = function (e, elem) {
    // console.log('handleTransferListSelectedSelectItemCheckboxChange', e, e.target.checked, elem);

    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    if (!transferWrapperElem) {
        return;
    }
    var formKey = transferWrapperElem.getAttribute('data-name');
    var transferListSelectedSelectItemCheckboxInputElems = transferWrapperElem.querySelectorAll(
        `.transfer-list-selected .transfer-list-content input[name="transferListItem_${formKey}"]`
    );
    var transferListSelectedSelectAllCheckboxInputElem = transferWrapperElem.querySelector(
        `input[name="transferListSelected_selectAll_${formKey}"]`
    );
    // change transfer-list-selected select all checkbox attr "checked"
    var isAllChecked = Array.prototype.every.call(transferListSelectedSelectItemCheckboxInputElems, function (elem, index, array) {
        return elem.checked;
    });
    if (isAllChecked) {
        // transferListSelectedSelectAllCheckboxInputElem.setAttribute('checked', '');
        transferListSelectedSelectAllCheckboxInputElem.checked = true;
    } else {
        // transferListSelectedSelectAllCheckboxInputElem.removeAttribute('checked');
        transferListSelectedSelectAllCheckboxInputElem.checked = false;
    }
    // update header selected text
    var transferListHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list.transfer-list-selected .transfer-list-header .transfer-list-header-selected'
    );
    if (transferListHeaderSelectedTextElem) {
        var transferListSelectedSelectItemCheckboxCheckedElems =Array.prototype.filter.call(
            transferListSelectedSelectItemCheckboxInputElems,
            function (elem, index, array) {
                return elem.checked;
            }
        );
        if (transferListSelectedSelectItemCheckboxCheckedElems.length === 0) {
            transferListHeaderSelectedTextElem.innerHTML = `
                ${transferWrapperElem.querySelectorAll(
                    '.transfer-list.transfer-list-selected .transfer-list-content .transfer-list-content-item'
                ).length}
                项
            `;
        } else {
            transferListHeaderSelectedTextElem.innerHTML = `
                ${transferListSelectedSelectItemCheckboxCheckedElems.length}
                /
                ${transferWrapperElem.querySelectorAll(
                    '.transfer-list.transfer-list-selected .transfer-list-content .transfer-list-content-item'
                ).length}
                项
            `;
        }
    }
}
/**
 * handler of "Transfer" control transfer-list-selected select all checkbox "change" event
 * @method handleTransferListAllSelectAllCheckboxChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem
 */
Form.prototype.handleTransferListAllSelectAllCheckboxChange = function (e, elem) {
    // console.log('handleTransferListAllSelectAllCheckboxChange', e, e.target.checked, elem);

    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    if (!transferWrapperElem) {
        return;
    }
    var formKey = transferWrapperElem.getAttribute('data-name');
    var transferListAllSelectItemCheckboxInputElems = transferWrapperElem.querySelectorAll(
        `.transfer-list-all .transfer-list-content input[name="transferListItem_${formKey}"]`
    );
    if (e.target.checked) {
        Array.prototype.forEach.call(transferListAllSelectItemCheckboxInputElems, function (elem, index, array) {
            // elem.setAttribute('checked', '');
            elem.checked = true;
        });
    } else {
        Array.prototype.forEach.call(transferListAllSelectItemCheckboxInputElems, function (elem, index, array) {
            // elem.removeAttribute('checked');
            elem.checked = false;
        });
    }
    // update header selected text
    var transferListHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list.transfer-list-all .transfer-list-header .transfer-list-header-selected'
    );
    if (transferListHeaderSelectedTextElem) {
        if (e.target.checked) {
            transferListHeaderSelectedTextElem.innerHTML = `
                ${Array.prototype.filter.call(transferListAllSelectItemCheckboxInputElems, function (elem, index, array) {
                    return elem.checked;
                }).length}
                /
                ${transferWrapperElem.querySelectorAll(
                    '.transfer-list.transfer-list-all .transfer-list-content .transfer-list-content-item'
                ).length}
                项
            `;
        } else {
            transferListHeaderSelectedTextElem.innerHTML = `
                ${transferWrapperElem.querySelectorAll(
                    '.transfer-list.transfer-list-all .transfer-list-content .transfer-list-content-item'
                ).length}
                项
            `;
        }
    }
}
/**
 * handler of "Transfer" control transfer-list-selected select all checkbox "change" event
 * @method handleTransferListSelectedSelectAllCheckboxChange
 * @param {UIEvent} e 
 * @param {HTMLInputElement} elem
 */
Form.prototype.handleTransferListSelectedSelectAllCheckboxChange = function (e, elem) {
    // console.log('handleTransferListSelectedSelectAllCheckboxChange', e, e.target.checked, elem);

    var transferWrapperElem = util.findTargetParentElement(elem, '.transfer');
    if (!transferWrapperElem) {
        return;
    }
    var formKey = transferWrapperElem.getAttribute('data-name');
    var transferListSelectedSelectItemCheckboxInputElems = transferWrapperElem.querySelectorAll(
        `.transfer-list-selected .transfer-list-content input[name="transferListItem_${formKey}"]`
    );
    if (e.target.checked) {
        Array.prototype.forEach.call(transferListSelectedSelectItemCheckboxInputElems, function (elem, index, array) {
            // elem.setAttribute('checked', '');
            elem.checked = true;
        });
    } else {
        Array.prototype.forEach.call(transferListSelectedSelectItemCheckboxInputElems, function (elem, index, array) {
            // elem.removeAttribute('checked');
            elem.checked = false;
        });
    }
    // update header selected text
    var transferListHeaderSelectedTextElem = transferWrapperElem.querySelector(
        '.transfer-list.transfer-list-selected .transfer-list-header .transfer-list-header-selected'
    );
    if (transferListHeaderSelectedTextElem) {
        if (e.target.checked) {
            transferListHeaderSelectedTextElem.innerHTML = `
                ${Array.prototype.filter.call(transferListSelectedSelectItemCheckboxInputElems, function (elem, index, array) {
                    return elem.checked;
                }).length}
                /
                ${transferWrapperElem.querySelectorAll(
                    '.transfer-list.transfer-list-selected .transfer-list-content .transfer-list-content-item'
                ).length}
                项
            `;
        } else {
            transferListHeaderSelectedTextElem.innerHTML = `
                ${transferWrapperElem.querySelectorAll(
                    '.transfer-list.transfer-list-selected .transfer-list-content .transfer-list-content-item'
                ).length}
                项
            `;
        }
    }
}
/**
 * render form item label element
 * @param {FormItem} data 
 * @returns {string} form label html template
 */
Form.prototype.renderFormItemLabel = function (data) {
    var template = `
        <label for="${data.key}" title="${data.description || data.title || data.key}">
            ${data.title || data.key}
        </label>
    `;
    return template;
}
/**
* render form item control element
* @param {FormItem} data 
* @returns {string} form control html template
*/
Form.prototype.renderFormItemControl = function (data) {
    var formItemKey = data.key;
    var formItemType = data.type;
    var renderFunc = (
        (this.formController[formItemKey] || {}).render
        || (this.formController[formItemType] || {}).render
    );
    if (typeof renderFunc === 'function') {
        return renderFunc.call(this, data);
    } else {
        return '';
    }
}
/**
 * render form item explain element
 * @param {FormItem} data 
 * @returns {string} form explain html template
 */
Form.prototype.renderFormItemExplain = function (data) {
    var template = `
        <div class="form-explain">

        </div>
    `;
    return template;
}
/**
 * render form item element
 * @param {FormItem} data 
 * @returns {string} form item html tempalte
 */
Form.prototype.renderFormItem = function (data) {
    if (data.type === 'Hidden') {
        return `
            <div class="form-group" style="display: none;">
                ${this.renderFormItemControl(data)}
            </div>
        `;
    }
    var template = `
        <div class="form-vertical form-group">
            <div class="${this.getFormLabelWrapperClassName(data)}">
                ${this.renderFormItemLabel(data)}
            </div>
            <div class="form-control-wrapper">
                ${this.renderFormItemControl(data)}
                <div class="form-explain">
    
                </div>
            </div>
        </div>
    `;
    return template;
}
export default Form;