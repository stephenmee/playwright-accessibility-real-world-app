const fs = require("fs");

interface Violation {
    id: string;
    impact: string;
    url: string[];
    description: string;
    help: string;
    helpUrl: string;
    count: number;
}

function consolidateViolations(violations: Violation[]): Violation[] {
    const consolidatedMap: { [id: string]: Violation } = {};
console.log(`${typeof violations}`);
    violations.forEach(violation => {
        if (consolidatedMap[violation.id]) {
            consolidatedMap[violation.id].count += 1;
        } else {
            consolidatedMap[violation.id] = { ...violation, count: 1 };
        }
    });
    return Object.values(consolidatedMap);
}

// Example usage
const readViolations = fs.readFileSync('src/tests/summaryReport.json', 'utf8')
const consolidatedViolations = consolidateViolations(JSON.parse(readViolations));
console.log(consolidatedViolations);

function generateTable(violations: Violation[]): string {
    let tableHTML = '<table border="1">';
    tableHTML += '<tr><th>ID</th><th>Impact</th><th>URL</th><th>Description</th><th>Help</th><th>Help URL</th><th>Count</th></tr>';

    violations.forEach(violation => {
        tableHTML += `<tr>
                    <td>${violation.id}</td>
                    <td>${violation.impact}</td>
                    <td>${violation.url}</td>
                    <td>${violation.description}</td>
                    <td>${violation.help}</td>
                    <td>${violation.helpUrl}</td>
                    <td>${violation.count}</td>
                  </tr>`;
    });

    tableHTML += '</table>';
    return tableHTML;
}

const table = generateTable(consolidatedViolations);
fs.writeFileSync('src/tests/summaryReport.html',table)
console.log(table); // Output the HTML table
