import { Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { stringUtils, FeatureHelpers } from '@nstudio/xplat';
import {
  isInModuleMetadata,
  createEmptyWorkspace,
  getFileContent
} from '@nstudio/xplat/testing';
import { runSchematic } from '../../utils/testing';

describe('app', () => {
  let appTree: Tree;
  const defaultOptions: Schema = {
    name: 'foo',
    npmScope: 'testing',
    prefix: 'tt' // foo test
  };

  beforeEach(() => {
    appTree = Tree.empty();
    appTree = createEmptyWorkspace(appTree);
  });

  it('should create all files of an app', async () => {
    const options: Schema = { ...defaultOptions };
    // console.log('appTree:', appTree);
    const tree = await runSchematic('app', options, appTree);
    const files = tree.files;
    // console.log(files);
    expect(
      files.indexOf('/apps/nativescript-foo/.gitignore')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/nativescript-foo/package.json')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/nativescript-foo/references.d.ts')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/nativescript-foo/tsconfig.tns.json')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/nativescript-foo/tsconfig.json')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/nativescript-foo/webpack.config.js')
    ).toBeGreaterThanOrEqual(0);

    // tools
    expect(
      files.indexOf('/apps/nativescript-foo/tools/xplat-postinstall.js')
    ).toBeGreaterThanOrEqual(0);

    // source dir
    expect(
      files.indexOf('/apps/nativescript-foo/src/app-root.xml')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/nativescript-foo/src/app.css')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/nativescript-foo/src/app.ts')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/nativescript-foo/src/main-page.ts')
    ).toBeGreaterThanOrEqual(0);

    // xplat file defaults
    expect(files.indexOf('/xplat/nativescript/index.ts')).toBe(-1);
  });

  it('should create all files of an app using groupByName', async () => {
    const options: Schema = { ...defaultOptions };
    options.groupByName = true;
    // console.log('appTree:', appTree);
    const tree = await runSchematic('app', options, appTree);
    const files = tree.files;
    // console.log(files);
    expect(
      files.indexOf('/apps/foo-nativescript/.gitignore')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/foo-nativescript/package.json')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/foo-nativescript/references.d.ts')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/foo-nativescript/tsconfig.tns.json')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/foo-nativescript/tsconfig.json')
    ).toBeGreaterThanOrEqual(0);
    expect(
      files.indexOf('/apps/foo-nativescript/webpack.config.js')
    ).toBeGreaterThanOrEqual(0);

    // tools
    expect(
      files.indexOf('/apps/foo-nativescript/tools/xplat-postinstall.js')
    ).toBeGreaterThanOrEqual(0);

    const packageFile = getFileContent(tree, 'package.json');
    // console.log(packageFile)
    expect(
      packageFile.indexOf('start.foo.nativescript.ios')
    ).toBeGreaterThanOrEqual(0);
  });
});
