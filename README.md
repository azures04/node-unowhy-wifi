
# (node) Unowhy WiFi
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Un port un peu plus poussé de https://github.com/STY1001/Unowhy-Tools-Wifi sous nodejs.
## Référence API

#### Fonctions

| Nom | Paramètre(s)     | Description                |
| :-------- | :------- | :------------------------- |
| `getWiFiInfoBySerialNumber` | `Serial Number <string>` | Cette fonction permet de récupéré à partir du numéro de série de votre ordinateur Y13 Unowhy fourni par la région Île-de-France  |
| `getWifiInfoByPos` | `Lat <int>, lon <int>` | Cette fonction permet de récupéré à partir d'une position GPS l'UAI d'un/plusieurs établissement(s) et ainsi par la suite de récupéré(s) les informations liées au réseau de ceux-cu  |
| `getWiFiInfoByUAI` | `UAI <string>` | Cette fonction permet de récupéré à partir de l'UAI de son établissement les informations liées au réseau de celui-ci  |


## Exemples
### getWifiInfoByPos
```js
const UnowhyWifi = require("node-unowhy-wifi")

async function main() {
    const WifiData = await UnowhyWifi.getWiFiInfoBySerialNumber("IFP000000000")
    console.log(WifiData)
}

main()
```
Réponse (JSON)
```json
[
    {
        "ssid": "Eleves",
        "password": "ml$@0755057P",
        "hidden": false,
        "securityType": "WPA/WPA2 PSK"
    },
    {
        "ssid": "Professeurs",
        "password": "ml$@0755057P",
        "hidden": false,
        "securityType": "WPA/WPA2 PSK"
    },
    {
        "ssid": "Tablettes",
        "password": "ml$@0755057P",
        "hidden": false,
        "securityType": "WPA/WPA2 PSK"
    },
    {
        "ssid": "Eleves",
        "password": "ml$@0755057P",
        "hidden": false,
        "securityType": "WPA/WPA2 PSK"
    }
]
```
### getWifiInfoByPos
```js
const UnowhyWifi = require("node-unowhy-wifi")

async function main() {
    const WifiData = await UnowhyWifi.getWifiInfoByPos(48.869536, 2.337475)
    console.log(WifiData)
}

main()
```
Réponse (JSON)
```json
[
    {
        "ssid": "Eleves",
        "password": "ml$@0755057P",
        "securityType": "WPA/WPA2 PSK",
        "hidden": false,
        "default_proxy": {
            "host": "10.0.0.1",
            "port": 3128
        }
    },
    {
        "ssid": "Professeurs",
        "password": "&*%@0755057P",
        "securityType": "WPA/WPA2 PSK",
        "hidden": false,
        "default_proxy": {
            "host": "10.0.0.1",
            "port": 3128
        }
    },
    {
        "ssid": "Tablettes",
        "password": "$#@0755057P",
        "securityType": "WPA/WPA2 PSK",
        "hidden": false,
        "default_proxy": {
            "host": "10.0.0.1",
            "port": 3128
        }
    },
    {
        "ssid": "Invites",
        "password": "a$&@0755057P",
        "securityType": "WPA/WPA2 PSK",
        "hidden": false,
        "default_proxy": {
            "host": "10.0.0.1",
            "port": 3128
        }
    },
    {
        "identifiant_de_l_etablissement": "0755057P",
        "nom_etablissement": "ITECOM ART and DESIGN - Paris",
        "code_postal": "75002",
        "nom_commune": "Paris  2e  Arrondissement",
        "position": {
            "lon": 2.337474995303744,
            "lat": 48.86953603766823
        },
        "type": "metadata"
    }
]
```
### getWifiInfoByPos
```js
const UnowhyWifi = require("node-unowhy-wifi")

async function main() {
    const WifiData = await UnowhyWifi.getWiFiInfoByUAI("")
    console.log(WifiData)
}

main()
```
Réponse (JSON)
```json
[
    {
        "ssid": "Eleves",
        "password": "ml$@0755057P",
        "securityType": "WPA/WPA2 PSK",
        "hidden": false,
        "default_proxy": {
            "host": "10.0.0.1",
            "port": 3128
        }
    },
    {
        "ssid": "Professeurs",
        "password": "&*%@0755057P",
        "securityType": "WPA/WPA2 PSK",
        "hidden": false,
        "default_proxy": {
            "host": "10.0.0.1",
            "port": 3128
        }
    },
    {
        "ssid": "Tablettes",
        "password": "$#@0755057P",
        "securityType": "WPA/WPA2 PSK",
        "hidden": false,
        "default_proxy": {
            "host": "10.0.0.1",
            "port": 3128
        }
    },
    {
        "ssid": "Invites",
        "password": "a$&@0755057P",
        "securityType": "WPA/WPA2 PSK",
        "hidden": false,
        "default_proxy": {
            "host": "10.0.0.1",
            "port": 3128
        }
    }
]
```

## Remerciments

 - [sTY1001/Unowhy-Tools-Wifi](https://github.com/sTY1001/Unowhy-Tools-Wifi/)
