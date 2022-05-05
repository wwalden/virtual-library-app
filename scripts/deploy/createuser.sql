
BEGIN;

CREATE TABLE "user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  username text NOT NULL UNIQUE,
  hashedPassword text NOT NULL,
  firstName text NOT NULL,
  lastName text NOT NULL,
  gender text,
  birthdayDate TIMESTAMPTZ,
  bio text,
  pictureURL text,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT now(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;