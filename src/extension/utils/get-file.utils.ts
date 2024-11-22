import * as fs from "fs";

export default function getFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}
