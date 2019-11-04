#!/usr/bin/env python3
import sys
import json

def main():
    in_fhand = sys.stdin
    out_fhand = sys.stdout
    result = {
        'title': '',
        'content': []
    }
    for line in in_fhand:
        line = line.strip()
        result['content'].append(line)

    json.dump(result, out_fhand, indent=4)

if __name__ == '__main__':
    main()