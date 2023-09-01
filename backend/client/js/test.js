import { db } from './firebase.js';
import {
  ref,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';

const test = ref(db, 'messages/' + 'admin_1-user_1/');
onValue(test, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
