/**
 * @author SubwaySamurai
 * @date 2021/???
 * @description 
 */

import FormSetter from './FormSetter';
import FormGetter from './FormGetter';
import FormRenderer from './FormRenderer';
import FormValidator from './FormValidator';

var formControls = {
    'Hidden': {
        set: FormSetter.setHidden,
        get: FormGetter.getHidden,
        render: FormRenderer.renderHidden,
        validate: FormValidator.validateHidden
    },
    'PlainText': {
        set: FormSetter.setPlainText,
        get: FormGetter.getPlainText,
        render: FormRenderer.renderPlainText,
        validate: FormValidator.validatePlainText
    },
    'TextInput': {
        set: FormSetter.setTextInput,
        get: FormGetter.getTextInput,
        render: FormRenderer.renderTextInput,
        validate: FormValidator.validateTextInput
    },
    'NumberInput': {
        set: FormSetter.setNumberInput,
        get: FormGetter.getNumberInput,
        render: FormRenderer.renderNumberInput,
        validate: FormValidator.validateNumberInput
    },
    'PhoneInput': {
        set: FormSetter.setPhoneInput,
        get: FormGetter.getPhoneInput,
        render: FormRenderer.renderPhoneInput,
        validate: FormValidator.validatePhoneInput
    },
    'EmailInput': {
        set: FormSetter.setEmailInput,
        get: FormGetter.getEmailInput,
        render: FormRenderer.renderEmailInput,
        validate: FormValidator.validateEmailInput
    },
    'PasswordInput': {
        set: FormSetter.setPasswordInput,
        get: FormGetter.getPasswordInput,
        render: FormRenderer.renderPasswordInput,
        validate: FormValidator.validatePasswordInput
    },
    'TextArea': {
        set: FormSetter.setTextArea,
        get: FormGetter.getTextArea,
        render: FormRenderer.renderTextArea,
        validate: FormValidator.validateTextArea
    },
    'Switch': {
        set: FormSetter.setSelect,
        get: FormGetter.getSelect,
        render: FormRenderer.renderSwitch,
        validate: FormValidator.validateSwitch
    },
    'Stepper': {
        set: null,
        get: null,
        render: FormRenderer.renderStepper,
        validate: FormValidator.validateStepper
    },
    'Slider': {
        set: FormSetter.setSlider,
        get: FormGetter.getSlider,
        render: FormRenderer.renderSlider,
        validate: FormValidator.validateSlider
    },
    'Select': {
        set: FormSetter.setSelect,
        get: FormGetter.getSelect,
        render: FormRenderer.renderSelect,
        validate: FormValidator.validateSelect
    },
    'Radio': {
        set: FormSetter.setRadio,
        get: FormGetter.getRadio,
        render: FormRenderer.renderRadio,
        validate: FormValidator.validateRadio
    },
    'Checkbox': {
        set: FormSetter.setCheckbox,
        get: FormGetter.getCheckbox,
        render: FormRenderer.renderCheckbox,
        validate: FormValidator.validateCheckbox
    },
    'DatePicker': {
        set: FormSetter.setDatePicker,
        get: FormGetter.getDatePicker,
        render: FormRenderer.renderDatePicker,
        validate: FormValidator.validateDatePicker
    },
    'TimePicker': {
        set: FormSetter.setTimePicker,
        get: FormGetter.getTimePicker,
        render: FormRenderer.renderTimePicker,
        validate: FormValidator.validateTimePicker
    },
    'DateTimePicker': {
        set: FormSetter.setDateTimePicker,
        get: FormGetter.getDateTimePicker,
        render: FormRenderer.renderDateTimePicker,
        validate: FormValidator.validateDateTimePicker
    },
    'DateRange': {
        set: null,
        get: null,
        render: null,
        validate: null
    },
    'Cascader': {
        set: null,
        get: null,
        render: null,
        validate: null
    },
    'Transfer': {
        set: FormSetter.setTransfer,
        get: FormGetter.getTransfer,
        render: FormRenderer.renderTransfer,
        validate: FormValidator.validateTransfer
    }
};

export default formControls;