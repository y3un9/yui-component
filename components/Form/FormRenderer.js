/**
 * @author KahoYeung
 * @date 2021/01/21
 * @description 表单渲染器
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
 * @function renderHidden
 * @this Form
 * @param {FormItem & { option: HiddenOption }} data 
 * @returns {string}
 */
function renderHidden (data) {
    var template = `
        <input
            name="${data.key}"
            type="hidden"
            value="${data.value || ''}"
        />
    `;
    return template;
}
/**
 * @function renderPlainText
 * @this Form
 * @param {FormItem & { option: PlainTextOption }} data 
 * @returns {string}
 */
function renderPlainText (data) {
    var template = `
        <span class="form-text" data-name="${data.key}">
            ${data.value}
        </span>
        <input 
            name="${data.key}"
            type="hidden" 
            value="${data.value || ''}" 
        />
    `;
    return template;
}
/**
 * @function renderTextInput
 * @this Form
 * @param {FormItem & { option: TextInputOption }} data 
 * @returns {string}
 */
function renderTextInput (data) {
    // // @deprecated 2021/10/12 当 value 或者 placeholder 值中包含双引号 '"', 那么字符串模板合并后元素插入到文档中会出现问题
    // // 比如 value 被赋值 {"asd":123}, 那么拼接后模板字符串是 value="{"asd":123}", 插入文档时会认作 「 value="{" 」 「 asd":123}" 」
    // var template = `
    //     <input
    //         class="form-control"
    //         name="${data.key}"
    //         type="text"
    //         value="${data.value || ''}"
    //         minlength="${(data.option || {}).minLength || ''}"
    //         maxlength="${(data.option || {}).maxLength || ''}"
    //         placeholder="${(data.option || {}).placeholder || data.title || ''}"
    //         autocomplete="off"
    //         ${data.disabled ? 'disabled' : ''}
    //     />
    // `;
    // return template;

    var template = `
        <input
            class="form-control"
            name="${data.key}"
            type="text"
            value=""
            minlength="${(data.option || {}).minLength || ''}"
            maxlength="${(data.option || {}).maxLength || ''}"
            placeholder=""
            autocomplete="off"
            ${data.disabled ? 'disabled' : ''}
        />
    `;
    var inputElem = util.parseDOM(template)[0];
    inputElem.setAttribute('value', data.value || data.default || '');
    inputElem.setAttribute('placeholder', (data.option || {}).placeholder || data.title || '');
    return util.getOuterHTML(inputElem);
}
/**
 * @function renderNumberInput
 * @this Form
 * @param {FormItem & { option: NumberInputOption }} data 
 * @returns {string}
 */
function renderNumberInput (data) {
    var template = `
        <input
            class="form-control"
            name="${data.key}"
            type="number"
            value="${(function () {
                var value = data.value;
                if (typeof value === 'number') {
                    return value;
                } else {
                    return value || '';
                }
            }())}"
            min="${(function () {
                var min = (data.option || {}).min;
                if (typeof min === 'number') {
                    return min;
                } else {
                    return '';
                }
            }())}"
            max="${(function () {
                var max = (data.option || {}).max;
                if (typeof max === 'number') {
                    return max;
                } else {
                    return '';
                }
            }())}"
            step="${(function () {
                var step = (data.option || {}).step;
                if (typeof step === 'number') {
                    return step;
                } else {
                    return ''
                }
            }())}"
            placeholder="${(data.option || {}).placeholder || data.title || ''}"
            autocomplete="off"
            ${data.disabled ? 'disabled' : ''}
        />
    `;
    return template;
}
/**
 * @function renderPhoneInput
 * @this Form
 * @param {FormItem & { option: PhoneInputOption }} data 
 * @returns {string}
 */
function renderPhoneInput (data) {
    var template = `
        <input
            class="form-control"
            name="${data.key}"
            type="text"
            value="${data.value || ''}"
            minlength="${(data.option || {}).length || ''}"
            maxlength="${(data.option || {}).length || ''}"
            placeholder="${(data.option || {}).placeholder || data.title || ''}"
            autocomplete="off"
            ${data.disabled ? 'disabled' : ''}
        />
    `;
    return template;
}
/**
 * @function renderEmailInput
 * @this Form
 * @param {FormItem & { option: EmailInputOption }} data 
 * @returns {string}
 */
function renderEmailInput (data) {
    var template = `
        <input
            class="form-control"
            name="${data.key}"
            type="text"
            value="${data.value || ''}"
            minlength="${(data.option || {}).minLength || ''}"
            maxlength="${(data.option || {}).maxLength || ''}"
            placeholder="${(data.option || {}).placeholder || data.title || ''}"
            autocomplete="off"
            ${data.disabled ? 'disabled' : ''}
        />
    `;
    return template;
}
/**
 * @function renderPasswordInput
 * @this Form
 * @param {FormItem & { option: PasswordInputOption }} data 
 * @returns {string}
 */
function renderPasswordInput (data) {
    var template = `
        <input
            class="form-control"
            name="${data.key}"
            type="password"
            value="${data.value || ''}"
            minlength="${(data.option || {}).minLength || ''}"
            maxlength="${(data.option || {}).maxLength || ''}"
            placeholder="${(data.option || {}).placeholder || data.title || ''}"
            autocomplete="off"
            ${data.disabled ? 'disabled' : ''}
        />
    `;
    return template;
}
/**
 * @function renderTextArea
 * @this Form
 * @param {FormItem & { option: TextAreaOption }} data 
 * @returns {string}
 */
function renderTextArea (data) {
    var template = 
        `<textarea
                class="form-control"
                name="${data.key}"
                rows="4"
                placeholder="${(data.option || {}).placeholder || data.title || ''}"
                ${data.disabled ? 'disabled': ''}
        >`
        .concat(data.value || '')
        .concat('</textarea>');
    return template;
}
/**
 * @function renderSwitch
 * @this Form
 * @param {FormItem & { option: SwitcherOption }} data 
 * @returns {string}
 */
function renderSwitch (data) {
    var template = `
        <button
            class="switch"
            name="${data.key}"
            aria-check=""
            data-on="${((data.option || {}).on || {}).value || ''}"
            data-off="${((data.option || {}).off || {}).value || ''}"
            ${data.disabled ? 'disabled' : ''}
        >
            <span class="switch-indicator"></span>
        </button>
    `;
    
    return template;
}
/**
 * @function renderStepper
 * @this Form
 * @param {FormItem & { option: StepperOption }} data 
 * @returns {string}
 */
function renderStepper (data) {
    var template = `
        
    `;
    return template;
}

/**
 * @function renderSlider
 * @this Form
 * @param {FormItem & { option: SliderOption }} data 
 * @returns {string}
 */
function renderSlider (data) {
    var now = new Date();
    var dataListId = `DataListSlider_${data.key}_${now.getTime().toString()}`;
    var min = (data.option || {}).min || 0;
    var max = (data.option || {}).max || 100;
    var step = (data.option || {}).step || 1;
    var isShowMarks = (data.option || {}).showMarks || false;
    var template = `
        <div class="slider ${isShowMarks ? 'slider-with-marks' : ''}">
            <div class="slider-step">
                ${(function () {
                    var steps = ( max - min ) / step + 1;
                    var ranges = Array.from({ length: steps });
                    var marks = (data.option || {}).marks;
                    if (!Array.isArray(marks)) {
                        marks = [];
                    }
                    return ranges.reduce(function (previous, item, index, array) {
                        var value = min + index * step;
                        var text = value.toString();
                        // start and end show mark label text
                        if (
                            index === 0
                            || index === array.length - 1
                        ) {
                            return previous.concat(`
                                <span 
                                    class="slider-step-dot" 
                                    data-value="${value}" 
                                    style="left: ${( value - min ) / max * 100}%;"
                                >
                                </span>
                            `);
                        }
                        // marks show mark label text
                        var targetMark = util.getTargetItemFromArrayByKey(marks, value, 'value');
                        if (targetMark) {
                            text = targetMark.text || text;
                            return previous.concat(`
                                <span 
                                    class="slider-step-dot" 
                                    data-value="${value}" 
                                    style="left: ${( value - min ) / max * 100}%;"
                                >
                                </span>
                            `);
                        }
                        return previous;
                    }, '');
                }())}
            </div>
            <input
                class="slider-input"
                name="${data.key}"
                type="range"
                value=""
                min="${min}"
                max="${max}"
                step="${step}"
                list="${dataListId}"
                ${data.required ? 'required' : ''}
                ${data.disabled ? 'disabled' : ''}
            />
            <datalist id="${dataListId}">
                ${(function () {
                    var steps = ( max - min ) / step + 1;
                    var ranges = Array.from({ length: steps });
                    var marks = (data.option || {}).marks;
                    if (!Array.isArray(marks)) {
                        marks = [];
                    }
                    return ranges.reduce(function (previous, item, index, array) {
                        var value = min + index * step;
                        var text = value.toString();
                        // start and end show mark label text
                        if (
                            index === 0
                            || index === array.length - 1
                        ) {
                            return previous.concat(`
                                <option value="${value}" label="${text}">
                                </option>
                            `);
                        }
                        // marks show mark label text
                        var targetMark = util.getTargetItemFromArrayByKey(marks, value, 'value');
                        if (targetMark) {
                            text = targetMark.text || text;
                            return previous.concat(`
                                <option value="${value}" label="${text}">
                                </option>
                            `);
                        }
                        // other steps show step
                        return previous.concat(`
                            <option value="${value}">
                            </option>
                        `);
                    }, '');
                }())}
            </datalist>
            <div class="slider-mark">
                ${(function () {
                    var steps = ( max - min ) / step + 1;
                    var ranges = Array.from({ length: steps });
                    var marks = (data.option || {}).marks;
                    if (!Array.isArray(marks)) {
                        marks = [];
                    }
                    return ranges.reduce(function (previous, item, index, array) {
                        var value = min + index * step;
                        var text = value.toString();
                        // start and end show mark label text
                        if (
                            index === 0
                            || index === array.length - 1
                        ) {
                            return previous.concat(`
                                <span 
                                    class="slider-mark-text" 
                                    data-value="${value}" 
                                    style="transform: translateX(-50%);left: ${( value - min ) / max * 100}%;"
                                >
                                    ${text}
                                </span>
                            `);
                        }
                        // marks show mark label text
                        var targetMark = util.getTargetItemFromArrayByKey(marks, value, 'value');
                        if (targetMark) {
                            text = targetMark.text || text;
                            return previous.concat(`
                                <span 
                                    class="slider-mark-text" 
                                    data-value="${value}" 
                                    style="transform: translateX(-50%);left: ${( value - min ) / max * 100}%;"
                                >
                                    ${text}
                                </span>
                            `);
                        }
                        return previous;
                    }, '');
                }())}
            </div>
            <div class="slider-tooltip" style="display: none;">
                <div class="slider-tooltip-content">
                    <div class="slider-tooltip-arrow">
                    </div>
                    <div class="slider-tooltip-inner">

                    </div>
                </div>
            </div>
        </div>
    `;
    return template;
}

/**
 * @function renderSelect
 * @this Form
 * @param {FormItem & { option: SelectorOption }} data 
 * @returns {string}
 */
function renderSelect (data) {
    var template = `
        <select
            class="form-control"
            name="${data.key}"
            ${data.required ? 'required': ''}
            ${data.disabled ? 'disabled': ''}
        >
            
        </select>
    `;
    var select_elem = new DOMParser().parseFromString(template, 'text/html').querySelector('select');
    util.renderSelectElem(select_elem, {
        empty_value: '',
        empty_text: (data.option || {}).placeholder || '',
        options_data: (data.option || {}).options || [],
        // select_value: data.value || data.default || null,
        select_value: (
            typeof data.value === 'number'
                ? data.value
                : (
                    data.value || (
                        typeof data.default === 'number'
                            ? data.default
                            : (
                                data.default || null
                            )
                    )
                )
        ),
        hide_empty: (data.option || {}).hidePlaceholder
    });
    return select_elem.parentElement.innerHTML;
}
/**
 * @function renderRadio
 * @this Form
 * @param {FormItem & { option: RadioOption }} data 
 * @returns {string}
 */
function renderRadio (data) {
    var template = '';
    if ((data.option || {}).layout === 'horizontal') {
        template += `
            <div class="radio-group" data-name="${data.key}">
                ${((data.option || {}).options || []).reduce(function (total, item, index, array) {
                    return total.concat(`
                        <label class="radio-wrapper" title="${item.description || ''}">
                            <input
                                class="radio-input"
                                name="${data.key}"
                                type="radio"
                                value="${item.value}"
                                ${(function () {
                                    if (data.default === item.value) {
                                        return 'checked';
                                    } else {
                                        return '';
                                    }
                                }())}
                                ${(function () {
                                    if (
                                        data.disabled
                                        || item.disabled
                                    ) {
                                        return 'disabled';
                                    } else {
                                        return '';
                                    }
                                }())}
                            />
                            <span class="radio-label">
                                ${item.text}
                            </span>
                        </label>
                    `);
                }, '')}
            </div>
        `;
    } else {
        template += `
            <div class="radio-list" data-name="${data.key}">
                ${((data.option || {}).options || []).reduce(function (total, item, index, array) {
                    return total.concat(`
                        <div class="radio-list-item" title="${item.description || ''}">
                            <label class="radio-wrapper">
                                <input
                                    class="radio-input"
                                    name="${data.key}"
                                    type="radio"
                                    value="${item.value}"
                                    ${(function () {
                                        if (data.default === item.value) {
                                            return 'checked';
                                        } else {
                                            return '';
                                        }
                                    }())}
                                    ${(function () {
                                        if (
                                            data.disabled
                                            || item.disabled
                                        ) {
                                            return 'disabled';
                                        } else {
                                            return '';
                                        }
                                    }())}
                                />
                                <span class="radio-label">
                                    ${item.text}
                                </span>
                            </label>
                        </div>
                    `);
                }, '')}
            </div>
        `;
    }
    return template;
}
/**
 * @function renderCheckbox
 * @this Form
 * @param {FormItem & { option: CheckboxOption }} data 
 * @returns {string}
 */
function renderCheckbox (data) {
    var template = '';
    if ((data.option || {}).layout === 'horizontal') {
        template += `
            <div class="checkbox-group" data-name="${data.key}">
                ${((data.option || {}).options || []).reduce(function (total, item, index, array) {
                    return total.concat(`
                        <label class="checkbox-wrapper" title="${item.description || ''}">
                            <input
                                class="checkbox-input"
                                name="${data.key}"
                                type="checkbox"
                                value="${item.value}"
                                ${(function () {
                                    if (!Array.isArray(data.default)) {
                                        return '';
                                    }
                                    if (data.default.includes(item.value)) {
                                        return 'checked';
                                    } else {
                                        return '';
                                    }
                                }())}
                                ${(function () {
                                    if (
                                        data.disabled
                                        || item.disabled
                                    ) {
                                        return 'disabled';
                                    } else {
                                        return '';
                                    }
                                }())}
                            />
                            <span class="checkbox-label">
                                ${item.text}
                            </span>
                        </label>
                    `);
                }, '')}
            </div>
        `;
    } else {
        template += `
            <div class="checkbox-list" data-name="${data.key}">
                ${((data.option || {}).options || []).reduce(function (total, item, index, array) {
                    return total.concat(`
                        <div class="checkbox-list-item" title="${item.description || ''}">
                            <label class="checkbox-wrapper">
                                <input
                                    class="checkbox-input"
                                    name="${data.key}"
                                    type="checkbox"
                                    value="${item.value}"
                                    ${(function () {
                                        if (!Array.isArray(data.default)) {
                                            return '';
                                        }
                                        if (data.default.includes(item.value)) {
                                            return 'checked';
                                        } else {
                                            return '';
                                        }
                                    }())}
                                    ${(function () {
                                        if (
                                            data.disabled
                                            || item.disabled
                                        ) {
                                            return 'disabled';
                                        } else {
                                            return '';
                                        }
                                    }())}
                                />
                                <span class="checkbox-label">
                                    ${item.text}
                                </span>
                            </label>
                        </div>
                    `);
                }, '')}
            </div>
        `;
    }
    return template;
}
/**
 * @function renderDatePicker
 * @this Form
 * @param {FormItem & { option: DatePickerOption }} data 
 * @returns {string}
 */
function renderDatePicker (data) {
    var template = `
        <input
            class="form-control"
            name="${data.key}"
            type="text"
            value="${data.value || ''}"
            placeholder="${(data.option || {}).placeholder || data.title || ''}"
            autocomplete="off"
            ${data.disabled ? 'disabled' : ''}
        />
    `;
    return template;
}
/**
 * @function renderTimePicker
 * @this Form
 * @param {FormItem & { option: TimePickerOption }} data 
 * @returns {string}
 */
function renderTimePicker (data) {
    var template = `
        <input
            class="form-control"
            name="${data.key}"
            type="text"
            value="${data.value || ''}"
            placeholder="${(data.option || {}).placeholder || data.title || ''}"
            autocomplete="off"
            ${data.disabled ? 'disabled' : ''}
        />
    `;
    return template;
}

/**
 * @function renderDateTimePicker
 * @this Form
 * @param {FormItem & { option: DateTimePickerOption }} data 
 * @returns {string}
 */
function renderDateTimePicker (data) {
    var template = `
        <input
            class="form-control"
            name="${data.key}"
            type="text"
            value="${data.value || ''}"
            placeholder="${(data.option || {}).placeholder || data.title || ''}"
            autocomplete="off"
            ${data.disabled ? 'disabled' : ''}
        />
    `;
    return template;
}

/**
 * @function renderTransfer
 * @this Form
 * @param {FormItem & { option: TransferOption }} data 
 * @returns {string}
 */
function renderTransfer (data) {
    var unselectedOptions = [];
    var selectedOptions = [];
    if (Array.isArray(data.option.options)) {
        if (Array.isArray(data.value)) {
            data.option.options.forEach(function (item, index, array) {
                if (data.value.includes(item.value)) {
                    selectedOptions.push(item);
                } else {
                    unselectedOptions.push(item);
                }
            });
        } else {
            unselectedOptions = data.option.options;
        }
    }
    var template = `
        <div class="transfer" data-name="${data.key}">
            <div class="transfer-list transfer-list-all">
                <div class="transfer-list-header">
                    <label class="checkbox-wrapper">
                        <input
                            class="checkbox-input"
                            name="transferListAll_selectAll_${data.key}"
                            type="checkbox"
                        />
                    </label>
                    <span class="transfer-list-header-selected">
                        ${unselectedOptions.length} 项
                    </span>
                </div>
                <div class="transfer-list-body">
                    <ul class="transfer-list-content">
                        ${unselectedOptions.reduce(function (previous, item, index, array) {
                            return previous.concat(`
                                <li class="transfer-list-content-item" title="${item.text}" data-key="${item.value}">
                                    <label class="checkbox-wrapper">
                                        <input
                                            class="checkbox-input"
                                            name="transferListItem_${data.key}"
                                            type="checkbox"
                                            value="${item.value}"
                                        />
                                    </label>
                                    <span class="transfer-list-content-item-text">
                                        ${item.text}
                                    </span>
                                </li>
                            `);
                        }, '')}
                    </ul>
                </div>
                <div class="transfer-list-footer">
                    
                </div>
            </div>
            <div class="transfer-operation">
                <button class="btn btn-default" type="button" data-action="SelectAll">
                    <i class="fa fa-angle-double-right"></i>
                </button>
                <button class="btn btn-default" type="button" data-action="SelectItem">
                    <i class="fa fa-angle-right"></i>
                </button>
                <button class="btn btn-default" type="button" data-action="UnselectItem">
                    <i class="fa fa-angle-left"></i>
                </button>
                <button class="btn btn-default" type="button" data-action="UnselectAll">
                    <i class="fa fa-angle-double-left"></i>
                </button>
            </div>
            <div class="transfer-list transfer-list-selected">
                <div class="transfer-list-header">
                    <label class="checkbox-wrapper">
                        <input
                            class="checkbox-input"
                            name="transferListSelected_selectAll_${data.key}"
                            type="checkbox"
                        />
                    </label>
                    <span class="transfer-list-header-selected">
                        ${selectedOptions.length} 项
                    </span>
                </div>
                <div class="transfer-list-body">
                    <ul class="transfer-list-content">
                        ${selectedOptions.reduce(function (previous, item, index, array) {
                            return previous.concat(`
                                <li class="transfer-list-content-item" title="${item.text}" data-key="${item.value}">
                                    <label class="checkbox-wrapper">
                                        <input
                                            class="checkbox-input"
                                            name="transferListItem_${data.key}"
                                            type="checkbox"
                                            value="${item.value}"
                                        />
                                    </label>
                                    <span class="transfer-list-content-item-text">
                                        ${item.text}
                                    </span>
                                </li>
                            `);
                        }, '')}
                    </ul>
                </div>
                <div class="transfer-list-footer">
                    
                </div>
            </div>
        </div>
    `;
    return template;
}

export default {
    renderHidden: renderHidden,
    renderPlainText: renderPlainText,
    renderTextInput: renderTextInput,
    renderNumberInput: renderNumberInput,
    renderPhoneInput: renderPhoneInput,
    renderEmailInput: renderEmailInput,
    renderPasswordInput: renderPasswordInput,
    renderTextArea: renderTextArea,
    renderSwitch: renderSwitch,
    renderStepper: renderStepper,
    renderSlider: renderSlider,
    renderSelect: renderSelect,
    renderRadio: renderRadio,
    renderCheckbox: renderCheckbox,
    renderDatePicker: renderDatePicker,
    renderTimePicker: renderTimePicker,
    renderDateTimePicker: renderDateTimePicker,
    renderTransfer: renderTransfer
};