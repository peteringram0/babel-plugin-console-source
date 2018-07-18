'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildOptions = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultSettings = {
    injectScope: false,
    injectVariableName: true,
    injectFileName: true
};

var defaultMethods = ['debug', 'error', 'exception', 'info', 'log', 'warn'];

// this should deep merge in the future when we are dealing with more than just flags
var mergeOptions = function mergeOptions(options) {
    var sanitizedOptions = (0, _keys2.default)(options || {}).filter(function (key) {
        return (0, _keys2.default)(defaultSettings).includes(key);
    }).reduce(function (acc, key) {
        return (0, _extends5.default)({}, acc, (0, _defineProperty3.default)({}, key, options[key]));
    }, {});
    return (0, _assign2.default)({}, defaultSettings, sanitizedOptions);
};

var buildOptions = function buildOptions(userOptions) {
    // remove ignore patterns from settings since it has been consumed already
    // eslint-disable-next-line no-unused-vars
    var _ref = userOptions || {},
        methods = _ref.methods,
        ignorePatterns = _ref.ignorePatterns,
        options = (0, _objectWithoutProperties3.default)(_ref, ['methods', 'ignorePatterns']);

    // output spreads the flags over each method
    // in the future this could be expanded to allow method level config


    return (methods || defaultMethods).reduce(function (acc, method) {
        return (0, _extends5.default)({}, acc, (0, _defineProperty3.default)({}, method, mergeOptions(options)));
    }, {});
};
exports.buildOptions = buildOptions;