FROM node:18.19.0-alpine AS build

#ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json ./

# avoid zscaler tls inspection problems
RUN npm config set strict-ssl false
RUN npm install
# RUN npm install -g @angular/cli
RUN npm install -g @angular/cli@17.0.0 
COPY . .
RUN ([ -d node_modules ] || npm i)
RUN ng build mf-kc
RUN cat dist/mf-kc/runtime.js dist/mf-kc/main.js dist/mf-kc/polyfills.js> dist/mf-kc/mf-poc.js


FROM node:18.19.0-alpine

WORKDIR /usr/src/app
COPY --from=build --chown=node:node /usr/src/app /usr/src/app/
EXPOSE 3000

CMD [ "node", "local-server" ]

#FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/app/dist/local /usr/share/nginx/html/local
#COPY --from=build /usr/src/app/dist/mf-kc /usr/share/nginx/html/mf-kc
#CMD ["nginx", "-g", "daemon off;"]
#RUN npm run serve-local



