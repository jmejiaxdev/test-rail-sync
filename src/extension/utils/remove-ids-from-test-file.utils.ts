import * as fs from "fs";
import type { TestCaseDescription } from "../../shared/definitions/test-case.definitions";
import getFile from "./get-file.utils";

export default function removeIdsFromTestFile(
  filePath: string,
  descriptions: TestCaseDescription[],
  fileContent?: string,
): void {
  const content = fileContent || getFile(filePath);
  const newContent = descriptions.reduce(
    (accumulator, description) => accumulator.replace(`${description.id}: `, ""),
    content,
  );
  fs.writeFileSync(filePath, newContent, "utf8");
}
