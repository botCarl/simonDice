const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego {
    constructor() {
        this.inicializar();
        this.generarSecuencia();
        setTimeout(() => {
            this.siguienteNivel();
        }, 500);
    };

    inicializar() {
        // bind this game on elegirColor
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.inicializar = this.inicializar.bind(this);
        this.toggleBtnEmpezar();
        this.nivel = 1;
        // destructuring celeste: celeste
        this.colores = { celeste, violeta, naranja, verde }
    };

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
        } else {
            btnEmpezar.classList.add('hide');
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    };

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste';
                // break no es necesario por el return
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }
    };
    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0;
                // break no es necesario por el return
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
        }
    };

    siguienteNivel() {
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    };

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    };

    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350)
    };

    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick() {
        // var self = this;
        // var _this = this;
        // this.colores.violeta.addEventListener('click', this.elegirColor.bind(_this))
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)            
    }

    elegirColor(ev) {
        const NOMBRE_COLOR = ev.target.dataset.color;
        const NUMERO_COLOR = this.transformarColorANumero(NOMBRE_COLOR);
        this.iluminarColor(NOMBRE_COLOR);
        if (NUMERO_COLOR === this.secuencia[this.subNivel]) {
            this.subNivel++;
            if (this.subNivel === this.nivel) {
                this.nivel++;
                this.eliminarEventosClick();
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego();                
                } else {
                    // setTimeout(this.siguienteNivel.bind(this), 2000);
                    setTimeout(this.siguienteNivel, 1500);
                }
            }
        } else {
                this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal('Simon Dice', 'Felicitaciones, ganaste el juego!', 'success')
            .then(this.inicializar);
    }

    perdioElJuego() {
        swal('Simon Dice', 'Lo lamentamos, perdiste :(', 'error')
            .then(() => {
                this.eliminarEventosClick();
                this.inicializar();
            });
    }
}

function empezarJuego() {
    var juego = new Juego();
}