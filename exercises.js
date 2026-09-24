// Exercise Evaluator
    function runExercise(num) {
      const code = document.getElementById(`ex${num}-code`).value;
      const consoleEl = document.getElementById(`ex${num}-console`);
      const statusEl = document.getElementById(`ex${num}-status`);
      consoleEl.innerHTML = '';

      const logs = [];
      const originalLog = console.log;

      console.log = function(...args) {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        originalLog.apply(console, args);
      };

      try {
        const runFn = new Function(code);
        runFn();

        logs.forEach(log => {
          const div = document.createElement('div');
          div.className = 'py-0.5 text-emerald-400';
          div.innerText = '❯ ' + log;
          consoleEl.appendChild(div);
        });

        // Validation Rules
        let passed = false;
        let feedback = "";

        if (num === 1) {
          passed = logs.some(l => l.includes('15')) && code.includes('operacaoCallback');
          feedback = passed ? "✨ Parabéns! A função retornou o resultado correto chamando o callback!" : "💡 Dica: Certifique-se de fazer 'return operacaoCallback(a, b)' dentro da função.";
        } else if (num === 2) {
          passed = logs.some(l => l.includes('Aluno: Ana')) && logs.some(l => l.includes('Aluno: Carlos'));
          feedback = passed ? "✨ Excelente! Você passou a lista e a função callback com sucesso!" : "💡 Dica: Lembre-se de chamar 'processarLista(alunos, formatarNome);' sem parênteses na função callback.";
        } else if (num === 3) {
          passed = code.includes('setTimeout') && code.includes('callbackFinal');
          feedback = passed ? "✨ Perfeito! O callback foi engrenado com o setTimeout!" : "💡 Dica: Use 'setTimeout(function() { callbackFinal(...); }, 1000);'";
        } else if (num === 4) {
          passed = logs.some(l => l.includes('2') && l.includes('4') && l.includes('6'));
          feedback = passed ? "✨ Fantástico! O filtro customizado executou o callback para cada item!" : "💡 Dica: Verifique se usou 'callbackCondicao(lista[i])' para testar cada número.";
        } else if (num === 5) {
          passed = logs.some(l => l.includes('90') && l.includes('180') && l.includes('45'));
          feedback = passed ? "✨ Muito bem! O .map() aplicou o callback em cada elemento!" : "💡 Dica: Use 'precos.map(preco => preco * 0.9)'.";
        } else if (num === 6) {
          passed = logs.some(l => l.includes('SUCESSO')) && logs.some(l => l.includes('ERRO'));
          feedback = passed ? "✨ Ótimo trabalho manipulando múltiplos callbacks de fluxo!" : "💡 Dica: Invoque 'callbackSucesso(...)' quando o email tiver '@' e 'callbackErro(...)' caso contrário.";
        } else if (num === 7) {
          passed = logs.some(l => l.includes('Bruno'));
          feedback = passed ? "✨ Perfeito! O .find() localizou o elemento através do seu callback!" : "💡 Dica: Retorne 'u.id === 2' no callback do find.";
        } else if (num === 8) {
          passed = logs.some(l => l.indexOf('Mouse') < l.indexOf('Teclado'));
          feedback = passed ? "✨ Excelente! Os produtos foram ordenados via callback comparador!" : "💡 Dica: Use 'produtos.sort((a, b) => a.preco - b.preco)'.";
        } else if (num === 9) {
          passed = logs.some(l => l.includes('200'));
          feedback = passed ? "✨ Muito bem! O .reduce() acumulou os valores corretamente!" : "💡 Dica: Use 'carrinho.reduce((acc, item) => acc + item, 0)'.";
        } else if (num === 10) {
          passed = logs.some(l => l.includes('APRENDER CALLBACKS E DIVERTIDO!!!'));
          feedback = passed ? "✨ Parabéns! Você concluiu todos os 10 exercícios práticos com sucesso!" : "💡 Dica: Retorne 'callbackFormatador(frase)' dentro de 'formatarTexto'.";
        }

        const fbDiv = document.createElement('div');
        fbDiv.className = `mt-3 p-2 text-xs rounded border ${passed ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' : 'bg-amber-950/40 text-amber-300 border-amber-800'}`;
        fbDiv.innerText = feedback;
        consoleEl.appendChild(fbDiv);

        if (passed) {
          statusEl.innerText = "Concluído ✅";
          statusEl.className = "text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-max font-bold";
        }

      } catch (err) {
        const div = document.createElement('div');
        div.className = 'text-red-400 bg-red-950/30 p-2 rounded border border-red-900/50 mt-1';
        div.innerText = '❌ Erro no código: ' + err.message;
        consoleEl.appendChild(div);
      } finally {
        console.log = originalLog;
      }
    }
