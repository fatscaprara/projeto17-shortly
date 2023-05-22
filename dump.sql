--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.10.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.10.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer,
    "createdAt" date DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortens (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer,
    "visitCount" integer DEFAULT 0,
    "createAt" date DEFAULT now()
);


--
-- Name: shortens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortens_id_seq OWNED BY public.shortens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createAt" date DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens ALTER COLUMN id SET DEFAULT nextval('public.shortens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (6, '1f90bb26-ec2b-4ac3-ae23-00d5bb7ae6a8', 9, '2023-05-22');
INSERT INTO public.sessions VALUES (7, '117b6b31-20f5-4423-a606-dfcffd3b994d', 6, '2023-05-22');
INSERT INTO public.sessions VALUES (8, 'ccbc93be-6a29-49cf-aa58-475cb9c2f3a3', 8, '2023-05-22');
INSERT INTO public.sessions VALUES (9, '8070c932-ab54-4368-b682-9416de0e1d03', 7, '2023-05-22');


--
-- Data for Name: shortens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shortens VALUES (12, 'https://www.uol.com', 'NwG-8qcI', 8, 0, '2023-05-22');
INSERT INTO public.shortens VALUES (13, 'https://www.uol.com', 'Apqyi5AF', 7, 0, '2023-05-22');
INSERT INTO public.shortens VALUES (4, 'https://www.uol.com', '_BmCvGcN', 9, 4, '2023-05-22');
INSERT INTO public.shortens VALUES (5, 'https://www.uol.com', 'spEC41IK', 9, 3, '2023-05-22');
INSERT INTO public.shortens VALUES (6, 'https://www.uol.com', 'GTEzHp1r', 9, 1, '2023-05-22');
INSERT INTO public.shortens VALUES (7, 'https://www.uol.com', 'MQ1yP07D', 9, 1, '2023-05-22');
INSERT INTO public.shortens VALUES (8, 'https://www.uol.com', 'iIiQ_04d', 6, 1, '2023-05-22');
INSERT INTO public.shortens VALUES (9, 'https://www.uol.com', 'RLoRvvyL', 6, 3, '2023-05-22');
INSERT INTO public.shortens VALUES (11, 'https://www.uol.com', 'rC6ueWAU', 8, 1, '2023-05-22');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (6, 'Joaquim', 'joaquim@driven.com.br', '$2b$10$5Rzo6O.XRd/RbexCQlcUROoQdVLfMgXAuxPA3x1bFZ160TADbwWwu', '2023-05-22');
INSERT INTO public.users VALUES (7, 'José', 'jose@driven.com.br', '$2b$10$UCzomZ4AhBoenyyN7UFTp.e.RrFQW5Q.FMaQa6cM3IUbGP.e7VmP6', '2023-05-22');
INSERT INTO public.users VALUES (8, 'Pedro', 'pedro@driven.com.br', '$2b$10$CdV2jgkqs9YrB3LngWywUOiX/tyGIXgjhzurlecLHfOm8Dv0ehtLS', '2023-05-22');
INSERT INTO public.users VALUES (9, 'Fabio', 'fabio@driven.com.br', '$2b$10$CCY3LMaQuEBVOrGwLpRU1O6z7.MtU/KWCEvimefsm6I8exlzkY4IK', '2023-05-22');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 9, true);


--
-- Name: shortens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shortens_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shortens shortens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

