// Interactive Flow Simulation Steps
    let currentStep = 0;
    function startSimulation() {
      currentStep = 0;
      document.getElementById('sim-btn-start').disabled = true;
      document.getElementById('sim-btn-next').disabled = false;
      nextSimStep();
    }

    function nextSimStep() {
      // Nao avance alem da ultima etapa da simulacao.
      if (currentStep >= 3) {
        return;
      }

      currentStep++;
      const box1 = document.getElementById('flow-box-1');
      const box2 = document.getElementById('flow-box-2');
      const box3 = document.getElementById('flow-box-3');

      const badge1 = document.getElementById('badge-step-1');
      const badge2 = document.getElementById('badge-step-2');
      const badge3 = document.getElementById('badge-step-3');

      const desc = document.getElementById('sim-code-desc');
      const status = document.getElementById('sim-status-text');

      // Reset styles
      [box1, box2, box3].forEach(b => {
        b.className = "p-5 rounded-xl bg-slate-950 border border-slate-800 transition-all duration-500 opacity-40 scale-95";
      });
      [badge1, badge2, badge3].forEach(bg => bg.classList.add('hidden'));

      if (currentStep === 1) {
        status.innerText = "Etapa 1: Início da chamada";
        box1.className = "p-5 rounded-xl bg-slate-900 border-2 border-amber-500 transition-all duration-500 opacity-100 scale-100 shadow-lg shadow-amber-500/10";
        badge1.classList.remove('hidden');
        desc.innerHTML = `👉 Passamos a função callback como argumento: <br><code class="text-amber-300">processarPedido("Pizza Calabresa", entregarPizza);</code>`;
      } else if (currentStep === 2) {
        status.innerText = "Etapa 2: Executando função principal";
        box2.className = "p-5 rounded-xl bg-slate-900 border-2 border-sky-500 transition-all duration-500 opacity-100 scale-100 shadow-lg shadow-sky-500/10";
        badge2.classList.remove('hidden');
        desc.innerHTML = `⚙️ A função <code class="text-sky-300">processarPedido</code> prepara a pizza. Durante o processo ela guarda a referência de <code class="text-amber-300">entregarPizza</code>.`;
      } else if (currentStep === 3) {
        status.innerText = "Etapa 3: Chamando o Callback";
        box3.className = "p-5 rounded-xl bg-slate-900 border-2 border-emerald-500 transition-all duration-500 opacity-100 scale-100 shadow-lg shadow-emerald-500/10";
        badge3.classList.remove('hidden');
        desc.innerHTML = `🎉 A pizza ficou pronta! A função principal invoca <code class="text-emerald-300">callback("Sua pizza chegou!")</code>!`;
        document.getElementById('sim-btn-next').disabled = true;
        document.getElementById('sim-btn-start').disabled = false;
        document.getElementById('sim-btn-start').innerText = "🔄 Reiniciar Animação";
      }
    }
