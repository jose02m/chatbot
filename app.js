const { createBot, createProvider, createFlow, addKeyword, receiveMessageMiddleware } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const menuOptions = require('./data/menuOptions');
const pedidosMiddleware = require('./middlewares/pedidos.middleware') 

let currentOrder = null;

const flowPedido = addKeyword(['1']).addAnswer([
    '🌮🍔 ¡Genial! Estoy aquí para tomar tu pedido.\n',
    'Nuestro *menú* es el siguiente:\n',
    menuOptions.map((item) => `${item.option} - $${item.price}`).join('\n'),
    '\nPor favor, responde con el número de la opción que deseas y la cantidad.'
]);

const flowEstadoPedido = addKeyword(['2']).addAnswer((ctx) => {
    if (currentOrder) {
        const orderDetails = currentOrder.items.map(item => `${item.option} - $${item.price}`)
    }
})

const flowPrincipal = addKeyword(['Hola', 'ola', 'ole'])
    .addAnswer('🙌 ¡Hola! Bienvenido. Soy el bot del restaurante.')
    .addAnswer([
        'Puedes hacer lo siguiente:',
        '*1.* Realizar un nurvo pedido.',
        '*2.* Ver el estado de mi pedido.',
    ],
        null,
        null,
        [flowPedido]
    );


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    const bot = createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    bot.

    QRPortalWeb()
}

main()
