export class LogService {
    
    static log(msg: any): void {
        const d = new Date();
        console.log(
            d.toISOString().split("T")[0] + " " + // Data
            d.toString().split(" ")[4] + ": " +   // Hora
            JSON.stringify(msg)
        );
    }
}
