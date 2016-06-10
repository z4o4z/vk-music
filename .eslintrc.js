module.exports = {
  "parser": "babel-eslint",
  "extends": ["google", "plugin:react/recommended"],
  "plugins": ["react"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "max-len": [0, 120, 2],
    "camelcase": [2, {
      "properties": "never"
    }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": false,
        "MethodDefinition": false,
        "ClassDeclaration": false
      }
    }]
  },
  "env": {
    "browser": true
  },
  "globals": {
    "IS_LOC": true,
    "IS_DEV": true,
    "IS_PROD": true
  }
};
