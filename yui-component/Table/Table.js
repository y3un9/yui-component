/**
 * @author SubwaySamurai
 * @date 2020/10/10
 * @description 表格组件
 */

import Component from './Component';

/**
 * 表格列
 * @typedef {Object} TableColumn
 * @property {string} key
 * @property {string} title
 * @property {string} [width]
 */

/**
 * 表格行
 * @typedef {Object} TableRow
 */

/**
 * @constructor 表格组件类
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Table (selector) {
    Component.call(this, selector);

    this.state = {
        /** @type {Array<TableColumn>} */
        columnData: [],
        /** @type {Array<TableRow>} */
        tableData: []
    };

    /** @type {HTMLTableElement} */
    this.tableElem = this.rootElem;
}
Table.prototype = Object.create(Component.prototype);
Table.prototype.constructor = Table;
/**
 * @method 初始化组件
 */
Table.prototype.init = function () {
    // console.log(this.constructor.name, arguments.callee.name);
}
/**
 * @method 设置表格列数据
 * @param {Array<TableColumn>} column_data
 */
Table.prototype.setTableColumn = function (column_data) {
    // console.log(this.constructor.name, arguments.callee.name);
    // console.log('column_data', column_data);
    this.setState({
        columnData: column_data
    });
}
/**
 * @method 设置表格行数据
 * @param {Array<TableRow>} table_data 
 */
Table.prototype.setTableData = function (table_data) {
    // console.log(this.constructor.name, arguments.callee.name);
    // console.log('table_data', table_data);
    this.setState({
        tableData: table_data
    });
}
/**
 * @method 渲染表格行
 * @param {TableRow} row_data 
 */
Table.prototype.renderTableRow = function (row_data) {
    // console.log(this.constructor.name, arguments.callee.name);
    // console.log('row_data', row_data);
    var txt = '';
    txt += 
        '<tr>';
    this.state.columnData.forEach(function (item, index) {
        var key = item.key;
        // 判断行数据中是否存在此列的对应数据
        if (!row_data.hasOwnProperty(key)) {
            // 不存在列数据
            txt +=
                '<td>' +
                '</td>'
            ;
            return;
        }
        // 存在列数据
        txt += 
            '<td>' +
                row_data[key] +
            '</td>'
        ;
    });
    txt +=
        '</tr>';
    return txt;
}
/**
 * @method 渲染组件
 */
Table.prototype.render = function () {
    // console.log(this.constructor.name, arguments.callee.name);

    var txt = '';
    this.tableElem.innerHTML = txt;
    txt +=
        '<thead>';
    this.state.columnData.forEach(function (item) {
        txt += 
            '<th>' +
                item.title +
            '</th>'
        ;
    });
    txt +=
        '</thead>';
    txt +=
        '<tbody>';
    var self = this;
    this.state.tableData.forEach(
        /**
         * @param {Object} item 行数据对象
         * @param {number} index 行序
         */
        function (item, index) {
            var row_data = item;
            txt += self.renderTableRow(row_data);
        }
    );
    txt +=
        '</tbody>';
    this.tableElem.innerHTML = txt;
}
export default Table;