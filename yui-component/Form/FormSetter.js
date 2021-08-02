/**
 * @author KahoYeung
 * @date 2021/03/24
 * @description
 */

import util from '../../utils/util';

/**
 * @function setTextInput
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setHidden (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    formControlElem.setAttribute('value', value);
    formControlElem.value = value;
}

/**
 * @function setTextInput
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setPlainText (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (formControlElem) {
        formControlElem.setAttribute('value', value);
        formControlElem.value = value;
    }
    var formTextElem = this.formElem.querySelector(`.form-text[data-name="${formConfigItem.key}"]`);
    if (formTextElem) {
        formTextElem.innerHTML = value;
    }
}

/**
 * @function setTextInput
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setTextInput (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);

    // console.log('setTextInput', formControlElem, 'formConfigItem', formConfigItem, 'value', value);

    if (!formControlElem) {
        return;
    }
    formControlElem.setAttribute('value', value);
    formControlElem.value = value;
}

/**
 * @function setNumberInput
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setNumberInput (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    var numberValue = parseFloat(value);
    if (Number.isNaN(numberValue)) {
        formControlElem.setAttribute('value', '');
        formControlElem.value = '';
    } else {
        formControlElem.setAttribute('value', numberValue);
        formControlElem.value = numberValue;
    }
}

/**
 * @function setPhoneInput
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setPhoneInput (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    formControlElem.setAttribute('value', value);
    formControlElem.value = value;
}

/**
 * @function setEmailInput
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setEmailInput (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    formControlElem.setAttribute('value', value);
    formControlElem.value = value;
}

/**
 * @function setPasswordInput
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setPasswordInput (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    formControlElem.setAttribute('value', value);
    formControlElem.value = value;
}

/**
 * @function setTextArea
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setTextArea (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    formControlElem.textContent = value;
}

/**
 * @function setSlider
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setSlider (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }

    // console.log('setSlider', formConfigItem, value, newFormData, 'formControlElem', formControlElem);

    var numberValue = Number.parseFloat(value);
    // check if value is shit
    if (Number.isNaN(numberValue)) {
        if (typeof formConfigItem.default === 'number') {
            numberValue = formConfigItem.default;
        } else {
            numberValue = 0;
        }
    }
    // check if value smaller than min
    if (
        typeof (formConfigItem.option || {}).min === 'number'
        && numberValue < formConfigItem.option.min
    ) {
        numberValue = formConfigItem.option.min
    }
    // check if value bigger than max
    else if (
        typeof (formConfigItem.option || {}).max === 'number'
        && numberValue > formConfigItem.option.max
    ) {
        numberValue = formConfigItem.option.max
    }

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

    formControlElem.setAttribute('value', numberValue);
    formControlElem.value = numberValue;
}

/**
 * @function setSelect
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setSelect (formConfigItem, value, newFormData) {
    var formControlElem = this.formElem.querySelector(`select[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    var targetOptionData = util.getTargetItemFromArrayByKey(formConfigItem.option.options, value, 'value');
    var targetOptionValue = '';
    if (targetOptionData) {
        targetOptionValue = targetOptionData['value'];
    }

    // console.log('setSelect', formConfigItem, value, newFormData, 'formControlElem', formControlElem, 'targetOptionData', targetOptionData, targetOptionData);

    // Array.prototype.some.call(formControlElem.querySelectorAll('option'), function (elem, index, array) {
    //     if (elem.getAttribute('value') !== targetOptionValue.toString()) {
    //         return false;
    //     }
    //     formControlElem.selectedIndex = index;
    //     return true;
    // });

    var isSelected = false;
    Array.prototype.forEach.call(formControlElem.querySelectorAll('option'), function (elem, index, array) {
        if (elem.getAttribute('value') === targetOptionValue.toString()) {
            if (isSelected) {
                return;
            }
            elem.setAttribute('selected', '');
            isSelected = true;
        } else {
            elem.removeAttribute('selected');
        }
    });
}

/**
 * @function setRadio
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setRadio (formConfigItem, value, newFormData) {
    var formControlElems = Array.prototype.filter.call(
        this.formElem.querySelectorAll(`input[type="radio"]`),
        function (elem, index, array) {
            return elem.getAttribute('name') === formConfigItem.key;
        }
    );
    Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
        var targetOption = util.getTargetItemFromArrayByKey(
            formConfigItem.option.options, 
            elem.getAttribute('value'),
            'value'
        );
        if (
            targetOption
            && targetOption.value === value
        ) {
            // elem.setAttribute('checked', '');
            elem.checked = true;
        } else {
            // elem.removeAttribute('checked');
            elem.checked = false;
        }
    });
}

/**
 * @function setCheckbox
 * @param {FormConfigItem} formConfigItem
 * @param {any} value
 * @param {Object} newFormData
 */
function setCheckbox (formConfigItem, value, newFormData) {
    var formControlElems = Array.prototype.filter.call(
        this.formElem.querySelectorAll(`input[type="checkbox"]`),
        function (elem, index, array) {
            return elem.getAttribute('name') === formConfigItem.key;
        }
    );
    if (Array.isArray(value)) {
        Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
            var targetOption = util.getTargetItemFromArrayByKey(
                formConfigItem.option.options, 
                elem.getAttribute('value'),
                'value'
            );
            if (
                targetOption
                && value.includes(targetOption.value)
            ) {
                // elem.setAttribute('checked', '');
                elem.checked = true;
            } else {
                // elem.removeAttribute('checked');
                elem.checked = false;
            }
        });
    } else {
        Array.prototype.forEach.call(formControlElems, function (elem, index, array) {
            elem.removeAttribute('checked');
            elem.checked = false;
        });
    }
}

/**
 * 
 * @param {FormConfigItem} formConfigItem 
 * @param {any} value 
 * @param {Object} newFormData
 */
function setDatePicker (formConfigItem, value, newFormData) {
    console.log('setDatePicker', formConfigItem, value, newFormData);

    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    formControlElem.setAttribute('value', value);
    formControlElem.value = value;

    var pickerInstance = formConfigItem.instance;
    if (!pickerInstance) {
        return;
    }
    pickerInstance.datetimepicker('update');
}

/**
 * 
 * @param {FormConfigItem} formConfigItem 
 * @param {any} value 
 * @param {Object} newFormData
 */
function setTimePicker (formConfigItem, value, newFormData) {
    console.log('setTimePicker', formConfigItem, value, newFormData);

    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    formControlElem.setAttribute('value', value);
    formControlElem.value = value;

    var pickerInstance = formConfigItem.instance;
    if (!pickerInstance) {
        return;
    }
    pickerInstance.datetimepicker('update');
}

/**
 * 
 * @param {FormConfigItem} formConfigItem 
 * @param {any} value 
 * @param {Object} newFormData
 */
function setDateTimePicker (formConfigItem, value, newFormData) {
    console.log('setDateTimePicker', formConfigItem, value, newFormData);

    var formControlElem = this.formElem.querySelector(`input[name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }
    formControlElem.setAttribute('value', value);
    formControlElem.value = value;

    var pickerInstance = formConfigItem.instance;
    if (!pickerInstance) {
        return;
    }
    pickerInstance.datetimepicker('update');
}

/**
 * 
 * @param {FormConfigItem} formConfigItem 
 * @param {any} value 
 * @param {Object} newFormData
 */
function setTransfer (formConfigItem, value, newFormData) {
    console.log('setTransfer', formConfigItem, value, newFormData);

    var self = this;
    var formControlElem = this.formElem.querySelector(`.transfer[data-name="${formConfigItem.key}"]`);
    if (!formControlElem) {
        return;
    }

    // // find all transfer content item elems
    // var transferListAllContentItemElems = formControlElem.querySelectorAll('.transfer-list.transfer-list-all .transfer-list-content-item');
    // var transfetListSelectedContentItemElems = formControlElem.querySelectorAll('.transfer-list.transfer-list-selected .transfer-list-content-item');
    // // mapping transfer-list-all content item elems, if value includes its attr "value", move elem to transfer-list-selected
    // // mapping transfer-list-selected content item elems, if value not includes its attr "value", move elem to transfer-list-all
    // // @deprecated may waste time in second mapping
    
    var transferListAllContentElem = formControlElem.querySelector('.transfer-list.transfer-list-all .transfer-list-content');
    var transferListSelectedContentElem = formControlElem.querySelector('.transfer-list.transfer-list-selected .transfer-list-content');
    if (
        !transferListAllContentElem
        || !transferListSelectedContentElem
    ) {
        return;
    }
    // mapping options data to find the item elem and distribute it to corresponding list
    formConfigItem.option.options.forEach(function (item, index, array) {
        // if value includes option value
        if (
            Array.isArray(value)
            && value.includes(item.value)
        ) {
            var targetItemElem = formControlElem.querySelector(
                `.transfer-list.transfer-list-all .transfer-list-content-item[data-key="${item.value}"]`
            );
            // option is not in transfer-list-all, can skip
            if (!targetItemElem) {
                return;
            }
            // option is in transfer-list-all, move to transfer-list-selected
            // insert into as first child element
            util.insertFirstChildElement(transferListSelectedContentElem, targetItemElem);
        }
        // value not includes option value
        else {
            var targetItemElem = formControlElem.querySelector(
                `.transfer-list.transfer-list-selected .transfer-list-content-item[data-key="${item.value}"]`
            ); 
            // option is not in transfer-list-selected, can skip
            if (!targetItemElem) {
                return;
            }
            // option is in transfer-list-selected, move to transfer-list-all
            // append is fine
            transferListAllContentElem.appendChild(targetItemElem);
        }
    });
    // un-check all checkbox elems, includes two selectAll checkbox
    var transferCheckboxInputElems = formControlElem.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(transferCheckboxInputElems, function (elem, index, array) {
        // elem.removeAttribute('checked');
        elem.checked = false;
    });
    // update header selected text
    var transferListAllHeaderSelectedTextElem = formControlElem.querySelector(
        '.transfer-list-all .transfer-list-header .transfer-list-header-selected'
    );
    var transferListSelectedHeaderSelectedTextElem = formControlElem.querySelector(
        '.transfer-list-selected .transfer-list-header .transfer-list-header-selected'
    );
    if (transferListAllHeaderSelectedTextElem) {
        transferListAllHeaderSelectedTextElem.innerHTML = `${transferListAllContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
    if (transferListSelectedHeaderSelectedTextElem) {
        transferListSelectedHeaderSelectedTextElem.innerHTML = `${transferListSelectedContentElem.querySelectorAll('.transfer-list-content-item').length} 项`;
    }
}

export default {
    setHidden: setHidden,
    setPlainText: setPlainText,
    setTextInput: setTextInput,
    setNumberInput: setNumberInput,
    setPhoneInput: setPhoneInput,
    setEmailInput: setEmailInput,
    setPasswordInput: setPasswordInput,
    setTextArea: setTextArea,
    setSlider: setSlider,
    setSelect: setSelect,
    setRadio: setRadio,
    setCheckbox: setCheckbox,
    setDatePicker: setDatePicker,
    setTimePicker: setTimePicker,
    setDateTimePicker: setDateTimePicker,
    setTransfer: setTransfer
};