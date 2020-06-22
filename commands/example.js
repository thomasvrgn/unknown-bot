/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                Commands
//////////////////////////////////////*/

export default {

    name        : 'example',
    description : 'Example command',
    category    : 'example',

    run         : class {

        constructor (client, args, message) {
            
            this.arguments = args
            this.client    = client
            this.message   = message

        }

        command () {

            this.message.reply('Command fired!')

        }

    }

}