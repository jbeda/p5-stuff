import * as esbuild from 'esbuild';

console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV === 'development';
const srcDir = './src';
const distDir = './dist';

let options = {
  entryPoints: [`${srcDir}/index.js`],
  bundle: true,
  outdir: distDir,
  platform: 'browser',
  define: {},
  logLevel: 'info',
};

if (dev) {
  options.define['RELOAD'] = 'true';
  options.sourcemap = true;

  let ctx = await esbuild.context(options);
  await ctx.watch();

  let { host, port } = await ctx.serve({
    host: '127.0.0.1',
    servedir: distDir,
    onRequest: (args) => {
      console.log(args.method, args.path);
    },
  });
} else {
  options.sourcemap = true;
  options.keepNames = true;
  options.minify = true;
  await esbuild.build(options);
}
