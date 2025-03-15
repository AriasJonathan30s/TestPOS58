const printer = require('./printerVerify');

module.exports = {
    order:(persona)=>{
        return new Promise(async (resolve, reject) => {
            const printers = printer.getPrinters();
            const validPrinter = printer.getValPrinter(printers);
            if (validPrinter) {
                const isPrinterConn = printer.createTicket(validPrinter, persona);
                // let ticket = printer.createTicket(validPrinter);
                resolve(persona);
            } else {
                reject('Error');
            }
        })
    }
}