'''
Imports
'''

import re
import csv
import sys
import json



'''
Globals
'''

CSV_FILE = 'spring_thursday_2016.csv'
GAMES_PER_WEEK = 8
week_index = 0
floating_time = ''
data = []



'''
Parse CSV
'''

f = open(CSV_FILE)
reader = csv.reader(f)
reader.next()

for index, row in enumerate(reader):

    date_regex = re.compile(ur'(\d{1,2}\/\d{1,2}\/\d{4})')
    date_match = date_regex.search(row[0])
    if (date_match):
        week_date = date_match.group(0)
        week_index += 1
        data.append({
            'week': week_index,
            'date': week_date,
            'games': []
        })

    time_regex = re.compile(ur'(\d{1,2}:\d{1,2})')
    time_match = time_regex.search(row[1])
    if (time_match):
        floating_time = time_match.group(0)

    data[week_index - 1]['games'].append({
        'field': row[2],
        'home': row[3],
        'away': row[4],
        'ref': row[5],
        'time': floating_time
    })



'''
Save JSON
'''

# print json.dumps(data, indent=4)
with open('spring_thursday_2016.json', 'w') as outfile:
    json.dump(data, outfile)
    print 'Successfully generated JSON!'
