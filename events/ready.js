/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                 Events
//////////////////////////////////////*/

import Config from '../config'

let cooldown = Date.now()

export default {
    name : 'ready',

    run  : class {

        constructor () {}

        async event (client) {

            client.user.setPresence({
                status: 'online',
                game  : {
                    name : 'BLP | b!help',
                    type : 'STREAMING',
                    url: "https://www.twitch.tv/blp"
                }
            })

        }

    }

}