// Quiz Evaluator
    function evaluateQuiz() {
      let score = 0;
      const answers = {
        q1: 'b', q2: 'b', q3: 'a', q4: 'b', q5: 'b',
        q6: 'b', q7: 'b', q8: 'a', q9: 'b', q10: 'a',
        q11: 'b', q12: 'b', q13: 'b', q14: 'b', q15: 'a',
        q16: 'a', q17: 'b', q18: 'a', q19: 'a', q20: 'b'
      };

      for (let i = 1; i <= 20; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`)?.value;
        if (selected === answers[`q${i}`]) {
          score++;
        }
      }

      const resDiv = document.getElementById('quiz-result');
      const scoreBadge = document.getElementById('quiz-score-badge');
      const msg = document.getElementById('quiz-message');

      resDiv.classList.remove('hidden');
      scoreBadge.innerText = `${score} / 20`;

      if (score === 20) {
        msg.innerText = "🏆 Perfeito! Gabaritou 100%! Você dominou completamente as Funções Callback em JavaScript!";
      } else if (score >= 15) {
        msg.innerText = "🎉 Excelente desempenho! Você tem um ótimo entendimento sobre callbacks e métodos de array!";
      } else if (score >= 10) {
        msg.innerText = "👍 Bom trabalho! Você acertou mais da metade. Dê uma revisada nos tópicos onde teve dúvidas.";
      } else {
        msg.innerText = "📚 Continue praticando! Revise as seções de Teoria, Fluxo Visual e Exemplos Práticos para reforçar os conceitos.";
      }
    }

    function resetQuiz() {
      document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
      document.getElementById('quiz-result').classList.add('hidden');
    }
