#!/bin/sh -l
set -euo pipefail

# Set the default path to the script
SCRIPT_FILEPATH=${SCRIPT_FILEPATH:="./index.js"}

# Execute the script
$SCRIPT_FILEPATH
