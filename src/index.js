
import {EditorView, basicSetup} from "codemirror"
import {StateEffect} from "@codemirror/state"
import {javascript} from "@codemirror/lang-javascript"

import Firepad from '@lucafabbian/firepad'

// virtual module, populated by the FIREBASE_CONFIG json env var
import firebaseConfig  from 'firebaseConfig' 


/* Remember to import Firebase 8 from CDN in the html file! For example:
  <script src="./static/firepad/firebase-app.js"></script>
  <script src="./static/firepad/firebase-database.js"></script>
*/



/* Setup the editors */
const init = () => {

  // Get a reference to the database service
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database(app);



  // ACE EDITOR
  const editor = ace.edit('ace-editor');
  editor.setOptions({
    showPrintMargin: false, 
    maxLines: Infinity,
    fontSize: "100%"
  });
  editor.setTheme("ace/theme/chrome");
  // wrap ACE with firepad
  Firepad.fromACE(database.ref("my-database"), editor, {
    defaultText: 'hello',
  });



  // CODEMIRROR 6
  const codemirror = new EditorView({
    extensions: [basicSetup, javascript()],
    parent: document.getElementById('codemirror-editor')
  })
  // wrap Codemirror 6 with firepad  
  Firepad.fromCodeMirror6(database.ref("my-database"), codemirror, {
    StateEffect, // <-- currently, this is mandatory to make it work
    defaultText: 'hello',
  });

}


// Call init as soon as everything is loaded
setTimeout(init)