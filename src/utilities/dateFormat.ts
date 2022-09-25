
function getCurrentDateFormatToString(format: string): string {
    let hoy = new Date();
    let dia = hoy.getDate().toString();
    let mes = (hoy.getMonth() + 1).toString()
    let anio = hoy.getFullYear().toString()

    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2);

    if (format === 'aaaa-mm-dd')
        return `${anio}-${mes}-${dia}`

    if (format === 'dd-mm-aaaa')
        return `${dia}-${mes}-${anio}`


    return 'format not defined';

}

export default getCurrentDateFormatToString;