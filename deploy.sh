#!/bin/bash

green="\e[0;92m"
red="\e[31m"
reset="\e[0m"

command -v rsync >/dev/null 2>&1 || {
  echo -e >&2 "rsync required but not found, ${red}aborting${reset}."
  exit 1
}

source .env

if [[ -z $DEPLOY_USER || -z $DEPLOY_HOST || -z $DEPLOY_HOST_SSH_PORT || -z $DEPLOY_HOST_DESTINATION_DIR ]]; then
  echo -e "Invalid or incomplete deployment variables, ${red}aborting${reset}."
  exit 1
fi


echo -e "\nBuilding website...\n"

{
  hugo
} || {
  echo -e "\n\n${red}ERROR${reset} building\n\n"
  exit 1
}

echo -e "\nBuild ${green}SUCCESS${reset}\n\n"
echo "Uploading..."
echo -e "\tto host: ${green}${DEPLOY_USER}${reset}@${green}${DEPLOY_HOST}${reset}:${green}${DEPLOY_HOST_SSH_PORT}${reset}"
echo -e "\tinto directory: ${green}${DEPLOY_HOST_DESTINATION_DIR}${reset}\n"

{
  rsync -avz --delete public/ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_HOST_DESTINATION_DIR} --port=${DEPLOY_HOST_SSH_PORT}
} || {
  echo -e "\n${red}ERROR${reset} uploading to target\n"
  exit 1
}

echo -e "\nUpload ${green}SUCCESSFUL${reset}!\n"
echo -e "Open ${green}${DEPLOY_HOST}${reset} to view changes."

exit 0

