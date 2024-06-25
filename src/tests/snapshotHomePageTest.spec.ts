import {generateHtmlReport, performAxeScanAndReturnResults} from "../lib/helpers";
import {test, expect} from "../lib/fixtures/axeTestFixture";

let accessibilityScanResults = undefined;

test("HomePage", async ({
                            page,
                            makeAxeBuilder,
                        }, testInfo) => {
    // Arrange
    await page.goto(
      `/`,
    );
    // It is important to waitFor() the page to be in the desired
    // state *before* running analyze(). Otherwise, axe might not
    // find all the elements your test expects it to scan.
    await page.getByRole('heading', { name: 'conduit' }).waitFor();
    // Act
    const axeScanResults = await performAxeScanAndReturnResults(makeAxeBuilder,testInfo);
    accessibilityScanResults = axeScanResults.accessibilityScanResults;
    generateHtmlReport(
      axeScanResults.accessibilityScanResults,
      axeScanResults.reportTitle,
      "axe-reports/homePage",
    );
    // Assert
    expect(violationFingerprints(accessibilityScanResults)).toMatchSnapshot();
});

function violationFingerprints(accessibilityScanResults) {
    const violationFingerprints = accessibilityScanResults.violations.map(violation => ({
        rule: violation.id,
        // These are CSS selectors which uniquely identify each element with
        // a violation of the rule in question.
        targets: violation.nodes.map(node => node.target),
    }));
    return JSON.stringify(violationFingerprints, null, 2);
}
