create extension if not exists "uuid-ossp";

create table products (
  id uuid not null default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price integer
);


create table stocks(
  product_id uuid not null default uuid_generate_v4() primary key,
  count integer,
  foreign key (product_id) references products(id)
  );

insert into products (title, description, price) VALUES ('Toy 1', 'Great toy', 100);
insert into products (title, description, price) VALUES ('Toy 2', 'Cool toy', 200);
insert into products (title, description, price) VALUES ('Toy 3', 'Awesome toy', 300);

insert into stocks (product_id, count) VALUES ('656ad425-602f-4caf-9fee-2719546bd1ed', 3);
insert into stocks (product_id, count) VALUES ('1ac11cd1-611c-49be-bf54-c186469a2f30', 2);
insert into stocks (product_id, count) VALUES ('95f77a81-0981-4b5e-adaa-7e722cc3f324', 2);

