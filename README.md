# SHC API
Haxball Headless Host

Como INICIAR: 
```javascript
// Pegar codigo de la api.

Room.create({<propiedades>})
.then(() => {
    console.log("Sala creada.");
})
.catch(error => {
    console.log("Error: " + error);
});
```
