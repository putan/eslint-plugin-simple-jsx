'use strict';

const rule = require('../../../lib/rules/no-operator');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
        jsx: true
    }
};

(new RuleTester({ parserOptions })).run('jsx-no-operator', rule, {
    valid: [
        {
            filename: 'JSExtension.js',
            code: 'const isA = a === "a";',
        },
        {
            filename: 'Attribute.jsx',
            code: '<div hoge="aaa" />',
        },
        {
            filename: 'ExpressionContainer.jsx',
            code: '<div>{"a"}</div>',
        },
        {
            filename: 'Ternary.jsx',
            code: '<div>{isA ? "a" : "b"}</div>',
        },
        {
            filename: 'BinaryOperatorInComment.jsx',
            code: '<div>{isA ? "a" : "b" /* === */}</div>',
        },
        {
            filename: 'SFCComponent.jsx',
            code: `
                export default props => (
                    <div {...props} />
                );
            `,
        },
        {
            filename: 'ClassComponent.jsx',
            code: `
                class A extends React.Component {
                    render() {
                        return (
                            <div {...this.props} />
                        );
                    }
                }
            `,
        },
        {
            filename: 'AssigmentOperator.jsx',
            code: `
                class A extends React.Component {
                    render() {
                        const isA = true;
                        return (
                            <div {...this.props} />
                        );
                    }
                }
            `,
        },
    ],
    invalid: [
        {
            filename: 'Plus.jsx',
            code: '<div hoge={a + b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'Minus.jsx',
            code: '<div hoge={a - b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'Asterisk.jsx',
            code: '<div hoge={a * b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'Slash.jsx',
            code: '<div hoge={a / b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'Modulo.jsx',
            code: '<div hoge={a % b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'Equality.jsx',
            code: '<div hoge={a == b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'StrictEquality.jsx',
            code: '<div hoge={a === b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'Inequality.jsx',
            code: '<div hoge={a != b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'StrictInequality.jsx',
            code: '<div hoge={a !== b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'StrictEqualityWithTernaryInAttribute.jsx',
            code: '<div hoge={a === 1 ? "a" : "b"} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'StrictEqualityWithTernaryInExpressionContainer.jsx',
            code: '<div>{a === 1 ? "a" : "b"}</div>',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'AsteriskInTernary.jsx',
            code: `
                <div>
                    {props.isA
                        ? props.a * 100
                        : "b"
                    }
                </div>
            `,
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'AsteriskInDeepTernary.jsx',
            code: `
                <div>
                    {props.isA
                        ? "a"
                        : props.isB
                            ? "b"
                            : props.c * 100
                    }
                </div>
            `,
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'StrictEqualityInClassComponent.jsx',
            code: `
                class A extends React.Component {
                    render() {
                        const isA = a === 'a';
                        return (
                            <div {...this.props} />
                        );
                    }
                }
            `,
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'StrictEqualityInClassMethod.jsx',
            code: `
                class A extends React.Component {
                    isA() {
                        return this.props.a === 'a';
                    }
                    render() {
                        return (
                            <div {...this.props} />
                        );
                    }
                }
            `,
            errors: [{message: 'no operator'}],
        },
    ],
});
