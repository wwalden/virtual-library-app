BEGIN;

ALTER TABLE IF EXISTS public.media
    ADD CONSTRAINT mediatype_id_fkey FOREIGN KEY (mediatype)
    REFERENCES public.mediatype (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.media
    DROP CONSTRAINT media_mediatype_fkey;  

COMMIT;

