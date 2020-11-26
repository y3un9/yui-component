/**
 * @author SubwaySamurai
 * @date 2020/11/26
 * @description 开关
 */

import Component from '../Component';

/**
 * @constructor 开关
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Switch(selector) {
    Component.call(this, selector);

    this.state = {
        isActive: false,
        isDisabled: false,
        activeClassName: 'active',
        disabledClassName: 'disabled'
    };

    this.handleSwitchBtnClick = this.handleSwitchBtnClick.bind(this);
}
Switch.prototype = Object.create(Component.prototype);
Switch.prototype.constructor = Switch;
/**
 * @method init
 */
Switch.prototype.init = function () {
    this.rootElem.addEventListener('click', this.handleSwitchBtnClick);
};
/**
 * 处理切换按钮 click 事件
 * @method handleSwitchBtnClick
 * @param {MouseEvent} e 
 */
Switch.prototype.handleSwitchBtnClick = function (e) {
    // 检查开关是否禁用
    if (
        this.rootElem.classList.contains(this.disabledClassName)
        || this.rootElem.getAttribute('aria-disabled') === 'true'
    ) {
        return;
    }
    // 检查开关是否激活
    if (
        this.rootElem.classList.contains(this.activeClassName)
        || this.rootElem.getAttribute('aria-checked') === 'true'
    ) {
        this.rootElem.setAttribute('aria-checked', 'false');
        this.rootElem.classList.remove(this.activeClassName);
    } else {
        this.rootElem.setAttribute('aria-checked', 'true');
    }
};
/**
 * @method render
 */
Switch.prototype.render = function () {

};
export default Switch;

