FROM php:8.3-fpm-alpine

# Install required packages and PHP extensions
RUN apk add --no-cache \
    bash \
    git \
    curl \
    libpng \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    zip \
    unzip \
    mysql-client \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install pdo pdo_mysql gd

WORKDIR /var/www/html

# Copy source code
COPY . .

# Install Composer (faster/cleaner way)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader
