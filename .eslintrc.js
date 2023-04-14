module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        quotes: ["error", "double"],
        // we want to force semicolons
        semi: ["error", "always"],
        // we use 4 spaces to indent our code
        indent: ["error", 4],
        // we want to avoid extraneous spaces
        "no-multi-spaces": ["error"],
    },
};
