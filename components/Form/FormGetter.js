/**
 * @author KahoYeung
 * @date 2021/03/24
 * @description
 */

import util from '../../utils/util';

/**
 * @function getHidden
 * @param {FormConfigItem} formConfigItem
 * @returns {string}
 */
function getHidden (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getPlainText
 * @param {FormConfigItem} formConfigItem
 * @returns {string}
 */
function getPlainText (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return ''
    }
}

/**
 * @function getTextInput
 * @param {FormConfigItem} formConfigItem
 * @returns {string}
 */
function getTextInput (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getNumberInput
 * @param {FormConfigItem} formConfigItem
 * @returns {string}
 */
function getNumberInput (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
         // return Number.parseFloat(formControlElem.value);
        var valueStr = formControlElem.value;
        if (valueStr.length === 0) {
            return '';
        } else {
            return Number.parseFloat(formControlElem.value);
        }
    } else {
        return '';
    }
}

/**
 * @function getPhoneInput
 * @param {FormConfigItem} formConfigItem
 * @returns {string}
 */
function getPhoneInput (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getEmailInput
 * @param {FormConfigItem} formConfigItem
 * @returns {string}
 */
function getEmailInput (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getPasswordInput
 * @param {FormConfigItem} formConfigItem
 * @returns {string}
 */
function getPasswordInput (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getTextArea
 * @param {FormConfigItem} formConfigItem
 * @returns {string}
 */
function getTextArea (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getSlider
 * @param {FormConfigItem} formConfigItem 
 * @returns {any}
 */
function getSlider (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getSelect
 * @param {FormConfigItem} formConfigItem
 * @returns {any}
 */
function getSelect (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`select[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return '';
    }
    // console.log('getSelect', formControlElem, formControlElem.value, formControlElem.selectedIndex);
    var targetOptionElem = formControlElem.querySelectorAll('option')[formControlElem.selectedIndex];
    if (!targetOptionElem) {
        return '';
    }
    var targetOptionData = util.getTargetItemFromArrayByKey(formConfigItem.option.options, targetOptionElem.value, 'value');
    if (!targetOptionData) {
        return '';
    }

    // Again find target option to avoid if select int 0, last targetOptionData might be empty option null or ''
    if (typeof targetOptionData.value === 'number') {
        targetOptionData = util.getTargetItemFromArrayByKey(
            formConfigItem.option.options, 
            Number.parseFloat(targetOptionElem.value), 
            'value',
            true
        );
        if (!targetOptionData) {
            return '';
        }
    }

    console.log('targetOptionData', targetOptionData, targetOptionData.value);
    return targetOptionData.value;
}

/**
 * @function getRadio
 * @param {FormConfigItem} formConfigItem
 * @returns {any}
 */
function getRadio (formConfigItem) {
    var formControlElems = Array.prototype.filter.call(
        this.formElem.querySelectorAll(`input[type="radio"]`),
        function (elem, index, array) {
            return elem.getAttribute('name') === formConfigItem.key;
        }
    );
    return Array.prototype.reduce.call(formControlElems, function (previous, elem, index, array) {
        if (elem.checked) {
            var targetOptionData = util.getTargetItemFromArrayByKey(
                formConfigItem.option.options, 
                elem.value, 
                'value'
            );
            if (targetOptionData) {
                return targetOptionData.value;
            }
        }
        return previous;
    }, '');
}

/**
 * @function getCheckbox
 * @param {FormConfigItem} formConfigItem
 * @returns {Array<any>}
 */
function getCheckbox (formConfigItem) {
    var formControlElems = Array.prototype.filter.call(
        this.formElem.querySelectorAll(`input[type="checkbox"]`),
        function (elem, index, array) {
            return elem.getAttribute('name') === formConfigItem.key;
        }
    );
    return Array.prototype.reduce.call(formControlElems, function (previous, elem, index, array) {
        if (elem.checked) {
            var targetOptionData = util.getTargetItemFromArrayByKey(
                formConfigItem.option.options, 
                elem.value, 
                'value'
            );
            if (targetOptionData) {
                return [].concat(previous, targetOptionData.value);
            }
        }
        return previous;
    }, []);
}

/**
 * @function getDatePicker
 * @param {FormConfigItem} formConfigItem 
 * @returns {string}
 */
function getDatePicker (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getTimePicker
 * @param {FormConfigItem} formConfigItem 
 * @returns {string}
 */
function getTimePicker (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getDateTimePicker
 * @param {FormConfigItem} formConfigItem 
 * @returns {string}
 */
function getDateTimePicker (formConfigItem) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        return formControlElem.value;
    } else {
        return '';
    }
}

/**
 * @function getTransfer
 * @param {FormConfigItem} formConfigItem 
 * @returns {Array<string>}
 */
function getTransfer (formConfigItem) {
    // 先取到表单项元素
    var transfer_wrapper_elem = this.formElem.querySelector(`.transfer[data-name="${formConfigItem.key}"]`);
    if (!transfer_wrapper_elem) {
        return;
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
    return value;
}

export default {
    getHidden: getHidden,
    getPlainText: getPlainText,
    getTextInput: getTextInput,
    getNumberInput: getNumberInput,
    getPhoneInput: getPhoneInput,
    getEmailInput: getEmailInput,
    getPasswordInput: getPasswordInput,
    getTextArea: getTextArea,
    getSlider: getSlider,
    getSelect: getSelect,
    getRadio: getRadio,
    getCheckbox: getCheckbox,
    getDatePicker: getDatePicker,
    getTimePicker: getTimePicker,
    getDateTimePicker: getDateTimePicker,
    getTransfer: getTransfer
};