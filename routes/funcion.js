function Calcular(datos){
    // Obtiene los valores en mayusculas y la fecha sin guiones/espacios
    var nombre = datos.nombre.toUpperCase(); 
    var Apaterno = datos.Apaterno.toUpperCase();
    var Amaterno = datos.Amaterno.toUpperCase();
    var fecha = datos.fecha.replace(/-/g, '');
    var Sexo = datos.sexo;
    var Estado = datos.estado;
    console.log(fecha);

    // Comprobar si tiene apellido paterno compuesto
    var DosApellidos = Apaterno.split(' ');
    // Si tiene dos:
    if(Array.isArray(DosApellidos) && DosApellidos.length > 1)
    {
        Apaterno = QuitarApellido(DosApellidos);
    }
    else{
        Apaterno = Apaterno;
    }

    // Verificar primera letra del apellido paterno y primera vocal
    var LIPVApaterno = Apaterno.match(/^.*?([A-ZÑ])(.*?([AEIOU]))/i);
    // Si el AP no tiene vocal:
    if(LIPVApaterno == null){
        var LIApaterno = Apaterno.substring(0, 1);
        var PVApaterno = 'X';
    }
    else{
        var LIApaterno = LIPVApaterno[1]; // primera letra AP 
        var PVApaterno = LIPVApaterno[3]; // primera vocal AP 
    }
    // Si letra inicial es ñ la cambia por x
    if(LIApaterno == 'Ñ'){
        LIApaterno = 'X';
    }

    // Comprobar si son dos nombres
    var DosNombres = nombre.split(' ');
    
    // Si son dos nombres,
    if(Array.isArray(DosNombres) && DosNombres.length > 1)
    {
        nombre = CambiarNombre(DosNombres);
    }
    else{
        nombre = nombre;
    }
    LInombre = nombre.substring(0, 1);

    // Obtener fecha 
    var Faño = fecha.substring(2, 4);
    var Fmes = fecha.substring(4, 6);
    var Fdia = fecha.substring(6, 8); 

    // Obtener la siguiente consonante del apellido paterno
    var SCApaterno = Apaterno.match(/^.(?:.*?([^AEIOU]))/i);
    // Si no tiene consonante
    if(SCApaterno == null){
        SCApaterno = 'X';
    }
    else{
        SCApaterno = SCApaterno[1]; // siguiente consonante AP 
    }

    // Obtener la siguiente consonante del apellido materno
    var SCAmaterno = Amaterno.match(/^.(?:.*?([^AEIOU]))/i);
    // Si no tiene apellido materno
    if(Amaterno == '')
    { // Si no tiene consonante
        var LIAmaterno = 'X';
        SCAmaterno = 'X';
    }
    else{
        var LIAmaterno = Amaterno.substring(0, 1);
        SCAmaterno = SCAmaterno[1]; // siguiente consonante AM 
    }
    
    // Obtener la siguiente consonante del nombre
    var SCNombre = nombre.match(/^.(?:.*?([^AEIOU]))/i);
    // Si no tiene consonante
    if(SCNombre == null){
        SCNombre = 'X';
    }
    else{
        SCNombre = SCNombre[1]; // siguiente consonante nombre
    }

    // Palabra 4 letras
    var Comparar = (LIApaterno + PVApaterno + LIAmaterno + LInombre);
    // LLama funcion de palabras antisonantes
    Comparar = FiltroPalabras(Comparar);
    // Formar CURP
    var CURP = Comparar + Faño + Fmes + Fdia + Sexo + Estado + SCApaterno + SCAmaterno + SCNombre;
    console.log(CURP);
    return CURP;
};

function RetornarEstado(codigo){ // Se exporta junto con Calcular
    const estado = {
        'AS' : 'AGUASCALIENTES',
        'BC' : 'BAJA CALIFORNIA',
        'BS' : 'BAJA CALIFORNIA SUR',
        'CC' : 'CAMPECHE',
        'CL' : 'COAHUILA',
        'CM' : 'COLIMA',
        'CH' : 'CHIAPAS',
        'DF' : 'CIUDAD DE MEXICO',
        'DG' : 'DURANGO',
        'GT' : 'GUANAJUATO',
        'GR' : 'GUERRERO',
        'HG' : 'HIDALGO',
        'JC' : 'JALISCO',
        'MC' : 'ESTADO DE MEXICO',
        'MN' : 'MICHOACAN',
        'MS' : 'MORELOS',
        'NT' : 'NAYARIT',
        'NL' : 'NUEVO LEON',
        'OC' : 'OAXACA',
        'PL' : 'PUEBLA',
        'QT' : 'QUERETARO',
        'QR' : 'QUINTANO ROO',
        'SP' : 'SAN LUIS POTOSI',
        'SL' : 'SINALOA',
        'SR' : 'SONORA',
        'TC' : 'TABASCO',
        'TS' : 'TAMAULIPAS',
        'TL' : 'TLAXCALA',
        'VZ' : 'VERACRUZ',
        'YN' : 'YUCATAN',
        'ZS' : 'ZACATECAS',
        'NE' : 'NACIDO EN EL EXTRANJERO'
    }
    return estado[codigo];
}

// Importante para exportar en NodeJS
module.exports = {
    "Calcular": Calcular,
    "ConvertirE" : RetornarEstado
}


function QuitarApellido(DosApellidos){
    const Cambiar = ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI', 'DIE', 'DD', 'EL', 'LA', 'LOS', 
    'LAS', 'LE', 'LES', 'MAC', 'MC', 'VAN', 'VON', 'Y']
    var quitar = Cambiar.includes(DosApellidos[0]);
    if(quitar == true){
        return DosApellidos[1];
    }
    else{
        return DosApellidos[0];
    }
}

function CambiarNombre(DosNombres){
    if(DosNombres[0] == 'MARIA' || DosNombres[0].substring(0, 2) == 'MA' || DosNombres[0] == 'JOSE' 
    || DosNombres[0].substring(0, 1) == 'J'){
        return DosNombres[1];
    }
    else{
        return DosNombres[0];
    }
}
function FiltroPalabras(Comparar){
    const PInconvenientes = ['BACA', 'BAKA', 'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 
    'CAKA', 'CAKO', 'COGE', 'COGI', 'COJA', 'COJE', 'COJI', 'COJO', 'COLA', 'CULO', 'FALO', 
    'FETO', 'GETA', 'GUEI', 'GUEY', 'JETA', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 'KAKA', 
    'KAKO', 'KOGE', 'KOGI', 'KOJA', 'KOJE', 'KOJI', 'KOJO', 'KOLA', 'KULO', 'LILO', 'LOCA',
    'LOCO', 'LOKA', 'LOKO', 'MAME', 'MAMO', 'MEAR', 'MEAS', 'MEON','MIAR', 'MION', 'MOCO', 
    'MOKO', 'MULA', 'MULO', 'NACA', 'NACO', 'PEDA', 'PEDO', 'PENE', 'PIPI', 'PITO', 'POPO', 
    'PUTA', 'PUTO', 'QULO', 'RATA', 'ROBA', 'ROBE', 'ROBO', 'RUIN', 'SENO', 'TETA', 'VACA', 
    'VAGA', 'VAGO', 'VAKA', 'VUEI', 'VUEY', 'WUEI', 'WUEY']
    var filtrar = PInconvenientes.includes(Comparar);
    if(filtrar == true){
        return Comparar.substring(0, 1) + 'X' + Comparar.substring(2, 4);
    }
    else{
        return Comparar;
    }
}