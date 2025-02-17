---
sidebar_label: Asymm. Verschlüsselung
sidebar_custom_props:
  id: 28e4cf06-7190-450d-babd-a461e62efdf8
  source:
    name: rothe.io
    ref: https://rothe.io/?b=crypto&p=952331
---

# Asymmetrische Verschlüsselung

Das Prinzip der asymmetrischen Verschlüsselung beruht also auf zwei verschiedenen Schlüsseln, dem sogenannten **Schlüsselpaar** (engl. key pair). Die beiden Schlüssel eines Schlüsselpaars nennt man **öffentlichen** und **privaten** Schlüssel (engl. public und private key).

Da für den Verschlüsselungsvorgang nicht derselbe Schlüssel verwendet wird wie für den Entschlüsselungsvorgang, spricht man von einem **asymmetrischen Verfahren**.

:::flex{min-width=200px}
![Asymmetrische Ver- und Entschlüsselung mit verschiedenen Schlüsseln](images/asymmetric-cryptosystem.svg)
::br{text-align=center}
![Generierung des Schlüsselpaares für die asymmetrische Verschlüsselung](images/key-pair-generation.svg)
:::

## Schlüsselpaar
Jede Person besitzt ein eigenes Schlüsselpaar, so auch Bob. Die beiden Schlüssel, die dieses Schlüsselpaar bilden, sind mathematisch verwandt. Der private Schlüssel lässt sich jedoch nicht in sinnvoller Zeit aus dem öffentlichen Schlüssel  berechnen.

Bobs öffentlicher Schlüssel entspricht also dem Bügelschloss aus unserem ersten Beispiel. Bobs privater Schlüssel ist der Schlüssel, der zum Bügelschloss passt. Das Schloss kann (in geöffneter Form natürlich) bei einer vertrauenswürdigen Stelle (Trent) deponiert werden, wo es von Alice abgeholt werden kann. Den Schlüssel behält Bob stets für sich.

![Jede Person besitzt ein Schlüsselpaar](images/key-pair.svg)

## Verschlüsselung
In der folgenden Abbildung sieht man auf der linken Seite, dass Alice bei der Verschlüsselung den öffentlichen Schlüssel von Bob (und nicht den eigenen) verwendet. Dieser öffentliche Schlüssel enthält keine geheime Information und ist für alle Leute zugänglich (z.B. via eine vertrauenswürdige Stelle), somit können alle eine Nachricht für Bob verschlüsseln.

![Asymmetrische Verschlüsselung](images/asymm-encryption.svg)

## Entschlüsselung
In derselben Abbildung ist zu sehen, dass Bob bei der Entschlüsselung seinen privaten Schlüssel verwenden muss. Somit ist sichergestellt, dass nur Bob die Nachricht entschlüsseln kann.

:::warning[Achtung]
Um Verwechslungen zu vermeiden, spricht man bei der symmetrischen Verschlüsselung vom geheimen Schlüssel (engl. secret key), während man bei asymmetrischen Verfahren vom privaten Schlüssel spricht und nicht vom geheimen Schlüssel, weil jede involvierte Person ein eigenes Schlüsselpaar und somit einen eigenen privaten Schlüssel besitzt.
:::

:::aufgabe[Asymmetrische Verschlüsselung]
<Answer type="state" webKey="fa701245-c7aa-412e-8f0d-25e68714a674" />

1. Überlegen Sie sich, wie die Verschlüsselung funktioniert, wenn ein Dokument an verschiedene Leute versendet wird. Machen Sie sich dazu eine Skizze.
2. Welche Nachteile erkennen Sie?

<Answer type="text" webKey="6f969d09-5b80-4553-8c21-3bbc70b53f52" />

<Solution webKey="eb555af1-a9d0-4165-8dcc-abf879e84a88">

![Asymmetrische Verschlüsselung für zwei Personen](images/asymm-encryption-for-two.svg)

**Nachteile**
- Das Dokument muss separat für zwei Personen verschlüsselt werden.
- Jeder Person muss eine andere Nachricht geschickt werden.

</Solution>

:::