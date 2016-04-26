import csv

csvfile = open('./2006_De-Personalised_Extract/persons2006.csv', 'r')
outfile = open('./2006_De-Personalised_Extract/persons2006_zfilled.csv', 'w')

# Now a DictReader and DictWriter
# DictReader and DictWriter are imported libraries
reader = csv.DictReader(csvfile)
writer = csv.DictWriter(outfile, reader.fieldnames)
# DictWriter writes to outfile
#reader.fieldname refers to the headers

# Write headers
writer.writeheader()

# Clean and write the data to output
for row in reader:
    row["CrashId"]=row["Crash"].zfill(11)
    writer.writerow(row)
