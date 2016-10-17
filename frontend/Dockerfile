FROM node:argon
# Create app directory
RUN mkdir -p /opt/lmi-frontend
WORKDIR /opt/lmi-frontend
COPY package.json /opt/lmi-frontend
RUN npm install
RUN npm install http-server -g
COPY dist/ /opt/lmi-frontend
EXPOSE 8080
CMD [ "http-server", "/", "-p 8080" ]
