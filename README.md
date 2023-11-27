## Intro
Imagine you are contributing to the development of a large-scale platform, which consists of various client websites, services (including a **blockchain** component), and a comprehensive database. Your current focus is on integrating the backend with the `market` front-end application.

Front-end application will consist of such pages:
- **Main page**
- **Page of all Art Assets** (_featuring pagination, sort, filters, etc_)
- **Page of single Art Asset**
- **Page of all Artists** (_featuring pagination, sort, filters, etc_)
- **Page of single Artist**
- **Page of search** (_for searching artists and art assets_)
- **Contacts page**

## Task
Your task is to develop functionality to retrieve data for the **Single Art Asset Page**. The relevant part of the database tables is stored in `db/db.sql`. The data required for the page must include:
1. Art Asset details:
    - original name
    - english name
    - description
    - price
    - filename of the files on the disk (`filename_disk`)
2. Information related to the Artists associated with the Art Asset:
    - name
    - filename of photo (`filename_disk`)
3. Details of 4 Art Assets from an Artist associated with the primary Art Asset (for block _'More from artist'_):
    - original name

## Requirements
1. TypeScript
2. Express.js
3. PostgreSQL

#### Considered a plus if you can:
Execute raw database queries or utilize [Knex.js](https://knexjs.org/)

## Notes
Found some bugs in db.sql:

1. I've assumed that "filename of the files on the disk" is a misspell and that point was to be able to retrieve 
all the filename_disc properties of files that are related to asset.

2. 
-- Creating junction table art_assets_files
CREATE TABLE public.art_assets_files (
id SERIAL PRIMARY KEY,
art_assets_id integer REFERENCES public.art_assets(id),
files_id uuid REFERENCES public.directus_files(id) <--- Here, I've assumed that it must be public.files(id) and changed it accordingly.
);

3. The third thing is that after reconsidering the second requirement from Task paragraph, I've assumed that artists.photo is associated with files and added relationship to db and .sql file (as you can't retrieve file.filename_disk if there is no relation between artist and file).

4. After reviewing the requirements, I assumed that "Details of 4 Art Assets from an Artist associated with the primary Art Asset" is a misspelling. I implemented functionality to retrieve 4 random asset names associated with artists, which are themselves associated with the main asset.

## Response
It should look something like this:

```json
{
    "name_original": "Starry Night",
    "name_english": "Starry Night",
    "description": {
        "info": "Famous painting by Vincent van Gogh"
    },
    "price": "800000.00000",
    "files": [
        "starrynight.jpg"
    ],
    "more_from_artists": [
        {
            "name_original": "Mona Lisa"
        }
    ],
    "artists": [
        {
            "name": "Vincent van Gogh",
            "filename_disk": "2.jpg"
        }
    ]
}
```

## Boot
You can run it in two different ways:

1. By compiling the Docker file and booting it while providing variables listed in .env.example.
2. By creating a .env file with variables from .env.example and running it by executing (`npm run dev`).