/**
 * @author SubwaySamurai
 * @date 2020/12/07
 * @description 标签选择器
 */

import Component from '../Component';

import * as util from '../../../util';

/**
 * @typedef {Object} TagItemData
 * @property {string} key
 * @property {string} title
 * @property {string} [description]
 * @property {boolean} [isActive]
 * @property {boolean} [isDisabled]
 */

/**
 * @constructor 标签选择器
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function TagSelect (selector) {
    Component.call(this, selector);

    this.state = {
        tagClassName: '',
        tagActiveClassName: '',
        tagDisabledClassName: '',
        /** @type {Array<TagItemData>} */
        tagListData: []
    };

    /** @type {HTMLElement} */
    this.tagListElem = this.rootElem;

    this.handleTagClick = this.handleTagClick.bind(this);
}
TagSelect.prototype = Object.create(Component.prototype);
TagSelect.prototype.constructor = TagSelect;
/**
 * @method init
 */
TagSelect.prototype.init = function () {
    util.delegate(this.tagListElem, 'click', '.' + this.state.tagClassName, this.handleTagClick);
};
/**
 * 获取所有标签元素
 * @method getTagElems
 * @returns {NodeListOf<HTMLElement>}
 */
TagSelect.prototype.getTagElems = function () {
    return this.tagListElem.querySelectorAll('.' + this.state.tagClassName);
};
/**
 * 获取已选中的标签元素
 * @method getActiveTagElems
 * @returns {NodeListOf<HTMLElement>}
 */
TagSelect.prototype.getActiveTagElems = function () {
    return Array.prototype.filter.call(this.getTagElems(), function (elem, index, array) {
        elem.getAttribute('aria-selected') === 'true';
    });
};
/**
 * 获取标签列表中所有已选择标签的 key 值
 * @method getSelectedKeys
 * @returns {Array<string>}
 */
TagSelect.prototype.getSelectedKeys = function () {
    // 目前有两种方式
    // 1. 直接通过 state.tagListData 获取原始数据
    // 2. 通过元素属性来获取动态数据

    // 1. 直接通过 state.tagListData 获取原始数据
    return this.state.tagListData.filter(function (item, index, array) {
        return typeof item.isActive === 'boolean' && item.isActive;
    }).map(util.makeMapCallback('key'));

    // 2. 通过元素属性来获取动态数据
    return this.getActiveTagElems().map(function (elem, index, array) {
        return elem.getAttribute('data-key');
    });
};
/**
 * 设置标签列表已选择标签的 key 值进行重新渲染，这个有必要吗，感觉可以直接通过设置 state.tagListData 后重新渲染就好了
 * @method setSelectedKeys
 * @param {Array<string>} data 
 */
TagSelect.prototype.setSelectedKeys = function (data) {
    // 还是有两种方式
    // 1. 通过更新 state 并重新执行 render 函数
    // 2. 直接遍历元素进行属性更改

    // 1. 通过更新 state 并重新执行 render 函数
    var new_list_data = this.state.tagListData.map(function (item, index, array) {
        if (data.includes(item.key)) {
            item.isActive = true;
        }
        return item;
    });
    this.setState({
        tagListData: new_list_data
    });
    this.render();
    return;

    // 2. 直接遍历元素进行属性更改
    var self = this;
    Array.prototype.forEach.call(this.getTagElems(), function (elem, index, array) {
        if (data.includes(elem.getAttribute('data-key'))) {
            elem.setAttribute('aria-selected', 'true');
            elem.classList.add(self.state.tagActiveClassName);
        } else {
            elem.setAttribute('aria-selected', 'false');
            elem.classList.remove(self.state.tagActiveClassName);
        }
    });
    // TODO: 其实改完之后如果需要把 active 状态记在组件 state 中还得去遍历改 state，如果要直接操作元素的话那 state 就没必要记 active 状态
};
/**
 * 处理标签 click 事件
 * @method handleTagClick
 * @param {MouseEvent} e 
 * @param {HTMLElement} elem
 */
TagSelect.prototype.handleTagClick = function (e, elem) {
    // 还是两种方式
    // 1. 直接根据 state.tagListData 来的对应数据来判断是否要改变 isActive 字段
    // 2. 通过元素属性来判断是否更改元素样式和元素属性

    // 1. 直接根据 state.tagListData 来的对应数据来判断是否要改变 isActive 字段
    var key = elem.getAttribute('data-key');
    var target_item = null;
    var new_list_data = this.state.tagListData.map(function (item, index, array) {
        if (item.key === key) {
            target_item = item;
            if (item.isActive) {
                item.isActive = false;
            } else {
                item.isActive = true;
            }
        }
        return item;
    });
    if (target_item) {
        // 这里又有两种做法
        // 1. 整个标签列表重新渲染
        // 2. 只渲染更新的这个标签
        // 3. 直接更改元素的样式与属性

        // 1. 整个标签列表重新渲染
        this.setState({
            tagListData: new_list_data
        });
        this.render();

        // 2. 只渲染更新的这个标签
        // 注意数据已经修改过是最新的了
        var txt = this.renderTagItem(target_item);
        var temp_document = new DOMParser().parseFromString(txt, 'text/html');
        var new_elem = temp_document.querySelector('.' + this.state.tagClassName);
        var next_sibling_elem = elem.nextElementSibling;
        var parent_elem = elem.parentElement;
        parent_elem.removeChild(elem);
        // 判断当前事件触发元素是否有后面的兄弟元素（最后一个子元素没有 next 兄弟元素）
        if (next_sibling_elem) {
            parent_elem.insertBefore(new_elem, next_sibling_elem);
        } else {
            parent_elem.appendChild(new_elem);
        }

        // 3. 直接更改元素的样式与属性
        if (target_item.isActive === true) {
            elem.setAttribute('aria-selected', 'true');
            elem.classList.add(this.state.tagActiveClassName);
        } else {
            elem.setAttribute('aria-selected', 'false');
            elem.classList.remove(this.state.tagActiveClassName)
        }

    }
    return;

    // 2. 通过元素属性来判断是否更改元素样式和元素属性
    var is_active = elem.getAttribute('aria-selected');
    if (is_active === 'true') {
        elem.setAttribute('aria-selected', 'false');
        elem.classList.remove(this.state.tagActiveClassName);
    } else {
        elem.setAttribute('aria-selected', 'true');
        elem.classList.add(this.state.tagActiveClassName)
    }
    var key = elem.getAttribute('data-key');
    var target_item = null;
    var new_list_data = this.state.tagListData.map(function (item, index, array) {
        if (item.key === key) {
            target_item = item;
            if (is_active === 'true') {
                item.isActive = false;
            } else {
                item.isActive = true;
            }
        }
        return item;
    });
    if (target_item) {
        this.setState({
            tagListData: new_list_data
        });
    }
    // TODO: 修改完元素之后还是需要去修改 state，
};
/**
 * @method renderTagList
 * @param {Array<TagItemData>} data 
 */
TagSelect.prototype.renderTagList = function (data) {
    if (!Array.isArray(data)) {
        data = [];
    }
    this.tagListElem.innerHTML = data.reduce(util.makeReduceCallbackStringConcat(this.renderTagItem.bind(this)), '');
};
/**
 * @method renderTagItem
 * @param {TagItemData} data
 * @returns {string}
 */
TagSelect.prototype.renderTagItem = function (data) {
    if (!data) {
        return '';
    }
    /**
     * 获取标签项元素属性 selected 值
     * @function getAttrSelected
     * @param {TagItemData['isActive']} data 
     * @returns {'true'|'false'}
     */
    var getAttrSelected = function (data) {
        if (typeof data === 'boolean') {
            return data.toString();
        } else {
            return 'false';
        }
    };
    /**
     * 获取标签项元素属性 disabled 值
     * @function getAttrDisabled
     * @param {TagItemData['isDisabled']} data 
     * @returns {'true'|'false'}
     */
    var getAttrDisabled = function (data) {
        if (typeof data === 'boolean') {
            return data.toString();
        } else {
            return 'false';
        }
    };
    return (
        `
            <div
                class="
                    ${this.state.tagClassName}
                    ${data.isActive ? this.state.tagActiveClassName : ''}
                    ${data.isDisabled ? this.state.tagDisabledClassName : ''}
                "
                title="${data.description || ''}"
                data-key="${data.key}"
                aria-selected="${getAttrSelected(data.isActive)}"
                aria-disabled="${getAttrDisabled(data.isDisabled)}"
            >
                ${this.renderTagContent(data)}
            </div>
        `
    );
};
/**
 * 可能会需要 override
 * @method renderTagContent
 * @param {TagItemData} data 
 * @returns {string}
 */
TagSelect.prototype.renderTagContent = function (data) {
    return (
        `
            <span>
                ${data.title}
            </span>
        `
    );
};
/**
 * @method render
 */
TagSelect.prototype.render = function () {
    // 还是两种方式
    // 1. render 函数用于每次渲染
    // 2. render 函数只用于初次渲染

    // 1. render 函数用于每次渲染
    this.renderTagList(this.state.tagListData);
    return;

    // 2. render 函数只用于初次渲染
    
};
export default TagSelect;