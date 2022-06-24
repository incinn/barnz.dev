#!/bin/bash

green="\e[0;92m"
red="\e[31m"
reset="\e[0m"

echo -e "\nChecking requirements..."

command -v rsync > /dev/null 2>&1 || {
  echo -e >&2 "${red}ERROR${reset}: rsync required but not found"
  exit 1
}

echo -e "... ${green}SUCCESS${reset}"

source .env

if [[ -z $DEPLOY_USER || -z $DEPLOY_HOST || -z $DEPLOY_HOST_SSH_PORT || -z $DEPLOY_HOST_DESTINATION_DIR ]]; then
  echo -e "${red}ERROR${reset}: invalid or incomplete deployment variables"
  exit 1
fi

echo -e "... ${green}SUCCESS${reset}"

echo -e "\nInstalling dependencies..."
{
  npm ci > /dev/null 2>&1
} || {
  echo -e "${red}ERROR${reset}: installing dependencies"
  exit 1
}
echo -e "... ${green}SUCCESS${reset}"

echo -e "\nRunning tests..."
{
  npm run test > /dev/null 2>&1
} || {
  echo -e "${red}ERROR${reset}: tests failed"
  exit 1
}
echo -e "... ${green}SUCCESS${reset}"

echo -e "\nBuilding website..."
{
  hugo > /dev/null 2>&1
} || {
  echo -e "${red}ERROR${reset}: building website"
  exit 1
}
echo -e "... ${green}SUCCESS${reset}"

echo -e "\nUploading..."
{
  rsync -avz --delete public/ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_HOST_DESTINATION_DIR} --port=${DEPLOY_HOST_SSH_PORT}
} || {
  echo -e "${red}ERROR${reset}: uploading to target"
  exit 1
}
echo -e "... ${green}SUCCESS${reset}"

echo -e "\n-------------\n"
echo -e "${green}COMPLETED${reset}"
echo -e "Open https://${green}${DEPLOY_HOST}${reset} to view changes.\n"

exit 0
