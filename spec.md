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
