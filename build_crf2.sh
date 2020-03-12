#!/bin/sh

rm -rf dist/crf; ng build -c crfProd; ssh -p 2214 jope@pb rm -r devel/frontpage/*; scp -P 2214 -r dist/crf jope@pb:devel/frontpage
