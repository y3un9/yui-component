/**
 * @author SubwaySamurai
 * @date 2021/08/06
 * @description 旧密码修改新密码表单
 */

import './ChangePasswordForm.css';

import Form from '../Form/Form';

import util from '../../../util';

// oldPassword
// newPassword
// confirmPassword

/**
 * @constructor
 * @extends Form
 * @param {string | HTMLElement} selector 
 */
function ChangePasswordForm (selector) {
    // super constructor
    Form.apply(this, arguments);
}
ChangePasswordForm.prototype = Object.create(Form.prototype);
ChangePasswordForm.prototype.constructor = ChangePasswordForm;
ChangePasswordForm.prototype.formController = {
    ...Form.prototype.formController,
    'newPassword': {
        validate: function (formConfigItem, value) {
            var validateFuncFormType = this.formController[formConfigItem.type].validate;
            if (typeof validateFuncFormType === 'function') {
                var validateResult = validateFuncFormType.apply(this, arguments);
                if (typeof validateResult === 'object') {
                    if (!validateResult.flag) {
                        return validateResult;
                    }
                }
                if (typeof validateResult === 'boolean') {
                    if (!validateResult) {
                        return validateResult;
                    }
                }
            }
            var formControlElem = this.formElem.querySelector(`*[name="${formConfigItem.key}"]`);
            // 校验新密码与旧密码是否不一致
            var valueOldPassword = formData['oldPassword'];
            if (valueOldPassword === value) {
                formControlElem.focus();
                return {
                    flag: false,
                    status: this.VALIDATE_STATUS.ERROR,
                    help: `${formConfigItem.title}与${util.getTargetItemFromArrayByKey(this.state.formConfig, 'oldPassword', 'key').title}相同`
                };
            }
            return true;
        }
    },
    'confirmPassword': {
        validate: function (formConfigItem, value) {
            var validateFuncFormType = this.formController[formConfigItem.type].validate;
            if (typeof validateFuncFormType === 'function') {
                var validateResult = validateFuncFormType.apply(this, arguments);
                if (typeof validateResult === 'object') {
                    if (!validateResult.flag) {
                        return validateResult;
                    }
                }
                if (typeof validateResult === 'boolean') {
                    if (!validateResult) {
                        return validateResult;
                    }
                }
            }
            var formControlElem = this.formElem.querySelector(`*[name="${formConfigItem.key}"]`);
            // 校验确认密码与新密码是否一致
            var valueNewPassword = formData['newPassword'];
            if (valueNewPassword !== value) {
                formControlElem.focus();
                return {
                    flag: false,
                    status: this.VALIDATE_STATUS.ERROR,
                    help: `${formConfigItem.title}必须与${util.getTargetItemFromArrayByKey(this.state.formConfig, 'newPassword', 'key').title}保持一致`
                };
            }
            return true;
        }
    }
}
export default ChangePasswordForm;