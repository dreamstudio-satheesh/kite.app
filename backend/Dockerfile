FROM php:8.3-fpm-alpine

RUN apk add --no-cache bash git curl libpng libjpeg-turbo-dev freetype-dev oniguruma-dev zip unzip mysql-client \
 && docker-php-ext-install pdo pdo_mysql gd

WORKDIR /var/www/html

COPY . .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer \
 && composer install --optimize-autoloader
