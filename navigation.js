// Tab Switching Logic
    function switchTab(tabId) {
      const tabs = ['teoria', 'visualizador', 'playground', 'exercicios', 'quiz'];
      
      tabs.forEach(t => {
        const sec = document.getElementById(`sec-${t}`);
        const tabBtn = document.getElementById(`tab-${t}`);
        const mobBtn = document.getElementById(`mob-tab-${t}`);
        
        if (t === tabId) {
          sec.classList.remove('hidden');
          if (tabBtn) {
            tabBtn.className = "px-2.5 py-2 whitespace-nowrap rounded-lg transition-all text-amber-400 bg-slate-800 shadow font-semibold";
          }
          if (mobBtn) {
            mobBtn.className = "px-3 py-1.5 rounded-lg bg-slate-800 text-amber-400 whitespace-nowrap font-semibold";
          }
        } else {
          sec.classList.add('hidden');
          if (tabBtn) {
            tabBtn.className = "px-2.5 py-2 whitespace-nowrap rounded-lg transition-all text-slate-400 hover:text-slate-200";
          }
          if (mobBtn) {
            mobBtn.className = "px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 whitespace-nowrap";
          }
        }
      });

      // Update progress bar
      const index = tabs.indexOf(tabId) + 1;
      const progressPercent = (index / tabs.length) * 100;
      document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    }
