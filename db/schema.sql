CREATE TABLE author
(
    author_id SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL
);

CREATE TABLE book
(
    book_id    SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    page_count SMALLINT     NOT NULL,
    author_id  INTEGER REFERENCES author (author_id)
);
