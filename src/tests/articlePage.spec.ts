import {generateHtmlReport, performAxeScanAndReturnResults} from "../lib/helpers";
import { test } from "../lib/fixtures/axeTestFixture";

test("Article Preview", async ({
                            page,
                            makeAxeBuilder,
                        }, testInfo) => {
    // Arrange
    await page.goto(
        `/`,
    );
    const firstArticlePreview = await page.locator('.article-preview').first();
    await firstArticlePreview.click()
    // Act
    const axeScanResults = await performAxeScanAndReturnResults(makeAxeBuilder,testInfo);
    generateHtmlReport(
        axeScanResults.accessibilityScanResults,
        axeScanResults.reportTitle,
        "axe-reports/articlePreview",
    );
    // Assert
    if (axeScanResults.accessibilityScanResults.violations.length > 0) {
        const violationsMessage = `accessibility violations found: ${axeScanResults.accessibilityScanResults.violations.length}`;
        throw new Error(violationsMessage);
    }
});

