/**
 * @author SubwaySamurai
 * @date 2020/11/17
 * @description 标签导航菜单
 */

// import { Menu, MenuItem } from './Menu';
import Menu from './Menu';

/**
 * 基本没用，还是要根据实际项目中用到的组件类去写
 * @constructor 标签导航菜单
 * @extends Menu
 * @param {string|HTMLElement} selector 
 */
function TabNavMenu (selector) {
    Menu.call(this, selector);
}
TabNavMenu.prototype = Object.create(Menu.prototype);
TabNavMenu.prototype.constructor = TabNavMenu;
/**
 * @override
 * @method afterMenuItemActive
 * @param {MenuItem} item 
 */
TabNavMenu.prototype.afterMenuItemActive = function (item) {
    item.hide();
};
/**
 * @override
 * @method beforeMenuItemInactive
 * @param {MenuItem} item 
 */
TabNavMenu.prototype.beforeMenuItemInactive = function (item) {
    item.show();
    item.render();
};
/**
 * @override
 * @method renderMenuItem
 * @param {MenuItem} item 
 */
TabNavMenu.prototype.renderMenuItem = function (item) {
    return '';
};
export default TabNavMenu;
