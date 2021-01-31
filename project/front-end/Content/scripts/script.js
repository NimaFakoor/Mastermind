//Master Mind
mastermind = (function () {
    let lineaOrigen;
    let copiaLineaOrigen;
    let colorEsta;
    let colorEnSuSitio;
    let numIntentos;

    let colores = ['red', 'white', 'black', 'yellow'];

    function genearColor() {
        return colores[Math.floor(Math.random() * colores.length)];
    }

    function init() {
        lineaOrigen = [];
        numIntentos = 0;
        for (let i = 0; i < 4; i++) {
            lineaOrigen.push(genearColor());
        }
    }

    function comprobarEstado(comprobar) {
        copiaLineaOrigen = lineaOrigen.slice();
        colorEsta = 0;
        colorEnSuSitio = 0;
        if (Array.isArray(comprobar)) {
            comprobar.forEach(function (element, index) {
                if (copiaLineaOrigen[index] == element) {
                    copiaLineaOrigen[index] = 0;
                    comprobar[index] = 1;
                    colorEnSuSitio++;
                }
            });

            comprobar.forEach(function (element, index) {
                let inidiceOrigen = copiaLineaOrigen.indexOf(element);
                if (inidiceOrigen != -1) {
                    copiaLineaOrigen[inidiceOrigen] = 0;
                    colorEsta++;
                }
            });

        }
        return {
            copiaLineaOrigen: copiaLineaOrigen,
            colorEsta: colorEsta,
            colorEnSuSitio: colorEnSuSitio
        }
    }

    function getNumIntentos() {
        return numIntentos;
    }

    function incrementarIntentos() {
        numIntentos++;
    }

    function mostrar() {
        console.log(lineaOrigen);
    }

    return {
        init: init,
        comprobarEstado: comprobarEstado,
        getNumIntentos: getNumIntentos,
        incrementarIntentos: incrementarIntentos
    }

})();

{
    let coloresAElegir,
        arrayColoresSeleccionados,
        colorPulsado,
        containerIntentos,
        colorElegidoIntento,
        btnCheck,
        arrayIntentoAComprobar,
        numIntentos,
        containerLeft,
        containerUltimoIntento,
        btnStart,
        btnSalir,
        formularioMenu,
        backgroundMenu,
        tituloResultadoMenuPartidaMasterMind,
        numeroIntentosResultadoMenuPartidaMasterMind;


    let getUltimoIntento = function () {
        for (let i = containerIntentos.childNodes.length; i > 0; i--) {
            if (containerIntentos.childNodes[i - 1].nodeName != '#text') {
                return containerIntentos.childNodes[i - 1];
            }
        }

    };

    let insertarColorUltimoIntento = function () {
        let classCirculo;
        for (let i = 0; i < containerUltimoIntento.getElementsByClassName('circleIntentoColor').length; i++) {
            classCirculo = containerUltimoIntento.getElementsByClassName('circleIntentoColor')[i].classList[containerUltimoIntento.getElementsByClassName('circleIntentoColor')[i].classList.length - 1]; //Get ultima clase del elemento
            if (classCirculo != 'colorRelleno') {
                containerUltimoIntento.getElementsByClassName('circleIntentoColor')[i].style.backgroundColor = colorPulsado;
                containerUltimoIntento.getElementsByClassName('circleIntentoColor')[i].classList.add('colorRelleno');
                break;
            }
        }
    };

    let getColor = function (rgb) {
        switch (rgb) {
            case 'rgb(255, 34, 34)':
                return 'red';
            case 'rgb(255, 255, 255)':
                return 'white';
            case 'rgb(0, 0, 0)':
                return 'black';
            case 'rgb(255, 251, 34)':
                return 'yellow';
            case 'rgb(255, 115, 34)':
                return 'naranja';
            case 'rgb(185, 97, 24)':
                return 'marron';
            case 'rgb(34, 156, 255)':
                return 'azul';
            case 'rgb(34, 255, 89)':
                return 'verde';

        }
    };

    let insertColorEstadoUltimoIntento = function (color, posicion) {
        let classCirculo = containerUltimoIntento.getElementsByClassName('circleEstadoColor')[posicion];
        classCirculo.style.backgroundColor = color;
    };

    let drawIntentoColorEnSuSitio = function (numeroColorEnSuSitio, posicion) {
        for (let i = 0; i < numeroColorEnSuSitio; i++) {
            insertColorEstadoUltimoIntento('#000', posicion++);
        }
        return posicion;

    };

    let drawIntentoColorEsta = function (numeroColorEsta, posicion) {
        for (let i = 0; i < numeroColorEsta; i++) {
            insertColorEstadoUltimoIntento('#FFF', posicion++);
        }
    };

    let getNumeroColoresInsertados = function () {
        return containerUltimoIntento.getElementsByClassName('colorRelleno').length;
    };

    /**
     * Nuevo intento
     */
    let nuevoIntento = function () {
        let ultimoIntentoAnterior = getUltimoIntento();
        if (ultimoIntentoAnterior != undefined) { //comprobar si existe un último intento
            getUltimoIntento().style.pointerEvents = 'none';
        }
        containerIntentos.insertAdjacentHTML('beforeend', '<div class="containerIntentoColores">' +
            '<div class="circleIntentoColor"></div>' +
            '<div class="circleIntentoColor"></div>' +
            '<div class="circleIntentoColor"></div>' +
            '<div class="circleIntentoColor"></div>' +
            '' +
            '<div class="circleEstadoColor"></div>' +
            '<div class="circleEstadoColor"></div>' +
            '<div class="circleEstadoColor"></div>' +
            '<div class="circleEstadoColor"></div>' +
            '</div>');
        mastermind.incrementarIntentos();
    };

    /**
     * Comprobar intento
     */
    let clickCheckIntento = function () {
        if (getNumeroColoresInsertados() == 4) {
            arrayIntentoAComprobar = [];
            let coloresIntentoAComprobar = containerUltimoIntento.getElementsByClassName('circleIntentoColor');
            for (let i = 0; i < coloresIntentoAComprobar.length; i++) {
                arrayIntentoAComprobar.push(getColor(coloresIntentoAComprobar[i].style.backgroundColor));
            }
            let resultadoMasterMind = mastermind.comprobarEstado(arrayIntentoAComprobar);
            let posicion = 0;
            posicion = drawIntentoColorEnSuSitio(resultadoMasterMind.colorEnSuSitio, posicion);
            drawIntentoColorEsta(resultadoMasterMind.colorEsta, posicion);
            if (resultadoMasterMind.colorEnSuSitio != 4) {
                nuevoIntento();
                containerUltimoIntento = getUltimoIntento();
                updateContadorIntentos();
                iniciarCalbackSeleccionColorIntento();
                goToScrollBottom();

            } else {
                viewMenu(true);
            }

        }

    };


    /**
     * 
     */
    let clickBotonElegir = function () {
        colorPulsado = getComputedStyle(this, null).getPropertyValue("background-color");
        insertarColorUltimoIntento();
    };

    let clickColorElegidoIntento = function () {
        if (this.classList[this.classList.length - 1] == 'colorRelleno') {
            this.classList.remove('colorRelleno');
        }
        this.style.backgroundColor = '#d6d6d6fa';
    }


    let iniciarCalbackColoresElegir = function () {
        for (let i = 0; i < coloresAElegir.length; i++) {
            coloresAElegir[i].addEventListener('click', clickBotonElegir);
        }
    };

    /**
     * Asignar los calback al a los colores de cada intento
     */
    let iniciarCalbackSeleccionColorIntento = function () {
        colorElegidoIntento = containerUltimoIntento.getElementsByClassName('circleIntentoColor');
        for (let i = 0; i < colorElegidoIntento.length; i++) {
            colorElegidoIntento[i].addEventListener('click', clickColorElegidoIntento);
        }
    };

    /**
     * Asignar los calback al botón de chequear.
     */
    let iniciarCalbackBtnCheck = function () {
        btnCheck.addEventListener('click', clickCheckIntento);
    };

    /**
     * Asignar los calback al botón de Nueva partida.
     */
    let inidicarCalbackBtnStart = function () {
        btnStart.addEventListener('click', start);
    };

    /**
     * 
     */
    let inidicarCalbackBtnSalir = function () {
        btnSalir.addEventListener('click', salir);
    };


    /**
     * 
     */
    let updateContadorIntentos = function () {
        numIntentos.innerHTML = 'تلاش ها : ' + mastermind.getNumIntentos();
    };

    /**
     *
     */
    let goToScrollBottom = function () {
        containerLeft.scrollTo(0, containerLeft.scrollHeight);
    };

    /**
     *
     */
    let salir = function () {
        window.close();
    };

    /**
     * Menu
     */
    let viewMenu = function () {
        if (arguments[0] == true) { 
            tituloResultadoMenuPartidaMasterMind.innerHTML = '¡شما برنده اید!';
            numeroIntentosResultadoMenuPartidaMasterMind.innerHTML = 'تلاش: ' + mastermind.getNumIntentos();
        }
        formularioMenu.style.top = '0%';
        backgroundMenu.style.visibility = 'visible';
        backgroundMenu.style.opacity = '0.5';
    };

    let closeMenu = function () {
        formularioMenu.style.top = '-100%';
        backgroundMenu.style.opacity = '0';
        backgroundMenu.style.visibility = 'hidden';
    };

    let clearAllIntententos = function () {
        while (containerIntentos.firstChild) {
            containerIntentos.removeChild(containerIntentos.firstChild);
        }
        nuevoIntento();

    };

    let actualizarContainerIntentos = function () {
        containerIntentos = document.getElementById('containerIntento');
    };

    let start = function () {
        closeMenu();

        mastermind.init();

        coloresAElegir = document.getElementsByClassName('colorEleccion');
        containerIntentos = document.getElementById('containerIntento');
        clearAllIntententos();
        arrayColoresSeleccionados = [];
        containerLeft = document.getElementById('containerLeft');
        numIntentos = document.getElementById('contadorIntentos');
        btnCheck = document.getElementById('btn-checkColores');

        containerUltimoIntento = getUltimoIntento();
        iniciarCalbackColoresElegir();
        iniciarCalbackSeleccionColorIntento();
        iniciarCalbackBtnCheck();
        updateContadorIntentos();
        goToScrollBottom();
    };


    let init = function () {
        btnStart = document.getElementById('btn-Start');
        btnSalir = document.getElementById('btn-Salir');
        formularioMenu = document.getElementById('containerMenuOpciones');
        backgroundMenu = document.getElementById('backgroundMenuOpciones');
        tituloResultadoMenuPartidaMasterMind = document.getElementById('titleResultadoMenuPartida');
        numeroIntentosResultadoMenuPartidaMasterMind = document.getElementById('numeroIntentosMenuPartida');
        inidicarCalbackBtnStart();
        inidicarCalbackBtnSalir();

    };

    window.onload = function () {
        init();
    };
}