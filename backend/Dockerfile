FROM node:argon
# Create app directory
RUN mkdir -p /opt/lmi-backend
WORKDIR /opt/lmi-backend
COPY package.json /opt/lmi-backend
RUN npm install --production
COPY dist/ /opt/lmi-backend
EXPOSE 3000
CMD [ "node", "app.js" ]