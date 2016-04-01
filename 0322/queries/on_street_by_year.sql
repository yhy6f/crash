SELECT On_Street, COUNT(DISTINCT (Crash_rpt_no))
FROM crash05_15
GROUP BY 1
ORDER BY 2 DESC
; 
SELECT On_Street, crash_year, COUNT(DISTINCT (Crash_rpt_no))
FROM crash05_15
GROUP BY 1, 2
ORDER BY 3 DESC