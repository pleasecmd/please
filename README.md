# Please

Please is an on-demand package installer. Prefix your commands with `please`
and it will take care of installing them if they're not already installed.

## Syntax

```bash
please [please-args] <command> [command-args]
```

## Example

```bash
echo "Please is amazing" | please lolcat
```

## Installation

### Via npm

In case you already have `node` installed on your OS, you can run the following command to install `please`:

```bash
sudo npm i -g please
```

Refer to ["Installing Node.js via package manager"](https://nodejs.org/en/download/package-manager/) if you don't have `node` installed.

### Using releases

Simply download one of the [releases](https://github.com/pleasecmd/please/releases) and copy it to your `$PATH`.

### In Docker

If you already have `node` available on your docker image it's recommended to install `please` via `npm`.
Otherwise you can do the following in your `Dockerfile`:

```Dockerfile
ADD https://github.com/pleasecmd/please/releases/${RELEASE} /usr/local/bin/please
```
