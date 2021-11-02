let idx = 0

function filterProximo(item) {
    let now = new Date()
    let diff = new Date(item.data) - now

    if (diff > 0 && idx <= 0) {
        idx++
        return item
    }
}

const carregaJson = async () => {
    const url = 'https://gist.githubusercontent.com/sistematico/0d795e73e133632204593f1d1db4a618/raw/c9e3db43cd1e1743e36f22cea1eb25a4bb8fc5e1/feriados.json'
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const transformaJson = (json) => {
    let tmp = []
    for (let j in json) {
        tmp.push({ data: j, nome: json[j] })
    }
    return tmp
}

const transformaData = (data) => {
    let novaData = data.map(function(item){
        let parts = item.data.split('-')
        let data = `${parts[0]}, ${parts[1]}, ${parts[2]}`
        return { data: data, nome: item.nome }
    })
    
    return novaData
}

function proximoFeriado(arr) {
    let proximo = arr.filter(filterProximo)
    return proximo
}

function formatDate(dateStr, locale) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateStr);
    const newDate = date.toLocaleDateString(locale, options)
    return capitalizeFirstLetter(newDate)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { 
    carregaJson,
    transformaJson,
    transformaData,
    proximoFeriado,
    formatDate,
}