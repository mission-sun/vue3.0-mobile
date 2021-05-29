#!/bin/sh

npm install --registry=https://registry.npm.taobao.org

npm run build

APP_NAME="dist-mobile"

rm -rf /home/root-mission/blog/$APP_NAME

# rm -rf /home/root-mission/blog/$APP_NAME

# mkdir $APP_NAME 当前源码的文件

mkdir -p /home/root-mission/blog/$APP_NAME

cp -r dist/*  /home/root-mission/blog/$APP_NAME


# /home/root-mission/blog/web-mobile/source
# if true 
# then echo 'hello shell'
# else echo 'byb'
# fi



# echo "执行的文件名：$0";
# echo "第一个参数为：$1";
# echo "第二个参数为：$2";
# echo "第三个参数为：$3";