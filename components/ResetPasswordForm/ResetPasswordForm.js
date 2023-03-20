/**
 * @author KahoYeung
 * @date 2021/08/06
 * @deprecated 验证码重置密码表单
 */

import './ResetPasswordForm.css';

import Form from '../Form/Form';

import util from '../../../util';

// authCode
// newPassword
// confirmPassword

/**
 * @constructor 
 * @extends Form
 * @param {string | HTMLElement} selector 
 */
function ResetPasswordForm (selector) {
    // super constructor
    Form.apply(this, arguments);
}
ResetPasswordForm.prototype = Object.create(Form.prototype);
ResetPasswordForm.prototype.constructor = ResetPasswordForm;
ResetPasswordForm.prototype.formController = {
    ...Form.prototype.formController,
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
export default ResetPasswordForm;