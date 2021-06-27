FROM alpine

ADD https://github.com/pleasecmd/please/releases/download/v0.2.3/please-0.2.3-alpine-x64 /usr/local/bin/please
RUN chmod +x /usr/local/bin/please

WORKDIR /app
RUN echo "#!/bin/sh" > ./entry.sh
RUN echo "please ping $1" >> ./entry.sh
RUN chmod +x ./entry.sh

ENTRYPOINT ["/app/entry.sh"]