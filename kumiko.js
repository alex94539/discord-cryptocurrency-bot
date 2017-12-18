const Discord = require("discord.js");

const config = require("./config.json");

const fs = require('fs');

const rp = require('request-promise');

const client = new Discord.Client({ autoReconnect: true });

client.login(config.token);

var bittrex = "https://bittrex.com/api/v1.1/public/getticker?market=btc-";

var cryptopia = "https://www.cryptopia.co.nz/api/GetMarket/";

var cobinhood = "https://api.cobinhood.com/";

var Euphokumiko = "<@305696867084140547>";

var Bittrextemp;

var Cryptopiatemp;

var embed;

var success, ask, bid, last;

function ERROR()
{
    var temp;
    temp = new Discord.RichEmbed()
        .setTitle("ERROR")
        .setColor(0xff0000)
        .setDescription("Something Wrong~~")
        .addField("Possible reason:", "Market currently unavailable or no such market. Please check the abbreviation of your input.");
    return temp;
}

function MSG(exchange, color, cmd, ask, bid, last)
{
    var temp;
    temp = new Discord.RichEmbed()
        .setTitle(exchange + "current tick values:")
        .setDescription("Support by Kumiko~~")
        .setColor(color)
        .addField("Ask Price(" + cmd.toUpperCase() + "-BTC)", ask)
        .addField("Bid Price(" + cmd.toUpperCase() + "-BTC)", bid)
        .addField("Last Price(" + cmd.toUpperCase() + "-BTC)", last)
        .setTimestamp()
        .setFooter("Oumae Kumiko");
    return temp;
}

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started.`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    
});

client.on("message", message =>
{
    var cryptocoin, data, out, cmd, flag;

    var mumi;

    if (message.content == "help")
    {
        console.log(client.user.username);
        embed = new Discord.RichEmbed()
            .setTitle("Help message")
            .setThumbnail("https://i.imgur.com/Sk4GwU4.png")
            .setColor(3447003)
            .addField("Hihi, this is Kumiko~~", "I am Kumiko. My author " + Euphokumiko + " is still working on my source code. I can help you to get the current ask/bid price at the exchange.")
            .addField("Command list~~", "Bittrex: Use command start with *%%*.\nCryptopia: Use command start with *$$*.")
            .addField("Example:", "Type %%ETH,and you'll get the ask/bid/last price of ETH-BTC at Bittrex.\nType $$ETH, and you'll get the ask/bid/last price of ETH-BTC at Cryptopia")
            .addField("Notice","Please notice that the abbreviation of cryptocoin might differ in different exchange.Like BCC in Bittrex and BCH in Cryptopia.")
            .setFooter("Oumae Kumiko")
            .setTimestamp();

        message.channel.send({ embed });
    }

    if (message.content.substring(0, 2) == '%%')//bittrex  
    {
        console.log(client.user.username);

        cryptocoin = message.content.split('%%')[1];

        cmd = cryptocoin.split(/\s/)[0];

        console.log(bittrex + cmd);

        rp(bittrex + cmd).then(data => {
            
            Bittrextemp = JSON.parse(data);

            success = Bittrextemp.success;

            if (success===true)
            {
                ask = JSON.stringify(Bittrextemp.result.Ask);

                bid = JSON.stringify(Bittrextemp.result.Bid);

                last = JSON.stringify(Bittrextemp.result.Last);

                embed = MSG("Bittrex ", 568394, cmd, ask, bid, last);

                message.channel.send({ embed });
            }
            else
            {
                console.log(client.user.username);

                embed = ERROR();
                message.channel.send({ embed });
            }
        })
    }
    
    if (message.content.substring(0, 2) == "$$")//cryptopia
    {
        console.log(client.user.username);

        cryptocoin = message.content.split('$$')[1];

        cmd = cryptocoin.split(/\s/)[0];

        console.log(cryptopia + cmd + "_BTC");

        rp(cryptopia + cmd + "_BTC").then(data => {

            Cryptopiatemp = JSON.parse(data);

            success = Cryptopiatemp.Success;

            flag = Cryptopiatemp.Data;

            if (flag != null)
            {
                ask = Cryptopiatemp.Data.AskPrice;

                console.log(ask);

                bid = JSON.stringify(Cryptopiatemp.Data.BidPrice);

                last = JSON.stringify(Cryptopiatemp.Data.LastPrice);

                embed = MSG("Cryptopia ", 568394, cmd, ask, bid, last);

                message.channel.send({ embed });
            }

            else
            {
                console.log(client.user.username);

                embed = ERROR();
                message.channel.send({ embed });
            }
        })
    }
    
    if (message.content.substring(0, 2) == "&&")//cobinhood on progress
    {
        cryptocoin = message.content.split('$$')[1];

        cmd = cryptocoin.split(/\s/)[0];


    }
    
})
