const createSettingsError = (message: string): Error => {
  return new Error(`${message}.Visit https://google.com to learn how to create your settings file.`);
};

const ErrorUtils = {
  createSettingsError,
};

export default ErrorUtils;
