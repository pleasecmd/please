FROM alpine

ARG VERSION=0.2.8

ADD https://github.com/pleasecmd/please/releases/download/v${VERSION}/please-${VERSION}-alpine-x64 /usr/local/bin/please
RUN chmod +x /usr/local/bin/please

WORKDIR /app
RUN echo "#!/bin/sh" > entry.sh
RUN echo "please git --version" >> entry.sh
RUN chmod +x entry.sh

ENTRYPOINT [ "./entry.sh" ]