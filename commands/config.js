/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                Commands
//////////////////////////////////////*/

import Discord from 'discord.js'
import Config  from '../config'

export default {

    name        : ['config'],
    description : 'Ability to configure bot options.',
    category    : 'general',

    run         : class {

        constructor (client, args, message) {
            
            this.arguments = args
            this.client    = client
            this.message   = message

        }

        command () {

            const embed = new Discord.RichEmbed()

            embed.setAuthor(`Requested by ${this.message.author.username}#${this.message.author.discriminator}`, this.message.author.avatarURL)
            embed.setFooter(`By ${this.client.user.username} and Ness#9999`, this.client.user.displayAvatarURL)
            
            if (this.message.member.hasPermission('ADMINISTRATOR')) {
                if (Config[this.arguments[0]]) {
                    const value = this.arguments.slice(1) ? this.arguments.slice(1).join(' ') : undefined,
                          old   = Config[this.arguments[0]]
                    if (value) {
                        Config[this.arguments[0]] = value
                        embed.addField(`${this.arguments[0].slice(0, 1).toUpperCase() + this.arguments[0].slice(1)} option:`, `Before: \`${old}\`\nAfter: \`${value}\``)
                    } else {
                        embed.addField('Error during option updating!', 'You have to precise new option value.')
                    }
                } else {
                    embed.addField('Error during option updating!', 'Option you precise does not exists.')
                }
            } else {
                embed.addField('Error during command execution!', 'You do not have the required permission to execute that command.')
            }

            this.message.channel.send(embed)


        }

    }

}