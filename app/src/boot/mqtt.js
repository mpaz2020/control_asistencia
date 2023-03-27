// import * as mqtt from 'mqtt/dist/mqtt'

// const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL || 'ws://10.10.26.3:8083/mqtt')

// mqttClient.on('connect', error => {
//   if (error) {
//     console.error('Error al conectar a broker mqtt')
//   }
//   console.log('Conectado a broker mqtt')
//   mqttClient.subscribe('temperatura', function (err) {
//     if (err) {
//       console.log('Error de suscripcion a topico')
//     }
//     console.log('Suscrito a topico temperatura con exito')
//   })
// })

// export { mqttClient }
