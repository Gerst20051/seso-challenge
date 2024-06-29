"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  while (!logSources.every(logSource => logSource.drained)) {
    logSources.sort((a, b) => a.last.date - b.last.date);
    const oldestLog = logSources.find(logSource => !logSource.drained)
    printer.print(oldestLog.last);
    oldestLog.pop();
  }

  printer.done();

  return console.log("Sync sort complete.");
};
