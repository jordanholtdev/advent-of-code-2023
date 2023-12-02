#!/bin/bash

# This script is used to solve the puzzle
# Specify the path to my input file
input_file='input.txt'

# Check to see if the file exists
if [ -e "$input_file" ]; then
    # if the file exists then read each line from the file
    while IFS= read -r line || [ -n "$line" ]; do
        # process each line
        # find all the digits in the line
        # take the first digit and the last digit and concatenate them together and print them to the screen
        echo "The first and last digits are: $(echo $line | grep -o '[0-9]' | head -1)$(echo $line | grep -o '[0-9]' | tail -1)"
        # save all concatenated digit pairs to a file called 'output.txt'
        echo "$(echo $line | grep -o '[0-9]' | head -1)$(echo $line | grep -o '[0-9]' | tail -1)" >> output.txt

    done < "$input_file"
else
    # if the file does not exist then print an error message
    echo "Error: File '$input_file' not found."
fi

# Initialize the sum variable
sum=0

# check to see if the output file exists
if [ -e "output.txt" ]; then
    # if the files exist, then read each line from the file
    # then add all the numbers together and print the sum to the screen
    while IFS= read -r line || [ -n "$line" ]; do
        # process each line
        # add all the numbers together
        sum=$(($sum + $line))
        echo "The sum is: $sum"
    done < "output.txt"
else
    # if the file does not exist then print an error message
    echo "Error: File 'output.txt' not found."
fi