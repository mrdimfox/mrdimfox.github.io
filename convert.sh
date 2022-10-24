# Name of file must be "index.html"
TEMP_DIR=/tmp/pdf_conv_$RANDOM
mkdir -p $TEMP_DIR
cp $1 $TEMP_DIR/index.html

# Convert
curl --request POST 'https://demo.gotenberg.dev/forms/chromium/convert/html' \
    --form 'files=@"'$TEMP_DIR/index.html'"' \
    --form 'emulatedMediaType="screen"' \
    --form 'paperWidth="10"' \
    --form 'paperHeight="13.8"' \
    --form 'scale="0.8"' \
    --form 'marginLeft="0.1"' \
    --form 'marginRight="0.1"' \
    --form 'marginBottom="0.1"' \
    --form 'marginTop="0.1"' \
    -o $2

rm -rf $TEMP_DIR
