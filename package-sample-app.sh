#! /bin/sh

# Package just the app directory, exclude any `.sign` files because they are private
zip -r sample-app.zip tizen-demo-app/app -9 -x tizen-demo-app/app/.sign/\*
