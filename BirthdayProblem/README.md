#Birthday Problem

In probability theory, the birthday problem says that in a set of **n** randomly chosen people, some pair of people will have the same birthday. With different n, we get different probabilities but as n reaches 367, the probability becomes 1 as two people are guarenteed to have the same birthday by the pigeonhole priciple (since the number of days in a year is not greater than 366).

The most astounding thing about this problem is that, a probability of 50.7 percent is reached by chosing 23 people, and a probability of 99.4 percent is achieved with just 60 people! 

The probabilistic principles behind the birthday problem are used to create birthday attacks to break cryptographic hash functions who vulnerability is judged by the calculation of collisions (i.e. two distinct inputs give the same hash); however, that is a separate interesting topic to be explored later.

##Experiment:
I wanted to conduct an experiment to see how well probability theory translates to evidence gathered from real life data. This experiment required a large dataset which was obtained from the United States Social Security Death Master File (2013 V3) which contains over 89 million datapoints. Each datapoint represents a deceased human being and contains their DOB, date of death, social security number and other pieces of information.

For the experiment, the data was loaded, **n** random points were sampled and checked for a collision with each other.

In order to cut the time cost, only 100000 data points were selected and a 1000 runs of the experiment were conducted. Despite that, the results agreed very well with what was expected through the probabilistic model.

Some of the results are as following:

**n**  | **p(n)**
------------- | -------------
23  | 51.1
65  | 99.8
70  | 100

##Further thoughts:
If the experiment is run a million or higher order of magnitude more times, almost perfect correlation would be found.