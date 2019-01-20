/* 
    Här är då konfigurationen för eslint.
    
    Kort sammanfattning:
    Eslint används för att man ska kunna snygga upp sin kod.
    Så här i konfigurationen bestämmer jag helt enkelt när
    eslint ska kasta in ett error i editorn.
*/

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],

    /*
      Här har vi då reglerna jag har bestämt. 
    */
    "rules": {

        /*
          Den kommer alltså kasta ett error om indenteringen inte är rätt

          exempel på ett error:

          <div>
          <p>Här kastar den ett error</p>
          </div>

          exempel på korrekt indentering:

          <div>
            <p>Här kastar den inget error</p>
          </div>
        */
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],

        /*
          Reglern här innebör att den kommer kasta ett
          error om inte en import består av doublequotes exempelvis

          exempel på ett error:
          import './components/test.component';  <-- Singlequotes

          exempel på rätt import:
          import "./components/test.component";  <-- Doublequotes
        */
        "quotes": [
            "error",
            "double"
        ],

        /*
          Reglern här gäller att den kommer att kasta ett 
          error om man inte avslutar en import med ett semicolon exempelvis.
        */
        "semi": [
            "error",
            "always"
        ]
    }
};