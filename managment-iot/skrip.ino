#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>
#include <AES.h>
#include <printf.h>

AES aes;

PN532_I2C pn532_i2c(Wire);
NfcAdapter nfc = NfcAdapter(pn532_i2c);

void setup() {
  Serial.begin(9600);
  Serial.println("NDEF Skript");
  nfc.begin();
}

void loop(){
  String payloadAsString="";
  if(nfc.tagPresent()){
    Serial.println("\nSmart Phone is reading");
    NdefMessage message= NdefMessage();
    //Write Public Key to the Card
    //TODO Generate Public Key in the Secure Element
    int keys = 0x187b58eafa49662399c9bc38612a08517114ea49;
    String key="";
    key = "Public Key";
    message.addTextRecord(key);
    boolean success = nfc.write(message);
    if(success){
      Serial.println("\nPublic Key has been sent");
      delay(3000);
     boolean isNotPresent = true;
    
     while(isNotPresent){
      if(nfc.tagPresent()){
        isNotPresent = false;
        Serial.println("\nScan Random Message");
        //Read Random Message from the Card
        NfcTag tag=nfc.read();

        if(tag.hasNdefMessage()){
          NdefMessage message = tag.getNdefMessage();
          int recordCount = message.getRecordCount();
    
          for(int i=0;i<recordCount;i++){
            NdefRecord record = message.getRecord(i);
        
            int payloadLength=record.getPayloadLength();
            byte payload[payloadLength];
            record.getPayload(payload);
            for(int c=0;c<payloadLength;c++){
              payloadAsString += (char)payload[c];

            }
        }
      } 
    
      NdefMessage message= NdefMessage();
      //Write signed Random Message to the Card
      String signedMessage = "";
      signedMessage = "signed:thankmelater!";
      message.addTextRecord(signedMessage);
      boolean success=nfc.write(message);
      if(success){
        Serial.println("\nSent signed Random Message");
        }else{
          Serial.println("Write failed signed Message");
        }
      }
     }
      delay(3000);

      }else{
        Serial.println("Write failed Public Key");
      }
    }
    delay(3000);
  }

        