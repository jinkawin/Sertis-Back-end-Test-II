var cron = require('node-cron')
const config = require('@config/cronjob'),
      ConverterController = require('../Controller/ConverterController')

ConverterController.convert()
// cron.schedule(config.interval, function(){
//     ConverterController.convert()
// })

module.exports = function(router){
}