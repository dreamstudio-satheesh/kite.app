FROM php:8.3-fpm

# System dependencies and extensions
RUN apt-get update && apt-get install -y \
    bash \
    git \
    curl \
    zip \
    unzip \
    supervisor \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd pcntl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Copy Composer files first (for caching)
COPY composer.json composer.lock ./

# Install Composer from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install dependencies (skip scripts)
RUN composer install --no-dev --no-scripts --no-interaction --prefer-dist --optimize-autoloader

# Copy the entire app code (including artisan)
COPY . .

# Run post-install scripts
RUN composer run-script post-autoload-dump

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Production PHP settings
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

CMD ["php-fpm"]