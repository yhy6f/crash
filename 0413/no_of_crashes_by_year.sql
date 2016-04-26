SELECT count(DISTINCT imageno), crash_year
FROM crash05_15
GROUP BY 2
