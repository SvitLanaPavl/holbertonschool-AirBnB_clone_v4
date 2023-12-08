FROM ubuntu:20.04
ENV TZ=America/Chicago
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update --fix-missing
RUN apt-get upgrade -y --fix-missing
RUN apt-get install -y docker.io
RUN apt-get install -y git
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y python3 python3-pip
RUN pip3 install flasgger
RUN pip3 install flask
RUN apt-get install -y python3-lxml
RUN pip3 install flask_cors
RUN pip3 install jsonschema==3.0.1
RUN pip3 install pathlib2
RUN apt-get install -y mysql-server
RUN pip3 install sqlalchemy
RUN apt-get install -y python3-mysqldb
RUN npm install semistandard --global
RUN npm install request --global
RUN export NODE_PATH=/usr/lib/node_modules