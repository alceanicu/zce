# GitHub Page

## Add script head section of index.html
```
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-147618847-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-147618847-1');
  </script>
```

### ngh

```
ng build --prod --base-href="./" --aot --buildOptimizer=true --extractLicenses=true --optimization=true
ngh --dir dist/zce --message="V 2.0.7"
```
