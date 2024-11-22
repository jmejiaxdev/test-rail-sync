export default function createSettingsError(): Error {
  return new Error(
    "'project' and 'test_cases' settings required. Visit https://github.com/jmejiaxdev/test-rail-sync# to learn how to create your settings file.",
  );
}
