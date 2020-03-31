module.exports = {
    'extends': [
        '../.eslintrc.js',
        'eslint-config-jitsi/jsdoc',
        'eslint-config-jitsi/react',
        '.eslintrc-react-native.js'
    ],
    rules: {
        'react/jsx-handler-names': 'off',
        'require-jsdoc': 'off',
        'react/jsx-no-bind': 'off',
        'react/no-danger': 'off',
        'react/jsx-pascal-case': 'off',
        'max-len': 'off'
    }
};
