"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var React = require("react");
var mobx_react_1 = require("mobx-react");
var index_1 = require('inject-instance');
var global_setting_component_1 = require("../components/global-setting/global-setting.component");
var tab_tools_component_1 = require("../components/tab-tools/tab-tools.component");
var tab_tools_components_component_1 = require("../components/tab-tools-components/tab-tools-components.component");
var tab_tools_components_common_component_1 = require("../components/tab-tools-components-common/tab-tools-components-common.component");
var tab_tools_components_custom_component_1 = require("../components/tab-tools-components-custom/tab-tools-components-custom.component");
var tab_tools_components_combo_component_1 = require("../components/tab-tools-components-combo/tab-tools-components-combo.component");
var tab_tools_version_component_1 = require("../components/tab-tools-version/tab-tools-version.component");
var viewport_guideline_component_1 = require("../components/viewport-guideline/viewport-guideline.component");
var show_layout_button_component_1 = require("../components/show-layout-button/show-layout-button.component");
var tree_component_1 = require("../components/tree/tree.component");
var editor_tabs_component_1 = require("../components/editor-tabs/editor-tabs.component");
var editor_tabs_attribute_component_1 = require("../components/editor-tabs-attribute/editor-tabs-attribute.component");
var editor_attribute_text_component_1 = require("../components/editor-attribute-text/editor-attribute-text.component");
var editor_attribute_number_component_1 = require("../components/editor-attribute-number/editor-attribute-number.component");
var editor_attribute_background_component_1 = require("../components/editor-attribute-background/editor-attribute-background.component");
var editor_attribute_border_component_1 = require("../components/editor-attribute-border/editor-attribute-border.component");
var editor_attribute_font_component_1 = require("../components/editor-attribute-font/editor-attribute-font.component");
var editor_attribute_instance_component_1 = require("../components/editor-attribute-instance/editor-attribute-instance.component");
var editor_attribute_layout_component_1 = require("../components/editor-attribute-layout/editor-attribute-layout.component");
var editor_attribute_margin_padding_component_1 = require("../components/editor-attribute-margin-padding/editor-attribute-margin-padding.component");
var editor_attribute_overflow_component_1 = require("../components/editor-attribute-overflow/editor-attribute-overflow.component");
var editor_attribute_position_component_1 = require("../components/editor-attribute-position/editor-attribute-position.component");
var editor_attribute_select_component_1 = require("../components/editor-attribute-select/editor-attribute-select.component");
var editor_attribute_switch_component_1 = require("../components/editor-attribute-switch/editor-attribute-switch.component");
var editor_attribute_width_height_component_1 = require("../components/editor-attribute-width-height/editor-attribute-width-height.component");
var preview_component_1 = require("../components/preview/preview.component");
var publish_component_1 = require("../components/publish/publish.component");
var save_component_1 = require("../components/save/save.component");
var editor_tabs_event_component_1 = require("../components/editor-tabs-event/editor-tabs-event.component");
var copy_paste_component_1 = require("../components/copy-paste/copy-paste.component");
var crumbs_component_1 = require("../components/crumbs/crumbs.component");
var delete_component_1 = require("../components/delete/delete.component");
var viewport_size_component_1 = require("../components/viewport-size/viewport-size.component");
var event_1 = require("../actions/event");
var application_1 = require("../actions/application");
var viewport_1 = require("../actions/viewport");
var event_2 = require("../stores/event");
var application_2 = require("../stores/application");
var viewport_2 = require("../stores/viewport");
var pluginList = [global_setting_component_1.default, tab_tools_component_1.default, tab_tools_components_component_1.default, tab_tools_components_common_component_1.default, tab_tools_components_custom_component_1.default, tab_tools_components_combo_component_1.default, tab_tools_version_component_1.default, viewport_guideline_component_1.default, show_layout_button_component_1.default, tree_component_1.default, editor_tabs_component_1.default, editor_tabs_attribute_component_1.default, editor_attribute_text_component_1.default, editor_attribute_number_component_1.default, editor_attribute_background_component_1.default, editor_attribute_border_component_1.default, editor_attribute_font_component_1.default, editor_attribute_instance_component_1.default, editor_attribute_layout_component_1.default, editor_attribute_margin_padding_component_1.default, editor_attribute_overflow_component_1.default, editor_attribute_position_component_1.default, editor_attribute_select_component_1.default, editor_attribute_switch_component_1.default, editor_attribute_width_height_component_1.default, viewport_size_component_1.default, preview_component_1.default, save_component_1.default, publish_component_1.default, editor_tabs_event_component_1.default, copy_paste_component_1.default, crumbs_component_1.default, delete_component_1.default];

var ProviderContainer = function (_React$Component) {
    (0, _inherits3.default)(ProviderContainer, _React$Component);

    function ProviderContainer() {
        (0, _classCallCheck3.default)(this, ProviderContainer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProviderContainer.__proto__ || Object.getPrototypeOf(ProviderContainer)).apply(this, arguments));

        _this.providerActionAndStores = {};
        return _this;
    }

    (0, _createClass3.default)(ProviderContainer, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            var pluginActionStores = [];
            var pluginActions = pluginList.forEach(function (plugin) {
                if (plugin.Action) {
                    pluginActionStores.push(plugin.Action);
                }
                if (plugin.Store) {
                    pluginActionStores.push(plugin.Store);
                }
            });
            var instances = index_1.default.apply(index_1, [event_1.default, application_1.default, viewport_1.default, event_2.default, application_2.default, viewport_2.default].concat(pluginActionStores));
            instances.get('ApplicationStore').init(this.props.gaeaProps, pluginList);
            instances.forEach(function (value, key) {
                _this2.providerActionAndStores[key] = value;
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(mobx_react_1.Provider, __assign({}, this.providerActionAndStores), this.props.children);
        }
    }]);
    return ProviderContainer;
}(React.Component);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProviderContainer;