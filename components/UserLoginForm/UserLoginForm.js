/**
 * @author SubwaySamurai
 * @date 2021/08/06
 * @description 用户登录表单
 */

import './UserLoginForm.css';

import Form from '../Form/Form';

import util from '../../../util';

/**
 * @constructor
 * @extends Form
 * @param {string | HTMLElement} selector 
 */
function UserLoginForm (selector) {
    // super constructor
    Form.apply(this, arguments);
}
UserLoginForm.prototype = Object.create(Form.prototype);
UserLoginForm.prototype.constructor = UserLoginForm;
export default UserLoginForm;