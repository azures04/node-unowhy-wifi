const fetch = require("node-fetch")

const DEFAULTS_WIFI_PASSWORDS_MAPPING = [
    {
        ssid: "Eleves",
        password: "ml$@<UAI>",
        securityType: "WPA/WPA2 PSK",
        hidden: false,
        default_proxy: {
            host: "10.0.0.1",
            port: 3128
        }
    },
    {
        ssid: "Professeurs",
        password: "&*%@<UAI>",
        securityType: "WPA/WPA2 PSK",
        hidden: false,
        default_proxy: {
            host: "10.0.0.1",
            port: 3128
        }
    },
    {
        ssid: "Tablettes",
        password: "$#@<UAI>",
        securityType: "WPA/WPA2 PSK",
        hidden: false,
        default_proxy: {
            host: "10.0.0.1",
            port: 3128
        }
    },
    {
        ssid: "Invites",
        password: "a$&@<UAI>",
        securityType: "WPA/WPA2 PSK",
        hidden: false,
        default_proxy: {
            host: "10.0.0.1",
            port: 3128
        }
    },
]

async function getWiFiInfoBySerialNumber(serialNumber) {
    try {
        const response = await fetch(`https://idf.hisqool.com/conf/devices/${serialNumber}/configuration`)
        const dataList = await response.json()

        const urlList = dataList.map(data => data.url)

        let mergedJson = {}

        for (const url of urlList) {
            const jsonResponse = await fetch(url)
            const jsonData = await jsonResponse.json()
            mergedJson = { ...mergedJson, ...jsonData }
        }

        const filteredJson = Object.keys(mergedJson)
            .filter(key => key.startsWith("conf/network"))
            .reduce((obj, key) => {
                obj = mergedJson[key]
                return obj.options
            }, {})

        console.log(filteredJson)
        return genrateWifiByUAI(filteredJson)
    } catch (error) {
        console.error("Error fetching device config:", error)
        throw error
    }
}

function genrateWifiByUAI(network) {
    const networks = []
    for (let i = 0; i < DEFAULTS_WIFI_PASSWORDS_MAPPING.length; i++) {
        const _network = DEFAULTS_WIFI_PASSWORDS_MAPPING[i]
        if (DEFAULTS_WIFI_PASSWORDS_MAPPING.find(network_ => network_.ssid == network.ssid)) {
            const $network = {}
            $network.ssid = _network.ssid
            $network.password = network.password.replace(DEFAULTS_WIFI_PASSWORDS_MAPPING.find(network_ => network_.ssid = $network.ssid), _network.password)
            $network.proxy = _network.proxy
            $network.hidden = _network.hidden
            $network.securityType = _network.securityType
            networks.push($network)
        } else {
            networks.push(network)
            break
        }
    }
    return networks
}

async function getHighSchoolByPos(latitude, longitude) {
    const url = `https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?select=identifiant_de_l_etablissement%2C%20nom_etablissement%2C%20code_postal%2C%20nom_commune%2C%20position&where=within_distance(position%2C%20GEOM%27POINT(${longitude}%20${latitude})%27%2C%20100m)&limit=-1&refine=type_etablissement%3A%22Lyc%C3%A9e%22&refine=libelle_academie%3A%22Cr%C3%A9teil%22&refine=libelle_academie%3A%22Paris%22&refine=libelle_academie%3A%22Versailles%22&refine=libelle_region%3A%22Ile-de-France%22`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Error fetching nearby schools:", error)
        throw error
    }
}

async function getWifiInfoByPos(latitude, longitude) {
    const schoolsNetworks = []
    const schools = await getHighSchoolByPos(latitude, longitude)
    for (let i = 0; i < schools.length; i++) {
        const school = schools[i]
        const networks = getWiFiInfoByUAI(school.identifiant_de_l_etablissement)
        school.type = "metadata"
        networks.push(school)
        schoolsNetworks.push(networks) 
    }
    return schoolsNetworks
}

function getWiFiInfoByUAI(UAI) {
    return DEFAULTS_WIFI_PASSWORDS_MAPPING.map(network => ({
        ...network,
        password: network.password.replace("<UAI>", UAI)
    }))
}

module.exports.getWiFiInfoBySerialNumber = getWiFiInfoBySerialNumber
module.exports.getWifiInfoByPos = getWifiInfoByPos
module.exports.getWiFiInfoByUAI = getWiFiInfoByUAI