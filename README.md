# Desvendando Callbacks

Uma aula interativa, em português, para aprender funções callback em JavaScript. O projeto reúne explicações, uma simulação visual, um playground de código, exercícios e um quiz.

## Como abrir

Abra `index.html` em um navegador atualizado. No GitHub Pages, esse arquivo é carregado automaticamente como página inicial. A página carrega o Tailwind CSS e as fontes do Google Fonts pela internet; sem conexão, o conteúdo continua disponível, mas parte da aparência pode mudar.

## Organização dos arquivos

- `index.html`: conteúdo e estrutura da página inicial.
- `styles.css`: estilos personalizados da aula.
- `navigation.js`: troca entre as seções e atualização do progresso.
- `simulation.js`: etapas da simulação de callbacks.
- `playground.js`: exemplos prontos e execução de código no playground.
- `exercises.js`: execução e avaliação dos exercícios.
- `quiz.js`: avaliação e reinício do quiz.
- `app.js`: inicialização da página.

Os arquivos JavaScript são carregados no final do HTML, na ordem necessária para a página funcionar.

## Tecnologias

- HTML
- CSS
- JavaScript no navegador
- Tailwind CSS via CDN

## Firmware ESP32 (PlatformIO)

O firmware fica em `src/main.cpp` e escuta o valor booleano em `/dispositivos/esp32/rele` usando o stream do Firebase Realtime Database.

1. Abra o projeto no VS Code com a extensao PlatformIO instalada.
2. Copie `include/secrets.example.h` para `include/secrets.h` e preencha Wi-Fi, chave Web do Firebase e uma conta de e-mail/senha criada em Firebase Authentication.
3. Confirme que o Firebase Realtime Database usa as regras de acesso autenticado adequadas ao seu projeto.
4. Ajuste `PINO_RELE` em `src/main.cpp` para o pino conectado ao modulo. O exemplo assume rele ativo em LOW; altere `RELE_ATIVO_EM_LOW` se o modulo funcionar ao contrario.
5. Compile e envie pelo PlatformIO. Abra o monitor serial em 115200 baud para acompanhar conexao e eventos.

O programa inicia com o rele desligado. Quando o Firebase enviar `true`, liga; quando enviar `false`, desliga. O stream tambem recebe o valor atual ao conectar.

> Seguranca: `secrets.h` esta ignorado pelo Git. Nao publique suas credenciais. O exemplo usa `setInsecure()` para simplificar a demonstracao TLS; para um dispositivo em uso real, valide o certificado do servidor.

## Para quem está aprendendo

Os arquivos estão separados por responsabilidade para facilitar a leitura e a exploração. Uma boa forma de começar é localizar no HTML um botão ou seção e, em seguida, procurar a função correspondente no arquivo JavaScript indicado acima.
