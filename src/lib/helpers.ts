import { AxeResults } from "axe-core";
import { createHtmlReport } from "axe-html-reporter";
const fs = require("fs");

export function generateHtmlReport(
  accessibilityScanResults: AxeResults,
  pageTitle: string,
  reportPath: string,
) {
  console.log(`generating axe report file for ${pageTitle}`);
  const reportHTML = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: pageTitle,
      // we will create a report file in the public folder, bypassing the default report
      doNotCreateReportFile: true,
    },
  });

  if (!fs.existsSync(`${reportPath}`)) {
    fs.mkdirSync(`${reportPath}`, {
      recursive: true,
    });
  }
  fs.writeFileSync(`${reportPath}/${pageTitle}.html`, reportHTML);
}

export async function performAxeScanAndReturnResults(makeAxeBuilder, testInfo){
  let reportTitle = undefined;
  let accessibilityScanResults = undefined;
  try{
    accessibilityScanResults = await makeAxeBuilder().analyze();
    const violationsCount = accessibilityScanResults.violations.length;
    violationsCount>1 || violationsCount===0? reportTitle = testInfo.title+"_"+violationsCount+"_"+"Violations": reportTitle = testInfo.title+"_"+violationsCount+"_"+"Violation"
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });
  }catch (e){
    console.log(`an error occurred while scanning for accessibility ${e}`)
  }
  const accessibilityResults = fs.readFileSync('src/tests/accessibilityRes.json', 'utf8')
  let resultsArray = JSON.parse(accessibilityResults)
  resultsArray.push(accessibilityScanResults)
  fs.writeFileSync('src/tests/accessibilityRes.json', JSON.stringify(resultsArray));
  return {accessibilityScanResults,reportTitle}
}
