/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                 Events
//////////////////////////////////////*/

import Config from '../config'

export default {
    name : 'ready',

    run  : class {

        constructor () {}

        async event (client) {

            setInterval(() => {
                Config.status = Config.status.split('%%%prefix%%%').join(Config.prefix)
                client.user.setPresence({
                    status: 'online',
                    game  : {
                        name : Config.status,
                        type : 'STREAMING',
                        url: "https://www.twitch.tv/blp"
                    }
                })
            }, 5000)

        }

    }

}