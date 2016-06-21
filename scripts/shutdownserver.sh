echo 'shutdown called'
cd /home/ubuntu/src/logit
pwd
PID=`ps -eaf | grep node | grep -v grep | awk '{print $2}'`
if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  kill -9 $PID
fi