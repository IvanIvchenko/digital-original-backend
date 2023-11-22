-- Creating artists table
CREATE TABLE public.artists (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    photo uuid,
    biography json,
    gender character varying(255),
    alive boolean DEFAULT true NOT NULL,
    addresses character varying(1000),
);

-- Creating art_assets table
CREATE TABLE public.art_assets (
    id SERIAL PRIMARY KEY,
    name_original character varying(255) NOT NULL,
    name_english character varying(255),
    description json,
    provenance json,
    units character varying(255) DEFAULT 'cm' NOT NULL,
    size_x numeric(10,5),
    size_y numeric(10,5),
    size_z numeric(10,5),
    price numeric(15,5),
);

-- Creating files table
CREATE TABLE public.files (
    id uuid PRIMARY KEY,
    filename_disk character varying(255),
    title character varying(255),
    folder uuid,
    uploaded_by uuid,
    uploaded_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    filesize bigint,
    width integer,
    height integer,
    metadata json
);

-- Creating junction table artists_art_assets
CREATE TABLE public.artists_art_assets (
    id SERIAL PRIMARY KEY,
    artists_id integer REFERENCES public.artists(id),
    art_assets_id integer REFERENCES public.art_assets(id)
);

-- Creating junction table art_assets_files
CREATE TABLE public.art_assets_files (
    id SERIAL PRIMARY KEY,
    art_assets_id integer REFERENCES public.art_assets(id),
    files_id uuid REFERENCES public.directus_files(id)
);