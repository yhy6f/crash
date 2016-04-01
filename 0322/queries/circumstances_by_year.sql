SELECT circumstances, COUNT(DISTINCT crash_rpt_no)
FROM crash05_15
GROUP BY 1
ORDER BY 2 DESC
;
SELECT circumstances, crash_year, COUNT(DISTINCT crash_rpt_no)
FROM crash05_15
GROUP BY 1, 2
ORDER BY 3 DESC


