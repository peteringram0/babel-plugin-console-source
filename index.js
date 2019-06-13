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

                if (path.node.callee.object &&
                    path.node.callee.object.name === 'console' &&
                    path.node.callee.property.name !== 'table') {

                    let file = state.file.opts.filename;

                    if(typeof opts.resolveFile === 'function') {
                        file = opts.resolveFile(file);
                    } else if (!opts || opts.segments !== 0) {
                        file = state.file.opts.filename.split(((opts.splitSegment) ? opts.splitSegment : '/'));
                        let segs = file.slice(Math.max(file.length - opts.segments));
                        file = segs.join('/');
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
