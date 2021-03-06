# Specs

```bash
please xyz[@version] args
```

Running the above should run `xyz[@version]`, passing args to it.
If xyz is not available, then the command should first:

a) Install it, or
b) Download a prebuilt version, or
c) Build it, or
d) Display an error

The program, will track a git repository for instructions on how to build
a package. If `git` is not available, the program shows a warning message
"Please install git to speed up things", then will download a tarball of the
said repository instead (or ask the user to do it manually).

The program needs to provide an API, for getting OS, CPU arch, available disk
space and etc... and also an API to install, download and build programs.

The program needs to be portable, fast, easy to understand and easy to maintain.
The program needs to be scriptable.

## Goals

Provide an easy and portable way of installing and using commands. Mainly for
devops and on command line.

## Candidates for the Scripting Language

1. **Bash** is available on most unix systems, although it has a lot of users, it's
   not as maintainable or understandable as the other options. Plus, it's not available
   on windows.
2. **JavaScript** is fast, easy to understand and easy to maintain, however not as
   portable as the others on the list. Downloading and executing external code is
   relatively easy.
3. **Python** is relatively easy to understand and easy to maintain, however not as
   fast as the others on this list. Downloading and executing external modules is not
   straightforward.
4. A small **custom language** can be portable and fast, but difficult to maintain,
   however, this will give us the biggest compatibility as a custom compiler can be
   made for each OS/environment where the reference compiler isn't supported (Porting
   a small language is much easier than porting the entire JavaScript)

After careful considerations, JavaScript was chosen as the scripting language.

## Supported Operating Systems

Following operating systems should have tier 1 supports:

1. Linux
2. BSDs
3. Unixes, including MacOS
4. Windows

## CLI Syntax

```
please --kwarg args command --ckwargs cargs
```

## Repo

We need to store:

1. Installation instructions for each OS / package manager
2. Prebuilt fetch and decompress instructions
3. Build instructions for each OS
4. Scripted install or run

### Repo structure

Proposed repository structure:

```
repo/
?????? commands/
???  ?????? ${command}/
???  ???  ?????? build/
???  ???  ???  ?????? ${os}.${variant}.${release}.${arch}.js
???  ???  ?????? install/
???  ???  ???  ?????? ${os}.${variant}.${release}.${arch}.js
???  ???  ?????? prebuilt/
???  ???  ???  ?????? ${os}.${variant}.${release}.${arch}.js
???  ???  ?????? script/
???  ???  ???  ?????? ${os}.${variant}.${release}.${arch}.js
?????? configs/
???  ?????? ${os}.${variant}.${release}.${arch}.js
```

Where:

1. `os` is the OS name, type, class or family (eg. `windows`, `macos`, `bsd`, `linux` or `any`)
2. `variant` is the distribution, variant or version (eg. `10`, `ubuntu`, `debian`, `freebsd` or `any`)
3. `release` is the version, release or build number (eg. `18363`, `20.04`, `10` or `any`)
4. `arch` is the cpu architecture (eg. `arm64`, `x64`, or `any`)

The program should first try the exact values for each of the parameters, then switch to `any` one parameter at a time from right to left.

File check order for config or command files is as follows:

1. ${os}.${variant}.${release}.${arch}
2. ${os}.${variant}.${release}.any
3. ${os}.${variant}.any.${arch}
4. ${os}.${variant}.any.any
5. ${os}.any.any.any
6. any.any.any.any

To obtain each of the parameters, the following methods are used:

1. `os`, is one of `windows`, `macos`, `bsd`, `linux` or `any`
2. `variant` depends on the os class:
   2.1. For `windows` it is the `major.minor` part of `major.minor.build` value reported by `os.release()`
   2.2. For `linux` it is the name reported by `getos` npm library, lower-cased and whitespaces removed.
   2.3. For `macos` it is the name reported by `macos-release` npm library, lower-cased and whitespaces removed.
   2.4. For `bsd`, it is either `freebsd` or `openbsd`, as reported by `os.platform()`
3. `release` depends on the os class:
   3.1. For `windows` it is the `build` part of `major.minor.build` value reported by `os.release()`
   3.2. For `linux` it is the release field reported by `getos` npm library.
   3.3. For `macos` it is the value reported by `os.release()`, which matches the darwin kernel version number.
   3.4. For `bsd` it is the value reported by `os.release()`
4. `arch` paramter is the value reported by `os.arch()`

## Configuration

Can contain:

1. Preferred way of installation, in order of preference
2. Preferred package managers, in order of preference (eg. brew, ports...)
