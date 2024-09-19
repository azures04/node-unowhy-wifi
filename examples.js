const path = require("path")
const UnowhyWifi = require("./lib/main")
const fs = require("fs")

async function main() {
    const WifiData = await UnowhyWifi.getWiFiInfoByUAI("0755057P")
    fs.writeFileSync(path.join(__dirname, "result.json"), JSON.stringify(WifiData, null, 4))
}

main()