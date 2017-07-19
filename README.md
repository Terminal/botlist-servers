# Botlist Servers

In this repository we aim to give you a list of all servers that we have deemed to be using a botlist, however dependant on the user who submitted the file this should change how you approach there lists. Each list is given in different formats and hopefully by reading the list below you will be able to deter what amount the user has made the bot leave the servers. 

[If you're looking to contribute to the site, please checkout this branch.](https://github.com/Terminal/botlist-servers/tree/gh-pages)

Bot | Author | Definition | Date | Description
--- | ------ | ---------- | ---- | -----------
blargbot<br>[view](blargbot.json) | stupid cat | 20m, 50% | 2017-07-18 | Ran by blargbot and generated into a list for another project this was created in order to catch pesky users however never acted upon.
Parkerbot<br>[view](parkerbot.json)<br>[legacy](parkerbot-legacy.json) | MSS | 20m, 50% | 2017-07-19 | A Parker Square of a Bot listing. Contains more detailed details compared to previously.
DiscordMail<br>[view](discordmail.json) | MSS | 20m, 50% | 2017-07-18 | Uses the same system as Parkerbot.<br>This was uploaded before transitioning to a new table system that includes more data.
Trello Bot<br>[view](trellobot.json) | Snazzah | 20m, 75% | 2017-07-19 | A snapshot of all guilds matched by the definition in all shards.
Discord Cards<br>[view](discordcards.json) | Snazzah | 20m, 75% | 2017-07-19 | A snapshot of all guilds matched by the definition in all shards.

## Contributing

1. Fork this repo
2. Add your files/make changes
3. Create a pull request
4. ???  
5. Profit

### Adding an entry to the Website Template
```json
{
	"name": "some cool bot",
	"date": "2017-07-19",
	"def": "20m 50%",
	"author": "bot finder",
	"description": "This is a description",
	"icon": "https://blargbot.xyz/img/blargbot.png",
	"link": "https://rawgit.com/Terminal/botlist-servers/master/blargbot.json",
	"entry_info_link": "https://github.com/Terminal/botlist-servers/blob/master/blargbot.json",
	"disect": {
		"entry": {
			"title": "{{name}}",
			"subtitle": "{{id}}",
			"icon": "{{icon}}"
		},
		"full_info": {
			"Name": "{{name}}",
			"ID": "{{id}}",
			"Bot Percentage": "{{percentageBots}}",
			"User / Bots / Total": "{{userAccounts}} / {{botAccounts}} / {{totalMembers}}",
			"Timestamp": "{{timestamp}}"
		}
	}
}
```
| Key | Description |
|-----|-------------|
| name, author, data, description | The values corresponding with the main table above. |
| def | The definition. |
| icon | The icon used for displaying the entry. |
| link | The link the website will be using to request data. |
| entry_info_link | The link to display the JSON. (i.e. a GitHub link) |
| disect | See below |

### `disect`
| Key | Description |
|-----|-------------|
| entry | The values to use when displaying a guild. The keys shown are required. Uses [Mustache](https://github.com/janl/mustache.js). |
| full_info | The keys and values to use when displaying full information in a table. Everything in the object is customizable. Both keys and values use [Mustache](https://github.com/janl/mustache.js). |

## Requirements

- Must be in `.json` format and an array
- Must not be a full list of every guild, only show bot lists.
- If doing so manually, place information wherever you can in the table above.
- Make sure you edit the table before submitting a pull request.

## Column Key

### Definition

Written | Definition
------- | ----------
5u | Minimum of 5 users
5b | Minimum of 5 bots
5m | Minimum of 5 members
30% | Maximum of 30% bots
5m, 30% | Minimum of 5 members AND 30% maximum bots
