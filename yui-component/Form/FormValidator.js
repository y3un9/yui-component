/**
 * @author KahoYeung
 * @date 2021/01/20
 * @description 表单验证器
 */

import Form from './Form';

import util from '../../utils/util';

/**
 * @typedef {Object} FormItem 表单项
 * @property {string} key 键值名
 * @property {string} type 控件类型
 * @property {string} [title] 标签名
 * @property {string} [description] 说明
 * @property {number|string} [value] 控件值
 * @property {number|string} [default] 控件默认值
 * @property {boolean} [disabled] 是否禁用
 * @property {boolean} [required] 不允许空值
 * @property {FormItemOption} option 控件选项
 */

/**
 * @typedef {Object} ValidateResult 验证结果
 * @property {boolean} flag 验证结果
 * @property {string} status 验证状态
 * @property {string} help 帮助文本
 */

/** 校验状态 */
var VALIDATE_STATUS = {
    /** 无 */
    NONE: 'none',
    /** 成功 */
    SUCCESS: 'success',
    /** 警告 */
    WARNING: 'warning',
    /** 错误 */
    ERROR: 'error'
};

/**
 * @function validateHidden
 * @this Form
 * @param {FormItem & { option: HiddenOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateHidden (formConfigItem, value) {
    return true;
}

/**
 * @function validatePlainText
 * @this Form
 * @param {FormItem & { option: PlainTextOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validatePlainText (formConfigItem, value) {
    return true;
}

/**
 * @function validateTextInput
 * @this Form
 * @param {FormItem & { option: TextInputOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateTextInput (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // // 取表单项值
    // var value = input_elem.value.trim();
    
    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }
    // 表单配置项不存在不继续向下验证
    if (!formConfigItem.option || typeof formConfigItem.option !== 'object') {
        return true;
    }

    // 当 required == false 时, 用户可以不输入值, 这个是合理的, 但是校验函数还是去做了长度的校验, 也就会造成校验不通过, 这个是错误的
    // 加一个判断值长度的逻辑, 当 required == false && value.length == 0 时, 不做长度的校验, 返回校验成功的结果
    if (!formConfigItem.required && value.length === 0) {
        return true;
    }

    // 检查是否小于最小长度
    if (
        typeof parseInt(formConfigItem.option.minLength) === 'number'
        && value.length < parseInt(formConfigItem.option.minLength)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputMinLengthTextSuffix}${formConfigItem.option.minLength}`
        };
    }
    // 检查是否大于最大长度
    if (
        typeof parseInt(formConfigItem.option.maxLength) === 'number'
        && value.length > parseInt(formConfigItem.option.maxLength)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputMaxLengthTextSuffix}${formConfigItem.option.maxLength}`
        };
    }
    return true;
}

/**
 * @function validateNumberInput
 * @this Form
 * @param {FormItem & { option: NumberInputOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateNumberInput (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // // 取表单项值
    // var value = input_elem.value.trim();
    
    // 表单项需要检查非空
    if (
        formConfigItem.required 
        // && value.length === 0
        && typeof value === 'string'
        && value.length === 0
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }

    // 表单项非空情况下, 表单项值为空
    if (
        typeof value === 'string'
        && value.length === 0
    ) {
        return true;
    }
    // 表单项检查是否数字
    if (Number.isNaN(value)) {
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}只能输入数字`
        };
    }

    // 表单配置项不存在不继续向下验证
    if (
        !formConfigItem.option 
        || typeof formConfigItem.option !== 'object'
    ) {
        return true;
    }
    // 检查是否小于最小值
    if (
        typeof Number.parseFloat(formConfigItem.option.min) === 'number'
        && value < Number.parseFloat(formConfigItem.option.min)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredNumberMinTextSuffix}${formConfigItem.option.min}`
        };
    }
    // 检查是否大于最大值
    if (
        typeof Number.parseFloat(formConfigItem.option.max) === 'number'
        && value > Number.parseFloat(formConfigItem.option.max)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredNumberMaxTextSuffix}${formConfigItem.option.max}`
        };
    }
    return true;
}

/**
 * @function validatePhoneInput
 * @this Form
 * @param {FormItem & { option: PhoneInputOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validatePhoneInput (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // // 取表单项值
    // var value = input_elem.value.trim();
    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }
    // 表单配置项不存在不继续向下验证
    if (!formConfigItem.option || typeof formConfigItem.option !== 'object') {
        return true;
    }

    // TODO: 验证手机号格式

    return true;
}

/**
 * @function validateEmailInput
 * @this Form
 * @param {FormItem & { option: EmailInputOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateEmailInput (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // // 取表单项值
    // var value = input_elem.value.trim();
    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }
    // 表单配置项不存在不继续向下验证
    if (!formConfigItem.option || typeof formConfigItem.option !== 'object') {
        return true;
    }

    // 当 required == false 时, 用户可以不输入值, 这个是合理的, 但是校验函数还是去做了长度的校验, 也就会造成校验不通过, 这个是错误的
    // 加一个判断值长度的逻辑, 当 required == false && value.length == 0 时, 不做长度的校验, 返回校验成功的结果
    if (!formConfigItem.required && value.length === 0) {
        return true;
    }

    // 检查是否小于最小长度
    if (
        typeof parseInt(formConfigItem.option.minLength) === 'number'
        && value.length < parseInt(formConfigItem.option.minLength)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputMinLengthTextSuffix}${formConfigItem.option.minLength}`
        };
    }
    // 检查是否大于最大长度
    if (
        typeof parseInt(formConfigItem.option.maxLength) === 'number'
        && value.length > parseInt(formConfigItem.option.maxLength)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputMaxLengthTextSuffix}${formConfigItem.option.maxLength}`
        };
    }

    // TODO: 验证邮箱格式

    return true;

}

/**
 * @function validatePasswordInput
 * @this Form
 * @param {FormItem & { option: PasswordInputOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validatePasswordInput (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // // 取表单项值
    // var value = input_elem.value.trim();
    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }
    // 表单配置项不存在不继续向下验证
    if (!formConfigItem.option || typeof formConfigItem.option !== 'object') {
        return true;
    }

    // 当 required == false 时, 用户可以不输入值, 这个是合理的, 但是校验函数还是去做了长度的校验, 也就会造成校验不通过, 这个是错误的
    // 加一个判断值长度的逻辑, 当 required == false && value.length == 0 时, 不做长度的校验, 返回校验成功的结果
    if (!formConfigItem.required && value.length === 0) {
        return true;
    }

    // 检查是否小于最小长度
    if (
        typeof parseInt(formConfigItem.option.minLength) === 'number'
        && value.length < parseInt(formConfigItem.option.minLength)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputMinLengthTextSuffix}${formConfigItem.option.minLength}`
        };
    }
    // 检查是否大于最大长度
    if (
        typeof parseInt(formConfigItem.option.maxLength) === 'number'
        && value.length > parseInt(formConfigItem.option.maxLength)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputMaxLengthTextSuffix}${formConfigItem.option.maxLength}`
        };
    }
    return true;
}

/**
 * @function validateTextArea
 * @this Form
 * @param {FormItem & { option: TextAreaOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateTextArea (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // // 取表单项值
    // var value = input_elem.value.trim();
    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }
    // 表单配置项不存在不继续向下验证
    if (!formConfigItem.option || typeof formConfigItem.option !== 'object') {
        return true;
    }

    // 当 required == false 时, 用户可以不输入值, 这个是合理的, 但是校验函数还是去做了长度的校验, 也就会造成校验不通过, 这个是错误的
    // 加一个判断值长度的逻辑, 当 required == false && value.length == 0 时, 不做长度的校验, 返回校验成功的结果
    if (!formConfigItem.required && value.length === 0) {
        return true;
    }

    // 检查是否小于最小长度
    if (
        typeof parseInt(formConfigItem.option.minLength) === 'number'
        && value.length < parseInt(formConfigItem.option.minLength)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputMinLengthTextSuffix}${formConfigItem.option.minLength}`
        };
    }
    // 检查是否大于最大长度
    if (
        typeof parseInt(formConfigItem.option.maxLength) === 'number'
        && value.length > parseInt(formConfigItem.option.maxLength)
    ) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputMaxLengthTextSuffix}${formConfigItem.option.minLength}`
        };
    }
    return true;
}

/**
 * @function validateSwitch
 * @this Form
 * @param {FormItem & { option: SwitcherOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateSwitch (formConfigItem, value) {

}

/**
 * @function validateStepper
 * @this Form
 * @param {FormItem & { option: StepperOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateStepper (formConfigItem, value) {

}

/**
 * @function validateSlider
 * @this Form
 * @param {FormItem & { option: SliderOption }} formConfigItem 
 * @param {*} value 
 * @returns {boolean | ValidateResult}
 */
function validateSlider (formConfigItem, value) {
    return true;
}

/**
 * @function validateSelect
 * @this Form
 * @param {FormItem & { option: SelectorOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateSelect (formConfigItem, value) {
    // 先取到表单项元素
    var select_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!select_elem) {
        return false;
    }

    // // 取表单项值
    // var value = select_elem.value.trim();
    // 表单项需要检查非空
    if (formConfigItem.required) {
        if (typeof value === 'string') {
            if (!value) {
                select_elem.focus();
                return {
                    flag: false,
                    status: VALIDATE_STATUS.ERROR,
                    help: `${formConfigItem.title}${this.state.explainRequiredSelectTextSuffix}`
                };
            }
            return true;
        }
        if (typeof value === 'number') {
            return true;
        }
        return false;
    }
    return true;
}

/**
 * @function validateRadio
 * @this Form
 * @param {FormItem & { option: RadioOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateRadio (formConfigItem, value) {
    // 表单项需要检查非空
    if (formConfigItem.required) {
        if (typeof value === 'string') {
            if (!value) {
                return {
                    flag: false,
                    status: VALIDATE_STATUS.ERROR,
                    help: `${formConfigItem.title}${this.state.explainRequiredSelectTextSuffix}`
                };
            }
        }
        else if (typeof value === 'number') {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
}

/**
 * @function validateCheckbox
 * @this Form
 * @param {FormItem & { option: CheckboxOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateCheckbox (formConfigItem, value) {
    if (formConfigItem.required) {
        if (
            !Array.isArray(value)
            || value.length === 0
        ) {
            return {
                flag: false,
                status: VALIDATE_STATUS.ERROR,
                help: `${formConfigItem.title}${this.state.explainRequiredSelectTextSuffix}`
            };
        }
    }
    return true;
}

/**
 * @function validateDatePicker
 * @this Form
 * @param {FormItem & { option: DatePickerOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateDatePicker (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // 取表单项值
    var value = input_elem.value.trim();
    
    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }
    // 表单配置项不存在不继续向下验证
    if (!formConfigItem.option || typeof formConfigItem.option !== 'object') {
        return true;
    }
    // TODO: 检查是否符合日期格式
    return true;
}

/**
 * @function validateTimePicker
 * @this Form
 * @param {FormItem & { option: TimePickerOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateTimePicker (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // 取表单项值
    var value = input_elem.value.trim();
    
    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }
    // 表单配置项不存在不继续向下验证
    if (!formConfigItem.option || typeof formConfigItem.option !== 'object') {
        return true;
    }
    // TODO: 检查是否符合日期格式
    return true;
}

/**
 * @function validateDateTimePicker
 * @this Form
 * @param {FormItem & { option: DateTimePickerOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateDateTimePicker (formConfigItem, value) {
    // 先取到表单项元素
    var input_elem = this.formElem.querySelector(`[name="${formConfigItem.key}"]`);
    if (!input_elem) {
        return false;
    }

    // 取表单项值
    var value = input_elem.value.trim();
    
    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        input_elem.focus();
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredInputTextSuffix}`
        };
    }
    // 表单配置项不存在不继续向下验证
    if (!formConfigItem.option || typeof formConfigItem.option !== 'object') {
        return true;
    }
    // TODO: 检查是否符合日期格式
    return true;
}

/**
 * @function validateTransfer
 * @this Form
 * @param {FormItem & { option: TransferOption }} formConfigItem 
 * @param {*} value
 * @returns {boolean | ValidateResult}
 */
function validateTransfer (formConfigItem, value) {
    // 先取到表单项元素
    var transfer_wrapper_elem = this.formElem.querySelector(`.transfer[data-name="${formConfigItem.key}"]`);
    if (!transfer_wrapper_elem) {
        return false;
    }

    // 取已选项值
    var value = [];
    var transfer_selected_list_item_elems = transfer_wrapper_elem.querySelectorAll(
        '.transfer-list.transfer-list-selected .transfer-list-content .transfer-list-content-item'
    );
    Array.prototype.forEach.call(transfer_selected_list_item_elems, function (elem, index, array) {
        var targetOption = util.getTargetItemFromArrayByKey(formConfigItem.option.options, elem.getAttribute('data-key'), 'value');
        if (targetOption) {
            value.push(targetOption.value);
        }
    });

    // 表单项需要检查非空
    if (formConfigItem.required && value.length === 0) {
        return {
            flag: false,
            status: VALIDATE_STATUS.ERROR,
            help: `${formConfigItem.title}${this.state.explainRequiredSelectTextSuffix}`
        };
    }

    return true;
}

export default {
    VALIDATE_STATUS: VALIDATE_STATUS,
    validateHidden: validateHidden,
    validatePlainText: validatePlainText,
    validateTextInput: validateTextInput,
    validateNumberInput: validateNumberInput,
    validatePhoneInput: validatePhoneInput,
    validateEmailInput: validateEmailInput,
    validatePasswordInput: validatePasswordInput,
    validateTextArea: validateTextArea,
    validateSwitch: validateSwitch,
    validateStepper: validateStepper,
    validateSlider: validateSlider,
    validateSelect: validateSelect,
    validateRadio: validateRadio,
    validateCheckbox: validateCheckbox,
    validateDatePicker: validateDatePicker,
    validateTimePicker: validateTimePicker,
    validateDateTimePicker: validateDateTimePicker,
    validateTransfer: validateTransfer
};