DROP TABLE IF EXISTS calendar;

CREATE TABLE calendar (
    cal_date TIMESTAMP,
    cal_month NUMERIC,
    cal_day NUMERIC,
    cal_year NUMERIC,
    cal_day_name VARCHAR(10),
    cal_month_name VARCHAR(10)
);

-- TIMESTAMP datatype format -> YYYY-MM-DD hh:mm:ss[.nnn]
-- SEPTEMBER(9), WEDNESDAY(9), 
-- can specify int/ number length NUMERIC(<LENGTH>,<PRECISON(0)>)

DO $$
DECLARE 
StartDate TIMESTAMP := CURRENT_DATE;
EndDate TIMESTAMP := CURRENT_DATE + interval '1 year';
BEGIN
WHILE StartDate <= EndDate LOOP
INSERT INTO calendar (cal_date, cal_month, cal_day, cal_year, cal_day_name, cal_month_name) VALUES  
(StartDate, 
EXTRACT(MONTH FROM StartDate),
EXTRACT(DAY FROM StartDate),
EXTRACT(YEAR FROM StartDate),
TO_CHAR(StartDate, 'dy'),
TO_CHAR(StartDate, 'Month')
);
StartDate := StartDate + interval '1 day';
END LOOP;
END $$;

-- SELECT * FROM calendar;

-- CURRENT_DATE-> 'YYYY-MM-DD hh:mm:ss.mmm'
-- CURRENT_DATE + INTERVAL <(num, interval)> -> adds a time/date interval to a date and then returns the date.
--  - interval Param -> year(yy), month(m), day(d), weekday(w), hour(h), min(n/minute), second(s)
--  - num Param -> number of interval to add to date(+dates in future,, - days in past)
--  -date Param -> the date to be used i.e today's date -> DateObject
-- EXTRACT(interval, date) -> (DAY, date) function returns the date of the month ( 1-31) for a specific date, or (MONTH, date) month num value (1-12), or year (YEAR, date)
-- EXTRACT(DOW (day of week function) FROM date) -> (word value/name 08-> August)
-- TO_CHAR() to get month name w/ args (timestamp/date, 'Month') <- control capitalization by way 'month is inputted (month, Month, MONTH)
-- line 29 (StartDate := StartDate + interval '1 day';) -> incrementing the iterator (i.e i++)
-- WHILE LOOP SYNTAX IN SQL -> https://www.postgresqltutorial.com/postgresql-plpgsql/pl-pgsql-while-loop/
-- date functions in postgres -> https://www.postgresqltutorial.com/postgresql-date-functions/
-- extract month name from timestamp value https://database.guide/get-the-month-name-from-a-date-in-postgresql/
-- dummy example to practice while loop -> https://databasefaqs.com/postgresql-while-loop/

