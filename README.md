# Please

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/aaa7e6823a4b4103a3d45a208668c1a1)](https://www.codacy.com/gh/pleasecmd/please/dashboard?utm_source=github.com&utm_medium=referral&utm_content=pleasecmd/please&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpleasecmd%2Fplease.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpleasecmd%2Fplease?ref=badge_shield)

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
sudo npm i -g @please.dev/cli
```

Refer to ["Installing Node.js via package manager"](https://nodejs.org/en/download/package-manager) if you don't have `node` installed.

### Using releases

Simply download one of the [releases](https://github.com/pleasecmd/please/releases) and copy it to your `$PATH`.

### In Docker

If you already have `node` available on your docker image it's recommended to install `please` via `npm`.
Otherwise you can do the following in your `Dockerfile`:

```Dockerfile
ADD https://github.com/pleasecmd/please/releases/${RELEASE} /usr/local/bin/please
```

## Repository

Please requires a repository to function, this repository is
hosted on [GitHub](https://github.com/pleasecmd/repo). Check it out to learn more info.

## Licence

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpleasecmd%2Fplease.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpleasecmd%2Fplease?ref=badge_large)
