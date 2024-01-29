import { Browser, Page } from "puppeteer";
import * as path from "path";
import { A11yResultStatus } from "../../../src/lib/model";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import { checkTest } from "../ExpectHelper";

describe("6-link", () => {
    let browser: Browser;
    let page: Page;

    async function initA11yOnPage(file: string) {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, file));
        browser = context.browser;
        page = context.page;
    }

    afterEach(async () => {
        await browser?.close();
    });

    async function validateA11y(url: string, enabledRules?: string[]) {
        return await page.evaluate(async (url, enabledRules) => {
            // @ts-ignore
            const rgaaChecker = new uuvA11y.RgaaChecker(url, enabledRules);
            const result = await rgaaChecker.validate().toPromise();
            return {
                result: result,
                summary: result.summary()
            };
        }, url, enabledRules);
    }

    it("6.1 should return results", async () => {
        await initA11yOnPage("link.html");
        const { result, summary } = await validateA11y(page.url(), ["6.1"]);
        expect(result.status).toEqual(A11yResultStatus.ERROR);
        const [_6_1_5_NO_SVG, _6_1_1, _6_1_2, _6_1_3, _6_1_4, _6_1_5_SVG] = result.ruleResults;

        checkTest(_6_1_1, "6.1.1",
            A11yResultStatus.MANUAL,
            [],
            [
                "a[data-testid=link-text]",
                "a[data-testid=link-with-area]",
                "span[data-testid=role-link-text]",
                "span[data-testid=role-link-with-area]",
                "a[data-testid=link-with-aria-label]",
                "a[data-testid=link-empty-with-aria-label]",
                "a[data-testid=link-with-aria-label-revelant]"
            ]
        );

        checkTest(_6_1_2, "6.1.2",
            A11yResultStatus.MANUAL,
            [],
            [
                "a[data-testid=link-with-img]",
                "a[data-testid=link-with-role-img]",
                "a[data-testid=link-with-area]",
                "a[data-testid=link-with-object]",
                "a[data-testid=link-with-canvas]",
                "a[data-testid=link-with-svg]",
                "span[data-testid=role-link-with-img]",
                "span[data-testid=role-link-with-role-img]",
                "span[data-testid=role-link-with-area]",
                "span[data-testid=role-link-with-object]",
                "span[data-testid=role-link-with-canvas]",
                "span[data-testid=role-link-with-svg]",
            ]
        );

        checkTest(_6_1_3, "6.1.3",
            A11yResultStatus.MANUAL,
            [],
            [
                "a[data-testid=link-composite-text-img]",
                "a[data-testid=link-composite-text-with-role-img]",
                "a[data-testid=link-composite-text-with-object]",
                "a[data-testid=link-composite-text-with-canvas]",
                "a[data-testid=link-composite-text-with-svg]"
            ]
        );

        checkTest(_6_1_4, "6.1.4",
            A11yResultStatus.MANUAL,
            [],
            [
                "svg[data-testid=svg-with-link-with-href]",
                "svg[data-testid=svg-with-link-with-href-wrong-accname]",
                "svg[data-testid=svg-with-link-with-href-no-accname]",
                "svg[data-testid=svg-with-link-with-href-no-text]",
                "svg[data-testid=svg-with-link-with-xlink-href]",
            ]
        );

        checkTest(_6_1_5_NO_SVG, "6.1.5",
            A11yResultStatus.ERROR,
            [
                "a[data-testid=link-with-aria-label]"
            ]
        );

        checkTest(_6_1_5_SVG, "6.1.5",
            A11yResultStatus.MANUAL,
            [],
            [
                "svg[data-testid=svg-with-link-with-href]",
                "svg[data-testid=svg-with-link-with-href-wrong-accname]",
                "svg[data-testid=svg-with-link-with-href-no-accname]",
                "svg[data-testid=svg-with-link-with-href-no-text]",
                "svg[data-testid=svg-with-link-with-xlink-href]",
            ]
        );

        expect(summary).toEqual({
            status: A11yResultStatus.ERROR,
            criteria: {
                "6.1": {
                    status: A11yResultStatus.ERROR,
                    tests: {
                        "6.1.1": {
                            status: A11yResultStatus.MANUAL
                        },
                        "6.1.2": {
                            status: A11yResultStatus.MANUAL
                        },
                        "6.1.3": {
                            status: A11yResultStatus.MANUAL
                        },
                        "6.1.4": {
                            status: A11yResultStatus.MANUAL
                        },
                        "6.1.5": {
                            status: A11yResultStatus.ERROR
                        }
                    }
                }
            }
        });
    });

    it("6.2 should return results", async () => {
        await initA11yOnPage("link.html");
        const { result, summary } = await validateA11y(page.url(), ["6.2"]);
        expect(result.status).toEqual(A11yResultStatus.ERROR);
        const [_6_2_1] = result.ruleResults;

        checkTest(_6_2_1, "6.2.1",
            A11yResultStatus.ERROR,
            [
                "a[data-testid=link-with-img]",
                "a[data-testid=link-with-role-img]",
                "a[data-testid=link-with-area]",
                "a[data-testid=link-with-object]",
                "a[data-testid=link-with-canvas]",
                "a[data-testid=link-with-svg]",
                "span[data-testid=role-link-with-img]",
                "span[data-testid=role-link-with-role-img]",
                "span[data-testid=role-link-with-area]",
                "span[data-testid=role-link-with-object]",
                "span[data-testid=role-link-with-canvas]",
                "span[data-testid=role-link-with-svg]",
                "svg[data-testid=svg-with-link-with-href] > a",
                "svg[data-testid=svg-with-link-with-href-wrong-accname] > a",
                "svg[data-testid=svg-with-link-with-href-no-accname] > a",
                "svg[data-testid=svg-with-link-with-href-no-text] > a",
                "svg[data-testid=svg-with-link-with-xlink-href] > a",
            ]
        );

        expect(summary).toEqual({
            status: A11yResultStatus.ERROR,
            criteria: {
                "6.2": {
                    status: A11yResultStatus.ERROR,
                    tests: {
                        "6.2.1": {
                            status: A11yResultStatus.ERROR
                        }
                    }
                }
            }
        });
    });
});
