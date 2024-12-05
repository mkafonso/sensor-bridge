#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

/**
 * Definir os pinos de comunicação para o módulo Bluetooth
 *
 * O pino 1 será usado como transmissão (TX) e o pino 0 como recepção (RX)
 * para comunicação via Bluetooth utilizando o protocolo serial.
 */
#define TX_PIN 1
#define RX_PIN 0
SoftwareSerial bluetooth(TX_PIN, RX_PIN);

/**
 * Variáveis para contagem e análise de frequências
 *
 * A variável 'analyzer' é utilizada para contar os eventos de interrupção,
 * enquanto 'comb1' armazena o valor calculado da porcentagem.
 */
int analyzer = 0;
int comb1 = 0;

/**
 * Variáveis para controlar o erro e última porcentagem
 *
 * 'lastComb1' armazena a última porcentagem de comb1 para comparação,
 * e 'lastError' controla o estado do erro, que é ativado se comb1 exceder 100.
 */
int lastComb1 = -1;
bool lastError = false;

/**
 * Função de interrupção para contar os eventos de frequência
 *
 * Sempre que um evento de interrupção ocorre, a variável 'analyzer' é incrementada.
 * Este contador será usado para calcular a porcentagem de frequência.
 */
void analy() {
  analyzer++;
}

void setup() {
  // Iniciar a comunicação serial para o monitoramento
  Serial.begin(9600);

  // Inicializar a comunicação Bluetooth com a taxa de 9600 bps
  bluetooth.begin(9600);

  delay(2000);  // Aguardar 2 segundos para garantir a inicialização do Bluetooth

  // Configurar a interrupção para o pino 2 com o modo de borda de descida (FALLING)
  attachInterrupt(digitalPinToInterrupt(2), analy, FALLING);

  noInterrupts();  // Desabilitar interrupções para configurar o temporizador
  TCCR1A = 0;      // Configuração do Timer1
  TCCR1B = 0;
  TCNT1  = 0;      // Resetar o contador do Timer1

  OCR1A = 31250;   // Configurar o valor para interrupção a cada 1 segundo (baseado no prescaler)
  TCCR1B |= (1 << WGM12);  // Configurar o Timer1 em modo CTC (Clear Timer on Compare Match)
  TCCR1B |= (1 << CS12);   // Definir prescaler para 256
  TIMSK1 |= (1 << OCIE1A); // Habilitar interrupção por comparação no Timer1
  interrupts();  // Habilitar interrupções após configuração
}

/**
 * Interrupção do Timer1 que calcula a porcentagem de frequência
 *
 * A cada interrupção do Timer1, o valor de 'comb1' é atualizado com base
 * no contador 'analyzer', e o contador é resetado para começar uma nova contagem.
 */
ISR(TIMER1_COMPA_vect) {
  comb1 = analyzer * 2 - 50;  // Calcular o valor da porcentagem com base no contador
  analyzer = 0;  // Resetar o contador para o próximo ciclo
}

void loop() {
  /**
   * Verificar se o valor de comb1 mudou desde a última vez que foi verificado
   *
   * Se o valor mudou, o programa imprime o novo valor na tela serial.
   */
  if (comb1 != lastComb1) {
    if (comb1 > 2) {
      if (comb1 < 10) {
        Serial.println("  " + String(comb1) + "%  ");
      } else if (comb1 < 100) {
        Serial.println(" " + String(comb1) + "%  ");
      } else {
        Serial.println(String(comb1) + "% ");
      }
    } else {
      Serial.println("0");
    }

    lastComb1 = comb1;  // Armazenar o valor de comb1 para a próxima comparação
  }

  // Enviar o valor de comb1 para o módulo Bluetooth
  bluetooth.println(comb1);

  /**
   * Verificar se houve um erro no valor de comb1
   *
   * Se o valor de comb1 for maior que 100, um erro será reportado.
   * O erro é enviado como "-127" na tela serial e Bluetooth.
   */
  bool error = (comb1 > 100);
  if (error != lastError) {
    if (error) {
      Serial.println("-127");  // Enviar erro se comb1 for maior que 100
    }
    lastError = error;  // Atualizar o estado do erro
  }
}

/**
 * Como montar o circuito:
 *
 * 1. Conecte o pino VCC do módulo Bluetooth ao pino 5V do Arduino.
 * 2. Conecte o pino GND do módulo Bluetooth ao pino GND do Arduino.
 * 3. Conecte o pino RX do módulo Bluetooth ao pino 0 do Arduino (RX_PIN).
 * 4. Conecte o pino TX do módulo Bluetooth ao pino 1 do Arduino (TX_PIN).
 * 5. Conecte o pino de interrupção (pino 2) a um sinal que alterne para detectar eventos.
 *
 * Esse circuito permite que o Arduino se comunique com um dispositivo Bluetooth e
 * meça frequências ou eventos, enviando dados continuamente via Bluetooth.
 *
 * Certifique-se de que o módulo Bluetooth está bem configurado para a comunicação
 * adequada a 9600 bps.
 */
