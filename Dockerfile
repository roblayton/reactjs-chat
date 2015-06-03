FROM centos:centos6

RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN yum install -y npm

ADD dist /opt/dist
ADD server /opt/server
ADD package.json /opt/package.json

RUN cd /opt && npm install

WORKDIR /opt/server

EXPOSE 3000

CMD ["node", "app.js"]
