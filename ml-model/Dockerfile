FROM python:3.8-slim

ENV PYTHON_TA_LIB_VERSION "0.4.24"

USER "root"
WORKDIR "/tmp"

RUN python -m pip install --upgrade pip
RUN apt-get update \
    && apt-get -qq -y install curl \
            gcc \
            g++ \
            make \
    && cd /tmp \
    && curl -L -O http://prdownloads.sourceforge.net/ta-lib/ta-lib-0.4.0-src.tar.gz \
    && tar -zxf ta-lib-0.4.0-src.tar.gz \
    && cd ta-lib/ \
    && ./configure --prefix=/usr \
    && make \
    && make install \
    && pip install setuptools numpy \
    && pip install ta-lib==${PYTHON_TA_LIB_VERSION} \
    && rm -rf /tmp/* 
              

WORKDIR /app

COPY requirements.txt requirements.txt  

RUN pip install --no-cache-dir -r requirements.txt
ADD kisu-talib.cbm kisu-talib.cbm
ADD server.py server.py

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "server:app"]