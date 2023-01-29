with open("script.js", "r+",encoding='UTF-8') as file:
    # read the first line
    first_line = file.readline()
    # move the cursor to the beginning of the file
    file.seek(0)
    # overwrite the first line
    file.write('123123213213213213')
    # append the rest of the file
    file.write(first_line)