﻿//const URL_SERVIDOR_REST = "https://ikeapp.conveyor.cloud/";
const URL_SERVIDOR_REST = "http://localhost:3672/";

function getConfigValue(keyname) {
    return window.localStorage.getItem(keyname);
}

function setConfigValue(keyname, value) {
    window.localStorage.setItem(keyname, value);
}

function borrarCache() {
	window.localStorage.clear();
}

function mostrarSplashScreen() {
    if (navigator.splashscreen) {
        navigator.splashscreen.show();
    }
}

function ocultarSplashScreen() {
    if (navigator.splashscreen) {
        navigator.splashscreen.hide();
    }
}

function mostrarCargando() {
    if (window.plugins && window.plugins.spinnerDialog) {
        window.plugins.spinnerDialog.show(null, "Cargando", false);
    }
}

function ocultarCargando() {
    if (window.plugins && window.plugins.spinnerDialog) {
        window.plugins.spinnerDialog.hide();
    }
}

function mostrarDialogoError(mensaje) {
    if (navigator.notification) {
        navigator.notification.alert(
            mensaje, // message
            null, // callback
            "Atención", // title
            "Ok" // buttonName
        );
    } else {
        alert(mensaje);
    }
}

function mostrarDialogoErrorSalir(mensaje) {
    if (navigator.notification) {
        navigator.notification.alert(
            mensaje, // message
            salirIndex, // callback
            "Atención", // title
            "Ok" // buttonName
        );
    } else {
        alert(mensaje);
    }
}

function obtenerGeoposicion() {
    var onSuccess = function(position) {
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude;
        var url = "https://www.google.com/maps/d/embed?mid=1zyq1jojT_RiheZizcZeF1WCLXzY&z=15&ll=" + latitud + "," + longitud;

        var ref = cordova.InAppBrowser.open(url, "_blank", "location=yes,zoom=yes");
    };

    var onError = function(error) {
        mostrarDialogoError("El GPS no se encuentra activado");
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function llamarServicioRestPOSTJSON(url, parametros) {
    var response = null;
    var token = getConfigValue("token");
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        async: false,
        url: url,
        data: JSON.stringify(parametros),
        headers: {"Authorization": "Bearer " + token},
        success: function(json) {
            response = json;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ocultarCargando();
            mostrarDialogoErrorSalir("En este momento no podemos validar su usuario. Por favor verifique su conexión a internet.");
        },
        timeout: 10000
    });
    return response;
}

function llamarServicioRestPOST(url, parametros) {
    var response = null;
    $.ajax({
        type: "POST",
        dataType: "json",
        async: false,
        url: url,
        data: parametros,
        success: function(json) {
            response = json;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ocultarCargando();
            mostrarDialogoErrorSalir("En este momento no podemos validar su usuario. Por favor verifique su conexión a internet.");
        },
        timeout: 10000
    });
    return response;
}

function llamarServicioRestGET(url) {
    var response = null;
    var token = getConfigValue("token");
    $.ajax({
        type: "GET",
        dataType: "json",
        async: false,
        url: url,
        headers: {"Authorization": "Bearer " + token},
        success: function(json) {
            response = json;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            ocultarCargando();
            mostrarDialogoErrorSalir("En este momento no podemos validar su usuario. Por favor verifique su conexión a internet.");
        },
        timeout: 10000
    });
    return response;
}

function llamarServicioRestGETFile(url) {
    var token = getConfigValue("token");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.responseType = "arraybuffer";

    xhr.onload = function(e) {
        if (this.status == 200) {
            var archivo = new Blob([this.response], {type: "application/pdf"});
            guardarArchivo("cupon-pago.pdf", archivo);
            ocultarCargando();
        } else {
            mostrarDialogoError("Error al obtener el cupón");
        }
    };

    xhr.send();
}

function login() {
    var password = getConfigValue("legajo");
    var usuario = getConfigValue("dni");
    var parametros = {
        grant_type: "password",
        UserName: usuario,
        Password: password,
        client_id: "_BusInspector1234$_"
    };

    var url = URL_SERVIDOR_REST + "token";

    var response = llamarServicioRestPOST(url, parametros);

    if (response.access_token) {
        setConfigValue("token", response.access_token);
        setConfigValue("usuarioLogueado", "S");

    } else if (response.error_description) {
        borrarCache();
        setConfigValue("usuarioLogueado", "N");
        return "Usuario no válido. Verifique los datos ingresados.Legajo  no debe tener puntos ni espacios . Documento no debe tener puntos ni espacios.";
    } else {
        borrarCache();
        setConfigValue("usuarioLogueado", "N");
        return "Usuario no válido. Verifique los datos ingresados.Legajo  no debe tener puntos ni espacios . Documento no debe tener puntos ni espacios.";
    }
}

function Firmar(Interno) {

    var parametros = {
        Inspector: 1,
        Interno: Interno,
        Seccion: 1
    };
    llamarServicioRestPOSTJSON(URL_SERVIDOR_REST + "api/Inspector", parametros);
}

function salir() {
    var urlActual = window.location.href;
    if (urlActual.substring(urlActual.lastIndexOf("/") + 1).startsWith("secciones.html") || urlActual.substring(urlActual.lastIndexOf("/") + 1).startsWith("loading.html")) {
        navigator.app.exitApp();
    } else {
        navigator.app.backHistory();
    }
}

function salirIndex() {
    var urlActual = window.location.href;
    if (urlActual.substring(urlActual.lastIndexOf("/") + 1).startsWith("index.html")) {
        navigator.app.exitApp();
    }
}





function inicializarLoading() {
  /*
    $("#ValidacionModal").modal("show");
    setTimeout(function() {
        ocultarSplashScreen();
    }, 1000);
    */
}

function inicializarHome() {


    //ocultarCargando();
    /*setTimeout(function() {
        ocultarSplashScreen();
    }, 1000);*/
}


function inicializarInspecciones() {
    mostrarCargando();


    var url = URL_SERVIDOR_REST + "api/Inspector?inspector=" + 1 ;
    lista = llamarServicioRestGET(url);

    if (lista.estado == "ok") {
        if (lista.respuesta.length > 0) {
            $.each(lista.respuesta, function(index, item) {
                var inspeccion =
                "<tr>" +
                    "<td>" +
                        item.interno +
                    "</td>" +
                    "<td>" +
                        item.hora +
                    "</td>" +
                "</tr>";

                $(".tabla-inspecciones").append(inspeccion);
            });
        } else {
            $(".tabla-inspecciones").append("<tr><td colspan='3'>No se encontraron Inspecciones</td></tr>");
        }
    } else if (response.errores && response.errores.length > 0) {

    } else {

    }
    ocultarCargando();
}
function inicializarSeccion() {
    // mostrarCargando();


    var url = URL_SERVIDOR_REST + "api/Seccion" ;
    lista = llamarServicioRestGET(url);

    if (lista.estado == "ok") {
        if (lista.respuesta.length > 0) {
            $.each(lista.respuesta, function(index, item) {
                var seccion =
                "<tr>" +
                    "<td>" +
                        item.nombre +
                    "</td>" +
                    "<td><button type='button' class='btn btn-primary'>Seleccionar</button>" +

                    "</td>" +
                "</tr>";

                $(".tabla-seccion").append(seccion);
            });
        } else {
            $(".tabla-seccion").append("<tr><td colspan='3'>No se encontraron secciones</td></tr>");
        }
    } else if (response.errores && response.errores.length > 0) {

    } else {

    }
    // ocultarCargando();
}
