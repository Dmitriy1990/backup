# tlg_backup_fe

Данный репозиторий содержит исходные коды для бэкапера телеграм каналов.

Пезультатом сборки данных исходных кодов является контейнер.

## Как собрать 
Возможно собрать образы 2мя способами
### 1. Сборка в докере
Необходимо наличие на сборочном хосте:
* docker не н иже 17.05 (нужена поддержка multistage)

Докер файл для данной сборки лежит в корне проекта.
Для сборки необходимо определить переменные окружения
- $REPOSITORY - репозиторий
- $TAG - таг

или поправить значения по умолчанию в build_docker.sh
<br/>
и выполнить build_docker.sh

### 2. Локальная сборка. 
Необходимо наличие на сборочном хосте:
* npm версии не ниже 6й
* node не ниже 12.18 
* docker

Сборка происходит в 2 этапа
#### Сборка приложения
В корне проекта последовательно выплгнить комманды
- npm install -g npm@6
- npm install
- npm run-script build

По факту выполнения будут получены артефакты для деплоя
####  Создание образа
Перейдите в каталог ./nginx/docker/
Для сборки необходимо определить переменные окружения
- $REPOSITORY - репозиторий
- $TAG - таг

или поправить значения по умолчанию в build_docker.sh
<br/>
и выполнить build_docker.sh

