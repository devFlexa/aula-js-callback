#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

#define ENABLE_USER_AUTH
#define ENABLE_DATABASE

#include <FirebaseClient.h>

#include "secrets.h"

// URL da Realtime Database mostrada no console Firebase.
#define DATABASE_URL "https://temp-ee-humid-default-rtdb.firebaseio.com/"

// Ajuste este pino conforme a ligacao do modulo rele.
constexpr uint8_t PINO_RELE = 26;

// A maioria dos modulos de rele liga com nivel LOW.
// Se o seu modulo ligar com HIGH, altere para false.
constexpr bool RELE_ATIVO_EM_LOW = true;

constexpr char CAMINHO_RELE[] = "/dispositivos/esp32/rele";

WiFiClientSecure clienteFirebase;
WiFiClientSecure clienteStream;

AsyncClientClass clienteAutenticacao(clienteFirebase);
AsyncClientClass clienteRealtime(clienteStream);

UserAuth autenticacao(
    FIREBASE_API_KEY,
    FIREBASE_USER_EMAIL,
    FIREBASE_USER_PASSWORD,
    3000);

FirebaseApp app;
RealtimeDatabase bancoDados;

void atualizarRele(bool ligado) {
  const uint8_t nivelLigado = RELE_ATIVO_EM_LOW ? LOW : HIGH;
  const uint8_t nivelDesligado = RELE_ATIVO_EM_LOW ? HIGH : LOW;

  digitalWrite(PINO_RELE, ligado ? nivelLigado : nivelDesligado);

  Serial.print("Rele ");
  Serial.println(ligado ? "LIGADO" : "DESLIGADO");
}

void receberAtualizacaoFirebase(AsyncResult &resultado) {
  if (resultado.isError()) {
    Serial.print("Erro no Firebase: ");
    Serial.println(resultado.error().message());
    return;
  }

  if (!resultado.available()) {
    return;
  }

  RealtimeDatabaseResult &evento = resultado.to<RealtimeDatabaseResult>();
  if (!evento.isStream()) {
    return;
  }

  // O valor no Firebase deve ser um boolean JSON: true ou false.
  String valorRecebido = evento.to<String>();
  valorRecebido.trim();

  Serial.print("Evento: ");
  Serial.print(evento.event());
  Serial.print(" | caminho: ");
  Serial.print(evento.dataPath());
  Serial.print(" | valor: ");
  Serial.println(valorRecebido);

  if (valorRecebido == "true") {
    atualizarRele(true);
  } else if (valorRecebido == "false") {
    atualizarRele(false);
  } else {
    Serial.println("Valor ignorado: esperado boolean true ou false.");
  }
}

void conectarAoWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print('.');
  }

  Serial.println();
  Serial.print("Wi-Fi conectado. IP: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);

  // Deixa o rele desligado antes de iniciar a rede.
  pinMode(PINO_RELE, OUTPUT);
  atualizarRele(false);

  conectarAoWiFi();

  // Para uma primeira demonstracao. Em um produto, configure a validacao
  // do certificado TLS em vez de aceitar qualquer certificado.
  clienteFirebase.setInsecure();
  clienteStream.setInsecure();

  Serial.println("Iniciando autenticacao no Firebase...");
  initializeApp(clienteAutenticacao, app, getAuth(autenticacao));

  app.getApp<RealtimeDatabase>(bancoDados);
  bancoDados.url(DATABASE_URL);

  // Abre um stream apenas no valor do rele, sem baixar o resto do banco.
  clienteRealtime.setSSEFilters("get,put,patch,cancel,auth_revoked");
  bancoDados.get(
      clienteRealtime,
      CAMINHO_RELE,
      receberAtualizacaoFirebase,
      true,
      "ouvirRele");

  Serial.println("Ouvindo dispositivos/esp32/rele...");
}

void loop() {
  // Mantem a autenticacao e a conexao SSE ativas.
  app.loop();
}
