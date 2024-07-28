import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (webpackConfig) => {
    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // ref: https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );

    //次のエラーを無視: Critical dependency: the request of a dependency is an expression
    webpackConfig.module = {
      ...webpackConfig.module,
      exprContextCritical: false,
    };
    return webpackConfig;
  },
};

export default nextConfig;
