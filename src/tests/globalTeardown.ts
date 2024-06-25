import { test as teardown } from "@playwright/test";
import * as fs from 'fs';

const summaryReportArray: { id: string, impact: string, url: string, description: string, help: string, helpUrl: string }[] = [
];

let summaryReport: {
  id: string,
  impact: string,
  url: string,
  description: string,
  help: string,
  helpUrl: string,
  count: number
}

teardown("log total violations", async () => {
  const accessibilityResults = fs.readFileSync('src/tests/accessibilityRes.json', 'utf8')
  const resultsArray = JSON.parse(accessibilityResults)
  resultsArray.forEach(function (arrayItem) {
    const url = arrayItem.url;
    arrayItem.violations.forEach(function (violation){
      summaryReport = {
        id: violation.id,
        impact: violation.impact,
        url: url,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        count:  violation.nodes.length
      }
      summaryReportArray.push(summaryReport)
    })
  });
  fs.writeFileSync(`src/tests/summaryReport.json`, JSON.stringify(summaryReportArray));
});
