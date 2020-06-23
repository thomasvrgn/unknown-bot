/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                Commands
//////////////////////////////////////*/

import Discord from 'discord.js'
import Config  from '../config'
import OS      from 'os'

export default {

    name        : ['help'],
    description : 'Show all commands and their usage.',
    category    : 'general',

    run         : class {

        constructor (client, args, message) {
            
            this.arguments = args
            this.client    = client
            this.message   = message

        }

        command () {
            
            const help  = {},
                  embed = new Discord.RichEmbed()

            embed.setAuthor(`Requested by ${this.message.author.username}#${this.message.author.discriminator}`, this.message.author.avatarURL)
            embed.setFooter(`By ${this.client.user.username} and Ness#9999`, this.client.user.displayAvatarURL)

            for (const command of this.client.commands) {
                const cmd      = command[0],
                      misc     = command[1],
                      category = misc.category,
                      desc     = misc.desc

                if (!help[category]) help[category] = []

                help[category].push({
                    command : cmd,
                    desc    : desc 
                })
            }

            for (const category in help) {
                embed.addField(`${category.slice(0, 1).toUpperCase() + category.slice(1)} (${help[category].length} commands)`, '• ' + help[category].map(x => x.command.map(x => '`' + Config.prefix + x + '`').join(' ')).join('\n• '))
            }

            embed.addField('Global informations:', `• Prefix: **${Config.prefix}**\n• Developer: Ness#9999\n• Memory usage : ${(process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(3)} GB\n• Total memory: ${Math.floor(OS.totalmem() / 1000000000) - 1} GB\n• Free memory: ${Math.round(OS.freemem() / 1000000000)} GB\n• Node.js version: ${process.version}\n• Discord.js version: v${Discord.version}`)

            this.message.channel.send(embed)


        }

    }

}