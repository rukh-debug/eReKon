# build gobuster
FROM golang:1.17 AS goBuilder
WORKDIR /
RUN go version
RUN go install github.com/OJ/gobuster@latest
RUN go install github.com/tomnomnom/httprobe@latest
RUN go install github.com/d3mondev/puredns/v2@latest

# confirm its installed
RUN ls /go/bin/

FROM debian:latest

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY ./ ./

# install stuff we need to develope
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get install -y wget \
    && apt-get install -y nmap \
    && apt-get -y autoclean

# nvm environment variables
ENV NODE_VERSION1 16.6.1

# install nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

#install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION1 \
		&& nvm use $NODE_VERSION1

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION1/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION1/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

WORKDIR /usr/src/app
COPY ./ ./

RUN npm install --loglevel=error

#copy bins 
COPY --from=goBuilder /go/bin/gobuster /src/tools/gobust/bin
COPY --from=goBuilder /go/bin/httprobe /src/tools/httprobe/bin
COPY --from=goBuilder /go/bin/puredns /src/tools/puredns/bin

EXPOSE 5001

CMD ["node", "index.js"]
