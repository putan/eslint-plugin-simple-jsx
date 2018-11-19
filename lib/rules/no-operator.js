'use strict';

module.exports = {
    create: context => {
        function isJSXExtension(filename) {
            return filename.slice(-4) === '.jsx';
        }

        function check(node) {
            if (isJSXExtension(context.getFilename())) {
                context.report({
                    node,
                    loc: context.getFirstToken(node).loc.start,
                    message: 'no operator',
                });
            }
        }

        return {
            BinaryExpression: check,
        };
    },
};



