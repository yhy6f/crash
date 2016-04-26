import csv

infile = open('./610crash_without_lat_long.csv', 'r')
outfile = open('./lat_long.csv', 'w')

outwriter = csv.writer(outfile, delimiter=",")

headers = ['crashId', 'OnStreet', 'AtStreet', 'address', 'City', 'State',
        'Country']
outwriter.writerow(headers)

data = csv.DictReader(infile) 
data2 =list(data)
#print data2
for i in data2:
    crashid= i['crashid']
    onstreet =i['OnLocStreet']
    atstreet=i['AtLocStreet']
    city = "Columbia"
    state ="Missouri"
    country = "United States"
    parsed_row = (crashid, onstreet, atstreet, city, state, country)
    outwriter.writerow(parsed_row)
outfile.close()

