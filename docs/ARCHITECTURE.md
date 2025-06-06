# Architecture Documentation

The REST API Documentation can be found here: [backend/app](../backend/app/API-Docs.md)

## Stack
UI/UX - React w HTML/CSS

Client - React

Backend API - Python3 Flask

Image Processing - OpenCV

Database - Mongo

File Storage - Azure

## Relationships
#### General requests
UI/UX <-> Client  < - - - - - > Backend API

#### Upload image
API -> Image Processing -> Azure, Mongo

#### Get image
API <-> Mongo <-> Azure

**© 2025 [FotoMagic](https://ambitious-dune-0f7fde21e.6.azurestaticapps.net/). All rights reserved.**
