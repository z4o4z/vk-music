module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    "selector-pseudo-class-no-unknown": [true, {
      "ignorePseudoClasses": ["global"]
    }],
    "selector-pseudo-element-colon-notation": "single"
  }
};
