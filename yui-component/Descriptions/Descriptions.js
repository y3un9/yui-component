/**
 * @author SubwaySamurai
 * @date 2021/03/01
 * @description 描述列表
 */

import './Descriptions.css';

import Component from '../Component';

import classNames from 'classnames';

/**
 * @typedef {Array<ListConfigItem>} ListConfig - 列表配置
 */

/**
 * @typedef {Object} ListConfigItem - 列表配置项
 * @property {string} key
 * @property {string} label
 * @property {string} span
 */

/**
 * @typedef {Object} ComponentOption - 组件选项
 * @property {string} [placeholder] - 占位符
 * @property {boolean} [bordered] - 是否显示边框和背景颜色
 * @property {number} [column] - 每行多少个 column, 这里 label 和 content 合起来整体算作一个 column
 * @property {string} [size] - 每个 column 尺寸, 'default' / 'middle' / 'small'
 * @property {string} [layout] - label 和 value 排列方向, 'horizontal' / 'vertical'
 */

var BORDER = {
    BORDERLESS: false,
    BORDERED: true
};

var SIZE = {
    DEFAULT: 'default',
    MIDDLE: 'middle',
    SMALL: 'small'
};

var LAYOUT = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
};

var DEFAULT_OPTION = {
    placeholder: '--',
    bordered: false,
    column: 1,
    size: SIZE.DEFAULT,
    layout: LAYOUT.HORIZONTAL
};

/**
 * @constructor 描述列表组件
 * @extends Component
 * @param {string | HTMLElement} selector 
 * @param {ComponentOption} [option]
 */
function Descriptions (selector, option) {
    Component.call(this, selector);
    var superState = this.state;

    this.state = Object.assign({}, superState, {
        /** @type {ListConfig} */
        listConfig: [],
        listTitle: '',
        listData: {},
        /** @type {ComponentOption} */
        option: Object.assign({}, DEFAULT_OPTION, option),
        className: {
            // ROOT
            root: 'descriptions',
            // BORDER
            borderless: '',
            bordered: 'descriptions-bordered',
            // SIZE
            sizeDefault: '',
            sizeMiddle: 'descriptions-middle',
            sizeSmall: 'descriptions-small',
            // TITLE
            title: 'descriptions-title',
            // LIST
            list: 'descriptions-list',
            listRow: 'descriptions-row',
            listItem: 'descriptions-item',
            listItemLabel: 'descriptions-item-label',
            listItemContent: 'descriptions-item-content',
            // COLON
            listItemColon: 'descriptions-item-colon'
        }
    });

    /** @type {HTMLElement} */
    this.titleElem = this.rootElem.querySelector(`.${this.state.className.title}`);
    /** @type {HTMLElement} */
    this.listElem = this.rootElem.querySelector(`.${this.state.className.list}`);
}
Descriptions.prototype = Object.create(Component.prototype);
Descriptions.prototype.constructor = Descriptions;
/**
 * @method init
 */
Descriptions.prototype.init = function () {

}
Descriptions.prototype.getClassNameSize = function () {
    var size = this.state.option.size;
    var className = this.state.className;

    if (size === SIZE.MIDDLE) {
        return className.sizeMiddle;
    }
    if (size === SIZE.SMALL) {
        return className.sizeSmall;
    }
    return className.sizeDefault;
}
Descriptions.prototype.getClassNameBorder = function () {
    var bordered = this.state.option.bordered;
    var className = this.state.className;

    if (bordered === BORDER.BORDERED) {
        return className.bordered;
    }
    return className.borderless;
}
/**
 * @method renderTitle
 */
Descriptions.prototype.renderTitle = function () {
    if (this.titleElem) {
        this.titleElem.innerHTML = `
            ${this.state.listTitle}
        `;
    }
}
/**
 * @method renderListItemLabel
 * @param {ListConfigItem} configItem 
 * @param {Object} listData 
 */
Descriptions.prototype.renderListItemLabel = function (configItem, listData) {
    return configItem.label;
}
/**
 * @method renderListItemContent
 * @param {ListConfigItem} configItem 
 * @param {Object} listData 
 */
Descriptions.prototype.renderListItemContent = function (configItem, listData) {
    if (listData.hasOwnProperty(configItem.key)) {
        return listData[configItem.key];
    } else {
        return this.state.option.placeholder;
    }
}
/**
 * @method renderHorizontalList
 * @returns {string}
 */
Descriptions.prototype.renderHorizontalList = function () {
    var self = this;

    var listConfig = this.state.listConfig;
    var listData = this.state.listData;

    var className = this.state.className;

    var bordered = this.state.option.bordered;
    var column = this.state.option.column;

    // 使用"当前行已占列数"可以计算当前列"能不能放在这一行"和"此行最多还能放多少列"

    /** 当前行已占列数 */
    var placedColumns = 0;

    return listConfig.reduce(function (total, item, index, array) {
        var template = '';

        // 判断是不是此行未放置, 开始新的一行
        if (placedColumns === 0) {
            template += `<tr class="${className.listRow}">`;
        }

        /** 此行还能放置的列数 */
        var columnCanPlaced = column - placedColumns;

        var defaultColSpan = 1;
        var colSpan = defaultColSpan;

        // 判断当前是不是最后一项
        if (index === array.length - 1) {
            // 列表最后项, 特殊处理, 需要把当前行剩余所有空列占满
            
            colSpan = columnCanPlaced;

        } else {

            /** 当前列所期望占的列数 */
            var itemSpan = parseInt(item.span, 10);
            if (itemSpan) {

                var enoughColumn = columnCanPlaced - itemSpan;

                // 当前剩余列数是否足够放置期望的列数
                if (enoughColumn >= 0) {
                    colSpan = enoughColumn;
                } else {
                    colSpan = columnCanPlaced;
                }
            }

        }

        // 判断列表是否有边框
        if (bordered === BORDER.BORDERED) {
            // 有边框列表

            template += `
                <th class="${className.listItemLabel}" colspan="1">
                    ${self.renderListItemLabel(item, listData)}
                </th>
                <td class="${className.listItemContent}" colspan="${colSpan * 2 - 1}">
                    ${self.renderListItemContent(item, listData)}
                </td>
            `;

        } else {
            // 无边框列表

            template += `
                <td class="${className.listItem}" colspan="${colSpan}">
                    <span class="${classNames(className.listItemLabel, className.listItemColon)}">
                        ${self.renderListItemLabel(item, listData)}
                    </span>
                    <span class="${className.listItemContent}">
                        ${self.renderListItemContent(item, listData)}
                    </span>
                </td>
            `;

        }

        // 放置完当前列后此行已放置列数
        placedColumns += colSpan;

        // 判断是不是此行已放置满, 结束此行
        if (placedColumns === column) {
            template += '</tr>';

            // 使轮询到下一个 item 时变成新行开始
            placedColumns = 0;
        }

        return total.concat(template);
    }, '');
}
/**
 * @method renderVerticalList
 * @returns {string}
 */
Descriptions.prototype.renderVerticalList = function () {
    var self = this;

    var listConfig = this.state.listConfig;
    var listData = this.state.listData;

    var className = this.state.className;

    var bordered = this.state.option.bordered;
    var column = this.state.option.column;

    // 使用"当前行已占列数"可以计算当前列"能不能放在这一行"和"此行最多还能放多少列"

    /** 当前行已占列数 */
    var placedColumns = 0;

    /** 用于保存 list item content 模板内容的字符串变量 */
    var tempTemplate = '';

    return listConfig.reduce(function (total, item, index, array) {
        var template = '';

        // 判断是不是此行未放置, 开始新的一行
        if (placedColumns === 0) {
            template += `<tr class="${className.listRow}">`;
            
            tempTemplate = `<tr class="${className.listRow}">`;
        }

        /** 此行还能放置的列数 */
        var columnCanPlaced = column - placedColumns;

        var defaultColSpan = 1;
        var colSpan = defaultColSpan;

        // 判断当前是不是最后一项
        if (index === array.length - 1) {
            // 列表最后项, 特殊处理, 需要把当前行剩余所有空列占满
            
            colSpan = columnCanPlaced;

        } else { 
            
            /** 当前列所期望占的列数 */
            var itemSpan = parseInt(item.span, 10);
            if (itemSpan) {

                var enoughColumn = columnCanPlaced - itemSpan;

                // 当前剩余列数是否足够放置期望的列数
                if (enoughColumn >= 0) {
                    colSpan = enoughColumn;
                } else {
                    colSpan = columnCanPlaced;
                }
            }

        }

        // 判断列表是否有边框
        if (bordered === BORDER.BORDERED) {
            // 有边框列表

            template += `
                <th class="${className.listItemLabel}" colspan="${colSpan}">
                    ${self.renderListItemLabel(item, listData)}
                </th>
            `;

            tempTemplate += `
                <td class="${className.listItemContent}" colspan="${colSpan}">
                    ${self.renderListItemContent(item, listData)}
                </td>
            `;

        } else {
            // 无边框列表

            template += `
                <th class="${className.listItem}" colspan="${colSpan}">
                    <span class="${classNames(className.listItemLabel, className.listItemColon)}">
                        ${self.renderListItemLabel(item, listData)}
                    </span>
                </th>
            `;

            tempTemplate += `
                <td class="${className.listItem}" colspan="${colSpan}">
                    <span class="${className.listItemContent}">
                        ${self.renderListItemContent(item, listData)}
                    </span>
                </td>
            `;

        }

        // 放置完当前列后此行已放置列数
        placedColumns += colSpan;

        // 判断是不是此行已放置满, 结束此行
        if (placedColumns === column) {
            template += '</tr>';

            tempTemplate += '</tr>';

            // 使轮询到下一个 item 时变成新行开始
            placedColumns = 0;

            return total.concat(template, tempTemplate);
        }

        return total.concat(template);
    }, '');
}
/**
 * @method renderList
 */
Descriptions.prototype.renderList = function () {
    var self = this;

    if (!this.listElem) {
        return;
    }

    var listTableClassName = classNames(
        this.getClassNameSize(),
        this.getClassNameBorder()
    );

    this.listElem.innerHTML = `
        <table class="${listTableClassName}">
            <tbody>
                ${(function () {
                    if (self.state.option.layout === LAYOUT.VERTICAL) {
                        return self.renderVerticalList();
                    } else {
                        return self.renderHorizontalList();
                    }
                }())}
            </tbody>
        </table>
    `;
}
/**
 * @method render
 */
Descriptions.prototype.render = function () {
    this.renderTitle();
    this.renderList();
}
export default Descriptions;