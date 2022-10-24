curl --request POST 'https://demo.gotenberg.dev/forms/chromium/convert/html' \
    --form 'files=@"'$1'"' \
    --form 'emulatedMediaType="screen"' \
    --form 'paperWidth="10"' \
    --form 'paperHeight="13.7"' \
    --form 'scale="0.8"' \
    --form 'marginLeft="0"' \
    --form 'marginRight="0"' \
    --form 'marginBottom="0.1"' \
    -o $2
