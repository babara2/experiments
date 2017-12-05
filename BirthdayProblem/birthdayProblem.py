import random
import time

#chose one of the 3 death master files
def dmfChoose():
	fileNum = random.randint(0,2)
	if fileNum == 0:
		filename = "DeathMasterFile/ssdm1"
		file = open(filename, "r")
	elif fileNum == 1:
		filename = "DeathMasterFile/ssdm2"
		file = open(filename, "r")
	else:
		filename = "DeathMasterFile/ssdm3"
		file = open(filename, "r")
	linesInFile = []
	i = 0
	for line in file:
		# i += 1
		# if i == 100000: #Only choosing the first 100000 entries gives a good approximate
		# 	break;
		linesInFile.append(line)
	return linesInFile


# randomly samples DOBs from the unsampled indexes for each run
def sampleDOBs(file, sampleSize, usedIndexes):
	if sampleSize > (len(file) - len(usedIndexes)):
		print "Sampling failed."
		exit(0)
	sampleIndexes = random.sample([i for i in range(len(file)) if i not in usedIndexes],sampleSize)
	listOfPeople = []
	for i in sampleIndexes:
		listOfPeople.append(file[i])
	return listOfPeople, sampleIndexes

# cleans the data and returns a list of DOBs each in format MM/DD
def dataCleaner(listOfPeople):
	cleanList = []
	for i in range(len(listOfPeople)):
		person = listOfPeople[i]
		person = person.split(' ')
		#all entries of size less than 16 can't be DOB in the dataset
		person = filter(lambda a: len(a) > 15 , person)
		if len(person) == 2:
			person = person[1][-8:-4] #only extracting DOB
			cleanList.append(person)
		else:
			if len(person) > 3:
				pass #unexpected data so will be resampled later
			else:
				cleanList.append(person[0][-8:-4]) #only extracting DOB
	return cleanList

# Wrapper for sampling, cleaning and resampling to get a dataset of a particular size
def dataPrepper(file, sampleSize):
	listOfP, sampledIndexes = sampleDOBs(file, sampleSize, [])
	cleanData = dataCleaner(listOfP)
	# checking if we need to resample some data points
	while len(cleanData) != sampleSize:
		newSampleSize =  sampleSize - len(cleanData) 
		listOfP, newIndexes = sampleDOBs(file, newSampleSize, sampledIndexes)
		sampledIndexes.append(newIndexes) # no repeats because of design of sampling function
		cleanData.append(dataCleaner(listOfP))
	return cleanData

# Condensed method to get some speed optimization. No error checks or birth data returned.
# About 30 percent faster than the above approach.
def quickMafs(file, sampleSize):
	sampleIndexes = random.sample([i for i in range(len(file))],sampleSize)
	listOfPeople = {}
	for i in sampleIndexes:
		person = file[i].split(' ')
		person = filter(lambda a: len(a) > 15 , person)
		if len(person) == 2:
			person = ''.join(person[1][-8:-4]) #only extracting DOB
			if person in listOfPeople:
				return 1
		else:
			if len(person) > 3:
				pass
			else:
				person = ''.join(person[0][-8:-4])
				if person in listOfPeople:
					return 1
		listOfPeople[person] = 1
	return 0	

#method that runs the main experiment and does some timing stats
def mainExperiment():
	file = dmfChoose()
	totalCount = 0
	eventCount = 0
	start = time.time()
	for i in range(0, 10000): #doing 10000 runs
		totalCount += 1 
		# eventCount += quickMafs(file, 65) #uncomment and then comment the next three lines
		data = dataPrepper(file, 23)
		if len(data) != len(set(data)): #checking for repeats
			eventCount += 1
	end = time.time()
	print "time to run the experiment: " + str(end - start)
	print "Percent of collisions: " + str(round(float(eventCount)*100/totalCount, 5)) + "%"

if __name__ == "__main__":
	mainExperiment()