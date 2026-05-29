'use strict';

const stylelint = require('stylelint');

const ruleName = 'custom/require-layer-components-wrapper';

const messages = stylelint.utils.ruleMessages(ruleName, {
  missing: 'Component CSS must be wrapped in @layer components { }',
});

const meta = { url: '' };

function rule(primaryOption) {
  return (root, result) => {
    if (!primaryOption) return;
    const filePath = root.source?.input?.file ?? '';
    if (!/\/app\/components\//.test(filePath)) return;
    const hasLayerComponents = root.nodes.some(
      (node) =>
        node.type === 'atrule' &&
        node.name.toLowerCase() === 'layer' &&
        node.params.trim() === 'components',
    );

    if (!hasLayerComponents) {
      stylelint.utils.report({
        message: messages.missing,
        node: root,
        result,
        ruleName,
        word: '@layer components',
      });
    }
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

module.exports = stylelint.createPlugin(ruleName, rule);
