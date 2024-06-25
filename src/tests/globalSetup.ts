import {
  test as setup,
} from "@playwright/test";
import * as rimraf from "rimraf";
import * as fs from 'fs';

setup("delete the axe-reports directory and create the tests/accessibilityRes.json file", async () => {
  // Delete the 'axe-reports' directory
  rimraf.sync("axe-reports");
  fs.writeFileSync(`src/tests/accessibilityRes.json`, '[]');
});
