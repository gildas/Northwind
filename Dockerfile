FROM node:10

ENV APP_ROOT /usr/local/src

#set our node environment
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
ARG MONGODB=localhost
ENV MONGODB ${MONGODB}
ARG PORT=80
ENV PORT ${PORT}

# Expose web port
EXPOSE ${PORT}

# Install application, dependencies first
WORKDIR ${APP_ROOT}
COPY package.json ${APP_ROOT}/
#RUN  npm install && npm cache clean --force
RUN  npm install
ENV PATH ${APP_ROOT}/node_modules/.bin:$PATH

CMD [ "npm", "start" ]
