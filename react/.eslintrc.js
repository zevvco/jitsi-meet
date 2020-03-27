module.exports = {
    'extends': [
        '../.eslintrc.js',
        'eslint-config-jitsi/jsdoc',
        'eslint-config-jitsi/react',
        '.eslintrc-react-native.js'
    ],
    rules: {
        'react/jsx-handler-names': 'off',
        'require-jsdoc': 'warn'
    }
};
