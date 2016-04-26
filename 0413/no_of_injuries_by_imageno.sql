SELECT imageno, (sum(injured)/count(imageno)) AS no_of_injuries
FROM crash05_15
WHERE injured > 0
GROUP BY 1

