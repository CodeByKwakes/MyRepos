# story-time v0.0.0



- [Person](#person)
	- [Create person](#create-person)
	- [Delete person](#delete-person)
	- [Retrieve people](#retrieve-people)
	- [Retrieve person](#retrieve-person)
	- [Update person](#update-person)
	
- [Story](#story)
	- [Create story](#create-story)
	- [Delete story](#delete-story)
	- [Retrieve stories](#retrieve-stories)
	- [Retrieve story](#retrieve-story)
	- [Update story](#update-story)
	


# Person

## Create person



	POST /people


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Person's name.</p>							|
| age			| 			|  <p>Person's age.</p>							|
| stories			| 			|  <p>Person's stories.</p>							|

## Delete person



	DELETE /people/:id


## Retrieve people



	GET /people


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve person



	GET /people/:id


## Update person



	PUT /people/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Person's name.</p>							|
| age			| 			|  <p>Person's age.</p>							|
| stories			| 			|  <p>Person's stories.</p>							|

# Story

## Create story



	POST /stories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| creator			| 			|  <p>Story's creator.</p>							|
| title			| 			|  <p>Story's title.</p>							|
| fans			| 			|  <p>Story's fans.</p>							|

## Delete story



	DELETE /stories/:id


## Retrieve stories



	GET /stories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve story



	GET /stories/:id


## Update story



	PUT /stories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| creator			| 			|  <p>Story's creator.</p>							|
| title			| 			|  <p>Story's title.</p>							|
| fans			| 			|  <p>Story's fans.</p>							|


