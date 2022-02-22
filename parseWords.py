with open('wordData.txt') as wordData:
     wordString = wordData.read()

     wordData.close()

wordList = wordString.split()
print(wordList)

with open('processedWords.txt', "a") as processedWords:
    for word in wordList:
        temp = "'" + word + "'"
        processedWords.write(temp)
        processedWords.write(", ")
    processedWords.close