// Binary explode reads a .md file and explodes it into many small files
// by splitting at H1 (^# ) boundaries.
package main

import (
	"bufio"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"regexp"
	"strings"

	"github.com/golang/glog"
)

var (
	input     = flag.String("input", "", "The name of the input markdown file.")
	outputDir = flag.String("output_dir", "", "The name of the output directory.")
)

func main() {
	err := run()
	if err != nil {
		glog.Exit(err)
	}
}

var (
	regexH1     = regexp.MustCompile("^# ")
	regexH1Name = regexp.MustCompile("^# ([a-zA-Z0-9_-]*)$|^# .*{#ref-([a-zA-Z0-9_-]*)}$")
)

func run() error {
	flag.Parse()
	err := os.MkdirAll(*outputDir, 0755)
	if err != nil {
		return fmt.Errorf("error creating --output_dir %q: %s", *outputDir, err)
	}
	f, err := os.Open(*input)
	if err != nil {
		return fmt.Errorf("error opening --input %q: %s", *input, err)
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)
	var prev []string
	var prevName string
	var prevH1 string
	for scanner.Scan() {
		line := scanner.Text()
		if !regexH1.MatchString(line) {
			prev = append(prev, line)
			continue
		}
		if len(prev) > 0 {
			if prevName != "" {
				outname := *outputDir + "/" + prevName
				err := ioutil.WriteFile(outname, []byte(strings.Join(prev, "\n")+"\n"), 0644)
				if err != nil {
					return fmt.Errorf("error writing to %s: %s", outname, err)
				}
			} else {
				glog.Errorf("unrecognized H1 line format:\n%s", prevH1)
			}
		}
		prev = nil
		prevH1 = line
		m := regexH1Name.FindStringSubmatch(line)
		if m != nil {
			prevName = m[1]
			if prevName == "" {
				prevName = m[2]
			}
		}
		prev = []string{line}
	}
	if prevName != "" {
		outname := *outputDir + "/" + prevName
		err := ioutil.WriteFile(outname, []byte(strings.Join(prev, "\n")+"\n"), 0644)
		if err != nil {
			return fmt.Errorf("error writing to %s: %s", outname, err)
		}
	} else {
		glog.Errorf("unrecognized H1 line format:\n%s", prevH1)
	}
	return nil
}
