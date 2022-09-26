package main

import (
	"fmt"
	"bufio"
	"os"
	"strings"
	"io/ioutil"
	"strconv"
)

func main() {
	fmt.Println("-=-=-=-=-=-=-=-=-=-=-=-=-=-")
	fmt.Println("Welcome to Data Handler 0.8")
	fmt.Println("-=-=-=-=-=-=-=-=-=-=-=-=-=-")
	fmt.Println("This tool can help you read your csv files and tell you cool facts")
	fmt.Println()
	fmt.Println("Input the name of a CSV file you would like to use.")
	fmt.Print("File name: ")

	reader := bufio.NewReader(os.Stdin)

	filename, _ := reader.ReadString('\n')
	filename = strings.Replace(filename, "\n", "", -1)

	fmt.Printf("You inputted %v\n", filename)

	data, err := ioutil.ReadFile(filename)

	if err != nil {
		fmt.Println(err)
		return
	}

	rows := strings.Split(string(data), "\n")

	headers := strings.Split(rows[0], ",")

	var sums = make([]float64, len(headers))

	numElements := len(rows) - 1

	for i := 1; i < len(rows); i++ {
		values := strings.Split(rows[i], ", ")

		for j := 0; j < len(sums); j++ {
			val, err := strconv.ParseFloat(values[j], 32)
			if err == nil {
				sums[j] += val
			}
		}
	}

	fmt.Printf("Number of rows: %d\n", numElements)

	for _, header := range headers {

		fmt.Printf("%v\t\t", header)
	}

	fmt.Println()

	for _, sum := range sums {
		average := float64(sum) / float64(numElements)
		fmt.Printf("%f\t", average)
	}

}