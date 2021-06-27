FROM alpine

ARG VERSION=0.2.4

COPY please-${VERSION}-alpine-x64 /usr/local/bin/please
RUN chmod +x /usr/local/bin/please

WORKDIR /app
RUN echo "#!/bin/sh" > entry.sh
RUN echo "please ping \$1" >> entry.sh
RUN chmod +x entry.sh

ENTRYPOINT [ "sleep",  "100000" ]