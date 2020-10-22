// ----------------CREATE TABLES-------------------
/*
CREATE TABLE users (
    id serial primary key,
    username varchar(45) not null,
    password varchar(128) not null,
    salt varchar(20) not null,
    avatar varchar(255) not null
);

CREATE TABLE projects (
    id serial primary key,
    title varchar(45) not null
);

CREATE TABLE projects_users (
    user_id integer REFERENCES users(id),
    project_id integer REFERENCES projects(id)
);

CREATE TABLE columns (
    id serial primary key,
    title varchar(20) not null,
    project_id integer REFERENCES projects(id)
);

CREATE TABLE cards (
    id serial primary key,
    column_id integer REFERENCES columns(id),
    description varchar(20)
);

CREATE TABLE cards_users (
    card_id integer REFERENCES cards(id),
    user_id integer REFERENCES users(id)
);
*/

// ------------INSERT INTO TABLES-------------

/*
INSERT INTO users (username, password, salt, avatar)
Values ('test@example.com', 'test', '123', 'https://img.icons8.com/ultraviolet/452/person-male.png');
*/

/*
INSERT INTO projects (title)
VALUES ('My Cool Project');
*/

/*
INSERT INTO projects_users (project_id, user_id)
VALUES (1, 1);
*/

/*
INSERT INTO columns (title, project_id)
VALUES ('TODO', 1)
*/

/*
INSERT INTO cards (column_id, description)
VALUES (1, 'Make new card');
*/

/*
INSERT INTO cards_users (card_id, user_id)
VALUES (1, 1);
*/

//-----------------FOREIGN KEY JOINING------------------
/*
select * from projects
inner join columns on projects.id = columns.project_id
inner join cards on cards.column_id = columns.id
where projects.id = 1;
*/
