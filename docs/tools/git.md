git remote add origin https://github.com/ewan-front-end/notebook.git
git branch master

curl 'https://api.github.com/orgs/ewan-front-end/repos' -u 'wanyuaning' -d '{"name":"notebook"}'   
curl -u 'wanyuaning' https://api.github.com/orgs/ewan-front-end/repos -d '{"name":"notebook"}'

git remote add origin https://github.com/ewan-front-end/notebook.git