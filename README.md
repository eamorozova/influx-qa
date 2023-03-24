# Allure + InfluxDB

Выгрузка результатов тестов Allure в InfluxDB

---

## Использование

1. Установить зависимости
```
npm install
```
2. Запустить тестовый прогон
```
npm test
```
3. Сгенерировать allure отчёт
```
allure generate
```
4.  Запустить запись в Influx
> Конфигурация указана в `config/index.js`
```
npm run influx
```


### Экспортируемые данные
В Influx экспортируются следующие параметры теста:

Поля:
* duration — длительность в миллисекундах
* statusCode — статус выполнения в виде целого числа для отображения в Grafana: `passed = 0`, `failed = 1`, `broken = 2`, `skipped = 3`

Теги:
* name
* status
* package 
* flaky 
* story
* feature
* severity

---

## Использование совместно с [docker-influxdb-grafana](https://hub.docker.com/r/philhawthorne/docker-influxdb-grafana/)

1. Спуллить образ и запустить docker-контейнер, например:
```
docker run -d \
  --name docker-influxdb-grafana \
  -p 3003:3003 \
  -p 3004:8083 \
  -p 8086:8086 \
  -v ~/Documents/influxdb:/var/lib/influxdb \
  -v ~/Documents/grafana:/var/lib/grafana \
  philhawthorne/docker-influxdb-grafana:latest
```
2. Перейти в Influx и создать базу данных, например:
```
# influx
> create database mybucket
```

> Можно будет доделать, чтобы база данных создавалась отдельным скриптом.

3. Выполнить шаги указанные в разделе [Использование](#использование). Необходимо, чтобы название базы данных и порта, указанных в `docker run` совпадало с указанными в `config/index.js`.