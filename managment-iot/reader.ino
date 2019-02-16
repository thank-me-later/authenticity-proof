#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>

PN532_I2C pn532_i2c(Wire);
NfcAdapter nfc = NfcAdapter(pn532_i2c);

void setup() {
  Serial.begin(9600);
  Serial.println("NDEF Reader");
  nfc.begin();
}

void loop(){
Serial.println("\nScan a NFC tag\n");
if(nfc.tagPresent())
{
NfcTag tag=nfc.read();
Serial.println(tag.getTagType());

Serial.print("UID: ");
Serial.println(tag.getUidString());
if(tag.hasNdefMessage()){
    NdefMessage message = tag.getNdefMessage();
    Serial.print("\nThis NFC Tag contains an NDEF Message with ");
    Serial.print(message.getRecordCount());
    Serial.print(" NDEF Record");
    if(message.getRecordCount()!=1){
        Serial.print("s");
        }
        int recordCount = message.getRecordCount();
        
        for(int i=0;i<recordCount;i++)
        {Serial.print("\nNDEF Record ");
        Serial.println(i+1);
        NdefRecord record = message.getRecord(i);
        Serial.print("  TNF: ");
        Serial.println(record.getTnf());
        Serial.print("  Type: ");
        Serial.println(record.getType());
        
        int payloadLength=record.getPayloadLength();
        byte payload[payloadLength];
        record.getPayload(payload);
        String payloadAsString="";
        for(int c=0;c<payloadLength;c++)
        {
          payloadAsString += (char)payload[c];
        }
        Serial.print("  Payload (as String): ");
        Serial.println(payloadAsString);
       String uid = record.getId();
       
       if(uid != "")
       {Serial.print("  ID: ");
       Serial.println(uid);
            }
          }
        }
      }
      delay(3000);
    }
