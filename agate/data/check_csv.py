import csv

with open('persons2006.csv') as f:
    reader = csv.reader(f, delimiter =",")
    i = 0
    for row in reader:

        i = i+1;
        if len(row) > 39:
            print i


# import csv

# output = []

# with open('crashes2008.csv') as f:
#     reader = csv.reader(f)
#     header =reader.next()
#   ##.next()method is telling python to start from the first line of reader 
#     header.pop(-1)

#     for line in reader:
#         line.pop(-1)
#         output.append(line)
# with open('crashes2008_clean.csv') as f:
#     writer = csv.writer(f)
#     writer.writerow(header)
#     writer.writerows(output)