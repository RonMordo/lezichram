# Lezichram - Memorial Web App for Israeli Fallen Soldiers

**Lezichram** is a web application created to make the commemoration of Israel's fallen soldiers more accessible and discoverable — especially on Instagram, where thousands of memorial posts already exist.

## Overview

The project was initiated by a social entrepreneur who manages a large Instagram page that automatically generates and shares memorial posts using web scraping from sources like [Izkor.gov.il](https://www.izkor.gov.il/). The problem: Instagram does not offer an efficient search feature to locate specific memorial posts by name. 

**Lezichram** solves this problem by providing a user-friendly search interface where anyone can search for a fallen soldier by name and be redirected to their Instagram post.

In addition, the app presents background information about the project, its mission, how it started, and the people and companies who contributed voluntarily to its success.

## Features

- Search memorial posts by the name of the fallen soldier.
- View full details including the post image, ID, and related information.
- Connect to the original Instagram post directly.
- Submit new soldier data via contact form.
- Learn about the story behind the initiative and contributors.

## Tech Stack

### Frontend

- **Framework:** React.js
- **Build Tool:** Vite
- **State Management:** useState/useEffect
- **API Calls:** `fetch` to Supabase

### Backend

- **Node.js Script**
  - Fetches the latest Instagram posts
  - Processes post data (title, ID, image)
  - Downloads each image and stores it to persistent storage
  - Sends data to a Supabase PostgreSQL database

- **Database:** Supabase PostgreSQL
- **Storage:** Supabase Storage (stores Instagram post images)
- **Hosting for backend script:** Fly.io (Dockerized container)
- **Cron Jobs:** Runs the sync script daily to update image URLs (due to CDN expiration)

## Architecture

1. The backend Node.js script is deployed as a container on Fly.io.
2. It runs once per day using a scheduled cron job.
3. The script fetches Instagram posts and processes them.
4. Post data and image assets are uploaded to Supabase.
5. The frontend app fetches this data on load and stores it in memory.
6. Users can search for names and be redirected to the appropriate post.

## Result

The app was launched on Israel's Memorial Day and received over **15,000 visits within hours**. Hundreds of requests were submitted through the contact form to add new names to the system, demonstrating the strong emotional and social impact of the platform.

## Collaboration

This project was built in close collaboration using Zoom, Jira, and Figma. Tasks were organized via Figma designs and reviewed after each iteration.

## Live Website

[https://lezichram.co.il](https://lezichram.co.il)

