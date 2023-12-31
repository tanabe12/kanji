# Python program to convert text
# file to JSON
 
 
import json
 
 
# the file to be converted to
# json format
filename = './penis2.txt'
 
# dictionary where the lines from
# text will be stored
dict1 = {}
 
# creating dictionary
with open(filename, encoding="utf8") as fh:
 
    for line in fh:
 
        # reads each line and trims of extra the spaces
        # and gives only the valid words
        print(line)
        command, description = line.strip().split(None, 1)
 
        dict1[command] = description.strip()
 
# creating json file
# the JSON file is named as test1
out_file = open("n2.json", "w")
json.dump(dict1, out_file, indent = 4, sort_keys = False)
out_file.close()