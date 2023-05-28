#!/bin/sh
set -x

# /www/$JOB_NAME
DEPLOYMENT_PATH=$1
# $WORKSPACE
WORKSPACE_PATH=$2
GIT_BRANCH=$3
STOP_SCRIPT_PATH=${DEPLOYMENT_PATH}/scripts/stop.sh
START_SCRIPT_PATH=${DEPLOYMENT_PATH}/scripts/start.sh

echo ${DEPLOYMENT_PATH}
echo ${WORKSPACE_PATH}
echo ${GIT_BRANCH}

if [ ${GIT_BRANCH} = "origin/main" ] && git log -1 --pretty=%B | grep -Eq "^chore\(main\):\ release\ [0-9]+\.[0-9]+\.[0-9]+.*$"; then
  echo "Building release"
  if [ -f ${STOP_SCRIPT_PATH} ]; then
    chmod +x ${STOP_SCRIPT_PATH}
    sh ${STOP_SCRIPT_PATH}
  else
    echo "stop.sh does not exist."
  fi
  rm -rf ${DEPLOYMENT_PATH}
  mkdir -p ${DEPLOYMENT_PATH}
  cp -R ${WORKSPACE_PATH} /www
  cd ${DEPLOYMENT_PATH}
  if [ -f ${START_SCRIPT_PATH} ]; then
    chmod +x ${START_SCRIPT_PATH}
    sh ${START_SCRIPT_PATH}
  else
    echo "start.sh does not exist."
  fi
else
   echo "Skipping release build"
fi
