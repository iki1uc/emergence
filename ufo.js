// ============================================================
// UFO.js – EVO-Grad · 540° · NC.ARCHIEF + ay.raw
// ============================================================

const UFO = {
    // NC.ARCHIEF – Steuerung
    archief: {
        key: 0.618,           // φ⁻¹
        syn: 0.5,
        quant: 0.5,
        target: 0.618,
        damp: function() {
            if (this.syn > this.quant) {
                this.quant *= 0.9;
            } else if (this.quant > this.syn) {
                this.syn *= 0.9;
            }
        }
    },

    // ay.raw – Grundlagen
    raw: {
        phi: 1.6180339887,
        qi: (i) => i % 3,
        iqq: (i) => (i % 3) * 0.333,
        syn: (i) => Math.sin(i),
        grid: 9**9,
        ufo: 540
    },

    // EVO-Grad – Die Brücke
    evo: {
        phase: 0,
        gradient: 0,
        ufoScale: 0.7,
        ufoPulse: 0.5,

        step: function(dt, syn, quant) {
            const diff = syn - quant;
            this.gradient += diff * dt * 0.1;
            this.gradient = Math.max(-1, Math.min(1, this.gradient));

            const respo = (syn + quant) / this.raw.phi;
            this.phase += (respo * 0.5 + 0.5) * dt * 0.5;

            this.ufoScale = 0.7 + respo * 0.3;
            this.ufoPulse = 0.5 + 0.5 * Math.sin(this.phase + this.gradient);
        },

        getState: function() {
            return {
                rotation: this.phase * 180 / Math.PI,
                scale: this.ufoScale,
                pulse: this.ufoPulse,
                gradient: this.gradient,
                mode: this.gradient > 0.3 ? "expand" :
                       this.gradient < -0.3 ? "contract" : "stabil"
            };
        }
    }
};
