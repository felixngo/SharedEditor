\c documents_database

create table documents
(
    id         bigserial,
    title      varchar not null,
    content    text    not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    primary key (id)
);
