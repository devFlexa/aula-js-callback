// Code Templates for Playground
    const templates = {
      basico: `// 1. Definimos uma função de saudação
function saudarComEntusiasmo(nome) {
  console.log("🚀 VAMOS LÁ, " + nome.toUpperCase() + "!");
}

// 2. Criamos uma função que recebe o callback
function prepararAluno(nomeAluno, meuCallback) {
  console.log("Iniciando aula para: " + nomeAluno);
  console.log("Chamando a função de callback...");
  
  // Executa o callback passando o nome
  meuCallback(nomeAluno);
}

// 3. Executamos passando saudarComEntusiasmo como callback
prepararAluno("Dev Iniciante", saudarComEntusiasmo);`,

      timeout: `console.log("1. Pedido enviado para a cozinha...");

// setTimeout é uma função nativa do JS que recebe um callback
// e um tempo de espera em milissegundos (2000ms = 2 segundos)
setTimeout(function() {
  console.log("3. 🍕 Callback executado: A pizza está pronta!");
}, 2000);

console.log("2. Enquanto a pizza assa, continuo navegando na internet...");`,

      array: `const numeros = [10, 20, 30, 40];

console.log("Array original:", numeros);

// forEach aceita uma função callback para executar em CADA item
numeros.forEach(function(numero, indice) {
  const dobro = numero * 2;
  console.log(\`Item no índice \${indice}: \${numero} -> Dobro: \${dobro}\`);
});`,

      mapFilter: `const precos = [10, 55, 120, 30, 200];

console.log("Preços originais:", precos);

// 1. .filter() usa callback para filtrar itens maiores que 50
const caros = precos.filter(function(preco) {
  return preco > 50;
});
console.log("Preços > 50:", caros);

// 2. .map() usa callback para aplicar 10% de desconto em todos
const comDesconto = precos.map(function(preco) {
  return preco * 0.9;
});
console.log("Com 10% de desconto:", comDesconto);`,

      interval: `let segundos = 0;
console.log("Iniciando cronômetro...");

// setInterval executa o callback a cada 500ms
const timer = setInterval(function() {
  segundos += 0.5;
  console.log("⏱️ Tempo decorrido: " + segundos + "s");
  
  if (segundos >= 2) {
    console.log("🛑 Tempo esgotado! Parando temporizador.");
    clearInterval(timer);
  }
}, 500);`,

      sucessoErro: `// Função que simula a verificação de idade para um brinquedo
function verificarIdade(idade, callbackSucesso, callbackErro) {
  console.log("Verificando idade (" + idade + " anos)...");
  
  if (idade >= 12) {
    callbackSucesso("Acesso permitido na montanha-russa! 🎢");
  } else {
    callbackErro("Ops! Precisa ter no mínimo 12 anos. ⛔");
  }
}

// Callbacks definidos:
function sucesso(msg) {
  console.log("✅ SUCESSO: " + msg);
}

function erro(msg) {
  console.log("❌ ERRO: " + msg);
}

// Teste 1:
verificarIdade(15, sucesso, erro);

// Teste 2:
verificarIdade(9, sucesso, erro);`
    };

    function loadTemplate(key) {
      if (templates[key]) {
        document.getElementById('playground-code').value = templates[key];
        clearConsole('playground-console');
      }
    }

    function clearConsole(consoleId) {
      const consoleEl = document.getElementById(consoleId);
      consoleEl.innerHTML = '<div class="text-slate-600 italic">// Console limpo...</div>';
    }

    // Code Runner with Console Capture
    function runPlayground() {
      const code = document.getElementById('playground-code').value;
      const consoleEl = document.getElementById('playground-console');
      consoleEl.innerHTML = '';

      // Intercept console.log
      const logs = [];
      const originalLog = console.log;

      console.log = function(...args) {
        const formatted = args.map(arg => {
          if (typeof arg === 'object') {
            try { return JSON.stringify(arg); } catch(e) { return String(arg); }
          }
          return String(arg);
        }).join(' ');
        
        logs.push(formatted);
        originalLog.apply(console, args);
      };

      try {
        // Execute Code
        const runFn = new Function(code);
        runFn();

        if (logs.length === 0) {
          consoleEl.innerHTML = '<div class="text-slate-500 italic">// Código executado sem saída de console.</div>';
        } else {
          logs.forEach(log => {
            const div = document.createElement('div');
            div.className = 'py-0.5 border-b border-slate-900/50 text-emerald-400';
            div.innerText = '❯ ' + log;
            consoleEl.appendChild(div);
          });
        }
      } catch (err) {
        const div = document.createElement('div');
        div.className = 'text-red-400 bg-red-950/30 p-2 rounded border border-red-900/50 mt-1';
        div.innerText = '❌ Erro de Execução: ' + err.message;
        consoleEl.appendChild(div);
      } finally {
        console.log = originalLog;
      }
    }
