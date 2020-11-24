/**
 * @author SubwaySamurai
 * @date 2020/11/17
 * @description 菜单
 */

import Component from '../Component';

import * as util from '../../../util';

// 需要具备的能力和只应该具备这些能力
// 使激活菜单项高亮

/**
 * @typedef {Object} MenuItem
 * @property {string|number} key
 * @property {string} title 菜单项标题
 */

/**
 * @constructor 菜单
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Menu (selector) {
    Component.call(this, selector);

    this.state = {
        /** 菜单项 CSS 类名 */
        menuItemClassName: '',
        /** 菜单项激活 CSS 类名 */
        menuItemActiveClassName: '',
        /** 菜单项禁用 CSS 类名 */
        menuItemDisabledClassName: '',
        /** @type {Array<MenuItem>} */
        menuData: []
    };

    /** 菜单列表元素  */
    this.listElem = this.rootElem;

    // 触发事件绑定 this
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleMenuItemAfterActive = this.handleMenuItemAfterActive.bind(this);
    this.handleMenuItemBeforeInactive = this.handleMenuItemBeforeInactive.bind(this);
}
Menu.prototype = Object.create(Component.prototype);
Menu.prototype.constructor = Menu;
/** 
 * @method init
 */
Menu.prototype.init = function () {
    util.delegate(this.listElem, 'click', `.${this.state.menuItemClassName}`, this.handleMenuItemClick);
    util.delegate(this.listElem, 'afteractive', `.${this.state.menuItemClassName}`, this.handleMenuItemAfterActive);
    util.delegate(this.listElem, 'beforeinactive', `.${this.state.menuItemClassName}`,  this.handleMenuItemBeforeInactive);
};
/**
 * @method getMenuItemElems
 * @returns {NodeListOf<HTMLElement>}
 */
Menu.prototype.getMenuItemElems = function () {
    return this.listElem.querySelectorAll(`.${this.state.menuItemClassName}`);
};
/**
 * @method getActiveMenuItemElem
 * @returns {HTMLElement}
 */
Menu.prototype.getActiveMenuItemElem = function () {
    return this.listElem.querySelector(`.${this.state.menuItemClassName}.${this.state.menuItemActiveClassName}`);
};
/**
 * 需要 override
 * @method afterMenuItemActive
 * @param {MenuItem} item 
 */
Menu.prototype.afterMenuItemActive = function (item) {

};
/**
 * 需要 override
 * @method beforeMenuItemInactive
 * @param {MenuItem} item 
 */
Menu.prototype.beforeMenuItemInactive = function (item) {

};
/**
 * 处理菜单项元素 afteractive 事件
 * @method handleMenuItemAfterActive
 * @param {Event} e
 * @param {HTMLElement} elem
 */
Menu.prototype.handleMenuItemAfterActive = function (e, elem) {
    var target_item = util.getTargetItemFromArrayByKey(this.state.menuData, elem.getAttribute('data-key'), 'key');
    if (target_item) {
        this.afterMenuItemActive(target_item);
    }
};
/**
 * 处理菜单项元素 beforeinactive 事件
 * @method handleMenuItemBeforeInactive
 * @param {Event} e
 * @param {HTMLElement} elem
 */
Menu.prototype.handleMenuItemBeforeInactive = function (e, elem) {
    var target_item = util.getTargetItemFromArrayByKey(this.state.menuData, elem.getAttribute('data-key'), 'key');
    if (target_item) {
        this.beforeMenuItemInactive(target_item);
    }
};
/**
 * 处理菜单项元素 click 事件
 * @method handleMenuItemClick
 * @param {MouseEvent} e 
 * @param {HTMLElement} elem 
 */
Menu.prototype.handleMenuItemClick = function (e, elem) {
    var target_elem = elem;
    // 判断事件触发元素是否被禁用
    if (target_elem.classList.contains(this.state.menuItemDisabledClassName)) {
        return;
    }
    // 判断事件触发元素是否已激活
    if (target_elem.classList.contains(this.state.menuItemActiveClassName)) {
        return;
    }
    var menu_item_elems = this.getMenuItemElems();
    var self = this;
    Array.prototype.forEach.call(menu_item_elems, function (elem, index, array) {
        // // 判断当前菜单项元素是不是目标元素
        // if (elem !== target_elem) {
        //     elem.classList.remove(self.state.menuItemActiveClassName);
        //     return;
        // }
        // elem.classList.add(self.state.menuItemActiveClassName);
        // // 做一些菜单项激活后要做的事情和取消激活后要做的事情
        // self.state.menuData.forEach(function (item, index, array) {
        //     // 判断菜单项数据是不是与目标元素对应
        //     if (item.key === elem.getAttribute('data-key')) {
        //         self.handleMenuItemActive(item);
        //     } else {
        //         self.handleMenuItemInactive(item);
        //     }
        // });

        // 尝试使用事件分发以转移逻辑与增强灵活性
        // 判断当前菜单项元素是不是目标元素
        if (elem === target_elem) {
            elem.classList.add(self.state.menuItemActiveClassName);
            elem.dispatchEvent(new Event('afteractive', {
                bubbles: true,
                cancelable: false,
                composed: true
            }));
        } else {
            if (elem.classList.contains(self.state.menuItemActiveClassName)) {
                elem.dispatchEvent(new Event('beforeinactive', {
                    bubbles: true,
                    cancelable: false,
                    composed: true
                }));
            }
            elem.classList.remove(self.state.menuItemActiveClassName);
        }
    });
};
/**
 * 需要 override
 * @method renderMenuItem
 * @param {MenuItem} item
 * @returns {string}
 */
Menu.prototype.renderMenuItem = function (item) {
    return '';
};
/**
 * @method render
 */
Menu.prototype.render = function () {
    var txt = '';
    var self = this;
    this.state.menuData.forEach(function (item, index, array) {
        txt += self.renderMenuItem(item);
    });
    this.listElem.innerHTML = txt;
};
// export {
//     MenuItem,
//     Menu
// };
export default Menu;
