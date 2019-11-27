### FIREFOX extension

```
coment `useHash: true` in app-routing.module.ts
ng build --prod --base-href="./" --aot --buildOptimizer=true --extractLicenses=true --optimization=true
COPY manifest.js &&  background.js TO dist/zce
```

```
cd /dist/zce

npm install --global web-ext (if it is not instaled)
web-ext run
web-ext build
web-ext sign --api-key=user:niac --api-secret=niac
```
