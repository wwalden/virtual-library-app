BEGIN;

ALTER TABLE IF EXISTS public.media
    ADD CONSTRAINT media_mediatype_fkey FOREIGN KEY (mediatype)
    REFERENCES public.media (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.media
    DROP CONSTRAINT mediatype_id_fkey;  

COMMIT;