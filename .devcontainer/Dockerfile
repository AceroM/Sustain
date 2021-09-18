# [Choice] Node.js version: 16, 14
# or others from https://hub.docker.com/_/node
FROM node:16

# remove old yarn
RUN rm -rf /opt/yarn-v* /usr/local/bin/yarn /usr/local/bin/yarnpkg
RUN mkdir -p /root/workspace /root/.vscode-server 

USER $USERNAME
ENV ENV="/home/$USERNAME/.zshrc" \
    EDITOR=vi \
    LANG=en_US.UTF-8
USER root

# Install eslint typescript expo
RUN npm install -g yarn pure-prompt eslint typescript expo-cli @expo/ngrok@^4.1.0

CMD /bin/sh -c "while sleep 86000; do :; done"
