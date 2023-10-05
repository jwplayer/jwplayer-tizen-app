#! /bin/sh

ROOT_DIR="jwplayer-tizen-demo"

# Package just the app directory, exclude any `.sign` files because they are private
ln -s tizen-demo-app/app $ROOT_DIR
zip -r $ROOT_DIR.zip $ROOT_DIR -9 -x $ROOT_DIR/.sign/\* $ROOT_DIR/\*.wgt
unlink $ROOT_DIR
