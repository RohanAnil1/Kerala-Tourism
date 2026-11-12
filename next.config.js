const path = require('path');

// Next 14's font manifest matches a POSIX loader path, missing Windows loaders.
// Restore the root fonts only when its own manifest has no app entries.
class WindowsFontPreloads {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('WindowsFontPreloads', compilation => {
      compilation.hooks.processAssets.tap({
        name: 'WindowsFontPreloads',
        stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS + 1,
      }, () => {
        const name = 'server/next-font-manifest.json';
        const asset = compilation.getAsset(name);
        if (!asset) return;
        const manifest = JSON.parse(asset.source.source().toString());
        if (Object.keys(manifest.app).length) return;
        const fonts = compilation.getAssets().map(asset => asset.name)
          .filter(name => /^static\/media\/.*\.p\.woff2$/.test(name));
        if (!fonts.length) return;
        manifest.app[path.join(__dirname, 'src', 'app', 'layout')] = fonts;
        manifest.appUsingSizeAdjust = fonts.some(name => name.includes('-s'));
        const json = JSON.stringify(manifest);
        compilation.updateAsset(name, new compiler.webpack.sources.RawSource(json));
        compilation.updateAsset('server/next-font-manifest.js', new compiler.webpack.sources.RawSource(`self.__NEXT_FONT_MANIFEST=${JSON.stringify(json)}`));
      });
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer && process.platform === 'win32') config.plugins.push(new WindowsFontPreloads());
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ],
};

module.exports = nextConfig;
