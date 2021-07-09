FROM alpine:3

ADD https://get.please.dev/0.6.2/alpine/x64 /usr/local/bin/please
RUN chmod +x /usr/local/bin/please

WORKDIR /app
RUN echo "#!/bin/sh" > entry.sh
RUN echo "please git --version" >> entry.sh
RUN chmod +x entry.sh

ENTRYPOINT [ "./entry.sh" ]