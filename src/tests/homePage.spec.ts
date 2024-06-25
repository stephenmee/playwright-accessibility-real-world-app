import {generateHtmlReport, performAxeScanAndReturnResults} from "../lib/helpers";
import { test } from "../lib/fixtures/axeTestFixture";

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
    generateHtmlReport(
        axeScanResults.accessibilityScanResults,
        axeScanResults.reportTitle,
        "axe-reports/homePage",
    );
    // Assert
    if (axeScanResults.accessibilityScanResults.violations.length > 0) {
        const violationsMessage = `accessibility violations found: ${axeScanResults.accessibilityScanResults.violations.length}`;
        throw new Error(violationsMessage);
    }
});
