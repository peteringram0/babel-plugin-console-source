'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.default = function (_ref) {
    var t = _ref.types;

    var name = 'babel-plugin-captains-log';
    var callExpressions = new _set2.default();
    var evaluatedExpressions = new _set2.default();
    return {
        name: name,
        visitor: {
            Identifier: function Identifier(path, _ref2) {
                var _ref2$opts = _ref2.opts,
                    opts = _ref2$opts === undefined ? {} : _ref2$opts,
                    file = _ref2.file;

                if (matchesIgnorePattern(opts.ignorePatterns, file)) {
                    return;
                }
                if (!looksLike(path.node, {name: 'console'})) {
                    return;
                }
                // find somewhere we can move this so that it only needs to be called once.
                var settings = (0, _pluginOptions.buildOptions)(opts || {});
                var parentCallExp = path.findParent(t.isCallExpression);
                if (isTrackingConsoleCallStatement(path, parentCallExp, settings)) {
                    callExpressions.add(parentCallExp);
                }
            },

            Program: {
                exit: function exit(_, _ref3) {
                    var file = _ref3.file,
                        opts = _ref3.opts;

                    var settings = (0, _pluginOptions.buildOptions)(opts || {});
                    callExpressions.forEach(function (callExp) {
                        if (!callExp || evaluatedExpressions.has(callExp)) {
                            return;
                        }
                        var options = settings[getConsoleCallMethodName(callExp)];
                        var args = callExp.get('arguments');

                        if (options.injectVariableName) {
                            args = injectVariableNames(args);
                        }

                        if (options.injectScope) {
                            var scope = findCallScope(callExp);
                            args = prependArguments(args, scope);
                        }

                        if (options.injectFileName) {
                            var filename = void 0;
                            if (file) {
                                filename = file.opts.filename;
                            }
                            var start = callExp.node.loc.start;
                            var lineCol = '(' + start.line + ':' + start.column + ')';

                            var filenameSplit = filename.split("/");
                            filenameSplit = filenameSplit[filenameSplit.length - 1];

                            // args = prependArguments(args, '' + filename + lineCol);
                            args = prependArguments(args, '' + filenameSplit + lineCol);

                        }
                        callExp.set('arguments', args);
                    });
                }
            }
        }
    };

    function matchesIgnorePattern() {
        var ignorePatterns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['node_modules'];
        var file = arguments[1];

        return ignorePatterns.some(function (pattern) {
            return file.opts.filename.includes(pattern);
        });
    }

    function getConsoleCallMethodName(callExpression) {
        return callExpression.get('callee.property').node.name;
    }

    function isTrackingConsoleCallStatement(path, parentCallExp, settings) {
        return parentCallExp && parentCallExp.node.callee === path.parent && (0, _keys2.default)(settings).includes(getConsoleCallMethodName(parentCallExp));
    }

    function injectVariableNames() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var result = [];
        args.forEach(function (arg) {
            if (!t.isLiteral(arg)) {
                result.push(t.stringLiteral(arg.getSource()), arg.node);
            } else {
                result.push(arg.node);
            }
        });
        return result;
    }

    function findCallScope(path) {
        var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var parentFunc = path.findParent(function (path) {
            return (0, _keys2.default)(scopeHandlers).includes(path.type);
        });
        if (parentFunc) {
            return findCallScope(parentFunc, [scopeHandlers[parentFunc.type](parentFunc)].concat((0, _toConsumableArray3.default)(scope)));
        }
        return scope.length ? scope.join('.') + ':' : '';
    }

    function prependArguments() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var value = arguments[1];

        if (value) {
            return [t.stringLiteral(value)].concat((0, _toConsumableArray3.default)(args));
        }
        return args;
    }
};

var _pluginOptions = require('./utils/pluginOptions');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

var idNameSelector = function idNameSelector(path) {
    return path.node.id.name;
};
var keyNameSelector = function keyNameSelector(path) {
    return path.node.key.name;
};

var scopeHandlers = {
    FunctionDeclaration: idNameSelector,
    VariableDeclarator: idNameSelector,
    ObjectProperty: keyNameSelector,
    ObjectMethod: keyNameSelector,
    ClassMethod: keyNameSelector,
    ClassExpression: idNameSelector,
    ClassDeclaration: idNameSelector,

    AssignmentExpression: function AssignmentExpression(path) {
        return path.node.left.name;
    }
};

function looksLike(a, b) {
    return a && b && (0, _keys2.default)(b).every(function (bKey) {
        var bVal = b[bKey];
        var aVal = a[bKey];
        if (typeof bVal === 'function') {
            return bVal(aVal);
        }
        return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    });
}

function isPrimitive(val) {
    return val == null || /^[sbn]/.test(typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val));
}
