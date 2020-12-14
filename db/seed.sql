use employee_db;

insert into departments (name) values ("hr"), ("it");
insert into roles (title, salary, department_id) values ("manager", 90, 1), ("supervisor", 60, 2);
insert into employees (first_name, last_name, role_id, manager_id) values ("Salvador", "Gamez", 3, 1);