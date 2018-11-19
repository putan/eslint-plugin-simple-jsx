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

const tester = new RuleTester({ parserOptions });
tester.run('jsx-no-operator', rule, {
    valid: [
        {
            filename: 'MyProgram.js',
            code: 'const isA = a === "a";',
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge="aaa" />',
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div>{"a"}</div>',
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div>{isA ? "a" : "b"}</div>',
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div>{isA ? "a" : "b" /* === */}</div>',
        },
        {
            filename: 'MyComponent.jsx',
            code: `
                export default props => (
                    <div {...props} />
                );
            `,
        },
        {
            filename: 'MyComponent.jsx',
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
    ],
    invalid: [
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a + b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a - b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a * b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a / b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a % b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a == b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a === b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a != b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a !== b} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div hoge={a === 1 ? "a" : "b"} />',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
            code: '<div>{a === 1 ? "a" : "b"}</div>',
            errors: [{message: 'no operator'}],
        },
        {
            filename: 'MyComponent.jsx',
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
            filename: 'MyComponent.jsx',
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
            filename: 'MyComponent.jsx',
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
            filename: 'MyComponent.jsx',
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
