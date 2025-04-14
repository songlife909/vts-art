#!/bin/bash

# Create artworks directory if it doesn't exist
mkdir -p public/images/artworks

# Download A Sunday Afternoon on the Island of La Grande Jatte by Georges Seurat
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1920px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg" -o public/images/artworks/sunday-afternoon.jpg 