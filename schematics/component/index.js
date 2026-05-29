'use strict';

const { chain, externalSchematic } = require('@angular-devkit/schematics');

function component(options) {
  return chain([
    externalSchematic('@schematics/angular', 'component', options),
    wrapComponentStyles,
  ]);
}

function wrapComponentStyles(tree) {
  const cssCreates = tree.actions.filter(
    (action) => action.kind === 'c' && action.path.endsWith('.css'),
  );

  for (const action of cssCreates) {
    const existing = tree.read(action.path)?.toString('utf-8') ?? '';
    tree.overwrite(action.path, `@layer components {\n${existing}}\n`);
  }

  return tree;
}

exports.component = component;
