-- Query 1: Create authors table
CREATE TABLE authors (id SERIAL PRIMARY KEY, name VARCHAR(255));

-- Query 2:  Select distinct authors from the books table and insert into the authors table
INSERT INTO authors(name) SELECT DISTINCT author FROM books;

-- Query 3: Alter the books table to include a field for author id
ALTER TABLE books ADD COLUMN author_id INT;

-- Query 4: Retrieves the primary key on each author and fills in the author id field in the books table
UPDATE books SET author_id=author.id
FROM (SELECT * FROM authors) AS author
WHERE books.author = author.name;

-- Query 5: Retrieves the primary key on each author and fills in the author id field in the books table
ALTER TABLE books DROP COLUMN author;

ALTER TABLE books ADD CONSTRAINT fk_authors FOREIGN KEY (author_id) REFERENCES authors(id);

-- Query 7: Now that all books have an author_id, require it!
ALTER TABLE books ALTER COLUMN author_id SET NOT NULL;

-- Query 8: Query our Books + Author
SELECT books.id, books.title, authors.name
FROM books
INNER JOIN authors
  ON books.author_id = authors.id;
