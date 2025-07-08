package utils

import "strconv"

func ParseUint(s string) (uint, error) {
	number, err := strconv.ParseUint(s, 10, 16)

	uintNumber := uint(number)

	return uintNumber, err
}