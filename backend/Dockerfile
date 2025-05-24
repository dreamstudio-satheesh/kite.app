# Use official PHP-FPM image
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

# Set working directory
WORKDIR /var/www/html

# Copy only composer files first (for layer caching)
COPY composer.json composer.lock ./

# Install Composer from official image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install PHP dependencies (exclude dev dependencies)
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Copy application code (after dependencies to leverage caching)
COPY . .

# Set permissions (adjust paths as needed for your framework)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Use production PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Expose PHP-FPM port (default: 9000)
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]