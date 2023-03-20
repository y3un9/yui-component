/**
 * @author KahoYeung
 * @date 2021/1/4
 * @description 分页组件
 */

import Component from '../Component';

import { delegate } from '../../../util';

/** 默认页码 */
var page_default = 1;
/** 默认分页大小 */
var page_size_default = 10;
/** 默认数据总量 */
var total_default = 0;

/**
 * @constructor 分页器
 * @param {string|HTMLElement} selector 
 */
function Pagination (selector) {
    Component.call(this, selector);

    this.state = {
        /** 
         * 当前页码 
         * @type {number}
         */
        currentPage: page_default,
        /** 
         * 分页大小 
         * @type {number}
         */
        pageSize: page_size_default,
        /** 
         * 数据总量 
         * @type {number}
         */
        total: total_default,

        paginationContainerClassName: 'pagination',
        paginationItemsContainerClassName: 'pagination-item-group',
        paginationItemClassName: 'pagination-item',
        paginationItemActiveClassName: 'active',
        /** 页码元素提示模板 */
        paginationItemTipTemplate: '第${item}页',
        /** 页码元素禁止 CSS 类名 */
        paginationItemDisabledClassName: 'disabled',
        paginationPrevClassName: 'pagination-prev',
        /** 分页前一页元素内显示文字 */
        paginationPrevInnerText: '<i class="fa fa-angle-left"></i>',
        /** 分页前一页元素提示文字 */
        paginationPrevTipText: '上一页',
        paginationNextClassName: 'pagination-next',
        /** 分页后一页元素内显示文字 */
        paginationNextInnerText: '<i class="fa fa-angle-right"></i>',
        /** 分页后一页元素提示文字 */
        paginationNextTipText: '下一页',
        paginationTotalClassName: 'pagination-total',
        /** 分页总数元素内显示模板 */
        paginationTotalInnerTemplate: '第 ${start} - ${end} 条 / 总共 ${total} 条',
        paginationQuickJumperClassName: 'pagination-quick-jumper',
        paginationSizeChangerClassName: 'pagination-size-changer',
        /** 分页大小改变器选择器元素类名 */
        paginationSizeChangerSelectorClassName: 'select',
        paginationSizeChangerSelectorOpenClassName: 'select-open',
        /** 分页大小改变器选择框元素类名 */
        paginationSizeChangerSelectionClassName: 'select-selection',
        /** 分页大小改变器选项元素内显示模板 */
        paginationSizeChangerSelectOptionInnerTemplate: '${item} 条/页',
        paginationSizeChangerSelectionIndicatorClassName: 'selected-value',
        paginationSizeChangerSelectOptionsContainerClassName: 'select-dropdown-list',
        paginationSizeChangerSelectOptionClassName: 'select-dropdown-item',
        paginationSizeChangerSelectOptionActiveClassName: 'active',
        paginationSizeChangerSelectOptionDisabledClassName: 'disabled',
        paginationSizeChangerSelectOptionsData: [
            { value: 10, text: '10' },
            { value: 20, text: '20' },
            { value: 50, text: '50' },
            { value: 100, text: '100' }
        ]
    };

    /** @type {HTMLElement} */
    this.paginationContainerElem = null;
    /** 
     * 总数元素
     * @type {HTMLElement} 
     */
    this.paginationTotalElem = null;
    /** 
     * 前一页元素 
     * @type {HTMLElement}
     */ 
    this.paginationPrevElem = null;
    /** 
     * 页码 group 元素
     * @type {HTMLElement}
     */
    this.paginationItemsContainerElem = null;
    /**
     * 后一页元素
     * @type {HTMLElement}
     */ 
    this.paginationPrevElem = null;
    /** 
     * 分页快速跳转器元素
     * @type {HTMLElement}
     */
    this.paginationQuickJumperElem = null;
    /** @type {HTMLInputElement} */
    this.paginationQuickJumperInputElem = null;
    /** 
     * 分页大小改变器元素
     * @type {HTMLElement} 
     */
    this.paginationSizeChangerElem = null;
    /** 
     * 分页大小改变器选择器元素
     * @type {HTMLElement} 
     */
    this.paginationSizeChangerSelectorElem = null;
    /** 
     * 分页大小改变器选择框元素
     * @type {HTMLElement}
     */
    this.paginationSizeChangerSelectionElem = null;
    /** @type {HTMLElement} */
    this.paginationSizeChangerSelectionIndicatorElem = null;
    /** @type {HTMLElement} */
    this.paginationSizeChangerSelectOptionsContainerElem = null;

    this.handlePaginationQuickJumperKeypress = this.handlePaginationQuickJumperKeypress.bind(this);
    this.handlePaginationSizeChangerClickOutside = this.handlePaginationSizeChangerClickOutside.bind(this);
    this.handlePaginationSizeChangerSelectionClick = this.handlePaginationSizeChangerSelectionClick.bind(this);
    this.handlePaginationSizeChangeSelectItemClick = this.handlePaginationSizeChangeSelectItemClick.bind(this);
    this.handlePaginationPrevClick = this.handlePaginationPrevClick.bind(this);
    this.handlePaginationNextClick = this.handlePaginationNextClick.bind(this);
    this.handlePaginationItemClick = this.handlePaginationItemClick.bind(this);
}
Pagination.prototype = Object.create(Component.prototype);
Pagination.prototype.constructor = Pagination;
/**
 * @method init
 */
Pagination.prototype.init = function () {
    // 插入分页模板
    var txt = `
        <div class="${this.state.paginationContainerClassName}">
            <div class="${this.state.paginationTotalClassName}" title="第 1 - n 条 / 总共 n 条">
                第 1 - n 条 / 总共 n 条
            </div>
            <div class="${this.state.paginationPrevClassName}" title="${this.state.paginationPrevTipText}">
                ${this.state.paginationPrevInnerText}
            </div>
            <div class="${this.state.paginationItemsContainerClassName}">
                <li class="${this.state.paginationItemClassName} ${this.state.paginationItemDisabledClassName}" title="第1页" data-page="1">
                    <span>1</span>
                </li>
                <li class="${this.state.paginationItemClassName} ${this.state.paginationItemActiveClassName}" title="第2页" data-page="2">
                    <span>2</span>
                </li>
            </div>
            <div class="${this.state.paginationNextClassName}" title="${this.state.paginationNextTipText}">
                ${this.state.paginationNextInnerText}
            </div>
            <div class="pagination-options">
                <div class="${this.state.paginationSizeChangerClassName}">
                    <div class="${this.state.paginationSizeChangerSelectorClassName} ${this.state.paginationSizeChangerSelectorOpenClassName}">
                        <div class="${this.state.paginationSizeChangerSelectionClassName}" tabindex="0">
                            <span class="${this.state.paginationSizeChangerSelectionIndicatorClassName}">
                                10 条/页
                            </span>
                            <span class="select-arrow">
                                <i class="fa fa-angle-down"></i>
                            </span>
                        </div>
                        <div class="select-dropdown">
                            <ul class="${this.state.paginationSizeChangerSelectOptionsContainerClassName}">
                                <li class="${this.state.paginationSizeChangerSelectOptionClassName} ${this.state.paginationSizeChangerSelectOptionActiveClassName}" data-value="10">
                                    10 条/页
                                </li>
                                <li class="${this.state.paginationSizeChangerSelectOptionClassName}" data-value="20">
                                    20 条/页
                                </li>
                                <li class="${this.state.paginationSizeChangerSelectOptionClassName}" data-value="50">
                                    50 条/页
                                </li>
                                <li class="${this.state.paginationSizeChangerSelectOptionClassName}" data-value="100">
                                    100 条/页
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="${this.state.paginationQuickJumperClassName}">
                    跳至
                    <input type="number">
                    页
                </div>
            </div>
        </div>
    `;
    this.paginationContainerElem = new DOMParser().parseFromString(txt, 'text/html').querySelector('.' + this.state.paginationContainerClassName);
    this.rootElem.appendChild(this.paginationContainerElem);

    // 获取分页器内各元素 dom 对象
    // 数量显示
    this.paginationTotalElem = this.paginationContainerElem.querySelector('.' + this.state.paginationTotalClassName);
    // 页码项
    this.paginationPrevElem = this.paginationContainerElem.querySelector('.' + this.state.paginationPrevClassName);
    this.paginationNextElem = this.paginationContainerElem.querySelector('.' + this.state.paginationNextClassName);
    this.paginationItemsContainerElem = this.paginationContainerElem.querySelector('.' + this.state.paginationItemsContainerClassName);
    // 快速跳转器
    this.paginationQuickJumperElem = this.paginationContainerElem.querySelector('.' + this.state.paginationQuickJumperClassName);
    this.paginationQuickJumperInputElem = this.paginationQuickJumperElem.querySelector('input');
    // 分页大小改变器
    this.paginationSizeChangerElem = this.paginationContainerElem.querySelector('.' + this.state.paginationSizeChangerClassName);
    this.paginationSizeChangerSelectorElem = this.paginationContainerElem.querySelector('.' + this.state.paginationSizeChangerSelectorClassName);
    this.paginationSizeChangerSelectionElem = this.paginationSizeChangerElem.querySelector('.' + this.state.paginationSizeChangerSelectionClassName);
    this.paginationSizeChangerSelectionIndicatorElem = this.paginationSizeChangerElem.querySelector('.' + this.state.paginationSizeChangerSelectionIndicatorClassName);
    this.paginationSizeChangerSelectOptionsContainerElem = this.paginationSizeChangerElem.querySelector('.' + this.state.paginationSizeChangerSelectOptionsContainerClassName);

    // 进行事件绑定
    this.paginationQuickJumperInputElem.addEventListener('keypress', this.handlePaginationQuickJumperKeypress);
    this.paginationSizeChangerSelectionElem.addEventListener('click', this.handlePaginationSizeChangerSelectionClick);
    delegate(this.paginationSizeChangerSelectOptionsContainerElem, 'click', '.' + this.state.paginationSizeChangerSelectOptionClassName, this.handlePaginationSizeChangeSelectItemClick);
    this.paginationPrevElem.addEventListener('click', this.handlePaginationPrevClick);
    this.paginationNextElem.addEventListener('click', this.handlePaginationNextClick);
    delegate(this.paginationItemsContainerElem, 'click', '.' + this.state.paginationItemClassName, this.handlePaginationItemClick);
};
/**
 * 设置数据总量
 * @method setDataTotal
 * @param {number} data 
 */
Pagination.prototype.setDataTotal = function (data) {
    var total = data;
    // 重新渲染分页部分
    // 需要用当前页码和新的数据总量进行计算
    var page = this.state.currentPage;
    var size = this.state.pageSize;
    // 开始条数 = (page - 1) * size + 1
    // 结束条数 = total < page * size ? total : page * size
    var item_start = (page - 1) * size + 1;
    var item_end = page * size;
    if (total === 0) {
        item_start = 0;
    }
    if (total < item_end) {
        item_end = total;
    }
    var txt = '';
    // 第 1 - 3 条 / 总共 3 条
    txt += `
        第 ${item_start} - ${item_end} 条 / 总共 ${total} 条
    `;
    this.paginationTotalElem.title = txt;
    this.paginationTotalElem.innerHTML = txt;
    this.setState({
        total: total
    });

    // 第一页肯定要有
    // 后面的页码是第一页
    // 如果是第一页的话把previous禁用
    // 如果是最后一页的话把next禁用
    // 先设定最多显示五个页码
    // 算出当前总数和分页大小总共有多少页码，总页码 = Math.ceil(total / size) 向上取整
    var pagination_item_prev_num = 2; // 当前页码向前最多显示两个页码
    var pagination_item_next_num = 2; // 当前页码向后最多显示两个页码
    var pagination_item_max = pagination_item_prev_num + 1 + pagination_item_next_num; // 最多显示5项
    var page_num = Math.ceil(total / size);
    console.log('page_num', page_num);
    this.paginationItemsContainerElem.innerHTML = '';
    if (page_num === 0) { // 数据库中数据为0
        this.paginationPrevElem.classList.add(this.state.paginationItemDisabledClassName);
        this.paginationNextElem.classList.add(this.state.paginationItemDisabledClassName);
        var txt = '';
        txt += `
            <li class="${this.state.paginationItemClassName} ${this.state.paginationItemActiveClassName}" title="第1页" data-page="1">
                <span>1</span>
            </li>
        `;
        this.paginationItemsContainerElem.innerHTML = txt;
        return;
    }
    // 计算前一页选项和后一页选项是否禁用
    if (page === 1) { // 当前为第一页
        this.paginationPrevElem.classList.add(this.state.paginationItemDisabledClassName); // 禁用前一页
    } else {
        this.paginationPrevElem.classList.remove(this.state.paginationItemDisabledClassName); // 启用前一页
    }
    if (page === page_num) { // 当前为最后一页
        this.paginationNextElem.classList.add(this.state.paginationItemDisabledClassName); // 禁用后一页
    } else {
        this.paginationNextElem.classList.remove(this.state.paginationItemDisabledClassName); // 启用后一页
    }

    var page_first; // 重新渲染的开始页码
    var page_last; // 重新渲染的结束页码
    var prev_num; // 需要向前的个数
    var next_num; // 需要向后的个数

    // // 暂时没用数组的形式，用的是page_first,page_last首尾页码的形式
    // var page_item_array = [];
    // page_item_array.push(page);

    // 判断向前够不够，不够就让后面补
    if (page - pagination_item_prev_num > 0) {
        console.log('向前够');
        // 向前够
        page_first = page - pagination_item_prev_num;
        next_num = pagination_item_next_num;
    } else {
        console.log('向前不够');
        // 向前不够，需要后面补
        page_first = 1;
        next_num = pagination_item_next_num + ( (pagination_item_prev_num - page) + 1 ); // 原本向后 + 补前面
    }
    console.log('next_num', next_num);
    // 判断向后够不够
    if ( page_num - (page + next_num) >= 0 ) {
        console.log('向后够');
        // 向后够
        page_last = page + next_num;
    } else {
        console.log('向后不够');
        // 向后不够，需要前面补
        page_last = page_num;

        prev_num = (page + next_num) - page_num;
        console.log('prev_num', prev_num);

        // 向前看，如果前面已经到第一页就不用看了
        for (var i = 0; i < prev_num; i++) {
            if (page_first - 1 <= 0) {
                break;
            }
            page_first = page_first - 1;
        }
    }

    console.log('page_first', page_first, 'page', page, 'page_last', page_last);
    var txt = '';
    for (var i = page_first; i <= page_last; i++) {
        if (i === page) {
            txt += `
                <li class="${this.state.paginationItemClassName} ${this.state.paginationItemActiveClassName}" title="第 ${i} 页" data-page="${i}">
                    <span>${i}</span>
                </li>
            `;
        } else {
            txt += `
                <li class="${this.state.paginationItemClassName}" title="第 ${i} 页" data-page="${i}">
                    <span>${i}</span>
                </li>
            `;
        }
    }
    this.paginationItemsContainerElem.innerHTML = txt;
}
/**
 * 设置当前页码
 * @method setPage
 * @param {number} data 当前页数
 */
Pagination.prototype.setPage = function (data) {
    var self = this;

    var new_page = data;
    console.log('new_page', new_page);

    // 重新渲染分页部分
    var total = this.state.total;
    var size = this.state.pageSize;
    var page_num = Math.ceil(total / size);
    var pagination_item_elems = this.paginationItemsContainerElem.querySelectorAll('.' + this.state.paginationItemClassName);
    Array.prototype.forEach.call(pagination_item_elems, function (elem, index, array) {
        var page_value = elem.getAttribute('data-page');
        if (page_value === new_page) {
            elem.classList.add(pagination_active_class);
        } else {
            elem.classList.remove(self.state.paginationItemActiveClassName);
        }
        
    });
    if (new_page === 1) {
        this.paginationPrevElem.classList.add(this.state.paginationItemDisabledClassName); // 禁用前一页
    } else {
        this.paginationPrevElem.classList.remove(this.state.paginationItemDisabledClassName); // 启用前一页
    }
    if (new_page === page_num) {
        this.paginationNextElem.classList.add(this.state.paginationItemDisabledClassName); // 禁用后一页
    } else {
        this.paginationNextElem.classList.remove(this.state.paginationItemDisabledClassName); // 启用后一页
    }

    this.setState({
        currentPage: new_page
    });
}
/**
 * 设置分页大小
 * @method setPageSize
 * @param {number} data 
 * @return {boolean} 重新设置分页大小是否成功
 */
Pagination.prototype.setPageSize = function (data) {
    var self = this;

    var new_page_size = data;
    console.log('new_page_size', new_page_size);
    // 重新渲染分页部分
    // 需要比较新旧值

    // 获取旧已选值
    var old_page_size = this.state.pageSize;
    console.log('old_page_size', old_page_size);

    // 判断新值是不是和旧值相同
    if (old_page_size === new_page_size) {
        return false;
    }

    // 更改选择选择已选项为新选择项
    var new_select_elem = null;
    var select_option_elems = this.paginationSizeChangerSelectOptionsContainerElem.querySelectorAll('.' + this.state.paginationSizeChangerSelectOptionClassName);
    Array.prototype.forEach.call(select_option_elems, function (elem) {
        var value = elem.getAttribute('data-value');
        // 判断选择选项值与新的分页大小值是否相同
        if (value === new_page_size.toString()) { 
            elem.classList.add(self.state.paginationSizeChangerSelectOptionActiveClassName);
            new_select_elem = elem;
        } else {
            elem.classList.remove(self.state.paginationSizeChangerSelectOptionActiveClassName);
        }
    });

    // 判断新设定的分页大小值是不是组件提供的可选值
    if (!new_select_elem) {
        return false;
    }

    // 更改选择框已选显示内容
    this.paginationSizeChangerSelectionIndicatorElem.innerHTML = new_select_elem.innerHTML;

    // 隐藏选择下拉框
    this.hidePaginationSizeChangeSelectDropdown();

    this.setState({
        pageSize: new_page_size
    });

    return true;
}
/**
 * TODO: 需要具体组件指定  
 * 获取数据
 * @method fetchData
 */
Pagination.prototype.fetchData = function () {}
/**
 * 隐藏分页大小改变器选择下拉选项框
 * @method hidePaginationSizeChangeSelectDropdown
 */
Pagination.prototype.hidePaginationSizeChangeSelectDropdown = function () {
    // 下拉框移除样式
    this.paginationSizeChangerSelectorElem.classList.remove(this.state.paginationSizeChangerSelectorOpenClassName);

    // 移除监听其他部分点击事件进行下拉框隐藏
    // 移除捕获阶段为html添加的监听事件
    document.documentElement.removeEventListener('click', this.handlePaginationSizeChangerClickOutside, true); 
}
/**
 * 显示分页大小改变器选择下拉选项框
 * @method showPaginationSizeChangeSelectDropdown
 */
Pagination.prototype.showPaginationSizeChangeSelectDropdown = function () {
    // 下拉框追加样式
    this.paginationSizeChangerSelectorElem.classList.add(this.state.paginationSizeChangerSelectorOpenClassName);

    // 添加监听其他部分点击事件进行选择下拉框隐藏
    // 在捕获阶段为html添加监听事件，捕获阶段html事件第一触发
    document.documentElement.addEventListener('click', this.handlePaginationSizeChangerClickOutside, true);
}
/**
 * 处理分页页码改变器 click 事件的目标元素在外部
 * @method handlePaginationSizeChangerClickOutside
 * @param {MouseEvent} e 
 */
Pagination.prototype.handlePaginationSizeChangerClickOutside = function (e) {
    console.log('handlePaginationSizeChangerClickOutside');
    console.log('e.target', e.target);

    // 从点击事件触发元素一直往上找到body
    // 如果找的过程中发现经过 selector，则点击在内部，交给内部事件自己处理
    // 如果找到过程中没有发现经过 selector，则点击在外部，隐藏下拉选项框
    var is_click_outside = true;
    var elem = e.target;
    while (elem !== document.documentElement) {
        if (elem.classList.contains(this.state.paginationSizeChangerSelectorClassName)) {
            is_click_outside = false;
            break;
        }
        elem = elem.parentElement;
    }
    console.log('is_click_outside', is_click_outside);
    
    // 判断是否点击在选择组件外部
    if (is_click_outside) {
        this.hidePaginationSizeChangeSelectDropdown();
    }
}
/**
 * 处理分页快速跳转输入框键盘keypress事件
 * @method handlePaginationQuickJumperKeypress
 * @param {KeyboardEvent} e 
 */
Pagination.prototype.handlePaginationQuickJumperKeypress = function (e) {
    console.log('handlePaginationQuickJumperKeypress');
    var key = e.key;
    console.log('key', key);
    if (key === 'Enter') {
        // TODO: 按下回车搜索
    }
}
/**
 * 处理分页大小改变器选择框 click 事件
 * @method handlePaginationSizeChangerSelectionClick
 * @param {MouseEvent} e 
 */
Pagination.prototype.handlePaginationSizeChangerSelectionClick = function (e) {
    console.log('handlePaginationSizeChangerSelectionClick');
    var is_select_opened = this.paginationSizeChangerSelectorElem.classList.contains(this.state.paginationSizeChangerSelectorOpenClassName);
    console.log('is_select_opened', is_select_opened);
    
    // 选择下拉框已打开时隐藏下拉框，选择下拉框未打开时显示下拉框
    if (is_select_opened) {
        this.hidePaginationSizeChangeSelectDropdown();
    } else {
        this.showPaginationSizeChangeSelectDropdown();
    }
}
/**
 * 处理分页大小改变器选项 click 事件
 * @method handlePaginationSizeChangeSelectItemClick
 * @param {MouseEvent} e 
 * @param {HTMLElement} elem
 */
Pagination.prototype.handlePaginationSizeChangeSelectItemClick = function (e, elem) {
    console.log('handlePaginationSizeChangeSelectItemClick');
    console.log('elem', elem);
    var new_select_elem = elem;
    var new_select_value = elem.getAttribute('data-value');
    console.log('new_select_value', new_select_value);

    // 判断新选择值所属选择选项是否被禁用
    if (new_select_elem.classList.contains(this.state.paginationSizeChangerSelectOptionDisabledClassName)) {
        return;
    }
    
    var set_page_size_result = this.setPageSize(parseInt(new_select_value));
    console.log('set_page_size_result', set_page_size_result);
    if (!set_page_size_result) {
        return;
    }
    this.fetchData();
}
/**
 * 处理前一页 click 事件
 * @method handlePaginationPrevClick
 * @param {MouseEvent} e 
 */
Pagination.prototype.handlePaginationPrevClick = function (e) {
    console.log('handlePaginationPrevClick');
    var pagination_prev_elem = e.currentTarget;
    if (pagination_prev_elem.classList.contains(this.state.paginationItemDisabledClassName)) {
        return;
    }
    var current_page = this.state.currentPage;
    console.log('current_page', current_page);
    var new_page = current_page - 1;
    this.setPage(new_page);
    this.fetchData();
}
/**
 * 处理后一页 click 事件
 * @method handlePaginationNextClick
 * @param {MouseEvent} e 
 */
Pagination.prototype.handlePaginationNextClick = function (e) {
    console.log('handlePaginationNextClick');
    var pagination_next_elem = e.currentTarget;
    if (pagination_next_elem.classList.contains(this.state.paginationItemDisabledClassName)) {
        return;
    }
    var current_page = this.state.currentPage;
    console.log('current_page', current_page);
    var new_page = current_page + 1;
    this.setPage(new_page);
    this.fetchData();
}
/**
 * 处理页码 click 事件
 * @method handlePaginationItemClick
 * @param {MouseEvent} e 
 * @param {HTMLElement} elem 
 */
Pagination.prototype.handlePaginationItemClick = function (e, elem) {
    console.log('handlePaginationItemClick');
    if (elem.classList.contains(this.state.paginationItemDisabledClassName)) {
        return;
    }
    if (elem.classList.contains(this.state.paginationItemActiveClassName)) {
        return;
    }
    var new_page = elem.getAttribute('data-page');
    console.log('new_page', new_page);
    this.setPage(parseInt(new_page, 10));
    this.fetchData();
}
export default Pagination;