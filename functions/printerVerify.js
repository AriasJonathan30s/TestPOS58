let SystemReceiptPrinter = require('@point-of-sale/system-receipt-printer');
let ReceiptPrinterEncoder = require('@point-of-sale/receipt-printer-encoder');

module.exports = {
    getPrinters: ()=>{
        const printers = SystemReceiptPrinter.getPrinters();
        return printers;
    },
    getValPrinter: (printers)=>{
        let isTrue = false;
        let printerName;
        printers.map(printer=>{
            if (printer.name === 'POS-58') {
                isTrue = true;
                printerName = printer.name;
            }
        })
        if (isTrue) {
            return printerName;
        } else {
            return isTrue;
        }
    },
    createTicket: async (name,persona)=>{
        let receiptPrinter = new SystemReceiptPrinter({
            name: name
        });

        let encoder = new ReceiptPrinterEncoder({
            language:  'esc-pos'
        })

        receiptPrinter.addEventListener('connected', async ()=>{
            console.log('Connected printer');

            let data = encoder
            .initialize()
            .newline().text('Nombre: '.concat(persona.nombre))
            .newline().text('Apellido: '.concat(persona.apellido))
            .newline().text('Edad: '.concat(persona.edad))
            .encode();

            await receiptPrinter.print(data);

            receiptPrinter.disconnect();
        })

        receiptPrinter.addEventListener('disconnected', () => {
            console.log(`Disconnected from the printer`);
        });

        receiptPrinter.connect();
        return true
    },
};