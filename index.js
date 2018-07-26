/**
 * Prepend file name and number as part of the babel process
 *
 * @author Peter Ingram
 */

module.exports = () => {
    return {
        visitor: {
            CallExpression(path, state) {

                const opts = state.opts;

                if (path.node.callee.object && path.node.callee.object.name === 'console') {

                    let file = state.file.opts.filename;

                    if(!opts || !opts.fullPath) {
                        file = state.file.opts.filename.split("/");
                        file = file[file.length - 1];
                    }

                    path.node.arguments.unshift({
                        type: 'StringLiteral',
                        value: `${file} (${path.node.loc.start.line}:${path.node.loc.start.column})`
                    });

                }

            }
        }
    };
};