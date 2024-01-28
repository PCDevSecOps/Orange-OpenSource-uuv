import { AutoCheckA11yRule, ManualCheckA11yRule } from "../../../model";
import { AttributeChecker, ByTagQuery, CompliantAttributesQuery, OrQuery } from "../../../query";


export default [
    AutoCheckA11yRule.from({
        criterion: "5.1",
        wcag: "1.3.1 A",
        id: "5.1.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not(:has(> caption)), table > caption:empty"
            ]),
            [
                AttributeChecker.emptyAttribute("summary"),
                AttributeChecker.emptyHtmlNodeTargetedByTheAttribute("aria-describedby"),
            ]
        ),
        description: "Table tag without summary",
        help: "set a summary to table"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.1",
        wcag: "1.3.1 A",
        id: "5.1.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "[role=table]:not(:has(> caption)), [role=table]:has(> caption:empty)"
            ]),
            [
                AttributeChecker.emptyHtmlNodeTargetedByTheAttribute("aria-describedby"),
            ]
        ),
        description: "Element with role table without summary",
        help: "set a summary to table"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.2",
        wcag: "1.3.1 A",
        id: "5.2.1",
        elementType: "table",
        query: new ByTagQuery([
            "table > caption:not(:empty)",
            "table[summary]:not([summary=''])",
            "table[aria-describedby]:not([aria-describedby=''])",
            "[role=table] > caption:not(:empty)",
            "[role=table][summary]:not([summary=''])",
            "[role=table][aria-describedby]:not([aria-describedby=''])",
        ]),
        description: "if present, attributes summary(before html5), aria-describedby or child tag <caption> must be relevant",
        attributes: [
            "summary(before html5)",
            "aria-describedby",
            "child tag <caption>"
        ],
        help: "adapt these attributes to be relevant"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.3",
        wcag: "1.3.2 A, 4.1.2 A",
        id: "5.3.1",
        elementType: "table",
        query: new ByTagQuery([
            "table[role=presentation]",
        ]),
        description: "table with presentation role must have revelant content",
        attributes: [
            "child tag <td>"
        ],
        help: "adapt these <td> children content to be relevant"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.4",
        wcag: "1.3.1 A",
        id: "5.4.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]):not(:has(> caption)), table:not([role=presentation]) > caption:empty",
                "[role=table]:not(:has(> caption)), [role=table]:has(> caption:empty)"
            ]),
            [
                AttributeChecker.emptyAttribute("title"),
                AttributeChecker.emptyAttribute("aria-label"),
                AttributeChecker.emptyHtmlNodeTargetedByTheAttribute("aria-labelledby"),
            ]
        ),
        description: "table must have title",
        attributes: [
            "child tag <caption>",
            "title",
            "aria-label",
            "aria-labelledby"
        ],
        help: "set one of these attributes"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.5",
        wcag: "1.3.1 A",
        id: "5.5.1",
        elementType: "table",
        query: new ByTagQuery([
            "table > caption:not(:empty)",
            "table[title]:not([title=''])",
            "table[aria-label]:not([aria-label=''])",
            "table[aria-labelledby]:not([aria-labelledby=''])",
            "[role=table] > caption:not(:empty)",
            "[role=table][title]:not([title=''])",
            "[role=table][aria-label]:not([aria-label=''])",
            "[role=table][aria-labelledby]:not([aria-labelledby=''])"
        ]),
        description: "table must have a revelant title",
        attributes: [
            "child tag <caption>",
            "title",
            "aria-label",
            "aria-labelledby"
        ],
        help: "adapt one of these attributes to be revelant"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.6",
        wcag: "1.3.1 A",
        id: "5.6.1",
        elementType: "table",
        query: new ByTagQuery([
            "table:not([role=presentation])",
            "[role=table]"
        ]),
        description: "table column header must be set properly",
        help: "each table column header must be set with tag <th> or role=\"columnheader\""
    }),
    ManualCheckA11yRule.from({
        criterion: "5.6",
        wcag: "1.3.1 A",
        id: "5.6.2",
        elementType: "table",
        query: new ByTagQuery([
            "table:not([role=presentation])",
            "[role=table]"
        ]),
        description: "table line header must be set properly",
        help: "each table line header must be set with tag <th> or role=\"rowheader\""
    }),
    ManualCheckA11yRule.from({
        criterion: "5.6",
        wcag: "1.3.1 A",
        id: "5.6.3",
        elementType: "table",
        query: new ByTagQuery([
            "table:not([role=presentation])",
            "[role=table]"
        ]),
        description: "each header does not apply to the entire row or column must be set properly"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.6",
        wcag: "1.3.1 A",
        id: "5.6.4",
        elementType: "table",
        query: new ByTagQuery([
            "table:not([role=presentation])",
            "[role=table]"
        ]),
        description: "each cell associated with several headers structured using a <th> or <td> tag"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]) tr:first-child th",
                "[role=table] tr:first-child th"
            ]),
            [
                AttributeChecker.notUniqueId(),
                AttributeChecker.emptyAttribute("scope"),
                AttributeChecker.notEquals("role", ["rowheader", "columnheader"])
            ]
        ),
        description: "Table column header attributes",
        help: "Correctly set table column header attributes"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]) tr:not(:first-child) th:first-child",
                "[role=table] tr:not(:first-child) th:first-child"
            ]),
            [
                AttributeChecker.notUniqueId(),
                AttributeChecker.emptyAttribute("scope"),
                AttributeChecker.notEquals("role", ["rowheader", "columnheader"])
            ]
        ),
        description: "Table row header attributes",
        help: "Correctly set table row header attributes"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.2",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]) tr:first-child th",
                "[role=table] tr:first-child th"
            ]),
            [
                AttributeChecker.notEmptyAttribute("scope"),
                AttributeChecker.notEquals("scope", ["col"])
            ]
        ),
        description: "Table column header scope attribute",
        help: "Set table column header scope attribute to col"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.2",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]) tr:not(:first-child) th:first-child",
                "[role=table] tr:not(:first-child) th:first-child"
            ]),
            [
                AttributeChecker.notEmptyAttribute("scope"),
                AttributeChecker.notEquals("scope", ["row"])
            ]
        ),
        description: "Table row header scope attribute",
        help: "Set table column header scope attribute to row"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.3",
        elementType: "table",
        query: new OrQuery([
            new CompliantAttributesQuery(
                new ByTagQuery([
                    "table:not([role=presentation]) tr:not(:first-child) th:not(:first-child)"
                ]),
                [
                    AttributeChecker.notUniqueId()
                ]
            ),
            new CompliantAttributesQuery(
                new ByTagQuery([
                    "table:not([role=presentation]) tr:not(:first-child) th:not(:first-child)"
                ]),
                [
                    AttributeChecker.notEmptyAttribute("scope")
                ]
            ),
            new CompliantAttributesQuery(
                new ByTagQuery([
                    "table:not([role=presentation]) tr:not(:first-child) th:not(:first-child)"
                ]),
                [
                    AttributeChecker.equals("role", ["rowheader", "columnheader"])
                ]
            )
        ]),
        description: "each header does not apply to the entire row or column must be set properly"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.4",
        elementType: "table",
        query: new ByTagQuery([
            "table:not([role=presentation])",
            "[role=table]"
        ]),
        description: "Each cell associated with several headers, the header attribute must be filled in correctly.",
        help: "Each cell associated with several headers, the header attribute must contain the list of ids referring to the target headers."
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.5",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]) tr:first-child th",
                "[role=table] tr:first-child th"
            ]),
            [
                AttributeChecker.notEmptyAttribute("role"),
                AttributeChecker.notEquals("role", ["columnheader"])
            ]
        ),
        description: "Table column header role attribute",
        help: "Set table column header role attribute to 'columnheader'"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.5",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]) tr:not(:first-child) th:first-child",
                "[role=table] tr:not(:first-child) th:first-child"
            ]),
            [
                AttributeChecker.notEmptyAttribute("role"),
                AttributeChecker.notEquals("role", ["rowheader"])
            ]
        ),
        description: "Table row header role attribute",
        help: "Set table row header role attribute to 'rowheader'"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.8",
        wcag: "1.3.1 A",
        id: "5.8.1",
        elementType: "table",
        query: new ByTagQuery([
            "table[role=presentation][summary]",
            "table[role=presentation]:has(caption)",
            "table[role=presentation]:has(thead)",
            "table[role=presentation]:has(th)",
            "table[role=presentation]:has(tfoot)",
            "table[role=presentation] :has(> [role=rowheader])",
            "table[role=presentation] :has(> [role=columnheader])",
            "table[role=presentation] td[scope]",
            "table[role=presentation] td[headers]",
            "table[role=presentation] td[axis]",
        ]),
        description: "table with presentation role must have revelant content",
        attributes: [
            "child tag <td>"
        ],
        help: "adapt these <td> children content to be relevant"
    })
];

