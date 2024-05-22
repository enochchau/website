import type { LocalImageService } from "astro";
import sharpService, {
  type SharpImageServiceConfig,
} from "astro/assets/services/sharp";

const service: LocalImageService<
  {
    tag: string;
    defaults: { width: number; format: string };
  } & SharpImageServiceConfig
> = {
  validateOptions: (options, imageConfig) => {
    const { defaults, tag } = imageConfig.service.config;

    if (options[tag]) {
      const mergedOptions: typeof options = { ...defaults, src: options.src };
      Object.entries(options).forEach(([k, v]) => {
        if (v !== undefined) mergedOptions[k] = v;
      });
      options = mergedOptions;
      delete options[tag];
    }

    return sharpService.validateOptions!(options, imageConfig);
  },
  getURL: sharpService.getURL,
  parseURL: sharpService.parseURL,
  getHTMLAttributes: sharpService.getHTMLAttributes,
  getSrcSet: sharpService.getSrcSet,
  transform: sharpService.transform,
};

export default service;
