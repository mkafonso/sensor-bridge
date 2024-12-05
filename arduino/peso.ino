#include <HX711.h>

const int PINO_DT = 3;
const int PINO_SCK = 2;

const int TEMPO_ESPERA = 500;

HX711 escala;

float fator_calibracao = -43189;

char comando;

void setup ()
{
  Serial.begin(9600);

  escala.begin (PINO_DT, PINO_SCK);

  escala.tare();
}

void loop ()
{
  escala.set_scale(fator_calibracao);

  if (escala.is_ready())
  {
    Serial.println(escala.get_units() * 100, 1);

    if(Serial.available())
      {
        comando = Serial.read();
        switch (comando)
        {
          case 'x':
          fator_calibracao = fator_calibracao - 100;
          break;
          case 'c':
          fator_calibracao = fator_calibracao + 100;
          break;
          case 'v':
          fator_calibracao = fator_calibracao - 10;
          break;
          case 'b':
          fator_calibracao = fator_calibracao + 10;
          break;
          case 'n':
          fator_calibracao = fator_calibracao - 1;
          break;
          case 'm':
          fator_calibracao = fator_calibracao + 1;
          break;
        }
      }
    }
  delay(TEMPO_ESPERA);
}
