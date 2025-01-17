import { getBuildInfo } from "./next.config.git-plugin.mjs";

export default () => {
  const env = getBuildInfo();

  console.log({ env });

  return {
    env,
    experimental: {
      outputFileTracingIncludes: {
        "/*": ["./content/**/*"],
      },
    },
  };
};
