# TestRail Sync

The TestRail Sync extension for Visual Studio Code, is a robust tool designed to enhance your testing workflow. This extension leverages Visual Studio Code’s API to synchronize your unit test files with your TestRail project effortlessly.

**Key Features:**

- Contextual Operations: Right-click on any test file within Visual Studio Code to access the TestRail Sync menu. This feature allows you to perform various synchronization tasks directly from the interface.
- Seamless Integration: Keep your TestRail projects up to date with the latest changes in your test files without leaving your coding environment.
- User-Friendly Interface: The extension is designed with a straightforward, intuitive interface, making it accessible for users of all skill levels.

By integrating your development environment with TestRail via this extension, you can maintain the consistency and accuracy of your test cases, ensuring smooth project operations.

We look forward to your feedback to make this tool even better.

## Setup

Install the TestRail Sync extension from Visual Studio Code marketplace.

### Global configuration file

After installation, you need to configure the extension to interact correctly with your TestRail projects.

In the root directory of the project where the extension will be used, create a new file named `.testrailsync.config.json.`. This JSON configuration file should be structured as follows:

```
{
 "project": {
    "api_key": "Your_TestRail_API_Key",
    "organization_url": "Your_TestRail_API_URL",
    "project_id": Your_TestRail_Project_ID_Number,
    "suite_id": Your_TestRail_Suite_ID_Number,
    "username": "Your_TestRail_Username"
  },
  "test_cases": {
    "custom_automation_tool_type": 1,
    "custom_manual_automated": 0,
    "custom_manual_vs_automated": 3,
    "custom_test_level": 0,
    "refs": "This a test",
    "priority_id": 4,
    "section_id": 1058842,
    "template": 1,
    "type_id": 7
  }
}
```

#### Project

- `api_key`: string. Provides HTTP access for API interactions. For more details on how to access and utilize the TestRail API using your API key, please visit the official support documentation: [Username and API Key](https://support.testrail.com/hc/en-us/articles/7077039051284-Accessing-the-TestRail-API#h_01J53NS432TJFBGHMFVVVEHPKQ:~:text=Username%20and%20API%20Key).
- `organization_url`: string. TestRail base address. For example, if you reach the TestRail dashboard through https://acme.testrail.com/index.php?/dashboard, then your `organization_url` would be `https://acme.testrail.com/index.php?`.
- `project_id`: number. You can typically find this ID in the URL when accessing specific project pages. For example, if you visit the project overview at https://acme.testrail.com/index.php?/projects/overview/25, your `project_id` is `25`.
- `suite_id`: number. A TestRail project typically consists of one or several suites, also referred to as group IDs. You can locate your suite ID in the URL when accessing a specific suite. For instance, if you navigate to https://acme.testrail.com/index.php?/suites/view/12345, your `suite_id` is `12345`.
- `username`: string. Provides HTTP access for API interactions. For more details on how to access and utilize the TestRail API using your API key, please visit the official support documentation: [Username and API Key](https://support.testrail.com/hc/en-us/articles/7077039051284-Accessing-the-TestRail-API#h_01J53NS432TJFBGHMFVVVEHPKQ:~:text=Username%20and%20API%20Key).

#### TestCases

The extension currently supports synchronization of the following fields:

- `custom_automation_tool_type`: number. Automation Tool Type
- `custom_manual_automated`: number. Type Automation
- `custom_manual_vs_automated`: number. Manual vs. Automated
- `custom_test_level`: number. Test Level
- `refs`: string. Reference
- `priority_id`: number. Priority
- `section_id": number. Section ID
- `template`: number. Template
- `type_i`": number. Type

### Local configuration

To customize the configuration for specific test case files, you can override the global settings defined in the `.testrailsync.config.json` file. Simply add a commented object in your test case file using the same structure as the global configuration, but include only the fields you wish to override.

For example, if you need to specify different values for the `project_id`, `suite_id`, and `ref` fields, your comment in the test case file might look like this:

```
// sum.spec.ts file
import sum from "./sum";

// Add this to your test file to override your .testrailsync.config.json file
/**
 * TestRail Sync settings
 * {
 *   "project": {
 *     "project_id": 99,
 *   },
 *   "test_cases": {
 *     "refs": "This will override my global settings",
 *     "section_id": 98765,
 *   }
 * }
 */

describe("sum function", () => {
  test("[Given] two positive numbers [When] they are added [Then] the result should be their sum", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
```

## Available operations

TODO

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...
