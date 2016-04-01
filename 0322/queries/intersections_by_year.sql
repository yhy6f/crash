SELECT At_Street, On_Street, COUNT(DISTINCT (Crash_rpt_no))
FROM crash05_15
GROUP BY 1, 2
ORDER BY 3 DESC
;
SELECT At_Street, On_Street, crash_year, COUNT(DISTINCT (Crash_rpt_no))
FROM crash05_15
GROUP BY 1, 2, 3
ORDER BY 4 DESC