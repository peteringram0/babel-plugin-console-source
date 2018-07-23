exports.default = () => {
    return {
        visitor: {
            CallExpression(path, state) {
                if (path.node.callee.object.name === 'console') {

                    let filename = state.file.opts.filename;
                    let filenameSplit = filename.split("/");
                    filenameSplit = filenameSplit[filenameSplit.length - 1];

                    path.node.arguments.unshift({
                        type: 'StringLiteral',
                        value: `${filenameSplit} (${path.node.loc.start.line}:${path.node.loc.start.column})`
                    });

                }
            }
        }
    };
};