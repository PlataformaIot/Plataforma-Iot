//alert( JSON.stringify(devices.filter((dev) => dev.device === selectedDevice) ));

function verificaDispositivo()
{
    if(selectedDevice === ''){
        const id = (devices.length > 0 ? devices[0].device : "")
    }
    else{
        const id = (devices.filter((dev) => dev.device === selectedDevice)[0].device)
    }
    return id
}
//const id = selectedDevice === '' ? (devices.length > 0 ? devices[0].device : "") : devices.filter((dev) => dev.device === selectedDevice)[0].device