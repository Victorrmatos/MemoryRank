var ask = "Unknown Player";
var numbers = [];
var guesses = [];
var score = 0;
var dif = 10;
var rankPoE = [0, 0, 0, 0, 0];
var rankPlE = ["r", "a", "n", "k", "m"];
var rankPoH = [0, 0, 0, 0, 0];
var rankPlH = ["e", "m", "o", "r", "y"];
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyBmeQ4jqhpTHKNZ5oVsCzoSBHodOtQox30",
  authDomain: "memoryrank.firebaseapp.com",
  databaseURL:
    "https://memoryrank-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "memoryrank",
  storageBucket: "memoryrank.appspot.com",
  messagingSenderId: "325839389976",
  appId: "1:325839389976:web:d175421e85563e41320a6d",
  measurementId: "G-V1V5QKBD7G",
};

const database = firebase.database();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);



function cellInsert(cellid, data) {
  var cell = document.getElementById(cellid);
  cell.insertAdjacentHTML("afterbegin", data);
}

function tableRankArrays() {
  //empty cells
  var tcells = document.querySelectorAll("td");
  tcells.forEach(function (a) {
    a.innerHTML = "";
  });
  //fill heading cells
  var cellrank = document.getElementById("RankE");
  cellrank.innerHTML = "Rank";
  var cellname = document.getElementById("NameE");
  cellname.innerHTML = "Name";
  var cellscore = document.getElementById("ScoreE");
  cellscore.innerHTML = "Score";
  var cell1stE = document.getElementById("1stE");
  cell1stE.innerHTML = "1st";
  var cell2ndE = document.getElementById("2ndE");
  cell2ndE.innerHTML = "2nd";
  var cell3rdE = document.getElementById("3rdE");
  cell3rdE.innerHTML = "3rd";
  var cell4thE = document.getElementById("4thE");
  cell4thE.innerHTML = "4th";
  var cell5thE = document.getElementById("5thE");
  cell5thE.innerHTML = "5th";
  var cellrank = document.getElementById("RankH");
  cellrank.innerHTML = "Rank";
  var cellname = document.getElementById("NameH");
  cellname.innerHTML = "Name";
  var cellscore = document.getElementById("ScoreH");
  cellscore.innerHTML = "Score";
  var cell1stH = document.getElementById("1stH");
  cell1stH.innerHTML = "1st";
  var cell2ndH = document.getElementById("2ndH");
  cell2ndH.innerHTML = "2nd";
  var cell3rdH = document.getElementById("3rdH");
  cell3rdH.innerHTML = "3rd";
  var cell4thH = document.getElementById("4thH");
  cell4thH.innerHTML = "4th";
  var cell5thH = document.getElementById("5thH");
  cell5thH.innerHTML = "5th";
  for (i = 0; i < 5; i++) {
    var cellPoE = i + 1 + "ep";
    cellInsert(cellPoE, rankPoE[i]);

    var cellPoH = i + 1 + "hp";
    cellInsert(cellPoH, rankPoH[i]);

    var cellPlE = i + 1 + "en";
    cellInsert(cellPlE, rankPlE[i]);

    var cellPlH = i + 1 + "hn";
    cellInsert(cellPlH, rankPlH[i]);
  }
}

function saveRankArrays() {
  var ref = database.ref(memoryrank / ranking);
  var data = {
    Easyplayerrank: rankPlE,
    Easypointsrank: rankPoE,
    Hardplayerrank: rankPlH,
    Hardpointsrank: rankPoH,
  };
  ref.set(data);
}

function loadRankArrays() {
  // Get the four strings
  firebase
    .database()
    .ref(
      "https://memoryrank-default-rtdb.europe-west1.firebasedatabase.app/memoryrank"
    )
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      rankPlE = data.Easyplayerrank;
      rankPoE = data.Easypointsrank;
      rankPlH = data.Hardplayerrank;
      rankPoH = data.Hardpointsrank;
    });
}
function testFirstAccess() {
  firebase
    .database()
    .ref(
      "https://memoryrank-default-rtdb.europe-west1.firebasedatabase.app/memoryrank"
    )
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      rankPoE = data.Easyplayerrank;
      var rankTest = rankPoE;

      if (rankTest === null) {
        alert("Welcome!");
        saveRankArrays();
      } else {
        alert("Welcome back!");
      }
    });
}
function saveRankToArrays() {
  var temp = 0;
  if (dif == 10) {
    for (i = 0; i < rankPoE.length - 1; i++) {
      if (score > +rankPoE[i] && temp == 0 && score !== +rankPoE[i - 1]) {
        temp = 1;
        rankPoE.splice(i, 0, score);
        rankPoE.pop();
        rankPlE.splice(i, 0, ask);
        return rankPlE.pop();
      }
    }
  } else {
    for (i = 0; i < rankPoH.length - 1; i++) {
      if (score > +rankPoH[i] && temp == 0 && score !== +rankPoH[i - 1]) {
        temp = 1;
        rankPoH.splice(i, 0, score);
        rankPoH.pop();
        rankPlH.splice(i, 0, ask);
        return rankPlH.pop();
      }
    }
  }
}

function difficulty() {
  if (dif == 10) {
    document.getElementById("h5").innerHTML = "--Hard mode selected";
    return (dif = 100);
  } else {
    document.getElementById("h5").innerHTML = "--Easy mode selected";
    return (dif = 10);
  }
}

function game() {
  score = 0;
  numbers = [];
  guesses = [];
  alert("The first number is...");
  function game1() {
    if (
      numbers[numbers.length - 1] == guesses[guesses.length - 1] &&
      guesses.length == numbers.length
    ) {
      numbers.push(Math.floor(Math.random() * dif));
      for (let i = 0; i < numbers.length; i++) {
        alert("->" + numbers[i]);
      }

      var guess = prompt(
        "Enter the numbers separated by a space (eg.: 4 2 7...)"
      );

      guess !== null && guess !== ""
        ? (guesses = guess.split(" "))
        : guesses.push(" Nada...");

      if (
        numbers[numbers.length - 1] == guesses[guesses.length - 1] &&
        guesses.length == numbers.length
      ) {
        alert("Right answer! Again.");
        score++;
        game1();
      } else if (
        (dif == 10 && score > rankPoE[4]) ||
        (dif == 100 && score > rankPoH[4])
      ) {
        alert(
          "Wrong! The right answer was: " +
            numbers +
            "\n" +
            "You have entered: " +
            guesses
        );
        alert("New Record!");
        saveRankToArrays();
        saveRankArrays();
        tableRankArrays();
      } else {
        alert(
          "Wrong! The right answer was: " +
            numbers +
            "\n" +
            "You have entered: " +
            guesses
        );
        alert("Game over!");

        var newgame = prompt(
          " New player? ( p ) \n New Game? ( g ) \n Exit Game? ( x )"
        );
        if (newgame == "p" || newgame == "P") {
          return doorman();
        } else if (newgame == "g" || newgame == "G") {
          game();
        } else {
        }
      }
    }
  }
  game1();
}

function doorman() {
  ask = prompt("Who`s there?");
  alert("Hello " + ask + "!");
  return game();
}
testFirstAccess();
loadRankArrays();
tableRankArrays();
