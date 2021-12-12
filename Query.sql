use wfm;
select * from employees;
select * from profile;
desc users;
desc employees;
select * from users;
select * from softlock;

select * from softlock where employee_id=1022 and status='waiting' and managerstatus='awaiting_confirmation';
select GETUTCDATE();
desc softLock;
select * from employees where employee_id=1000;
select * from softlock;

update softlock set managerstatus= 'awaiting_confirmation' where employee_id=1022 and managerstatus= 'awaiting_confirmation';

SELECT *,GROUP_CONCAT ( s.name ) as "skName" FROM employees as e join skillmap as s on e.employee_id=s.employee_id join skills as sk on sk.skillid=s.skillid
WHERE e.manager = 'rohit' and e.lockstatus='not_requested' and e.employee_id=1000 group by e.employee_id;

SELECT skillmap.employee_id,employees.name,employees.status,employees.manager,employees.wfm_manager,employees.email,employees.lockstatus,
employees.experience,(select name from profile where profile_id=employees.profile_id) as profile_id,GROUP_CONCAT(skills.name) AS SkillSet FROM skillmap  
LEFT JOIN skills ON skillmap.skillid = skills.skillid join employees on employees.employee_id=skillmap.employee_id 
where employees.manager='rohit'
GROUP BY skillmap.employee_id
ORDER BY skillmap.employee_id;

select * from employees;

update employees set lockstatus='not_requested' where employee_id=1000;

select * from softlock;
select * from employees;

select e.employee_id,e.name,e.status,e.manager,e.email,e.experience,(select name from profile where profile_id=e.profile_id) 
as profile_id,e.wfm_manager,e.lockstatus,s.managerstatus
         from employees as e join softlock as s on e.employee_id=s.employee_id 
        where e.wfm_manager='lokesh' and e.lockstatus='request_waiting' 
        and s.managerstatus='awaiting_confirmation' and s.status='waiting';

select * from employees where wfm_manager='lokesh' and lockstatus='request_waiting';
select * from softlock;

SELECT skillmap.employee_id,employees.name,employees.status,employees.manager,employees.wfm_manager,employees.email,employees.lockstatus,
  employees.experience,employees.profile_id,GROUP_CONCAT(skills.name) AS SkillSet FROM skillmap
  LEFT JOIN skills ON skillmap.skillid = skills.skillid join employees on employees.employee_id=skillmap.employee_id
  where employees.manager='rohit'
  GROUP BY skillmap.employee_id
  ORDER BY skillmap.employee_id;

