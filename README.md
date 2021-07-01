# Please

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/aaa7e6823a4b4103a3d45a208668c1a1)](https://www.codacy.com/gh/pleasecmd/please/dashboard?utm_source=github.com&utm_medium=referral&utm_content=pleasecmd/please&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpleasecmd%2Fplease.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpleasecmd%2Fplease?ref=badge_shield)
[![Share on Twitter](https://img.shields.io/badge/twitter-share-acf)](https://twitter.com/intent/tweet?text=Please%20is%20an%20on-demand%2C%20universal%2C%20declarative%20command%20installer%20https%3A%2F%2Fgithub.com%2Fpleasecmd%2Fplease)

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

## Documentation

Refer to our [wiki](https://github.com/pleasecmd/please/wiki) on GitHub for more information, documentations and details.

## Notes

Please is a highly experimental tool. It is in alpha stages.
There aren't many packages available on the please repository.
Although we have a temporary fallback method to fetch install instructions from
[CNF](https://command-not-found.com/),
chances are high that you won't find the packages or commands you are looking for.

Please is a community driven package manager, adding commands to the
[please repository](https://github.com/pleasecmd/repo) is easy and could be helpful
to a lot of people with the same requirements as you.
If you cannot find a command, or something is broken, feel free to make a PR for it.
You can add install or build instructins for your own OS, or all operating systems,
or you can implement a command in pure JavaScript.

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
ADD https://get.please.dev/${VERSION}/${OS}/${ARCH} /usr/local/bin/please
RUN chmod +x /usr/local/bin/please
```

Check [examples/docker](./examples/docker) for a working example.

## Repository

Please requires a repository to function, this repository is
hosted on [GitHub](https://github.com/pleasecmd/repo). Check it out to learn more info.

## Licence

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpleasecmd%2Fplease.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpleasecmd%2Fplease?ref=badge_large)
