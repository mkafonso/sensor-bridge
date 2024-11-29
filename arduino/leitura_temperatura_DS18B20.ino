#include <OneWire.h>
#include <DallasTemperature.h>

/**
 * Definir o pino de comunicação com o sensor
 *
 * O sensor Dallas DS18B20 se comunica utilizando o protocolo OneWire.
 * O pino 2 do Arduino será utilizado para esse barramento.
 */
#define ONE_WIRE_BUS 2

/**
 * Inicializar o barramento OneWire e o sensor Dallas Temperature
 *
 * O objeto 'oneWire' será responsável pela comunicação com o sensor,
 * e o objeto 'sensor' irá controlar o sensor de temperatura DS18B20.
 */
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensor(&oneWire);

void setup() {
  // Iniciar a comunicação serial para monitoramento
  Serial.begin(9600);

  // Inicializar o sensor Dallas DS18B20
  sensor.begin();
}

void loop() {
  sensor.requestTemperatures();

  /**
   * Obter a temperatura em Celsius
   * O sensor retornará a temperatura em graus Celsius no primeiro sensor conectado.
   * O índice 0 se refere ao primeiro sensor da rede OneWire.
   */
  float temperatura = sensor.getTempCByIndex(0);

  Serial.print("Temperatura: ");
  Serial.print(temperatura);

  delay(1500);
}

/**
 * Como montar o circuito:
 *
 * 1. Conecte o pino VCC do sensor DS18B20 ao pino 5V do Arduino.
 * 2. Conecte o pino GND do sensor DS18B20 ao pino GND do Arduino.
 * 3. Conecte o pino de dados (DQ) do sensor DS18B20 ao pino 2 do Arduino (pino definido no código).
 * 4. Adicione um resistor de pull-up de 4.7kΩ entre o pino DQ (pino de dados) e o VCC (5V).
 *
 * Esse circuito permite que o sensor DS18B20 se comunique corretamente com o Arduino
 * utilizando o protocolo OneWire.
 *
 * Certifique-se de que o sensor DS18B20 está bem conectado para garantir leituras
 * precisas da temperatura.
 */
