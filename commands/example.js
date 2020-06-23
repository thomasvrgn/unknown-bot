/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                Commands
//////////////////////////////////////*/

import Discord from 'discord.js'

export default {

    name        : ['example', 'test'],
    description : 'Example command',
    category    : 'example',

    run         : class {

        constructor (client, args, message) {
            
            this.arguments = args
            this.client    = client
            this.message   = message

        }

        command () {

            this.message.delete()

            let time     = this.arguments.filter(x => x.match(/\d+(\s+)?s((econd)?(s)?)/g) || x.match(/^\d+$/g)),
                maxUsers = 1,
                users    = []

            const embed = new Discord.RichEmbed()

            embed.setAuthor(`Requested by ${this.message.author.username}#${this.message.author.discriminator}`, this.message.author.avatarURL)
            embed.setFooter(`By ${this.client.user.username} and Ness#9999`, this.client.user.displayAvatarURL)

            if (time.length === 0) {
                time = 5
            } else {
                time = parseInt(time[0].replace(/(\s+)?s((econd)?(s)?)/g, ''))
                console.log(time)
            }

            embed.setTitle('BLP • 1 vs 1')
            embed.setDescription('Please react to the following message to join the matchmaking. Be careful! Message will be deleted in ' + time + ' seconds.\n' + maxUsers + ' users are needed to process matchmaking.')

            this.message.channel.send(embed).then(message => message.react('✅').then(() => {

                const filter = (reaction, user) => {
                    return ['✅'].includes(reaction.emoji.name) && user.id !== this.client.user.id
                }
    
                message.awaitReactions(filter, { max: 1, time: time * 1000 }).then(collected => {

                    const reaction = collected.first()
                    if (reaction) {
                        if (reaction.emoji.name === '✅') {
                            const emojiArray = Array.from(reaction.users).filter(x => x[0] !== this.client.user.id)
                            if (emojiArray) {
                                if (emojiArray.length > maxUsers) {
                                    reaction.remove()
                                }
                            }
                        }
                    }
                })
                setTimeout(() => {
                    users = Array.from(message.reactions.get('✅').users).filter(x => x[0] !== this.client.user.id).map(x => x[1])
                    if (users.length === maxUsers) {
                        message.guild.createChannel(users.map(x => x.username).join('-'), {permissionOverwrites: users.map(x => x = {
                            id: x.id,
                            allow: ['VIEW_CHANNEL']
                        }).concat(Array.from(this.message.guild.roles).map(x => x[0]).map(x => x = {
                            id: x,
                            deny: ['VIEW_CHANNEL']
                        }))}).then(channel => {

                            const embed = new Discord.RichEmbed()

                            embed.setAuthor(`Requested by ${this.message.author.username}#${this.message.author.discriminator}`, this.message.author.avatarURL)
                            embed.setFooter(`By ${this.client.user.username} and Ness#9999`, this.client.user.displayAvatarURL)
                            embed.setTitle(`${users.map(x => x.username).join(' and ')}'s channel`)
                            embed.setDescription('Here you can start talking!')

                            channel.send(embed)

                            channel.send(users.map(x => x = `<@${x.id}>`).join('')).then(message => message.delete())

                        })
                    } else {

                        const embed = new Discord.RichEmbed()

                        embed.setAuthor(`Requested by ${this.message.author.username}#${this.message.author.discriminator}`, this.message.author.avatarURL)
                        embed.setFooter(`By ${this.client.user.username} and Ness#9999`, this.client.user.displayAvatarURL)
                        embed.setTitle(`Error during channel creation:`)
                        embed.setDescription('A group must have ' + maxUsers + ' members!')

                        message.channel.send(embed).then(message => setTimeout(() => message.delete(), 5000))

                    }
                    
                    message.delete()
                }, time * 1000)

            }))

        }

    }

}