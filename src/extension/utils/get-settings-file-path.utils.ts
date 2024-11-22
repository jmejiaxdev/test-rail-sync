import * as fs from "fs";
import * as path from "path";

export default function getSettingsFilePath(startPath: string): string | null {
  const fileName = ".testrailsync.config.json";

  let currentPath = startPath;

  while (currentPath !== path.parse(currentPath).root) {
    if (fs.existsSync(path.join(currentPath, fileName))) {
      const settingsFilePath = path.join(currentPath, fileName);
      console.log("Settings file found at", settingsFilePath);
      return settingsFilePath;
    }

    currentPath = path.dirname(currentPath);
  }

  return null;
}
