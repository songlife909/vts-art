#!/bin/bash

# Create backgrounds directory if it doesn't exist
mkdir -p public/images/backgrounds

# Download hero background
curl -L "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80" -o public/images/backgrounds/hero-bg.jpg

# Download benefits background
curl -L "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80" -o public/images/backgrounds/benefits-bg.jpg

# Download contact background
curl -L "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80" -o public/images/backgrounds/contact-bg.jpg 