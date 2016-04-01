## Run this query to make sure that the YEAR( ) function works correctly on the `Date` field, because date is a function, so use ` as escape
SELECT `Date`, YEAR(`Date`), COUNT(*)
FROM crash05_15
GROUP BY 1, 2
;
## this statement adds the field `crash_year` as an integer field after the `Date` field:
ALTER TABLE crash05_15 ADD crash_year INT AFTER `Date`;

## this statement populates the `crash_year` field with the results of the YEAR function:
UPDATE crash05_15 SET crash_year = YEAR(`Date`);

