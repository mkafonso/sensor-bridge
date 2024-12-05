#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 2
#define PIR_PIN 7

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensor(&oneWire);

void setup() {
  Serial.begin(9600);
  sensor.begin();

  pinMode(PIR_PIN, INPUT);
}

void loop() {
  sensor.requestTemperatures();

  float temperatura = sensor.getTempCByIndex(0);
  bool presenca = digitalRead(PIR_PIN);

  Serial.print(temperatura);
  Serial.print(",");
  Serial.println(presenca ? "true" : "false");

  delay(1);
}
