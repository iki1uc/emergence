// ============================================================
// EVO-GRAD – Evolutionäre Anpassung
// ============================================================
const EVO = {
    // Aus NC.ARCHIEF und ay.raw abgeleitet
    init(syn, quant, respo) {
        this.syn = syn;
        this.quant = quant;
        this.respo = respo;
        this.phase = 0;
        this.gradient = 0;
    },

    // EVO-Schritt: Das UFO passt sich an
    step(dt) {
        // 1. Gradient aus SYN/QUANT-Differenz
        const diff = this.syn - this.quant;
        this.gradient += diff * dt * 0.1;
        this.gradient = Math.max(-1, Math.min(1, this.gradient));

        // 2. Phasenverschiebung (540° wird dynamisch)
        this.phase += (this.respo * 0.5 + 0.5) * dt * 0.5;

        // 3. UFO-Form ändert sich mit RESPO
        this.ufoScale = 0.7 + this.respo * 0.3;
        this.ufoPulse = 0.5 + 0.5 * Math.sin(this.phase + this.gradient);
    },

    // EVO-State für UFO
    getUFOState() {
        return {
            rotation: this.phase * 180 / Math.PI,
            scale: this.ufoScale,
            pulse: this.ufoPulse,
            gradient: this.gradient,
            mode: this.gradient > 0.3 ? "expand" :
                   this.gradient < -0.3 ? "contract" : "stabil"
        };
    }
};
