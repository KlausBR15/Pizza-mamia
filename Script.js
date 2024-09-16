

const footer = document.getElementById('transfer')
const telaescondida = document.getElementById('tela')
const telafechar = document.getElementById('fechar')
const geral = document.getElementById('menu')
const conetudolista = document.getElementById('conteudo')
const preçodocarrinho = document.getElementById('preço')
const contador = document.getElementById('contador')
const adress = document.getElementById('endereço')
const finalizar = document.getElementById('entregar')
const corrigir = document.getElementById('corretor')
const icon = document.getElementById('icone')
const warn = document.getElementById('aviso')




var list = [];

icon.addEventListener('click', function() {

    if (warn.style.display == 'block') {
        warn.style.display = 'none'
    }
    else {
        warn.style.display = 'block'
    }
})


// abrir o modal
footer.addEventListener('click', function() {

    telaescondida.style.display = 'flex'
})


// fechar o modal 
telaescondida.addEventListener('click', function(event) {
    if (event.target === telaescondida || event.target === telafechar) {

        telaescondida.style.display = 'none'

    }
})


geral.addEventListener('click', function(event) {

    let carro = event.target.closest(".carrinho")

    if (carro) {

    const name = carro.getAttribute('data-name')
    const price = parseFloat(carro.getAttribute('data-price'))

    addnocarro(name, price)

    }
})


// adicionar no carrinho


function addnocarro(name, price) {
    const existente = list.find(item => item.name === name)

    if (existente) {
        existente.quantitade += 1
    }

    else {
        list.push({
            name,
            price,
            quantitade: 1,
        })
    }

    forclient()

}



// mostrando pro cliente 


function forclient() {
    conetudolista.innerHTML = ""
    let total = 0

    list.forEach(item =>{
        const newelement = document.createElement('div')

        newelement.innerHTML = `
        <div class="itens">

            <div>
                <p>
                    ${item.name}
                </p>
                <p>
                    Qtd: ${item.quantitade}
                </p>
                <p>
                    R$ ${item.price.toFixed(2)}
                </p>
            </div>


            <div>
                <button class="finalbotao" data-name = "${item.name}">
                    Remover
                </button>
            </div>

        </div>
        
        `

        total += item.price * item.quantitade
        
        conetudolista.appendChild(newelement)


    })

    preçodocarrinho.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    contador.innerHTML = list.length
    conetudolista.style.border = '2px solid black'
    conetudolista.style.padding = '10px'

}

/* remover do carrinho */

conetudolista.addEventListener('click', function(event) {

    if (event.target.classList.contains("finalbotao")) {
        const name = event.target.getAttribute("data-name")

        removeritens(name)
    }


})

function removeritens(name) {
    const idex = list.findIndex(item => item.name === name)

    if(idex != -1) {
        const item = list[idex]
        
        if(item.quantitade > 1) {
            item.quantitade -= 1

            forclient()
            return
        }

    
        list.splice(idex, 1)
        forclient();
    }
}


/* puxar local */
adress.addEventListener('input', function(event) {
    let valor = event.target.value

    if (valor != "") {
        adress.style.borderColor = 'black'
        corrigir.style.display = 'none'
    }
})


const horas = new Date().getHours()


finalizar.addEventListener('click', function() {

    
    if (list.length === 0) return;
    
    if (adress.value === "") {
        
        corrigir.style.display = 'flex'
        corrigir.style.fontWeight = 'normal'
        adress.style.borderColor = 'red'
        return
        
    }  

    // if (horas < 18 || horas > 22) {
    //    window.alert('RESTAURANTE FECHADO, RETORNE  NO HORÁRIO')
    //    return
    // }



    const listaitens = list.map((item) => {
        return (
        `${item.name} Quantidade: (${item.quantitade}) Preço: R$${item.price}  || `
        ) 
        

    }).join("")
    
    const mensage = encodeURIComponent(listaitens)
    const phone = "63992686730"

    window.open(`https://wa.me/${phone}?text=${mensage} Endereço: ${adress.value}`, "_blank")

    list = []
    forclient()

    
})    




