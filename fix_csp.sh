sed -i "s/script-src 'self' https:\/\/apis.google.com;/script-src 'self' 'unsafe-inline' 'unsafe-eval' https:\/\/apis.google.com;/g" index.html
sed -i "s/style-src 'self' https:\/\/fonts.googleapis.com;/style-src 'self' 'unsafe-inline' https:\/\/fonts.googleapis.com;/g" index.html
