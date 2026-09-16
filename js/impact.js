// js/impact.js - Izračun in prikaz podatkov za občine in marine

window.ImpactScreen = {
  // Glavna funkcija za osvežitev občinskega zaslona
  async render() {
    // 1. Pridobi podatke iz baze (ali fallback v localStorage)
    let scans = [];
    if (window.DB && typeof window.DB.loadScans === 'function') {
      scans = await window.DB.loadScans();
    } else {
      scans = JSON.parse(localStorage.getItem('pending_scans') || '[]');
    }

    // 2. Izračunaj statistike
    const stats = this.calculateStats(scans);

    // 3. Prikaz na zaslonu
    this.updateUI(stats);
  },

  calculateStats(scans) {
    const total = scans.length;
    const verifiedCount = scans.filter(s => s.verified).length;

    // Razdelitev po materialih
    const materials = {};
    // Razdelitev po conah
    const zones = {};

    scans.forEach(s => {
      // Materiali
      const mat = s.material || 'neznano';
      materials[mat] = (materials[mat] || 0) + 1;

      // Cone
      const z = s.zone_id || 'neznano';
      zones[z] = (zones[z] || 0) + 1;
    });

    return {
      total,
      verifiedCount,
      materials,
      zones
    };
  },

  updateUI(stats) {
    console.log("Občinska statistika pripravljena:", stats);
    
    // Osnovni izpis na zaslon (prilagodi ID-je elementov glede na svoj HTML)
    const totalEl = document.getElementById('impact-total');
    const verifiedEl = document.getElementById('impact-verified');
    const materialsEl = document.getElementById('impact-materials');

    if (totalEl) totalEl.textContent = stats.total;
    if (verifiedEl) verifiedEl.textContent = `${stats.verifiedCount} preverjenih`;
    
    if (materialsEl) {
      materialsEl.innerHTML = Object.entries(stats.materials)
        .map(([mat, count]) => `<li>${mat}: ${count}</li>`)
        .join('');
    }
  }
};
