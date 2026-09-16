/* Fishdom Cleaner — pošiljanje zapisov v Supabase.
   LASTNICA / OWNER: Ai. Nihče drug te datoteke ne ureja.
*/

window.DB = {
  ready: false,

  // Pomožna funkcija za pridobitev ali pobudo Supabase odjemalca
  getClient: function () {
    const url = window.SUPABASE_URL || '';
    const key = window.SUPABASE_ANON_KEY || '';
    if (typeof supabase !== 'undefined' && url && key) {
      return supabase.createClient(url, key);
    }
    return null;
  },

  // Shrani scan v Supabase. Ob napaki ali brez omrežja shrani lokalno v čakalno vrsto.
  saveScan: async function (zapis) {
    // Vedno najprej lokalno shranimo kot rezervno pot, da demo ne pade
    const localScans = JSON.parse(localStorage.getItem('pending_scans') || '[]');
    localScans.push(zapis);
    localStorage.setItem('pending_scans', JSON.stringify(localScans));

    const client = this.getClient();
    if (!client) {
      console.warn('Supabase ni konfiguriran ali ni povezave. Zapis shranjen lokalno.');
      return Promise.resolve({ success: true, offline: true, data: zapis });
    }

    try {
      const { data, error } = await client
        .from('scans')
        .insert([
          {
            id: zapis.id || 'scan-' + Date.now(),
            created_at: zapis.t ? new Date(zapis.t).toISOString() : new Date().toISOString(),
            material: zapis.material,
            species_id: zapis.speciesId,
            lat: zapis.lat,
            lon: zapis.lon,
            zone_id: zapis.zone,
            verified: zapis.verified,
            device_id: zapis.device_id || 'dev-local'
          }
        ]);

      if (error) throw error;
      return { success: true, offline: false, data };
    } catch (err) {
      console.error('Napaka na Supabase, zapis ostaja v localStorage:', err);
      return { success: true, offline: true, data: zapis };
    }
  },

  // Preberi zadnje zapise iz Supabase. Ob napaki vrni lokalne podatke ali prazen seznam.
  loadScans: async function () {
    const client = this.getClient();
    if (!client) {
      return JSON.parse(localStorage.getItem('pending_scans') || '[]');
    }

    try {
      const { data, error } = await client
        .from('scans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Napaka pri nalaganju iz Supabase, berem lokalno shrambo:', err);
      return JSON.parse(localStorage.getItem('pending_scans') || '[]');
    }
  }
};