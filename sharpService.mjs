import sharpService from "astro/assets/services/sharp";

/** @type {typeof sharpService} */
const service = {
  ...sharpService,
  async transform(inputBuffer, transformOptions, config) {
    const { path, defaults } = config.service.config;

    if (!path || !new RegExp(path).test(transformOptions.src)) {
      return sharpService.transform(inputBuffer, transformOptions, config);
    }

    const mergedOptions = { ...defaults };
    Object.entries(transformOptions).forEach(([k, v]) => {
      if (v !== undefined) mergedOptions[k] = v;
    });
    return sharpService.transform(inputBuffer, mergedOptions, config);
  },
};

export default service;
