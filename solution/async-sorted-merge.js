"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  while (!logSources.every(logSource => logSource.drained)) {
    logSources.sort((a, b) => a.last.date - b.last.date);
    const oldestLog = logSources.find(logSource => !logSource.drained);
    printer.print(oldestLog.last);
    await oldestLog.popAsync();
  }

  printer.done();

  return new Promise((resolve, reject) => {
    resolve(console.log("Async sort complete."));
  });
};
