
FROM python:3.8.3

WORKDIR /app

COPY requirements.txt requirements.txt  

RUN pip install --no-cache-dir -r requirements.txt

ADD kisu.cbm kisu.cbm
ADD server.py server.py

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "server:app"]