#!/usr/bin/env bash

export HUGOxPARAMSxGITxLAST_COMMITxDATE=$(git log -1 --format=%cI)
export HUGOxPARAMSxGITxLAST_COMMITxHASHLONG=$(git log -1 --format=%H)
export HUGOxPARAMSxGITxLAST_COMMITxHASH=$(git log -1 --format=%h)
echo $HUGOxPARAMSxGITxLAST_COMMITxHASHLONG
