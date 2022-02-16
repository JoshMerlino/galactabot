# galactabot

https://discord.com/oauth2/authorize?client_id=756205294492713041&permissions=8&scope=bot

### Checks
* [![Code Style Analysis](https://github.com/JoshMerlino/galactabot/actions/workflows/code-style-analysis.yml/badge.svg)](https://github.com/JoshMerlino/galactabot/actions/workflows/code-style-analysis.yml)
* [![Code Quality Analysis](https://github.com/JoshMerlino/galactabot/actions/workflows/code-quality-analysis.yml/badge.svg)](https://github.com/JoshMerlino/galactabot/actions/workflows/code-quality-analysis.yml)
* [![Test CI](https://github.com/JoshMerlino/galactabot/actions/workflows/test-ci.yml/badge.svg)](https://github.com/JoshMerlino/galactabot/actions/workflows/test-ci.yml)

## Running the bot
Ensure you have the following environment variables.
```
DISCORD_TOKEN = ...
```

Also make sure you are using Node@^16.6

```bash
node .
```

## Commands

### Creating commands
```bash
cp sample/command.ts src/commands/mycommand.ts
```

### Existing commands
* **General**
  * `help [command | category]` - Displays the help message.
