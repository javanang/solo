CREATE TABLE public.user (
	"_id" serial PRIMARY KEY,
	"username" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    "login" boolean
);
CREATE TABLE public.order (
    "_id" serial PRIMARY KEY,
    "user_id" bigint,
    "date" date
);
CREATE TABLE public.product (
    "_id" serial PRIMARY KEY,
    "part_number" varchar NOT NULL,
    "description" varchar NOT NULL,
    "available" boolean,
    "user_id" bigint
);

